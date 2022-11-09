import axios from 'axios'
import { useEffect } from 'react'
import './style.css'


const ServiceOrders=()=>{


const getAllServiceOrders =()=>{
    axios.get('http://localhost:5000/ServiceOrders')
    .then((result)=>{
    console.log(result.data.result);
    })
    .catch((err)=>{
        console.log(err);
    })
}

useEffect(()=>{
    getAllServiceOrders()
},[])



 
return(
    <div>
    <h2 className="n">Service Orders</h2>
    </div>
)
 

}
export default ServiceOrders