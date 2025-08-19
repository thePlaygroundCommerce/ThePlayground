"use server";

import { CreatePaymentRequest, Customer, Order } from "square";
import { SQUARE_URL } from "../constants";

import type * as Square from "@square/web-sdk";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import logger from "util/logger";
import { callGetCart } from "./cartApi";
import { randomUUID } from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";

const pay = async (token: Square.TokenResult) => {
  // Implement server-side payment processing logic here
  // This could involve calling an API to process the payment
  // and returning a response to the client.
  const store = await cookies();
  const cartId = store.get("cartId")?.value;
  const { order } = await callGetCart(cartId ?? "");
  if (!cartId || !order) {
    logger.error("No Shopping Cart Found");
    return redirect("/");
  }

  const req: OrderPaymentRequest = {
    token: token.token ?? "",
    order: order,
    // contact: {}
  };

  const { status, orderId, message } = await fetch(
    SQUARE_URL + "checkout/pay",
    {
      next: { revalidate: 0 },
      method: "POST",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json() as Promise<{ status: "COMPLETED" | "FAILED" }>)
    .catch((err) => err);

  if (status === "COMPLETED") {
    store.delete("cartId");
    revalidatePath("/", "layout");
  } else {
    return { error: true };
  }
};

export { pay };

type OrderPaymentRequest = {
  contact?: Customer;
  order: Order;
  token: string;
};
