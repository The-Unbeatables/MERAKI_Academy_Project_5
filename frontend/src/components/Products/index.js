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

   const {product} = useSelector((state)=>{
    return{
        product: state.products.products
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


    return(
        <>
        <div className="category">
        <div onClick={()=>{handelcategory("cook")}}>category number1</div>
        <div onClick={()=>{handelcategory("play")}}>category number2</div>
        <div onClick={()=>{handelcategory("test")}}>category number3</div>
        <input onChange={(e)=> {handelSearch(e.target.value)}} />
        </div>
        <h2 className="n">Products</h2>
        <div className="products">
      {product?.map((data)=>{
       
        return(
           
            <div className="cardProduct">
              <div className="sss">
              <div  className="imgproduct">
            <img src={`${data.image}`} />
            </div>
            <div className="info">
            <div>{data.title}</div>
            <div>{data.price}</div>
            {/* <div>{data.category}</div>
            <div>{data.items_left}</div> */}
            <div>
               
            <button onClick={()=>{handelDetalis(data)}}>Details</button>
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