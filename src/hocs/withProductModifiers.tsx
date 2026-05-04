/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier, useLineItemModifier } from "@/context/cartContext";
import {
  ChangeEventHandler,
  ComponentType,
  Dispatch,
  FC,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { AppProps } from "index";
import {
  CatalogItem,
  CatalogItemOptionForItem,
  CatalogObject,
  OrderLineItem,
} from "square";
import { ProductDetailsProps } from "../components/ProductDetails";
import { useCheckout } from "@/context/checkoutContext";
import { useInventory } from "@/context/inventoryContext";
import _ from "lodash";
// import Selector from "../components/ColorSelector";
import Counter from "@/components/Counter";
import Button from "@/components/Button";
import { useTracking } from "@/context/TagManager";
import { SelectorComponentMap } from "@/components/ColorSelector";

type Props = AppProps & {
  catalogItemObject: CatalogObject;
  catalogImageObjects: CatalogObject[];
  productImageGallery: ReactNode
};

export type WithProductModifiersProps = AppProps & {
  isCartLoading: boolean
  isCheckoutLoading: boolean
  isProductInCart: (id?: string) => OrderLineItem | undefined
  price: number;
  name: string;
  selectors: Selectors;
  cartModifiers: CartModifiers;
  addToCart: ReactNode
};

type Lookup<T> = { [key: string | number]: undefined | null | T };

const withProductModifiers =
  (Component: ComponentType<ProductDetailsProps>): FC<Props> =>
    ({
      catalogItemObject,
      catalogImageObjects,
      ...rest
    }: Props): JSX.Element => {
      const { itemOptions } = useInventory();
      const { checkoutItem } = useCheckout();
      const {
        cart: { lineItems = [] },
        modifyCart,
        deleteCartItem,
      } = useCartModifier();

      const lineItemModifiers = useLineItemModifier()
      const { track } = useTracking();

      useEffect(() => {
        toggleLoading();
      }, [
        lineItems?.length,
        lineItems?.reduce((sum, { quantity }) => sum + +quantity, 0),
      ]);

      const itemData =
        catalogItemObject.type === "ITEM" ? catalogItemObject.itemData ?? {} : {};
      const variations: CatalogObject.ItemVariation[] = (
        itemData.variations ?? []
      ).filter(
        (variation): variation is CatalogObject.ItemVariation =>
          variation.type === "ITEM_VARIATION",
      );

      const [{ isCartLoading, isCheckoutLoading }, setLoadingState] = useState({
        isCartLoading: false,
        isCheckoutLoading: false,
      });

      const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
      const selectedVariation = variations[selectedVariationIndex];
      const itemVariationId = selectedVariation?.id;
      const itemId = selectedVariation?.itemVariationData?.itemId;
      const name = selectedVariation?.itemVariationData?.name;
      const lineItem = lineItems?.find(
        ({ catalogObjectId }) => catalogObjectId === itemVariationId
      );
      const trackingData = {
        content_ids: [itemVariationId, itemId ?? ""],
        content_name: name,
        content_type: "product",
        content_category: null,
        currency: lineItem?.totalMoney?.currency,
        value: lineItem?.totalMoney?.amount,
        num_items: lineItems?.length,
      };

      const isProductInCart = (itemVariationId?: string) => {
        if (!itemVariationId) itemVariationId = variations[selectedVariationIndex]?.id;
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
      };

      const [quantity, setQuantity] = useState(
        +(isProductInCart()?.quantity ?? 1)
      );

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
        toggleLoading("cart");
        try {
          track("AddToCart", trackingData);
        } catch (error) {

        }
        const lineItem: OrderLineItem = {
          quantity: quantity.toString(),
        };

        if (isProductInCart(itemVariationId) && lineItems !== null) {
          lineItem.uid = lineItems[selectedVariationIndex]?.uid;
        } else {
          lineItem.catalogObjectId = itemVariationId;
        }

        const primaryImageData = catalogImageObjects.find(
          (obj): obj is CatalogObject.Image => obj.type === "IMAGE",
        )?.imageData;

        const isCartModified = modifyCart(
          lineItem,
          primaryImageData
        );
        if (isCartModified === false) toggleLoading();
      };

      const handleRemoveFromCart = () => {
        toggleLoading("cart");
        track("RemoveFromCart", trackingData);

        const lineItem = isProductInCart(itemVariationId);
        if (!lineItem) throw Error("Item Not In Cart");

        const isCartModified = modifyCart(
          lineItem, undefined, true
        );

        if (isCartModified === false) toggleLoading();
      };

      const handleBuyNow = async () => {
        track("InitiateCheckout", trackingData);
        toggleLoading("checkout");
        const itemVariationID = variations[selectedVariationIndex].id;
        checkoutItem(itemVariationID, quantity.toString());
      };
      const amount =
        variations[0]?.itemVariationData?.priceMoney?.amount;

      const productOptions: Record<string, [string | null | undefined, (CatalogObject | undefined)[]]> = Object.fromEntries(
        Object.entries(
          variations.reduce(
            (
              a: Record<string, Set<string>>,
              variation: CatalogObject.ItemVariation,
            ) => {
              const itemVariationData = variation.itemVariationData;
              if (!itemVariationData?.itemOptionValues) return a;

              const { itemOptionValues } = itemVariationData;
              itemOptionValues.forEach(
                ({ itemOptionId, itemOptionValueId }) => {
                if (!(itemOptionId && itemOptionValueId)) return a;

                if (a[itemOptionId]) a[itemOptionId].add(itemOptionValueId);
                else a[itemOptionId] = new Set([itemOptionValueId]);
                },
              );
              return a;
            },
            {}
          ) ?? {}
        ).map(([key, val]) => {
          const itemOptionData = itemOptions.find(
            (obj): obj is CatalogObject.ItemOption =>
              obj.type === "ITEM_OPTION" && obj.id === key,
          )?.itemOptionData;

          const optionValueData = Array.from(val as Set<string>).map((optionValueId) =>
            itemOptionData?.values?.find(({ id }) => id === optionValueId)
          );

          return [key, [itemOptionData?.name, optionValueData]];
        })
      );

      const selectedOptions =
        selectedVariation?.itemVariationData?.itemOptionValues;

      const getVariantByOptions = ({
        optionId,
        optionValueId,
      }: {
        optionId: string;
        optionValueId: string;
      }) => {
        return variations
          .filter((variation) => {
            const itemOptionValues = variation.itemVariationData?.itemOptionValues;
            const otherSelectedOptions =
              selectedOptions?.filter(
                ({ itemOptionId }) => itemOptionId !== optionId
              ) ?? [];

            return (
              _.differenceWith(itemOptionValues, otherSelectedOptions, _.isEqual)
                .length < 2
            );
          })
          .find((variation) => {
            const itemOptionValues = variation.itemVariationData?.itemOptionValues;
            return itemOptionValues?.some(
              ({ itemOptionId, itemOptionValueId }) =>
                itemOptionId === optionId && itemOptionValueId === optionValueId
            );
          });
      };

      const handleOptionChange = (option: {
        optionId: string;
        optionValueId: string;
      }) => {
        const newVariantId = getVariantByOptions(option)?.id;
        if (!newVariantId) return;

        const newIndex = variations.findIndex(({ id }) => newVariantId === id);
        if (newIndex < 0) return;

        setSelectedVariationIndex(newIndex);
      };

      const selectors: Selectors = Object.entries(productOptions).reduce<Selectors>(
        (acc, [optionId, [option, optionValues]], i) => {
          const type = option === "colors" ? "RADIO" : "CARD";
          const data =
            option === "size"
              ? optionValues.map((obj) => {
                let name =
                  obj?.type === "ITEM_OPTION_VAL"
                    ? obj.itemOptionValueData?.name
                    : "";

                name = _.capitalize(name ?? "").slice(0, 1);
                return obj;
              })
              : optionValues.map((obj) => {
                if (!obj) return;
                if (obj.type !== "ITEM_OPTION_VAL") return obj;

                const linkedVariant = getVariantByOptions({
                  optionId: obj.itemOptionValueData?.itemOptionId ?? "",
                  optionValueId: obj.id ?? "",
                });

                const linkedImageId = linkedVariant?.itemVariationData?.imageIds?.[0];
                const linkedImageData = catalogImageObjects.find(
                  (catalogObj): catalogObj is CatalogObject.Image =>
                    catalogObj.type === "IMAGE" && catalogObj.id === linkedImageId,
                )?.imageData;

                return {
                  ...obj,
                  imageData: linkedImageData,
                } as CatalogObject;
              });

          const selected = optionValues.findIndex(
            (obj) =>
              obj?.id ===
              selectedOptions?.find(({ itemOptionId }) => itemOptionId === optionId)
                ?.itemOptionValueId,
          );

          return {
            ...acc,
            [option ?? i]: {
              selectedIndex: selected,
              type: type,
              data: data,
              onChange: handleOptionChange,
            },
          };
        },
        {}
      );

      const cartModifiers = {
        loading: { isCheckoutLoading, isCartLoading },
        quantity: quantity,
        setQuantity: setQuantity,
        handleAddToCart: handleAddToCart,
        handleRemoveFromCart: handleRemoveFromCart,
        isProductInCart: isProductInCart,
        handleBuyNow: handleBuyNow,
      };

      const addToCart = (
        <Button
          loading={isCartLoading}
          data-node-type="commerce-add-to-cart-button"
          data-loading-text="Adding to cart..."
          aria-busy="false"
          aria-haspopup="dialog"
          className="w-commerce-commerceaddtocartbutton k-btn w-full justify-center text-white border-white"
          onClick={
            isProductInCart(itemVariationId)
              ? handleRemoveFromCart
              : handleAddToCart
          }
        >
          {isProductInCart(itemVariationId) ? "Remove from Cart" : "Add To Cart"}
        </Button>
      );

      return (
        <Component
          {...{
            isCartLoading,
            isCheckoutLoading,
            lineItemModifiers,
            isProductInCart,
            price: Number(amount ?? 0),
            name: itemData.name ?? "",
            description: itemData.description ?? "",
            selectors,
            cartModifiers,
            addToCart,
            ...rest
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
    itemOptions.find(
      (obj): obj is CatalogObject.ItemOption =>
        obj.type === "ITEM_OPTION" && obj.id === key,
    )?.itemOptionData?.name ?? "",
    val,
  ]);

export type CartModifiers = {
  loading: { isCartLoading: boolean; isCheckoutLoading: boolean };
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  handleAddToCart: MouseEventHandler<HTMLButtonElement>;
  handleRemoveFromCart: MouseEventHandler<HTMLButtonElement>;
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
}: CartModifiers) => {
  return (
    <>
      <div className="flex items-center gap-2">
        {/* <div className="h-auto">
          <Counter
            className="p-2"
            count={+quantity}
            onCountChange={setQuantity}
          />
        </div> */}
        <Button
          loading={isCartLoading}
          disabled={isCartLoading}
          className="grow shadow-[0_27px_15px_-17px_rgba(0,0,0,.3),0_2px_4px_rgba(0,0,0,.3)]"
          variant="primary"
          onClick={handleAddToCart}
        >
          {!(+(isProductInCart()?.quantity ?? 0) > 0)
            ? "Add To Cart"
            : "Update Cart"}
        </Button>
      </div>
      {/* <Button variant="primary" loading={isCheckoutLoading} disabled={isCheckoutLoading} onClick={handleBuyNow}>
        Buy Now
      </Button> */}
    </>
  );
};


export type Selector = {
  selectedIndex: number,
  type: keyof SelectorComponentMap,
  data: CatalogObject.ItemOptionVal[],
  onChange: ChangeEventHandler,
}
export type Selectors = { color?: Selector, size?: Selector }