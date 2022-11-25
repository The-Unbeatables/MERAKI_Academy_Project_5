import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkerServiceOrder, setWorkerServiceOrders, updateWorkerServiceOrder } from "../../redux/reducers/service_orders";
import SideBar from "../SideBar";
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


    return(
        
        <div className="workerHome">
            {/* <div className="sidebar">
            <SideBar/>
            </div> */}
        <div className="contanirWorkerService">
        {workerServiceOrders.length === 0 && <div className="just-some-space"><h2>You don't have any orders yet</h2></div>}
        {workerServiceOrders?.map((item, i)=>{
           
            return(
                <div className="cardirWorkerService" key={i}>
   <div className="tables">
   <p>from: {item.first_name}</p>
    <p>Email: {item.email}</p>
<table className="table table-striped">

  <thead>
    <tr>
   
     
      
      <th scope="col">service_title</th>
      <th scope="col">service_description</th>
      <th scope="col">status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
    
      
      
      <td>{item.service_title}</td>
      <td>{item.service_description}</td>
      <td>{item.status}</td>
    </tr>
   
  </tbody>
</table>
<hr/>
</div>
<div className="buttonworkerHome">
<button className="btn btn-primary" onClick={()=>{handelUpdateStaus(item.id,'Approved')}}>Approve</button>
<button className="btn btn-primary" onClick={()=>{handelUpdateStaus(item.id,'Declined')}}>Decline</button>
<div className="content app-content container-fluid">
                     
                        </div>
</div>

            
                </div>
            )
            
        })}
       
       
        </div>
        </div>
    )
}

export default WorkerHome