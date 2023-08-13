import { Coordinate } from "../types";

export default class BackendApi {
  async getCityInfo(
    name: string
  ): Promise<{
    name: string;
    countryCode: string;
    cityCenterCoordinates: Coordinate;
  }> {
    const backendResponse = await fetch(
      `/api/geocode/city/${encodeURIComponent(name)}`
    );
    const cityData = await backendResponse.json();
    return cityData;
  }
}
