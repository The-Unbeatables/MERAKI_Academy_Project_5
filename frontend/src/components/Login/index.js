import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin, setUserId } from '../../redux/reducers/auth'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');
    const [value, setValue] = useState('');

    const handleButton = () => {
        if(value === ''){
            setResponse('Please pick either customer or worker')
            return
        }
        axios.post(`http://localhost:5000/login/${value}`, {
            email,
            password
        })
        .then((result) => {
            dispatch(setLogin(result.data.token));
            dispatch(setUserId(result.data.result[0].id));
            if(value === 'customer'){
                navigate('/')
            }else{
                navigate('/worker')
            }
        })
        .catch((err) => {
            console.log(err.response.data.massage);
            setResponse(err.response.data.massage)
        })
    }

  return (
    <div className='login-container'>
        <h3>Login</h3>
        <input type='email' placeholder='Email' onChange={(e) => {setEmail(e.target.value)}}/>
        <input type='password' placeholder='Password' onChange={(e) => {setPassword(e.target.value)}}/>
        <legend>Joining us as:</legend>
        <label><input id="Customer" type="radio" name="Customer-Worker" value="customer"  onClick={(e) => {setValue(e.target.value);}}/> Customer</label>
        <label><input id="Worker" type="radio" name="Customer-Worker" value="worker" onClick={(e) => {setValue(e.target.value);}}/> Worker</label>
        <button onClick={handleButton}>Sign In</button>
        {response && <h3>{response}</h3>}
    </div>
  )
}

export default Login