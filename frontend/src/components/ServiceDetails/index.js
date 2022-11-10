import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './style.css'

const ServiceDetails = () => {

    const [workers, setWorkers] = useState([]);
     const { profession, isLoggedIn } = useSelector((state) => {
        return{
            profession: state.workers.profession,
            isLoggedIn: state.auth.isLoggedIn
        }
    });
    useEffect(() => {
        console.log(profession);
        axios.post('http://localhost:5000/workers/profession', {
            profession: "painter"
        })
        .then((result) => {
            console.log(result.data.result);
            setWorkers(result.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

  return (
    <div className='det'>
        {workers.map((elem, i) => {
            return(
                <div className='rowContainer'>
                    <div><h3><span>{elem.first_name}</span><span> </span><span>{elem.last_name}</span></h3></div>
                    <div><img src='{elem.image}' /></div>
                    <div>{elem.bio}</div>
                    <div>{elem.yoe} years of experience</div>
                    {isLoggedIn && <div><button>Send Request</button></div>}
                </div>
            )
        })}
    </div>
  )
}
//nice
export default ServiceDetails