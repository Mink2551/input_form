import React from 'react'

function profile({opa}: {opa:string}) {
  return (
    <div style={{opacity: opa}} className='mt-10 grid grid-cols-2 duration-300'>
        {/* Header */}
        <div className='border-b-4 rounded-2xl p-5 border-SC_Red3 border-l-4 shadow-2xl h-[300px] max-w-[500px]'>
            <h2 className='font-bold text-xl text-gray-600'>Profile Details</h2>
        </div>
    </div>
  )
}

export default profile
