"use client";

import { createContext, useState } from "react";

export const InventoryContext = createContext();

const InventoryProvider = ({ children, apparelData, handleCategoryChange }) => {
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
