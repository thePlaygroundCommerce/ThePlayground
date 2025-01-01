"use client";

import { NavigationContext } from "context/navigationContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";

const HeaderNavigationPopover = () => {
  const {
    apparelNavigation: [{ formattedCategories }],
    handleNavigationChange,
  } = useContext(NavigationContext);
  const router = useRouter();

  const handleNavigation = (e) => {
    handleNavigationChange(e);
    router.push("/apparel/" + e.target.name);
  };

  return (
    <div className="flex justify-between">
      {Object.entries(formattedCategories).map(
        ([key, { categoryList, id }]) => (
          <div key={key}>
            <p className="underline underline-offset-4">{key}</p>
            {categoryList.map((item) => {
              const itemName = Object.keys(item)[0];
              return (
                <div key={itemName}>
                  <Button
                    id={id}
                    name={itemName}
                    onClick={handleNavigation}
                  >
                    {itemName}
                  </Button>
                </div>
              );
            })}
          </div>
        )
      )}
    </div>
  );
};

export default HeaderNavigationPopover;
