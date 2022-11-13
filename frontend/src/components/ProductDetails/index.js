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
            <hr></hr>
            <p className="detailess">
              <b className="textt">Description: </b>{" "}
              {item.description}
            </p>
            <hr></hr>
            <p className="detailess">
              <b className="textt">Quantity: </b>{" "}
              {item.items_left}
            </p>
            <hr></hr>
            <p className="detailess">
              <b className="textt">Price: </b>{" "}
              {item.price}
            </p>
          </div>

          <div className="icon-love-product">
            <div className="fclike-icon">
              <button 
              className="remove-from-wish-list"
              onClick={() => {
                  sendToWhislist(item.id);
                }}>Add To Favorite</button>
              {/* <FcLike
                size={40}
                onClick={() => {
                  sendToWhislist(item.id);
                }}
              /> */}
            </div>
            {/* <div>
              <FcUndo
                className="undo-icon"
                size={30}
                onClick={() => {
                  history(-1);
                }}
              />
            </div> */}
          </div>
        </div>
      </div>
    )
}

export default ProductDetails