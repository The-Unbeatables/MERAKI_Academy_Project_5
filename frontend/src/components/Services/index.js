import React, { useState, useEffect } from 'react'
import "./style.css";
import { setProfession } from '../../redux/reducers/workers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (str) => {
        dispatch(setProfession(str))
        navigate('/services/details')
    }

    const arr = [{name: 'Painters', img: 'https://media.istockphoto.com/id/509040406/photo/painter-painting-a-wall-with-paint-roller.jpg?s=612x612&w=0&k=20&c=XRAosOBMqY1WKs_j2Bdt_rlH45-aXu74kMpkfaf5klU=', state: 'painter'},
    {name: 'Carpenters', img: 'https://media.istockphoto.com/id/1218972142/photo/male-student-studying-for-carpentry-apprenticeship-at-college-using-wood-plane.jpg?s=612x612&w=0&k=20&c=0X0ivemNRIEEuB5dPJHtLsPAH_oUMBMC9yTzG0FcebQ=', state: 'carpenter'},
    {name: 'Plumbers', img: 'https://www.build-review.com/wp-content/uploads/2021/04/plumber.jpg', state: 'plumber'},
    {name: 'Mechanics', img: 'https://image.shutterstock.com/image-photo/professional-car-mechanic-examining-engine-260nw-1849860154.jpg', state: 'mechanic'}
  ]
    // const { profession } = useSelector((state) => {
    //     return{
    //         profession: state.workers.profession
    //     }
    // });
    // useEffect(() => {
    //     console.log(profession);
    // })

    return(
      <div className='bigg'>
        {arr.map((elem, i) => {
          return(
            <div className='testtt'>
            <div class="containerOfService">
              <img src={elem.img} alt={elem.state} />
              <div class="overlay">
              <div class="content">
                <h3>{elem.name}</h3>
                <button className='service-btn' onClick={() => {handleClick(`${elem.state}`)}}>Show {elem.name}</button>
              </div>
              </div>
            </div>
            </div>
          )
        })}
      </div>
    )

}

export default Services