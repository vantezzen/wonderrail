const path = require("path");
const fs = require("fs");
const NodeGeocoder = require("node-geocoder");

const geocoder = NodeGeocoder({
  provider: "openstreetmap",
});

const filePath = path.join(__dirname, "categories.json");

const categoriesJson = fs.readFileSync(filePath, "utf-8");
let categories = JSON.parse(categoriesJson);

console.log("Geocoding and adding Interrail IDs to locations...");
console.log(
  "THIS ACTION IS DESTRUCTIVE AND MAY REMOVE LOCATIONS. MAKE SURE TO COMMIT YOUR CHANGES BEFORE RUNNING THIS SCRIPT."
);

(async () => {
  for (const category of Object.keys(categories)) {
    for (const locationId in categories[category]) {
      const location = categories[category][locationId];
      const geocode = await geocoder.geocode({
        q: location.name,
        limit: 1,
        language: "en",
      });
      const locationData = geocode[0];
      if (!locationData) {
        console.log(`No Geocode info found for ${location.name}`);
        categories[category][locationId] = undefined;
        continue;
      }
      let cityName = `${locationData.city}, ${locationData.country}`;
      if (
        !locationData.city ||
        location.name.startsWith(locationData.city) ||
        String(location.name).includes("(Greece)")
      ) {
        cityName = location.name;
      }
      console.log(`Geocode: ${location.name} -> ${cityName}`);

      const apiEndpoint = `https://api.timetable.eurail.com/v2/locations?input=${encodeURIComponent(
        cityName
      )}&results=1`;

      const response = await fetch(apiEndpoint);
      const data = await response.json();
      const interrailId = data[0]?.id;
      console.log(`Interrail: ${cityName} -> ${interrailId}`);

      if (!interrailId) {
        console.log(`No Interrail ID found for ${cityName}`);
        categories[category][locationId] = undefined;
        continue;
      }

      const newLocation = {
        ...location,
        name: cityName,
        interrailId,
      };

      categories[category][locationId] = newLocation;
    }

    categories[category] = Object.values(categories[category]).filter(Boolean);
  }

  fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
})();
