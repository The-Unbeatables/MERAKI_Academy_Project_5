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
        console.log(profession);
        axios.post('http://localhost:5000/workers/profession', {
            profession
        })
        .then((result) => {
            console.log(result.data.result);
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
        <h2>{profession}s</h2>
        {workers.map((elem, i) => {
            return(
                <div className='big_container' key={i}>
                    <div className='small_container'>
                        <img src={elem.image} />
                        <h3 className='text_img'><span>{elem.first_name}</span><span> </span><span>{elem.last_name}</span></h3>
                    </div>                    
                    <div>{elem.bio}</div>
                    <div>{elem.yoe} years of experience</div>
                    {isLoggedIn && <div><button onClick={() => {handleButton(elem)}}>Send Request</button></div>}
                </div>
            )
        })}
    </div>
  )
}
//nice
export default ServiceDetails