import { callCreateCart, callUpdateCart } from "api/cartApi";
import { getCheckoutItemUrl, getCheckoutOrderUrl } from "api/checkoutApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Order } from "square";

export const dynamic = 'force-dynamic' // defaults to auto
export async function POST(request: Request) {
  const body = await request.json();
  const result = await getCheckoutItemUrl(body);
  return Response.json(result);
}

