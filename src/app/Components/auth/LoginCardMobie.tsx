import React from 'react'
import Image from 'next/image'
import SC_Logo from '../../../../public/logo_sc.png'
import SigninMobie from '@/app/Sections/authentication/authComponents/signinMobie';

type Props = {
    pageStage: string;
    handleStage: () => void; // Pass the handleStage function as a prop
    opa: string;
    dura: string;
  };

function LoginCardMobie({ pageStage, handleStage, opa , dura}: Props) {
  return (
    <div style={{ opacity: opa, transitionDuration: `${dura}ms` }} className=' w-[90vw] border-x-4 border-red-600 h-[90vh] max-h-[450px] rounded-xl bg-gray-100'>
        <div className='flex w-fit mx-auto'>
             <Image className='ml-5 bg-gray-200 shadow-2xl rounded-full mt-5' width={110} src={SC_Logo} alt='SC Logo' />
             <div className='flex flex-col'>
                 <h1 className='mr-5 font-bold h-fit w-fit ml-4 mt-[30px] text-red-600 text-3xl'>
                     {pageStage === 'login' ? 'Login' : 'Registration'}
                 </h1>
                 {/* Button */}
                 <div className='w-fit flex mx-auto mt-2'>
                     <button
                         onClick={handleStage}
                         className='text-white hover:bg-red-600 transition-all font-medium px-3 py-1 rounded-xl shadow-2xl bg-red-500'
                     >
                         {pageStage === 'login' ? 'Sign Up?' : 'Sign In?'}
                     </button>
                 </div>
             </div>
         </div>
         {/* Hr */}
         <hr className='border-2 border-red-600 my-5 w-[80%] mx-auto rounded-full' />
         {/* Login */}
         <div className='opacity-100 duration-300'>
             <SigninMobie/>
         </div>
    </div>
  )
}

export default LoginCardMobie
