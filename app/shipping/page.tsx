import Heading from 'components/typography/Heading'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <div>
                            <Heading level={3}>Shipping</Heading>
                            <div><p>We ship and deliver orders Monday through Friday, excluding federal holidays. The transit times below are estimates once the shipment leaves our warehouse in California.</p></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <Heading>United States</Heading>
                            <div><p>We offer free standard shipping (3-6 business days) on all orders $99 and over shipping to the US.</p><p>We also offer 2-business day expedited shipping starting at $16.99 and 1-business day expedited shipping starting at $26.99. The final price for expedited shipping will be given at checkout and is determined by order volume. Expedited shipping is not available to Hawaii, Alaska, US territories, military addresses, and P.O. boxes.</p><p>Please note that only expedited orders placed before 12 pm PT on a business day will ship that same day. For example, an order placed with 1-business day shipping on Thursday at 1 pm PT will ship out the next day, Friday, and arrive the following Monday.</p></div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <Heading>International</Heading>
                            <div><p>We offer flat rate international shipping via UPS Worldwide Expedited to most countries around the world starting at $14.99. Rates will vary by location and weight, and will be shown at checkout.</p><p>Rates do not include duties, taxes, and disbursement fees. These fees can vary, so please be sure to check with your local customs agency for details on estimated costs. In addition, some orders may experience customs delays. Unfortunately, we have no control over these charges or delays and cannot predict what they may be. We suggest that you contact your local customs office for additional information. If a package is returned to sender, the customer will be held liable for the original shipping costs.</p><p>All international orders are final.</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Page