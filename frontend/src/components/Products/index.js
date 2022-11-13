import axios from "axios";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setitem, setProduct } from "../../redux/reducers/products";
import "./style.css"
import { useNavigate } from 'react-router-dom'
import ProductDetails from "../ProductDetails";

const Products = ()=>{
  const navigate = useNavigate()
   const dispatch = useDispatch()

   const {product, token} = useSelector((state)=>{
    return{
        product: state.products.products,
        token: state.auth.token
    }
   })


    const getProduct = () => {
        axios
          .get("http://localhost:5000/products")
          .then((result) => {
          //  console.log(result.data.result);
            dispatch(setProduct(result.data.result))
            
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
          getProduct();
        
      }, []);
     

      const handelDetalis=(data)=>{
       
        dispatch(setitem(data))
        navigate('/products/details')

      }
  const handelcategory=(str)=>{
    axios.get(`http://localhost:5000/products/${str}`)
    .then((result)=>{
  
  dispatch(setProduct(result.data.result))
    })
    .catch((err)=>{
    console.log(err);
    })

  }

const [search, setSearch] = useState('')

const handelSearch=(search)=>{
 
  axios.get(`http://localhost:5000/products/search/product/?title=${search}`)
  .then((result)=>{
   console.log(result);
   dispatch(setProduct(result.data.result))
  })
  .catch((err)=>{
 console.log(err);
  })
}
const handelselct= (range)=>{
 
  setRange(range)
  axios.post("http://localhost:5000/products/filter/Product",{
    max:range
  })
  .then((result)=>{
   console.log(result);
   dispatch(setProduct(result.data.result.rows))
  })
  .catch((err)=>{
    console.log(err);
  })


}
const [range, setRange] = useState('')

    return(
        <>
        <div className="categoryAndSearch">
          <div className="category">
        <div onClick={()=>{handelcategory("cook")}}>category number1</div>
        <div onClick={()=>{handelcategory("play")}}>category number2</div>
        <div onClick={()=>{handelcategory("test")}}>category number3</div>
        </div>
        <input onChange={(e)=> {handelSearch(e.target.value)}} />
        </div>
        <h2 className="n">Products</h2>
        <div className="range">
          <label>0 - {range}</label>
          <input className="inpurRange" type='range' min="0" max="100" step="10" onChange={(e)=>{handelselct(e.target.value)}} />
        {/* <select className='select' name='rating' onChange={(e)=>{handelselct()}}>
         <option> Choose one from the list </option>  
          <option onClick={()=>{handelselct()}}>1 - 10</option>   
          <option onClick={()=>{handelselct()}}>11 - 20 </option>
          <option onClick={()=>{handelselct()}}>21 - 30 </option>   
          <option onClick={()=>{handelselct()}}>31 - 40 </option>
         </select> */}
        </div>
        <div className="products">
      {product?.map((data)=>{
        return(
            <div className="cardProduct">
              <div className="sss">
              <div  className="imgproduct">
            <img src={`${data.image}`} className="image"/>
            </div>
            <div className="info">
            <div className="product_title"><h2>{data.title}</h2></div>
            <div className="product_description">{data.description}</div>
            <div className="product_price">{data.price} $</div>
            <div>
            <button className="product_detailes_btns" onClick={()=>{handelDetalis(data)}}>Details</button>

            </div>
            </div>
            </div>
            </div>
        )
      })}
      </div>
        </>
    )
}

export default Products