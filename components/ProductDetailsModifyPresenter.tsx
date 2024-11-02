"use client";
import Counter from "./Counter";
import { Tab } from "@headlessui/react";
import Button from "./Button";
import { Placeholder, SelectPicker } from "rsuite";
import { AppProps } from "types";
import _ from "lodash";
import Money from "./Money";
import { CatalogItem, CatalogObject } from "square";
// @ts-ignore
import StarRatings from "react-star-ratings";
import { useInventory } from "context/inventoryContext";
import Selector from "./ColorSelector";
import Heading from "./typography/Heading";
import Text from "./typography/Text";
import clsx from "clsx";

type Props = AppProps & {
  amount: any;
  itemData: CatalogItem;
  quantity: any;
  selectors: any;
  options: {
    [key: string]:
    | {
      placeholder: string | undefined;
      productOptionValues: (CatalogObject | undefined)[];
      selectedOptions: any;
    }
    | undefined;
  };
  setQuantity: any;
  selectedVariation: any;
  handleBuyNow: any;
  handleAddToCart: any;
  isProductInCart: any;
  handleOptionChange: any;
};

const ProductDetailsModifyPresenter = ({
  itemData,
  amount,
  quantity,
  setQuantity,
  selectors,
  options,
  handleOptionChange,
  selectedVariation,
  handleBuyNow,
  handleAddToCart,
  isProductInCart,
}: Props) => {
  return (
    <Tab.Group defaultIndex={0}>
      <div className="relative flex flex-col h-full">
        <div className="container md:m-auto flex flex-col justify-start gap-4">
          <div className="w-full py-3">
            <Heading className="mb-1 fw-bold">{itemData?.name}</Heading>
            <Money className="text-xl font-bold" number={amount} />
            {/* <Text>Shipping calculated at checkout</Text>
            <div className="flex gap-4 items-end">
              <StarRatings rating={2.403}
                starRatedColor="gold"
                starDimension="15px"
                starSpacing="3px" />
              <p>0 Reviews</p>
            </div> */}
          </div>
          <div className="flex flex-col gap-4">
            {selectors.colors && (
              <div className=" flex items-end text-left gap-12">
                <Heading level={5}>Styles</Heading>
                <div className="flex justify-center gap-5 w-full">
                  {selectors.colors}
                </div>
              </div>
            )}
            {selectors.size && (
              <div className=" flex items-baseline text-left gap-12">
                <Heading level={5}>Sizes</Heading>
                <div className="pb-6 flex justify-center gap-5 w-full">
                  {selectors.size}
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 gap-1 pb-7 justify-around w-full">
            <div className="flex items-center gap-2">
              <div className="border-mintcream-600 border-2 text-mintcream-600 rounded h-auto p-2">
                <Counter count={+quantity} onCountChange={setQuantity} />
              </div>
              <Button className="flex-grow" variant="outline" onClick={handleAddToCart}>
                {!(+(isProductInCart()?.quantity ?? 0) > 0)
                  ? "Add To Cart"
                  : "Update Cart"}
              </Button>
            </div>
            <Button variant="primary" onClick={handleBuyNow}>Buy Now</Button>
          </div>
          <Tab.List className="mb-3 pb-2 p-3 flex justify-around">
            <Tab className="pe-3">Details</Tab>
            <Tab className="pe-3">Reviews</Tab>
          </Tab.List>
        </div>
        <div className="border-t h-full pt-4">
          <Tab.Panel className={clsx("px-3", !itemData.description && "text-center")}>
            <p>{itemData.description || "No Details Available!"}</p>
          </Tab.Panel>
          <Tab.Panel className="px-3 text-center">
            <p>No Reviews Available. Be the first!</p>
          </Tab.Panel>
        </div>
      </div>
    </Tab.Group>
  );
};

export default ProductDetailsModifyPresenter;
