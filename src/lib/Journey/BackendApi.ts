export default class BackendApi {
  async getNeutralCityName(name: string): Promise<string | undefined> {
    const backendResponse = await fetch(
      `/api/geocode/cityName/${encodeURIComponent(name)}`
    );
    const cityData = await backendResponse.json();
    return cityData.cityName ?? undefined;
  }
}
