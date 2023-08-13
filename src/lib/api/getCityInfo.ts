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
    limit: 10,
  });

  if (geocode.length === 0) {
    return null;
  }

  const location =
    geocode.find((location) => location.country && location.city) || geocode[0];
  const cityName = `${location.city}, ${location.country}`;

  const cityCenterGeocode = await geocoder.geocode({
    // @ts-ignore
    q: cityName,
    limit: 10,
  });
  const cityCenter =
    cityCenterGeocode.find((location) => location.country && location.city) ||
    cityCenterGeocode[0];

  return {
    name: cityName,
    countryCode: location.countryCode,
    cityCenterCoordinates: {
      lat: cityCenter.latitude,
      lng: cityCenter.longitude,
    },
  };
}
