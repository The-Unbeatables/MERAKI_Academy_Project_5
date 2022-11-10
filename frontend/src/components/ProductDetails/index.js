import { useDispatch, useSelector } from "react-redux";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FcLike} from "react-icons/fc";
import { addToCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from "../../redux/reducers/product_orders"; 


const ProductDetails=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
  

const {item, token}= useSelector((state)=>{
    return{
    item : state.products.item,
    token: state.auth.token,
    }
})

const sendToWhislist = (id) => {
    if (!token) {
        return navigate("/login");
    } else {
        axios
      .post(
        `http://localhost:5000/carts`,
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
        console.log(item);
        dispatch(addToCart(item));
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    }
}

    return(
        <div className="containerDetails">
        <h2 className="n">Product Details</h2>
        <div className="cardDetalis">
        <div className="imgDetails"> 
        <img src={`${item.image}`} />
        </div>
        <div >
        <div>{item.title}</div>
        <div>{item.price}</div>
        <div>{item.items_left}</div>
        <div>{item.category}</div>
        <div>{item.description}</div>
        </div>
        </div>
        <div className="icon-love-product">
            <div className="fclike-icon">
              <button onClick={() => sendToWhislist(item.id)}>
                Add To Favorite
              </button>
              
            </div>
            </div>
        </div>
    )
}

export default ProductDetails