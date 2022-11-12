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
    <nav>
    <input type="checkbox" id="check" />
    <label for="check" class="checkbtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
    </label>
    <label class="logo">Maintinance App</label>
    <ul>
      <li onClick={() => {navigate('/')}}><a>Home</a></li>
      <li onClick={() => {navigate('/register')}}><a>Sign Up</a></li>
      <li onClick={() => {navigate('/login')}}><a>Sign In</a></li>
      {/* <li><a href="#">Services</a></li> */}
      {/* <li><a href="#">Logout</a></li> */}
    </ul>
  </nav>

    //     <div className='nav-container'>
    //     <div className='sub-0' onClick={() => {navigate('/')}}><h1>Home</h1></div>
    //     <div className='sub-1'><h1>App Name</h1></div>
    //     <div className='sub-2' onClick={() => {navigate('/register')}}><h1>Sign In</h1></div>
    //     <div className='sub-3' onClick={() => {navigate('/login')}}><h1>Sign Up</h1></div>
    // </div>
    }

    {isLoggedIn && 

        <nav>
            <input type="checkbox" id="check" />
            <label for="check" class="checkbtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
            </label>
             <label class="logo">Maintinance App</label>
             <ul>
                <li onClick={() => {navigate('/')}}><a className='aa'>Home</a></li>
                <li onClick={() => {navigate('/cart')}}><a>Wishlist</a></li>
                <li onClick={() => {navigate('/products/orders')}}><a>Cart</a></li>
                <li onClick={() => {navigate('/services/orders')}}><a>Services</a></li> 
                <li onClick={() => {dispatch(setLogout())}}><a>Logout</a></li>
            </ul>
        </nav>
    //     <div className='nav-container'>
    //     <div onClick={() => {navigate('/')}}><h1>Home</h1></div>
    //     <div><h1>App Name</h1></div>
    //     <div onClick={() => {navigate('/cart')}}><h1>Wishlist</h1></div>
    //     <div onClick={() => {navigate('/products/orders')}}><h1>Cart</h1></div>
    //     <div onClick={() => {navigate('/services/orders')}}><h1>Services</h1></div>
    //     <div onClick={() => {dispatch(setLogout())}}><h1>Logout</h1></div>
    // </div>
    }
    </>
  )
}

export default Navbar