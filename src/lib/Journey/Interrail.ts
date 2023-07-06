import { trackEvent } from "../analytics";
import {
  InterrailLocation,
  InterrailTimetableEntry,
  JourneyRide,
} from "../types";

export type InterrailTimetableRequest = {
  origin: string; // station id
  destination: string; // station id
  timestamp: string;
  tripsNumber: number;
  arrival: boolean;
  currency: string;
  travellers: number;
  minChangeTime?: number;
};

export default class Interrail {
  async searchStations(query: string): Promise<InterrailLocation[]> {
    trackEvent("interrail_search_stations");
    const apiEndpoint = `/api/interrail/stations/${encodeURIComponent(query)}`;
    const response = await fetch(apiEndpoint);
    return await response.json();
  }

  async getTimetable(
    request: InterrailTimetableRequest
  ): Promise<InterrailTimetableEntry[]> {
    trackEvent("interrail_get_timetable");
    const params = new URLSearchParams(request as any);
    const apiEndpoint = `/api/interrail/timetable?${params.toString()}`;
    const response = await fetch(apiEndpoint);
    return await response.json();
  }

  getBookingUrl(ride: JourneyRide) {
    if (!ride.details) {
      return "";
    }
    trackEvent("interrail_get_booking_url");

    const sourceStation = ride.details.legs[0].start;
    const destinationStation =
      ride.details.legs[ride.details.legs.length - 1].end;

    const sourceStationName = `${sourceStation.station} (${sourceStation.country})`;
    const destinationStationName = `${destinationStation.station} (${destinationStation.country})`;

    const bookingParams = {
      ol: sourceStationName,
      ov: sourceStation.id,
      dl: destinationStationName,
      dv: destinationStation.id,
      vl: "",
      vv: "",
      t: new Date(ride.details.departure).getTime(),
      ar: false,
      rt: "",
      tt: "",
      mc: "",
      mct: 0,
    };
    const params = new URLSearchParams(bookingParams as any);
    const url = `https://www.interrail.eu/de/book-reservations#/?${params.toString()}`;
    return url;
  }
}
