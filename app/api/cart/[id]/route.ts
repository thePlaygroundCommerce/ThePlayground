import { callGetCart } from "api/cartApi";
import { cookies } from "next/headers";
import { Order } from "square";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { signal } = new AbortController()
  const id = params.id;
  const order: Order = await callGetCart(id);

  return Response.json(order);
}

