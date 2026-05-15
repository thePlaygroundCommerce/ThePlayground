"use client";

import {
  createContext,
  useState,
  useMemo,
  useContext,
  useRef,
  useEffect,
  ReactNode,
  ReactPortal,
} from "react";
import { AppProps } from "index";
import { createPortal } from "react-dom";
import { FaRegCircleXmark } from "react-icons/fa6";
import { Button } from "@headlessui/react";
import clsx from "clsx";

export type UIKitContextType = {
  portals: { id: string, node: ReactNode, container?: Element }[]
  mount: (id: string, node: ReactNode) => void
  unmount: (id: string) => void
};

export const UIKitContext = createContext<UIKitContextType | null>(null);

const HEADER_ID = "headerOverlay";
const DRAWER_ID = "drawerContainer";
const MODAL_ID = "modalContainer";

const UIKitProvider = ({ children }: any) => {
  const [portals, setPortals] = useState([]);

  const mount = (id: string, node: ReactNode) => {
    const container = document.getElementById(id ?? "");
    setPortals((prev) => [...prev, { id, node, container }]);
    return id;
  };

  const unmount = (id: string) => {
    setPortals((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <UIKitContext.Provider
      value={{ portals, mount, unmount }}
    >
      {children}
      {portals.map(({ node, container }) =>
        createPortal(node, container)
      )}
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
