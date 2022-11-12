import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./style.css"
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../redux/reducers/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
        <div onClick={() => {navigate('/')}}><h1>Home</h1></div>
        <div><h1>App Name</h1></div>
        <div onClick={() => {navigate('/cart')}}><h1>Wishlist</h1></div>
        <div onClick={() => {navigate('/products/orders')}}><h1>Cart</h1></div>
        <div onClick={() => {navigate('/services/orders')}}><h1>Services</h1></div>
        <div onClick={() => {dispatch(setLogout())}}><h1>Logout</h1></div>
    </div>
    }
    </>
  )
}

export default Navbar