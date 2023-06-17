import { getInterrailStations } from "@/lib/api/getInterrailStations";
import NodeGeocoder from "node-geocoder";

export async function GET(
  request: Request,
  { params }: { params: { query: string } }
) {
  const stations = await getInterrailStations(params.query);

  return new Response(JSON.stringify(stations), {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}
