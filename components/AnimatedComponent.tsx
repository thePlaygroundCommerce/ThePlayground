"use client";

import React, { useEffect, useRef, useState } from "react";
import { AppProps } from "index";
import clsx from "clsx";
import { Transition } from "@headlessui/react";

type Props = { animation: "up" | "down" | "left" | "right" } & AppProps;

const AnimatedComponent = ({
    children,
    animation,
    className,
    ...rest
}: Props) => {

    const [started, setStarted] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const classes = {
        a: clsx(
            "transition duration-600 ease-in translate-y-full",
            // "data-[closed]:translate-y-0",
            "data-[enter]:translate-y-0"
        ),
        // a: ""
    };

    return (
        <div className={show ? "visible" : "invisible"}>
            {children}
            <Transition show={show}>
                <div
                    className={clsx(className, classes.a)}
                    {...rest}
                />
            </Transition>
        </div>
    );
};

export default AnimatedComponent;
