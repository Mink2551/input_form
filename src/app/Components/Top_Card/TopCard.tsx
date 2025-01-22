import React from 'react'

function TopCard() {
  return (
    <div className='flex flex-col w-[90vw] max-w-[500px] mx-auto my-auto'>
        <div className='border-4 rounded-t-full border-SC_Red3'></div>
        <div className='flex flex-col shadow-lg h-[150px] rounded-b-lg py-10 justify-between bg-SC_Cream2'>
            <h1 className='mx-auto h-fit text-3xl text-SC_Black font-bold'>SC Admission</h1>
            <hr className='border border-SC_Red2 opacity-40 w-[90%] mx-auto rounded-3xl'/>
      </div>
    </div>
  )
}

export default TopCard
