import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart, deleteFromCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from "../../redux/reducers/product_orders";
import { useEffect } from "react";

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
    // console.log(cart);
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
          // console.log(result.data.result);
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
    // console.log(id);
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
      {/* <div className="whislist-page">
        {cart.map((product, index) => {
          console.log(product);
          return (
            <>
              <div key={product[index]} className="product_whislist">
                <div className="image_whislist">
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </div>

                <div className="words_whislist">
                  <p className="title"><b>{product.title}</b></p>
                  <h4 className="price">
                    <b>{product.price}</b> $
                  </h4>
                  <div><button onClick={() => {sendToCart(product.product_id)}}>Add To Cart</button></div>
                  <div><button onClick={() => {deleteFromWhislist(product.id)}}>Delete From Wishlist</button></div>
                </div>
              </div>
            </>
          );
        })}
      </div> */}





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
                    {/* <FcDislike
                      className="delete-icon"
                      size={24}
                      onClick={() => {
                        deleteFromCarts(product.id);
                      }}
                    /> */}
                    <div className="whislist_btns">
                    <button
                    className="remove-from-wish-list-btn"
                      onClick={() => {
                        deleteFromWhislist(product.id);
                      }}
                    >
                      Delete Product
                    </button>
                    <div>
                      <button
                      className="remove-from-wish-list-btn"
                        onClick={() => {
                          sendToCart(product.product_id);
                        }}
                      >
                        Add To Cart
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        </div>



{/* <div className="wishlist-container">
        <div className="wishlist-grid">
          {cart.length
            ? cart.map((product) => {
                return (
                  <div className="product-card" key={product.id}>
                    <img
                      className="product-img"
                      src={product.image}
                      alt={product.title}
                    />
                    <div>
                      <h3>Title: {product.title}</h3>
                      <h3>Price: {product.price}</h3>
                    </div>
                    <button
                      className="remove-from-wish-list-btn"
                      onClick={() => {
                        deleteFromWhislist(product.id);
                      }}
                    >
                      Remove From Wishlist
                    </button>
                    <button
                      className="remove-from-wish-list-btn"
                      onClick={() => {sendToCart(product.product_id)}}
                    >
                      Add To Cart
                    </button>
                  </div>
                );
              })
            : null}
        </div>
        {!cart.length && (
          <div className="empty-list">
            <div className="empty-list-text">
              You haven't added anything to your wishlist yet.
            </div>
          </div>
        )}
      </div> */}
    </>
  );
};

export default Cart;
