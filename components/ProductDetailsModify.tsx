/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useCart, useCartModifier } from "context/cartContext";
import { SetStateAction, useState } from "react";
import { AppProps } from "types";
import { CatalogObject, OrderLineItem } from "square";
import { getCheckoutUrl } from "api/checkoutApi";
import ProductDetailsModifyPresenter from "./ProductDetailsModifyPresenter";
import { useRouter } from "next/navigation";
import { apiRouteHandlerAdapter } from "apiRouteHandler";

type Props = AppProps & {
  catalogItemObject: CatalogObject;
  catalogImageObject: CatalogObject[];
};

const ProductDetailsModify = ({ catalogItemObject, catalogImageObject }: Props) => {
  const { push } = useRouter();
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

  const handleBuyNow = async ( order: any ) => {
    const itemVariationID = itemData.variations![selectedVariation].id;
    const lineItem = {
      quantity: quantity.toString(),
      catalogObjectId: itemVariationID,
    };

    apiRouteHandlerAdapter({
      method: "POST",
      url: `/api/cart`,
      payload: { order }
    }).then((a) => {
      // if(order)
      //   push(`/checkout/${order.id}`)
      // else {
      //   // todo do something
      // }
    })

  };

  const handleSelectChange = (value: SetStateAction<number> | null) =>
    setSelectedVariation(value === null ? 0 : value);

  const amount = BigInt(
    itemData?.variations![0].itemVariationData?.priceMoney?.amount ?? 50
  ).toString();

  const data: any[] = itemData?.variations!.map(
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
      data={data}
      handleSelectChange={handleSelectChange}
      selectedVariation={selectedVariation}
      handleBuyNow={handleBuyNow}
      handleAddToCart={handleAddToCart}
      isProductInCart={isProductInCart}
    />
  );
};

export default ProductDetailsModify;
