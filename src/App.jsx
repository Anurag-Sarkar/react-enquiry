import Nav from "./components/Nav"
import Routing from "./utils/Routing"
// import Enquiry from "./pages/Enquiry"
// import ThankYou from "./pages/ThankYou"
// import { AnimatePresence } from "framer-motion"
// import Login from "./pages/Login"
// import TokenWrapper from "./components/TokenWrapper"
// import { Route, Routes, useLocation } from "react-router-dom"

const App = () => {

  return (
    <>
      <div className='w-full p-2 h-screen font-extralight bg-neutral-950 text-white'>
        <Nav />
        <Routing/>
      </div>
    </>
  )
}

export default App