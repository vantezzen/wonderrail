const path = require("path");
const kml = require("gtran-kml");
const fs = require("fs");

const inputPath = path.join(__dirname, "Eurail Map.kml");
const outputPath = path.join(__dirname, "eurail.json");

kml.toGeoJson(inputPath).then(async (object) => {
  const cities = await Promise.all(
    object.features
      .filter((feature) => feature.geometry.type === "Point")
      .map((feature) => ({
        id: `${feature.properties.name}-${feature.geometry.coordinates[0]}-${feature.geometry.coordinates[1]}`,
        name: feature.properties.name,
        location: {
          lat: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
        },
      }))
      .map(async (station) => {
        const apiEndpoint = `https://api.timetable.eurail.com/v2/locations?input=${encodeURIComponent(
          station.name
        )}&results=15`;

        const response = await fetch(apiEndpoint);
        const data = await response.json();

        return {
          ...station,
          interrailId: data[0].id,
        };
      })
  );

  const lines = object.features
    .filter((feature) => feature.geometry.type === "LineString")
    .map((feature) => ({
      id: `${feature.properties.name}-${feature.geometry.coordinates[0][0]}-${feature.geometry.coordinates[0][1]}-${feature.geometry.coordinates[1][0]}-${feature.geometry.coordinates[1][1]}`,
      from: {
        lat: feature.geometry.coordinates[0][1],
        lng: feature.geometry.coordinates[0][0],
      },
      to: {
        lat: feature.geometry.coordinates[1][1],
        lng: feature.geometry.coordinates[1][0],
      },
      duration: feature.properties.duration,
    }));

  fs.writeFileSync(
    outputPath,
    JSON.stringify({
      cities,
      lines,
    })
  );
});
