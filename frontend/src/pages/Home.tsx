import { Link } from "react-router-dom"
import kitchenData from "../data/kitchens.json"
import { KitchenList } from "../components/KitchenList"
import { Col, Row } from "react-bootstrap"

export function Home() {
    
    return (
    <>
    <h1>HomemadeGo</h1>
        {/* <Link to="/kitchen" className="btn btn-defual border w-30 bg-secondary">
            Go to Kitchen
        </Link> */}
        <Row  md={2} xs={1} lg={3} className="g-3">
            {kitchenData.map(item => (
                <Col key={item.id}>
                    <Link to="/kitchen" className="btn btn-defual border w-30 bg-secondary">
                        <KitchenList address={""} contact={""} cuisineType={""} {...item} />
                        {/* Go to Kitchen */}
                    </Link>
                </Col>
            ))}
        </Row>
    </>
    )
};