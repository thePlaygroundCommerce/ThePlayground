"use client"
import React from 'react'
import { SelectPicker } from 'rsuite'
import Counter from './Counter'
import Money from './Money'
import { AppProps } from 'index'
import Button from "./Button";

type Props = AppProps & {
    amount: any;
    itemData: any;
    quantity: any;
    setQuantity: any;
    data: any;
    handleSelectChange: any;
    selectedVariation: any;
    handleBuyNow: any;
    handleAddToCart: any;
    isProductInCart: any;
};

const ProductActions = (props: Props) => {
    return (
        <>
            <div className="grid grid-cols-2 mb-7 p-3">
                <div className="basis-full">
                    <p className="mb-1 h4">SWaNK</p>
                    <p className="mb-1 h4 fw-bold">{props.itemData?.name}</p>
                    <Money number={props.amount} />
                </div>
                <div className="basis-full grow flex flex-col items-center">
                    <div className="">
                        <Counter
                            count={+props.quantity}
                            onCountChange={props.setQuantity}
                            childrenElement={<></>}
                        />
                    </div>
                    <SelectPicker
                        data={props.data}
                        onChange={props.handleSelectChange}
                        searchable={false}
                        cleanable={false}
                        placeholder={props.itemData?.variations![
                            props.selectedVariation
                        ].itemVariationData?.name?.slice(0, 1)}
                        defaultValue={props.selectedVariation}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-1 pb-7 border-b justify-around">
                <Button onClick={props.handleBuyNow}>Buy Now</Button>
                <Button onClick={props.handleAddToCart}>
                    {!(+(props.isProductInCart()?.quantity ?? 0) > 0)
                        ? "Add To Cart"
                        : "Update Cart"}
                </Button>
            </div>
        </>
    )
}

export default ProductActions