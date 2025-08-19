
import React from "react";
import OrderList from "components/OrderList";
import { headers as _headers, cookies } from "next/headers";
import _ from "lodash";
import clsx from "clsx";
import { PageProps } from "index";
import { Field, Fieldset, Input as _Input, Label, Legend, Radio as _Radio, RadioGroup as _RadioGroup, } from "@headlessui/react";
import Money from "components/Money";
import SquarePaymentForm from "components/PaymentForm";
import { pay } from "api/paymentsApi";
import { Accordion } from "@ark-ui/react/accordion";
import { FaAngleDown } from "react-icons/fa6";
import { callGetCart } from "api/cartApi";
import { redirect } from "next/navigation";
import logger from "util/logger";
import Form from "next/form";
import FieldsetReveal from "components/FieldsetReveal";
import Checkbox from "components/Checkbox";

const Page = async ({ params, searchParams }: PageProps) => {
  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) {
    logger.error("No Shopping Cart Found");
    return redirect("/");
  }

  const { order } = await callGetCart(cartId);
  if (!order || (order.lineItems ?? []).length === 0) {
    logger.error("No Line Items Present In Cart!");
    return redirect("/");
  }


  const fieldset = [
    {
      name: "Contact",
      required: true,
      type: "TEXT",
      element: (
        <div>
          <Input name="Email" type="email" />
          <div className="flex gap-4 mt-4 items-center">
            <Checkbox defaultChecked={true} />
            <p>Email me with news and offers</p>
          </div>
        </div>
      )
    },
    {
      name: "Delivery",
      required: true,
      type: "TEXT",
      fields: [
        { name: "Street address" },
        { name: "First Name" },
        { name: "Last Name" },
        { name: "Apt / Unit / Suite" },
        { name: "City" },
        { name: "State" },
        { name: "Zip" },
        { name: "Country" },
      ]
    },
    {
      name: "Billing",
      required: false,
      type: "TEXT",
      element: (
        <div className="p-4 flex flex-col gap-4">
          <FieldsetReveal checkboxText="Billing address same as shipping" defaultChecked={true} fieldset={(
            [
              { name: "Street address" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Apt / Unit / Suite" },
              { name: "City" },
              { name: "State" },
              { name: "Zip" },
              { name: "Country" },
            ].map(field => <Input key={field.name} {...field} />)
          )} />
        </div>
      )
    },
    {
      name: "Shipping",
      required: true,
      type: "RADIO",

      element: (
        <RadioGroup {...{
          defaultValue: "Flat Rate",
          fields: [
            { name: "Flat Rate", description: "Delivery in a day to a week of purchase.", readOnly: true },
            // { name: "Expedited Shipping", description: "Expedited shipping to get the shipment in a day or two." },
            // { name: "Overnight Shipping", description: "Overnight shipping to get the shipment on the next business day." },
          ]
        }} />
      ),

    },
    {
      name: "Payment",
      required: true,
      element: <SquarePaymentForm onSubmit={pay}
      />,
    },
  ]

  return (
    <div className="bg-zinc-100 md:py-4">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:gap-4 pb-4">
        <div className="flex flex-col gap-6 flex-2 px-2">
          {fieldset.map(({ name, required, fields, element, type }) => (
            <Fieldset key={name} className="border-1 bg-white rounded-3xl border-zinc-200">
              <div className="p-4 border-b border-zinc-200">
                <Legend className="flex justify-between">
                  <h1 className="text-lg p-0">{name}</h1>
                  <p>{required && "* Required"}</p>
                </Legend>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {element
                  ? element
                  : fields.map(({ name, description, rest }: any) => {
                    const Component =
                      ComponentMap[type as keyof typeof ComponentMap];
                    return <Component key={name} {...{ name, description, ...rest }} />;
                  })}
              </div>
            </Fieldset>
          ))}
        </div>
        <div className="flex-1">
          <div className="border-1 hidden md:block bg-white rounded border-zinc-200">
            <div className="p-4 border-b border-zinc-200">
              <h3>Order Summary</h3>
            </div>
            <div className="p-4">
              <p className="mb-4">Subtotal</p>
              <p>Total</p>
            </div>
          </div>
          <div>
            <Accordion.Root collapsible>
              <Accordion.Item value={"summary"} className={clsx("p-4")}>
                <Accordion.ItemTrigger className="flex justify-between items-center w-full">
                  <div className="flex gap-2 items-center">
                    <p>Order Summary </p>
                    <Accordion.ItemIndicator>
                      <FaAngleDown />
                    </Accordion.ItemIndicator>
                  </div>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent className="my-4">
                  <OrderList allowOrderItemDeletion={false} lineItems={order?.lineItems ?? []} />
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          </div>
          {/* <div className="p-4">
            <Button className="w-full rounded-full bg-black text-white p-4">
              Place Order
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const RadioGroup = ({ defaultValue, fields = [] }: { defaultValue?: string, fields: { readOnly: boolean, name: string, description: string }[] }) => {

  return (
    <_RadioGroup defaultValue={defaultValue}>
      {
        fields.map((field => (
          <Field key={field.name} className="flex gap-4 justify-between items-center">
            <div className="flex gap-4 items-center">
              <div className="">
                <_Radio value={field.name} className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400 data-disabled:bg-gray-100">
                  <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
                </_Radio>
              </div>
              <div className="text-sm">
                <h5 className="font-bold">{field.name ?? "AAAS"}</h5>
                <p>{field.description ?? "Hello"}</p>
              </div>
            </div>
            <div>
              <p>FREE</p>
            </div>
          </Field>
        )))
      }
    </_RadioGroup >
  )
}
const Input = ({ name }: any) => {
  const classes = clsx(
    'mt-3 block w-full rounded-full border-1 bg-zinc-100 border-zinc-300 bg-white/5 px-6 py-3 text-sm/6 ',
    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
  )

  return (
    <Field className="rounded">
      <Label className="text-sm/6 font-medium relative left-6 top-6 bg-white px-1.5 py-1 rounded-lg border-1 border-zinc-300">{name}</Label>
      <_Input className={classes} />
    </Field>
  )
}

const ComponentMap = {
  RADIO: RadioGroup,
  TEXT: Input
}

export default Page;