import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart, deleteFromCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from '../../redux/reducers/product_orders';
import { useEffect } from 'react';

// Wishlist

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, cart, userId}= useSelector((state)=>{
        return{
        token: state.auth.token,
        cart: state.carts.cart,
        userId: state.auth.userId
        }
    })

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
            // console.log(result.data.result);
            dispatch(setCart(result.data.result));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    useEffect(() => {
      showProducts();
    }, []);

    const sendToCart = (id) => {
      console.log(id);
        if (!token) {
            return navigate("/login");
        } else {
            axios
          .post(
            `http://localhost:5000/productOrders`,
            {
                product_id: 1,
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
      <div>
        <div>Whislist</div>
        <div className='container_whaslist'>
          {cart.map((product) => {
            console.log(product);
            return (
              <div className='product_whislist' key={product.id}>
                <div>
                <img 
                className="cart_image"
                src={product.image}
                alt="product"
                />
                </div>
                <div className="cart_text">
                      <div className="cart_title">{product.title}</div>
                      <div className="cart_price">{product.price}</div>
                      <div className="cart_price">{product.items_left}</div>
                </div>
                <div><button onClick={() => {sendToCart(product.product_id)}}>Add To Cart</button></div>
                <div><button onClick={() => {deleteFromWhislist(product.product_id)}}>Delete From Wishlist</button></div>
              </div>
              
            )
          })}
        </div>
      </div>
    )
};

export default Cart;