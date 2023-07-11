export default class BackendApi {
  async getCityInfo(
    name: string
  ): Promise<{ name: string; countryCode: string }> {
    const backendResponse = await fetch(
      `/api/geocode/city/${encodeURIComponent(name)}`
    );
    const cityData = await backendResponse.json();
    return cityData;
  }
}
