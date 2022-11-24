import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { setUserProductOrders } from "../../redux/reducers/product_orders";
import "./style.css";


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
        .delete(`https://animated-lolly-e71145.netlify.app/productOrders/all/order`, {
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

    const deleteCart = () => {
      axios
        .delete(`https://animated-lolly-e71145.netlify.app/productOrders/all/order`, {
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
    }
  
    return (
      <div className="success_checkout_container">
        <div className="success_checkout">
          <h1>Thanks for your order!</h1>
          <div onClick={() => navigate("/")} className="success">
            <h5 onClick={() => deleteCart()}>Continue TO Shopping</h5>
          </div>
        </div>
      </div>
    );
  };

  export default CheckoutSuccess;