import { getCheckoutItemUrl } from "api/checkoutApi";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  const result = await getCheckoutItemUrl(body);
  return Response.json(result);
}

