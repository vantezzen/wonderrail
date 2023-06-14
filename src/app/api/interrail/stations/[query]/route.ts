export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const apiEndpoint = `https://api.timetable.eurail.com/v2/locations?input=${encodeURIComponent(
    params.query
  )}&results=15`;

  const response = await fetch(apiEndpoint);
  return new Response(JSON.stringify(await response.json()), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
