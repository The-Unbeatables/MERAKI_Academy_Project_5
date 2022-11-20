import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart, deleteFromCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from "../../redux/reducers/product_orders";
import { useEffect } from "react";
import { FcFullTrash , FcHome } from 'react-icons/fc';
import {FaBackward} from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
// Wishlist

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, cart, userId } = useSelector((state) => {
    return {
      token: state.auth.token,
      cart: state.carts.cart,
      userId: state.auth.userId,
    };
  });

  const showProducts = () => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5000/carts/show`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          dispatch(setCart(result.data.result));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  const sendToCart = (id) => {
    if (!token) {
      return navigate("/login");
    } else {
      axios
        .post(
          `http://localhost:5000/productOrders`,
          {
            product_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          dispatch(addUserProductOrder(cart));
        })
        .catch((err) => {
          console.log(err);
          throw err;
        });
    }
  };

  const deleteFromWhislist = (id) => {
    axios
      .delete(`http://localhost:5000/carts/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(deleteFromCart(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <div className="back_to_home">
    <div className="home">
      <FcHome
          style={{width: '40px', height: '40px',cursor:'pointer'}}
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
        <div className="carts">
          {cart.map((product, index) => {
            return (
              <>
                <div key={product[index]} className="cart-prducts">
                  <div className="imagediv-cart">
                    <img
                      className="image-wishList"
                      src={product.image}
                      alt="product"
                    />
                  </div>
                  <div className="contant-cart">
                    <h1 className="title-cart">{product.title}</h1>
                    {/* <hr></hr> */}
                    <p className="price-cart">{product.price}$</p>
                    {/* <hr></hr> */}
                    
                    <h5 className="desc" >
                     {product.description}
                    </h5>
                   
                  </div>
                 
                    <div className="whislist_btns">
                      <div>
                        <button  className="btn-delete-wishList" onClick={() => {
                        deleteFromWhislist(product.id);
                      }}> Delete {product.title}</button>
                        
                    {/* <FcFullTrash
                      className="whislist_icons"
                      style={{width: '40px', height: '40px',cursor:'pointer'}}
                      onClick={() => {
                        deleteFromWhislist(product.id);
                      }}
                    /> */}
                    </div>
                    <div>
                    <button className="btn-addToCart-wishList" onClick={() => {
                        sendToCart(product.product_id);
                      }}> Add {product.title} To Cart</button>
                    {/* <SlBasket
                      
                      className="whislist_icons"
                      style={{width: '40px', height: '40px',cursor:'pointer'}}
                      onClick={() => {
                        sendToCart(product.product_id);
                      }}/> */}
                      </div>
                    </div>
                 
                </div>
              </>
            );
          })}
        </div>
        </div>
    </>
  );
};

export default Cart;
