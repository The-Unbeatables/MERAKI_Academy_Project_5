import axios from "axios";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setProduct } from "../../redux/reducers/products";
import "./style.css"
import { useNavigate } from 'react-router-dom'

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
           
            dispatch(setProduct(result.data.result))
            
          })
          .catch((err) => {
            console.log(err);
          });
      };

      useEffect(() => {
          getProduct();
        
      }, []);
     

    


    return(
        <>
  
        <h2 className="n">Products</h2>
        <div className="products">
      {product?.map((data)=>{
       
        return(
           
            <div className="cardProduct">
              <div  className="imgproduct">
            <img src={`${data.image}`} />
            </div>
            <div>
            <div>{data.title}</div>
            <div>{data.price}</div>
            <div>{data.category}</div>
            <div>{data.items_left}</div>
            </div>
           
            
            </div>
           
        )
      })}
      
      </div>
        
        </>
    )
}

export default Products