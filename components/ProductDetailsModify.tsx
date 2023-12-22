"use client";
import { useCart } from "context/cartContext";
import { SetStateAction, useState } from "react";
import { AppProps } from "types";
import { CatalogObject, OrderLineItem } from "square";
import { ItemDataType } from "rsuite/esm/@types/common";
import { getCheckoutUrl } from "api/checkoutApi";
import ProductDetailsModifyPresenter from "./ProductDetailsModifyPresenter";

type Props = AppProps & {
  catalogObject: CatalogObject;
};

const ProductDetailsModify = ({ catalogObject }: Props) => {
  const {
    cart: { lineItems = [] },
    addCartItem,
  } = useCart();

  const itemData = catalogObject.itemData!;
  const imageData = catalogObject.imageData!;

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

    addCartItem(lineItem, catalogObject.imageData);
  };

  const handleBuyNow = async () => {
    const itemVariationID = itemData.variations![selectedVariation].id;
    const lineItem = {
      quantity: quantity.toString(),
      catalogObjectId: itemVariationID,
    };

    const checkoutUrl = await getCheckoutUrl([lineItem]);

    window.location.assign(checkoutUrl);
  };

  const handleSelectChange = (value: SetStateAction<number> | null) =>
    setSelectedVariation(value === null ? 0 : value);

  const amount = BigInt(
    itemData?.variations![0].itemVariationData?.priceMoney?.amount ?? 50
  ).toString();

  const data: ItemDataType<number>[] = itemData?.variations!.map(
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
