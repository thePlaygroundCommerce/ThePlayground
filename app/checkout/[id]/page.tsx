import { getCheckoutOrderUrl } from 'api/checkoutApi'
import { callGetCart, callUpdateCart } from 'api/cartApi'
import React from 'react'
import { redirect } from 'next/navigation'
import OrderList from 'components/OrderList'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import Link from 'next/link'
import { cookies } from 'next/headers'
import OrderBreakdown from 'components/OrderCostBreakdown'
import { CatalogObject, Order } from 'square'
import _ from 'lodash'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { latoHeavy } from 'app/fonts'
import clsx from 'clsx'
import Feedback from 'components/Feedback'
import { Simplify } from 'prismicio-types'
import { PageProps } from 'index'


const Page = async ({ params, searchParams }: PageProps) => {

    let processedCartImages;
    let processedCart;
    let options;
    let oldCart;

    const { id } = await params
    const { quantity = "1", quick = "false" }  = await searchParams
    const cartId = (await cookies()).get("cartId")?.value

    if (quick) {
        oldCart = {
            lineItems: [
                {
                    catalogObjectId: id,
                    quantity: Array.isArray(quantity) ? quantity[0] : quantity
                }
            ]
        }
    } else {
        const { order, imageMap } = await callGetCart(cartId ?? "")
        oldCart = order
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
        const { order, imageMap, options: itemOpts } = await callGetCart(id)
         await callUpdateCart({ orderId: cartId, order: {
            version: oldCart.version,
            locationId: oldCart.locationId,
            lineItems: []
         } })
        options = itemOpts
        processedCart = order
        processedCartImages = imageMap
    }

    if (!processedCart) redirect("/shop")

    return isOrderUnprocessed ? (<div>Loading</div>) : (
        <div className="min-h-screen h-full block md:pt-8 p-4 md:container mx-auto">
            <MobileCheckoutConfirmation options={options} processedCart={processedCart} processedCartImages={processedCartImages} />
        </div>
    )
}

export default Page

// const NonMobileCheckoutConfirmation = () => (
//     <>
//         <div className="m-auto text-center">
//             <div className="flex mb-5 justify-center">
//                 <span className='mr-2'><BsFillCheckCircleFill size={25} color="green" /></span>
//                 <p>
//                     Thank you for your purchase.
//                 </p>
//             </div>
//             <p>
//                 Your order # has been submitted.
//             </p>
//             <p>
//                 An email has been sent to .... with your order receipt.
//             </p>
//             <div className="mb-5">
//                 {/* <p className='mb-4'>
//                                 Log in to your account and keep track of or change your order.
//                             </p> */}
//                 <div className='flex flex-col gap-4'>
//                     {/* <Link href="/account">
//                                     <Button onClick={undefined} className={undefined}>Login</Button>
//                                 </Link> */}
//                     <Link href="/apparel">
//                         <Button>Continue Shopping</Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//         <div className="md:col-span-5 h-full">
//             <div className="md:col-span-7 min-h-48 pt-4">
//                 <OrderList className="min-h-24 md:w-3/4 mx-auto border" allowOrderModify={false} lineItems={processedCart?.lineItems} lineItemImages={processedCartImages} />
//             </div>
//             <div className="flex flex-col gap-6 mt-5 md:w-3/4">
//                 <div className="text-center m-auto">
//                     <div className="text-left flex mb-4">
//                         <div className="border px-3 py-1 w-full">
//                             <textarea
//                                 id="experience"
//                                 name="experience"
//                                 className="w-full bg-white"
//                                 placeholder="How was your shopping experience?"
//                             ></textarea>
//                         </div>
//                         <Button>Send</Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>
// )

const MobileCheckoutConfirmation = ({ processedCart, processedCartImages, options }: {
    processedCart: Order;
    options: Simplify<Simplify<CatalogObject[]>>
    processedCartImages: any
}) => {
    const recipient = processedCart.fulfillments?.find(fulfillment => fulfillment.type === "SHIPMENT")?.shipmentDetails?.recipient ?? {};
    const recipientAddress = recipient.address ?? {}
    const customerDetail = {
        name: recipientAddress?.firstName && recipientAddress?.lastName
            && `${_.capitalize(recipientAddress?.firstName)} ${_.capitalize(recipientAddress?.lastName)}`,
        email: recipient.emailAddress,
        phone: recipient.phoneNumber,
        address: recipientAddress?.addressLine1 && recipientAddress?.addressLine2 && `${recipientAddress?.addressLine1} ${recipientAddress?.addressLine2}`,
        zipAndCountry: recipientAddress.postalCode && recipientAddress.country && `${recipientAddress.postalCode} ${recipientAddress.country}`
    };

    const payment = (processedCart.tenders ?? [])[0]?.cardDetails?.card
    const paymentAddress = payment?.billingAddress
    const paymentDetails = {
        card: payment?.cardBrand && payment.last4 && `${payment.cardBrand} ending in ${payment.last4}`,
        name: payment?.cardholderName,
        address: paymentAddress?.addressLine1 && paymentAddress?.addressLine2 && `${paymentAddress?.addressLine1} ${paymentAddress?.addressLine2}`,
        zipAndCountry: paymentAddress?.postalCode && paymentAddress?.country && `${paymentAddress.postalCode} ${paymentAddress.country}`
    }

    const reviewOrderLink = <><SignedIn><Link className='text-cyan-700' href="/account/sign-in">check the order on your account page.</Link></SignedIn><SignedOut><Link className='text-cyan-700' href="/account/sign-in">create or log into your account.</Link></SignedOut></>;

    return (
        <>
            <div className='text-center max-w-2xl m-auto'>
                <div className='md:hidden'>
                    <BsFillCheckCircleFill size="50%" className='my-12 m-auto' color="green" />
                </div>
                <div className='hidden md:block'>
                    <BsFillCheckCircleFill size="5rem" className='my-12 m-auto' color="green" />
                </div>
                <p className='mb-6'>Your order reference id <span className={latoHeavy.className}>{processedCart.id}</span> has been submitted.</p>
                <p>An email has been sent to <span className={latoHeavy.className}>{customerDetail.email}</span> with your order receipt. To review any other details of your order, please {reviewOrderLink}</p>
            </div>
            <div className='my-12 md:flex gap-8'>
                <div className='basis-1/4'>
                    <p className={clsx("text-lg", latoHeavy.className)}>Shipping Details</p>
                    {(Object.values(customerDetail)).map((detail => <p key={detail}>{detail}</p>))}
                </div>
                <div>
                    <p className={clsx("text-lg", latoHeavy.className)}>Payment Details</p>
                    {(Object.values(paymentDetails)).map((detail => <p key={detail}>{detail}</p>))}
                </div>
            </div>
            <div className="h-full md:w-3/4 m-auto">
                <div className="min-h-48 pt-4">
                    <OrderList className="min-h-24 mx-auto" options={options} allowOrderModify={false} lineItems={processedCart?.lineItems} lineItemImages={processedCartImages} />
                </div>
                <div className='mt-6 md:w-1/3 ml-auto'>
                    <OrderBreakdown order={processedCart} sumObject={{ total: "totalMoney" }} />
                </div>
                <div className="mt-5 md:w-3/4 mx-auto">
                    <Feedback />
                </div>
            </div>

        </>
    )
}

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
