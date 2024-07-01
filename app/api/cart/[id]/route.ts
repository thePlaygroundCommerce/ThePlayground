import { callGetCart } from "api/cartApi";
import { cookies } from "next/headers";
import { Order } from "square";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  
  const id = params.id;
  const { result } = await callGetCart(id);

  return Response.json(result);
}

