import { JourneyTimerange } from "../types";
import { padLeft } from "./number";

export function daysBetween(start: Date, end: Date) {
  const diff = end.getTime() - start.getTime();
  return Math.round(diff / (1000 * 3600 * 24));
}

export function durationBetween(start: Date, end: Date) {
  const diff = end.getTime() - start.getTime();
  const hours = Math.floor(diff / (1000 * 3600));
  const minutes = Math.floor((diff - hours * 1000 * 3600) / (1000 * 60));
  return `${padLeft(hours, 2)}:${padLeft(minutes, 2)}`;
}

export function getDurationFromGeoJson(length: string) {
  const [hours, minutes] = length.split(" ");
  return parseInt(hours) * 60 + parseInt(minutes);
}

export function getDurationFromInterrail(duration: {
  hours: number;
  minutes: number;
}) {
  return (duration.hours * 60 + duration.minutes) * 60 * 1000;
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function getTravellableDate(date: Date) {
  // Return the day at 10am to make sure we are at a nice time for travelling
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10);
}

export function getTimerangeLengthToDays(timerange: JourneyTimerange) {
  const start = getTravellableDate(timerange.start);
  const end = getTravellableDate(timerange.end);
  return daysBetween(start, end) * 24 * 60 * 60 * 1000;
}
