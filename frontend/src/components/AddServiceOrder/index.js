import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'

const AddServiceOrder = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [check, setCheck] = useState(true);
    const { selectedWorker, userId, token} = useSelector((state) => {
        return{
            selectedWorker: state.workers.selectedWorker,
            userId: state.auth.userId,
            token: state.auth.token
        }   
    });

    const handleSendRequest = () => {
        axios.post('http://localhost:5000/ServiceOrders', {
            service_title: title,
            service_description: description,
            user_id: userId,
            worker_id: selectedWorker.id
        },{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log(result);
            setCheck(false);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    // useEffect(() => {
    //     console.log(selectedWorker);
    // },[])
  return (
    <>
    <div>
        {check && 
        <>
        <h3>Please fill the required information for your request</h3>
        <label>Service Title:
            <input type={'text'} placeholder='please enter the title' onChange={(e) => {setTitle(e.target.value)}}/>
        </label>
        <br/>
        <label>Service Description:
            <input type={'text'} placeholder='Describe the issue you are trying to fix' onChange={(e) => {setDescription(e.target.value)}}/>
        </label>
        <br/>
        <button onClick={handleSendRequest}>Send Request</button>
        </>
        }
        {!check &&
        <>
            <h3>Your request has been sent successfully</h3>
            <h3>Please keep an eye on your services to check whether it will be accepted by {selectedWorker.first_name} or not</h3>
            <h3>Have a nice day</h3>
        </>
        }
    </div>
    </>
  )
}

export default AddServiceOrder