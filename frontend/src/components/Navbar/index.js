import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./style.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => {
        return{
            isLoggedIn: state.auth.isLoggedIn
        }
    });

  return (
    <>
    {!isLoggedIn && 
        <div className='nav-container'>
        <div className='sub-0' onClick={() => {navigate('/')}}><h1>Home</h1></div>
        <div className='sub-1'><h1>App Name</h1></div>
        <div className='sub-2' onClick={() => {navigate('/register')}}><h1>Sign In</h1></div>
        <div className='sub-3' onClick={() => {navigate('/login')}}><h1>Sign Up</h1></div>
    </div>
    }

    {isLoggedIn && 
        <div className='nav-container'>
        <div><h1>Home</h1></div>
        <div><h1>App Name</h1></div>
        <div><h1>Wishlist</h1></div>
        <div><h1>Cart</h1></div>
        <div><h1>Services</h1></div>
        <div><h1>Logout</h1></div>
    </div>
    }
    </>
  )
}

export default Navbar