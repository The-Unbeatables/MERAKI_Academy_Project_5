import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { setUserServiceOrders, deleteUserServiceOrder, updateUserServiceOrder } from '../../redux/reducers/service_orders'


const ServiceOrders=()=>{
    const [check, setCheck] = useState(false);
    const [selectedId, setSelectedId] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const { userId, userServiceOrders, token } = useSelector((state) => {
        return{
            userId: state.auth.userId,
            userServiceOrders: state.serviceOrders.userServiceOrders,
            token: state.auth.token
        }   
    });

useEffect(()=>{
    axios.get(`http://localhost:5000/ServiceOrders/user/${userId}`)
    .then((result)=>{
    dispatch(setUserServiceOrders(result.data.result))
    })
    .catch((err)=>{
        console.log(err);
    })},[])

    const toggle = (id) => {
        setSelectedId(id);
        setCheck(!check);
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/ServiceOrders/${id}`
        ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        .then((result) => {
            dispatch(deleteUserServiceOrder(id))
    })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleUpdate = (id) => {
        axios.put(`http://localhost:5000/ServiceOrders/${id}`
        ,{
            service_title: title,
            service_description: description
        },
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log(result.data.result);
            dispatch(updateUserServiceOrder(result.data.result))
            setCheck(!check)
    })
        .catch((err) => {
            console.log(err);
        })
    }

 
return(
    <>
    {userServiceOrders.map((elem, i) => {
        return (
            <div className='border'>
                <div className='row'>
                    <h3>Service Title: {elem.service_title}</h3>
                    {check && (selectedId === elem.id) && <input type='text' placeholder='new title' onChange={(e) => {setTitle(e.target.value)}}/>}
                </div>
                <div className='row'>
                    <h3>Service Description: {elem.service_description}</h3>
                    {check && (selectedId === elem.id) && <input type='text' placeholder='new description' onChange={(e) => {setDescription(e.target.value)}}/>}
                </div>
                
                <h3>Worker's Name: {elem.first_name} {elem.last_name}</h3>
                <h3>Service Creation Date: {elem.created_at.split('T')[0]}</h3>
                <h3>Service Status: {elem.status}</h3>
                {!check && 
                <>
                    <button onClick={() => {toggle(elem.id)}}>Update Service</button>
                    <button onClick={() => {handleDelete(elem.id)}}>Delete Service</button>
                    </>
                }
                {check && (selectedId === elem.id) &&
                <>
                    <button onClick={() => {handleUpdate(elem.id)}}>Confirm Update</button>
                    <button onClick={() => {setCheck(!check)}}>Cancel</button>
                    </>
                }
                
            </div>
        )
    })}
    </>
)


}
export default ServiceOrders