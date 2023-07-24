import { InterrailTimetableLeg, JourneyRide } from "../types";
import { getDurationFromInterrail } from "../utils/date";

export enum LayoverType {
  ShortLayovers,
  OvernightLayover,
  LongLayovers,
}

export type LayoversAlert = {
  type: LayoverType;
  leg: InterrailTimetableLeg;
};

export default class LayoverChecker {
  private ride: JourneyRide | null = null;

  checkRide(ride: JourneyRide) {
    this.ride = ride;
    const layovers = this.getLayovers();
    const alerts = this.getLayoverAlerts(layovers);
    return alerts;
  }

  private getLayovers() {
    const layovers: InterrailTimetableLeg[] = [];
    for (const leg of this.ride!.details?.legs || []) {
      if (leg.type !== "TRAIN_TRAVEL") {
        layovers.push(leg);
      }
    }
    return layovers;
  }

  private getLayoverAlerts(layovers: InterrailTimetableLeg[]) {
    const alerts: LayoversAlert[] = [];
    for (const leg of layovers) {
      const layoverType = this.getLayoverType(leg);
      if (layoverType) {
        alerts.push({
          type: layoverType,
          leg,
        });
      }
    }
    return alerts;
  }

  private getLayoverType(leg: InterrailTimetableLeg) {
    const durationInMinutes =
      getDurationFromInterrail(leg.duration) / 1000 / 60;
    const startTime = this.getLegStartTime(leg);
    const endTime = new Date(
      startTime.getTime() + durationInMinutes * 60 * 1000
    );
    const isSameDay =
      startTime.toLocaleDateString() === endTime.toLocaleDateString();

    const isOvernightLayover =
      (!isSameDay && durationInMinutes > 60 * 4) ||
      (isSameDay && startTime.getHours() < 3 && endTime.getHours() > 7);

    if (isOvernightLayover) {
      return LayoverType.OvernightLayover;
    }

    const isLongLayover = durationInMinutes > 60 * 3;
    if (isLongLayover) {
      return LayoverType.LongLayovers;
    }

    const isShortLayover = durationInMinutes < 10;
    if (isShortLayover) {
      return LayoverType.ShortLayovers;
    }

    return null;
  }

  private getLegStartTime(leg: InterrailTimetableLeg) {
    const startTime = new Date(this.ride!.details!.departure);
    for (const step of this.ride!.details!.legs) {
      if (step.id === leg.id) {
        return startTime;
      }
      const stepDuration = getDurationFromInterrail(step.duration);
      startTime.setTime(startTime.getTime() + stepDuration);
    }
    return startTime;
  }
}
