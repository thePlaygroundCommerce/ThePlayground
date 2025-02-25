import { LayoutPageProps } from 'app/layout'
import Button from 'components/Button'
import Heading from 'components/typography/Heading'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }: LayoutPageProps) => {
    const a = ["Contact", "About", "Work", "FAQs"]
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                {/* <Heading>tab</Heading> */}
                <nav>
                    {a.map((tab) => (
                        <Link className='m-4' href={`/${tab.toLowerCase()}`}>{tab}</Link>
                    ))}
                </nav>
            </div>
            <div className='mt-8'>{children}</div>
        </div>
    )
}

export default layout