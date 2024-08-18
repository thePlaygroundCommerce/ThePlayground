import React, { useMemo } from "react";
import OrderList from "./OrderList";
import Button from "./Button";
import { AppProps } from "types";
import { useCheckout } from "context/checkoutContext";
import { useCart } from "context/cartContext";
import Money from "./Money";

import _ from "lodash";
import clsx from "clsx";

type Props = AppProps & {
  handleCartToggle: (e: any, bool: boolean) => void;
  getCheckoutUrl: () => string;
};

const CartOverlay = ({ handleCartToggle }: Props) => {
  const { cart, calculateCart } = useCart();
  const { checkout } = useCheckout();


  useMemo(() => {
    calculateCart({ order: cart })
  }, [])

  const handleCheckoutClick = () => {
    checkout()
  }

  const subtotal = cart.netAmountDueMoney?.amount ?? 0;

  const breakdown = {
    discounts: cart.totalDiscountMoney?.amount ?? 0,
    shipping: cart.serviceCharges?.find(service => service.name === 'shipping')?.amountMoney?.amount ?? 0,
    taxes: cart.totalTaxMoney?.amount ?? 0,
  };

  const sortedBreakdown = Object.entries(breakdown).sort(([_, val1], [__, val2]) => Number(val1) - Number(val2))

  return (
    <div>
      <div className="py-4 border-b">
        <OrderList allowOrderModify />
      </div>

      <div className="px-3">
        {
          sortedBreakdown.map(([name, val], i) => {
            if (name === "discount" && val === 0) return null
            return (
              <>
                <div key={name} className={clsx(i == 0 && "pt-5", "flex justify-between")}>
                  <p>{_.capitalize(name)}</p>
                  <Money number={val} />
                </div>
              </>
            )
          })
        }
        <div className="pb-5 flex justify-between">
          <p>Subtotal</p>
          <Money number={subtotal} />
        </div>
        <Button className="w-full" disabled={cart.lineItems?.length === 0} onClick={handleCheckoutClick}>
          Checkout Now
        </Button>
      </div>
    </div>
  );
};

export default CartOverlay;
