import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useOrderCart } from "../context/OrderCartContext"
import { MenuItemState } from "./NewItemForm"

export function MenuItem({ id, name, price, imgUrl }:MenuItemState) {

    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useOrderCart()

    const quantity = getItemQuantity(id)

    return <Card className="h-100">
        <Card.Img
             variant="top"
             src={imgUrl}
             height="200px"
             style={{objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
            <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                <span className="fs-2">{name}</span>
                <span className="ms-auto text-muted">{formatCurrency (price)}</span>
            </Card.Title>
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Order Now</Button>
                ) : (
                    <div 
                        className="d-flex align-items-center justy-content flex-column" 
                        style={{ gap: "0.5rem"}}
                    >
                        <div 
                            className="d-flex align-items-center justify-content-center" 
                            style={{ gap: "0.5rem"}}
                        >
                            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                            <div>
                                <span className="fs-3"> {quantity} </span> in cart
                            </div>
                            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                        </div>
                        <Button onClick={() => removeFromCart(id)}
                        variant="danger" 
                        size="sm">
                            Remove</Button>
                    </div>
                )}
            </div>
        </Card.Body>
    </Card>
};