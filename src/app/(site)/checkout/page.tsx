
import React from "react";
import OrderList from "@/components/OrderList";
import { headers as _headers, cookies, headers } from "next/headers";
import _ from "lodash";
import clsx from "clsx";
import { PageProps } from "index";
import SquarePaymentForm from "@/components/PaymentForm";
import { Accordion } from "@ark-ui/react/accordion";
import { FaAngleDown } from "react-icons/fa6";
import { callGetCart } from "@/api/cartApi";
import { redirect } from "next/navigation";
import logger from "@/util/logger";
import { pay } from "@/api/paymentsApi";
import { CarriersEnum, Shippo } from "shippo";

const Page = async ({ params, searchParams }: PageProps) => {
  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) {
    logger.error("No Shopping Cart Found");
    return redirect("/");
  }
  
  const { order: order } = await callGetCart(cartId);
  if (!order || (order.lineItems ?? []).length === 0) {
    logger.error("No Line Items Present In Cart!");
    return redirect("/");
  }
  
  return (
    <div className="bg-zinc-100 md:py-4">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:gap-4 pb-4">
        <div className="flex flex-col gap-6 flex-2 px-2">
          <SquarePaymentForm onSubmit={pay} />
        </div>
        <div className="flex-1">
          <div className="border hidden md:block bg-white rounded border-zinc-200">
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


export default Page;