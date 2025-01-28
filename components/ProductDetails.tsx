"use client";
import { Tab, TabGroup, TabList, TabPanel } from "@headlessui/react";
import { AppProps } from "index";
import _ from "lodash";
import Money from "./Money";
import ReactHtmlParser from "react-html-parser";
import Heading from "./typography/Heading";
import styles from "../styles/product_details.module.scss";
import clsx from "clsx";
import withProductModifiers, {
  WithProductModifiersProps,
} from "hocs/withProductModifiers";
import { Divider } from "rsuite";

type Props = AppProps & WithProductModifiersProps;

const ProductDetails = ({
  itemData,
  amount,
  selectors,
  CartModifiers,
}: Props) => {
  const productDesc = itemData.descriptionHtml ? (
    ReactHtmlParser(itemData.descriptionHtml)
  ) : (
    <p>{itemData.description || "No Details Available!"}</p>
  );

  return (
    <TabGroup defaultIndex={0}>
      <div
        className={clsx(
          styles.product_details,
          "relative flex flex-col h-full"
        )}
      >
        <div className="container md:m-auto flex flex-col justify-start gap-4">
          <div className="w-full">
            <Heading className="mb-1 fw-bold">{itemData?.name}</Heading>
            <div className="flex justify-between items-center">
              <Money className="text-xl font-bold" number={amount} />
              <p className="text-xs text-zinc-600">Free Shipping Available!</p>
            </div>
            {/* <Text>Shipping calculated at checkout</Text>
            <div className="flex gap-4 items-end">
              <StarRatings rating={2.403}
                starRatedColor="gold"
                starDimension="15px"
                starSpacing="3px" />
              <p>0 Reviews</p>
            </div> */}
          </div>
          <Divider className="m-0" />
          <div className="flex flex-col gap-4">
            {selectors.colors && (
              <div className=" flex items-end text-left gap-12">
                <div className="flex justify-center gap-5 w-full">
                  {selectors.colors}
                </div>
              </div>
            )}
            {/* {selectors.size && (
              <div className=" flex items-baseline text-left gap-12">
                <Heading level={5}>Sizes</Heading>
                <div className="pb-6 flex justify-center gap-5 w-full">
                  {selectors.size}
                </div>
              </div>
            )} */}
          </div>
          <div className="grid grid-cols-1 gap-1 justify-around w-full">
            {CartModifiers}
            <div className="p-2">
              <p className="text-xs text-zinc-600 text-center">🇺🇸 Ships within <span className="text-mintcream-600">3 business days.</span></p>
            </div>
          </div>
          <TabList className="mb-3 pb-2 p-3 flex justify-around">
            <Tab className="pe-3 focus:outline-none data-[selected]:underline">Details</Tab>
            {/* <Tab className="pe-3 focus:outline-none data-[selected]:underline">FAQs</Tab> */}
            <Tab className="pe-3 focus:outline-none data-[selected]:underline">Reviews</Tab>
          </TabList>
        </div>
        <div className="border-t h-full min-h-144 p-3">
          <TabPanel
            className={clsx("h-full", !itemData.description && "text-center")}
          >
            {productDesc}
          </TabPanel>
          <TabPanel className="h-full text-center">
            <p>No Reviews Available. Be the first!</p>
          </TabPanel>
          <TabPanel className="h-full text-center">
            <p>No Reviews Available. Be the first!</p>
          </TabPanel>
        </div>
      </div>
    </TabGroup>
  );
};

export default withProductModifiers(ProductDetails);
