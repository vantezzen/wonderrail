import { InterrailLocation } from "../types";

export type InterrailTimetableLeg = {
  start: {
    station: string;
    id: string;
    country: string;
  };
  end: {
    station: string;
    id: string;
    country: string;
  };
  transport: {
    type: string;
    code: string;
  };
  facilities: string[];
  prices: {
    type: "FIRST_CLASS" | "SECOND_CLASS";
    amount: number;
  }[];
  id: string;
  bookingInformation: {
    advanceBookingDuration: string;
    scheduleServiceDays: string;
    carrierUrl: string;
    extraTextWeb: string;
    bookViaEmail: string;
    bookViaPhone: string;
    linkToBook1: string;
    linkToBook2: string;
    linkToCarrierTimetable: string;
    warningLabels: string[];
    websiteBookingAvailable: boolean;
  };
  type: "TRAIN_TRAVEL";
  status: "REQUIRED" | "NOT_REQUIRED" | "OUTDATED" | "INVALID";
  duration: {
    hours: number;
    minutes: number;
  };
  trainType: string;
  reservationAttributes: string[];
  supplementRequired: boolean;
};

export type InterrailTimetableEntry = {
  id: string;
  price: number;
  status: "REQUIRED" | "NOT_REQUIRED";
  duration: {
    hours: number;
    minutes: number;
  };
  legs: InterrailTimetableLeg[];
  departure: string;
  arrival: string;
};

export type InterrailTimetableRequest = {
  origin: string; // station id
  destination: string; // station id
  timestamp: string;
  tripsNumber: number;
  arrival: boolean;
  currency: string;
  travellers: number;
};

export default class Interrail {
  async searchStations(query: string): Promise<InterrailLocation[]> {
    const apiEndpoint = `/api/interrail/stations/${encodeURIComponent(query)}`;
    const response = await fetch(apiEndpoint);
    return await response.json();
  }

  async getTimetable(
    request: InterrailTimetableRequest
  ): Promise<InterrailTimetableEntry[]> {
    const params = new URLSearchParams(request as any);
    const apiEndpoint = `/api/interrail/timetable?${params.toString()}`;
    const response = await fetch(apiEndpoint);
    return await response.json();
  }
}
