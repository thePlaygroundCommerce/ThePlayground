"use client";

import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useRef,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { AppProps, UIKitContextType } from "index";
import { createPortal } from "react-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Button } from "@headlessui/react";
import clsx from "clsx";

export const UIKitContext = createContext<UIKitContextType | null>(null);

const DRAWER_ID = "drawerContainer";
const MODAL_ID = "modalContainer";

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
      ref: useRef(null),
    },
    headerOverlay: {
      id: "headerOverlay",
      placement: null,
      open: false,
      ref: useRef(null),
    },
  });

  return (
    <UIKitContext.Provider
      value={useMemo(
        () => ({
          state: uiState,
          handleUIChange: setUIState,
        }),
        [uiState]
      )}
    >
      {children}
      <div id={DRAWER_ID} className="" />
      <div id={MODAL_ID} />
    </UIKitContext.Provider>
  );
};

export const useUIKit = () => {
  const currentContext = useContext(UIKitContext);
  if (!currentContext) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentContext;
};

export const usePortal = (
  children: AppProps["children"],
  {
    rootId = "modalContainer",
    showClose = true,
    cleanup = () => { }
  }: {
    rootId: "drawerContainer" | "modalContainer" | "headerOverlay",
    showClose?: boolean,
    cleanup?: () => void
  }
) => {
  const container = useRef<HTMLElement | null>(null);
  const docBody = useRef<HTMLElement | null>(null);
  const [show, setShow] = useState(false);

  const toggleScroll = () => {
    const list = docBody.current?.classList
    if (list?.contains("h-screen") && list.contains("overflow-hidden")) list.remove("h-screen", "overflow-hidden")
    else list?.add("h-screen", "overflow-hidden")
    console.log(list)
  };
  const handleClosePortal = () => {
    setShow(false)
    cleanup()
  }

  useEffect(() => {
    container.current = document.getElementById(rootId ?? "");
    docBody.current = document.body;
    // toggleScroll()
    setShow(true);
  }, [show]);

  const classes = clsx(
    rootId === "modalContainer" && "fixed",
    rootId === "headerOverlay" && "absolute",
    rootId === "drawerContainer" && "",
    "bg-white h-full z-[10000] top-0 left-0 w-full"
  )

  return show && container?.current
    ? createPortal(
      <div className={classes}>
        {children}
        {showClose && <Button onClick={handleClosePortal} className="absolute top-0 right-0 p-6"><FaRegCircleXmark size={24} /></Button>}
      </div>,
      container.current
    )
    : null;
};

export default UIKitProvider;
