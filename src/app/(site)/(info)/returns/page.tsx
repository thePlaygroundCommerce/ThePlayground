import Heading from '@/components/typography/Heading'
import React from 'react'

type Props = unknown

const Page = (props: Props) => {
    return (
        <div className='p-4 space-y-8'>
            <div className='space-y-3'>
                <Heading>Return Policy</Heading>
                <p>This return policy applies to orders shipping within the United States.</p>
                <p>
                    Returns are accepted for both defective and non-defective products, and exchanges are also accepted as long as the item is returned in new condition within 30 days of delivery.
                </p>
            </div>

            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Heading level={3}>Countries</Heading>
                    <p>United States</p>
                </div>

                <div className='space-y-2'>
                    <Heading level={3}>Policy URL</Heading>
                    <p>
                        <a className='underline' href='https://www.theplaygroundtravel.com/returns' target='_blank' rel='noreferrer'>
                            https://www.theplaygroundtravel.com/returns
                        </a>
                    </p>
                </div>
            </div>

            <div className='space-y-3'>
                <Heading level={2}>Returns & Exchanges</Heading>
                <p>We accept returns for both defective and non-defective products.</p>
                <p>We also accept exchanges.</p>
                <p>Returned merchandise must be new and sent back within 30 days.</p>
            </div>

            <div className='space-y-3'>
                <Heading level={2}>Method & Fees</Heading>
                <p>Returns are handled by mail.</p>
                <p>Your return label can be downloaded and printed at no cost.</p>
                <p>There are no restocking fees.</p>
                <p>Refunds are processed within 7 days after the return is received and approved.</p>
            </div>
        </div>
    )
}

export default Page