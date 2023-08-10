import { Col, Row } from "react-bootstrap"
import { MenuItem } from "../components/MenuItem"
// import menuItems from "../data/items.json"
import { Link } from "react-router-dom"
import { useState } from "react";
import { MenuItemState } from "../components/NewItemForm";
import React from "react";
import axios from "axios";

export function Kitchen() {
    const [formData, setFormData] = useState<MenuItemState[]>([]);
    
    React.useEffect(() => {
        axios
          .get("http://localhost:5000/menuItem")
          .then((response) => {
            setFormData(response.data);
            console.log("Call All kitchen", response.data)
          });
      }, []);
    return (
        <>
            <h1>Kitchen</h1>
            <Row  md={2} xs={1} lg={3} className="g-3">
                {formData.map(item => (
                    <Col key={item.id}>
                        <MenuItem {...item} />
                      </Col>
                ))}
            </Row>
        </>
    )
};