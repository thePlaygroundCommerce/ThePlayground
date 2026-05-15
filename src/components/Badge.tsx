import clsx from 'clsx'
import { AppProps } from 'index'
import React from 'react'

type Props = {}

const Badge = ({ children }: AppProps) => {
    const classes = clsx(
        "bg-gray-600 rounded-full w-fit px-4 py-1 text-white text-sm"
    )
    return (
        <div className={classes}>{children}</div>
    )
}

export default Badge