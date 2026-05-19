"use server";

import { redirect } from "next/navigation";
import logger from "@/util/logger";
import { callGetCart } from "./cartApi";
import { revalidatePath } from "next/cache";
import { Square as client } from "./clients";
import { randomUUID } from "crypto";
import { Address } from "square";
import { Country } from "square";
import { cookies } from "next/headers";

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

  const payment = await client.orders
    .update({
      orderId: order.id ?? "",
      order: { ...order, state: "OPEN" },
    })
    .then(() =>
      client.payments
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
    deleteCookie && (await cookies()).delete("cartId")
    revalidatePath("/", "layout");
    redirect(`/checkout/${payment.orderId}?paymentId=${payment.id}`);
  }

  logger.error("Payment was not completed", { status: payment?.status });
  return;
};

const payForm = async (formData: FormData): Promise<void> => {
  const token = getField(formData, "token");
  const buyerEmailAddress = getField(formData, "email");
  const cartId = getField(formData, "cartId");
  const deleteCookie = Boolean(getField(formData, "delete"));

  if (!token && !cartId) return;

  const shippingAddress = toSquareAddress({
    name: getField(formData, "name"),
    addressLine1: getField(formData, "address_line1"),
    addressLine2: getField(formData, "address_line2"),
    locality: getField(formData, "address_city"),
    administrativeDistrictLevel1: getField(formData, "address_state"),
    postalCode: getField(formData, "address_zip"),
    country: getField(formData, "address_country"),
  });

  if (!shippingAddress) return;

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

export { payForm };
