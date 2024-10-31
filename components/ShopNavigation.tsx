import { Nav } from 'app/layout'
import Link from 'next/link'
import React from 'react'
import Dropdown from 'rsuite/Dropdown'
import DropdownItem from 'rsuite/DropdownItem'
import { AppProps } from 'types'

type Props = {
    _navs: string[] | Nav[]
} & AppProps

const ShopNavigation = ({ _navs = ["new", "bags", "accessories", "sale"] }: Props) => {
    const navs = _navs.map((nav) => typeof nav === 'string' ? { id: nav, link: `/${nav}`, title: nav } : { ...nav, link: `/shop${nav.link}` })
    return (
        <div className='relative'>
            <div className='md:hidden flex flex-col text-center'>
                <Dropdown title="Filter">
                    {navs?.map(nav => <DropdownItem as={Link} href={nav.link}>{nav.title}</DropdownItem>)}
                </Dropdown>
            </div>
            <div className='hidden md:flex flex-col text-right'>
                {navs?.map(nav => <Link href={nav.link}>{nav.title}</Link>)}
            </div>
        </div>
    )
}



export default ShopNavigation