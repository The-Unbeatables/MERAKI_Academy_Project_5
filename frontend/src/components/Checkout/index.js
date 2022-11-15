import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getCart } from "../../redux/selector/cartSelector";
import MoonLoader from "react-spinners/MoonLoader";
import "./style.css";

const Checkout = () => {
    const cart = useSelector(getCart);
  
    const handleCheckout = () => {
        console.log(cart);
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

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      handleCheckout();
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      },5000)
    }, []);
  
    return (
      <>
      <div className="loading">
      {loading ? <MoonLoader
      className="loading"
        color={'dodgerblue'}
        loading={loading}
        size={300}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> : <div></div>}
      </div>
      </>
    );
  };

  export default Checkout;