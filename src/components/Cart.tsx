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
      className="w-commerce-commercecartcontainerwrapper w-commerce-commercecartcontainerwrapper--cartType-modal"
      style={{ transition: "all, opacity 300ms", opacity: 1 }}
    >
      <div
        role="dialog"
        className="w-commerce-commercecartcontainer"
      >
        <div
          className="w-commerce-commercecartformwrapper"
        >
          <form
            className="w-commerce-commercecartform"
          >
            <div
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
                  className="w-commerce-commercecartemptystate"
                >
                  <div
                  >
                    No items found.
                  </div>
                </div>
              )}
            </div>
            <div
              className="w-commerce-commercecartfooter"
            >
              <div
                aria-live="off"
                aria-atomic="false"
                className="w-commerce-commercecartlineitem"
              >
                <div
                >
                  Subtotal
                </div>
                <div
                  className="w-commerce-commercecartordervalue"
                >
                  {/* <Money number={subtotal} /> */}
                </div>
              </div>
              <div


              >
                <Link
                  href="/checkout"
                  // value="Continue to Checkout"
                  className="w-commerce-commercecartcheckoutbutton"
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


      className="w-commerce-commercecartitem"
    >
      <img
        data-wf-bindings="%5B%7B%22src%22%3A%7B%22type%22%3A%22ImageRef%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.f_main_image_4dr%22%7D%7D%5D"


        src="https://cdn.prod.website-files.com/67f9692e7e88b9a05d707cb1/68059d1135ad71863b396529_4.jpg"
        alt=""
        className="w-commerce-commercecartitemimage"
      />
      <div


        className="w-commerce-commercecartiteminfo"
      >
        <div
          data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22PlainText%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_name_%22%7D%7D%5D"


          className="w-commerce-commercecartproductname"
        >
          {title}
        </div>
        <div
          data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePrice%22%2C%22filter%22%3A%7B%22type%22%3A%22price%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.price%22%7D%7D%5D"


        >
          <Money number={Number(price ?? 0)} />
        </div>
        <ul
          data-wf-bindings="%5B%7B%22optionSets%22%3A%7B%22type%22%3A%22CommercePropTable%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_sku_properties_3dr%22%7D%7D%2C%7B%22optionValues%22%3A%7B%22type%22%3A%22CommercePropValues%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.f_sku_values_3dr%22%7D%7D%5D"


          className="w-commerce-commercecartoptionlist"
        >
          {/* <li
            
            
          >
            <span
              data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22PlainText%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_sku_properties_3dr%5B%5D.name%22%7D%7D%5D"
              
              
            >
              colors
            </span>
            <span
              
              
            >
              :{" "}
            </span>
            <span
              data-wf-bindings="%5B%7B%22innerHTML%22%3A%7B%22type%22%3A%22CommercePropValues%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.product.f_sku_properties_3dr%5B%5D%22%7D%7D%5D"
              
              
            >
              black
            </span>
          </li> */}
        </ul>
        <a
          href="#"
          className="w-inline-block"
          aria-label="Remove item from cart"
        >
          <div
          >
            Remove
          </div>
        </a>
      </div>
      <input
        data-wf-bindings="%5B%7B%22value%22%3A%7B%22type%22%3A%22Number%22%2C%22filter%22%3A%7B%22type%22%3A%22numberPrecision%22%2C%22params%22%3A%5B%220%22%2C%22numberPrecision%22%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.count%22%7D%7D%2C%7B%22data-commerce-sku-id%22%3A%7B%22type%22%3A%22ItemRef%22%2C%22filter%22%3A%7B%22type%22%3A%22identity%22%2C%22params%22%3A%5B%5D%7D%2C%22dataPath%22%3A%22database.commerceOrder.userItems%5B%5D.sku.id%22%7D%7D%5D"


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
