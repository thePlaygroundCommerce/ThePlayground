/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCartModifier } from "context/cartContext";
import { SetStateAction, useState } from "react";
import { AppProps } from "types";
import { CatalogObject, OrderLineItem } from "square";
import ProductDetailsModifyPresenter from "./ProductDetailsModifyPresenter";
import { useCheckout } from "context/checkoutContext";

type Props = AppProps & {
  catalogItemObject: CatalogObject;
  catalogImageObjects: CatalogObject[];
};

const ProductDetailsModify = ({ catalogItemObject, catalogImageObjects: catalogImageObject }: Props) => {
  const { checkoutItem } = useCheckout()
  const {
    cart: { lineItems = [] },
    modifyCart,
  } = useCartModifier();


  const itemData = catalogItemObject.itemData!;

  const isProductInCart = (itemVariationId?: string) =>
    lineItems?.find(({ catalogObjectId }) => {
      if (itemVariationId) return catalogObjectId == itemVariationId;
      else {
        let i = 0;

        while (i < (itemData?.variations?.length ?? 0)) {
          if (catalogObjectId == itemData?.variations![i].id) return true;
          i++;
        }
      }
    });

  const [quantity, setQuantity] = useState(+(isProductInCart()?.quantity ?? 1));
  const [selectedVariation, setSelectedVariation] = useState(0);

  const handleAddToCart = () => {
    const itemVariationId = itemData.variations![selectedVariation].id;
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
    const itemVariationID = itemData.variations![selectedVariation].id;
    checkoutItem(itemVariationID, quantity.toString())
  };

  const handleSelectChange = (value: SetStateAction<number> | null) =>
    setSelectedVariation(value ?? 0);

  const amount = itemData?.variations![0].itemVariationData?.priceMoney?.amount

  const optionData: any[] = itemData?.variations!.map(
    ({ itemVariationData }, i) => ({
      label: itemVariationData?.name?.slice(0, 1).toUpperCase(),
      value: i,
    })
  );

  return (
    <ProductDetailsModifyPresenter
      amount={amount}
      itemData={itemData}
      quantity={quantity}
      setQuantity={setQuantity}
      optionData={optionData}
      handleSelectChange={handleSelectChange}
      selectedVariation={selectedVariation}
      handleBuyNow={handleBuyNow}
      handleAddToCart={handleAddToCart}
      isProductInCart={isProductInCart}
    />
  );
};

export default ProductDetailsModify;
