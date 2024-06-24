import Nav from "./components/Nav"
import Routing from "./utils/Routing"

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