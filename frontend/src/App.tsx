import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Kitchen } from "./pages/Kitchen";
import { MyAccount } from "./pages/MyAccount";
import {LoginForm} from "./pages/Login";
import {Register} from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { OrderCartProvider } from "./context/OrderCartContext"
import { ProtectedRoutes } from "./ProtectedRouts";


function App() {

  return (
    <OrderCartProvider>
      <Navbar />
      <Container className="mb-4">
          <Routes>
            <Route path="/" element={ <Home />} />
            {/* <Route path="/kitchen" element={ <Kitchen />} /> */}
            <Route path="/register" element={ <Register />} />
            <Route path="/login" element={ <LoginForm />} />
            <Route element={ <ProtectedRoutes />} />
              <Route path="/myaccount" element={ <MyAccount />} />
              <Route path="/kitchen" element={ <Kitchen />} />
          </Routes>
      </Container>
    </OrderCartProvider>
  );
}

export default App;
