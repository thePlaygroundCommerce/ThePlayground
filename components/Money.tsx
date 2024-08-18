import React from 'react'
import { AppProps } from 'types'

type Props = {
    number: number | bigint
} & AppProps

const Money = ({ number, className }: Props) => {
    number = Number(number);
    const num = (number / 100)

    return (
        <p className={className}>${(number % 100) === 0 ? num + ".00" : num}</p>
    )
}

export default Money