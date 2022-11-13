import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { setCart, deleteFromCart } from "../../redux/reducers/carts";
import { deleteUserProductOrder, setUserProductOrders } from "../../redux/reducers/product_orders";
import "./style.css";
import {
  FcDislike,
  FcApproval,
  FcCurrencyExchange,
  FcLeft,
  FcHome
} from "react-icons/fc";
import {FaBackward} from "react-icons/fa";

// Cart
const ProductOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProductOrders, token, userId, cart } = useSelector((state) => {
    return {
      userProductOrders: state.productOrders.userProductOrders ,
      token: state.auth.token,
      userId: state.auth.userId,
      cart: state.carts.cart,
    };
  });

  const showCart = () => {
    console.log(userId);
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/productOrders/showCart`
        , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        .then((result) => {
          console.log(result);
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
        .delete(`http://localhost:5000/productOrders/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res) {
        dispatch(deleteUserProductOrder(id));
        }
    } catch (err) {
      console.log("err");
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
<div className="back_to_home">
    <div className="home">
      <FcHome
          style={{width: '40px', height: '40px'}}
      onClick={() => {
            navigate("/");
          }}/>
          </div>
          
    <div className="back">
        <FaBackward
          className="back-icon-react"
          style={{width: '30px', height: '40px', color: 'black'}}
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
    </div>

      <div className="cart-container">
        <div className="cart">
          {userProductOrders.map((product,index) => {
            return (
              <>
                <div key={product[index]} className="cart-prduct">
                  <div className="image-div-cart">
                    <img
                      className="product-image-cart"
                      src={product.image}
                      alt="product"
                    />
                  </div>

                  <div className="words-cart">
                    <p className="title">{product.title}</p>
                    <hr></hr>
                    <p className="description">{product.price}$</p>
                    <hr></hr>
                    <p className="description">
                      Item Quantity: {product.items_left}
                    </p>
                  </div>
                  <div className="whislist_btn_cart">
                    <FcDislike
                      className="delete-icon"
                      style={{width: '40px', height: '40px'}}
                      onClick={() => {
                        deleteFromCarts(product.id);
                      }}
                    />
                  </div>
                </div>

                
              </>
            );
          })}
        </div>
        <div className="CheckOut">
          <p className="span-total">Total Price</p>
          <spnan className="total-price">
          {total(userProductOrders)} $ 
          </spnan>
          <button className="button-checkout" onClick={()=>{checkout()}}>
            CheckOut 
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductOrders;