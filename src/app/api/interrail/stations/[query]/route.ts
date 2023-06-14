import NodeGeocoder from "node-geocoder";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const apiEndpoint = `https://api.timetable.eurail.com/v2/locations?input=${encodeURIComponent(
    params.query
  )}&results=5`;

  const response = await fetch(apiEndpoint);
  const stations = (await response.json()) as any;

  const geocoder = NodeGeocoder({
    provider: "openstreetmap",
    // @ts-ignore
    fetch: (url: string, options: any) => {
      return fetch(url, {
        ...options,
        headers: {
          "user-agent": "WonderRail <wonderrail@vantezzen.io>",
        },
      });
    },
  });

  const stationsWithLocations = (
    await Promise.all(
      stations.map(async (station: any) => {
        const geocode = await geocoder.geocode({
          // @ts-ignore
          q: station.station,
          limit: 1,
        });
        console.log(station.station, geocode);

        if (geocode.length === 0) {
          return null;
        }

        return {
          id: station.id,
          name: station.station,
          interrailId: station.id,
          coordinates: {
            lat: geocode[0].latitude,
            lng: geocode[0].longitude,
          },
        };
      })
    )
  ).filter(Boolean);

  return new Response(JSON.stringify(stationsWithLocations), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
