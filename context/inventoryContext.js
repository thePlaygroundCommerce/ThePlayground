"use client";

import { createContext, useState } from "react";

export const InventoryContext = createContext();

const InventoryProvider = ({ children, apparelData }) => {
  const [catalogImages, setCatalogImages] = useState(apparelData.image);
  const [catalogItems, setCatalogItems] = useState(apparelData.item);

  return (
    <InventoryContext.Provider value={{ catalogItems, catalogImages }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
