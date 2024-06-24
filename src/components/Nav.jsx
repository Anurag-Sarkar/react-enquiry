import {useContext} from "react"
import {AuthContext} from "../context/AuthContext.jsx"
import {useNavigate} from "react-router-dom"
import { axiosInstance } from "../utils/axios.jsx"

const Nav = () => {

  const {token} = useContext(AuthContext)
  const navigate = useNavigate()
  const { setToken } = useContext(AuthContext)

  async function logout(){
    try{
      setToken(null)
      await axiosInstance.post("/logout")
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <nav className="w-full flex items-center justify-between mx-auto p-5 px-10 font-neue text-md md:text-lg  text-neutral-300">
        <p onClick={()=>navigate("/data")}>Sheryians <br /> <span className="text-brand">Coding</span> School</p>
        <div onClick={logout} className={`${token && token != 'ERR_NETWORK' ? 'opacity-1' : 'opacity-0 hidden'} group relative duration-300 w-10 h-10 rounded-full overflow-hidden`}>
            <img className="w-full h-full object-cover" src={token && token.image} />
            <div className="pointer-events-none absolute w-full h-full bg-black opacity-0 group-hover:opacity-70 duration-200 top-0 left-0 flex justify-center items-center">
              <i className="text-white ri-logout-circle-line"></i>
            </div>
        </div>
    </nav>
  )
}

export default Nav