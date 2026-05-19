'use client'

import { useCart } from "@/context/cartContext";
import Link from "next/link";
import React from "react";
import Money from "./Money";

const OrderSummary = () => {
  const { cart, calculation: { subtotal, taxes } } = useCart()
  return (
    <div className="k-cart-details">
      <div className="k-cart-info-wrap">
        <div className="k-2col">
          <div className="k-cart-deck-row">
            <div className="k-text-gray-1">Total Products:</div>
            <div className="text-uppercase text--big flex gap-1"><Money number={subtotal} /> USD</div>
          </div>
          <div className="k-cart-deck-row">
            <div className="k-text-gray-1">Taxes:</div>
            <div className="text-uppercase text--big flex gap-1"><Money number={taxes} /> USD</div>
          </div>
          <div className="k-cart-deck-row">
            <div className="k-text-gray-1">Estimated shipping costs:</div>
            <div className="text-uppercase text--big">Free</div>
          </div>
        </div>
      </div>
      <div className="k-cart-menu">
        <Link href="/shop" className="k-btn w-button">
          continue shopping
        </Link>
        <Link href="/checkout" className="k-btn k-btn--solid w-button">
          checkout
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
