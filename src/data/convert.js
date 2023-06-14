const path = require("path");
const kml = require("gtran-kml");
const fs = require("fs");

const inputPath = path.join(__dirname, "Eurail Map.kml");
const outputPath = path.join(__dirname, "eurail.geojson");

kml.toGeoJson(inputPath).then((object) => {
  fs.writeFileSync(outputPath, JSON.stringify(object));
});
