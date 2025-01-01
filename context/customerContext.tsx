"use client"
import React, { createContext, useContext } from 'react'
import { AppProps } from 'index';
import { doesContextExist } from 'util/';

type Props = unknown & AppProps

export const CustomerContext = createContext<null>(null);

const CustomerProvider = ({ children }: Props) => {
    return (
        <CustomerContext.Provider value={null}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => {
    const currentContent = doesContextExist(useContext(CustomerContext));

    return currentContent;
}

export default CustomerProvider