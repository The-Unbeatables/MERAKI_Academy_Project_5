import "./App.css";
import React, {useState, useEffect} from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Register from "./components/Register"
import Footer from "./components/Footer";
import Services from "./components/Services";
import Login from "./components/Login";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ServiceDetails from "./components/ServiceDetails";
import Cart from "./components/Cart";
import ServiceOrders from "./components/ServiceOrders";
import ProductOrders from "./components/ProductOrders";
import UserProfile from "./components/UserProfile";
import WorkerProfile from "./components/WorkerProfile";
import Checkout from "./components/Checkout";
import AddServiceOrder from "./components/AddServiceOrder";
import WorkerHome from "./components/WorkerHome";
import AdminPanell from "./components/AdminPanell";
import AdminUsers from "./components/AdminUsers";
import AdminProducts from "./components/AdminProducts";
import AdminOrders from "./components/AdminOrders"

function App() {
  return <div className="App">

    <Navbar />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/services" element={<Services />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/products" element={<Products />} /> 
      <Route path="/services/details" element={<ServiceDetails />} /> 
      <Route path="/products/details" element={<ProductDetails />} /> 
      <Route path="/cart" element={<Cart />} /> 
      <Route path="/services/orders" element={<ServiceOrders />} /> 
      <Route path="/products/orders" element={<ProductOrders />} /> 
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/worker/profile" element={<WorkerProfile />} />
      <Route path="/checkout" element={<Checkout />} />   
      <Route path="/worker" element={<WorkerHome />} />  
      <Route path="/services/add" element={<AddServiceOrder />} />
      <Route path="/admin" element={<AdminPanell />} />  
      // <Route path="/admin/users" element={<AdminUsers />} />  
      <Route path="/admin/products" element={<AdminProducts />} />  
      <Route path="/admin/orders" element={<AdminOrders />} />  
      {/* <Route path="/admin/service/orders" element={<AdminServiceOrders />} />   */}

  
   

    </Routes>
    <Footer />
  </div>
}

export default App;
