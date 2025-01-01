'use client'

import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { AppProps } from 'index'

type Props = unknown & AppProps

const Blinking = ({ children }: Props) => {
    const [index, setIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        if(React.Children.count(children)<= 1) return 
        const timer = setInterval(() => {
            setOpacity(opacity === 0 ? 1 : 0)
            setIndex((prevIndex) => opacity === 0 ? (prevIndex + 1) % React.Children.count(children) : prevIndex)
        }, opacity ? 8000: 2000)


        return () => clearInterval(timer)
    }, [opacity])

    const className = clsx(
        "transition-opacity duration-1000",
        opacity ? "opacity-1" : "opacity-0"
    )

    return (
        <div className={className}>
            {React.Children.toArray(children)[index]}
        </div>
    )
}

export default Blinking