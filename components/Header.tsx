'use client'

import HeaderActions from "./HeaderActions";
import { Nav } from "app/layout";
import HeaderNavigation from "./HeaderNavigation";
import { AppProps } from "index";
import clsx from "clsx";
import MobileSideNav from "./MobileSideNav";
import { ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { handleClientScriptLoad } from "next/script";

type Props = AppProps & { navs: { headerNavs: Nav[], footerNavs?: Nav[] }, logo: ReactElement };

function Header({ navs, className, logo }: Props) {
  const path = usePathname()
  const [scroll, setScroll] = useState(0)

  const handleScroll = (e: any) => setScroll(e.target.documentElement.scrollTop)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  const background = path !== "/" ? "bg-white" : clsx(
    scroll >= 200 ? "bg-white" : "bg-transparent",
    "transition duration-700"
  )

  return (
    <header className={clsx("max-h-[90px] fixed flex flex-col drop-shadow-lg z-20 w-full text-mintcream-200", className, background)}>
      {/* <div className={clsx(latoThin.className, "text-sm text-white text-center p-2 ")}>
        <Blinking>
          {[
            <p key={1}>Free Shipping & Returns <span className="italic">For A Limited Time</span></p>
          ]}
        </Blinking>
      </div> */}
      <div className="grid grid-cols-6 p-4 md:px-8 md:py-1 h-full">
        <div className="w-full h-full flex col-span-1">
          <div className="sm:hidden flex items-center">
            <MobileSideNav logo={logo} navs={navs} />
          </div>
          <div className="hidden sm:block">
            <Link href="/">{logo}</Link>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center sm:justify-start col-span-4">
          <div className="sm:hidden w-full max-w-44 relative h-full">
            <Link href="/">{logo}</Link>
          </div>
          <div className="hidden sm:block">
            <HeaderNavigation navs={navs.headerNavs} />
          </div>
        </div>
        <div className="w-full h-full col-span-1 flex">
          <div className="w-full my-auto">
            <HeaderActions />
          </div>
        </div>
      </div>

    </header>
  );
}

export default Header;
