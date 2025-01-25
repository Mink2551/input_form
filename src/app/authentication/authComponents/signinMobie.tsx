import React from 'react'

function signinMobie() {
  return (
    <div>
      <form className='flex flex-col gap-7 w-[90%] mx-auto my-7'>
          <input type="email" className=' bg-gray-100 border-gray-300 font-medium border-b-2 w-[100%] pr-4 flex mx-auto' placeholder='Enter Your Email'/>
          <input type="password" className=' bg-gray-100 border-gray-300 font-medium border-b-2 w-[100%] pr-4 flex mx-auto' placeholder='Enter Your Password'/>
          <button className='w-fit px-4 py-1.5 text-gray-100 shadow-xl hover:bg-SC_Red3 duration-200 font-bold bg-SC_Red2 rounded-xl'>Submit</button>
      </form>
    </div>
  )
}

export default signinMobie
