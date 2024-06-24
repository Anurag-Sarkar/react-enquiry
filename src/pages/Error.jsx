import React from 'react'

const Error = () => {
  return (
    <div className='w-full h-[80%] flex flex-col justify-center items-center'>
        <i className="ri-alarm-warning-fill text-5xl text-red-600"></i>
        <p className='text-4xl'>Server Error</p>
    </div>
  )
}

export default Error