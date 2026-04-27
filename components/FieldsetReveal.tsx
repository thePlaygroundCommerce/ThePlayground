'use client'

import React, { ReactNode, useState } from 'react'
import Checkbox from './Checkbox'

type Props = {
    defaultChecked: boolean, checkboxText: string, fieldset: ReactNode
    onCheck?: (checked: boolean) => void
}

const FieldsetReveal = ({ onCheck = (checked: boolean) => { }, defaultChecked = true, checkboxText = "Billing address same as shipping", fieldset = <></> }: Props) => {
    const [checked, setChecked] = useState(defaultChecked)
    const handleOnChange = (val: boolean) => {
        setChecked(val)
        onCheck(val)
    }
    return (
        <>
            <Checkbox onChange={handleOnChange} defaultChecked={checked}>{checkboxText}</Checkbox>
            {!checked && fieldset}
        </>
    )
}

export default FieldsetReveal