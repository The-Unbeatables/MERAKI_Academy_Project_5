import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkerServiceOrder, setWorkerServiceOrders, updateWorkerServiceOrder } from "../../redux/reducers/service_orders";
import './style.css'


const WorkerHome=()=>{
    const dispatch= useDispatch()
    const {userId , token}= useSelector((state)=>{
        return {
            userId : state.auth.userId,
            token : state.auth.token
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

const handelUpdateStaus=(id,state)=>{
   console.log(id);
    axios.put(`http://localhost:5000/ServiceOrders/${id}`,{
        status : state
    },{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    .then((result)=>{
     dispatch(updateWorkerServiceOrder(result.data.result))
    })
    .catch((err)=>{
   console.log(err);
    })
}

const handeldelteStaus =(id)=>{
    axios.delete(`http://localhost:5000/ServiceOrders/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
    .then((result)=>{
        dispatch(deleteWorkerServiceOrder(id))
       })
       .catch((err)=>{
      console.log(err);
       })
}
const [first, setfirst] = useState('')

    return(
        <>
        <h2 className="n">Worker Home</h2>
        <div className="contanirWorkerService">
        {workerServiceOrders?.map((item)=>{
           
            return(
                <div className="cardirWorkerService">
                 
                 <div>{item.service_title}</div>
                 <div>{item.service_description}</div> 
                 <div>{item.status}</div>   
                 <button onClick={()=>{handelUpdateStaus(item.id,'Aprove')}}>Aprove</button>
                 <button onClick={()=>{handeldelteStaus(item.id)}}>Cancel</button>
                 
                </div>
            )
            
        })}
        </div>
        </>
    )
}

export default WorkerHome