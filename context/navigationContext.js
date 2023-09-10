"use client";

import AccountSettings from "components/AccountSettings";
import { createContext, useState, useMemo, Fragment } from "react";
import { splitCategoryNamesWithId } from "../util";

export const NavigationContext = createContext(null);

const NavigationProvider = ({ children, apparelCategories }) => {
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
    currentCategoryId: null,
  });

  const handleNavigationChange = (e) => {
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

const makeCategoryTree = (arr) =>
  arr?.reduce((acc, { id, category }) => {
    const categoryLowercase = category[0].toLowerCase();
    if (acc[categoryLowercase] !== undefined) {
      acc[categoryLowercase].categoryList.push(
        makeCategoryTree([{ id, category: category.slice(1) }])
      );
    } else {
      acc[categoryLowercase] = { id: id, categoryList: [] };
    }
    return acc;
  }, {});
