'use client'

import { sendGAEvent } from '@next/third-parties/google';
import React, { useEffect } from 'react'

type Props = {}

const PageLoadTracker = (props: Props) => {
    useEffect(() => {
        sendGAEvent('event', 'conversion', { send_to: 'AW-18159252520/RQNsCMaDjbocEKjogNND' })
    }, []);

    return null; // This component does not render any visual UI
}

export default PageLoadTracker