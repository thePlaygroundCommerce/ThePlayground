"use client";

import { AppProps } from "index";
import clsx from "clsx";
import { useUIKit } from "@/context/UIKitContext";


type Props = AppProps

function HeaderWrapper({ className, children }: Props) {
  const { portals } = useUIKit()
  const targetOverlay = "headerOverlay"
  const isOverlayActive = portals.some(({ id }) => id === targetOverlay)

  return (
    <div
      className={clsx(
        isOverlayActive && "h-dvh overflow-hidden",
        "bg-white flex flex-col w-full z-5000 sticky top-0 col-start-1 row-start-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export default HeaderWrapper;
