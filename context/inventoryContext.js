import { createContext, useState } from 'react'

export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
    const [ inventory, setInventory ] = useState();

    const saveInventory = () => {

    }

  return (
    <InventoryContext.Provider value={{ inventory, saveInventory }}>
        {children}
    </InventoryContext.Provider>
  )
}

export default InventoryProvider