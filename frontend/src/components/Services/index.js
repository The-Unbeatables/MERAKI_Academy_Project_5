import React, { useState, useEffect } from 'react'
import "./style.css";
import { setProfession } from '../../redux/reducers/workers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (str) => {
        console.log(str);
        dispatch(setProfession(str))
        navigate('/services/details')
    }


    // const { profession } = useSelector((state) => {
    //     return{
    //         profession: state.workers.profession
    //     }
    // });
    // useEffect(() => {
    //     console.log(profession);
    // })
  return (
    <div className='service-container'>
        <div onClick={() => {handleClick('painter')}}><h1>Painters</h1></div>
        <div onClick={() => {handleClick('plumber')}}><h1>Plumbers</h1></div>
        <div onClick={() => {handleClick('carpenter')}}><h1>Carpenters</h1></div>
        <div><h1>profession 4</h1></div>
        <div><h1>profession 5</h1></div>
        <div><h1>profession 6</h1></div>
    </div>
  )
}

export default Services