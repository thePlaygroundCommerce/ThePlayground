import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <div>
                <h1>Returns</h1>
                <p>If you're not happy with your purchase, we accept returns within 30 days from the delivery date for all US orders. All returned items must be unused and in their original condition. For orders $99 and over, a $10 return label fee will be deducted from the refund amount to cover the cost of return shipping.</p>
                <p>Unfortunately, we do not offer international returns or exchanges at this time.</p>
            </div>
            <div>
                <h1>Standard Policy</h1>
                <div>
                    <p>You have 30 calendar days to return an item from the date you received it.</p>
                    <p>All returns must be unused and received in its brand new, original condition.</p>
                    <p>For orders $99 and over, a $10 return label fee will be deducted from the refund amount to cover the cost of return shipping.</p>
                    <p>Allow up to 2 weeks from the date we receive your return for processing.</p>
                    <p>Refunds will be issued to your original form of payment. </p>
                    <p>Only items that have been purchased directly on www.aersf.com can be returned to us.<br /><br />We have the right to deny credit if the return does not meet our policy requirements.</p>
                    <p>If you'd like an exchange, please make a return and place a new order.<br /><br />All international orders and sales items are final.</p>
                </div>
            </div>
            <div>
                <div >
                    <h3>Start Your Return</h3>
                    <div>
                        <p>Please email us at <a href="">support@aersf.com</a>, with your order number to start your return. You’ll hear from us within 1 business day with next steps.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page