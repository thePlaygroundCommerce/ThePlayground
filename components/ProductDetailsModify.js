"use client";

import { CartContext } from "context/cartContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Counter from "./Counter";
import DropdownMenu from "./DropdownMenu";
import { Tab } from "@headlessui/react";
import Button from "./Button";

const ProductDetailsModify = ({ catalogObject }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeVariationIndex, setActiveVariationIndex] = useState(1);
  const {
    cart: { itemVariationsIDs, order },
    createCart,
    updateCart,
  } = useContext(CartContext);
  const {
    object: {
      itemData,
      itemData: { variations, name },
    },
    relatedObjects: [image],
  } = catalogObject;

  const handleAddToCart = () => {
    const itemVariationID = variations[activeVariationIndex].id;
    const lineItem = { quantity: quantity.toString() };
    if (!isCartItemNew) {
      lineItem.uid =
        order.lineItems[itemVariationsIDs.indexOf(itemVariationID)].uid;
    } else {
      lineItem.catalogObjectId = itemVariationID;
    }

    updateCart(lineItem);
  };
  const handleBuyNow = () => {
    const itemVariationID = variations[activeVariationIndex].id;
    const lineItem = {
      quantity: quantity.toString(),
      catalogObjectId: itemVariationID,
    };
    fetch(process.env.square[process.env.NODE_ENV].url + "checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order: { lineItems: [lineItem] },
        checkoutOptions: { redirectUrl: "http://localhost:3005/checkout/" },
      }),
    })
      .then((res) => res.json())
      .then(({ result }) => {
        console.log(result);
        window.location.assign(result.paymentLink.url);
        // router.push(result.paymentLink.url).catch((err) => console.log(err));
      })
      .catch((err) => console.error(err));
  };

  const amount = BigInt(
    itemData.variations[0].itemVariationData.priceMoney.amount
  ).toString();
  const handleDropDownbuttonChange = (e) =>
    setActiveVariationIndex(e.target.name);

  const isCartItemNew = !itemVariationsIDs.includes(
    variations[activeVariationIndex].id
  );

  return (
    <div className="m-auto">
      <div className="flex mt-5 m-3">
        <div className="basis-full mb-5">
          <p className="h4">SWaNK</p>
          <p className="h4 fw-bold">{name}</p>
          <p>$ {amount}</p>
        </div>
        <div className="basis-full grow">
          <div className="">
            <Counter count={quantity} onCountChange={setQuantity} />
          </div>
          <div className="flex">
            <div className="w-75">
              <DropdownMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around">
        <Button onClick={handleBuyNow}>Buy Now</Button>
        <Button onClick={handleAddToCart}>
          {isCartItemNew ? "Add To Cart" : "Update Cart"}
        </Button>
      </div>
      <div className="mt-5">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="mb-3">
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