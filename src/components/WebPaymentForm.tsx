'use client'

import React, { Suspense, useEffect, useState } from 'react'
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
        <Suspense fallback={<p>Loading...</p>}>
            <PaymentForm
                applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? ""}
                locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? ""}
                cardTokenizeResponseReceived={async (token) => {
                    if (token.status === "OK") {
                        setToken(token.token)
                    }
                }}
            >
                <CreditCard
                    buttonProps={{
                        isLoading: true,
                        style: {
                            backgroundColor: "black"
                        },
                    }}
                >
                    Pay
                </CreditCard>
            </PaymentForm>
            <Input name='token' readOnly hidden value={token ?? ''} />
        </Suspense>
    )
}

export default WebPaymentForm