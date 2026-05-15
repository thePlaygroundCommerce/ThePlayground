'use client'

import { AppProps, ContentData } from "index";
import Money from "./Money";

import _ from "lodash";
import Link from "next/link";
import { useCart } from "@/context/cartContext";

type Props = AppProps

const Cart = () => {
  const { cart } = useCart()

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
      >
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
              {(cart?.lineItems?.length ?? 0) > 0 ? (
                cart?.lineItems?.map((item, i) => (
                  <CartItem
                    key={item.uid ?? i}
                    title={item.name ?? ""}
                    price={Number(item.basePriceMoney?.amount ?? 0)}
                  />
                ))
              ) : (
                <div
                  data-w-id="d28673fe-a739-7b74-1763-af2ee311f20d"
                  data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20d"]'
                  className="w-commerce-commercecartemptystate"
                >
                  <div
                    data-w-id="d28673fe-a739-7b74-1763-af2ee311f20e"
                    data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20e"]'
                  >
                    No items found.
                  </div>
                </div>
              )}
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
                  {/* <Money number={subtotal} /> */}
                </div>
              </div>
              <div
                data-w-id="d28673fe-a739-7b74-1763-af2ee311f203"
                data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f203"]'
              >
                <Link
                  href="/checkout"
                  // value="Continue to Checkout"
                  data-node-type="cart-checkout-button"
                  data-w-id="d28673fe-a739-7b74-1763-af2ee311f20c"
                  data-wf-id='["3c4b54f7-5d09-4b8c-b972-66c749e5325c","d28673fe-a739-7b74-1763-af2ee311f20c"]'
                  className="w-commerce-commercecartcheckoutbutton"
                  data-loading-text="Hang Tight..."
                >
                  Checkout
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default Cart;

type CartItemProps = ContentData & AppProps;

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
  );
};
