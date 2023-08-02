"use client";

import { useRef, useState } from "react";
import { BsPlus } from "react-icons/bs";

const HeaderNavigation = () => {
  const [show, setShow] = useState(false);
  const [showdivIndex, setShowdivIndex] = useState(0);
  const [targetRef, setTargetRef] = useState(null);
  const ref = useRef();

  const showdiv = (index, target) => {
    setShow(true);
    setShowdivIndex(index);
    setTargetRef(target);
  };
  const renderOverlay = (props) => {
    console.log(props);
    if (showdivIndex == 0) return <MensdivOverlay {...props} />;
    else if (showdivIndex == 1) return <WomensdivOverlay {...props} />;
    else return <SaledivOverlay {...props} />;
  };

  return (
    <div className="flex justify-center ">
        <div className="flex items-center mx-3">
          <p className="m-0 me-1">MEN</p>
          <BsPlus />
        </div>
      <div
        onMouseOver={(e) => showdiv(1, e.target)}
        className="flex items-center mx-3"
      >
        <p className="m-0 me-1">WOMEN</p>
        <BsPlus />
      </div>
      <div
        onMouseOver={(e) => showdiv(2, e.target)}
        className="flex items-center mx-3"
      >
        <p className="m-0 me-1">SALE</p>
        <BsPlus />
      </div>
    </div>
  );
};

const MensdivOverlay = () => (
  <div className="flex justify-content-between">
    <div>
      <h3>Clothing</h3>
      <div>hey</div>
    </div>
    <div>
      <h3>Footwear</h3>
      <div>hey</div>
    </div>
    <div>
      <h3>Accessories</h3>
      <div>hey</div>
    </div>
  </div>
);
const WomensdivOverlay = () => (
  <div className="flex justify-content-between">
    <div>WOmens</div>
    <div>Footwear</div>
    <div>Accessories</div>
  </div>
);
const SaledivOverlay = () => (
  <div className="flex justify-content-between">
    <div>Sales</div>
    <div>Footwear</div>
    <div>Accessories</div>
  </div>
);

export default HeaderNavigation;
