import { KitchenState } from "./NewKitchenForm";
import { Card } from "react-bootstrap";


export function KitchenList({ id, name, city, state, zipcode, imgUrl }:KitchenState) {
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
                <Card.Footer className="d-flex justify-content-space-between align-items-baseline mb-4">
                    <span className="fs-6">{city}, {state}, {zipcode}</span>
                </Card.Footer>
            </Card.Body>
        </>
    )

}