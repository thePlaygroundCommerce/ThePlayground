import { Nav } from 'app/layout'
import Link from 'next/link'
import React from 'react'
import Dropdown from 'rsuite/Dropdown'
import DropdownItem from 'rsuite/DropdownItem'
import { AppProps } from 'index'
import Carousel from './Carousel'

type Props = {
    _navs: string[] | Nav[]
} & AppProps

const DEFAULT_CATEGORIES = ["new", "bags", "accessories", "sale"]

const ShopNavigation = ({ _navs = DEFAULT_CATEGORIES }: Props) => {
    const navs = _navs.map((nav) => typeof nav === 'string' ? { id: nav, link: `/${nav}`, title: nav } : { ...nav, link: `/shop${nav.link}` })

    return (
        <div className='fixed bg-white md:relative py-2 md:pt-0 border md:border-0'>
            <div className='md:hidden flex justify-center gap-4 text-center'>
                {/*// @ts-ignore */}
                <Carousel items={navs?.map(nav => <Link href={nav.link}>{nav.title}</Link>)} className=""/>
                
                {/* <Dropdown title="Filter">
                    {navs?.map(nav => <DropdownItem as={Link} href={nav.link}>{nav.title}</DropdownItem>)}
                </Dropdown> */}
            </div>
            <div className='hidden md:flex flex-col text-right'>
                {navs?.map(nav => <Link href={nav.link}>{nav.title}</Link>)}
            </div>
            <div></div>
        </div>
    )
}



export default ShopNavigation