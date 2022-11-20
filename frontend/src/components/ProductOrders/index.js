import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserProductOrder, setUserProductOrders } from "../../redux/reducers/product_orders";
import "./style.css";
import {
  FcDislike,
  FcHome
} from "react-icons/fc";
import {FaBackward} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Cart
const ProductOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1)

  const { userProductOrders, token, userId, cart } = useSelector((state) => {
    return {
      userProductOrders: state.productOrders.userProductOrders ,
      token: state.auth.token,
      userId: state.auth.userId,
      cart: state.carts.cart,
    };
  });

  const showCart = () => {
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
      console.log(err);
    }
  };

  const total = (arr) => {
    console.log(arr);
    return arr.reduce((sum, index) => {

      return sum + index.price;
    }, 0);
  };

  const checkout = () => {
    navigate("/checkout");
  };


const avargeQuantity=(e,price)=>{
  // console.log(e);
   let qutity= ((e*price))
  //  console.log(qutity);
    setQuantity(qutity)
}




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

      <div className="cart-containers">
        <div className="the-cart">
          {userProductOrders.map((product,index) => {
            return (
              <>
                <div key={product[index]} className="card-cart">
                  <div className="image-div-cart">
                    <img
                      className="image-cart"
                      src={product.image}
                      alt="product"
                    />
                  </div>
                  <div className="words-cart">
                    
                    <h1 className="price-cart">{product.price}$</h1>
                    <hr></hr>
                    <p className="title-cart">{product.title}</p>
                    <hr></hr>
                    <div className="Quantity">
                    <p className="QuantityP">
                       Quantity:
                    </p>
                    <input className="inputQuantity" type={"number"} onChange={(e)=>{avargeQuantity(e.target.value,product.price)}}/>
                    </div>
                  </div>
                  <div className="whislist_btn_cart">
                    <IoClose
                    // <FcDislike
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