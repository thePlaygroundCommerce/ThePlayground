"use client";

import { createContext, useContext, useState } from "react";
import { CatalogItem, CatalogItemOption, CatalogItemOptionForItem, CatalogObject } from "square";
import { AppProps } from "index";

export const InventoryContext = createContext<{
  itemOptions: CatalogObject[]
}>({
  itemOptions: []
});

type Props = AppProps & {
  itemOptions: CatalogObject[];
};

const InventoryProvider = ({
  children,
  itemOptions,
}: Props) => {
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
