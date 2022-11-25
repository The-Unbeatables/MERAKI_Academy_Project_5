import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import './style.css';
import { setSelectedWorker } from '../../redux/reducers/workers';
import { useNavigate } from 'react-router-dom';

const ServiceDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [workers, setWorkers] = useState([]);
     const { profession, isLoggedIn } = useSelector((state) => {
        return{
            profession: state.workers.profession,
            isLoggedIn: state.auth.isLoggedIn
        }
    });
    useEffect(() => {
        axios.post('http://localhost:5000/workers/profession', {
            profession
        })
        .then((result) => {
            setWorkers(result.data.result)
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);

    const handleButton = (worker) => {
        dispatch(setSelectedWorker(worker));
        navigate('/services/add')
    }

  return (
    <div className='det'>
        
        {workers.map((elem, i) => {
            return(
                <div className='ser_box' key={i}>
                    <img src={elem.image} />
                    <div className='ser_content'>
                        <h2><span>{elem.first_name}</span><span> </span><span>{elem.last_name}</span></h2>
                        <p>{elem.bio}</p>
                        <p>{elem.yoe} years of experience</p>
                        {isLoggedIn && <div><button className='ser_Btn' onClick={() => {handleButton(elem)}}>Send Request</button></div>}
                    </div>
                </div>
            )
        })}
    </div>
  )
}
export default ServiceDetails