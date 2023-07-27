import { createContext } from 'react'

export const CartContext = createContext({})

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    return <CartContext.Provider value={{}}>{children}</CartContext.Provider>
}

export default CartProvider
