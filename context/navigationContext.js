"use client";

import AccountSettings from "components/AccountSettings";
import OrderList from "components/OrderList";
import PasswordSettings from "components/PasswordSettings";
import { usePathname } from "next/navigation";
import { createContext, useState, useMemo, Fragment } from "react";

export const NavigationContext = createContext("light");

const NavigationProvider = ({ children, apparelCategories }) => {
  const pathName = usePathname();
  const accountNavigation = useState({
    activeIndex: 0,
    sideNavs: ["Account", "Orders", "Wishlists"],
    components: [AccountSettings, Fragment, Fragment],
    As: "button",
    onNavChange: e => onNavIndexChange(e.target.id),
  });
  const apparelNavigation = useState({
    activeIndex: 0,
    sideNavs: apparelCategories,
  });

  const onNavIndexChange = id => accountNavigation[1]((state) => ({ ...state, activeIndex : id }))

  const activeNavs = {
    account: accountNavigation,
    apparel: apparelNavigation,
  };
  const activeNav = activeNavs[pathName.slice(1)] || activeNavs.account

  return (
    <NavigationContext.Provider
      value={useMemo(() => [...activeNav, apparelCategories], [pathName, accountNavigation, apparelNavigation])}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
