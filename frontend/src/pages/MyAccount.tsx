import { Link } from "react-router-dom";

export function MyAccount() {
    return (
        <>
            <h1>My Account</h1>
            <div>
                <Link to="/newKitchenForm" className="btn btn-defual border w-30 bg-secondary">
                        Create Kitchen
                </Link>
            </div>
            <div>
                <Link to="/newItemForm" className="btn btn-defual border w-30 bg-secondary">Add Menu</Link>
            </div>
        </>
    )
};