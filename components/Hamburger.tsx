import clsx from 'clsx'
import { AppProps } from 'index'
import React from 'react'
import Button from './Button'

type Props = { open: boolean } & AppProps

const Hamburger = ({ open, onClick }: Props) => {

    const classes = {
        left: clsx(
            open && "rotate-45 translate-x-[0px] translate-y-[2px]",
        ),
        right: clsx(
            open && "-rotate-45 translate-x-[0px] -translate-y-[3px]",
        ),
    }

    return (
        <Button data-w-id="d28673fe-a739-7b74-1763-af2ee311f1db" onClick={onClick} className="k-nav-toggle transition-transform">
            <div className={"k-line duration-300 ease-in transition " + classes.left}></div>
            <div className={"k-line-2 duration-300 ease-in transition " + classes.right}></div>
        </Button>
    )
}

export default Hamburger