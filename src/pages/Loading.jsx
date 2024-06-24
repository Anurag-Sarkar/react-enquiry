import {SyncLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div className='w-full h-[80%] flex justify-center items-center'>
        <SyncLoader color="white" />
    </div>
  )
}

export default Loading