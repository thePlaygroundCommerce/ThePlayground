'use client'

import React, { useEffect, useState } from 'react'
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { Input } from '@headlessui/react';

type Props = {
    formId: string
}

const WebPaymentForm = ({ formId }: Props) => {
    const [token, setToken] = useState<string>()

    useEffect(() => {
        const ele = (document.getElementById(formId) as HTMLFormElement)
        if (token && formId) ele.requestSubmit();
    }, [formId, token])

    return (
        <div>

            <PaymentForm
                formProps={{

                }}
                applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? ""}
                locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? ""}
                // createPaymentRequest={() => ({
                //     currencyCode: "USD",
                //     countryCode: "US",

                // })}
                cardTokenizeResponseReceived={async (token) => {
                    if (token.status === "OK") {
                        setToken(token.token)
                    }
                    // setSubmitted(true);
                    // await handleOnSubmit(token).finally(() => setSubmitted(false))
                }}
            >
                <CreditCard
                    buttonProps={{
                        style: {
                            backgroundColor: "black"
                        },
                    }}
                >
                    Pay
                    {/* {submitted ? (
                    <div className="mx-auto w-fit">
                        <Spinner className="size-6" />
                    </div>
                ) : (
                    "Pay"
                )} */}
                </CreditCard>
            </PaymentForm>
            <Input name='token' readOnly hidden value={token ?? ''} />
        </div>
    )
}

export default WebPaymentForm