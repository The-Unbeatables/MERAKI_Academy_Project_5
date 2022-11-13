import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../../redux/reducers/auth';
import "./style.css";

const AdminUsers = () => {

  const [counter, setCounter] = useState(0)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch();

  const handleNext = () => {
    if(counter+4<users.length){
      setCounter(counter+4);
      setPage(page+1)
    }
  
  }
  const handlePrevious = () => {
    if(counter>0){
      setCounter(counter-4)
      setPage(page-1)
    }
    
  }

  const {users} = useSelector((state) => {
    return{
      users: state.auth.users
    }
  })

  useEffect(() => {
    axios.get('http://localhost:5000/users')
    .then((result) => {
      // console.log(result.data.result);
      dispatch(setUsers(result.data.result));
      console.log(users[0].role_id);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className='admin_users'>
      <div className='row-admin'>

        <div  className='first'>
          <h3 className='bold'>#</h3>
        </div>

        <div className='second'>
          <h3 className='bold'>Name</h3>
        </div>
          
        <div className='third'>
          <h3 className='bold'>Email</h3>
        </div>

        <div className='fourth'>
          <h3 className='bold'>Role</h3>
        </div>

        <div className='fifth'>
          <h3 className='bold'>Member Since</h3>
        </div>

        <div className='sixth'>
          <h3 className='bold'>Action</h3>
        </div>

      </div>
      {users.slice(counter,counter+4).map((elem, i) => {
        return(
          <div className='row-admin1'>
            <div className='first'>
            <h3>{i + counter + 1}</h3>
            </div>

            <div className='second'>
            <h3><span>{elem.first_name}</span><span> </span><span>{elem.last_name}</span></h3>
            </div>

            <div className='third'>
              <h3>{elem.email}</h3>
            </div>
              
            <div className='fourth'>
              {elem.role_id === 1 && <h3>Admin</h3> } 
              {elem.role_id === 2 && <h3>Customer</h3> }           
              {elem.role_id === 3 && <h3>Worker</h3>} 
            </div>

            <div className='fifth'>
            <h3>{elem.created_at.split('T')[0]}</h3>
            </div>

            <div className='sixth'>
            <button>Delete</button>
            <button>Upgrade</button>
            </div>
            
          </div>

        )
      })}
      <div className='btn'>
        <div className='btns'>
          <button className='change' onClick={handlePrevious}>Previous</button>
          <button className='number'>{page}</button>
          <button className='change' onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers