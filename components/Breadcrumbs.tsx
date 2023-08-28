"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { NavigationContext } from "../context/navigationContext";
import { IoIosArrowBack } from "react-icons/io";

type Props = {
  categoryId?: string;
  breadCrumbs: Breadcrumb[];
};

type Breadcrumb = {
  name: string;
  link: string;
};

const Breadcrumbs = ({ categoryId }: Props) => {
  const {
    apparelNavigation: [{ sideNavs }],
  } = useContext(NavigationContext);
  const productCategory = sideNavs.find(({ id }) => categoryId == id);

  if (!productCategory)
    return (
      <Link href="/apparel">
        <IoIosArrowBack />
      </Link>
    );

  const breadCrumbs = productCategory.categoryData.name.split(" ");

  return (
    <div>
      {breadCrumbs.map((name: string, i: number) => (
        <>
          <Link key={name} href={"/apparel"}>
            {name.toUpperCase()}
          </Link>{" "}
          {i < breadCrumbs.length - 1 && " > "}
        </>
      ))}
    </div>
  );
};

export default Breadcrumbs;
