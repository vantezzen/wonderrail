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
