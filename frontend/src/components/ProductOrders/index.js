import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCart, addToCart, deleteFromCart } from "../../redux/reducers/carts";
import "./style.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, isLoggedIn, token } = useSelector((state) => {
    return {
      cart: state.carts.cart,
      isLoggedIn: state.auth.isLoggedIn,
      token: state.auth.token,
    };
  });

  //   const [show, setShow] = useState("");
  //   const [product_id, setProduct_id] = useState("");
  //   const [state, setState] = useState(false);

  const showCart = () => {
    // if (!token) {
    //   navigate("/login");
    // }
    if (cart.length === 0) {
      axios
        .get(`http://localhost:5000/carts/show`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
          dispatch(setCart(result.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    showCart();
  }, []);

  const deleteFromCart = async (id) => {
    try {
      await axios
        .delete(`http://localhost:5000/carts/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          dispatch(deleteFromCart(id));
        })
        .catch((err) => {
          console.log(err);
        });
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
          {cart.length ? (
            <>
              <div className="left_card">
                {cart.map((product) => {
                  return (
                    <div className="cart_details" key={product.id}>
                      <div className="left_cart_det">
                        <img
                          className="cart_image"
                          src={product.img}
                          alt="product"
                        />
                        <div className="cart_text">
                          <div className="cart_title">{product.title}</div>
                          <div className="cart_price">{product.price}</div>
                        </div>
                      </div>

                      <div
                        className="cart_button"
                        onClick={() => {
                          deleteFromCart(product.id);
                        }}
                      >
                        Remove
                      </div>
                    </div>
                    
                  );
                })}
              </div>
              <div className="right_cart">
                <div className="cart_summary">Products Summary</div>
                <div className="cart_total">
                  <div>Total</div>
                  <div>${total(cart)}</div>
                </div>
                <div className="cart_checkout" onClick={() => checkout()}>
                  Checkout
                </div>
              </div>
            </>
          ) : null}
        </div>
        {!cart.length && (
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

export default Cart;