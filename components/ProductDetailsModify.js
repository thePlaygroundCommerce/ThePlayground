"use client";

import { CartContext } from "context/cartContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Counter from "./Counter";
import DropdownMenu from "./DropdownMenu";
import { Tab } from "@headlessui/react";
import Button from "./Button";
import { CheckoutContext } from "context/checkoutContext";
import { CaretRight } from "react-bootstrap-icons";

const ProductDetailsModify = ({ catalogObject }) => {
  const [activeVariationIndex, setActiveVariationIndex] = useState(1);

  const {
    cart: { itemVariationsIDs, order },
    addCartItem,
  } = useContext(CartContext);

  const { getCheckoutUrl } = useContext(CheckoutContext);

  const {
    object: {
      itemData,
      itemData: { variations, name },
    },
  } = catalogObject;

  const [cartLineItem, setCartLineItem] = useState(
    order.lineItems?.find(({ catalogObjectId }) => {
      let i = 0;

      while (i < variations.length) {
        if (catalogObjectId == variations[i].id) return true;
        i++;
      }
    })
  );
  const [quantity, setQuantity] = useState(cartLineItem?.quantity || 0);

  const handleAddToCart = () => {
    const itemVariationID = variations[activeVariationIndex].id;
    const lineItem = { quantity: quantity.toString() };
    if (cartLineItem) {
      lineItem.uid =
        order.lineItems[itemVariationsIDs.indexOf(itemVariationID)].uid;
    } else {
      lineItem.catalogObjectId = itemVariationID;
    }

    addCartItem(lineItem);
  };

  const handleBuyNow = async () => {
    const itemVariationID = variations[activeVariationIndex].id;
    const lineItem = {
      quantity: quantity.toString(),
      catalogObjectId: itemVariationID,
    };

    const checkoutUrl = await getCheckoutUrl([lineItem]);

    window.location.assign(checkoutUrl);
  };

  const amount = BigInt(
    itemData.variations[0].itemVariationData.priceMoney.amount
  ).toString();

  return (
    <div className="m-auto">
      <div className="flex mb-7">
        <div className="basis-full">
          <p className="mb-1 h4">SWaNK</p>
          <p className="mb-1 h4 fw-bold">{name}</p>
          <p>$ {amount}</p>
        </div>
        <div className="basis-full grow">
          <div className="w-3/4">
            <Counter count={quantity} onCountChange={setQuantity} />
          </div>
          <div className="flex">
            <div className="w-75">
              <DropdownMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-7 justify-around">
        <Button onClick={handleBuyNow}>Buy Now</Button>
        <Button onClick={handleAddToCart}>
          {!cartLineItem?.quantity > 0 ? "Add To Cart" : "Update Cart"}
        </Button>
      </div>
      <div className="mb-7">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="mb-3 pb-2 border-b">
            <Tab className="pe-3">Details</Tab>
            <Tab className="pe-3">Mission</Tab>
            <Tab className="pe-3">Shop The Style</Tab>
          </Tab.List>
          <Tab.Panel>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Est
              placerat in egestas erat imperdiet sed. Neque laoreet suspendisse
              interdum consectetur.
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </Tab.Panel>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProductDetailsModify;
