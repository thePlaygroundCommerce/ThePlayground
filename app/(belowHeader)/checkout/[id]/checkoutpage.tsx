import { getCheckoutOrderUrl } from "api/checkoutApi";
import { callGetCart, callUpdateCart } from "api/cartApi";
import React from "react";
import { redirect } from "next/navigation";
import OrderList from "components/OrderList";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { cookies, headers as _headers } from "next/headers";
import OrderBreakdown from "components/OrderCostBreakdown";
import { CatalogObject, Order } from "square";
import _ from "lodash";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { latoHeavy } from "app/fonts";
import clsx from "clsx";
import Feedback from "components/Feedback";
import { Simplify } from "prismicio-types";
import { PageProps } from "index";
import Button from "components/Button";
import { Field, Fieldset, Input as _Input, Label, Legend, Radio as _Radio, RadioGroup as _RadioGroup } from "@headlessui/react";
import Money from "components/Money";

const Page = async ({ params, searchParams }: PageProps) => {

  const fieldset = [
    {
      name: "Shipping Address",
      required: true,
      type: "TEXT",
      fields: [
        { name: "Street address" },
        { name: "Full Name" },
        { name: "Apt / Unit / Suite" },
        { name: "City" },
        { name: "State" },
        { name: "Zip" },
        { name: "Country" },
      ]
    },
    {
      name: "Shipping Method",
      required: true,
      type: "RADIO",
      fields: [
        { name: "Flat Rate", description: "Standard flat rate for all shipments." },
        { name: "Expedited Shipping", description: "Expedited shipping to get the shipment in a day or two." },
        { name: "Overnight Shipping", description: "Overnight shipping to get the shipment o the next business day." },
      ]
    },
    {
      name: "Payment Information",
      required: true,
      type: "TEXT",
      fields: [
        { name: "Card Number" },
        { name: "Expiration Date" },
        { name: "Security Code" },
      ]
    },
    {
      name: "Billing Address",
      required: true,
      type: "TEXT",
      fields: [
        { name: "" }
      ]
    },
  ]

  return (
    <div className="p-6 bg-zinc-200">
      <div className="flex flex-col gap-6">
        <Field className="rounded border-zinc-300 p-4">
          <Legend className="flex justify-between"><h5>Customer Information</h5><p>Required</p></Legend>
          <Label className="text-sm/6 font-medium"></Label>
          <Input
            className={clsx(

            )}
          />
        </Field>
        {fieldset.map(({ name, required, fields, type }) => (
          <Fieldset className="border-1 bg-white rounded">
            <div className="p-4 border-b">
              <Legend className="flex justify-between"><h5>{name}</h5><p>{required && "Required*"}</p></Legend>
            </div>
            <div className="p-4">
              {fields.map(({ name, description }: any) => {
                const Component = ComponentMap[type as keyof typeof ComponentMap];
                return (
                  <Component {...{ name, description }} />
                )
              })}
            </div>
          </Fieldset>
        ))}
        <div>
          <h1>Checkout Items</h1>
        </div>
      </div>
      <div>
        <div>
          <h1>Order Summary</h1>
        </div>
        <div>
          <Button>Place Order</Button>
        </div>
      </div>
    </div >
  );
};

const RadioGroup = ({ name, description }: any) => {

  return (
    <_RadioGroup>
      <Field className="flex gap-4">
        <div className="">
          <_Radio value={""} className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400 data-disabled:bg-gray-100">
            <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
          </_Radio>
        </div>
        <div className="text-sm">
          <h5 className="font-bold">{name ?? "AAAS"}</h5>
          <p>{description ?? "Hello"}</p>
        </div>
        <div>
          <div>
            <Money number={500} />
          </div>
          <div>
            USD
          </div>
        </div>
      </Field>
    </_RadioGroup>
  )
}
const Input = ({ name }: any) => {
  const classes = clsx(
    'mt-3 block w-full rounded-full border-1 border-zinc-500 bg-white/5 px-6 py-3 text-sm/6 ',
    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
  )

  return (
    <Field className="rounded border-zinc-300">
      <Label className="text-sm/6 font-medium">{name}</Label>
      <_Input className={classes} />
    </Field>
  )
}

const ComponentMap = {
  RADIO: RadioGroup,
  TEXT: Input
}

export default Page;