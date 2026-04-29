"use server";

import type * as Square from "@square/web-sdk";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import logger from "util/logger";
import { callGetCart } from "./cartApi";
import { revalidatePath } from "next/cache";
import { Square as client } from "./clients";
import { randomUUID } from "crypto";
import { Address } from "square";

const pay = async (
  tokenRes: Square.TokenResult,
  {
    email: buyerEmailAddress,
    billingAddress,
    shippingAddress,
  }: { email?: string; billingAddress?: Address; shippingAddress: Address }
) => {
  // Implement server-side payment processing logic here
  // This could involve calling an API to process the payment
  // and returning a response to the client.

  if(tokenRes.status !== "OK") return 

  const { token } = tokenRes

  const store = await cookies();
  const cartId = store.get("cartId")?.value;
  const { order: order } = await callGetCart(cartId ?? "");
  if (!cartId || !order) {
    logger.error("No Shopping Cart Found");
    return redirect("/");
  }

  const payment = await client.orders
    .update({
      orderId: order.id ?? "",
      order: { ...order, state: "OPEN" },
    })
    // .then(() => client.customers.create({}))
    .then(() =>
      client.payments
        .create({
          idempotencyKey: randomUUID(),
          // customerId: !result.customer ? undefined : result.customer.id,
          sourceId: token ?? "",
          orderId: order.id,
          amountMoney: order.totalMoney,
          buyerEmailAddress,
          billingAddress,
          shippingAddress,
        })
        .then((res) => res.payment)
    )
    .catch((err) => console.log(err));

  if (payment?.status === "COMPLETED") {
    store.delete("cartId");
    revalidatePath("/", "layout");
    redirect(`/checkout/${payment.orderId}?paymentId=${payment.id}`);
  } else return { error: true };
};

export { pay };
