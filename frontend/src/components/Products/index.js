import axios from "axios";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../redux/reducers/products";
import "./style.css"

const Products = ()=>{
   const dispatch = useDispatch()

   const {product} = useSelector((state)=>{
    return{
        product: state.products.products
    }
   })
console.log(product);

    const getProduct = () => {
        
        axios
          .get("http://localhost:5000/products")
          .then((result) => {
            console.log(result.data.result);
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
            <div>{data.image}</div>
            <div>{data.title}</div>
            <div>{data.price}</div>
            <div>{data.category}</div>
            <div>{data.items_left}</div>
            </div>
           
        )
      })}
      
      </div>
        
        </>
    )
}

export default Products