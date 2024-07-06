import { callCreateCart, callUpdateCart } from "api/cartApi";
import { getCheckoutUrl } from "api/checkoutApi";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Order } from "square";

//export const dynamic = 'force-dynamic' // defaults to auto
// export async function GET(request: Request) {
//   const body = await request.json();
//   const { result } = await callUpdateCart(body, {
//     method: "PUT",
//   });
//   return Response.json(result);
// }

