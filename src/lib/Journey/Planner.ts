import { v4 as uuidv4 } from "uuid";
import {
  Coordinate,
  Journey,
  JourneyLocation,
  JourneyRide,
  JourneyStep,
} from "../types";
import EventEmitter from "events";
import eurailData from "@/data/eurail.json";
import { getDurationFromGeoJson } from "../utils/date";
import {
  arrayCoordinateToJourneyCoordinate,
  getDistanceFromLatLonInKm,
} from "../utils/coordinates";

export type GeoPoint = {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    name: string;
  };
};

export type GeoCity = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type GeoConnection = {
  id: string;
  name: string;
  duration: string;
  coordinates: [[number, number], [number, number]];
};

export default class Planner extends EventEmitter {
  constructor(public journey: Journey) {
    super();
  }

  moveStep(fromIndex: number, toIndex: number) {
    const step = this.journey.steps.splice(fromIndex, 1)[0];
    let newJourney = [
      ...this.journey.steps.slice(0, toIndex),
      step,
      ...this.journey.steps.slice(toIndex),
    ];

    this.journey.steps = this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  private recalculateJourneySteps(newJourney: JourneyStep[]): JourneyStep[] {
    let locations = newJourney.filter(
      (step) => step.type === "location"
    ) as JourneyLocation[];
    const rides = newJourney.filter(
      (step) => step.type === "ride"
    ) as JourneyRide[];

    const firstLocation = this.journey.steps.filter(
      (step) => step.type === "location"
    )[0] as JourneyLocation;
    let startDate = firstLocation.timerange.start;

    locations = locations.map((location, index) => {
      const locationDuration =
        location.timerange.end.getTime() - location.timerange.start.getTime();
      const newEndDate = new Date(startDate.getTime() + locationDuration);
      const newLocation = {
        ...location,
        timerange: {
          start: startDate,
          end: newEndDate,
        },
      };
      startDate = newEndDate;

      return newLocation;
    }) as JourneyLocation[];

    // Insert rides back into the journey based off the new locations array
    // If the start and end locations and times are the same, then the ride is
    // kept as it was, otherwise a new ride is created with the new start and
    // end locations and times
    // A ride is always inserted between two locations.
    let newJourneyWithRides: JourneyStep[] = [];
    for (let i = 0; i < locations.length; i++) {
      const currentLocation = locations[i] as JourneyLocation;
      newJourneyWithRides.push(currentLocation);

      const nextLocation = locations[i + 1] as JourneyLocation;
      if (!nextLocation) {
        continue;
      }

      const existingRide = rides.find((ride) => {
        return (
          ride.start.lat === currentLocation.location.lat &&
          ride.start.lng === currentLocation.location.lng &&
          ride.end.lat === nextLocation.location.lat &&
          ride.end.lng === nextLocation.location.lng &&
          ride.timerange.start.getTime() ===
            currentLocation.timerange.end.getTime() &&
          ride.timerange.end.getTime() ===
            nextLocation.timerange.start.getTime()
        );
      });

      if (existingRide) {
        newJourneyWithRides.push(existingRide);
      } else {
        try {
          const ride = this.getAppropriateRide(
            currentLocation.location,
            nextLocation.location
          );
          const rideDuration =
            getDurationFromGeoJson(ride.duration) * 1000 * 60;
          const rideEnd = new Date(
            currentLocation.timerange.end.getTime() + rideDuration
          );
          newJourneyWithRides.push({
            type: "ride",
            id: uuidv4(),
            name: `${currentLocation.name} -> ${nextLocation.name}`,
            start: currentLocation.location,
            end: nextLocation.location,
            timerange: {
              start: currentLocation.timerange.end,
              end: rideEnd,
            },
          });

          startDate = rideEnd;
        } catch (error) {
          console.log(
            `Could not find ride between ${currentLocation.name} and ${nextLocation.name}`
          );

          newJourneyWithRides.push({
            type: "invalid",
            id: uuidv4(),
            name: `${currentLocation.name} -> ${nextLocation.name}`,
            start: currentLocation.location,
            end: nextLocation.location,
          });
        }
      }
    }

    return newJourneyWithRides;
  }

  getLocations() {
    const locations = eurailData.features.filter(
      (feature) => feature.geometry.type === "Point"
    ) as unknown as GeoPoint[];

    return locations.map((feature) => ({
      id: `${feature.properties!.name}-${feature.geometry.coordinates[0]}-${
        feature.geometry.coordinates[1]
      }`,
      name: feature.properties!.name,
      location: {
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      },
    }));
  }

  getRides(fromLocation?: GeoCity | null) {
    let lines = eurailData.features.filter(
      (feature) =>
        feature.geometry.type === "LineString" &&
        feature.geometry.coordinates.length === 2
    );

    if (fromLocation) {
      lines = lines.filter((feature) => {
        const distances = (feature.geometry.coordinates as number[][]).map(
          (coordinate) =>
            getDistanceFromLatLonInKm(
              fromLocation.location,
              arrayCoordinateToJourneyCoordinate(coordinate as [number, number])
            )
        );

        // There is sometimes a distance between the location (city center) and
        // the train station.
        return Math.min(...distances) < 0.5;
      });
    }

    const connections = lines.map((feature) => ({
      id: feature.properties!.name,
      name: feature.properties!.name,
      duration: feature.properties!.description!,
      coordinates: (feature.geometry.coordinates as number[][]).map(
        (coordinate) => ({
          lat: coordinate[1],
          lng: coordinate[0],
        })
      ),
    }));

    return connections;
  }

  addLocation(city: GeoCity) {
    // Dont add if last step is this location
    const previousStep = this.journey.steps[
      this.journey.steps.length - 1
    ] as JourneyLocation;

    const distanceToPreviousStep = getDistanceFromLatLonInKm(
      previousStep.location,
      city.location
    );

    if (previousStep && distanceToPreviousStep < 50) {
      return;
    }

    const ride = this.getAppropriateRide(
      (this.journey.steps[this.journey.steps.length - 1] as JourneyLocation)
        .location,
      city.location
    );

    const duration = getDurationFromGeoJson(ride.duration) * 1000 * 60;
    const previousStepEndTime = new Date(
      (
        this.journey.steps[this.journey.steps.length - 1] as JourneyLocation
      ).timerange.end.getTime()
    );
    const travelEndTime = new Date(previousStepEndTime.getTime() + duration);

    this.journey.steps.push({
      type: "ride",
      id: uuidv4(),
      name: ride.name,
      start: ride.coordinates[0],
      end: ride.coordinates[1],
      timerange: {
        start: previousStepEndTime,
        end: travelEndTime,
      },
    });

    this.journey.steps.push({
      type: "location",
      id: uuidv4(),
      name: city.name,
      location: city.location,
      timerange: {
        start: travelEndTime,
        end: new Date(travelEndTime.getTime() + 1000 * 60 * 60 * 24 * 2),
      },
    });

    this.emit("change");
  }

  private getAppropriateRide(fromLocation: Coordinate, toLocation: Coordinate) {
    const ridesFromStart = this.getRides({
      id: "",
      name: "",
      location: fromLocation,
    });
    const ridesToEnd = this.getRides({
      id: "",
      name: "",
      location: toLocation,
    });

    const rides = ridesFromStart.filter((rideFromStart) => {
      return ridesToEnd.some((rideToEnd) => {
        return rideFromStart.id === rideToEnd.id;
      });
    });

    if (rides.length === 0) {
      throw new Error("No rides found");
    }

    return rides[0];
  }

  removeStep(step: JourneyLocation) {
    const newJourney = this.journey.steps.filter(
      (journeyStep) => "id" in journeyStep && journeyStep.id !== step.id
    );
    this.journey.steps = this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }
}
