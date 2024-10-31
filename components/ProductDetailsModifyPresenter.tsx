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
    <div className="flex flex-col h-full">
      <div className="container md:m-auto flex flex-col justify-start">
        <div className="grid grid-cols-2 w-full mb-7 p-3">
          <div className="basis-full">
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
          <div className="basis-full grow flex flex-col items-center">
            <div className="">
              <Counter count={+quantity} onCountChange={setQuantity} />
            </div>
            {selectors.size}
          </div>
        </div>
        <div className="text-center">
          <div className="pb-6 flex justify-center gap-5">
            {selectors.colors}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 pb-7 justify-around  w-full">
          <Button variant="outline" onClick={handleBuyNow}>Buy Now</Button>
          <Button variant="primary" onClick={handleAddToCart}>
            {!(+(isProductInCart()?.quantity ?? 0) > 0)
              ? "Add To Cart"
              : "Update Cart"}
          </Button>
        </div>
      </div>
      <div className="mb-7 border-t h-full">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="mb-3 pb-2 p-3 border-b flex justify-around">
            <Tab className="pe-3">Details</Tab>
            <Tab className="pe-3">Reviews</Tab>
          </Tab.List>
          <Tab.Panel className="px-3">
            <p>{itemData.description || "No Details Available!"}</p>
          </Tab.Panel>
          <Tab.Panel className="px-3">
            <p>No Reviews Available. Be the first!</p>
          </Tab.Panel>
        </Tab.Group>
      </div>
    </div>
  );
};

export default ProductDetailsModifyPresenter;
