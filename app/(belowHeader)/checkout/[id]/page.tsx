import { callGetCart } from "api/cartApi";
import React from "react";
import { redirect } from "next/navigation";
import OrderList from "components/OrderList";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { headers as _headers } from "next/headers";
import OrderBreakdown from "components/OrderCostBreakdown";
import { Address, CatalogObject, Order, Payment } from "square";
import _ from "lodash";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { latoHeavy } from "app/fonts";
import clsx from "clsx";
import { Simplify } from "prismicio-types";
import { PageProps } from "index";
import { Square } from "api/clients";
import Money from "components/Money";
import square from "api/clients/square";

const Page = async ({ params, searchParams }: PageProps) => {
  const { id } = await params;
  const { paymentId } = await searchParams;
  const [{ order: order, imageMap, options }, { payment }] = await Promise.all([callGetCart(id), (await square.payments.get({ paymentId }))])


  if (!order || (order?.tenders ?? []).length === 0) {
    return redirect("/")
  }

  return (
    <div className="min-h-screen block md:pt-8 p-4 md:container mx-auto">
      <MobileCheckoutConfirmation
        payment={payment ?? {}}
        options={options}
        processedCart={order}
        processedCartImages={imageMap}
      />
    </div>
  )
};

export default Page;


const MobileCheckoutConfirmation = ({
  payment,
  processedCart,
  processedCartImages,
  options,
}: {
  payment: Payment
  processedCart: Order;
  options: Simplify<Simplify<CatalogObject[]>>;
  processedCartImages: any;
}) => {

  const buyerEmail: string = payment.buyerEmailAddress ?? "";
  const last4CardNumber: string = payment.cardDetails?.card?.last4 ?? "";
  const shippingAddress: Address | undefined = payment.shippingAddress;
  const name = _.capitalize(`${shippingAddress?.firstName} ${shippingAddress?.lastName}`)

  delete shippingAddress?.firstName
  delete shippingAddress?.lastName;

  const reviewOrderLink = (
    <>
      <SignedIn>
        <Link className="text-cyan-700" href="/account/sign-in">
          check the order on your account page.
        </Link>
      </SignedIn>
      <SignedOut>
        <Link className="text-cyan-700" href="/account/sign-in">
          create or log into your account.
        </Link>
      </SignedOut>
    </>
  );

  return (
    <>
      <div className="my-12 text-center max-w-2xl m-auto">
        <div className="md:hidden">
          <BsFillCheckCircleFill
            size="50%"
            className="my-12 m-auto"
            color="green"
          />
        </div>
        <div className="hidden md:block">
          <BsFillCheckCircleFill
            size="5rem"
            className="my-12 m-auto"
            color="green"
          />
        </div>
        <p className="mb-6">Your order has been submitted.</p>
        <p>
          An email has been sent to{" "}
          <span className={clsx("w-full", latoHeavy.className)}>{buyerEmail}</span>{" "}
          with your order receipt. To review any other details of your order,
          please {reviewOrderLink}
        </p>
      </div>
      <ul className="p-0 my-2">
        <li className="font-bold text-center"><p>Order Number</p> <p>{processedCart.id}</p></li>
      </ul>
      <div className="my-12 md:flex gap-8">
        {shippingAddress && (
          <div className="basis-1/4">
            <p className={clsx("text-lg", latoHeavy.className)}>
              Shipping Details
            </p>
            <ul className="m-0 p-0">
              <li>Name - {name}</li>
              {Object.entries(shippingAddress).map(([k, detail]) => (
                <li key={k}>{_.startCase(_.camelCase(k))} - {detail}</li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p className={clsx("text-lg", latoHeavy.className)}>
            Payment Details
          </p>
          <p className="flex gap-1">We charged <span className="font-bold"><Money number={payment.totalMoney?.amount ?? 0} /></span> to the card ending in <span className="font-bold">{last4CardNumber}</span>.</p>
        </div>
      </div>
      <div className="h-full md:w-3/4 m-auto">
        <div className="min-h-48 pt-4">
          <OrderList
            className="min-h-24 mx-auto"
            // options={options}
            allowOrderItemDeletion={false}
            allowOrderModify={false}
            lineItems={processedCart?.lineItems ?? []}
            lineItemImages={processedCartImages}
          />
        </div>
        <div className="mt-6 md:w-1/3 ml-auto">
          <OrderBreakdown
            order={processedCart}
            sumObject={{ total: "totalMoney" }}
          />
        </div>
        {/* <div className="mt-5 md:w-3/4 mx-auto">
          <Feedback />
        </div> */}
      </div>
    </>
  );
};