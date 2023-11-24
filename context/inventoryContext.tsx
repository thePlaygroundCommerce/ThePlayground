"use client";

import { createContext, useState } from "react";
import { AppProps } from "types";

export const InventoryContext = createContext({});

type Props = AppProps & {
  apparelData: {
    image: any;
    item: any;
  };
  handleCategoryChange: () => void
}

const InventoryProvider = ({ children, apparelData, handleCategoryChange }: Props) => {
  const [catalogImages, setCatalogImages] = useState(apparelData.image);
  const [catalogItems, setCatalogItems] = useState(apparelData.item);

  const onCategoryChange = () => {
    setCatalogItems(handleCategoryChange())
  }

  return (
    <InventoryContext.Provider value={{ catalogItems, catalogImages, onCategoryChange }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
