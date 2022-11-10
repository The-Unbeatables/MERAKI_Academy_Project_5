import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from '../../redux/reducers/product_orders';
import { useEffect } from 'react';

// Wishlist

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token, cart}= useSelector((state)=>{
        return{
        token: state.auth.token,
        cart: state.carts.cart
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

    return (
      <div>
        <div>Whislist</div>
        <div>
          {cart.map((product) => {
            return (
              <div key={product.id}>
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
                <button onClick={() => {sendToCart(product.id)}}>Add To Cart</button>
              </div>
              
            )
          })}
        </div>
      </div>
    )
};

export default Cart;