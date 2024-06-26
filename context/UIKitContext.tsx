"use client";

import _ from "lodash";
import { usePathname } from "next/navigation";
import { createContext, useState, useMemo, useContext, useRef, useEffect } from "react";
import { Drawer } from "rsuite";
import { UIKitContextType } from "types";

export const UIKitContext = createContext<UIKitContextType | null>(null);


const UIKitProvider = ({ children }: any) => {
  const path = usePathname();

  useEffect(() => {
    handleUIChange({ open: false })
  }, [path])

  const [uiState, setUIState] = useState({
    drawerKit: {
      placement: null,
      open: false,
      ref: useRef(null)
    }
  })

  const handleUIChange = (data: { open: boolean }) => setUIState((state) => ({ ...state, drawerKit: { ...state.drawerKit, ...data } }));

  return (
    <UIKitContext.Provider value={useMemo(() => ({
      ...uiState,
      handleUIChange
    }), [uiState])}>
      {children}
      <div id="drawerContainer" />
    </UIKitContext.Provider>
  )

};

export const useUIKit = () => {
  const currentContext = useContext(UIKitContext);
  if (!currentContext) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentContext;
};

export default UIKitProvider;
