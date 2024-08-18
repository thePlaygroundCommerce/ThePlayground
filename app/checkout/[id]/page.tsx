
import { getCheckoutOrderUrl } from 'api/checkoutApi'
import { callGetCart } from 'api/cartApi'
import React from 'react'
import { redirect } from 'next/navigation'
import OrderList from 'components/OrderList'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { Button } from 'rsuite'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCatalogItemsAndImages } from 'api/catalogApi'
import { IconContext } from 'react-icons'

type PageProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const Page = async ({ params: { id }, searchParams: { quantity = "1", quick = "false" } }: PageProps) => {
    let processedCartImages;
    let processedCart;
    let oldCart;

    const cartId = cookies().get("cartId")?.value

    if (Boolean(quick)) {
        oldCart = {
            lineItems: [
                {
                    catalogObjectId: id,
                    quantity: Array.isArray(quantity) ? quantity[0] : quantity
                }
            ]
        }
    } else {
        oldCart = (await callGetCart(cartId ?? "")).result.order
    }
    if (!oldCart) throw Error("Order missing!")

    const isOrderUnprocessed = id === cartId
    if (isOrderUnprocessed) {

        oldCart.lineItems = oldCart?.lineItems?.map(
            ({ catalogObjectId, quantity }) => ({ catalogObjectId, quantity })
        );
        const { paymentLink } = await getCheckoutOrderUrl(id);

        if (paymentLink) redirect(paymentLink.url);
        else {
            // throw Error("Errors checking out") LOG ERROR TODO
            redirect("/shop")
        }
    } else {
        processedCart = await callGetCart(id).then(({ result: { order } }) => order)
        if (!processedCart) redirect("/shop")

        processedCartImages = await getCatalogItemsAndImages(processedCart?.lineItems?.map((item) => item.catalogObjectId ?? "") ?? [])
    }
    console.log(processedCart, processedCartImages)
    
    return isOrderUnprocessed ? (<div>Loading</div>) : (
        <div className="min-h-screen h-full block md:pt-8 p-4">
            <MobileCheckoutConfirmation processedCart={processedCart} processedCartImages={processedCart} />
        </div>
    )
}

export default Page

const NonMobileCheckoutConfirmation = () => (
    <>
        <div className="m-auto text-center">
            <div className="flex mb-5 justify-center">
                <span className='mr-2'><BsFillCheckCircleFill size={25} color="green" /></span>
                <p>
                    Thank you for your purchase.
                </p>
            </div>
            <p>
                Your order # has been submitted.
            </p>
            <p>
                An email has been sent to .... with your order receipt.
            </p>
            <div className="mb-5">
                {/* <p className='mb-4'>
                                Log in to your account and keep track of or change your order.
                            </p> */}
                <div className='flex flex-col gap-4'>
                    {/* <Link href="/account">
                                    <Button onClick={undefined} className={undefined}>Login</Button>
                                </Link> */}
                    <Link href="/apparel">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        </div>
        <div className="md:col-span-5 h-full">
            <div className="md:col-span-7 min-h-48 pt-4">
                <OrderList className="min-h-24 md:w-3/4 mx-auto border" allowOrderModify={false} lineItems={processedCart?.lineItems} lineItemImages={processedCartImages} />
            </div>
            <div className="flex flex-col gap-6 mt-5 md:w-3/4">
                <div className="text-center m-auto">
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
    </>
)

const MobileCheckoutConfirmation = ({ processedCart, processedCartImages }: any) => (
    <>
        <div className='text-center'>
            <BsFillCheckCircleFill size="50%" className='my-12 m-auto' color="green" />
            <p className='mb-6'>Your order reference id {processedCart.id} has been submitted.</p>
            <p>An email has been sent to .... with your order receipt. To review any details of your order, please <Link className='' href="/account/sign-in">create or log into your account.</Link></p>
        </div>
        <div className='my-12'>
            <p>Shipping Details</p>
            {Object.values(processedCart.fulfillments[0].shipmentDetails.recipient).map((detail => <p key={detail}>{detail}</p>))}
        </div>
        {/* <div>
            <p>Payment Details</p>
        </div> */}
        <div className="md:col-span-5 h-full">
            <div className="md:col-span-7 min-h-48 pt-4">
                <OrderList className="min-h-24 md:w-3/4 mx-auto border" allowOrderModify={false} lineItems={processedCart?.lineItems} lineItemImages={processedCartImages} />
            </div>
            <div className="flex flex-col gap-6 mt-5 md:w-3/4">
                <div className="text-center m-auto">
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

    </>
)
// <div className="m-auto text-center">
//     <div className="flex mb-5 justify-center">
//         <p>
//             Thank you for your purchase.
//         </p>
//     </div>
//     <p>
//         Your order # has been submitted.
//     </p>
//     <p>
//         An email has been sent to .... with your order receipt.
//     </p>
//     <div className="mb-5">
//         {/* <p className='mb-4'>
//                         Log in to your account and keep track of or change your order.
//                     </p> */}
//         <div className='flex flex-col gap-4'>
//             {/* <Link href="/account">
//                             <Button onClick={undefined} className={undefined}>Login</Button>
//                         </Link> */}
//             <Link href="/apparel">
//                 <Button>Continue Shopping</Button>
//             </Link>
//         </div>
//     </div>
// </div>
