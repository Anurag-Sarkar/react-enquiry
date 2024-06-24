import { motion } from "framer-motion"
import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'

const ThankYou = () => {
    const navigate = useNavigate()

    useEffect(()=>{
      setTimeout(()=>{
        navigate("/enquiry")
      },4000)
    },[])

    return (
      <>
          <div className="mx-auto h-2/3 flex justify-center items-center max-w-[60rem] p-5">
            <motion.div  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.8}}>
              <h1 className="text-center font-neue text-3xl  md:text-4xl">Thank You</h1>
              <p className="text-center text-brand text-sm md:text-lg font-normal">Happy Coding 💻</p>
            </motion.div>
          </div>  
      </>
    )
}

export default ThankYou