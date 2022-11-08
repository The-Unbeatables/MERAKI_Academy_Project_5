import "./App.css";
import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Services from "./components/Services";

function App() {
  return <div className="App">

    <Navbar />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} /> 
      {/*<Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/products" element={<Products />} /> 
      <Route path="/services/details" element={<ServiceDetails />} /> 
      <Route path="/products/details" element={<ProductDetails />} /> 
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/services/orders" element={<ServiceOrders />} /> 
      <Route path="/products/orders" element={<ProductOrders />} /> 
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/worker/profile" element={<WorkerProfile />} />   */}

    </Routes>
    {/* <Footer /> */}
  </div>;
}

export default App;
