/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier } from "context/cartContext";
import { SetStateAction, useState } from "react";
import { AppProps } from "types";
import { CatalogItemOptionForItem, CatalogObject, OrderLineItem } from "square";
import ProductDetailsModifyPresenter from "./ProductDetailsModifyPresenter";
import { useCheckout } from "context/checkoutContext";
import { useInventory } from "context/inventoryContext";
import { props } from "cypress/types/bluebird";
import _ from "lodash";
import Selector from "./ColorSelector";

type Props = AppProps & {
  catalogItemObject: CatalogObject;
  catalogImageObjects: CatalogObject[];
};

type Lookup<T> = { [key: string | number]: undefined | null | T };

const ProductDetailsModify = ({
  catalogItemObject: { itemData = {} },
  catalogImageObjects: catalogImageObject,
}: Props) => {
  const { itemOptions } = useInventory();
  const { checkoutItem } = useCheckout();
  const {
    cart: { lineItems = [] },
    modifyCart,
  } = useCartModifier();

  let { variations } = itemData!;
  variations = variations ?? [];

  const isProductInCart = (itemVariationId?: string) =>
    lineItems?.find(({ catalogObjectId }) => {
      if (itemVariationId) return catalogObjectId == itemVariationId;
      else {
        let i = 0;

        while (i < (variations.length ?? 0)) {
          if (catalogObjectId == variations[i].id) return true;
          i++;
        }
      }
    });

  const [quantity, setQuantity] = useState(+(isProductInCart()?.quantity ?? 1));
  const [selectedVariation, setSelectedVariation] = useState(0);

  const handleAddToCart = () => {
    const itemVariationId = variations[selectedVariation].id;
    const lineItem: OrderLineItem = {
      quantity: quantity.toString(),
    };

    if (isProductInCart(itemVariationId) && lineItems !== null) {
      lineItem.uid = lineItems[selectedVariation].uid;
    } else {
      lineItem.catalogObjectId = itemVariationId;
    }
    modifyCart(lineItem, catalogImageObject[0].imageData);
  };

  const handleBuyNow = async (order: any) => {
    const itemVariationID = variations[selectedVariation].id;
    checkoutItem(itemVariationID, quantity.toString());
  };

  const handleSelectChange = (value: SetStateAction<number> | null) =>
    setSelectedVariation(value ?? 0);

  const amount = itemData?.variations![0].itemVariationData?.priceMoney?.amount;

  const data: any[] = variations.map(({ itemVariationData }, i) => ({
    label: itemVariationData?.name?.slice(0, 1).toUpperCase(),
    value: i,
  }));

  const productOptions: {
    [k: string]: [
      string | null | undefined,
      (CatalogObject | undefined)[],
    ];
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

    setSelectedVariation(variations.findIndex(({ id }) => newVariantId === id));
  };

  const selectors = Object.entries(productOptions).reduce(
    (acc, [optionId, [option, optionValues]], i) => {
      const type = option === "colors" ? "RADIO" : "DROPDOWN";
      const data =
        option === "size"
          ? optionValues.map((obj) => {
              let {
                itemOptionValueData: { name } = { name: ""},
              } = obj as CatalogObject;

              name = _.capitalize(name ?? "").slice(0, 1);
              return obj;
            })
          : optionValues;

      const selected = optionValues.findIndex(
        ({ id } = { id: "", type: "" }) =>
          id ===
          selectedOptions?.find(({ itemOptionId }) => itemOptionId === optionId)
            ?.itemOptionValueId
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

  return (
    <ProductDetailsModifyPresenter
      {...{
        handleOptionChange,
        amount,
        options,
        itemData,
        quantity,
        selectors,
        setQuantity,
        data,
        handleSelectChange,
        selectedVariation,
        handleBuyNow,
        handleAddToCart,
        isProductInCart,
      }}
    />
  );
};

export default ProductDetailsModify;

const transformOptionId = (
  list: [string, (CatalogObject | undefined)[]][],
  itemOptions: CatalogObject[]
): [string, (CatalogObject | undefined)[]][] =>
  list.map(([key, val]) => [
    itemOptions.find(({ id }) => id === key)?.itemOptionData?.name ?? "",
    val,
  ]);
