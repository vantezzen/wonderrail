import { GeoCity } from "../Journey/Planner";
import { JourneyLocation } from "../types";

export function journeyLocationToGeoCity(location: JourneyLocation): GeoCity {
  return {
    id: location.id,
    name: location.name,
    location: location.location,
  };
}
