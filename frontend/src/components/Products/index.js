import axios from "axios";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, setitem, setProduct } from "../../redux/reducers/products";
import "./style.css"
import { useNavigate } from 'react-router-dom'
import ProductDetails from "../ProductDetails";
import {
  FcSearch
} from "react-icons/fc";

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
        <div className="type_category" onClick={() => {getProduct()}}><h4><b>All Products</b></h4></div>
        <div className="type_category" onClick={()=>{handelcategory("Striking tools")}}><h4><b>Striking tools</b></h4></div>
        <div className="type_category" onClick={()=>{handelcategory("Metal cutting tools")}}><h4><b>Metal cutting tools</b></h4></div>
        <div className="type_category" onClick={()=>{handelcategory("Holding tools")}}><h4><b>Holding tools</b></h4></div>
        <div className="type_category" onClick={()=>{handelcategory("Sharpening and grinding tools")}}><h4><b>Sharpening and grinding tools</b></h4></div>
        </div>
        <input className="search_input" 
        placeholder="search"
        onChange={(e)=> {handelSearch(e.target.value)}} />
        <FcSearch 
        className="icons_search"
        style={{width: '35px', height: '40px'}}
          onClick={() => {
            handelSearch()
          }}/>
        </div>
        <h2 className="n">Products</h2>
        <div className="range">
          {/* <label>0 - {range}</label>
          <input className="inpurRange" type='range' min="0" max="100" step="10" onChange={(e)=>{handelselct(e.target.value)}} /> */}
          <select
          id="filter"
          name="filter"
          class="input-filter"
          onClick={(e) => {
            handelselct(e.target.value);
          }}>
            <option value="test1">tset 1</option>
            <option value="test2">test 2</option>
          </select>
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