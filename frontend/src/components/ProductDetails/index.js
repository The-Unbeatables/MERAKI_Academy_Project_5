import { useDispatch, useSelector } from "react-redux";
import './style.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { FcLike} from "react-icons/fc";
import { addToCart, setCart } from "../../redux/reducers/carts";
import { addUserProductOrder } from "../../redux/reducers/product_orders"; 
import { FcHome } from 'react-icons/fc';
import {FaBackward} from "react-icons/fa";
import { useState, useEffect } from "react";


const ProductDetails=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [toDisabled, setToDisabled] = useState(false)

const {item, token ,cart ,isLoggedIn}= useSelector((state)=>{
    return{
    item : state.products.item,
    token: state.auth.token,
    cart: state.carts.cart,
    isLoggedIn: state.auth.isLoggedIn
    }
})



const sendToWhislist = (id) => {
  // console.log(item);
 
    if (!token) {
        return navigate("/login");
    } else {
      console.log(cart.length);
 
          axios
      .post(
        `https://animated-lolly-e71145.netlify.app/carts`,
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
        dispatch(addToCart(item))
    
        setToDisabled(true)
    
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

         
      //  }
      
      //})
    
   
    }
}


useEffect(()=>{
  if(isLoggedIn === true){
  axios
  .get(`https://animated-lolly-e71145.netlify.app/carts/show`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((result) => {
    dispatch(setCart(result.data.result));
    disable();
  })
  .catch((err) => {
    console.log(err);
  });
}
},[])



// console.log(item);
const disable =()=>{

for (let i = 0; i < cart.length; i++) {
  // console.log(cart.length);
  // console.log(cart[i].product_id);
  // console.log(item.id);
  if(cart[i].product_id === item.id){
    
    console.log('not disable');
    setToDisabled(true)
    return;
           
  }
 
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
      <div className="container-detailes-product">
        <div className="product_grid">
          {/* <div className="asss"> */}
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
          {/* </div> */}
          <div className="icon-love-product">
            <div className="fclike-icon">
            {/* {cart.find((item) => item.id === product.id) ? */}
            
              <button   className={`${toDisabled ? "ss" :"remove-from-wish-list"}`}
              onClick={() => {
                  sendToWhislist(item.id);
                }} disabled={toDisabled}>Add To Favorite</button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
}

export default ProductDetails