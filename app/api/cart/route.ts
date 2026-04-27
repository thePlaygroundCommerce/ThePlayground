import { callCreateCart, callUpdateCart } from "api/cartApi";

//export const dynamic = 'force-dynamic' // defaults to auto
export async function PUT(request: Request) {
  const body = await request.json();
  const result = await callUpdateCart(body);
  return Response.json(result);
}

//export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  const result = await callCreateCart(body);

  console.log(result)

  return Response.json(result);
}
