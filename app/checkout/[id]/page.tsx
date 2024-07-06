
import { getCheckoutUrl } from 'api/checkoutApi'
import { callGetCart, callUpdateCart } from 'api/cartApi'
import React from 'react'
import { redirect } from 'next/navigation'
import OrderList from 'components/OrderList'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Button } from 'rsuite'
import Link from 'next/link'
import { apiRouteHandlerAdapter } from 'apiRouteHandler'
import { cookies } from 'next/headers'
import { getCatalogItemsAndImages } from 'api/catalogApi'

type PageProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ params: { id } }: PageProps) => {
    let oldCartImages;
    let newCart;

    const cartId = cookies().get("cartId")?.value
    const oldCart = (await callGetCart(cartId ?? "")).result.order
    if (!oldCart) throw Error("Order missing!")

    const isOrderUnprocessed = id === cartId
    if (isOrderUnprocessed) {

        oldCart.lineItems = oldCart?.lineItems?.map(
            ({ catalogObjectId, quantity }) => ({ catalogObjectId, quantity })
        );
        const { paymentLink, errors } = await getCheckoutUrl(oldCart);

        if (paymentLink) redirect(paymentLink.url);
        else {
            // throw Error("Errors checking out") LOG ERROR TODO
            redirect("/shop")
        }
    } else {
        newCart = await callGetCart(id).then(({ result: { order } }) => order)
        if (!newCart) redirect("/shop")

        oldCartImages = await getCatalogItemsAndImages(oldCart?.lineItems?.map((item) => item.catalogObjectId ?? "") ?? [])
    }

    return isOrderUnprocessed ? (<div>Loading</div>) : (
        <div className="h-full grid grid-cols-1">
            <div className="md:col-span-7 min-h-48 pt-4">
                <OrderList lineItems={oldCart?.lineItems} lineItemImages={oldCartImages} />
            </div>
            <div className="md:col-span-5 px-4 h-full md:border-l">
                <div className="flex flex-col gap-6 mt-5 md:w-3/4">
                    <div className="m-auto text-center">
                        <div className="flex mb-5 justify-center">
                            <BsFillCheckCircleFill size={100} color="green" />
                        </div>
                        <p>
                            We thank you for your purchase. You will receive an email to
                            "email" with your order details shortly.
                        </p>
                    </div>
                    <div className="text-center m-auto">
                        <div className="mb-5">
                            <p className='mb-4'>
                                Log in to your account and keep track of or change your order.
                            </p>
                            <div className='flex flex-col gap-4'>
                                <Link href="/authenticate">
                                    <Button onClick={undefined} className={undefined}>Login</Button>
                                </Link>
                                <Link href="/apparel">
                                    <Button>Continue Shopping</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="text-left flex mb-4">
                            <div className="border px-3 py-1 w-full">
                                <textarea
                                    id="experience"
                                    name="experience"
                                    className="w-full bg-white"
                                    placeholder="How was your shopping experience?"
                                ></textarea>
                            </div>
                            <Button>Send</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page