import { v4 as uuidv4 } from "uuid";
import {
  EMPTY_JOURNEY,
  InterrailTimetableEntry,
  Journey,
  JourneyRide,
  JourneyStay,
  JourneyStep,
} from "../types";
import EventEmitter from "events";
import {
  getIsoDateWithoutTimezoneDifference,
  getTimerangeLengthToDaysInMs,
  getTravellableDate,
} from "../utils/date";
import { getDistanceFromLatLonInKm } from "../utils/coordinates";
import Interrail from "./Interrail";

export default class StepPlanner extends EventEmitter {
  public interrail = new Interrail();

  public isLoading = false;
  public loadingSemaphore = 0;
  private existingJourney: Journey = EMPTY_JOURNEY;

  private updateLoadingState(loadingStateChange: number) {
    this.loadingSemaphore += loadingStateChange;
    this.isLoading = this.loadingSemaphore > 0;
    this.emit("loadingState", this.isLoading);
  }

  /**
   * Recalculate journey steps based on stays given.
   * This will take an arbitrary list of journey steps that may be in an invalid
   * state and recalculate the journey steps based on the stays given.
   *
   * If existing rides are found between stays, they will be kept, otherwise
   * a new ride will be created.
   *
   * @param newJourney Modified journey steps
   * @param existingJourney Existing journey
   * @returns New journey steps with valid order
   */
  public async recalculateJourneySteps(
    newJourney: JourneyStep[],
    existingJourney: Journey
  ): Promise<JourneyStep[]> {
    this.existingJourney = existingJourney;

    this.updateLoadingState(1);
    let stays = newJourney.filter(
      (step) => step.type === "stay"
    ) as JourneyStay[];
    const rides = newJourney.filter(
      (step) => step.type === "ride"
    ) as JourneyRide[];
    const currentFirstStay = this.existingJourney.steps.filter(
      (step) => step.type === "stay"
    )[0] as JourneyStay | undefined;

    let startDate = currentFirstStay?.timerange.start || new Date();

    // Recalculating journey dates is not necesarrily needed as they will
    // be recalculated later on, but it helps to get more predictable results
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
      let ride: JourneyStep | undefined = rides.find((ride) => {
        return (
          getDistanceFromLatLonInKm(
            ride.start,
            currentStay.location.coordinates
          ) < 20 &&
          getDistanceFromLatLonInKm(ride.end, nextStay.location.coordinates) <
            20 &&
          ride.timerange.start.toLocaleDateString() ===
            currentStay.timerange.end.toLocaleDateString() &&
          ride.timerange.end.toLocaleDateString() ===
            nextStay.timerange.start.toLocaleDateString()
        );
      });

      if (!ride) {
        ride = await this.getAvailableRideBetweenLocations(
          currentStay,
          nextStay
        );
      }
      newJourneyWithRides.push(ride);
      if (ride.type === "ride") {
        this.updateStaysWithRideTimes(currentStay, ride, nextStay);
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
    const ride = await this.getBestInterrailTimetableEntry(
      currentStay.location.interrailId,
      nextStay.location.interrailId,
      getTravellableDate(
        currentStay.timerange.end,
        this.existingJourney.preferredDepartureTime
      )
    );

    const firstStop = ride.legs[0].start;
    const lastStop = ride.legs[ride.legs.length - 1].end;
    const changes = ride.legs.filter(
      (leg) => leg.type === "PLATFORM_CHANGE"
    ).length;

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
      details: ride,
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
      const locationDuration = getTimerangeLengthToDaysInMs(location.timerange);
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
   * Get an appropriate ride between two locations
   */
  private async getBestInterrailTimetableEntry(
    fromStationId: string,
    toStationId: string,
    date: Date
  ) {
    const timetable = await this.interrail.getTimetable({
      origin: fromStationId,
      destination: toStationId,
      timestamp: getIsoDateWithoutTimezoneDifference(date),
      tripsNumber: 5,
      arrival: false,
      currency: "EUR",
      travellers: 1,
    });

    if (timetable.length === 0) {
      throw new Error("No rides found");
    }

    return this.getBestInterrailRide(timetable);
  }

  private getBestInterrailRide(timetable: InterrailTimetableEntry[]) {
    // Rank entries and return the best one
    const rankedEntries = timetable
      .map((entry) => {
        let rank = 0;

        // Prefer rides with less changes
        rank += 100 - entry.legs.length * 10;

        // Prefer rides that don't require a reservation
        if (entry.status === "NOT_REQUIRED") {
          rank += 10;
        }

        // Prefer rides that are cheaper
        rank += 100 - (entry.price ?? 0);

        // Prefer rides that are close to the preferred departure time
        const departureTime = new Date(entry.departure).getHours();
        // >0 if the preferred departure time is after the departure time
        // <0 if the preferred departure time is before the departure time
        const hoursDifference =
          departureTime - this.existingJourney.preferredDepartureTime;
        // Let departures before the preferred time have a higher impact on lowering the rank
        const timeDistanceImpact = hoursDifference < 0 ? 20 : 10;
        rank += 100 - Math.abs(hoursDifference) * timeDistanceImpact;

        return {
          entry,
          rank,
        };
      })
      .sort((a, b) => b.rank - a.rank);

    return rankedEntries[0].entry;
  }
}
