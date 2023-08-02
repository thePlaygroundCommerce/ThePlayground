'use client'

import Link from "next/link";
import { CaretDownFill } from "react-bootstrap-icons";

function SideNav({ catalogCategories }) {
  const splitNameArr = catalogCategories.map(({ categoryData: { name } }) =>
    name.split(" ")
  );
  const makedivTree = (arr) =>
    arr.reduce((acc, cv) => {
      const cvLowercase = cv[0].toLowerCase();

      acc[cvLowercase] !== undefined
        ? acc[cvLowercase].push(makedivTree([cv.slice(1)]))
        : (acc[cvLowercase] = []);

      return acc;
    }, {});
  const renderdivItems = (items) => {
    return items.map(([itemName, itemChildren], i) => {
      const itemDisplayName = itemName[0].toUpperCase() + itemName.slice(1);
      const hasTree = itemChildren.length > 1;

      return (
        <div key={i} className="w-100 border border-0" >
          {hasTree ? (
            <div
              key={itemName + i}
              className=" w-100 border border-0"
            >
              <div>
                <div className="border-0">
                  <div className="border border-0 p-1">
                    {itemDisplayName}
                  </div>
                  <div className="border border-0 py-0">
                    <div>
                      {itemChildren.map((item) =>
                        renderdivItems(Object.entries(item))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              style={{ paddingBlock: 16, paddingInline: 20 }}
              variant=""
              className="w-100 text-start"
            >
              {/* <button style={{ paddingBlock: 16, paddingInline: 20}} variant="" className=" border border-0"> */}
              {itemDisplayName}
              {/* </button> */}
            </button>
          )}
        </div>
      );
    });
  };

  return renderdivItems(Object.entries(makedivTree(splitNameArr)));
}

export default SideNav;
