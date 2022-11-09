import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { setCart, deleteFromCart } from "../../redux/reducers/carts";
import { deleteUserProductOrder, setUserProductOrders } from "../../redux/reducers/product_orders";
import "./style.css";

// Cart
const ProductOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProductOrders, token } = useSelector((state) => {
    return {
      userProductOrders: state.productOrders.userProductOrders ,
      token: state.auth.token,
    };
  });

  const showCart = () => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/productOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result.data.result);
          dispatch(setUserProductOrders(result.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    showCart();
  }, []);

  const deleteFromCarts = async (id) => {
    try {
      let res = await axios
        .delete(`http://localhost:5000/productOrders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res) {
        dispatch(deleteUserProductOrder(id));
        }
    } catch (err) {
      console.log("err");
      //   throw err;
    }
  };

  const total = (arr) => {
    return arr.reduce((sum, index) => {
      return sum + index.price;
    }, 0);
  };

  const checkout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <div className="cart_container">
        <div className="title">Cart</div>
        <div className="cart_grid_display">
          {userProductOrders.length ? (
            <>
              <div className="left_card">
                {userProductOrders.map((product) => {
                  // console.log(product);
                  return (
                    <div className="cart_details" key={product.id}>
                      <div className="left_cart_det">
                        <img
                          className="cart_image"
                          src={product.image}
                          alt="product"
                        />
                        <div className="cart_text">
                          <div className="cart_title">{product.title}</div>
                          <div className="cart_price">{product.price}</div>
                          <div className="cart_price">{product.items_left}</div>
                        </div>
                      </div>

                      <div
                        className="cart_button"
                        onClick={() => {
                          deleteFromCarts(product.id);
                        }}
                      >
                        Remove
                      </div>
                    </div>
                    
                  );
                })}
              </div>
              <div className="right_cart">
                <div className="cart_total">
                  <div>Total</div>
                  <div>${total(userProductOrders)}</div>
                </div>
                <div className="cart_checkout" onClick={() => checkout()}>
                  Checkout
                </div>
              </div>
            </>
          ) : null}
        </div>
        {!userProductOrders.length && (
          <div className="empty-list">
            <img
              className="empty-list-image"
              src="./assets/images/bankrupt.png"
              alt="empty"
            />
            <div className="empty-list-text">Your cart is empty.</div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductOrders;