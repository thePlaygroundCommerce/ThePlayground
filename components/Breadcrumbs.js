import Link from "next/link";
import React from "react";
import { BsFillCaretRightFill } from 'react-icons/bs'

const Breadcrumbs = () => {
  const breadCrumbs = ["HOME", "SHIRTS", "SWaNK Coolie Shirt"];
  return (
    <div>
      {breadCrumbs.map((crumb) => (
        <div key={crumb} href="#" linkAs={Link}>{crumb}</div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
