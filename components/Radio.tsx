'use client'

import clsx from "clsx"
import { useState } from "react"
import Button from "./Button"

type Props = {
    onClick: (e: any) => void
    checked: boolean
    color: string
    value: string | number
}

const Radio = ({ onClick, value, color, checked }: Props) => {
    const [state] = useState(value)
    return (
        <Button onClick={(a) => onClick(state)} className={clsx('w-8 h-8 relative rounded-full flex justify-center items-center', checked && "outline")}>
            <div
                className="w-4/5 h-4/5 border rounded-full"
                style={{
                    backgroundColor: color,
                }}
            />
        </Button>
    )
}

export default Radio