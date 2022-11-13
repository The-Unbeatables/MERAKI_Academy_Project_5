import { useNavigate } from "react-router-dom"
import './style.css'
const SideBar = ()=>{
    const navigate = useNavigate()
    return(
        <div className="sidBar">
        <h2 className="n">Side Bar</h2>
        <h3 className="profile" onClick={()=>navigate('/worker/profile')}> Profile</h3>
        <h3 className="home" onClick={()=>navigate('/worker')}>Home</h3>
        </div>
    )
}
export default SideBar