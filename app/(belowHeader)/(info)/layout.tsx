import { LayoutPageProps } from 'app/layout'
import Button from 'components/Button'
import Heading from 'components/typography/Heading'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: LayoutPageProps) => {
    const a = [
        {name: "Contact", link: "contact" },
        {name: "About", link: "about" },
        {name: "Work", link: "work" },
        {name: "T&Cs", link: "terms-and-conditions" },
    ]
    return (
        <div className='pt-6'>
            <div className='flex flex-col justify-center items-center'>
                {/* <Heading>tab</Heading> */}
                <nav>
                    {a.map((tab) => (
                        <Link key={tab.name} className='m-4' href={`/${tab.link}`}>{tab.name}</Link>
                    ))}
                </nav>
            </div>
            <div className='mt-8'>{children}</div>
        </div>
    )
}

export default layout