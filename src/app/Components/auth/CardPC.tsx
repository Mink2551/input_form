import React from 'react'
import Image from 'next/image'
import SC_Logo from '../../../../public/logo_sc.png'

function CardPC({pageStage}: {pageStage:string}) {
  return (
    <div>
      {/* Image */}
      <Image className='mx-auto bg-white rounded-full mt-12' width={100} src={SC_Logo} alt='SC Logo' />
      {/* Header */}
      <h1 className='font-bold w-fit mx-auto mt-3 text-gray-100 text-3xl'>
          {pageStage === 'login' ? '- Login -' : '- Registration -'}
      </h1>
      {/* Hr */}
      <hr className='border-2 border-gray-100 my-5 w-[80%] mx-auto rounded-full' />
      {/* Content */}
      <p className='w-fit mx-auto font-medium text-gray-200'>
          {pageStage === 'login' ? "Don't have an account?" : 'Do You Already Have an Account?'}
      </p>
    </div>
  )
}

export default CardPC
