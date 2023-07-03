import getNeutralCityName from "@/lib/api/getNeutralCityName";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const cityName = await getNeutralCityName(params.query);

  return new Response(JSON.stringify({ cityName }), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
