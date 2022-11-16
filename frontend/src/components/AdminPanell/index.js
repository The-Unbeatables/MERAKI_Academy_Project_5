import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./style.css"

const AdminPanell = () => {

  const {token} = useSelector((state) => {
    return{
        token: state.auth.token
    }   
});
  const [users, setUsers] = useState([]);

  const [workersNum, setWorkersNum] = useState(0);
  const [usersNum, setUsersNum] = useState(0);
  const [productsNum, setProductsNum] = useState(0);
  const [productOrdersNum, setProductOrdersNum] = useState(0);
  const [income, setIncome] = useState(0);
  const [serviceOrdersNum, setServiceOrdersNum] = useState(0);


  const getAllTheUsers = () => {
    axios.get('http://localhost:5000/users')
    .then((result) => {
      setUsersNum(result.data.result.length)
      setUsers(result.data.result)
      let workerArray = result.data.result.filter((elem, i) => {
        return elem.role_id === 3
      })
      setWorkersNum(workerArray.length)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getAllTheProducts = () => {
    axios.get('http://localhost:5000/products')
    .then((result) => {
      setProductsNum(result.data.result.length)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const getAllTheServiceOrders = () => {
    axios.get('http://localhost:5000/ServiceOrders')
    .then((result) => {
      setServiceOrdersNum(result.data.result.length)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const getAllTheProductOrders = () => {
    axios.get('http://localhost:5000/productOrders/all/admin')
    .then((result) => {
      console.log(result.data.result);
      setProductOrdersNum(result.data.result.length)
      let total =0
      result.data.result.map((elem, i) => {
        total+=elem.price
      })
      setIncome(total * 10)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  
  useEffect(() => {
    getAllTheUsers();
    getAllTheProducts();
    getAllTheServiceOrders();
    getAllTheProductOrders();

  },[])
  return (
    <>
    <div className='biggestss'>  {/* Biggest container*/}

       <div className='stat-container'> {/*Stats*/}

       <div className='stats'>
        <div className='left_adm'>
            <h2 className='num_stat'>{income} $</h2>
            <h2 className='text_stat'>Income</h2>
        </div>
        <div className='right_adm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16"><path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/></svg>
        </div>
        </div>

        <div className='stats'>
          <div className='left_adm'>
            <h2 className='num_stat'>{usersNum}</h2>
            <h2 className='text_stat'>Users</h2>
          </div>
          <div className='right_adm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/></svg>
          </div>
        </div>

        <div className='stats'>
          <div className='left_adm'>
            <h2 className='num_stat'>{workersNum}</h2>
            <h2 className='text_stat'>Workers</h2>
          </div>
          <div className='right_adm'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wrench-adjustable" viewBox="0 0 16 16"><path d="M16 4.5a4.492 4.492 0 0 1-1.703 3.526L13 5l2.959-1.11c.027.2.041.403.041.61Z"/><path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.49 4.49 0 0 0 11.5 9Zm-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376ZM3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/></svg>
          </div>
        </div>

        <div className='stats'>
          <div className='left_adm'>
            <h2 className='num_stat'>9</h2>
            <h2 className='text_stat'>Proffesions</h2>
          </div>
          <div className='right_adm'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools" viewBox="0 0 16 16"><path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/></svg>
          </div>
        </div>

        <div className='stats'>
          <div className='left_adm'>
            <h2 className='num_stat'>{productsNum}</h2>
            <h2 className='text_stat'>Products</h2>
          </div>
          <div className='right_adm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-fill" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"/></svg>
          </div>
        </div>

        <div className='stats'>
          <div className='left_adm'>
            <h2 className='num_stat'>{serviceOrdersNum}</h2>
            <h2 className='text_stat'>Service Orders</h2>
          </div>
          <div className='right_adm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket2" viewBox="0 0 16 16"><path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"/><path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"/></svg>
          </div>
        </div>

        <div className='stats'>
          <div className='left_adm'>
            <h2 className='num_stat'>{productOrdersNum}</h2>
            <h2 className='text_stat'>Product Orders</h2>
          </div>
          <div className='right_adm'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16"><path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"/></svg>
          </div>
        </div>
      </div>
      

      <div className='recent'>
         <div className='animat'>
         <h3 className='name'>Recent Joiners</h3>
         </div>
        <div>
          <div className='roshan'>
            <div className='huskar'><h3>Name</h3></div>
            <div className='huskar'><h3>Email</h3></div>
            <div className='huskar'><h3>Role</h3></div>
            <div className='huskar'><h3>Joined at</h3></div>
          </div>
          {
            users.slice(0,5).map((elem, i) => {
              return(
                <div className='roshan' key={i}>
                    <div className='huskar'><h4>{elem.first_name}<span> </span>{elem.last_name}</h4></div>

                    <div className='huskar'><h4>{elem.email}</h4></div>

                    <div className='huskar'>
                      {elem.role_id === 1 && <h4>Admin</h4> } 
                      {elem.role_id === 2 && <h4>Customer</h4> }           
                      {elem.role_id === 3 && <h4>Worker</h4>} 
                    </div>

                    <div className='huskar'><h4>{elem.created_at.split('T')[0]}</h4></div>
                </div>
              )
            })

          }
          
        </div>
      </div>

      </div>

    </>
  )
}
//#f1f1f1
export default AdminPanell