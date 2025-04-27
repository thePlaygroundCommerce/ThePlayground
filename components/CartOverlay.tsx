'use client'

import React, { Fragment, useMemo } from "react";
import OrderList from "./OrderList";
import Button from "./Button";
import { AppProps, CartContextType, ContentData } from "index";
import { useCheckout } from "context/checkoutContext";
import { useCart } from "context/cartContext";
import Money from "./Money";

import _ from "lodash";
import clsx from "clsx";
import { getCatalogInfo } from "api/catalogApi";

type Props = AppProps & CartContextType & {
  handleCartToggle: (e: any, bool: boolean) => void;
  getCheckoutUrl: () => string;
};


const CartOverlay = ({ handleCartToggle, cart, options, calculateCart }: Props) => {
  const { checkout } = useCheckout();

  useMemo(() => {
    calculateCart({ order: cart })
  }, [])

  const handleCheckoutClick = () => {
    checkout()
  }

  const subtotal = cart.netAmountDueMoney?.amount ?? 0;

  const breakdown = {
    discounts: cart.totalDiscountMoney?.amount ?? 0,
    shipping: cart.serviceCharges?.find(service => service.name === 'shipping')?.amountMoney?.amount ?? 0,
    taxes: cart.totalTaxMoney?.amount ?? 0,
  };

  const sortedBreakdown = Object.entries(breakdown).sort(([_, val1], [__, val2]) => Number(val1) - Number(val2))


  return (
    <div
      data-node-type="commerce-cart-container-wrapper"
      data-w-id="d28673fe-a739-7b74-1763-af2ee311f1e5"
      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1e5"]'
      className="w-commerce-commercecartcontainerwrapper w-commerce-commercecartcontainerwrapper--cartType-modal"
      style={{ transition: "all, opacity 300ms", opacity: 1 }}
    >
      <div
        data-node-type="commerce-cart-container"
        data-w-id="d28673fe-a739-7b74-1763-af2ee311f1e6"
        data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1e6"]'
        role="dialog"
        className="w-commerce-commercecartcontainer"
        style={{
          transition: "all, transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transform: "scale(1)"
        }}
      >
        {/* <div
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f1e7"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1e7"]'
          className="w-commerce-commercecartheader"
        >
          <h4
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f1e8"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1e8"]'
            className="w-commerce-commercecartheading"
          >
            Your Cart
          </h4>
          <a
            href="#"
            data-node-type="commerce-cart-close-link"
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f1ea"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1ea"]'
            className="w-commerce-commercecartcloselink w-inline-block"
            role="button"
            aria-label="Close cart"
          >
            <svg
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f1eb"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1eb"]'
              width="16px"
              height="16px"
              viewBox="0 0 16 16"
            >
              <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                <g fillRule="nonzero" fill="#333333">
                  <polygon points="6.23223305 8 0.616116524 13.6161165 2.38388348 15.3838835 8 9.76776695 13.6161165 15.3838835 15.3838835 13.6161165 9.76776695 8 15.3838835 2.38388348 13.6161165 0.616116524 8 6.23223305 2.38388348 0.616116524 0.616116524 2.38388348 6.23223305 8" />
                </g>
              </g>
            </svg>
          </a>
        </div> */}
        <div
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f1ec"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1ec"]'
          className="w-commerce-commercecartformwrapper"
        >
          <form
            data-node-type="commerce-cart-form"
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f1ed"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1ed"]'
            className="w-commerce-commercecartform"
          >
            <div
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f1ee"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1ee"]'
              className="w-commerce-commercecartlist"
            >
              {cart.lineItems?.map((item) => <CartItem title={item.name ?? ""} price={Number(item.totalMoney?.amount ?? 0)} />)}
            </div>
            <div
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f1fe"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1fe"]'
              className="w-commerce-commercecartfooter"
            >
              <div
                aria-live="off"
                aria-atomic="false"
                data-w-id="d28673fe-a739-7b74-1763-af2ee311f1ff"
                data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1ff"]'
                className="w-commerce-commercecartlineitem"
              >
                <div
                  data-w-id="d28673fe-a739-7b74-1763-af2ee311f200"
                  data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f200"]'
                >
                  Subtotal
                </div>
                <div
                  data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.subtotal%22%7D%7D%5D"
                  data-w-id="d28673fe-a739-7b74-1763-af2ee311f202"
                  data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f202"]'
                  className="w-commerce-commercecartordervalue"
                >
                  <Money number={subtotal} />
                </div>
              </div>
              <div
                data-w-id="d28673fe-a739-7b74-1763-af2ee311f203"
                data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f203"]'
              >
                {/* <div
                  data-node-type="commerce-cart-quick-checkout-actions"
                  data-w-id="d28673fe-a739-7b74-1763-af2ee311f204"
                  data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f204"]'
                >
                  <a
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-label="Apple Pay"
                    data-node-type="commerce-cart-apple-pay-button"
                    data-w-id="d28673fe-a739-7b74-1763-af2ee311f205"
                    data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f205"]'
                    className="w-commerce-commercecartapplepaybutton"
                  >
                    <svg
                      data-w-id="d28673fe-a739-7b74-1763-af2ee311f206"
                      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f206"]'
                      className="w-commerce-commercecartapplepayicon"
                      viewBox="0 0 140.21 57.56"
                    >
                      <g transform="matrix(1.33333 0 0 -1.33333 0 57.562533)">
                        <path
                          d="M19.4028 37.6045c1.198 1.499 2.011 3.511 1.797 5.567-1.754-.087-3.894-1.157-5.133-2.656-1.113-1.285-2.098-3.381-1.841-5.351 1.969-.171 3.936.983 5.177 2.44M21.1772 34.7793c-2.859.17-5.29-1.623-6.656-1.623-1.366 0-3.457 1.537-5.719 1.496-2.943-.043-5.674-1.708-7.168-4.355-3.072-5.295-.811-13.15 2.177-17.463 1.451-2.134 3.199-4.483 5.503-4.399 2.177.086 3.03 1.41 5.676 1.41 2.645 0 3.414-1.41 5.718-1.367 2.389.043 3.884 2.135 5.334 4.271 1.665 2.432 2.346 4.78 2.389 4.91-.043.042-4.608 1.794-4.65 7.045-.043 4.397 3.584 6.489 3.755 6.618-2.048 3.03-5.249 3.371-6.359 3.457M42.6499 23.8164h5.705c4.328 0 6.792 2.33 6.792 6.37s-2.464 6.348-6.77 6.348h-5.727zm7.037 16.913c6.214 0 10.542-4.284 10.542-10.52 0-6.26-4.416-10.566-10.698-10.566h-6.881V8.7014h-4.972v32.028zM76.5547 17.4014v1.799l-5.526-.356c-3.108-.2-4.728-1.354-4.728-3.374 0-1.953 1.688-3.218 4.328-3.218 3.374 0 5.926 2.153 5.926 5.149m-15.093-2.064c0 4.106 3.13 6.459 8.901 6.814l6.192.378v1.775c0 2.597-1.709 4.018-4.749 4.018-2.509 0-4.328-1.288-4.706-3.263h-4.483c.133 4.151 4.04 7.169 9.322 7.169 5.682 0 9.388-2.974 9.388-7.591V8.7014h-4.594v3.84h-.111c-1.309-2.509-4.195-4.084-7.325-4.084-4.616 0-7.835 2.752-7.835 6.88M85.5508.1338v3.839c.312-.043 1.065-.088 1.465-.088 2.198 0 3.44.932 4.195 3.329l.444 1.421-8.412 23.305h5.194l5.859-18.91h.111l5.86 18.91h5.061l-8.723-24.482c-1.997-5.615-4.284-7.458-9.122-7.458-.378 0-1.599.045-1.932.134"
                          fill="#FFFFFF"
                        />
                      </g>
                    </svg>
                  </a>
                  <a
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    data-node-type="commerce-cart-quick-checkout-button"
                    data-w-id="d28673fe-a739-7b74-1763-af2ee311f207"
                    data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f207"]'
                    className="w-commerce-commercecartquickcheckoutbutton"
                    style={{ display: "none" }}
                  >
                    <svg
                      data-w-id="d28673fe-a739-7b74-1763-af2ee311f208"
                      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f208"]'
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
                      data-w-id="d28673fe-a739-7b74-1763-af2ee311f209"
                      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f209"]'
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
                    <div
                      data-w-id="d28673fe-a739-7b74-1763-af2ee311f20a"
                      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20a"]'
                    >
                      Pay with browser.
                    </div>
                  </a>
                </div> */}
                <a
                  href="/checkout"
                  // value="Continue to Checkout"
                  data-node-type="cart-checkout-button"
                  data-w-id="d28673fe-a739-7b74-1763-af2ee311f20c"
                  data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20c"]'
                  className="w-commerce-commercecartcheckoutbutton"
                  data-loading-text="Hang Tight..."
                >
                  Continue to Checkout
                </a>
              </div>
            </div>
          </form>
          {/* <div
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f20d"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20d"]'
            className="w-commerce-commercecartemptystate"
            style={{ display: "none" }}
          >
            <div
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f20e"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20e"]'
            >
              No items found.
            </div>
          </div> */}
          {/* <div
            aria-live=""
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f210"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f210"]'
            data-node-type="commerce-cart-error"
            className="w-commerce-commercecarterrorstate"
            style={{ display: "none" }}
          >
            <div
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f211"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f211"]'
              className="w-cart-error-msg"
              data-w-cart-quantity-error="Product is not available in this quantity."
              data-w-cart-general-error="Something went wrong when adding this item to the cart."
              data-w-cart-checkout-error="Checkout is disabled on this site."
              data-w-cart-cart_order_min-error="The order minimum was not met. Add more items to your cart to continue."
              data-w-cart-subscription_error-error="Before you purchase, please use your email invite to verify your address so we can send order updates."
            >
              Product is not available in this quantity.
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
  return (
    <div className="h-full flex flex-col">
      <div className="py-4 border-b h-full overflow-scroll">
        <OrderList allowOrderModify options={options} />
      </div>

      <div className="p-3">
        {
          sortedBreakdown.map(([name, val]) => {
            if (name === "discounts" && val === 0) return null
            return (
              <Fragment key={name}>
                <div className={clsx("flex justify-between")}>
                  <p>{_.capitalize(name)}</p>
                  <Money number={val} />
                </div>
              </Fragment>
            )
          })
        }
        <div className="pb-5 flex justify-between">
          <p>Subtotal</p>
          <Money number={subtotal} />
        </div>
        <Button className="w-full" disabled={cart.lineItems?.length === 0} onClick={handleCheckoutClick}>
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CartOverlay;

type CartItemProps = ContentData & AppProps

const CartItem = ({ title, price }: CartItemProps) => {

  return (
    <div
      data-w-id="d28673fe-a739-7b74-1763-af2ee311f1ef_instance-0"
      data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1ef_instance-0"]'
      className="w-commerce-commercecartitem"
    >
      <img
        data-wf-bindings="%5B%7B%22src%22%3A%7B%22type%22%3A%22ImageRef%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.f_main_image_4dr%22%7D%7D%5D"
        data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f0_instance-0"
        data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f0_instance-0"]'
        src="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4.jpg"
        alt=""
        className="w-commerce-commercecartitemimage"
      />
      <div
        data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f1_instance-0"
        data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f1_instance-0"]'
        className="w-commerce-commercecartiteminfo"
      >
        <div
          data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22PlainText%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_name_%22%7D%7D%5D"
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f2_instance-0"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f2_instance-0"]'
          className="w-commerce-commercecartproductname"
        >
          {title}
        </div>
        <div
          data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.price%22%7D%7D%5D"
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f3_instance-0"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f3_instance-0"]'
        >
          <Money number={Number(price ?? 0)} />
        </div>
        <ul
          data-wf-bindings="%5B%7B%22optionSets%22%3A%7B%22type%22%3A%22CommercePropTable%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_sku_properties_3dr%22%7D%7D%2C%7B%22optionValues%22%3A%7B%22type%22%3A%22CommercePropValues%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.f_sku_values_3dr%22%7D%7D%5D"
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f4_instance-0"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f4_instance-0"]'
          className="w-commerce-commercecartoptionlist"
        >
          {/* <li
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f5_instance-0-0"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f5_instance-0-0"]'
          >
            <span
              data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22PlainText%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_sku_properties_3dr%5B%5D.name%22%7D%7D%5D"
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f6_instance-0-0"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f6_instance-0-0"]'
            >
              colors
            </span>
            <span
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f7_instance-0-0"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f7_instance-0-0"]'
            >
              :{" "}
            </span>
            <span
              data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePropValues%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_sku_properties_3dr%5B%5D%22%7D%7D%5D"
              data-w-id="d28673fe-a739-7b74-1763-af2ee311f1f9_instance-0-0"
              data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1f9_instance-0-0"]'
            >
              black
            </span>
          </li> */}
        </ul>
        <a
          href="#"
          role=""
          data-wf-bindings="%5B%7B%22data-commerce-sku-id%22%3A%7B%22type%22%3A%22ItemRef%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.id%22%7D%7D%5D"
          data-w-id="d28673fe-a739-7b74-1763-af2ee311f1fa_instance-0"
          data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1fa_instance-0"]'
          className="w-inline-block"
          data-wf-cart-action="remove-item"
          data-commerce-sku-id="68059bd81df4f390d006ad42"
          aria-label="Remove item from cart"
        >
          <div
            data-w-id="d28673fe-a739-7b74-1763-af2ee311f1fb_instance-0"
            data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1fb_instance-0"]'
          >
            Remove
          </div>
        </a>
      </div>
      <input
        data-wf-bindings="%5B%7B%22value%22%3A%7B%22type%22%3A%22Number%22%2C%22filter%22%3A%7B%22type%22%3A%22numberPrecision%22%2C%22params%22%3A%5B%220%22%2C%22numberPrecision%22%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.count%22%7D%7D%2C%7B%22data-commerce-sku-id%22%3A%7B%22type%22%3A%22ItemRef%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.id%22%7D%7D%5D"
        data-w-id="d28673fe-a739-7b74-1763-af2ee311f1fd_instance-0"
        data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f1fd_instance-0"]'
        className="w-commerce-commercecartquantity"
        required={false}
        pattern="^[0-9]+$"
        inputMode="numeric"
        type="number"
        name="quantity"
        autoComplete="off"
        data-wf-cart-action="update-item-quantity"
        data-commerce-sku-id="68059bd81df4f390d006ad42"
        defaultValue={1}
      />
    </div>
  )
}