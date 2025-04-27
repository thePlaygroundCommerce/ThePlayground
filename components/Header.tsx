"use client";

import HeaderActions from "./HeaderActions";
import { Nav } from "app/layout";
import HeaderNavigation from "./HeaderNavigation";
import Image from "./Image";
import { AppProps } from "index";
import clsx from "clsx";
import MobileSideNav from "./MobileSideNav";
import { ReactElement, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import staticImages from "util/images.ts";
import { Button, Transition } from "@headlessui/react";
import LogoComponent, { renderLogo } from "./LogoComponent";
import Hamburger from "./Hamburger";
import MobileNavigation from "./MobileNavigation";
import CartOverlay from "./CartOverlay";
import { useCart } from "context/cartContext";
import { OrderLineItem, CatalogImage, CalculateOrderRequest } from "square";
import { usePortal } from "context/UIKitContext";

type Props = AppProps & {
  navs: { headerNavs: Nav[]; footerNavs?: Nav[] };
  logo: ReactElement;
};

function Header({ navs, className, logo }: Props) {
  const { cart, ...rest } = useCart();
  const CartOverlayComp = (
    <CartOverlay
      cart={{ locationId: "", lineItems: [] }}
      options={[]}
      cartItemImages={{}}
      // updateCart={function ({
      //   lineItems,
      //   fieldsToClear,
      //   lineItemImageData,
      // }: {
      //   lineItems?: OrderLineItem[];
      //   fieldsToClear?: string[];
      //   lineItemImageData?: { [id: string]: CatalogImage };
      // }): void {
      //   throw new Error("Function not implemented.");
      // }}
      // createCart={function (
      //   catalogOrder: any,
      //   lineItemImageData?: CatalogImage,
      //   checkout?: boolean
      // ): void {
      //   throw new Error("Function not implemented.");
      // }}
      calculateCart={function (
        req: CalculateOrderRequest
      ): void {
        // throw new Error("Function not implemented.");
      } } updateCart={function ({ lineItems, fieldsToClear, lineItemImageData, }: { lineItems?: OrderLineItem[]; fieldsToClear?: string[]; lineItemImageData?: { [id: string]: CatalogImage; }; }): void {
        throw new Error("Function not implemented.");
      } } createCart={function (catalogOrder: any, lineItemImageData?: CatalogImage, checkout?: boolean): void {
        throw new Error("Function not implemented.");
      } } handleCartToggle={function (e: any, bool: boolean): void {
        throw new Error("Function not implemented.");
      } } getCheckoutUrl={function (): string {
        throw new Error("Function not implemented.");
      } }    // toggleCartOverlay={[]}
    // handleCartToggle={function (e: any, bool: boolean): void {
    //   throw new Error("Function not implemented.");
    // }}
    // getCheckoutUrl={function (): string {
    //   throw new Error("Function not implemented.");
    // }}
    />
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
        <div ref={navRef} className="k-nav-grid py-2">

          {/* Mobile */}
          <div
            id="w-node-d28673fe-a739-7b74-1763-af2ee311f1d5-e311f1d3"
            className="k-nav-left"
          >
            <div className="k-nav-main">
              <div className="k-nav-main-inner">
                <Link
                  href="/"
                  aria-current="page"
                  className="k-nav-logo w-inline-block w--current"
                >
                  <div>mass.</div>
                </Link>
                {/* <MobileSideNav logo={logo} navs={{
                  headerNavs: [],
                  footerNavs: undefined
                }} /> */}
                <Hamburger {...{ open: overlayState.active !== undefined, onClick: () => toggleOverlay(!overlayState.active ? 'nav' : undefined) }} />
                {overlayState.active && Portal}
              </div>
              <div className="k-nav-mobile-cart-wrap">
                <div
                  data-node-type="commerce-cart-wrapper"
                  data-open-product=""
                  data-wf-cart-type="modal"
                  data-wf-cart-query=""
                  data-wf-page-link-href-prefix=""
                  className="w-commerce-commercecartwrapper k-cart-mobile"
                >
                  <Button
                    // href="#"
                    onClick={() => toggleOverlay('cart')}
                    data-node-type="commerce-cart-open-link"
                    className="w-commerce-commercecartopenlink k-cart-toggle-mobile w-inline-block"
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
                  {overlayState.active && Portal}
                </div>
              </div>
            </div>
          </div>

          {/* Bigger Than Mobile */}
          <div
            id="w-node-d28673fe-a739-7b74-1763-af2ee311f212-e311f1d3"
            className="k-nav-right"
          >
            <div className="k-nav-inner">
              <Link href="/shop" className="k-nav-link">
                shop
              </Link>
              <Link href="/shop" className="k-nav-link">
                <strong>🔥</strong> sale
              </Link>
              {/* <Link href="our-stores.html" className="k-nav-link"><strong>🔥</strong> sale</Link> */}
              <div
                data-node-type="commerce-cart-wrapper"
                data-open-product=""
                data-wf-cart-type="modal"
                data-wf-cart-query=""
                data-wf-page-link-href-prefix=""
                className="w-commerce-commercecartwrapper k-nav-cart-widget"
              >
                <a
                  href="#"
                  data-node-type="commerce-cart-open-link"
                  className="w-commerce-commercecartopenlink k-cart-button w-inline-block"
                  role="button"
                  aria-haspopup="dialog"
                  aria-label="Open cart"
                >
                  <Image
                    fill={false}
                    src={staticImages.a}
                    loading="lazy"
                    alt="cart icon"
                    className="k-cart-icon"
                  />
                  <div className="inline-block">Cart </div>
                  <div className="w-commerce-commercecartopenlinkcount k-cart-quantity">
                    0
                  </div>
                </a>
                <div
                  data-node-type="commerce-cart-container-wrapper"
                  style={{ display: "none" }}
                  className="w-commerce-commercecartcontainerwrapper w-commerce-commercecartcontainerwrapper--cartType-modal"
                >
                  <div
                    data-node-type="commerce-cart-container"
                    role="dialog"
                    className="w-commerce-commercecartcontainer"
                  >
                    <div className="w-commerce-commercecartheader">
                      <h4 className="w-commerce-commercecartheading">
                        Your Cart
                      </h4>
                      <a
                        href="#"
                        data-node-type="commerce-cart-close-link"
                        className="w-commerce-commercecartcloselink w-inline-block"
                        role="button"
                        aria-label="Close cart"
                      >
                        <svg width="16px" height="16px" viewBox="0 0 16 16">
                          <g
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g fillRule="nonzero" fill="#333333">
                              <polygon points="6.23223305 8 0.616116524 13.6161165 2.38388348 15.3838835 8 9.76776695 13.6161165 15.3838835 15.3838835 13.6161165 9.76776695 8 15.3838835 2.38388348 13.6161165 0.616116524 8 6.23223305 2.38388348 0.616116524 0.616116524 2.38388348 6.23223305 8"></polygon>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                    <div className="w-commerce-commercecartformwrapper">
                      <form
                        data-node-type="commerce-cart-form"
                        style={{ display: "none" }}
                        className="w-commerce-commercecartform"
                      >
                        <script
                          type="text/x-wf-template"
                          id="wf-template-d28673fe-a739-7b74-1763-af2ee311f229"
                        ></script>
                        <div
                          className="w-commerce-commercecartlist"
                          data-wf-collection="database.commerceOrder.userItems"
                          data-wf-template-id="wf-template-d28673fe-a739-7b74-1763-af2ee311f229"
                        ></div>
                        <div className="w-commerce-commercecartfooter">
                          <div
                            aria-atomic="false"
                            className="w-commerce-commercecartlineitem"
                          >
                            <div>Subtotal</div>
                            <div className="w-commerce-commercecartordervalue"></div>
                          </div>
                          <div className="checkout-actions">
                            <div data-node-type="commerce-cart-quick-checkout-actions">
                              <a
                                role="button"
                                tabIndex={0}
                                aria-haspopup="dialog"
                                aria-label="Apple Pay"
                                data-node-type="commerce-cart-apple-pay-button"
                                style={{
                                  backgroundImage:
                                    "-webkit-named-image(apple-pay-logo-white);background-size:100% 50%;background-position:50% 50%;background-repeat:no-repeat",
                                }}
                                className="w-commerce-commercecartapplepaybutton"
                              >
                                <div></div>
                              </a>
                              <a
                                role="button"
                                tabIndex={0}
                                aria-haspopup="dialog"
                                data-node-type="commerce-cart-quick-checkout-button"
                                style={{ display: "none" }}
                                className="w-commerce-commercecartquickcheckoutbutton"
                              >
                                <svg
                                  className="w-commerce-commercequickcheckoutgoogleicon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                >
                                  <defs>
                                    <polygon
                                      id="google-mark-a"
                                      points="0 .329 3.494 .329 3.494 7.649 0 7.649"
                                    ></polygon>
                                    <polygon
                                      id="google-mark-c"
                                      points=".894 0 13.169 0 13.169 6.443 .894 6.443"
                                    ></polygon>
                                  </defs>
                                  <g fill="none" fillRule="evenodd">
                                    <path
                                      fill="#4285F4"
                                      d="M10.5967,12.0469 L10.5967,14.0649 L13.1167,14.0649 C14.6047,12.6759 15.4577,10.6209 15.4577,8.1779 C15.4577,7.6339 15.4137,7.0889 15.3257,6.5559 L7.8887,6.5559 L7.8887,9.6329 L12.1507,9.6329 C11.9767,10.6119 11.4147,11.4899 10.5967,12.0469"
                                    ></path>
                                    <path
                                      fill="#34A853"
                                      d="M7.8887,16 C10.0137,16 11.8107,15.289 13.1147,14.067 C13.1147,14.066 13.1157,14.065 13.1167,14.064 L10.5967,12.047 C10.5877,12.053 10.5807,12.061 10.5727,12.067 C9.8607,12.556 8.9507,12.833 7.8887,12.833 C5.8577,12.833 4.1387,11.457 3.4937,9.605 L0.8747,9.605 L0.8747,11.648 C2.2197,14.319 4.9287,16 7.8887,16"
                                    ></path>
                                    <g transform="translate(0 4)">
                                      <mask id="google-mark-b" fill="#fff">
                                        <use xlinkHref="#google-mark-a"></use>
                                      </mask>
                                      <path
                                        fill="#FBBC04"
                                        d="M3.4639,5.5337 C3.1369,4.5477 3.1359,3.4727 3.4609,2.4757 L3.4639,2.4777 C3.4679,2.4657 3.4749,2.4547 3.4789,2.4427 L3.4939,0.3287 L0.8939,0.3287 C0.8799,0.3577 0.8599,0.3827 0.8459,0.4117 C-0.2821,2.6667 -0.2821,5.3337 0.8459,7.5887 L0.8459,7.5997 C0.8549,7.6167 0.8659,7.6317 0.8749,7.6487 L3.4939,5.6057 C3.4849,5.5807 3.4729,5.5587 3.4639,5.5337"
                                        mask="url(#google-mark-b)"
                                      ></path>
                                    </g>
                                    <mask id="google-mark-d" fill="#fff">
                                      <use xlinkHref="#google-mark-c"></use>
                                    </mask>
                                    <path
                                      fill="#EA4335"
                                      d="M0.894,4.3291 L3.478,6.4431 C4.113,4.5611 5.843,3.1671 7.889,3.1671 C9.018,3.1451 10.102,3.5781 10.912,4.3671 L13.169,2.0781 C11.733,0.7231 9.85,-0.0219 7.889,0.0001 C4.941,0.0001 2.245,1.6791 0.894,4.3291"
                                      mask="url(#google-mark-d)"
                                    ></path>
                                  </g>
                                </svg>
                                <svg
                                  className="w-commerce-commercequickcheckoutmicrosofticon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <polygon
                                      fill="#F05022"
                                      points="7 7 1 7 1 1 7 1"
                                    ></polygon>
                                    <polygon
                                      fill="#7DB902"
                                      points="15 7 9 7 9 1 15 1"
                                    ></polygon>
                                    <polygon
                                      fill="#00A4EE"
                                      points="7 15 1 15 1 9 7 9"
                                    ></polygon>
                                    <polygon
                                      fill="#FFB700"
                                      points="15 15 9 15 9 9 15 9"
                                    ></polygon>
                                  </g>
                                </svg>
                                <div>Pay with browser.</div>
                              </a>
                            </div>
                            <Link
                              href="/checkout"
                              data-node-type="cart-checkout-button"
                              className="w-commerce-commercecartcheckoutbutton k-btn k-btn--solid"
                              data-loading-text="Hang Tight..."
                            >
                              Continue to Checkout
                            </Link>
                          </div>
                        </div>
                      </form>
                      <div className="w-commerce-commercecartemptystate">
                        <div>No items found.</div>
                      </div>
                      <div
                        style={{ display: "none" }}
                        data-node-type="commerce-cart-error"
                        className="w-commerce-commercecarterrorstate"
                      >
                        <div
                          className="w-cart-error-msg"
                          data-w-cart-quantity-error="Product is not available in this quantity."
                          data-w-cart-general-error="Something went wrong when adding this item to the cart."
                          data-w-cart-checkout-error="Checkout is disabled on this site."
                          data-w-cart-cart_order_min-error="The order minimum was not met. Add more items to your cart to continue."
                          data-w-cart-subscription_error-error="Before you purchase, please use your email invite to verify your address so we can send order updates."
                        >
                          Product is not available in this quantity.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/cart"
                className="k-nav-link--icon is-last w-inline-block"
              >
                <Image
                  fill={false}
                  src={staticImages.user}
                  loading="lazy"
                  alt=""
                  className="icon-alone"
                />
              </Link>
            </div>
          </div>


        </div>
        <div id="header-overlay" className="flex-1" />
      </div>
    </header>
  );

  // return (
  //   <header className={clsx("h-16 fixed flex drop-shadow-lg z-20 w-full", className, background)}>
  //     {/* <div className={clsx(latoThin.className, "text-sm text-white text-center p-2 ")}>
  //       <Blinking>
  //         {[
  //           <p key={1}>Free Shipping & Returns <span className="italic">For A Limited Time</span></p>
  //         ]}
  //       </Blinking>
  //     </div> */}
  //       <div className="flex h-full sm:gap-12 p-4 md:px-8 md:py-1 justify-between">
  //         <div className="flex flex-1 sm:flex-none items-center">
  //           <div className="sm:hidden flex items-center">
  //             <MobileSideNav logo={logo} navs={navs} />
  //           </div>
  //           <div className="hidden sm:block">
  //             <Link href="/">{logo}</Link>
  //           </div>
  //         </div>
  //         <div className="flex-2 flex justify-center sm:justify-normal items-center">
  //           <div className="sm:hidden w-full max-w-44 relative">
  //             <Link href="/">{logo}</Link>
  //           </div>
  //           <div className="hidden sm:block">
  //             <HeaderNavigation navs={navs.headerNavs} />
  //           </div>
  //         </div>
  //         <div className="flex-1 col-start-6 flex items-center">
  //           <div className="w-full h-full my-auto">
  //             <HeaderActions />
  //           </div>
  //         </div>
  //       </div>

  //   </header>
  // );
}

export default Header;
