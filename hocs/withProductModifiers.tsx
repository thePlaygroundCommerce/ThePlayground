/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier } from "context/cartContext";
import {
  ComponentType,
  Dispatch,
  FC,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AppProps } from "types";
import {
  CatalogItem,
  CatalogItemOptionForItem,
  CatalogObject,
  OrderLineItem,
} from "square";
import ProductDetails from "../components/ProductDetails";
import { useCheckout } from "context/checkoutContext";
import { useInventory } from "context/inventoryContext";
import _ from "lodash";
import Selector from "../components/ColorSelector";
import Counter from "components/Counter";
import Button from "components/Button";

type Props = AppProps & {
  catalogItemObject: CatalogObject;
  catalogImageObjects: CatalogObject[];
};

export type WithProductModifiersProps = AppProps & {
  amount: any;
  itemData: CatalogItem;
  selectors: any;
  CartModifiers: JSX.Element
};

type Lookup<T> = { [key: string | number]: undefined | null | T };

const withProductModifiers =
  (
    Component: ComponentType<WithProductModifiersProps>
  ): FC<Props> =>
    ({
      catalogItemObject: { itemData = {} },
      catalogImageObjects,
    }: Props): JSX.Element => {
      const { itemOptions } = useInventory();
      const { checkoutItem } = useCheckout();
      const {
        cart: { lineItems = [] },
        modifyCart,
      } = useCartModifier();

      useEffect(() => {
        toggleLoading();
      }, [lineItems?.length, lineItems?.reduce((sum, { quantity }) => sum + (+quantity), 0)]);

      let { variations } = itemData!;
      variations = variations ?? [];

      const isProductInCart = (itemVariationId?: string) => {
        return lineItems?.find(({ catalogObjectId }) => {
          if (itemVariationId) return catalogObjectId == itemVariationId;
          else {
            let i = 0;

            while (i < (variations.length ?? 0)) {
              if (catalogObjectId == variations[i].id) return true;
              i++;
            }
          }
        });
      }
      const [{ isCartLoading, isCheckoutLoading }, setLoadingState] = useState({
        isCartLoading: false,
        isCheckoutLoading: false,
      });
      const [quantity, setQuantity] = useState(
        +(isProductInCart()?.quantity ?? 1)
      );
      const [selectedVariation, setSelectedVariation] = useState(0);

      const toggleLoading = (btnType?: "cart" | "checkout") => {
        setLoadingState({
          isCartLoading:
            btnType == "cart"
              ? !isCartLoading
              : btnType == undefined
                ? false
                : isCartLoading,
          isCheckoutLoading:
            btnType == "checkout"
              ? !isCheckoutLoading
              : btnType == undefined
                ? false
                : isCheckoutLoading,
        });
      };

      const handleAddToCart = () => {
        toggleLoading('cart')
        const itemVariationId = variations[selectedVariation].id;
        const lineItem: OrderLineItem = {
          quantity: quantity.toString(),
        };

        if (isProductInCart(itemVariationId) && lineItems !== null) {
          lineItem.uid = lineItems[selectedVariation].uid;
        } else {
          lineItem.catalogObjectId = itemVariationId;
        }
        const isCartModified = modifyCart(lineItem, catalogImageObjects[0].imageData);
        if (isCartModified === false) toggleLoading()
      };

      const handleBuyNow = async (order: any) => {
        toggleLoading('checkout')
        const itemVariationID = variations[selectedVariation].id;
        checkoutItem(itemVariationID, quantity.toString());
      };

      const handleSelectChange = (value: SetStateAction<number> | null) =>
        setSelectedVariation(value ?? 0);

      const amount =
        itemData?.variations![0].itemVariationData?.priceMoney?.amount;

      const data: any[] = variations.map(({ itemVariationData }, i) => ({
        label: itemVariationData?.name?.slice(0, 1).toUpperCase(),
        value: i,
      }));

      const productOptions: {
        [k: string]: [string | null | undefined, (CatalogObject | undefined)[]];
      } = Object.fromEntries(
        Object.entries(
          variations.reduce(
            (a: { [key: string]: Set<string> }, { itemVariationData }) => {
              if (!itemVariationData?.itemOptionValues) return a;

              const { itemOptionValues } = itemVariationData;
              itemOptionValues.forEach(({ itemOptionId, itemOptionValueId }) => {
                if (!(itemOptionId && itemOptionValueId)) return a;

                if (a[itemOptionId]) a[itemOptionId].add(itemOptionValueId);
                else a[itemOptionId] = new Set([itemOptionValueId]);
              });
              return a;
            },
            {}
          ) ?? {}
        ).map(([key, val]) => {
          const itemOptionData =
            itemOptions.find(({ id }) => id === key)?.itemOptionData ?? {};

          const optionValueData = Array.from(val).map((optionValueId) =>
            itemOptionData.values?.find(({ id }) => id === optionValueId)
          );

          return [key, [itemOptionData.name, optionValueData]];
        })
      );

      const selectedOptions =
        variations[selectedVariation].itemVariationData?.itemOptionValues;

      const handleOptionChange = ({
        optionId,
        optionValueId,
      }: {
        optionId: string;
        optionValueId: string;
      }) => {
        const newVariantId = variations
          .filter(({ itemVariationData: { itemOptionValues } = {} }) => {
            const otherSelectedOptions =
              selectedOptions?.filter(
                ({ itemOptionId }) => itemOptionId !== optionId
              ) ?? [];

            return (
              _.differenceWith(itemOptionValues, otherSelectedOptions, _.isEqual)
                .length < 2
            );
          })
          .find(({ itemVariationData: { itemOptionValues } = {} }) => {
            return itemOptionValues?.some(
              ({ itemOptionId, itemOptionValueId }) =>
                itemOptionId === optionId && itemOptionValueId === optionValueId
            );
          })?.id;

        setSelectedVariation(
          variations.findIndex(({ id }) => newVariantId === id)
        );
      };

      const selectors = Object.entries(productOptions).reduce(
        (acc, [optionId, [option, optionValues]], i) => {
          const type = option === "colors" ? "RADIO" : "CARD";
          const data =
            option === "size"
              ? optionValues.map((obj) => {
                let { itemOptionValueData: { name } = { name: "" } } =
                  obj as CatalogObject;

                name = _.capitalize(name ?? "").slice(0, 1);
                return obj;
              })
              : optionValues;

          const selected = optionValues.findIndex(
            ({ id } = { id: "", type: "" }) =>
              id ===
              selectedOptions?.find(
                ({ itemOptionId }) => itemOptionId === optionId
              )?.itemOptionValueId
          );

          return {
            ...acc,
            [option ?? i]: (
              <Selector
                selectedIndex={selected}
                type={type}
                data={data}
                onChange={handleOptionChange}
              />
            ),
          };
        },
        {}
      );

      const options = itemOptions.reduce(
        (acc, { id, itemOptionData: { name, values } = {} }) =>
          name
            ? {
              ...acc,
              [name]: {
                placeholder: values
                  ?.map(({ itemOptionValueData: { name } = {} }) =>
                    name!.toLowerCase()
                  )
                  .filter((name) => {
                    return _.words(
                      itemData.variations![
                        selectedVariation
                      ].itemVariationData!.name!.toLowerCase()
                    ).includes(name?.toLowerCase() ?? "");
                  })[0],
                selectedOptions:
                  selectedOptions
                    ?.filter((opt) => opt.itemOptionId === id)
                    .reduce((acc, cur) => {
                      const itemOptionData = itemOptions.find(
                        ({ id }) => id === cur.itemOptionId
                      )?.itemOptionData;
                      return {
                        ...acc,
                        [itemOptionData?.name ?? ""]:
                          itemOptionData?.values?.find(
                            ({ id }) => id === cur.itemOptionValueId
                          )?.itemOptionValueData?.name,
                      };
                    }, {} as Lookup<string>) ?? {},
                productOptionValues: productOptions[id],
              },
            }
            : acc,
        {}
      );

      const CartModifiers = (
        <CartModifierButtons
          loading={{ isCheckoutLoading, isCartLoading }}
          quantity={quantity}
          setQuantity={setQuantity}
          handleAddToCart={handleAddToCart}
          isProductInCart={isProductInCart}
          handleBuyNow={handleBuyNow}
        />
      );

      return (
        <Component
          {...{
            amount,
            itemData,
            selectors,
            CartModifiers
          }}
        />
      );
    };

export default withProductModifiers;

const transformOptionId = (
  list: [string, (CatalogObject | undefined)[]][],
  itemOptions: CatalogObject[]
): [string, (CatalogObject | undefined)[]][] =>
  list.map(([key, val]) => [
    itemOptions.find(({ id }) => id === key)?.itemOptionData?.name ?? "",
    val,
  ]);

type CartModifiyingProps = {
  loading: { isCartLoading: boolean, isCheckoutLoading: boolean };
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  handleAddToCart: MouseEventHandler<HTMLButtonElement>;
  isProductInCart: () => OrderLineItem | undefined;
  handleBuyNow: MouseEventHandler<HTMLButtonElement>;
};

const CartModifierButtons = ({
  loading: { isCartLoading, isCheckoutLoading },
  quantity,
  setQuantity,
  handleAddToCart,
  isProductInCart,
  handleBuyNow,
}: CartModifiyingProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="h-auto">
          <Counter
            className="p-2"
            count={+quantity}
            onCountChange={setQuantity}
          />
        </div>
        <Button
          loading={isCartLoading}
          disabled={isCartLoading}
          className="grow"
          variant="outline"
          onClick={handleAddToCart}
        >
          {!(+(isProductInCart()?.quantity ?? 0) > 0)
            ? "Add To Cart"
            : "Update Cart"}
        </Button>
      </div>
      <Button variant="primary" loading={isCheckoutLoading} disabled={isCheckoutLoading} onClick={handleBuyNow}>
        Buy Now
      </Button>
    </>
  );
};