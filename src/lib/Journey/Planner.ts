import { v4 as uuidv4 } from "uuid";
import {
  InterrailLocation,
  Journey,
  JourneyRide,
  JourneyStay,
  JourneyStep,
} from "../types";
import EventEmitter from "events";
import eurailData from "@/data/eurail.json";
import {
  getTravellableDate,
} from "../utils/date";
import {
  areCoordinatesEqual,
  getDistanceFromLatLonInKm,
} from "../utils/coordinates";
import Interrail from "./Interrail";

export default class Planner extends EventEmitter {
  public interrail = new Interrail();

  public isLoading = false;
  public loadingSemaphore = 0;

  constructor(public journey: Journey) {
    super();
  }

  async moveStayPosition(fromIndex: number, toIndex: number) {
    const stay = this.journey.steps.splice(fromIndex, 1)[0];

    if (stay.type !== "stay") {
      throw new Error("Can only move stays");
    }

    let newJourney = [
      ...this.journey.steps.slice(0, toIndex),
      stay,
      ...this.journey.steps.slice(toIndex),
    ];

    this.journey.steps = await this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  private updateLoadingState(loadingStateChange: number) {
    this.loadingSemaphore += loadingStateChange;
    this.isLoading = this.loadingSemaphore > 0;
    this.emit("change");
  }

  /**
   * Recalculate journey steps based on stays given.
   * This will take an arbitrary list of journey steps that may be in an invalid
   * state and recalculate the journey steps based on the stays given.
   *
   * If existing rides are found between stays, they will be kept, otherwise
   * a new ride will be created.
   * For this to work, the current "this.journey" object will be used and thus
   * shouldn't have been updated beforehand.
   *
   * @param newJourney Modified journey steps
   * @returns New journey steps with valid order
   */
  private async recalculateJourneySteps(
    newJourney: JourneyStep[]
  ): Promise<JourneyStep[]> {
    this.updateLoadingState(1);
    let stays = newJourney.filter(
      (step) => step.type === "stay"
    ) as JourneyStay[];
    const rides = newJourney.filter(
      (step) => step.type === "ride"
    ) as JourneyRide[];
    const currentFirstStay = this.journey.steps.filter(
      (step) => step.type === "stay"
    )[0] as JourneyStay | undefined;

    let startDate = currentFirstStay?.timerange.start || new Date();

    stays = await this.recalculateJourneyDates(stays, startDate);

    const finishedJourney = await this.addRidesToJourney(stays, rides);
    this.updateLoadingState(-1);
    return finishedJourney;
  }

  /**
   * Insert rides back into the journey based off the new stays array
   * If the start and end locations and times are the same, then the ride is
   * kept as it was, otherwise a new ride is created with the new start and
   * end locations and times
   * A ride is always inserted between two locations.
   */
  private async addRidesToJourney(stays: JourneyStay[], rides: JourneyRide[]) {
    let newJourneyWithRides: JourneyStep[] = [];
    for (let i = 0; i < stays.length; i++) {
      const currentStay = stays[i] as JourneyStay;
      newJourneyWithRides.push(currentStay);

      const nextStay = stays[i + 1] as JourneyStay;
      if (!nextStay) {
        // Rides can only be inserted between stays
        continue;
      }

      // Check if a ride already exists at this time for these stays
      const existingRide = rides.find((ride) => {
        return (
          areCoordinatesEqual(ride.start, currentStay.location.coordinates) &&
          areCoordinatesEqual(ride.end, nextStay.location.coordinates) &&
          ride.timerange.start.getTime() ===
            currentStay.timerange.end.getTime() &&
          ride.timerange.end.getTime() === nextStay.timerange.start.getTime()
        );
      });

      if (existingRide) {
        newJourneyWithRides.push(existingRide);
      } else {
        const ride = await this.getAvailableRideBetweenLocations(
          currentStay,
          nextStay
        );
        newJourneyWithRides.push(ride);

        if (ride.type === "ride") {
          this.updateStaysWithRideTimes(currentStay, ride, nextStay);
        }
      }
    }
    return newJourneyWithRides;
  }

  private updateStaysWithRideTimes(
    currentStay: JourneyStay,
    ride: JourneyRide,
    nextStay: JourneyStay
  ) {
    currentStay.timerange.end = new Date(ride.timerange.start);

    const nextStayLength = Math.ceil(
      nextStay.timerange.end.getTime() - nextStay.timerange.start.getTime()
    );
    nextStay.timerange.start = new Date(ride.timerange.end.getTime());
    nextStay.timerange.end = new Date(
      nextStay.timerange.start.getTime() + nextStayLength
    );
  }

  /**
   * Get the known ride between two stays, otherwise return an invalid ride
   */
  private async getAvailableRideBetweenLocations(
    currentLocation: JourneyStay,
    nextLocation: JourneyStay
  ): Promise<JourneyStep> {
    try {
      return await this.getKnownRideBetweenLocations(
        currentLocation,
        nextLocation
      );
    } catch (error) {
      console.log(
        `Could not find ride between ${currentLocation.location.name} and ${nextLocation.location.name}`
      );

      return {
        type: "invalid",
        id: uuidv4(),
        name: `${currentLocation.location.name} -> ${nextLocation.location.name}`,
        start: currentLocation.location.coordinates,
        end: nextLocation.location.coordinates,
      };
    }
  }

  /**
   * Get the known ride between two stays - throws an error if no ride is
   * found
   */
  private async getKnownRideBetweenLocations(
    currentStay: JourneyStay,
    nextStay: JourneyStay
  ): Promise<JourneyRide> {
    const ride = await this.getAppropriateRide(
      currentStay.location.interrailId,
      nextStay.location.interrailId,
      getTravellableDate(currentStay.timerange.end)
    );

    const firstStop = ride.legs[0].start;
    const lastStop = ride.legs[ride.legs.length - 1].end;
    const changes = ride.legs.length - 1;

    return {
      type: "ride",
      id: uuidv4(),
      name: `${firstStop.station} -> ${lastStop.station}`,
      start: currentStay.location.coordinates,
      end: nextStay.location.coordinates,
      timerange: {
        start: new Date(ride.departure),
        end: new Date(ride.arrival),
      },
      needsReservation: ride.status === "REQUIRED",
      price: ride.price,
      changes,
    };
  }

  /**
   * Recalculate the journey dates based on the start date given
   * This will take an arbitrary list of locations and recalculate the dates.
   *
   * Please note that this is a provisionally solution and will be updated
   * with the correct times once the rides are calculated
   */
  private recalculateJourneyDates(locations: JourneyStay[], startDate: Date) {
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
    }) as JourneyStay[];
    return locations;
  }

  /**
   * Get a list of popular cities from the Eurail maps
   */
  getCities() {
    return eurailData.cities;
  }

  /**
   * Get a list of popular lines from the Eurail maps
   *
   * @param fromLocation If given, only return rides that start or end at this location
   */
  getRides(fromLocation?: InterrailLocation | null) {
    let lines = eurailData.lines;

    // TODO: Use Interrail API

    if (fromLocation) {
      lines = lines.filter((feature) => {
        const distances = [
          getDistanceFromLatLonInKm(fromLocation.coordinates, feature.from),
          getDistanceFromLatLonInKm(fromLocation.coordinates, feature.to),
        ];

        // There is sometimes a distance between the location (city center) and
        // the train station.
        return Math.min(...distances) < 20;
      });
    }

    return lines;
  }

  /**
   * Add a new city to the journey, adding necessary rides in between
   */
  async addLocation(location: InterrailLocation) {
    // Dont add if last step is this location to avoid duplicates
    const previousStep = this.journey.steps[
      this.journey.steps.length - 1
    ] as JourneyStay;

    let travelEndTime = new Date();
    if (previousStep) {
      const distanceToPreviousStep = getDistanceFromLatLonInKm(
        previousStep.location.coordinates,
        location.coordinates
      );

      if (distanceToPreviousStep < 50) {
        return;
      }
    }

    this.journey.steps.push({
      type: "stay",
      id: uuidv4(),
      location,
      timerange: {
        start: travelEndTime,
        end: new Date(travelEndTime.getTime() + 1000 * 60 * 60 * 24 * 2),
      },
    });

    this.journey.steps = await this.recalculateJourneySteps(this.journey.steps);
    this.emit("change");
  }

  /**
   * Get an appropriate ride between two locations
   */
  private async getAppropriateRide(
    fromStationId: string,
    toStationId: string,
    date: Date
  ) {
    const timetable = await this.interrail.getTimetable({
      origin: fromStationId,
      destination: toStationId,
      timestamp: date.toISOString(),
      tripsNumber: 1,
      arrival: false,
      currency: "EUR",
      travellers: 1,
    });

    if (timetable.length === 0) {
      throw new Error("No rides found");
    }

    return timetable[0];
  }

  /**
   * Remove a step from the journey, removing any rides that are no longer
   * needed and recalculating the journey steps
   */
  async removeStep(step: JourneyStay) {
    const newJourney = this.journey.steps.filter(
      (journeyStep) => "id" in journeyStep && journeyStep.id !== step.id
    );
    this.journey.steps = await this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  async changeStayDuration(stay: JourneyStay, changedDays: number) {
    stay.timerange.end = new Date(
      stay.timerange.end.getTime() + changedDays * 1000 * 60 * 60 * 24
    );

    this.journey.steps = await this.recalculateJourneySteps(this.journey.steps);
    this.emit("change");
  }
}
