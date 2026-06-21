"use server";

import { redirect } from "next/navigation";
import logger from "@/util/logger";
import { callGetCart } from "./cartApi";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";
import { Address, Order, OrderLineItemDiscount } from "square";
import { Country } from "square";
import { cookies } from "next/headers";
import { square } from "./clients";

type CheckoutAddress = {
  name?: string;
  addressLine1?: string;
  addressLine2?: string;
  locality?: string;
  administrativeDistrictLevel1?: string;
  postalCode?: string;
  country?: string;
};

const firstNonEmpty = (...values: unknown[]) => {
  for (const value of values) {
    if (typeof value !== "string") continue;
    const trimmed = value.trim();
    if (trimmed.length > 0) return trimmed;
  }
  return undefined;
};

const getField = (formData: FormData, key: string) =>
  firstNonEmpty(formData.get(key));

const toSquareAddress = (address: CheckoutAddress): Address | undefined => {
  const addressLine1 = firstNonEmpty(address.addressLine1);
  const locality = firstNonEmpty(address.locality);
  const postalCode = firstNonEmpty(address.postalCode);
  const country = firstNonEmpty(address.country);

  if (!addressLine1 || !locality || !postalCode || !country) {
    return undefined;
  }

  const fullName = firstNonEmpty(address.name).split(" ");
  return {
    firstName: fullName[0],
    lastName: fullName.slice(1).join(" "),
    addressLine1,
    addressLine2: firstNonEmpty(address.addressLine2),
    locality,
    administrativeDistrictLevel1: firstNonEmpty(
      address.administrativeDistrictLevel1,
    ),
    postalCode,
    country: country.toUpperCase() as Country,
  } as Address;
};

const processPayment = async ({
  deleteCookie,
  cartId,
  token,
  buyerEmailAddress,
  shippingAddress,
  billingAddress,
}: {
  deleteCookie: boolean;
  cartId: string;
  token: string;
  buyerEmailAddress?: string;
  shippingAddress: Address;
  billingAddress?: Address;
}): Promise<void> => {
  const { order } = await callGetCart(cartId);
  if (!order) {
    logger.error("No Shopping Cart Found");
    return redirect("/");
  }

  const payment = await square.orders
    .update({
      orderId: order.id ?? "",
      order: { ...order, state: "OPEN" },
    })
    .then(() =>
      square.payments
        .create({
          idempotencyKey: randomUUID(),
          sourceId: token,
          orderId: order.id,
          amountMoney: order.totalMoney,
          buyerEmailAddress,
          billingAddress,
          shippingAddress,
        })
        .then((res) => res.payment),
    );

  if (payment?.status === "COMPLETED") {
    deleteCookie && (await cookies()).delete("cartId");
    revalidatePath("/", "layout");
    redirect(`/checkout/${payment.orderId}?paymentId=${payment.id}`);
  }

  logger.error("Payment was not completed", { status: payment?.status });
  return;
};

const payForm = async (formData: FormData): Promise<void> => {
  let redirectUrl = "/checkout";
  let params = new URLSearchParams(getField(formData, "params"));

  const promoCode = getField(formData, "promo");
  const cartId = getField(formData, "cartId");

  promoCode
    ? await applyDiscount(promoCode, cartId)
        .then((order) => {
          params.append("cartId", order.id);
          params.append("success", "promo");
          revalidatePath(redirectUrl);
        })
        .catch((err) => {
          console.log(err);
          params.append("error", "promo");
          params.append("messsage", err.message);
        })
    : await checkout(formData, cartId);

  redirect(`${redirectUrl}?${params.toString()}`);
};

const checkout = async (formData: FormData, cartId: string) => {
  const token = getField(formData, "token");
  const buyerEmailAddress = getField(formData, "email");
  const deleteCookie = Boolean(getField(formData, "delete"));

  if (!token && !cartId) throw Error("Token or cart missing!");

  const shippingAddress = toSquareAddress({
    name: getField(formData, "name"),
    addressLine1: getField(formData, "address_line1"),
    addressLine2: getField(formData, "address_line2"),
    locality: getField(formData, "address_city"),
    administrativeDistrictLevel1: getField(formData, "address_state"),
    postalCode: getField(formData, "address_zip"),
    country: getField(formData, "address_country"),
  });

  if (!shippingAddress) throw Error("Shipping missing!");

  const billingName = getField(formData, "billing_name");
  const billingAddressLine1 = getField(formData, "billing_address_line1");
  const billingAddressLine2 = getField(formData, "billing_address_line2");
  const billingLocality = getField(formData, "billing_address_city");
  const billingAdministrativeDistrictLevel1 = getField(
    formData,
    "billing_address_state",
  );
  const billingPostalCode = getField(formData, "billing_address_zip");
  const billingCountry = getField(formData, "billing_address_country");

  const hasExplicitBilling = Boolean(
    billingName ||
    billingAddressLine1 ||
    billingAddressLine2 ||
    billingLocality ||
    billingAdministrativeDistrictLevel1 ||
    billingPostalCode ||
    billingCountry,
  );

  const billingAddress = hasExplicitBilling
    ? toSquareAddress({
        name: billingName,
        addressLine1: billingAddressLine1,
        addressLine2: billingAddressLine2,
        locality: billingLocality,
        administrativeDistrictLevel1: billingAdministrativeDistrictLevel1,
        postalCode: billingPostalCode,
        country: billingCountry,
      })
    : shippingAddress;

  await processPayment({
    deleteCookie,
    cartId,
    token,
    buyerEmailAddress,
    shippingAddress,
    billingAddress,
  });
};

async function applyDiscount(promo: string, cartId: string): Promise<Order> {
  const promoCode = promo.trim();
  const cartIdValue = cartId.trim();
  const { order } = await square.orders.get({
    orderId: cartIdValue,
  });

  if (!order) throw Error("Order not found!");

  const { objects = [] } = await square.catalog.search({
    objectTypes: ["DISCOUNT"],
    query: {
      exactQuery: {
        attributeName: "name",
        attributeValue: promoCode,
      },
    },
  });

  const matched = objects.find(
    (o: any) =>
      (o?.discountData?.name ?? "").toLowerCase() === promoCode.toLowerCase(),
  );

  if (!matched) throw Error("Discount not found!");

  const discountCatalogId = matched.id;
  const existingDiscounts = order.discounts ?? [];
  const newDiscount: OrderLineItemDiscount = {
    catalogObjectId: discountCatalogId,
    scope: "ORDER",
  };

  const { order: result, errors = [] } = await square.orders.update({
    orderId: order.id,
    order: {
      ...order,
      discounts: [...existingDiscounts, newDiscount],
    },
  });

  if (errors[0]) throw new Error(errors[0].detail);

  return result;
}

export { payForm };
