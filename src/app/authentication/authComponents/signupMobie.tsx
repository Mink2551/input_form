import React from 'react'

function signupMobie() {
  return (
    <div>
      <form className='flex flex-col gap-5 w-[90%] mx-auto my-7'>
          <input type="text" className=' bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto' placeholder='Enter Your StudentID'/>
          <input type="email" className=' bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto' placeholder='Enter Your Email'/>
          <input type="password" className=' bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto' placeholder='Enter Your Password'/>
          <input type="password" className=' bg-red-600 border-gray-100 font-medium border-b-2 w-[100%] pr-4 flex mx-auto' placeholder='Confirm Your Password'/>
          <button className='w-fit px-4 py-1.5 text-red-600 shadow-xl hover:bg-SC_Red3 duration-200 font-bold bg-white rounded-xl'>Submit</button>
      </form>
    </div>
  )
}

export default signupMobie
