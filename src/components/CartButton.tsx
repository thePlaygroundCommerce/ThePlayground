"use client";
import Link from "next/link";
import Button from "./Button";
import Image from "./Image";
import staticImages from "@/util/images";
import { useUIKit } from "@/context/UIKitContext";

const CartButton = ({
  itemsCount = 0,
  overlay
}) => {
  const { portals, mount, unmount } = useUIKit()
  const targetOverlay = "headerOverlay"

  const handleOnClick = () => {
    const mountOverlay = () => (
      mount("headerOverlay", overlay)
    )
    const unMountOverlay = () => (
      unmount(targetOverlay)
    )

    isOverlayActive ? unMountOverlay() : mountOverlay()
  }
  const isOverlayActive = portals.some(({ id }) => id === targetOverlay)

  return (
    <>
      <div className="block md:hidden">
        <Button
          // href="#"
          onClick={handleOnClick}
          data-node-type="commerce-cart-open-link"
          className="w-commerce-commercecartopenlink uppercase font-semibold k-cart-toggle-mobile w-inline-block"
          role="button"
          aria-haspopup="dialog"
          aria-label="Open cart"
        >
          <Image
            fill={false}
            src={staticImages.a}
            loading="lazy"
            alt="cart icon"
            className="k-cart-icon k-invert"
          />
          <div className="hidden sm:inline-block">Cart</div>
          <div className="w-commerce-commercecartopenlinkcount k-cart-quantity-mobile">
            {itemsCount}
          </div>
        </Button>
      </div>
      <div className="hidden md:block">
        <Link href={'/cart'}>
          <Button
            // href="#"
            data-node-type="commerce-cart-open-link"
            className="w-commerce-commercecartopenlink uppercase font-semibold k-cart-toggle-mobile w-inline-block"
            role="button"
            aria-haspopup="dialog"
            aria-label="Open cart"
          >
            <Image
              fill={false}
              src={staticImages.a}
              loading="lazy"
              alt="cart icon"
              className="k-cart-icon k-invert"
            />
            <div className="hidden sm:inline-block text-xs">Cart</div>
            <div className="w-commerce-commercecartopenlinkcount k-cart-quantity-mobile">
              {itemsCount}
            </div>
          </Button>
        </Link>
      </div>
    </>
  )
};

export default CartButton;
