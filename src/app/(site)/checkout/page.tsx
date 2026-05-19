
import OrderList from "@/components/OrderList";
import { headers as _headers, cookies } from "next/headers";
import _ from "lodash";
import clsx from "clsx";
import { PageProps } from "index";
import { callCreateCart, callGetCart } from "@/api/cartApi";
import { redirect } from "next/navigation";
import logger from "@/util/logger";
import { payForm } from "@/api/paymentsApi";
import WebPaymentForm from "@/components/WebPaymentForm";
import Link from "next/link";
import { Input } from "@headlessui/react";
import Money from "@/components/Money";
import Form from "next/form";

const Page = async ({ params, searchParams }: PageProps) => {
  const { show, buyNow } = await searchParams
  const showBilling = show?.length > 0
  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId && !buyNow) {
    logger.error("No Shopping Cart Found");
    return redirect("/");
  }

  const resolveCart = async () => {
    if (buyNow) {
      return callCreateCart({ order: { lineItems: [{ catalogObjectId: buyNow, quantity: "1" }] } })
    } else {
      return callGetCart(cartId)
    }
  }

  const { order, imageMap } = await resolveCart()

  if (!order || (order.lineItems ?? []).length === 0) {
    logger.error("No Line Items Present In Cart!");
    return redirect("/");
  }

  const { taxes, subtotal, discounts, shipping } = {
    subtotal: order.netAmountDueMoney?.amount ?? 0,
    discounts: order.totalDiscountMoney?.amount ?? 0,
    shipping: order.serviceCharges?.find(service => service.name === 'shipping')?.amountMoney?.amount ?? 0,
    taxes: order.totalTaxMoney?.amount ?? 0
  }

  return (
    <Form
      id="paymentForm"
      action={payForm}
      data-node-type="commerce-checkout-form-container"
      data-wf-checkout-query=""
      data-wf-page-link-href-prefix=""
      className="w-commerce-commercecheckoutformcontainer"
    >
      <Input name="delete" value={String(buyNow !== undefined)} readOnly hidden />
      <Input name="cartId" value={order.id} readOnly hidden />
      <div className="w-commerce-commercelayoutcontainer w-container">
        <div className="w-commerce-commercelayoutmain">
          {/* <div data-node-type="commerce-cart-quick-checkout-actions">
            <a
              data-node-type="commerce-cart-apple-pay-button"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label="Apple Pay"
              style={{
                backgroundImage: "-webkit-named-image(apple-pay-logo-white)",
                backgroundSize: "100% 50%",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat"
              }}
              className="w-commerce-commercecartapplepaybutton k-apple-btn"
            >
              <div />
            </a>
            <a
              data-node-type="commerce-cart-quick-checkout-button"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              style={{ display: "none" }}
              className="w-commerce-commercecartquickcheckoutbutton"
            >
              <svg
                className="w-commerce-commercequickcheckoutgoogleicon"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={16}
                height={16}
                viewBox="0 0 16 16"
              >
                <defs>
                  <polygon
                    id="google-mark-a"
                    points="0 .329 3.494 .329 3.494 7.649 0 7.649"
                  />
                  <polygon
                    id="google-mark-c"
                    points=".894 0 13.169 0 13.169 6.443 .894 6.443"
                  />
                </defs>
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#4285F4"
                    d="M10.5967,12.0469 L10.5967,14.0649 L13.1167,14.0649 C14.6047,12.6759 15.4577,10.6209 15.4577,8.1779 C15.4577,7.6339 15.4137,7.0889 15.3257,6.5559 L7.8887,6.5559 L7.8887,9.6329 L12.1507,9.6329 C11.9767,10.6119 11.4147,11.4899 10.5967,12.0469"
                  />
                  <path
                    fill="#34A853"
                    d="M7.8887,16 C10.0137,16 11.8107,15.289 13.1147,14.067 C13.1147,14.066 13.1157,14.065 13.1167,14.064 L10.5967,12.047 C10.5877,12.053 10.5807,12.061 10.5727,12.067 C9.8607,12.556 8.9507,12.833 7.8887,12.833 C5.8577,12.833 4.1387,11.457 3.4937,9.605 L0.8747,9.605 L0.8747,11.648 C2.2197,14.319 4.9287,16 7.8887,16"
                  />
                  <g transform="translate(0 4)">
                    <mask id="google-mark-b" fill="#fff">
                      <use xlinkHref="#google-mark-a" />
                    </mask>
                    <path
                      fill="#FBBC04"
                      d="M3.4639,5.5337 C3.1369,4.5477 3.1359,3.4727 3.4609,2.4757 L3.4639,2.4777 C3.4679,2.4657 3.4749,2.4547 3.4789,2.4427 L3.4939,0.3287 L0.8939,0.3287 C0.8799,0.3577 0.8599,0.3827 0.8459,0.4117 C-0.2821,2.6667 -0.2821,5.3337 0.8459,7.5887 L0.8459,7.5997 C0.8549,7.6167 0.8659,7.6317 0.8749,7.6487 L3.4939,5.6057 C3.4849,5.5807 3.4729,5.5587 3.4639,5.5337"
                      mask="url(#google-mark-b)"
                    />
                  </g>
                  <mask id="google-mark-d" fill="#fff">
                    <use xlinkHref="#google-mark-c" />
                  </mask>
                  <path
                    fill="#EA4335"
                    d="M0.894,4.3291 L3.478,6.4431 C4.113,4.5611 5.843,3.1671 7.889,3.1671 C9.018,3.1451 10.102,3.5781 10.912,4.3671 L13.169,2.0781 C11.733,0.7231 9.85,-0.0219 7.889,0.0001 C4.941,0.0001 2.245,1.6791 0.894,4.3291"
                    mask="url(#google-mark-d)"
                  />
                </g>
              </svg>
              <svg
                className="w-commerce-commercequickcheckoutmicrosofticon"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 16 16"
              >
                <g fill="none" fillRule="evenodd">
                  <polygon fill="#F05022" points="7 7 1 7 1 1 7 1" />
                  <polygon fill="#7DB902" points="15 7 9 7 9 1 15 1" />
                  <polygon fill="#00A4EE" points="7 15 1 15 1 9 7 9" />
                  <polygon fill="#FFB700" points="15 15 9 15 9 9 15 9" />
                </g>
              </svg>
              <div>Pay with browser.</div>
            </a>
          </div> */}
          <div
            data-node-type="commerce-checkout-customer-info-wrapper"
            className="w-commerce-commercecheckoutcustomerinfowrapper"
          >
            <div className="w-commerce-commercecheckoutblockheader k-block-header">
              <h4>Customer Info</h4>
              <div className="note-label">* Required</div>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent k-block-header">
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Email *
                </label>
                <input
                  className="w-commerce-commercecheckoutemailinput k-input k-input--clear"
                  type="text"
                  name="email"
                />
              </div>
            </fieldset>
          </div>
          <div
            data-node-type="commerce-checkout-shipping-address-wrapper"
            className="w-commerce-commercecheckoutshippingaddresswrapper"
          >
            <div className="w-commerce-commercecheckoutblockheader k-block-header">
              <h4>Shipping Address</h4>
              <div className="note-label">* Required</div>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent k-block-header">
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Full Name *
                </label>
                <input
                  className="w-commerce-commercecheckoutshippingfullname k-input"
                  name="name"
                  type="text"
                />
              </div>
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Street Address *
                </label>
                <input
                  className="w-commerce-commercecheckoutshippingstreetaddress k-input"
                  name="address_line1"
                  type="text"
                />
              </div>
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  APT / UNIT
                </label>
                <input
                  aria-label=""
                  className="w-commerce-commercecheckoutshippingstreetaddressoptional k-input"
                  name="address_line2"
                  type="text"
                />
              </div>
              <div className="w-commerce-commercecheckoutrow k-input-row">
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      City *
                    </label>
                    <input
                      className="w-commerce-commercecheckoutshippingcity k-input"
                      name="address_city"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      State/Province
                    </label>
                    <input
                      className="w-commerce-commercecheckoutshippingstateprovince k-input"
                      name="address_state"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      Zip/Postal Code *
                    </label>
                    <input
                      data-node-type="commerce-checkout-shipping-zip-field"
                      className="w-commerce-commercecheckoutshippingzippostalcode k-input"
                      name="address_zip"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Country *
                </label>
                <select
                  className="w-commerce-commercecheckoutshippingcountryselector k-select-input"
                  name="address_country"
                >
                  {supportedCountries.map(({ short, name }) => (
                    <option key={short} value={short}>{name}</option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>

          <div className="w-commerce-commercecheckoutbillingaddresstogglewrapper my-8">
            <Link href={!showBilling ? "?show=billing#billing" : "/checkout"} >
              <Input
                id="billing-address-toggle"
                data-node-type="commerce-checkout-billing-address-toggle-checkbox"
                className="w-commerce-commercecheckoutbillingaddresstogglecheckbox"
                type="checkbox"
                readOnly
                checked={!showBilling}
              />
            </Link>
            <label
              htmlFor="billing-address-toggle"
              className="w-commerce-commercecheckoutbillingaddresstogglelabel"
            >
              Billing address same as shipping
            </label>
          </div>

          <div
            id="billing"
            data-node-type="commerce-checkout-billing-address-wrapper"
            className={clsx("w-commerce-commercecheckoutbillingaddresswrapper", !showBilling && "hidden")}
          >
            <div className="w-commerce-commercecheckoutblockheader k-block-header">
              <h4>Billing Address</h4>
              <div className="note-label">* Required</div>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Full Name *
                </label>
                <input
                  className="w-commerce-commercecheckoutbillingfullname k-input"
                  name="billing_name"
                  type="text"

                />
              </div>
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Street Address *
                </label>
                <input
                  className="w-commerce-commercecheckoutbillingstreetaddress k-input"
                  name="billing_address_line1"

                  type="text"
                />
              </div>
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  APT / UNIT
                </label>
                <input
                  aria-label=""
                  className="w-commerce-commercecheckoutbillingstreetaddressoptional k-input"
                  name="billing_address_line2"
                  type="text"
                />
              </div>
              <div className="w-commerce-commercecheckoutrow">
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      City *
                    </label>
                    <input
                      className="w-commerce-commercecheckoutbillingcity k-input"
                      name="billing_address_city"
                      type="text"

                    />
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      State/Province
                    </label>
                    <input
                      className="w-commerce-commercecheckoutbillingstateprovince k-input"
                      name="billing_address_state"
                      type="text"
                    />
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      Zip/Postal Code *
                    </label>
                    <input
                      data-node-type="commerce-checkout-billing-zip-field"
                      className="w-commerce-commercecheckoutbillingzippostalcode k-input"
                      name="billing_address_zip"
                      type="text"

                    />
                  </div>
                </div>
              </div>
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Country *
                </label>
                <select
                  className="w-commerce-commercecheckoutbillingcountryselector k-select-input"
                  name="billing_address_country"
                >
                  {supportedCountries.map(({ short, name }) => (
                    <option key={short} value={short}>{name}</option>
                  ))}
                </select>
              </div>
            </fieldset>
          </div>

          <div
            data-node-type="commerce-checkout-shipping-methods-wrapper"
            className="w-commerce-commercecheckoutshippingmethodswrapper"
          >
            <div className="w-commerce-commercecheckoutblockheader k-block-header">
              <h4>Shipping Method</h4>
            </div>
            <fieldset>
              <div
                data-node-type="commerce-checkout-shipping-methods-list"
                className="w-commerce-commercecheckoutshippingmethodslist"
                data-wf-collection="database.commerceOrder.availableShippingMethods"
                data-wf-template-id="wf-template-606072483975b0cfb7b7e007000000000042"
              >
                <label className="w-commerce-commercecheckoutshippingmethoditem">
                  <input type="radio" name="shipping-method" defaultValue="free" defaultChecked />
                  <div className="w-commerce-commercecheckoutshippingmethoddescriptionblock">
                    <div className="w-commerce-commerceboldtextblock">FREE {"( 3 - 7 BUSINESS DAYS )"}</div>
                  </div>
                </label>
              </div>
              <div
                data-node-type="commerce-checkout-shipping-methods-empty-state"
                style={{ display: "none" }}
                className="w-commerce-commercecheckoutshippingmethodsemptystate"
              >
                <div>No shipping methods are available for the address given.</div>
              </div>
            </fieldset>
          </div>
          {/* <div className="w-commerce-commercecheckoutpaymentinfowrapper">
            <div className="w-commerce-commercecheckoutblockheader k-block-header">
              <h4>Payment Info</h4>
              <div className="note-label">* Required</div>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <div className="k-input-wrap">
                <label
                  htmlFor=""
                  className="w-commerce-commercecheckoutlabel k-input-label"
                >
                  Card Number *
                </label>
                <div
                  data-wf-stripe-element-type="cardNumber"
                  data-wf-style-map="{}"
                  style={{ position: "relative" }}
                  className="w-commerce-commercecheckoutcardnumber k-input"
                >

                </div>
              </div>
              <div className="w-commerce-commercecheckoutrow">
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      Expiration Date *
                    </label>
                    <div
                      data-wf-stripe-element-type="cardExpiry"
                      data-wf-style-map="{}"
                      style={{ position: "relative" }}
                      className="w-commerce-commercecheckoutcardexpirationdate k-input"
                    >
                      <div />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-commerce-commercecheckoutcolumn">
                  <div className="k-input-wrap">
                    <label
                      htmlFor=""
                      className="w-commerce-commercecheckoutlabel k-input-label"
                    >
                      Security Code *
                    </label>
                    <div
                      data-wf-stripe-element-type="cardCvc"
                      data-wf-style-map="{}"
                      style={{ position: "relative" }}
                      className="w-commerce-commercecheckoutcardsecuritycode k-input"
                    >
                      <div />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          opacity: 0
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-commerce-commercecheckoutbillingaddresstogglewrapper">
                <input
                  id="billing-address-toggle"
                  data-node-type="commerce-checkout-billing-address-toggle-checkbox"
                  className="w-commerce-commercecheckoutbillingaddresstogglecheckbox"
                  type="checkbox"

                />
                <label
                  htmlFor="billing-address-toggle"
                  className="w-commerce-commercecheckoutbillingaddresstogglelabel"
                >
                  Billing address same as shipping
                </label>
              </div>
            </fieldset>
          </div> */}



          <div className="w-commerce-commercecheckoutorderitemswrapper">
            <div className="w-commerce-commercecheckoutsummaryblockheader k-block-header">
              <h4>Items in Order</h4>
            </div>
            <fieldset className="w-commerce-commercecheckoutblockcontent">
              <OrderList lineItemImages={imageMap} lineItems={order.lineItems} allowOrderItemDeletion={buyNow == undefined} />
            </fieldset>
          </div>
        </div>
        <div className="w-commerce-commercelayoutsidebar">
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
                    <Money number={subtotal} /> USD
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <WebPaymentForm formId="paymentForm" />
          <div
            data-node-type="commerce-checkout-error-state"
            style={{ display: "none" }}
            className="w-commerce-commercecheckouterrorstate"
          >
            <div
              aria-live="polite"
              className="w-checkout-error-msg"
              data-w-info-error="There was an error processing your customer info. Please try again, or contact us if you continue to have problems."
              data-w-shipping-error="Sorry. We can’t ship your order to the address provided."
              data-w-billing-error="Your payment could not be completed with the payment information provided. Please make sure that your card and billing address information is correct, or try a different payment card, to complete this order. Contact us if you continue to have problems."
              data-w-payment-error="There was an error processing your payment. Please try again, or contact us if you continue to have problems."
              data-w-pricing-error="The prices of one or more items in your cart have changed. Please refresh this page and try again."
              data-w-minimum-error="The order minimum was not met. Add more items to your cart to continue."
              data-w-extras-error="A merchant setting has changed that impacts your cart. Please refresh and try again."
              data-w-product-error="One or more of the products in your cart have been removed. Please refresh the page and try again."
              data-w-invalid-discount-error="This discount is invalid."
              data-w-expired-discount-error="This discount is no longer available."
              data-w-usage-reached-discount-error="This discount is no longer available."
              data-w-requirements-not-met-error="Your order does not meet the requirements for this discount."
            >
              There was an error processing your customer info. Please try again, or
              contact us if you continue to have problems.
            </div>
          </div>
        </div>
      </div>
    </Form>
  )
};


export default Page;

const supportedCountries = [
  {
    short: "AF",
    name: "Afghanistan"
  },
  {
    short: "AX",
    name: "Aland Islands"
  },
  {
    short: "AL",
    name: "Albania"
  },
  {
    short: "DZ",
    name: "Algeria"
  },
  {
    short: "AS",
    name: "American Samoa"
  },
  {
    short: "AD",
    name: "Andorra"
  },
  {
    short: "AO",
    name: "Angola"
  },
  {
    short: "AI",
    name: "Anguilla"
  },
  {
    short: "AG",
    name: "Antigua and Barbuda"
  },
  {
    short: "AR",
    name: "Argentina"
  },
  {
    short: "AM",
    name: "Armenia"
  },
  {
    short: "AW",
    name: "Aruba"
  },
  {
    short: "AU",
    name: "Australia"
  },
  {
    short: "AT",
    name: "Austria"
  },
  {
    short: "AZ",
    name: "Azerbaijan"
  },
  {
    short: "BS",
    name: "Bahamas"
  },
  {
    short: "BH",
    name: "Bahrain"
  },
  {
    short: "BD",
    name: "Bangladesh"
  },
  {
    short: "BB",
    name: "Barbados"
  },
  {
    short: "BY",
    name: "Belarus"
  },
  {
    short: "BE",
    name: "Belgium"
  },
  {
    short: "BZ",
    name: "Belize"
  },
  {
    short: "BJ",
    name: "Benin"
  },
  {
    short: "BM",
    name: "Bermuda"
  },
  {
    short: "BT",
    name: "Bhutan"
  },
  {
    short: "BO",
    name: "Bolivia"
  },
  {
    short: "BQ",
    name: "Bonaire, Saint Eustatius and Saba"
  },
  {
    short: "BA",
    name: "Bosnia and Herzegovina"
  },
  {
    short: "BW",
    name: "Botswana"
  },
  {
    short: "BR",
    name: "Brazil"
  },
  {
    short: "IO",
    name: "British Indian Ocean Territory"
  },
  {
    short: "VG",
    name: "British Virgin Islands"
  },
  {
    short: "BN",
    name: "Brunei"
  },
  {
    short: "BG",
    name: "Bulgaria"
  },
  {
    short: "BF",
    name: "Burkina Faso"
  },
  {
    short: "BI",
    name: "Burundi"
  },
  {
    short: "CV",
    name: "Cabo Verde"
  },
  {
    short: "KH",
    name: "Cambodia"
  },
  {
    short: "CM",
    name: "Cameroon"
  },
  {
    short: "CA",
    name: "Canada"
  },
  {
    short: "KY",
    name: "Cayman Islands"
  },
  {
    short: "CF",
    name: "Central African Republic"
  },
  {
    short: "TD",
    name: "Chad"
  },
  {
    short: "CL",
    name: "Chile"
  },
  {
    short: "CN",
    name: "China"
  },
  {
    short: "CX",
    name: "Christmas Island"
  },
  {
    short: "CC",
    name: "Cocos Islands"
  },
  {
    short: "CO",
    name: "Colombia"
  },
  {
    short: "KM",
    name: "Comoros"
  },
  {
    short: "CK",
    name: "Cook Islands"
  },
  {
    short: "CR",
    name: "Costa Rica"
  },
  {
    short: "HR",
    name: "Croatia"
  },
  {
    short: "CU",
    name: "Cuba"
  },
  {
    short: "CW",
    name: "Curacao"
  },
  {
    short: "CY",
    name: "Cyprus"
  },
  {
    short: "CZ",
    name: "Czechia"
  },
  {
    short: "CD",
    name: "Democratic Republic of the Congo"
  },
  {
    short: "DK",
    name: "Denmark"
  },
  {
    short: "DJ",
    name: "Djibouti"
  },
  {
    short: "DM",
    name: "Dominica"
  },
  {
    short: "DO",
    name: "Dominican Republic"
  },
  {
    short: "EC",
    name: "Ecuador"
  },
  {
    short: "EG",
    name: "Egypt"
  },
  {
    short: "SV",
    name: "El Salvador"
  },
  {
    short: "GQ",
    name: "Equatorial Guinea"
  },
  {
    short: "ER",
    name: "Eritrea"
  },
  {
    short: "EE",
    name: "Estonia"
  },
  {
    short: "SZ",
    name: "Eswatini"
  },
  {
    short: "ET",
    name: "Ethiopia"
  },
  {
    short: "FK",
    name: "Falkland Islands"
  },
  {
    short: "FO",
    name: "Faroe Islands"
  },
  {
    short: "FJ",
    name: "Fiji"
  },
  {
    short: "FI",
    name: "Finland"
  },
  {
    short: "FR",
    name: "France"
  },
  {
    short: "GF",
    name: "French Guiana"
  },
  {
    short: "PF",
    name: "French Polynesia"
  },
  {
    short: "TF",
    name: "French Southern Territories"
  },
  {
    short: "GA",
    name: "Gabon"
  },
  {
    short: "GM",
    name: "Gambia"
  },
  {
    short: "GE",
    name: "Georgia"
  },
  {
    short: "DE",
    name: "Germany"
  },
  {
    short: "GH",
    name: "Ghana"
  },
  {
    short: "GI",
    name: "Gibraltar"
  },
  {
    short: "GR",
    name: "Greece"
  },
  {
    short: "GL",
    name: "Greenland"
  },
  {
    short: "GD",
    name: "Grenada"
  },
  {
    short: "GP",
    name: "Guadeloupe"
  },
  {
    short: "GU",
    name: "Guam"
  },
  {
    short: "GT",
    name: "Guatemala"
  },
  {
    short: "GG",
    name: "Guernsey"
  },
  {
    short: "GN",
    name: "Guinea"
  },
  {
    short: "GW",
    name: "Guinea-Bissau"
  },
  {
    short: "GY",
    name: "Guyana"
  },
  {
    short: "HT",
    name: "Haiti"
  },
  {
    short: "HN",
    name: "Honduras"
  },
  {
    short: "HK",
    name: "Hong Kong"
  },
  {
    short: "HU",
    name: "Hungary"
  },
  {
    short: "IS",
    name: "Iceland"
  },
  {
    short: "IN",
    name: "India"
  },
  {
    short: "ID",
    name: "Indonesia"
  },
  {
    short: "IR",
    name: "Iran"
  },
  {
    short: "IQ",
    name: "Iraq"
  },
  {
    short: "IE",
    name: "Ireland"
  },
  {
    short: "IM",
    name: "Isle of Man"
  },
  {
    short: "IL",
    name: "Israel"
  },
  {
    short: "IT",
    name: "Italy"
  },
  {
    short: "CI",
    name: "Ivory Coast"
  },
  {
    short: "JM",
    name: "Jamaica"
  },
  {
    short: "JP",
    name: "Japan"
  },
  {
    short: "JE",
    name: "Jersey"
  },
  {
    short: "JO",
    name: "Jordan"
  },
  {
    short: "KZ",
    name: "Kazakhstan"
  },
  {
    short: "KE",
    name: "Kenya"
  },
  {
    short: "KI",
    name: "Kiribati"
  },
  {
    short: "XK",
    name: "Kosovo"
  },
  {
    short: "KW",
    name: "Kuwait"
  },
  {
    short: "KG",
    name: "Kyrgyzstan"
  },
  {
    short: "LA",
    name: "Laos"
  },
  {
    short: "LV",
    name: "Latvia"
  },
  {
    short: "LB",
    name: "Lebanon"
  },
  {
    short: "LS",
    name: "Lesotho"
  },
  {
    short: "LR",
    name: "Liberia"
  },
  {
    short: "LY",
    name: "Libya"
  },
  {
    short: "LI",
    name: "Liechtenstein"
  },
  {
    short: "LT",
    name: "Lithuania"
  },
  {
    short: "LU",
    name: "Luxembourg"
  },
  {
    short: "MO",
    name: "Macao"
  },
  {
    short: "MG",
    name: "Madagascar"
  },
  {
    short: "MW",
    name: "Malawi"
  },
  {
    short: "MY",
    name: "Malaysia"
  },
  {
    short: "MV",
    name: "Maldives"
  },
  {
    short: "ML",
    name: "Mali"
  },
  {
    short: "MT",
    name: "Malta"
  },
  {
    short: "MH",
    name: "Marshall Islands"
  },
  {
    short: "MQ",
    name: "Martinique"
  },
  {
    short: "MR",
    name: "Mauritania"
  },
  {
    short: "MU",
    name: "Mauritius"
  },
  {
    short: "YT",
    name: "Mayotte"
  },
  {
    short: "MX",
    name: "Mexico"
  },
  {
    short: "FM",
    name: "Micronesia"
  },
  {
    short: "MD",
    name: "Moldova"
  },
  {
    short: "MC",
    name: "Monaco"
  },
  {
    short: "MN",
    name: "Mongolia"
  },
  {
    short: "ME",
    name: "Montenegro"
  },
  {
    short: "MS",
    name: "Montserrat"
  },
  {
    short: "MA",
    name: "Morocco"
  },
  {
    short: "MZ",
    name: "Mozambique"
  },
  {
    short: "MM",
    name: "Myanmar"
  },
  {
    short: "NA",
    name: "Namibia"
  },
  {
    short: "NR",
    name: "Nauru"
  },
  {
    short: "NP",
    name: "Nepal"
  },
  {
    short: "NL",
    name: "Netherlands"
  },
  {
    short: "NC",
    name: "New Caledonia"
  },
  {
    short: "NZ",
    name: "New Zealand"
  },
  {
    short: "NI",
    name: "Nicaragua"
  },
  {
    short: "NE",
    name: "Niger"
  },
  {
    short: "NG",
    name: "Nigeria"
  },
  {
    short: "NU",
    name: "Niue"
  },
  {
    short: "NF",
    name: "Norfolk Island"
  },
  {
    short: "KP",
    name: "North Korea"
  },
  {
    short: "MK",
    name: "North Macedonia"
  },
  {
    short: "MP",
    name: "Northern Mariana Islands"
  },
  {
    short: "NO",
    name: "Norway"
  },
  {
    short: "OM",
    name: "Oman"
  },
  {
    short: "PK",
    name: "Pakistan"
  },
  {
    short: "PW",
    name: "Palau"
  },
  {
    short: "PS",
    name: "Palestinian Territory"
  },
  {
    short: "PA",
    name: "Panama"
  },
  {
    short: "PG",
    name: "Papua New Guinea"
  },
  {
    short: "PY",
    name: "Paraguay"
  },
  {
    short: "PE",
    name: "Peru"
  },
  {
    short: "PH",
    name: "Philippines"
  },
  {
    short: "PN",
    name: "Pitcairn"
  },
  {
    short: "PL",
    name: "Poland"
  },
  {
    short: "PT",
    name: "Portugal"
  },
  {
    short: "PR",
    name: "Puerto Rico"
  },
  {
    short: "QA",
    name: "Qatar"
  },
  {
    short: "CG",
    name: "Republic of the Congo"
  },
  {
    short: "RE",
    name: "Reunion"
  },
  {
    short: "RO",
    name: "Romania"
  },
  {
    short: "RU",
    name: "Russia"
  },
  {
    short: "RW",
    name: "Rwanda"
  },
  {
    short: "BL",
    name: "Saint Barthelemy"
  },
  {
    short: "SH",
    name: "Saint Helena"
  },
  {
    short: "KN",
    name: "Saint Kitts and Nevis"
  },
  {
    short: "LC",
    name: "Saint Lucia"
  },
  {
    short: "MF",
    name: "Saint Martin"
  },
  {
    short: "PM",
    name: "Saint Pierre and Miquelon"
  },
  {
    short: "VC",
    name: "Saint Vincent and the Grenadines"
  },
  {
    short: "WS",
    name: "Samoa"
  },
  {
    short: "SM",
    name: "San Marino"
  },
  {
    short: "ST",
    name: "Sao Tome and Principe"
  },
  {
    short: "SA",
    name: "Saudi Arabia"
  },
  {
    short: "SN",
    name: "Senegal"
  },
  {
    short: "RS",
    name: "Serbia"
  },
  {
    short: "SC",
    name: "Seychelles"
  },
  {
    short: "SL",
    name: "Sierra Leone"
  },
  {
    short: "SG",
    name: "Singapore"
  },
  {
    short: "SX",
    name: "Sint Maarten"
  },
  {
    short: "SK",
    name: "Slovakia"
  },
  {
    short: "SI",
    name: "Slovenia"
  },
  {
    short: "SB",
    name: "Solomon Islands"
  },
  {
    short: "SO",
    name: "Somalia"
  },
  {
    short: "ZA",
    name: "South Africa"
  },
  {
    short: "GS",
    name: "South Georgia and the South Sandwich Islands"
  },
  {
    short: "KR",
    name: "South Korea"
  },
  {
    short: "SS",
    name: "South Sudan"
  },
  {
    short: "ES",
    name: "Spain"
  },
  {
    short: "LK",
    name: "Sri Lanka"
  },
  {
    short: "SD",
    name: "Sudan"
  },
  {
    short: "SR",
    name: "Suriname"
  },
  {
    short: "SJ",
    name: "Svalbard and Jan Mayen"
  },
  {
    short: "SE",
    name: "Sweden"
  },
  {
    short: "CH",
    name: "Switzerland"
  },
  {
    short: "SY",
    name: "Syria"
  },
  {
    short: "TW",
    name: "Taiwan"
  },
  {
    short: "TJ",
    name: "Tajikistan"
  },
  {
    short: "TZ",
    name: "Tanzania"
  },
  {
    short: "TH",
    name: "Thailand"
  },
  {
    short: "TL",
    name: "Timor Leste"
  },
  {
    short: "TG",
    name: "Togo"
  },
  {
    short: "TK",
    name: "Tokelau"
  },
  {
    short: "TO",
    name: "Tonga"
  },
  {
    short: "TT",
    name: "Trinidad and Tobago"
  },
  {
    short: "TN",
    name: "Tunisia"
  },
  {
    short: "TR",
    name: "Turkey"
  },
  {
    short: "TM",
    name: "Turkmenistan"
  },
  {
    short: "TC",
    name: "Turks and Caicos Islands"
  },
  {
    short: "TV",
    name: "Tuvalu"
  },
  {
    short: "VI",
    name: "U.S. Virgin Islands"
  },
  {
    short: "UG",
    name: "Uganda"
  },
  {
    short: "UA",
    name: "Ukraine"
  },
  {
    short: "AE",
    name: "United Arab Emirates"
  },
  {
    short: "GB",
    name: "United Kingdom"
  },
  {
    short: "US",
    name: "United States"
  },
  {
    short: "UM",
    name: "United States Minor Outlying Islands"
  },
  {
    short: "UY",
    name: "Uruguay"
  },
  {
    short: "UZ",
    name: "Uzbekistan"
  },
  {
    short: "VU",
    name: "Vanuatu"
  },
  {
    short: "VA",
    name: "Vatican"
  },
  {
    short: "VE",
    name: "Venezuela"
  },
  {
    short: "VN",
    name: "Vietnam"
  },
  {
    short: "WF",
    name: "Wallis and Futuna"
  },
  {
    short: "EH",
    name: "Western Sahara"
  },
  {
    short: "YE",
    name: "Yemen"
  },
  {
    short: "ZM",
    name: "Zambia"
  },
  {
    short: "ZW",
    name: "Zimbabwe"
  }
]