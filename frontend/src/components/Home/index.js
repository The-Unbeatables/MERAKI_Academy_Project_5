import React from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='container'>
        <div className='sub-container' onClick={() => {navigate('/services')}}>
            Services
        </div>

        <div className='sub-container' onClick={() => {navigate('/products')}}>
            Products
        </div>
    </div>
  )
}

export default Home