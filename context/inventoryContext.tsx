"use client";

import { createContext, useContext, useState } from "react";
import { CatalogItem, CatalogItemOption, CatalogItemOptionForItem, CatalogObject } from "square";
import { AppProps } from "types";

export const InventoryContext = createContext<{
  itemOptions: CatalogObject[]
}>({
  itemOptions: []
});

type Props = AppProps & {
  _itemOptions: CatalogObject[];
  apparelData: {
    apparelImages: any;
    apparelItems: any;
  };
  handleCategoryChange?: () => void;
};

const InventoryProvider = ({
  children,
  apparelData,
  _itemOptions,
  handleCategoryChange = () => { },
}: Props) => {
  const [{ itemOptions }] = useState({
    itemOptions: _itemOptions
  })
  const [catalogItems, setCatalogItems] = useState(apparelData.apparelItems);

  const onCategoryChange = () => {
    setCatalogItems(handleCategoryChange());
  };

  return (
    <InventoryContext.Provider
      value={{ itemOptions }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const currentInventory = useContext(InventoryContext);
  if (!currentInventory) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentInventory;
};

export default InventoryProvider;
