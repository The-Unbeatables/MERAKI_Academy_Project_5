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


    return(
        <>
  
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