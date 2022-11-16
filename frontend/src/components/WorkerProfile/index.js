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

const [show, setShow] = useState('')

const {userId ,token}=useSelector((state)=>{
  return {
    userId : state.auth.userId,
    token : state.auth.token
  }
})

console.log(userId);

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
      console.log(result.data.massage);
      setShow(result.data.massage)
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

        <div className="conatan-input">
        <div className="prof">
        <label >Profession</label>
        <input
            className="inputprofile"
            type="text"
            
            onChange={(e) => {
              setProfession(e.target.value);
            }}
        ></input>
        </div>

        <div className="prof">
       <label >Years of experience</label>
        <input
          className="inputprofile"
            type="text"
            onChange={(e) => {
              setYOE(e.target.value);
            }}
        ></input>
      </div>
      </div>
      
      <div className="textarea">
      <label >bio</label>
        <textarea
            className="input-textarea"
            type="text"
            onChange={(e) => {
              setBio(e.target.value);
            }}
        ></textarea>
</div>
    <div className="upload-imag">
     <label id="upload-label" for="upload" class="font-weight-light text-muted">Choose file</label>
            <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0" onChange={(e)=>{setImage(e.target.value)}}/>
       </div>       



    <div className="button-ubdate">
      <button type="submit" class="btn btn-primary button" onClick={()=>{handelProfileWorker()}}>Update Information</button>
      </div>
    <div className="show-Message">
      {show && <div className="show">{show}</div>}
    </div>
            </div>
        
        </div>
    )
}

export default WorkerProfile

