import { Col, Row } from "react-bootstrap"
import { MenuItem } from "../components/MenuItem"
import menuItems from "../data/items.json"

export function Kitchen() {
    return (
        <>
            <h1>Kitchen</h1>
            <Row  md={2} xs={1} lg={3} className="g-3">
                {menuItems.map(item => (
                    <Col key={item.id}>
                        <MenuItem {...item} />
                      </Col>
                ))}
            </Row>
        </>
    )
};