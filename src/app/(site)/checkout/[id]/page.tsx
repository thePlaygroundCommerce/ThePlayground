import { callGetCart } from "@/api/cartApi";
import { redirect } from "next/navigation";
import OrderList from "@/components/OrderList";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import { headers as _headers, cookies } from "next/headers";
import OrderBreakdown from "@/components/OrderCostBreakdown";
import { Address, CatalogObject, Order, Payment } from "square";
import _ from "lodash";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { latoHeavy } from "@/app/fonts";
import clsx from "clsx";
import { Simplify } from "prismicio-types";
import { PageProps } from "index";
import { Square } from "@/api/clients";
import Money from "@/components/Money";

const Page = async ({ params, searchParams }: PageProps) => {
  const cks = await cookies();
  const { id } = await params;
  const { paymentId } = await searchParams;
  const [{ order: order, imageMap, options }, { payment }] = await Promise.all([callGetCart(id), (await Square.payments.get({ paymentId }))])

  if (!order || (order?.tenders ?? []).length === 0) {
    return redirect("/")
  }

  const data = {
    name: `${payment.shippingAddress.firstName} ${payment.shippingAddress.lastName}`,
    email: payment.buyerEmailAddress,
    shippingMethod: order.fulfillments?.map(({ shipmentDetails: { shippingType } }) => shippingType)[0],
    shipping: payment.shippingAddress,
    billing: payment.billingAddress ?? {},
    last4: payment.cardDetails.card.last4,
    total: order.totalMoney.amount,
    lineItems: order.lineItems,
    lineItemImages: imageMap,
    options
  }

  return <CheckoutConfirmation {...data} />
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
  const name = _.capitalize(`${shippingAddress?.firstName}`)

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
          please
          {/* {reviewOrderLink} */}
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
                <li key={k}>{detail}</li>
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

const CheckoutConfirmation = ({ options, name, shippingMethod, email, shipping, billing, last4, total, lineItems, lineItemImages }) => {

  return (
    <div
      data-node-type="commerce-order-confirmation-wrapper"
      data-wf-order-query=""
      data-wf-page-link-href-prefix=""
      className="w-commerce-commerceorderconfirmationcontainer"
    >
      <div className="w-commerce-commercelayoutcontainer w-container">
        <div className="w-commerce-commercelayoutmain">
          <div className="w-commerce-commercecheckoutcustomerinfosummarywrapper">
            <div className="w-commerce-commercecheckoutsummaryblockheader">
              <h4>Customer Information</h4>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <div className="w-commerce-commercecheckoutrow">
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="w-commerce-commercecheckoutsummaryitem">
                    <label className="w-commerce-commercecheckoutsummarylabel">
                      {email}
                    </label>
                    <div />
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="w-commerce-commercecheckoutsummaryitem">
                    <div>{name}</div>
                    <div>{shipping.country}</div>
                    <div>{shipping.addressLine1}</div>
                    <div>{shipping.addressLine2}</div>
                    <div className="w-commerce-commercecheckoutsummaryflexboxdiv">
                      <div className="w-commerce-commercecheckoutsummarytextspacingondiv">{shipping.locality}</div>
                      <div className="w-commerce-commercecheckoutsummarytextspacingondiv">{shipping.administrativeDistrictLevel1}</div>
                      <div className="w-commerce-commercecheckoutsummarytextspacingondiv">{shipping.postalCode}</div>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="w-commerce-commercecheckoutshippingsummarywrapper">
            <div className="w-commerce-commercecheckoutsummaryblockheader">
              <h4>Shipping Method</h4>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <div className="w-commerce-commercecheckoutrow">
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="w-commerce-commercecheckoutsummaryitem">
                    <div>{shippingMethod}</div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="w-commerce-commercecheckoutpaymentsummarywrapper">
            <div className="w-commerce-commercecheckoutsummaryblockheader">
              <h4>Payment Info</h4>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <div className="w-commerce-commercecheckoutrow">
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="w-commerce-commercecheckoutsummaryitem">
                    <p>Last 4 digits of card - {last4}</p>
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="w-commerce-commercecheckoutsummaryitem">
                    <div>{name}</div>
                    <div>{billing.country}</div>
                    <div>{billing.street_adresss1}</div>
                    <div>{billing.street_adresss2}</div>
                    <div className="w-commerce-commercecheckoutsummaryflexboxdiv">
                      <div className="w-commerce-commercecheckoutsummarytextspacingondiv">{billing.city}</div>
                      <div className="w-commerce-commercecheckoutsummarytextspacingondiv">{billing.state}</div>
                      <div className="w-commerce-commercecheckoutsummarytextspacingondiv">{billing.zip}</div>
                    </div>
                    <div />
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="w-commerce-commercecheckoutorderitemswrapper">
            <div className="w-commerce-commercecheckoutsummaryblockheader">
              <h4>Items in Order</h4>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <OrderList options={options} lineItems={lineItems} lineItemImages={lineItemImages} allowOrderItemDeletion={false} />
            </fieldset>
          </div>
        </div>
        <div className="w-commerce-commercelayoutsidebar">
          <div>
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
          </div>
          <div className="w-commerce-commercecheckoutordersummarywrapper">
            <div className="w-commerce-commercecheckoutsummaryblockheader k-block-header">
              <h4>Order Summary</h4>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              {/* <div className="w-commerce-commercecheckoutsummarylineitem">
                <div>Subtotal</div>
                <div className="flex gap-1">
                  <Money number={subtotal} /> USD
                </div>
              </div> */}
              <div
                className="w-commerce-commercecheckoutordersummaryextraitemslist"
                data-wf-collection="database.commerceOrder.extraItems"
                data-wf-template-id="wf-template-606072483975b0cfb7b7e0070000000000a0"
              >
                <div className="w-commerce-commercecheckoutordersummaryextraitemslistitem">
                  <div />
                  <div />
                </div>
              </div>
              <div className="w-commerce-commercecheckoutsummarylineitem">
                <div>Total</div>
                <div className="w-commerce-commercecheckoutsummarytotal">
                  <div className="flex gap-1">
                    <Money number={total} /> USD
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>


  )
}