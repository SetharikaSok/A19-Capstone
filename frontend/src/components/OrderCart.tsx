import { Offcanvas, Stack } from "react-bootstrap"
import { useOrderCart } from "../context/OrderCartContext"
import { CartItem } from "./CartItem"
import { formatCurrency } from "../utilities/formatCurrency"
import menuItems from "../data/items.json"
import { Link } from "react-router-dom"

type OrderCartProps = {
    isOpen: boolean
  }

export function OrderCart({ isOpen }: OrderCartProps) {
    const { closeCart, cartItems} = useOrderCart()
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} {...item}/>
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total{" "}
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = menuItems.find(i => i.id === cartItem.id)
                                return total + (item?.price || 0) * cartItem.quantity
                            }, 0)
                        )}
                    </div>
                    <div>
                        <Link to="/checkOut" className="btn btn-defual border w-100 bg-secondary">Check out</Link>
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}