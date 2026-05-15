'use client'

import clsx from 'clsx'
import Button from './Button'
import { useUIKit } from '@/context/UIKitContext'
import MobileNavigation from './MobileNavigation'

const Hamburger = () => {
    const { portals, mount, unmount } = useUIKit()
    const targetOverlay = "headerOverlay"


    const handleOnClick = () => {
        const mountOverlay = () => (
            mount("headerOverlay",
                <MobileNavigation
                    logo={undefined}
                    navs={{
                        headerNavs: [],
                    }}
                />,
            )
        )
        const unMountOverlay = () => (
            unmount(targetOverlay)
        )

        isOverlayActive ? unMountOverlay() : mountOverlay()

    }

    const isOverlayActive = portals.some(({ id }) => id === targetOverlay)
    const classes = {
        left: clsx(
            isOverlayActive && "rotate-45 translate-x-[0px] translate-y-[2px]",
        ),
        right: clsx(
            isOverlayActive && "-rotate-45 translate-x-[0px] -translate-y-[3px]",
        ),
    }

    return (
        <>
            <Button data-w-id="d28673fe-a739-7b74-1763-af2ee311f1db" onClick={handleOnClick} className="k-nav-toggle transition-transform">
                <div className={"k-line duration-300 ease-in transition " + classes.left}></div>
                <div className={"k-line-2 duration-300 ease-in transition " + classes.right}></div>
            </Button>
        </>
    )
}

export default Hamburger