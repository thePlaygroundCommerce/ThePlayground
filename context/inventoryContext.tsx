"use client";

import { createContext, useState } from "react";
import { AppProps } from "types";

export const InventoryContext = createContext({});

type Props = AppProps & {
  apparelData: {
    apparelImages: any;
    apparelItems: any;
  };
  handleCategoryChange?: () => void;
};

const InventoryProvider = ({
  children,
  apparelData,
  handleCategoryChange = () => {},
}: Props) => {
  const [catalogImages, setCatalogImages] = useState(apparelData.apparelImages);
  const [catalogItems, setCatalogItems] = useState(apparelData.apparelItems);

  const onCategoryChange = () => {
    setCatalogItems(handleCategoryChange());
  };

  return (
    <InventoryContext.Provider
      value={{ catalogItems, catalogImages, onCategoryChange }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
