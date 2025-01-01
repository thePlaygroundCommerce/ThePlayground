'use client'

import { useTracking } from 'context/TagManager';
import { usePathname } from 'next/navigation';
import Script from 'next/script'
import React, { useEffect, useState } from 'react'

type Props = unknown

const FacebookPixel = (props: Props) => {
    if (typeof window === 'undefined' || !window) return ;
    const { track } = useTracking()
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (!loaded) return;

        track('PageView');
    }, [pathname, loaded]);
    return (
        <>
            <Script
                id="fb-pixel"
                src="/scripts/pixel.js"
                strategy="afterInteractive"
                onLoad={() => setLoaded(true)}
                data-pixel-id={1052870693055851}
            />
        </>
    )
}

export default FacebookPixel