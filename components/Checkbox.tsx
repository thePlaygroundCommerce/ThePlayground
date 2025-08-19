'use client'

import React from 'react'
import { Checkbox as UiCheckbox } from '@headlessui/react'

type Props = {}

const Checkbox = ({
    defaultChecked = false,
    onChange = ( val: boolean ) => { }
}) => {
    return (
        <UiCheckbox onChange={onChange} className="group block size-4 rounded border bg-white data-checked:bg-blue-500" defaultChecked={defaultChecked}>
            <svg className="stroke-white opacity-0 group-data-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </UiCheckbox>
    )
}

export default Checkbox