"use client";

import { NavigationContext } from "context/navigationContext";
import { useContext } from "react";

export default function SideNav() {
  const {
    apparelNavigation: [{ onNavChange, formattedCategories = [], As = "div" }],
    handleNavigationChange,
  } = useContext(NavigationContext);

  const renderCategoryItems = (items, firstRun) => {
    return items?.map(([itemName, { id, categoryList }], i) => {
      const itemDisplayName = itemName[0].toUpperCase() + itemName.slice(1);
  
      return (
        <div key={id} className="w-100 border-0">
          {firstRun ? (
            <As
              onClick={handleNavigationChange}
              id={id}
              className={`border-0 p-1 ${firstRun && "py-3"}`}
            >
              {itemDisplayName}
            </As>
          ) : (
            <button
              onClick={handleNavigationChange}
              id={id}
              style={{ paddingBlock: 12, paddingInline: 20 }}
              variant=""
              className="w-100 text-start p-1"
            >
              {itemDisplayName}
            </button>
          )}
          <div className="border-0 py-0">
            {categoryList?.map((item) =>
              renderCategoryItems(Object.entries(item), false)
            )}
          </div>
        </div>
      );
    });
  };
  
  return renderCategoryItems(
    Object.entries(formattedCategories),
    true
  );
}
