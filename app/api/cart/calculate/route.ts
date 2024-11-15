import { calculateCart } from "api/cartApi";

//export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  const result = await calculateCart(body);
  return Response.json(result);
}
