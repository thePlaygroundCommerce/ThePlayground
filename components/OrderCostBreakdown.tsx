import clsx from 'clsx';
import _ from 'lodash';
import React from 'react'
import { Order, Money as SquareMoney } from 'square';
import { AppProps } from 'types';
import Money from './Money';

type Props = {
    order: Order
    sumObject: { [index: string]: keyof Order }
} & AppProps

const OrderBreakdown = ({ order, sumObject = { subtotal: "netAmountDueMoney" } }: Props) => {
    const breakdown = {
        discounts: order.totalDiscountMoney?.amount ?? 0,
        shipping: order.serviceCharges?.find(service => service.name === 'shipping')?.amountMoney?.amount ?? 0,
        taxes: order.totalTaxMoney?.amount ?? 0,
    };

    const sortedBreakdown = Object.entries(breakdown).sort(([_, val1], [__, val2]) => Number(val1) - Number(val2))


    return (
        <>
            {sortedBreakdown.map(([name, val], i) => {
                if (name === "discounts" && val === 0) return null
                return (
                    <div key={name} className={clsx(i == 0 && "pt-5", "flex justify-between")}>
                        <p>{_.capitalize(name)}</p>
                        <Money number={val} />
                    </div>
                )
            })}
            {Object.entries(sumObject).map(([key, val]) => (
                <div key={key} className="pb-5 flex justify-between">
                    <p>{_.capitalize(key)}</p>
                    <Money number={(order[val] as SquareMoney)?.amount ?? 0} />
                </div>
            ))}
        </>
    )

}

export default OrderBreakdown