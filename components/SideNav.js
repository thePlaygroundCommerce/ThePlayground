"use client";

import { NavigationContext } from "context/navigationContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function SideNav() {
  const {
    apparelNavigation: [{ formattedCategories = [], As = "div" }],
    handleNavigationChange,
  } = useContext(NavigationContext);
  const router = useRouter();

  const renderCategoryItems = (items, firstRun) => {
    return items?.map(([itemName, { id, categoryList }], i) => {
      const itemDisplayName = itemName[0].toUpperCase() + itemName.slice(1);

      const firstRunStyles = {
        paddingBlock: 12,
        paddingInline: 20,
      };

      const handleNavigation = (e) => {
        handleNavigationChange(e);
        router.push("/apparel/" + e.target.name);
      };

      return (
        <div key={id} className=" border-0">
          <button
            onClick={handleNavigation}
            id={id}
            name={itemName}
            style={(!firstRun && firstRunStyles) || null}
            className="text-start p-1 "
          >
            {itemDisplayName}
          </button>
          {categoryList?.map((item) => (
            <div className="border-0 m-18 py-0">
              {renderCategoryItems(Object.entries(item), false)}
            </div>
          ))}
        </div>
      );
    });
  };

  return renderCategoryItems(Object.entries(formattedCategories), true);
}
