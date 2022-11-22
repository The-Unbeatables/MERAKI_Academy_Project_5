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
const [file, setFile] = useState(null);


const {userId ,token}=useSelector((state)=>{
  return {
    userId : state.auth.userId,
    token : state.auth.token
  }
})

// console.log(userId);

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
      console.log(result.data.massage);
      setShow(result.data.massage)
     dispatch(updateWorker(result.data.result))
     
    })
    .catch((err)=>{
     console.log(err);
    })
  }


  const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "eeshop");
    await axios
        .post(`https://api.cloudinary.com/v1_1/dykjbbeoi/upload`, form)
        .then((result) => {
        console.log(result.data.secure_url);
        setImage(result.data.secure_url);
        })
        .catch((err) => {
        console.log(err);
        throw err;
        });
    };


    return(
        <div className="workerProfile">
        {/* <div className="sidebars">
            <SideBar/>
            </div> */}

            
            <div className="contanirProfile">

        <div className="conatan-input">
        <div className="prof">
        <label >Profession</label>
        
        <select className='select' name='rating' onChange={(e)=>{setProfession(e.target.value)}}>

<option  value="none" selected disabled hidden> Choose one from the list </option>  
 <option value="painter">Painter</option>   
 <option value='carpenter'>Carpenter </option>
 <option value='plumber'>Plumber</option>   
 <option value='mechanic'>Mechanic</option>
 <option value='tiler'>Tiler</option>
 <option value='drywaller'>Drywaller</option>
 <option value='smith'>Smith</option>
</select>
        {/* <input
            className="inputprofile"
            type="text"
            
            onChange={(e) => {
              setProfession(e.target.value);
            }}
        ></input> */}
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
            <input
            className="upload-image"
            type="file"
            id="myFile"
            name="filename"
            onChange={(e) => {
            setFile(e.target.files[0]);
            }}
        />

        <button className="upload_image_btn" onClick={()=>{uploadImage()}}>upload</button>
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

