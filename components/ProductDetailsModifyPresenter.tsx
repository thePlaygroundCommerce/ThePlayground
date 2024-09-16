"use client";
import Counter from "./Counter";
import { Tab } from "@headlessui/react";
import Button from "./Button";
import { Placeholder, SelectPicker } from "rsuite";
import { AppProps } from "types";
import _ from "lodash";
import Money from "./Money";
import { CatalogItem, CatalogObject } from "square";
import { useInventory } from "context/inventoryContext";
import Selector from "./ColorSelector";

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
      <div className="md:w-2/3 md:m-auto flex flex-col justify-end h-full">
        <div className="grid grid-cols-2 w-full mb-7 p-3">
          <div className="basis-full">
            <p className="mb-1 h4 fw-bold">{itemData?.name}</p>
            <Money number={amount} />
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
          <Button onClick={handleBuyNow}>Buy Now</Button>
          <Button onClick={handleAddToCart}>
            {!(+(isProductInCart()?.quantity ?? 0) > 0)
              ? "Add To Cart"
              : "Update Cart"}
          </Button>
        </div>
      </div>
      <div className="mb-7 border-t h-full">
        {itemData.description && (
          <Tab.Group defaultIndex={0}>
            <Tab.List className="mb-3 pb-2 p-3 border-b">
              <Tab className="pe-3">Details</Tab>
            </Tab.List>
            <Tab.Panel className="px-3">
              <p>{itemData.description}</p>
            </Tab.Panel>
          </Tab.Group>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModifyPresenter;
