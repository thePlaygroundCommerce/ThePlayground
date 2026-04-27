import { callCalculateCart } from "api/cartApi";

//export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  const result = await callCalculateCart(body);
  return Response.json(result);
}
