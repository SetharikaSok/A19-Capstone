import { KitchenState } from "./NewKitchenForm";
import { Card } from "react-bootstrap";


export function KitchenList({ id, name, imgUrl }:KitchenState) {
    return (
        <>
            <Card.Img
             variant="top"
             src={imgUrl}
             height="200px"
             style={{objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                </Card.Title>
            </Card.Body>
        </>
    )

}