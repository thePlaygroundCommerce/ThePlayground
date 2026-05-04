"use server";

import {
  BatchGetCatalogObjectsResponse,
  CheckoutOptions,
  CreateCustomerRequest,
  GetOrderResponse,
  Order,
  OrderLineItem,
  OrderServiceCharge,
} from "square";
import { DEFAULT_FETCH_INIT, SQUARE_URL } from "../constants";
import square from "./clients/square";
import { v4 } from "uuid";
import { headers } from "next/headers";
import { callGetCart } from "./cartApi";

export async function getOrderAndCatalogObjects(orderId: string): Promise<
  | {
      order: GetOrderResponse;
      objects: BatchGetCatalogObjectsResponse;
    }
  | undefined
> {
  try {
    const { order } = await fetch(SQUARE_URL + "checkout/order/" + orderId, {
      next: { revalidate: 0 },
    })
      .then((res) => res.json())
      .then(({ result }) => result)
      .catch((err) => err);

    const lineItemsCatalogIdList = order.lineItems.map(
      (item: any) => item.catalogObjectId,
    );

    const objects = await fetch(SQUARE_URL + "catalog", {
      next: { revalidate: 0 },
      method: "POST",
      body: JSON.stringify({
        objectIds: lineItemsCatalogIdList,
        includeRelatedObjects: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
    return {
      order,
      objects,
    };
  } catch (error: unknown) {
    console.log(error);
    // if (error instanceof ApiError) {
    //   return {
    //     error: error.result,
    //   };
    // }
  }
}

export async function getCheckoutOrderUrl(
  id: string,
  redirectUrl: string = process.env.CHECKOUT_REDIRECT ?? "",
) {
  return await fetch(
    SQUARE_URL + `checkout/order/${id}?redirect=${redirectUrl}`,
    {
      next: { revalidate: 0 },
      method: "GET",
    },
  )
    .then((res) => res.json())
    .then(({ result }) => result)
    .catch((err) => console.error(err));
}

export async function getCheckoutItemUrl(
  lineItems: OrderLineItem[],
  redirectUrl: string = process.env.CHECKOUT_REDIRECT ?? "",
) {
  return await fetch(SQUARE_URL + `checkout/item?redirect=${redirectUrl}`, {
    ...DEFAULT_FETCH_INIT,
    next: { revalidate: 0 },
    method: "POST",
    body: JSON.stringify(lineItems),
  })
    .then((res) => res.json())
    .then(({ result }) => result)
    .catch((err) => console.error(err));
}

class Checkout {
  private ordersApi = square.orders;
  private checkoutApi = square.checkout.paymentLinks;
  private customersApi = square.customers;

  async getCheckoutItemUrl(lineItems: any, { redirect }: any) {
    const checkoutOptions = {
      askForShippingAddress: true,
      redirectUrl: redirect,
    };
    return this.#processItemCheckout({
      order: {
        locationId: process.env.SQUARE_MAIN_LOCATION_ID ?? "",
        lineItems: lineItems,
        serviceCharges: SERVICE_CHARGES,
        pricingOptions: PRICING_OPTIONS,
      },
      checkoutOptions,
    });
  }

  async getCheckoutOrderUrl(
    req: Request,
    { id }: { id: string },
    { redirect }: any,
  ) {
    const head = await headers();
    const redirectUrl = new URL(
      `${head.get("host")}/checkout/process?cartId=${id}&redirect=${redirect}`,
    );

    const checkoutOptions = {
      askForShippingAddress: true,
      redirectUrl: redirectUrl.toString(),
    };

    return this.#processOrderCheckout(id, checkoutOptions);
  }

  async orderPayment({
    contact,
    token,
    order,
    order: { state, totalMoney, id },
  }: OrderPaymentRequest) {
    const orderId = id ?? "";
    let customerId: string | undefined;

    if (state !== "OPEN")
      this.ordersApi.update({
        orderId,
        order: { ...order, state: "OPEN" },
      });
    if (contact)
      customerId = (await this.customersApi.create(contact)).customer?.id;

    const payment = (
      await square.payments.create({
        customerId,
        sourceId: token,
        orderId,
        amountMoney: totalMoney,
        idempotencyKey: crypto.randomUUID(),
      })
    ).payment;

    return {
      status: payment?.status,
      orderId: payment?.orderId,
      money: payment?.approvedMoney,
      email: payment?.buyerEmailAddress,
    };
  }

  async postSuccessfulCheckout(
    res: Response,
    { id }: { id: string },
    { redirect }: any,
  ): Promise<void> {
    // await this.checkoutService.processSuccessfulCheckout(id);

    redirect(redirect);
  }

  async #processOrderCheckout(id: string, options: CheckoutOptions) {
    const { order } = await callGetCart(id);
    if (!order) throw Error("Order not found.");

    const shippingCharges =
      order.serviceCharges?.filter((charge) => charge.name === "shipping") ??
      [];
    if (shippingCharges.length === 0)
      order.serviceCharges = shippingCharges
        .concat(order.serviceCharges ?? [], SERVICE_CHARGES)
        .filter((charge) => charge);

    const createdPaymentLink = await this.checkoutApi.create({
      idempotencyKey: v4(),
      order: {
        locationId: order.locationId,
        lineItems: order.lineItems?.map(({ catalogObjectId, quantity }) => ({
          catalogObjectId,
          quantity,
        })),
        serviceCharges: order.serviceCharges,
        pricingOptions: PRICING_OPTIONS,
      },
      checkoutOptions: options,
    });

    const paymentLink = createdPaymentLink.paymentLink;
    if (!paymentLink) {
      throw new Error("Unable to create payment link.");
    }

    const { id: paymentLinkId, orderId, version } = paymentLink;

    const redirectSource =
      options.redirectUrl ?? process.env.CHECKOUT_REDIRECT ?? "";
    if (!redirectSource) {
      throw new Error("Missing checkout redirect URL.");
    }

    const redirect = new URL(redirectSource);
    redirect.pathname += `/${orderId}`;
    redirect.searchParams.set(
      "redirect",
      redirect.searchParams.get("redirect") + `/${orderId}`,
    );

    options.redirectUrl = redirect.toString();

    return await this.checkoutApi.update({
      id: paymentLinkId ?? "",
      paymentLink: {
        version,
        checkoutOptions: options,
      },
    });
  }

  async #processItemCheckout({
    order,
    checkoutOptions,
  }: CreatePaymentLinkRequest) {
    const createdPaymentLink = await this.checkoutApi.create({
      idempotencyKey: v4(),
      order,
      checkoutOptions,
    });

    const paymentLink = createdPaymentLink.paymentLink;
    if (!paymentLink) {
      throw new Error("Unable to create payment link.");
    }

    const { id: paymentLinkId, orderId, version } = paymentLink;

    const redirectSource =
      checkoutOptions.redirectUrl ?? process.env.CHECKOUT_REDIRECT ?? "";
    if (!redirectSource) {
      throw new Error("Missing checkout redirect URL.");
    }

    const redirect = new URL(redirectSource);
    redirect.pathname += `/${orderId}`;
    checkoutOptions.redirectUrl = redirect.toString();

    return await this.checkoutApi.update({
      id: paymentLinkId ?? "",
      paymentLink: {
        version,
        checkoutOptions,
      },
    });
  }
}

const api = new Checkout();

type OrderPaymentRequest = {
  contact?: CreateCustomerRequest;
  token: string;
  order: Order;
};

type CreatePaymentLinkRequest = {
  order: Order;
  checkoutOptions: CheckoutOptions;
};

const SERVICE_CHARGES: OrderServiceCharge[] = [
  {
    name: "FREE SHIPPING",
    amountMoney: {
      amount: BigInt(0),
      currency: "USD",
    },
    calculationPhase: "TOTAL_PHASE",
  },
];

const PRICING_OPTIONS = {
  autoApplyDiscounts: true,
  autoApplyTaxes: true,
};
