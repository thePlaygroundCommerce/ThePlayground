'use client'

import Button from "./Button"

const BokunButton = (props) => {
    return (
        <Button
            {...props}
            disabled={false}
            id="bokun_505f5c90_d5df_4bf6_b65c_5ae55640629d"
            data-src="https://widgets.bokun.io/online-sales/c864604d-4bcb-4b58-a3a7-a4c8bca7b0a1/experience/1322456?partialView=1"
            data-testid="widget-book-button"
        >
            Book now
        </Button>
    )
}

export default BokunButton