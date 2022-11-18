import { useDispatch, useSelector } from "react-redux";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FcLike} from "react-icons/fc";
import { addToCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from "../../redux/reducers/product_orders"; 
import { FcHome } from 'react-icons/fc';
import {FaBackward} from "react-icons/fa";


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
  // console.log(item);
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
      <div>
        <div className="container-detailes-product">
          <div>
            <img
              className="image-product-detailess"
              src={item.image}
              alt="product"
            />
          </div>

          <div className="prduct-detailes-words">
            <h1 className="title-detailess">
              {item.title}
            </h1>
            
            <p className="detailess">
              <b className="textt">Description: <br></br></b>{" "}
              {item.description}
            </p>
            <hr></hr>
            <p className="detailess">
              <b className="textt">Quantity:</b>{" "}
              {item.items_left}
            </p>
            <hr></hr>
            <p className="detailess">
              <b className="textt">Price: </b>{" "}
              {item.price} $
            </p>
          </div>
          <div className="icon-love-product">
            <div className="fclike-icon">
              <button 
              className="remove-from-wish-list"
              onClick={() => {
                  sendToWhislist(item.id);
                }}>Add To Favorite</button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default ProductDetails