import { v4 as uuidv4 } from "uuid";
import {
  InterrailLocation,
  InterrailTimetableEntry,
  Journey,
  JourneyRide,
  JourneyStay,
  JourneyStep,
  JourneyTimerange,
} from "../types";
import EventEmitter from "events";

import eurailData from "@/data/eurail.json";

import {
  getTimerangeLengthToDaysInDays,
  getTimerangeLengthToDaysInMs,
  timeRangesContainSameDays,
} from "../utils/date";
import { getDistanceFromLatLonInKm } from "../utils/coordinates";
import Interrail from "./Interrail";
import StepPlanner from "./StepPlanner";
import JourneyStats from "./JourneyStats";
import JourneyAi from "./JourneyAi";
import Hostels from "./Hostels";
import BackendApi from "./BackendApi";
import Weather from "./Weather";
import { trackEvent } from "../analytics";
import MigrationManager from "./MigrationManager";
import Todo from "./Todo";
import Autosaver from "./Autosaver";

export default class Planner extends EventEmitter {
  public interrail = new Interrail();
  public stepPlanner = new StepPlanner();
  public stats = new JourneyStats(this);
  public ai = new JourneyAi(this);
  public hostels = new Hostels();
  public api = new BackendApi();
  public weather = new Weather();
  public todo = new Todo(this);

  private migrations = new MigrationManager();
  private autosaver = new Autosaver(this);

  private isLoadingInternal = false;
  private loadingSemaphore = 0;

  constructor(public journey: Journey) {
    super();

    this.migrations.migrate(this);
    this.stepPlanner.on("loadingState", () => {
      this.emit("change");
    });
  }

  get isLoading() {
    return this.stepPlanner.isLoading || this.isLoadingInternal;
  }

  private updateLoading(change = 1) {
    this.loadingSemaphore += change;
    this.isLoadingInternal = this.loadingSemaphore > 0;
    this.emit("change");
  }

  public withLoading<T>(fn: () => Promise<T>) {
    this.updateLoading(1);
    return fn().finally(() => this.updateLoading(-1));
  }

  async moveStayPosition(fromIndex: number, toIndex: number) {
    const stay = this.journey.steps.splice(fromIndex, 1)[0];
    trackEvent("planner_move_stay");

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
    trackEvent("planner_recalculate_journey_steps");
    this.journey.steps = await this.stepPlanner.recalculateJourneySteps(
      newJourneySteps,
      this.journey
    );
    await Promise.all([this.findHostels(), this.getWeather()]);
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
    trackEvent("planner_add_location");
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

    const cityInfo = await this.api.getCityInfo(location.name);

    const stay: JourneyStay = {
      type: "stay",
      id: uuidv4(),
      location,
      locationName: cityInfo.name,
      countryCode: cityInfo.countryCode,
      cityCenterCoordinates: cityInfo.cityCenterCoordinates,
      timerange: timerange ?? {
        start: travelEndTime,
        end: endDate,
      },

      previousHostelData: [],
      isAccommodationReserved: false,
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
    trackEvent("planner_remove_step");
    const newJourney = this.journey.steps.filter(
      (journeyStep) => "id" in journeyStep && journeyStep.id !== step.id
    );
    this.journey.steps = newJourney; // Allow immediately updating the UI
    this.emit("change");
    await this.recalculateJourneySteps(newJourney);
    this.emit("change");
  }

  async changeStayDuration(stay: JourneyStay, changedDays: number) {
    trackEvent("planner_change_stay_duration");
    stay.timerange.end = new Date(
      stay.timerange.start.getTime() + changedDays * 1000 * 60 * 60 * 24
    );

    await this.recalculateJourneySteps(this.journey.steps);
    this.emit("change");
  }

  async setStartDate(startDate?: Date) {
    trackEvent("planner_set_start_date");
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
    trackEvent("planner_set_preferred_departure_time");
    trackEvent(
      `planner_set_preferred_departure_time_${preferredDepartureTime}`
    );
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

  async chooseAlternativeRide(
    ride: JourneyRide,
    alternativeRide: InterrailTimetableEntry
  ) {
    trackEvent("planner_choose_alternative_ride");
    this.journey.steps = this.stepPlanner.chooseAlternativeRide(
      ride,
      alternativeRide,
      this.journey.steps
    );
    await this.recalculateJourneySteps(this.journey.steps);
    this.emit("change");
  }

  async findHostels() {
    const stays = this.journey.steps.filter(
      (step) => step.type === "stay"
    ) as JourneyStay[];

    for (const stay of stays) {
      const hasHostelsForCurrentTimeRange =
        stay.hostels &&
        timeRangesContainSameDays(stay.hostels.timerange, stay.timerange);
      const hasOvernightStay =
        getTimerangeLengthToDaysInDays(stay.timerange) > 0;
      const isHostelDataUpToDate =
        stay.hostels &&
        +stay.hostels.updatedAt > Date.now() - 1000 * 60 * 60 * 24; // Hostel data is updated every 24 hours

      if (
        (!hasHostelsForCurrentTimeRange || !isHostelDataUpToDate) &&
        hasOvernightStay
      ) {
        await this.updateHostelData(stay);
      }
    }
  }

  async updateHostelData(stay: JourneyStay) {
    if (!stay.previousHostelData) stay.previousHostelData = [];
    if (stay.hostels) {
      const hasHostelsForCurrentTimeRange =
        stay.hostels &&
        timeRangesContainSameDays(stay.hostels.timerange, stay.timerange);

      if (hasHostelsForCurrentTimeRange) {
        stay.previousHostelData.push(stay.hostels);
      }
    }

    stay.hostels = await this.withLoading(() =>
      this.hostels.getHostelsForStay(stay)
    );
    this.emit("change");
  }

  async getWeather() {
    const stays = this.journey.steps.filter(
      (step) => step.type === "stay"
    ) as JourneyStay[];

    for (const stay of stays) {
      if (
        (!stay.weather ||
          !timeRangesContainSameDays(stay.weather.timerange, stay.timerange)) &&
        getTimerangeLengthToDaysInDays(stay.timerange) > 0
      ) {
        stay.weather = await this.withLoading(() =>
          this.weather.getWeatherForStay(stay)
        );
        this.emit("change");
      }
    }
  }
}
