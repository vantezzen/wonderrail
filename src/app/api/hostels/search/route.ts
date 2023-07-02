import getNeutralCityName from "@/lib/api/getNeutralCityName";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  if (
    !params.get("location") ||
    !params.get("startDate") ||
    !params.get("duration")
  ) {
    return new Response(JSON.stringify({}), {
      status: 400,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }
  const cityName = await getNeutralCityName(params.get("location")!);

  const findCityUrl = `https://www.hostelworld.com/find/autocomplete?term=${cityName}`;
  const findCityResponse = await fetch(findCityUrl);
  const findCityData = await findCityResponse.json();

  const city = findCityData.filter((e: any) => e.type === "city")[0];
  const cityId = city?.id;
  if (!cityId) {
    return new Response(JSON.stringify({}), {
      status: 404,
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  }

  const getHostelsParams = {
    currency: "EUR",
    application: "web",
    "user-id": "aa00a0a0-aa0a-00f0-a00a-a0000000000",
    "date-start": params.get("startDate"),
    "num-nights": params.get("duration"),
    guests: 1,
    "per-page": 100,
    "show-rooms": 1,
    "property-num-images": 30,
    v: "control",
  };
  const getHostelsParamsString = new URLSearchParams(
    getHostelsParams as any
  ).toString();
  const getHostelsUrl = `https://prod.apigee.hostelworld.com/legacy-hwapi-service/2.2/cities/${cityId}/properties/?${getHostelsParamsString}`;

  const getHostelsResponse = await fetch(getHostelsUrl);
  const getHostelsData = await getHostelsResponse.json();

  return new Response(JSON.stringify(getHostelsData), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
