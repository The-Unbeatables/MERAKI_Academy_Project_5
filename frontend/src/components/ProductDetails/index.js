import { useSelector } from "react-redux";
import './style.css'


const ProductDetails=()=>{
  

const {item}= useSelector((state)=>{
    return{
    item : state.products.item
    }
})


    return(
        <div>
        <h2 className="n">Product Details</h2>
        <div className="cardDetalis">
        <div>{item.image}</div>
        <div>{item.title}</div>
        <div>{item.price}</div>
        <div>{item.items_left}</div>
        <div>{item.category}</div>
        <div>{item.description}</div>
        </div>
        
        
        
        
        </div>
    )
}

export default ProductDetails