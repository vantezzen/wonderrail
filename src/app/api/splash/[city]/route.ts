export async function GET(
  request: Request,
  { params }: { params: { city: string } }
) {
  const apiEndpoint = new URL(`https://api.unsplash.com/photos/random`);

  // @ts-ignore
  const query = new URLSearchParams({
    query: params.city,
    content_filter: "high",
    orientation: "landscape",
    client_id: process.env.UNSPLASH_ACCESS_KEY,
  });
  apiEndpoint.search = query.toString();

  const response = await fetch(apiEndpoint.toString());
  const photos = await response.json();
  console.log(photos);
  const photoUrl = photos.urls.small;

  return Response.redirect(photoUrl, 302);
}
