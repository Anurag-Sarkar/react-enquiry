/* eslint-disable react/prop-types */
import { useEffect, useState, createContext } from 'react'
import { axiosInstance } from '../utils/axios'
export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(undefined)
    useEffect(() => {
        async function checkAuth(){
            try{
                const {data} = await axiosInstance.post('/check-auth')
                setToken({username:data.username,image:data.image})
            }catch(err){
                console.log(err)
                if(err.code == "ERR_NETWORK") return setToken("ERR_NETWORK")
                setToken(null)
            }
        }
        checkAuth()
    },[])

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider