"use client";

import { ApplePay, CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import type * as Square from "@square/web-sdk";
import { useState } from "react";
import Spinner from "./Spinner";
import { BsExclamationCircle, BsExclamationOctagon } from "react-icons/bs";
import { Input as _Input, RadioGroup as _RadioGroup, Radio as _Radio, Fieldset, Legend, Field, Label, Description } from "@headlessui/react";
import FieldsetReveal from "./FieldsetReveal";
import clsx from "clsx";
import _, { get } from "lodash"

import { useForm } from "react-hook-form"
import Checkbox from "./Checkbox";

import { geocoding, config, GeocodingFeature } from '@maptiler/client'
import { Popover } from '@ark-ui/react/popover'
import Button from "./Button";
import { FaXmark } from "react-icons/fa6";
import { useDebouncedCallback } from "use-debounce";

import { CarriersEnum, DistanceUnitEnum, ParcelCreateRequest, Shippo, WeightUnitEnum } from "shippo"

config.apiKey = 'Db67ozDs4qap2XTOWMuy';

const SquarePaymentForm = ({
    onSubmit = (token: Square.TokenResult, values?: any) => new Promise(() => { }),
}) => {

    const { register, handleSubmit, getValues, watch, trigger, formState: { errors }, unregister, reset } = useForm<{
        email: string,
        shippingAddress: {
            addressLine1: string
            addressLine2: string
            firstName: string
            lastName: string
            city: string
            state: string
            postalCode: string
            country: string
        }
    }>()

    const [submitted, setSubmitted] = useState(false);
    const [selected, setSelected] = useState()
    const [includeBilling, setIncludeBilling] = useState(false)
    const [isPaymentRejected, setIsPaymentRejected] = useState(false);

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const [features, setFeatures] = useState<GeocodingFeature[]>([]);

    const handleOnSubmit = async (res: Square.TokenResult) => {
        console.log(getValues())
        trigger().then(isValid => {
            if (isValid) onSubmit(res, getValues())
        })
    }
    const createShipment = async (state: {
        email: string;
        shippingAddress: {
            addressLine1: string;
            addressLine2: string;
            firstName: string;
            lastName: string;
            city: string;
            state: string;
            postalCode: string;
            country: string;
        };
    }) => {
        // need shippo api keys in .env
        // const addressTo = await shippo.addresses.create({
        //     name: `${state.shippingAddress.firstName} ${state.shippingAddress.lastName}`,
        //     // company: "The Playground",
        //     street1: state.shippingAddress.addressLine1,
        //     city: state.shippingAddress.city,
        //     state: state.shippingAddress.state,
        //     zip: state.shippingAddress.postalCode,
        //     country: "US", // iso2 country code
        //     // phone: "+1 555 341 9393",
        //     email: state.email,
        // })
        // const addressFrom = await shippo.addresses.create({
        //     name: "The Playground",
        //     company: "The Playground",
        //     street1: "330 E Roosevelt St",
        //     street2: "Suite 3066",
        //     city: "Phoenix",
        //     state: "Arizona",
        //     zip: "85004",
        //     country: "US", // iso2 country code
        //     // phone: "+1 555 341 9393",
        //     email: "theplaygroudmedia@outlook.com",
        // })

        // const parcel: ParcelCreateRequest = {
        //     length: "5",
        //     width: "5",
        //     height: "5",
        //     distanceUnit: DistanceUnitEnum.In,
        //     weight: "2",
        //     massUnit: WeightUnitEnum.Lb
        // };

        // const shipment = await shippo.shipments.create({
        //     addressFrom: addressFrom,
        //     addressTo: addressTo,
        //     carrierAccounts: ["1cfc09e9beee46229bf7e3ac6801aa0a"],
        //     parcels: [parcel],
        //     async: false
        // });

    }

    const selectFeature = (feature: GeocodingFeature) => {
        const state = getValues()
        state.shippingAddress = {
            ...state.shippingAddress,
            addressLine1: `${feature.address} ${feature.text}`,
            city: feature.context?.find((c) => c["osm:place_type"] === "city")?.text_en || '',
            state: feature.context?.find((c) => c["osm:place_type"] === "state")?.text_en || '',
            postalCode: feature.context?.find((c) => c.id.includes("postal"))?.text || '',
            country: feature.context?.find((c) => c["osm:place_type"] === "country")?.text_en || '',
        }
        reset(state)
        setIsPopoverOpen(false)

        // createShipment(state)
    }

    const fetchGeocodingData = useDebouncedCallback((value: string) => {
        console.log("fetching")

        setIsPopoverOpen(true);
        geocoding.forward(value, { proximity: "ip" })
            .then((result) => setFeatures(result.features))
            .catch((err) => console.error(err));

    }, 1000)

    const fieldset = [
        {
            name: "contact",
            required: true,
            type: "TEXT",
            element: (
                <div>
                    <Input type="email" {...register("email", { required: true, pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Email not valid!" } })} />
                    {errors.email && (
                        <div className="flex gap-2 items-center text-red-500 mt-2 mx-2">
                            <BsExclamationOctagon />
                            <p className="">{errors.email.message?.toString()}</p>
                        </div>
                    )}
                    <div className="flex gap-4 mt-4 items-center">
                        <Checkbox defaultChecked={true}>Email me with news and offers</Checkbox>
                    </div>
                </div>
            )
        },
        {
            name: "shippingAddress",
            display: "Delivery",
            required: true,
            type: "TEXT",
            fields: [
                { display: "First Name", name: "firstName" },
                { display: "Last Name", name: "lastName" },
                { name: "addressLine1", display: "Street address" },
                { name: "addressLine2", display: "Apt / Unit / Suite" },
                { display: "City", name: "city" },
                { display: "State", name: "state" },
                { display: "Zip", name: "postalCode" },
                { display: "Country", name: "country" },
            ]
        },
        {
            name: "Billing",
            required: false,
            type: "TEXT",
            element: (
                <div className="p-4 flex flex-col gap-4">
                    <FieldsetReveal checkboxText="Billing address same as shipping" defaultChecked={!includeBilling} fieldset={(
                        [
                            { name: "addressLine1", display: "Street address" },
                            { name: "addressLine2", display: "Apt / Unit / Suite" },
                            { display: "First Name", name: "firstName" },
                            { display: "Last Name", name: "lastName" },
                            { display: "City", name: "city" },
                            { display: "State", name: "state" },
                            { display: "Zip", name: "postalCode" },
                            { display: "Country", name: "country" },
                        ].map(field => <Input key={field.name} {...field} {...(includeBilling ? register(`billingAddress.${field.name}` as "shippingAddress" | "email" | "shippingAddress.firstName" | "shippingAddress.lastName" | "shippingAddress.addressLine1" | "shippingAddress.addressLine2" | "shippingAddress.city" | "shippingAddress.state" | "shippingAddress.postalCode" | "shippingAddress.country") : {})} />)
                    )} />
                </div>
            )
        },
        {
            name: "fulfillment",
            display: "Shipping",
            required: true,
            type: "RADIO",

            element: (
                <RadioGroup {...{
                    defaultValue: "Flat Rate",
                    fields: [
                        { name: "Flat Rate", description: "Delivery in a day to a week of purchase.", readOnly: true },
                        // { name: "Expedited Shipping", description: "Expedited shipping to get the shipment in a day or two." },
                        // { name: "Overnight Shipping", description: "Overnight shipping to get the shipment on the next business day." },
                    ]
                }} />
            ),

        },
        {
            name: "payment",
            required: true,
            element: (
                <div>
                    {isPaymentRejected && (
                        <div className="text-red-500 flex gap-4 items-center mb-2">
                            <BsExclamationCircle />
                            <p>Payment not valid, please try again.</p>
                        </div>
                    )}
                    <PaymentForm
                        applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID ?? ""}
                        locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID ?? ""}
                        // createPaymentRequest={() => ({
                        //     currencyCode: "USD",
                        //     countryCode: "US",

                        // })}
                        cardTokenizeResponseReceived={async (token) => {
                            setSubmitted(true);
                            await handleOnSubmit(token).finally(() => setSubmitted(false))
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
                        <ApplePay />
                    </PaymentForm>
                </div>
            ),
        },
    ]

    return fieldset.map(({ name: fieldsetName, display, required, fields, element, type }) => (
        <Fieldset key={fieldsetName} className="border bg-white rounded-3xl border-zinc-200">
            <div className="p-4 border-b border-zinc-200">
                <Legend className="flex justify-between">
                    <h1 className="text-lg p-0">{display || _.capitalize(fieldsetName)}</h1>
                    <p>{required && "* Required"}</p>
                </Legend>
            </div>
            <div className="p-4 flex flex-col gap-4">
                {element
                    ? element
                    : fields.map(({ name, ...rest }) => {
                        const Component =
                            ComponentMap[type as keyof typeof ComponentMap];
                        const registerhandlers = register(`${fieldsetName}.${name}` as
                            | "shippingAddress.firstName"
                            | "shippingAddress.lastName"
                            | "shippingAddress.addressLine1"
                            | "shippingAddress.addressLine2"
                            | "shippingAddress.city"
                            | "shippingAddress.state"
                            | "shippingAddress.postalCode"
                            | "shippingAddress.country"
                            | "email", {
                            onChange: () => getValues().shippingAddress?.addressLine1.length > 0 && fetchGeocodingData(getValues().shippingAddress?.addressLine1)
                        })

                        return (
                            <div key={name} className="relative">
                                {/* @ts-ignore */}
                                <Component {...rest}  {...registerhandlers} />
                                {name === "addressLine1" && (
                                    <Popover.Root autoFocus={false} open={isPopoverOpen} onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}>
                                        <Popover.Positioner className="w-full top-full left-0 pt-2 z-30" style={{ minWidth: 0, zIndex: undefined, top: undefined, left: undefined, transform: undefined }}>
                                            <Popover.Content className="bg-white border border-zinc-300 shadow-amber-400  rounded-lg overflow-hidden">
                                                <div className="p-2">
                                                    <Popover.Title className="my-2 text-sm flex justify-between items-center">Suggestions <Popover.CloseTrigger asChild className="text-zinc-500"><FaXmark /></Popover.CloseTrigger></Popover.Title>
                                                    <Popover.Description className="text-md">
                                                        <ul className="p-0 m-0 ">
                                                            {features.map((feature, i) => (
                                                                <li key={i} className=" py-2 ">
                                                                    <Button className="w-full text-left" onClick={() => selectFeature(feature)}>
                                                                        <p className="truncate">{feature.place_name_en}</p>
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </Popover.Description>
                                                </div>
                                                <div className="bg-gray-200 p-2 text-sm">
                                                    Powered by Maptiler
                                                </div>
                                            </Popover.Content>
                                        </Popover.Positioner>
                                    </Popover.Root>
                                )}

                                {/* @ts-ignore */}
                                {errors[name] && <Description>{errors[name].message?.toString()}</Description>}
                            </div>
                        )
                    })}
            </div>
        </Fieldset>
    ));
};

const RadioGroup = ({ defaultValue, fields = [] }: { defaultValue?: string, fields: { readOnly: boolean, name: string, description: string }[] }) => {
    return (
        <_RadioGroup defaultValue={defaultValue}>
            {
                fields.map((field => (
                    <Field key={field.name} className="flex gap-4 justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <div className="">
                                <_Radio value={field.name} className="group flex size-5 items-center justify-center rounded-full border bg-white data-checked:bg-blue-400 data-disabled:bg-gray-100">
                                    <span className="invisible size-2 rounded-full bg-white group-data-checked:visible" />
                                </_Radio>
                            </div>
                            <div className="text-sm">
                                <h5 className="font-bold">{field.name ?? "AAAS"}</h5>
                                <p>{field.description ?? "Hello"}</p>
                            </div>
                        </div>
                        <div>
                            <p>FREE</p>
                        </div>
                    </Field>
                )))
            }
        </_RadioGroup >
    )
}
const Input = ({ name, display, onChange, ...rest }: any) => {
    const classes = clsx(
        'mt-3 block w-full rounded-full border bg-zinc-100 border-zinc-300 bg-white/5 px-6 py-3 text-sm/6 ',
        'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
    )

    return (
        <Field className="rounded">
            <Label className="text-sm/6 font-medium relative left-6 top-6 bg-white px-1.5 py-1 rounded-lg border border-zinc-300">{display || _.capitalize(name)}</Label>
            <input name={name} className={classes} onChange={onChange} {...rest} />
        </Field>
    )
}

const ComponentMap = {
    RADIO: RadioGroup,
    TEXT: Input
}

export default SquarePaymentForm;
