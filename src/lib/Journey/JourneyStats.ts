import { JourneyStay } from "../types";
import { getDistanceFromLatLonInKm } from "../utils/coordinates";
import { getTimerangeLengthToDaysInDays } from "../utils/date";
import Planner from "./Planner";

export default class JourneyStats {
  constructor(public planner: Planner) {}

  get() {
    const totalReservationAmount = this.planner.journey.steps.reduce(
      (total, step) => {
        if (step.type === "ride" && step.needsReservation) {
          return total + 1;
        }
        return total;
      },
      0
    );

    const journeyStart = this.planner.journey.startDate || new Date();
    const journeyEnd =
      (
        this.planner.journey.steps[
          this.planner.journey.steps.length - 1
        ] as JourneyStay
      )?.timerange?.end ||
      this.planner.journey.startDate ||
      new Date();
    const journeyLength = getTimerangeLengthToDaysInDays({
      start: journeyStart,
      end: journeyEnd,
    });
    const cost = this.calculateJourneyCosts(journeyLength);

    const distance = this.planner.journey.steps.reduce((total, step) => {
      if (step.type === "ride") {
        return total + getDistanceFromLatLonInKm(step.start, step.end);
      }
      return total;
    }, 0);

    const totalTimeOnTrains = this.planner.journey.steps.reduce(
      (total, step) => {
        if (step.type === "ride") {
          const durationInMinutes = step.details
            ? step.details.duration.minutes + 60 * step.details.duration.hours
            : 0;
          return total + durationInMinutes;
        }
        return total;
      },
      0
    );

    const travelDays = this.getTravelDays();

    return {
      totalReservationAmount,
      totalTimeOnTrains,
      cost,
      distance,
      journeyLength,
      timerange: {
        start: journeyStart,
        end: journeyEnd,
      },
      travelDays,
    };
  }

  private calculateJourneyCosts(journeyLength: number) {
    const totalReservationPrice = this.planner.journey.steps.reduce(
      (total, step) => {
        if (step.type === "ride" && step.price) {
          return total + Number(step.price);
        }
        return total;
      },
      0
    );
    const totalFoodPrice =
      journeyLength * this.planner.journey.priceForFoodPerDay;
    const totalAccommodationPrice =
      journeyLength * this.planner.journey.priceForAccommodationPerDay;

    const priceForInterrailTicket =
      this.planner.journey.priceForInterrailTicket;

    const cost = {
      priceForInterrailTicket,
      totalReservationPrice,
      totalFoodPrice,
      totalAccommodationPrice,
      total:
        totalReservationPrice +
        totalFoodPrice +
        totalAccommodationPrice +
        priceForInterrailTicket,
    };
    console.log(cost);
    return cost;
  }

  // Interrail Ticket uses "travel days" for pricing.
  // A travel day is a day where any train is used, it doesn't matter
  // how many trains are used on that day.
  private getTravelDays() {
    const travelDates = new Set<string>();

    for (const step of this.planner.journey.steps) {
      if (step.type === "ride") {
        // Add all dates between start and end date
        const startDate = new Date(step.timerange.start);
        const endDate = new Date(step.timerange.end);

        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          travelDates.add(currentDate.toLocaleDateString());
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    }

    return travelDates.size;
  }
}
