"use client";

import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import type * as Square from "@square/web-sdk";
import { useState } from "react";
import Spinner from "./Spinner";
import { BsExclamationCircle } from "react-icons/bs";

const SquarePaymentForm = ({
    onSubmit = (token: Square.TokenResult) => new Promise(() => { }),
}) => {
    const [submitted, setSubmitted] = useState(false);
    const [isPaymentRejected, setIsPaymentRejected] = useState(false);

    return (
        <div>
            {isPaymentRejected && <div className="text-red-500 flex gap-4 items-center mb-2">
                <BsExclamationCircle />
                <p>Payment not valid, please try again.</p>
            </div>}
            <PaymentForm
                applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? ""}
                locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? ""}
                cardTokenizeResponseReceived={async (token) => {
                    setSubmitted(true);
                    await onSubmit(token).then((data) => {
                        const result = data ? true : false
                        setIsPaymentRejected(result)
                    }).finally(() => setSubmitted(false));
                }}
            >
                <CreditCard>
                    {submitted ? (
                        <div className="mx-auto w-fit">
                            <Spinner className="size-6" />
                        </div>
                    ) : (
                        "Pay"
                    )}
                </CreditCard>
            </PaymentForm>
        </div>
    );
};

export default SquarePaymentForm;
