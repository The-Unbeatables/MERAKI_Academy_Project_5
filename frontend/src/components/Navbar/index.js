import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./style.css"
import { useNavigate } from 'react-router-dom'
import { setLogout } from '../../redux/reducers/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoggedIn, isAdmin, isWorker } = useSelector((state) => {
        return{
            isLoggedIn: state.auth.isLoggedIn,
            isAdmin: state.auth.isAdmin,
            isWorker: state.auth.isWorker
        }
    });

  return (
    <>
    {!isLoggedIn && 
    <nav>
    <input type="checkbox" id="check" />
    <label htmlFor="check" className="checkbtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
    </label>
    <label className="logo">Ready To Serve</label>
    <ul>
      <li onClick={() => {navigate('/')}}><a>Home</a></li>
      <li onClick={() => {navigate('/register')}}><a>Sign Up</a></li>
      <li onClick={() => {navigate('/login')}}><a>Sign In</a></li>

    </ul>
  </nav>

    }

    {isLoggedIn && !isAdmin && !isWorker &&

        <nav>
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="checkbtn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
            </label>
             <label className="logo">Ready To Serve</label>
             <ul>
                <li onClick={() => {navigate('/')}}><a className='aa'>Home</a></li>
                <li onClick={() => {navigate('/cart')}}><a>Wishlist</a></li>
                <li onClick={() => {navigate('/products/orders')}}><a>Cart</a></li>
                <li onClick={() => {navigate('/services/orders')}}><a>Services</a></li> 
                <li onClick={() => {dispatch(setLogout()); navigate('/')}}><a>Logout</a></li>
            </ul>
        </nav>
    }
{isLoggedIn && !isAdmin && isWorker &&

<nav>
    <input type="checkbox" id="check" />
    <label htmlFor="check" className="checkbtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
    </label>
     <label className="logo">Ready To Serve</label>
     <ul>
        <li onClick={() => {navigate('/worker')}}><a className='aa'>Home</a></li>
        <li onClick={() => {navigate('/worker/profile')}}><a>Profile</a></li>
        {/* <li onClick={() => {navigate('/products/orders')}}><a>Cart</a></li>
        <li onClick={() => {navigate('/services/orders')}}><a>Services</a></li> */}
        <li onClick={() => {dispatch(setLogout()); navigate('/')}}><a>Logout</a></li> 
    </ul>
</nav>
}

{ isAdmin && isLoggedIn &&

<nav>
    <input type="checkbox" id="check" />
    <label htmlFor="check" className="checkbtn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 16 16"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>
    </label>
     <label className="logo">Ready To Serve</label>
     <ul>
        <li onClick={() => {navigate('/admin')}}><a>Home</a></li>
        <li onClick={() => {navigate('/admin/users')}}><a>Users</a></li>
        <li onClick={() => {navigate('/admin/products')}}><a>Products</a></li>
        <li onClick={() => {navigate('/admin/orders')}}><a>Orders</a></li>
        <li onClick={() => {dispatch(setLogout()); navigate('/')}}><a>Logout</a></li>
    </ul>
</nav>
}
    </>
  )
}

export default Navbar