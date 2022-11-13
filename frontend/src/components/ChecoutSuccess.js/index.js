import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { setUserProductOrders } from "../../redux/reducers/product_orders";


const CheckoutSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {token} = useSelector((state) => {
        return {
            token: state.auth.token,
        }
    });

  
    useEffect(() => {

      axios
        .delete(`http://localhost:5000/productOrders/all/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(setUserProductOrders([]));
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
  
    return (
      <div className="success_checkout_container">
        <div className="success_checkout">
          <h1>Thanks for your order!</h1>
          <div onClick={() => navigate("/")} className="success">
            Continue TO Shopping 
          </div>
        </div>
      </div>
    );
  };

  export default CheckoutSuccess;