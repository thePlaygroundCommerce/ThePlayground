import React from 'react'
import { AppProps } from 'types'

type Props = {
    number: number | bigint
} & AppProps

const Money = ({ number, className }: Props) => {
    const num = Number(number)

    return (
        <p className={className}>${num / 100}</p>
    )
}

export default Money