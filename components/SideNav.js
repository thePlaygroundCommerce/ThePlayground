"use client";

import { NavigationContext } from "context/navigationContext";
import { useContext } from "react";

function SideNav() {
  const [{ activeIndex, onNavChange, sideNavs = [], As = "div" }] =
    useContext(NavigationContext);

  const makeCategoryTree = (arr) =>
    arr?.reduce((acc, cv) => {
      const cvLowercase = Array.isArray(cv)
        ? cv[0].toLowerCase()
        : cv.toLowerCase();

      acc[cvLowercase] !== undefined
        ? acc[cvLowercase].push(makeCategoryTree([cv.slice(1)]))
        : (acc[cvLowercase] = []);

      return acc;
    }, {});

  const renderCategoryItems = (items, firstRun) => {
    return items?.map(([itemName, itemChildren], i) => {
      const itemDisplayName = itemName[0].toUpperCase() + itemName.slice(1);

      return (
        <div key={i} className="w-100 border-0">
          {firstRun ? (
            <As
              onClick={onNavChange}
              id={i}
              className={`border-0 p-1 ${firstRun && "py-3"}`}
            >
              {itemDisplayName}
            </As>
          ) : (
            <button
              style={{ paddingBlock: 12, paddingInline: 20 }}
              variant=""
              className="w-100 text-start p-1"
            >
              {itemDisplayName}
            </button>
          )}
          <div className="border-0 py-0">
            {itemChildren?.map((item) =>
              renderCategoryItems(Object.entries(item), false)
            )}
          </div>
        </div>
      );
    });
  };

  return renderCategoryItems(Object.entries(makeCategoryTree(sideNavs)), true);
}

export default SideNav;
