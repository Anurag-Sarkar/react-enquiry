import Enquiry from "../pages/Enquiry"
import ThankYou from "../pages/ThankYou"
import { AnimatePresence } from "framer-motion"
import Login from "../pages/Login"
import TokenWrapper from "../components/TokenWrapper"
import { Route, Routes, useLocation } from "react-router-dom"
import Data from "../pages/Data"
import Loading from "../pages/Loading"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import Error from "../pages/Error"

const Routing = () => {
    const {token} = useContext(AuthContext)
    const location = useLocation()
    console.log(token)
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={token === undefined ? <Loading/> : token === "ERR_NETWORK"  ? <Error /> : <Login />} />
                <Route path="/enquiry" element={
                    <TokenWrapper>
                        {token === undefined ? <Loading/> : token === "ERR_NETWORK"  ? <Error />  : <Enquiry />}
                    </TokenWrapper>
                } />
                <Route path="/data" element={
                    <TokenWrapper>
                        {token === undefined ? <Loading/> : token === "ERR_NETWORK"  ? <Error /> : <Data />}
                    </TokenWrapper>
                } />
                <Route path="/thank-you" element={<ThankYou />} />
            </Routes>
        </AnimatePresence>
    )
}

export default Routing