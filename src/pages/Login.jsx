import { useState, useContext, useEffect } from 'react'
import LoginAvatar from '../components/LoginAvatar'
import { motion } from 'framer-motion'
import { axiosInstance } from "../utils/axios"
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const { token, setToken } = useContext(AuthContext)
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])

    useEffect(() => {
        if (token) {
            navigate('/enquiry');
            return
        }
        async function getUsers() {
            try {
                const users = await axiosInstance.get("/login")
                setAvatars(users.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUsers()
    }, [token, navigate]);

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const loginUser = async () => {

        const username = avatars.find((id) => id.id == selectedId)
        try {
            const { data } = await axiosInstance.post("/login", { username: username.username, password })
            console.log(data)
            setToken({ username: data.username, image: data.image })
            navigate("/enquiry")
        } catch (err) {
            console.log(err)
            setPasswordErr(true)
        }

    }

    return (
        <div className="max-w-[60rem] mx-auto flex items-center justify-center ">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className='absolute translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2'>
                <div className='flex relative md:gap-16 gap-10 items-center'>
                    {avatars.map((avatar, index) => (
                        <motion.div 
                            key={index}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: (i) => ({
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: i * 0.1 },
                                }),
                            }}>
                            <LoginAvatar
                                key={avatar.id}
                                id={avatar.id}
                                name={avatar.username}
                                image={avatar.image}
                                isSelected={selectedId == null ? null : selectedId == avatar.id}
                                onClick={setSelectedId}
                            />
                        </motion.div>
                    ))}

                </div>
                <motion.div initial={{ y: 100, opacity: 0 }} animate={typeof (selectedId) == 'number' ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    <div className='relative'>
                        <div className={`${passwordErr ? 'border-red-500' : 'border-transparent'} border-b-[0.01rem] duration-200 border-solid mx-auto bg-neutral-900 mt-5 md:pt-1 md:pb-1.5 pt-0.5 pb-1 px-2 gap-5 rounded-none flex w-[15rem] justify-between items-center `}>
                            <input onInput={(e) => { setPassword(e.target.value), setPasswordErr(false) }} value={password} className='bg-transparent text-xs md:text-sm outline-none w-full' type="password" placeholder='Password' />
                            <i className="ri-eye-line"></i>
                        </div>
                        <button onClick={loginUser} className={`${password ? 'opacity-1' : 'opacity-0'} duration-300 absolute top-0 right-[-3%] bg-brand text-black font-normal px-3 py-1 rounded`}><i className="ri-arrow-right-line"></i></button>

                    </div>
                    <div className='mx-auto mt-3 w-fit text-center'>
                        <p onClick={() => { setSelectedId(null), setPassword("") }} className='cursor-pointer mt-2 text-xs text-neutral-400 underline'>Switch user</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Login
