import NodeGeocoder from "node-geocoder";
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

export default async function getCityInfo(name: string) {
  const geocode = await geocoder.geocode({
    // @ts-ignore
    q: name,
    limit: 1,
  });

  if (geocode.length === 0) {
    return null;
  }

  const location =
    geocode.find((location) => location.country && location.city) || geocode[0];
  return {
    name: `${location.city}, ${location.country}`,
    countryCode: location.countryCode,
  };
}
