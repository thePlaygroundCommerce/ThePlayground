import clsx from 'clsx'
import { AppProps } from 'index'
import React from 'react'

const Divider = (props: AppProps) => {
    return (
        <div className={clsx('max-h-1 min-w-2', props.className)} />
    )
}

export default Divider