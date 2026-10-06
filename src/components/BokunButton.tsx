'use client'

import Button from "./Button"

type Props = {}

const BokunButton = (props: Props) => {
    return (
        <Button
            className="bokunButton w-full rounded-md bg-emerald-700 px-6 py-4 text-center text-3xl font-black uppercase tracking-tight text-white shadow-lg transition hover:brightness-105"
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