
import { getCheckoutUrl } from 'api/checkoutApi'
import { callGetCart } from 'api/cartApi'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type PageProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ params: { id }, searchParams: { returned } }: PageProps) => {

    // remove awaits
    const  order  = await callGetCart(id.slice(0, id.length - 1));
    if (!order) return redirect("/");
    // if (!order) return <>We had trouble finding your items. Redirecting back home.</>;  


    // console.log(order.id)
    const a = getCheckoutUrl(order).then(url => console.log(url))
    return returned ? (<div>Loading</div>) : (
        <div>Checkout</div>
    )
}

export default Page