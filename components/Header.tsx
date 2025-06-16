"use client";

import { Nav } from "app/layout";
import Image from "./Image";
import { AppProps } from "index";
import clsx from "clsx";
import { ReactElement, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import staticImages from "util/images.ts";
import { Button } from "@headlessui/react";
import LogoComponent from "./LogoComponent";
import Hamburger from "./Hamburger";
import MobileNavigation from "./MobileNavigation";
import CartOverlay from "./CartOverlay";
import { useCart } from "context/cartContext";
import { usePortal } from "context/UIKitContext";
import { OrderLineItem, CatalogImage, CalculateOrderRequest } from "square";

type Props = AppProps & {
  navs: { headerNavs: Nav[]; footerNavs?: Nav[] };
  logo: ReactElement;
};

function Header({ navs, className, logo }: Props) {
  const { cart, options, calculation, mutators } = useCart();
  const CartOverlayComp = (
    <CartOverlay
      cart={cart}
      options={options}
      cartItemImages={{}} mutators={mutators} calculation={calculation} handleCartToggle={function (e: any, bool: boolean): void {
        throw new Error("Function not implemented.");
      }} getCheckoutUrl={function (): string {
        throw new Error("Function not implemented.");
      }} />
  )
  const NavOverlayComp = (
    <MobileNavigation
      logo={<LogoComponent />}
      navs={{
        headerNavs: [],
      }}
    />
  )

  const [overlayState, setOverlayState] = useState<{
    active?: 'cart' | 'nav'
  }>({})

  const toggleOverlay = (overlayId?: 'cart' | 'nav') => setOverlayState(() => ({ active: overlayId }))

  const Portal = usePortal(overlayState.active === 'cart' ? CartOverlayComp : NavOverlayComp, 'header-overlay')
  const path = usePathname();
  const [scroll, setScroll] = useState(0);
  const navRef = useRef<HTMLDivElement | null>(null);

  //z-[99] bg-[color:var(--white)] shadow-[0_-4px_30px_-15px_var(--border)] items-center fixed w-full left-0 inset-y-0

  // const classes = {
  //   a: clsx(
  //     open ? "flex" : "hidden",
  //     "bg-white shadow-[0_-4px_30px_-15px_var(--border)] items-center w-full fixed px-[3vw] top-0 h-screen"
  //   ),
  // };

  const handleScroll = (e: any) =>
    setScroll(e.target.documentElement.scrollTop);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const background =
    path !== "/"
      ? "bg-white"
      : clsx(
        scroll >= 200 ? "bg-white" : "bg-transparent",
        "transition duration-700"
      );
  const headerHeight = navRef.current?.offsetHeight;
  const handleCartClick = () => toggleOverlay(overlayState.active !== "cart" ? 'cart' : undefined)
  const handleNavClick = () => toggleOverlay(!overlayState.active ? 'nav' : undefined)

  return (
    <header
      className={clsx(
        overlayState.active && "h-screen overflow-hidden",
        "bg-white flex flex-col w-full z-[5000] sticky top-0 col-start-1 row-start-1",
        className
      )}
    >
      <div
        data-collapse="medium"
        data-animation="default"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className="k-navbar w-nav overflow-hidden flex-1"
      >
        <div ref={navRef} className="py-3 px-8">
          <div className="flex">
            <div className="flex-3 items-center justify-between flex">
              <Link
                href="/"
                aria-current="page"
                className="k-nav-logo w-inline-block w--current"
              >
                <div>play.</div>
              </Link>
              {/* <MobileSideNav logo={logo} navs={{
                  headerNavs: [],
                  footerNavs: undefined
                }} /> */}
              <Hamburger {...{ open: overlayState.active !== undefined, onClick: handleNavClick }} />
              {overlayState.active && Portal}
            </div>
            <div className="flex-5 flex justify-end items-center">
              <div className="flex justify-end sm:justify-between items-center w-3/4">
                <Link href="/shop" className="hidden sm:block k-nav-link">
                  shop
                </Link>
                <Link href="/shop" className="hidden sm:block k-nav-link">
                  <strong>🔥</strong> sale
                </Link>

                <div
                  data-node-type="commerce-cart-wrapper"
                  data-open-product=""
                  data-wf-cart-type="modal"
                  data-wf-cart-query=""
                  data-wf-page-link-href-prefix=""
                  className="w-commerce-commercecartwrapper  k-cart-mobile"
                >
                  <div className="block md:hidden">
                    <Button
                      // href="#"
                      onClick={handleCartClick}
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
                        {cart.lineItems?.length ?? 0}
                      </div>
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <Link href={'/cart'}>
                      <Button
                        // href="#"
                        // onClick={handleCartClick}
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
                          {cart.lineItems?.length ?? 0}
                        </div>
                      </Button>
                    </Link>
                  </div>
                  {overlayState.active && Portal}
                </div>
                <div className="hidden md:flex items-center">
                  {/* <Link
                    href="/cart"
                    className="is-last w-inline-block"
                  >
                    <Image
                      fill={false}
                      src={staticImages.user}
                      loading="lazy"
                      alt=""
                      className="icon-alone"
                    />
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="header-overlay" className="flex-1" />
      </div>
    </header>
  );
}

export default Header;
