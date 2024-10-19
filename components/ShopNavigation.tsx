import Link from 'next/link'
import React from 'react'
import { AppProps } from 'types'

type Props = {
    navs: string[]
} & AppProps

const ShopNavigation = ({ navs = ["new", "bags", "accessories", "sale"] }: Props) => {

    return (
        <div className='relative'>
            <div className='flex flex-col text-right'>
                {navs?.map(nav => <Link href="">{nav}</Link>)}
            </div>
            {/* <div className='flex flex-col text-right'>
                {navs?.map(nav => <Link href="">{nav}</Link>)}
            </div> */}
        </div>
    )
}

export default ShopNavigation