import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../../redux/selector/cartSelector";

const Checkout = () => {
    const cart = useSelector(getCart);
  
    const handleCheckout = () => {
      axios
        .post("http://localhost:5000/payment/create-checkout-session", cart)
        .then((result) => {
            console.log(result);
          if (result.data.url) {
            window.location.href = result.data.url;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      handleCheckout();
    }, []);
  
    return (
      <>
        <div></div>;
      </>
    );
  };

  export default Checkout;