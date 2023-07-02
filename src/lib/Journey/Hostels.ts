import { HostelData, JourneyStay } from "../types";
import { getTimerangeLengthToDaysInDays } from "../utils/date";
import { round } from "../utils/number";

export default class Hostels {
  public async getHostelsForStay(stay: JourneyStay): Promise<HostelData> {
    const cityName = stay.locationName ?? stay.location.name;

    const searchParams = {
      location: cityName,
      startDate: stay.timerange.start.toISOString().split("T")[0],
      duration: getTimerangeLengthToDaysInDays(stay.timerange),
    };
    const hostelResponse = await fetch(
      `/api/hostels/search?${new URLSearchParams(searchParams as any)}`
    );
    const hostels = await hostelResponse.json();

    return {
      timerange: structuredClone(stay.timerange),
      lowestPricePerNight: hostels.filterData.lowestPricePerNight.value,
      highestPricePerNight: hostels.filterData.highestPricePerNight.value,
      locationId: hostels.location.city.id,
      hostels: hostels.properties.map((hostel: any) => ({
        id: hostel.id,
        name: hostel.name,
        lowestAveragePricePerNight: hostel.lowestAveragePricePerNight.value,
        veryPopular: hostel.veryPopular,
        starRating: round(hostel.ratingBreakdown.average / 20, 1),
      })),
    };
  }

  public getBookingLink(stay: JourneyStay) {
    const urlParams = {
      q: stay.locationName ?? stay.location.name,
      type: "city",
      id: stay.hostels?.locationId,
      from: stay.timerange.start.toISOString().split("T")[0],
      to: stay.timerange.end.toISOString().split("T")[0],
      guests: 1,
    };
    const url = `https://www.hostelworld.com/pwa/wds/s?${new URLSearchParams(
      urlParams as any
    )}`;
    return url;
  }
}
