import Link from "next/link";
import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { BsFillCaretRightFill } from 'react-icons/bs'

const BreadcrumbNav = () => {
  const breadCrumbs = ["HOME", "SHIRTS", "SWaNK Coolie Shirt"];
  return (
    <Breadcrumb>
      {breadCrumbs.map((crumb) => (
        <Breadcrumb.Item key={crumb} href="#" linkAs={Link}>{crumb}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
