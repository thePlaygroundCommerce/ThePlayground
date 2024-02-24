"use client";

import { NavigationContext } from "context/navigationContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import Button from "./Button";

export default function SideNav() {
  // const {
  //   apparelNavigation: [{ formattedCategories = [], As = "div" }],
  //   handleNavigationChange,
  // } = useContext(NavigationContext);
  const router = useRouter();

  // const renderCategoryItems = (items, firstRun) => {
  //   return items?.map(([itemName, { id, categoryList }], i) => {
  //     const itemDisplayName = itemName[0].toUpperCase() + itemName.slice(1);

  //     const firstRunStyles = {
  //       paddingBlock: 12,
  //       paddingInline: 20,
  //     };

  //     const handleNavigation = (e) => {
  //       handleNavigationChange(e);
  //       router.push("/apparel/" + e.target.name);
  //     };

  //     return (
  //       <nav key={id}>
  //         <div className="text-end border-0">
  //           <div className="">
  //             <button
  //               onClick={handleNavigation}
  //               id={id}
  //               name={itemName}
  //               style={(!firstRun && firstRunStyles) || null}
  //             >
  //               {itemDisplayName}
  //             </button>
  //           </div>
  //           {categoryList?.map((item) => (
  //             <div key={item} className="border-0 m-18 py-0">
  //               {renderCategoryItems(Object.entries(item), false)}
  //             </div>
  //           ))}
  //         </div>
  //       </nav>
  //     );
  //   });
  // };

  return (
    <nav className="text-end">
      <ul>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href="/shop" >Shop</Link></li>
        <li><Link href={"/explore"}>Explore</Link></li>
      </ul>
    </nav>
  )
  // return renderCategoryItems(Object.entries(formattedCategories), true);
}
