"use client";
import Counter from "./Counter";
import { Tab } from "@headlessui/react";
import Button from "./Button";
import { Placeholder, SelectPicker } from "rsuite";
import { AppProps } from "types";

type Props = AppProps & {
  amount: any;
  itemData: any;
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
    <div className="m-auto">
      <div className="grid grid-cols-2 mb-7 p-3">
        <div className="basis-full">
          <p className="mb-1 h4">SWaNK</p>
          <p className="mb-1 h4 fw-bold">{props.itemData?.name}</p>
          <p>$ {parseFloat(props.amount).toFixed(2)}</p>
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
      <div className="grid grid-cols-1 gap-1 pb-7 border-b justify-around">
        <Button onClick={props.handleBuyNow}>Buy Now</Button>
        <Button onClick={props.handleAddToCart}>
          {!(+(props.isProductInCart()?.quantity ?? 0) > 0)
            ? "Add To Cart"
            : "Update Cart"}
        </Button>
      </div>
      <div className="mb-7">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="mb-3 pb-2 p-3 border-b">
            <Tab className="pe-3">Details</Tab>
            <Tab className="pe-3">Mission</Tab>
            <Tab className="pe-3">Shop The Style</Tab>
          </Tab.List>
          <Tab.Panel className="px-3">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Est
              placerat in egestas erat imperdiet sed. Neque laoreet suspendisse
              interdum consectetur.
            </div>
          </Tab.Panel>
          <Tab.Panel className="px-3">
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

export default ProductDetailsModifyPresenter;
