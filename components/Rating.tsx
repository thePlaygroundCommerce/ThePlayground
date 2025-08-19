import { AppProps } from 'index'
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa6'

type Props = { amount: number } & AppProps

const Rating = ({ amount = 2 }: Props) => {
    return (
        <div className='flex gap-2 items-center'>
            <div className="flex gap-1">
                {new Array(5).fill(0).map((_, i) => (
                    i < amount ? <FaStar key={i} /> : <FaRegStar key={i} />
                ))}
            </div>
            <p>( {amount} )</p>
        </div>
    )
}

export default Rating