import dedent from "ts-dedent";
import { AiRequestSchema, AiResponse } from "@/lib/types";
import { Configuration, OpenAIApi } from "openai";
import { getInterrailStations } from "@/lib/api/getInterrailStations";

const EXAMPLE = [
  {
    startDate: "Tue Aug 01 2023",
    endDate: "Tue Aug 01 2023",
    location: "Hamburg, Germany",
    comment: "",
    totalTrains: 0,
    travelTime: 0,
    station: {
      id: "008002710",
      name: "HAMBURG (Germany)",
      interrailId: "008002710",
      coordinates: { lat: 53.550341, lng: 10.000654 },
    },
  },
  {
    location: "Madrid, Spain",
    startDate: "Tue Aug 01 2023",
    endDate: "Sat Aug 05 2023",
    travelTime: 240,
    comment:
      "Madrid is the capital city of Spain and is known for its rich history, iconic architecture, and vibrant culture. It's a great starting point for exploring the country.",
    totalTrains: 1,
    station: {
      id: "007199999",
      name: "MADRID CITY (Spain)",
      interrailId: "007199999",
      coordinates: { lat: 37.4067596, lng: -5.9540039 },
    },
  },
  {
    location: "Rome, Italy",
    startDate: "Wed Aug 09 2023",
    endDate: "Sun Aug 13 2023",
    travelTime: 300,
    comment:
      "Rome, the eternal city, is a must-visit for history and art lovers. Explore iconic landmarks like the Colosseum, Vatican City, and Trevi Fountain.",
    totalTrains: 1,
    station: {
      id: "008399001",
      name: "ROME (Italy)",
      interrailId: "008399001",
      coordinates: { lat: 41.8933203, lng: 12.4829321 },
    },
  },
  {
    location: "Florence, Italy",
    startDate: "Sun Aug 13 2023",
    endDate: "Thu Aug 17 2023",
    travelTime: 90,
    comment:
      "Florence is a cultural gem in Italy, famous for its Renaissance art and architecture. Visit the Uffizi Gallery, Duomo, and Ponte Vecchio.",
    totalTrains: 1,
    station: {
      id: "008399003",
      name: "FLORENCE (Italy)",
      interrailId: "008399003",
      coordinates: { lat: 43.7698712, lng: 11.2555757 },
    },
  },
  {
    location: "Paris, France",
    startDate: "Thu Aug 17 2023",
    endDate: "Mon Aug 21 2023",
    travelTime: 420,
    comment:
      "Paris, the city of love, is known for its iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. Indulge in French cuisine and explore charming neighborhoods like Montmartre.",
    totalTrains: 1,
    station: {
      id: "008724855",
      name: "PARIS (France)",
      interrailId: "008724855",
      coordinates: { lat: 48.8534951, lng: 2.3483915 },
    },
  },
  {
    location: "Nice, France",
    startDate: "Mon Aug 21 2023",
    endDate: "Fri Aug 25 2023",
    travelTime: 285,
    comment:
      "Nice is a beautiful coastal city on the French Riviera, known for its stunning beaches, vibrant markets, and charming old town. Enjoy the Mediterranean vibe and try some delicious seafood.",
    totalTrains: 1,
    station: {
      id: "008775605",
      name: "NICE VILLE (France)",
      interrailId: "008775605",
      coordinates: { lat: 43.7047452, lng: 7.2615981 },
    },
  },
  {
    location: "Marseille, France",
    startDate: "Fri Aug 25 2023",
    endDate: "Tue Aug 29 2023",
    travelTime: 120,
    comment:
      "Marseille is a vibrant port city in France, known for its rich history, vibrant cultural scene, and delicious seafood. Explore the Old Port, Notre-Dame de la Garde, and enjoy stunning coastal views.",
    totalTrains: 1,
    station: {
      id: "008775100",
      name: "MARSEILLE ST CHARLES (France)",
      interrailId: "008775100",
      coordinates: { lat: 43.3032635, lng: 5.3811927 },
    },
  },
  {
    startDate: "Thu Aug 31 2023",
    endDate: "Thu Aug 31 2023",
    location: "Hamburg, Germany",
    comment: "",
    totalTrains: 0,
    travelTime: 0,
    station: {
      id: "008002710",
      name: "HAMBURG (Germany)",
      interrailId: "008002710",
      coordinates: { lat: 53.550341, lng: 10.000654 },
    },
  },
];

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
  const requestBody = await request.json();
  const data = AiRequestSchema.parse(requestBody);
  const travelDaysTotal = Math.floor(
    (data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // return new Response(JSON.stringify(EXAMPLE), {
  //   headers: {
  //     "content-type": "application/json;charset=UTF-8",
  //   },
  // });

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "system",
          content: dedent`
            As a travel AI planning Interrail itineraries, adapt to user's preferences and constraints.
            The iterinary:
            - should be as long as possible, but not longer than the end date.
            - should not include the start and end location given by the user in the output as it is added separately.
            - should not include any locations from the country of the start and end location.
            - should be reordered to minimize travel time by travelling to the least distant location.
            - should include a short comment for each location, explaining the rationale and highlights and addressing the user's preferences directly.
          `,
        },
        {
          role: "user",
          content: dedent`
            Constraints:
            Start: ${data.startDate.toDateString()}
            End: ${data.endDate.toDateString()}
            Trains: max. ${data.travelDays}
            Start and end Location: ${data.startCity}
            Approx. days at each location: ${Math.floor(
              travelDaysTotal / data.travelDays
            )}
            At the start and end location, the stay should be 0 days long.
            
            Preferences:
            ${data.preferences}
          `,
        },
      ],
      functions: [
        {
          name: "addLocations",
          description: "Add all locations to the itinerary",
          parameters: {
            type: "object",
            properties: {
              locations: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    location: {
                      type: "string",
                      description:
                        "The location of the stay (city and country)",
                    },
                    startDate: {
                      type: "string",
                      description: "The start date of the stay (YYYY-MM-DD)",
                    },
                    endDate: {
                      type: "string",
                      description: "The end date of the stay (YYYY-MM-DD)",
                    },
                    travelTime: {
                      type: "number",
                      description:
                        "The travel time from the previous location in minutes",
                    },
                    comment: {
                      type: "string",
                      description:
                        "A comment about the location, rationale and highlights",
                    },
                    totalTrains: {
                      type: "number",
                      description:
                        "The total number of trains used so far (cumulative, must increase by 1 at each location)",
                    },
                  },
                  required: [
                    "location",
                    "startDate",
                    "endDate",
                    "travelTime",
                    "comment",
                    "totalTrains",
                  ],
                },
              },
            },
            required: ["locations"],
          },
        },
      ],
      function_call: {
        name: "addLocations",
      },
    });

    const message = response.data.choices[0].message!;

    const startLocation = {
      startDate: data.startDate.toDateString(),
      endDate: data.startDate.toDateString(),
      location: data.startCity,
      comment: "",
      totalTrains: 0,
      travelTime: 0,
    };
    const locationResponse: AiResponse = JSON.parse(
      message.function_call?.arguments!
    ).locations.slice(0, data.travelDays - 1);

    const locations = [
      { ...startLocation },
      ...locationResponse,
      {
        ...startLocation,
        startDate: data.endDate.toDateString(),
        endDate: data.endDate.toDateString(),
      },
    ];

    const locationsWithCoordinates = (
      await Promise.all(
        locations.map(async (location: any) => {
          const station = (
            await getInterrailStations(location.location, 1).catch((e) => [])
          )[0];

          if (!station) {
            return null;
          }

          return {
            ...location,
            station,
          };
        })
      )
    ).filter(Boolean);

    return new Response(JSON.stringify(locationsWithCoordinates), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  } catch (e: any) {
    console.log("Error", e);
    console.error(e.toJSON());
    console.log("Response", e.response.data);
    return new Response(JSON.stringify(e.response.data), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }
}
