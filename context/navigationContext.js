"use client";

import AccountSettings from "components/AccountSettings";
import { usePathname } from "next/navigation";
import { createContext, useState, useMemo, Fragment } from "react";

export const NavigationContext = createContext("light");

const NavigationProvider = ({ children, apparelCategories }) => {
  const accountNavigation = useState({
    activeIndex: 0,
    sideNavs: ["Account", "Orders", "Wishlists"],
    components: [AccountSettings, Fragment, Fragment],
    As: "button",
    // onNavChange: e => onNavIndexChange(e.target.id),
  });
  const apparelNavigation = useState({
    activeIndex: 0,
    sideNavs: apparelCategories,
  });

  return (
    <NavigationContext.Provider
      value={useMemo(
        () => ({ accountNavigation, apparelNavigation, apparelCategories }),
        [accountNavigation, apparelNavigation, apparelCategories]
      )}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;
