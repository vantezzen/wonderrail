import { v4 as uuidv4 } from "uuid";
import {
  Coordinate,
  GeoCity,
  GeoPoint,
  Journey,
  JourneyLocation,
  JourneyRide,
  JourneyStep,
} from "../types";
import EventEmitter from "events";
import eurailData from "@/data/eurail.json";
import { getDurationFromGeoJson } from "../utils/date";
import {
  areCoordinatesEqual,
  arrayCoordinateToJourneyCoordinate,
  getDistanceFromLatLonInKm,
} from "../utils/coordinates";
import Interrail from "./Interrail";

export default class Planner extends EventEmitter {
  public interrail = new Interrail();

  constructor(public journey: Journey) {
    super();
  }

  moveLocationPosition(fromIndex: number, toIndex: number) {
    const location = this.journey.steps.splice(fromIndex, 1)[0];

    if (location.type !== "location") {
      throw new Error("Can only move locations");
    }

    let newJourney = [
      ...this.journey.steps.slice(0, toIndex),
      location,
      ...this.journey.steps.slice(toIndex),
    ];

    this.journey.steps = this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  /**
   * Recalculate journey steps based on locations given.
   * This will take an arbitrary list of journey steps that may be in an invalid
   * state and recalculate the journey steps based on the locations given.
   *
   * If existing rides are found between locations, they will be kept, otherwise
   * a new ride will be created.
   * For this to work, the current "this.journey" object will be used and thus
   * shouldn't have been updated beforehand.
   *
   * @param newJourney Modified journey steps
   * @returns New journey steps with valid order
   */
  private recalculateJourneySteps(newJourney: JourneyStep[]): JourneyStep[] {
    let locations = newJourney.filter(
      (step) => step.type === "location"
    ) as JourneyLocation[];
    const rides = newJourney.filter(
      (step) => step.type === "ride"
    ) as JourneyRide[];
    const currentFirstLocation = this.journey.steps.filter(
      (step) => step.type === "location"
    )[0] as JourneyLocation | undefined;

    let startDate = currentFirstLocation?.timerange.start || new Date();

    locations = this.recalculateJourneyDates(locations, startDate);

    return this.addRidesToJourney(locations, rides);
  }

  /**
   * Insert rides back into the journey based off the new locations array
   * If the start and end locations and times are the same, then the ride is
   * kept as it was, otherwise a new ride is created with the new start and
   * end locations and times
   * A ride is always inserted between two locations.
   */
  private addRidesToJourney(
    locations: JourneyLocation[],
    rides: JourneyRide[]
  ) {
    let newJourneyWithRides: JourneyStep[] = [];
    for (let i = 0; i < locations.length; i++) {
      const currentLocation = locations[i] as JourneyLocation;
      newJourneyWithRides.push(currentLocation);

      const nextLocation = locations[i + 1] as JourneyLocation;
      if (!nextLocation) {
        // Rides can only be inserted between locations
        continue;
      }

      // Check if a ride already exists at this time for these locations
      const existingRide = rides.find((ride) => {
        return (
          areCoordinatesEqual(ride.start, currentLocation.location) &&
          areCoordinatesEqual(ride.end, nextLocation.location) &&
          ride.timerange.start.getTime() ===
            currentLocation.timerange.end.getTime() &&
          ride.timerange.end.getTime() ===
            nextLocation.timerange.start.getTime()
        );
      });

      if (existingRide) {
        newJourneyWithRides.push(existingRide);
      } else {
        newJourneyWithRides.push(
          this.getAvailableRideBetweenLocations(currentLocation, nextLocation)
        );
      }
    }
    return newJourneyWithRides;
  }

  /**
   * Get the known ride between two locations, otherwise return an invalid ride
   */
  private getAvailableRideBetweenLocations(
    currentLocation: JourneyLocation,
    nextLocation: JourneyLocation
  ): JourneyStep {
    try {
      return this.getKnownRideBetweenLocations(currentLocation, nextLocation);
    } catch (error) {
      console.log(
        `Could not find ride between ${currentLocation.name} and ${nextLocation.name}`
      );

      return {
        type: "invalid",
        id: uuidv4(),
        name: `${currentLocation.name} -> ${nextLocation.name}`,
        start: currentLocation.location,
        end: nextLocation.location,
      };
    }
  }

  /**
   * Get the known ride between two locations - throws an error if no ride is
   * found
   */
  private getKnownRideBetweenLocations(
    currentLocation: JourneyLocation,
    nextLocation: JourneyLocation
  ): JourneyRide {
    const ride = this.getAppropriateRide(
      currentLocation.location,
      nextLocation.location
    );
    const rideDuration = getDurationFromGeoJson(ride.duration) * 1000 * 60;
    const rideEnd = new Date(
      currentLocation.timerange.end.getTime() + rideDuration
    );

    return {
      type: "ride",
      id: uuidv4(),
      name: `${currentLocation.name} -> ${nextLocation.name}`,
      start: currentLocation.location,
      end: nextLocation.location,
      timerange: {
        start: currentLocation.timerange.end,
        end: rideEnd,
      },
    };
  }

  /**
   * Recalculate the journey dates based on the start date given
   * This will take an arbitrary list of locations and recalculate the dates.
   */
  private recalculateJourneyDates(
    locations: JourneyLocation[],
    startDate: Date
  ) {
    locations = locations.map((location) => {
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
    return locations;
  }

  /**
   * Get a list of popular locations from the Eurail maps
   */
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

  /**
   * Get a list of popular rides from the Eurail maps
   *
   * @param fromLocation If given, only return rides that start or end at this location
   */
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
        return Math.min(...distances) < 20;
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

  /**
   * Add a new city to the journey, adding necessary rides in between
   */
  addCity(city: GeoCity) {
    // Dont add if last step is this location to avoid duplicates
    const previousStep = this.journey.steps[
      this.journey.steps.length - 1
    ] as JourneyLocation;

    let travelEndTime = new Date();
    if (previousStep) {
      const distanceToPreviousStep = getDistanceFromLatLonInKm(
        previousStep.location,
        city.location
      );

      if (distanceToPreviousStep < 50) {
        return;
      }
      let ride = null;
      try {
        ride = this.getAppropriateRide(previousStep.location, city.location);
      } catch (error) {
        console.log("Could not find ride");
      }

      const duration = ride?.duration
        ? getDurationFromGeoJson(ride.duration) * 1000 * 60
        : 1000 * 60 * 60 * 5;
      const previousStepEndTime = previousStep.timerange?.end
        ? new Date(previousStep.timerange.end.getTime())
        : new Date();
      travelEndTime = new Date(previousStepEndTime.getTime() + duration);

      if (ride) {
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
      } else {
        this.journey.steps.push({
          type: "invalid",
          id: uuidv4(),
          name: "Invalid ride",
          start: previousStep?.location || city.location,
          end: city.location,
        });
      }
    }

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

  /**
   * Get an appropriate ride between two locations
   */
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

  /**
   * Remove a step from the journey, removing any rides that are no longer
   * needed and recalculating the journey steps
   */
  removeStep(step: JourneyLocation) {
    const newJourney = this.journey.steps.filter(
      (journeyStep) => "id" in journeyStep && journeyStep.id !== step.id
    );
    this.journey.steps = this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }
}
