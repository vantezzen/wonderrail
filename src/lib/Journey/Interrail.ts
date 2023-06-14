export type InterrailStation = {
  id: string;
  station: string;
};

export default class Interrail {
  async searchStations(query: string): Promise<InterrailStation[]> {
    const apiEndpoint = `/api/interrail/stations/${encodeURIComponent(query)}`;
    const response = await fetch(apiEndpoint);
    return await response.json();
  }
}
