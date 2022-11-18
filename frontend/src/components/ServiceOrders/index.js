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
            <div className='show_ser_container'>

                <div className='ser_update'>
                    <div className='ser_show_text'><h3>Service Title:</h3></div>
                    <div className='ser_show_info_can'>
                        <div className='first_one'><h3>{elem.service_title}</h3></div>
                        <div className='second_one'>{check && (selectedId === elem.id) && <input type='text' placeholder='New Title' onChange={(e) => {setTitle(e.target.value)}}/>}</div>
                    </div>
                </div>

                <div className='ser_update'>
                    <div className='ser_show_text'><h3>Service Description: </h3></div>
                    <div className='ser_show_info_can'>
                        <div className='first_one'><h3> {elem.service_description}</h3></div>
                        <div className='second_one'>{check && (selectedId === elem.id) && <input type='text' placeholder='New Description' onChange={(e) => {setDescription(e.target.value)}}/>}</div>
                    </div>
                </div>

                <div className='ser_update'>
                    <div className='ser_show_text'><h3>Worker's Name: </h3></div>
                    <div className='ser_show_info'><h3>{elem.first_name} {elem.last_name}</h3></div>
                </div>

                <div className='ser_update'>
                    <div className='ser_show_text'><h3>Service Status:</h3></div>
                    <div className='ser_show_info'><h3 className={`${elem.status}`}>{elem.status}</h3></div>
                </div>
                
                {!check && 
                <>
                    <button className='show_ser_btn' onClick={() => {toggle(elem.id)}}>Update Service</button>
                    <button className='show_ser_btn' onClick={() => {handleDelete(elem.id)}}>Delete Service</button>
                    </>
                }
                {check && (selectedId === elem.id) &&
                <>
                    <button className='show_ser_btn' onClick={() => {handleUpdate(elem.id)}}>Confirm Update</button>
                    <button className='show_ser_btn' onClick={() => {setCheck(!check)}}>Cancel</button>
                    </>
                }
                
            </div>
        )
    })}
    </>
)


}
export default ServiceOrders