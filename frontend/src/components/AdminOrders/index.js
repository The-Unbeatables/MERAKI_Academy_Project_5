import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllServiceOrders } from '../../redux/reducers/service_orders'
import './style.css'

const AdminOrders = () => {
  const dispatch = useDispatch()
  const [workers, setWorkers] = useState([])

  const {allServiceOrders }= useSelector((state)=>{
    return{
      allServiceOrders: state.serviceOrders.allServiceOrders,
    }
  })

const getServiceOrders=()=>{
  axios.get('http://localhost:5000/ServiceOrders')
  .then((result)=>{
  //  console.log(result.data.result[0].rows);
  //  console.log(result.data.result[1].rows);
   setWorkers(result.data.result[1].rows)
     dispatch(getAllServiceOrders(result.data.result[0].rows))
    //  console.log(allServiceOrders.slice(7,11));

  
  })
  .catch((err)=>{
   console.log(err);
  })
}

useEffect(()=>{
  getServiceOrders()

},[])


  return (
    <div className='contairAdminOrders'>
    
    <table className='tableOrders'>
        <thead>
          <tr>
            <th scope="col"><h4><b>Service Title</b></h4></th>
            <th scope="col"><h4><b>Service Description</b></h4></th>
            <th scope="col"><h4><b>Created At</b></h4></th>
            <th scope="col"><h4><b>Worker Name</b></h4></th>
            <th scope="col"><h4><b>Customer Name</b></h4></th>
            <th scope="col"><h4><b>status</b></h4></th>
          </tr>
        </thead>
    <tbody>
          { allServiceOrders.map((item,i) => (
              
              <tr key={i}>
            
                <td data-label="Title">{item.service_title}</td>
                <td data-label="Title">{item.service_description}</td>
                <td className='price' data-label="Price"><b>{item.created_at.split('T')[0]}</b></td>

                {workers.map((elem, index) => {
                  if(item.worker_id === elem.id){
                    return(
                      <td className='price' data-label="Price" key={i}><b>{elem.firstname}</b></td>
                    )
                  }
                })} 
                  
                 

                <td className='price' data-label="Price"><b>{item.first_name}</b></td>
                <td className='price' data-label="Price"><b>{item.status}</b></td>
                <td data-label="Actions">
                  <div className="controller_icn">
                    
                   
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  )
}

export default AdminOrders