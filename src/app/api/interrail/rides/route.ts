export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams.toString();

  const apiEndpoint = `https://api.timetable.eurail.com/v2/timetable?${params}`;

  const response = await fetch(apiEndpoint);
  return new Response(JSON.stringify(await response.json()), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
