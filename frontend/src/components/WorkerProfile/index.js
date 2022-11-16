import { useEffect, useState } from "react"
import SideBar from "../SideBar"
import './style.css'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { updateWorker } from "../../redux/reducers/workers"

const WorkerProfile=()=>{
  const [profession, setProfession] = useState('')
  const [yoe, setYOE] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState('')
  const [workerId, setWorkerId] = useState('')
   const dispatch =useDispatch()



const {userId ,token}=useSelector((state)=>{
  return {
    userId : state.auth.userId,
    token : state.auth.token
  }
})



  const getwrkerId = ()=>{
   //${userId} =>>> dont work but if bot number 4 will work 
   if(userId){
    axios.get(`http://localhost:5000/workers/worker/${userId}`)
    .then((result)=>{
    //  console.log(result.data.result.rows[0]);
    setWorkerId(result.data.result.rows[0].id)
    })
    .catch((err)=>{
    console.log(err);
    })
   }
    

 
  }

useEffect(()=>{
  getwrkerId()
},[])



  const handelProfileWorker=()=>{
  
    axios.put(`http://localhost:5000/workers/${workerId}`,{
      profession :profession ,
      YOE :yoe,
      bio:bio,
      image:image
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result)=>{ 
     dispatch(updateWorker(result.data.result))
    })
    .catch((err)=>{
     console.log(err);
    })
  }




    return(
        <div className="workerProfile">
        <div className="sidebars">
            <SideBar/>
            </div>

            
            <div className="contanirProfile">

        
        <div>
        <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Profession</label>
      {/* placeholder="profession" onChange={(e)=>{setProfession(e.target.value)}} */}
      <input onChange={(e)=>{setProfession(e.target.value)}}/>
    </div>
    <div class="form-group col-md-6 cc">
      <label for="inputPassword4">YOE</label>
      {/* <input type="text" class="form-control" placeholder="YOE" onChange={(e)=>{setYOE(e.target.value)}}/> */}
      <input onChange={(e)=>{setYOE(e.target.value)}}/>
    </div>
  </div>
  <div class="form-group divtext">
    <label for="inputAddress">bio</label>
    <textarea class="form-control text" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setBio(e.target.value)}}></textarea>
  </div>
 




  <div class="container py-5">


<div class="row py-4">
    <div class="col-lg-6 mx-auto">

        {/* <!-- Upload image input--> */}
        <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
          <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
            <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0" onChange={(e)=>{setImage(e.target.value)}}/>
            
        </div>

    </div>
</div>
</div>


  <button type="submit" class="btn btn-primary button" onClick={()=>{handelProfileWorker()}}>Sign in</button>
</form>
</div>
            </div>
        
        </div>
    )
}

export default WorkerProfile

