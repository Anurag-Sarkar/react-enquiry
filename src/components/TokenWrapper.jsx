/* eslint-disable react/prop-types */
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const TokenWrapper = ({ children }) => {
    const { token } = useContext(AuthContext)
    if(token === null)  return <Navigate to="/" replace /> 
    return children
}

export default TokenWrapper