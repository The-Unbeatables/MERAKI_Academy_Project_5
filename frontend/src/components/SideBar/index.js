import { useNavigate } from "react-router-dom"
import './style.css'
const SideBar = ()=>{
    const navigate = useNavigate()
    return(
        <>
        <h2 className="n">Side Bar</h2>
        <h3 onClick={()=>navigate('/worker/profile')}> Profile</h3>
        <h3 onClick={()=>navigate('/worker')}>Home</h3>
        </>
    )
}
export default SideBar