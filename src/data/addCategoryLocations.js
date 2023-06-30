const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "categories.json");

const categoriesJson = fs.readFileSync(filePath, "utf-8");
let categories = JSON.parse(categoriesJson);

(async () => {
  for (const category of Object.keys(categories)) {
    categories[category] = await Promise.all(
      categories[category].map(async (location) => {
        const apiEndpoint = `https://api.timetable.eurail.com/v2/locations?input=${encodeURIComponent(
          location.name
        )}&results=1`;

        const response = await fetch(apiEndpoint);
        const data = await response.json();

        return {
          ...location,
          interrailId: data[0].id,
        };
      })
    );
  }

  fs.writeFileSync(filePath, JSON.stringify(categories, null, 2));
})();
