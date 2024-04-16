"use client";
import AccountSettings from "components/AccountSettings";
import { Context, Fragment, createContext, useContext, useMemo, useState } from "react";
import { CatalogObject } from "square";
import {
  AccountNavigation,
  AppProps,
  ApparelNavigation,
  NavigationContextType,
} from "types";
import { makeCategoryTree, splitCategoryNamesWithId } from "../util";

export const NavigationContext = createContext<NavigationContextType | null>(
  null
);

type Props = AppProps & {
  apparelCategories: CatalogObject[];
};

const NavigationProvider = ({ children, apparelCategories }: Props) => {
  // const accountNavigation = useState<AccountNavigation>({
  //   activeIndex: 0,
  //   formattedCategories: [
  //     {
  //       account: {
  //         id: "0",
  //         categoryList: [],
  //       },
  //       orders: {
  //         id: "1",
  //         categoryList: [],
  //       },
  //       wishlists: {
  //         id: "2",
  //         categoryList: [],
  //       },
  //     },
  //   ],
  //   components: [AccountSettings, Fragment, Fragment],
  //   As: "button",
  //   // onNavChange: e => onNavIndexChange(e.target.id),
  // });
  // const apparelNavigation = useState<ApparelNavigation>({
  //   activeIndex: 0,
  //   unformattedCategories: apparelCategories,
  //   formattedCategories: makeCategoryTree(
  //     splitCategoryNamesWithId(apparelCategories)
  //   ),
  //   currentCategoryId: "",
  // });

  // const handleNavigationChange: React.ChangeEventHandler<HTMLInputElement> = (
  //   e
  // ) => {
  //   apparelNavigation[1]({
  //     ...apparelNavigation[0],
  //     currentCategoryId: e.target.id,
  //   });
  // };

  return (
    <NavigationContext.Provider
    value={null}
      // value={useMemo<NavigationContextType>(
      //   () => ({
      //     // accountNavigation,
      //     // apparelNavigation,
      //     apparelCategories,
      //     handleNavigationChange,
      //   }),
      //   // [accountNavigation, apparelNavigation, apparelCategories]
      //   []
      // )}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const currentNavigation = useContext(NavigationContext);
  if (!currentNavigation) {
    throw new Error("Hooks have to be used within Providers");
  }

  return currentNavigation;
};

export default NavigationProvider;
