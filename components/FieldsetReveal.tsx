'use client'

import React, { ReactNode, useState } from 'react'
import Checkbox from './Checkbox'

type Props = {
    defaultChecked: boolean, checkboxText: string, fieldset: ReactNode
}

const FieldsetReveal = ({ defaultChecked = true, checkboxText = "Billing address same as shipping", fieldset = <></> }: Props) => {
    const [checked, setChecked] = useState(defaultChecked)
    return (
        <>
            <div className="flex gap-4 items-center">
                <Checkbox onChange={(val) => setChecked(val)} defaultChecked={checked} />
                <p>{checkboxText}</p>
            </div>
            {!checked && fieldset}
        </>
    )
}

export default FieldsetReveal