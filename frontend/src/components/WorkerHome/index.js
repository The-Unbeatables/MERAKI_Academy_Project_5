import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWorkerServiceOrders } from "../../redux/reducers/service_orders";
import './style.css'


const WorkerHome=()=>{
    const dispatch= useDispatch()
    const {userId}= useSelector((state)=>{
        return {
            userId : state.auth.userId
        }
    })

const getwrkerId=()=>{
    axios.get(`http://localhost:5000/workers/worker/${userId}`)
    .then((result)=>{
    axios.get(`http://localhost:5000/ServiceOrders/workerservis/worker/${result.data.result.rows[0].id}`)
    .then((result)=>{
  dispatch(setWorkerServiceOrders(result.data.result))
    })
    .catch((err)=>{
console.log(err);
    })

    })
    .catch((err)=>{
console.log(err);
    })
}


    const {workerServiceOrders}= useSelector((state)=>{
      
        return {
         workerServiceOrders: state.serviceOrders.workerServiceOrders
        }
    })



    useEffect(()=>{
      getwrkerId()
    //   grtServiceOrder()
    },[])

// const handelUpdateStaus=(id)=>{
//     axios.put(`http://localhost:5000/ServiceOrders`)
// }


    return(
        <>
        <h2 className="n">Worker Home</h2>
        <div className="contanirWorkerService">
        {workerServiceOrders?.map((item)=>{
            return(
                <div className="cardirWorkerService">
               
                 <div>{item.service_title}</div>
                 <div>{item.service_description}</div>    
                 <button >Aprove</button>
                </div>
            )
            
        })}
        </div>
        </>
    )
}

export default WorkerHome