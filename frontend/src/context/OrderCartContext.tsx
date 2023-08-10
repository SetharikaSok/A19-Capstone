import { createContext, ReactNode, useContext, useState } from "react";
import { OrderCart } from "../components/OrderCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type OrderCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: string
    quantity: number
}

type OrderCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: string) => number
    increaseCartQuantity: (id: string) => void
    decreaseCartQuantity: (id: string) => void
    removeFromCart: (id: string) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const OrderCartContext = createContext({} as OrderCartContext)

export function useOrderCart() {
    return useContext(OrderCartContext)
}

export function OrderCartProvider({ children}: OrderCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "order-cart",
        []
    )

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: string) {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseCartQuantity(id: string) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, {id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: string) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)    
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
 
    function removeFromCart(id: string) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    return (
        <OrderCartContext.Provider
        value={{ 
            getItemQuantity,
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
        }}
        >
            {children}
            <OrderCart isOpen={isOpen} />
        </OrderCartContext.Provider>
    )
}
