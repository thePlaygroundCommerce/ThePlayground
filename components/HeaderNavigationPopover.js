"use client";

import { NavigationContext } from "context/navigationContext";
import Link from "next/link";
import { useContext } from "react";
import { splitCategoryNames } from "../util";

const HeaderNavigationPopover = () => {
  const {
    apparelNavigation: [{ onNavChange, sideNavs = [], As = "div" }],
  } = useContext(NavigationContext);
  const categoryMap = {};

  splitCategoryNames(sideNavs).forEach((arr) => {
    if (arr[1] !== undefined) categoryMap[arr[0]].push(arr[1]);
    else categoryMap[arr[0]] = [];
  });

  return (
    <div className="flex justify-between">
      {Object.entries(categoryMap).map(([key, arr]) => (
        <div key={key}>
          <p className="underline underline-offset-4">{key}</p>
          {arr.map((item) => (
            <Link key={item} href="/apparel">
              <p>{item}</p>
            </Link>
          ))}
        </div>
      ))}
      <div></div>
    </div>
  );
};

export default HeaderNavigationPopover;
