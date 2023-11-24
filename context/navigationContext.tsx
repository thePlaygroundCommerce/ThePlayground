"use client";

import AccountSettings from "components/AccountSettings";
import { createContext, useState, useMemo, Fragment } from "react";
import { splitCategoryNamesWithId, makeCategoryTree } from "../util";
import { AppProps } from "types";
import { CatalogObject } from "square";

export const NavigationContext = createContext({});

type Props = AppProps & {
  apparelCategories: CatalogObject[]
};

const NavigationProvider = ({ children, apparelCategories }: Props) => {
  const accountNavigation = useState({
    activeIndex: 0,
    formattedCategories: [
      {
        account: {
          id: 0,
          categoryList: []
        },
        orders: {
          id: 1,
          categoryList: []
        },
        wishlists: {
          id: 2,
          categoryList: []
        },
      }
    ],
    components: [AccountSettings, Fragment, Fragment],
    As: "button",
    // onNavChange: e => onNavIndexChange(e.target.id),
  });
  const apparelNavigation = useState({
    activeIndex: 0,
    unformattedCategories: apparelCategories, 
    formattedCategories: makeCategoryTree(
      splitCategoryNamesWithId(apparelCategories)
    ),
    currentCategoryId: "",
  });

  const handleNavigationChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    apparelNavigation[1]({
      ...apparelNavigation[0],
      currentCategoryId: e.target.id,
    });
  };

  return (
    <NavigationContext.Provider
      value={useMemo(
        () => ({
          accountNavigation,
          apparelNavigation,
          apparelCategories,
          handleNavigationChange,
        }),
        [accountNavigation, apparelNavigation, apparelCategories]
      )}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;


