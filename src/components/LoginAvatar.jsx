/* eslint-disable react/prop-types */
import {motion} from 'framer-motion'
import { useRef } from 'react'

const LoginAvatar = ({id,name,image,isSelected,onClick}) => {
    const avatar = useRef()

    const center = avatar.current ? (avatar.current.parentElement.parentElement.clientWidth / 2) : 0
    
    function generateCenter(){
        return center - (32 * (1 + ((id-1) * 4)))
    }
    console.log(generateCenter())
    return (
        <motion.div ref={avatar} onClick={()=>onClick(id)} animate={isSelected == null ? { opacity: 1} : isSelected ? { opacity: 1,x:generateCenter() } : { opacity: 0 }} transition={{ duration: 0.3, ease:"easeInOut" }} className={`left-1/3  flex flex-col items-center `}>
            <div className='rounded-full overflow-hidden md:w-16 md:h-16 w-10 h-10'>
                <img className='w-full h-full object-cover' src={image} alt="" />
            </div>
            <p className='font-neue text-xs md:text-base mt-2'>{name}</p>
        </motion.div>
    )

}

export default LoginAvatar