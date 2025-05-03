"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useState, useMemo, useContext, useRef, useEffect } from "react";
import { AppProps, UIKitContextType } from "index";
import { createPortal } from "react-dom";

export const UIKitContext = createContext<UIKitContextType | null>(null);


const UIKitProvider = ({ children }: any) => {
  const path = usePathname();

  // useEffect(() => {
  //   handleUIChange({ open: false })
  // }, [path])

  const [uiState, setUIState] = useState({
    drawerKit: {
      id: "",
      placement: null,
      open: false,
      ref: useRef(null)
    },
    headerOverlay: {
      id: "headerOverlay",
      placement: null,
      open: false,
      ref: useRef(null)
    },
  })

  return (
    <UIKitContext.Provider value={useMemo(() => ({
      state: uiState,
      handleUIChange: setUIState
    }), [uiState])}>
      {children}
      <div id="drawerContainer" className="" />
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

export const usePortal = (children: AppProps['children'], rootId: string) => {

  // const container = document.getElementById(rootId ?? "");
  const [show, setShow] = useState(false)

  useEffect(() => { setShow(true) }, [])

  return null
  // return show && container ? createPortal(children, container) : null
}

export default UIKitProvider;
