"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { NavigationContext, useNavigation } from "../context/navigationContext";
import { IoIosArrowBack } from "react-icons/io";
import { AppProps } from "index";

type Props = AppProps & {
  categoryId: string;
};

const Breadcrumbs = ({ categoryId }: Props) => {
  const {
    apparelNavigation: [{ unformattedCategories }],
  } = useNavigation();
  const productCategory = unformattedCategories.find(
    ({ id }) => categoryId == id
  );

  if (!productCategory)
    return (
      <Link href="/apparel">
        <IoIosArrowBack />
      </Link>
    );

  const breadCrumbs =
    (productCategory && productCategory?.categoryData?.name?.split(" ")) || [];
    
  return (
    <div>
      {breadCrumbs.map((name, i) => (
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
