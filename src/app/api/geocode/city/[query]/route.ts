import getCityInfo from "@/lib/api/getCityInfo";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const cityName = await getCityInfo(params.query);

  return new Response(JSON.stringify(cityName), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
