import { Journey, JourneyStay } from "../types";
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

    const cost = {
      totalReservationPrice,
      totalFoodPrice,
      totalAccommodationPrice,
      total: totalReservationPrice + totalFoodPrice + totalAccommodationPrice,
    };
    console.log(cost);
    return cost;
  }
}
