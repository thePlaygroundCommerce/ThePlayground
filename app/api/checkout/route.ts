import { callCreateCart, callUpdateCart } from "api/cartApi";

//export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {
  const body = await request.json();
  const { result } = await callUpdateCart(body, {
    method: "PUT",
  });
  return Response.json(result); 
}
