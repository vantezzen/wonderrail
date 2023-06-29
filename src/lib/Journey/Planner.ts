import { v4 as uuidv4 } from "uuid";
import {
  InterrailLocation,
  Journey,
  JourneyRide,
  JourneyStay,
  JourneyStep,
  JourneyTimerange,
} from "../types";
import EventEmitter from "events";
import eurailData from "@/data/eurail.json";
import { getTimerangeLengthToDaysInMs } from "../utils/date";
import { getDistanceFromLatLonInKm } from "../utils/coordinates";
import Interrail from "./Interrail";
import StepPlanner from "./StepPlanner";
import JourneyStats from "./JourneyStats";
import JourneyAi from "./JourneyAi";

export default class Planner extends EventEmitter {
  public interrail = new Interrail();
  public stepPlanner = new StepPlanner();
  public stats = new JourneyStats(this);
  public ai = new JourneyAi(this);

  public isLoading = false;

  constructor(public journey: Journey) {
    super();

    this.stepPlanner.on("loadingState", (isLoading) => {
      this.isLoading = isLoading;
      this.emit("change");
    });
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

    await this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  private async recalculateJourneySteps(newJourneySteps: JourneyStep[]) {
    this.journey.steps = await this.stepPlanner.recalculateJourneySteps(
      newJourneySteps,
      this.journey
    );
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
  async addLocation(
    location: InterrailLocation,
    timerange?: JourneyTimerange,
    beforeLocation?: JourneyStay | null
  ) {
    let travelEndTime = this.journey.startDate;
    if (!beforeLocation) {
      // Dont add if last step is this location to avoid duplicates
      const previousStep = this.journey.steps[
        this.journey.steps.length - 1
      ] as JourneyStay;

      if (previousStep) {
        const distanceToPreviousStep = getDistanceFromLatLonInKm(
          previousStep.location.coordinates,
          location.coordinates
        );

        if (distanceToPreviousStep < 50) {
          return;
        }
      }
    }

    const endDate =
      this.journey.steps.length > 0
        ? new Date(travelEndTime.getTime() + 1000 * 60 * 60 * 24 * 2) // Stay is 2 days long by default
        : travelEndTime; // The first stay should be 0 days long as we expect it to be where the person lives

    const stay: JourneyStay = {
      type: "stay",
      id: uuidv4(),
      location,
      timerange: timerange ?? {
        start: travelEndTime,
        end: endDate,
      },
    };

    if (beforeLocation) {
      const beforeLocationIndex = this.journey.steps.findIndex(
        (step) => "id" in step && step.id === beforeLocation?.id
      );

      this.journey.steps.splice(beforeLocationIndex, 0, stay);
    } else {
      this.journey.steps.push(stay);
    }

    await this.recalculateJourneySteps(this.journey.steps);
    this.emit("change");
  }

  /**
   * Remove a step from the journey, removing any rides that are no longer
   * needed and recalculating the journey steps
   */
  async removeStep(step: JourneyStay) {
    const newJourney = this.journey.steps.filter(
      (journeyStep) => "id" in journeyStep && journeyStep.id !== step.id
    );
    await this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  async changeStayDuration(stay: JourneyStay, changedDays: number) {
    stay.timerange.end = new Date(
      stay.timerange.start.getTime() + changedDays * 1000 * 60 * 60 * 24
    );

    await this.recalculateJourneySteps(this.journey.steps);
    this.emit("change");
  }

  async setStartDate(startDate?: Date) {
    if (!startDate) {
      return;
    }

    this.journey.startDate = startDate;
    this.emit("change");

    if (this.journey.steps.length > 0) {
      const firstStay = this.journey.steps[0] as JourneyStay;
      const firstStayDuration = getTimerangeLengthToDaysInMs(
        firstStay.timerange
      );
      const newEndDate = new Date(startDate.getTime() + firstStayDuration);
      firstStay.timerange.start = startDate;
      firstStay.timerange.end = newEndDate;

      await this.recalculateJourneySteps(this.journey.steps);
    }
  }

  async setPreferredDepartureTime(preferredDepartureTime: number) {
    this.journey.preferredDepartureTime = preferredDepartureTime;
    await this.recalculateJourneySteps(this.journey.steps);
  }

  getStayAfterRide(ride: JourneyRide) {
    const rideIndex = this.journey.steps.findIndex(
      (journeyStep) => "id" in journeyStep && journeyStep.id === ride.id
    );

    if (rideIndex === -1) {
      throw new Error("Ride not found");
    }

    const nextStay = this.journey.steps[rideIndex + 1] as JourneyStay;
    return nextStay ?? null;
  }

  setJourney(journey: Journey) {
    this.journey = journey;
    this.emit("change");
  }
}
