import { InterrailLocation } from "../types";

export type InterrailTimetableEntry = {
  id: string;
  price: number;
  status: "REQUIRED" | "NOT_REQUIRED";
  duration: {
    hours: number;
    minutes: number;
  };
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
