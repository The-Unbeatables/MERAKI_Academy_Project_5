import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart, deleteFromCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from "../../redux/reducers/product_orders";
import { useEffect } from "react";
import { FcFullTrash, FcLike, FcHome } from 'react-icons/fc';
import {FaBackward} from "react-icons/fa";

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
          {cart.map((product, index) => {
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
                  <div className="delete-item-from">
                    <div className="whislist_btns">
                    <FcFullTrash
                      className="whislist_icons"
                      style={{width: '40px', height: '40px'}}
                      onClick={() => {
                        deleteFromWhislist(product.id);
                      }}
                    />
                    <div>
                      <FcLike 
                      className="whislist_icons"
                      style={{width: '40px', height: '40px'}}
                      onClick={() => {
                        sendToCart(product.product_id);
                      }}/>
                      </div>
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
