import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useOrderCart } from "../context/OrderCartContext";

export function Navbar() {
    const {openCart, cartQuantity} = useOrderCart()
    return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>
                    Home
                </Nav.Link>
                {/* <Nav.Link to="/kitchen" as={NavLink}>
                    Kitchen
                </Nav.Link> */}
                <Nav.Link to="/myaccount" as={NavLink}>
                    MyAccount
                </Nav.Link>
                <Nav.Link to="/login" as={NavLink}>
                    Login
                </Nav.Link>
            </Nav>
            {/* <div>
                <div className="container mt-4"></div>
                <form className="d-flex">
                    <input className="form-control" type="search" placeholder="Search by Zip, City"/>
                    <button className="btn btn-outline-info">Search</button>
                </form>
            </div> */}
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search by Zip, City" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    </div>
                </div>
                </div>
            {cartQuantity > 0 && (
            <Button 
                onClick={openCart}
                style={{width: "3rem", height: "3rem", position: "relative"}}
                variant="outline-primary" 
                className="rounded-circle"
            >
            <svg 
            width="25px" 
            height="25px" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7.2998 5H22L20 12H8.37675M21 16H9L7 3H4M4 8H2M5 11H2M6 14H2M10 20C10 20.5523 9.55228 21 9 21C8.44772 21 8 20.5523 8 20C8 19.4477 8.44772 19 9 19C9.55228 19 10 19.4477 10 20ZM21 20C21 20.5523 20.5523 21 20 21C19.4477 21 19 20.5523 19 20C19 19.4477 19.4477 19 20 19C20.5523 19 21 19.4477 21 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div 
                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                }}
            >
            </div>
            </Button>
         )} 
        </Container>
    </NavbarBs>)
}