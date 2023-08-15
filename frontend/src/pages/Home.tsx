import { Link } from "react-router-dom"
// import kitchenData from "../data/kitchens.json"
import { KitchenList } from "../components/KitchenList"
import { Col, Row } from "react-bootstrap"
import React, { useState } from "react"
import axios from "axios"
import { KitchenState } from "../components/NewKitchenForm"

export function Home() {
    const [formData, setFormData] = useState<KitchenState[]>([]);
    
    React.useEffect(() => {
        axios
          .get("http://localhost:5000/kitchen")
          .then((response) => {
            setFormData(response.data);
            console.log("Call All kitchen", response.data)
          });
      }, []);

    return (
    <>
    <h1>HomemadeGo</h1>
        {/* <Link to="/kitchen" className="btn btn-defual border w-30 bg-secondary">
            Go to Kitchen
        </Link> */}
        <Row  md={2} xs={1} lg={3} className="g-3">
            {formData.map(kitchen => (
                <Col key={kitchen.id}>
                    <Link to='/kitchen' state={{kitchenIdStr: kitchen.id}} className="btn btn-defual border w-30 bg-secondary">
                        <KitchenList {...kitchen} />
                        {/* Go to Kitchen */}
                    </Link>
                </Col>
            ))}
        </Row>
    </>
    )
};