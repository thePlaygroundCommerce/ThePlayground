"use client";
import Counter from "./Counter";
import { Tab } from "@headlessui/react";
import Button from "./Button";
import { Placeholder, SelectPicker } from "rsuite";
import { AppProps } from "types";
import Money from "./Money";
import { CatalogItem, CatalogObject } from "square";

type Props = AppProps & {
  amount: any;
  itemData: CatalogItem;
  quantity: any;
  setQuantity: any;
  data: any;
  handleSelectChange: any;
  selectedVariation: any;
  handleBuyNow: any;
  handleAddToCart: any;
  isProductInCart: any;
};

const ProductDetailsModifyPresenter = (props: Props) => {
  return (
    <div className="flex flex-col h-full">
      <div className="md:w-2/3 md:m-auto flex flex-col justify-end h-full">
        <div className="grid grid-cols-2 w-full mb-7 p-3">
          <div className="basis-full">
            <p className="mb-1 h4 fw-bold">{props.itemData?.name}</p>
            <Money number={props.amount} />
          </div>
          <div className="basis-full grow flex flex-col items-center">
            <div className="">
              <Counter
                count={+props.quantity}
                onCountChange={props.setQuantity}
                childrenElement={<></>}
              />
            </div>
            <SelectPicker
              data={props.data}
              onChange={props.handleSelectChange}
              searchable={false}
              cleanable={false}
              placeholder={props.itemData?.variations![
                props.selectedVariation
              ].itemVariationData?.name?.slice(0, 1)}
              defaultValue={props.selectedVariation}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 pb-7 justify-around  w-full">
          <Button onClick={props.handleBuyNow}>Buy Now</Button>
          <Button onClick={props.handleAddToCart}>
            {!(+(props.isProductInCart()?.quantity ?? 0) > 0)
              ? "Add To Cart"
              : "Update Cart"}
          </Button>
        </div>
      </div>
      <div className="mb-7 border-t h-full">
        {props.itemData.description && (
          <Tab.Group defaultIndex={0}>
            <Tab.List className="mb-3 pb-2 p-3 border-b">
              <Tab className="pe-3">Details</Tab>
            </Tab.List>
            <Tab.Panel className="px-3">
              <p>
                {props.itemData.description}
              </p>
            </Tab.Panel>
          </Tab.Group>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsModifyPresenter;
