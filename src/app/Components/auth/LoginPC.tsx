import React from 'react'
import SigninPC from '@/app/authentication/authComponents/signinPC';

function LoginPC({ opa, dura }: { opa: string; dura: string }) {
  return (
    <div style={{ opacity: opa, transitionDuration: `${dura}ms` }}>
        <h2 className='font-bold text-2xl w-fit mx-auto text-SC_Red2'>- Login -</h2>
        <hr className='border w-[90%] mx-auto my-5 border-SC_Red2 rounded-xl'/>
        <SigninPC/>
    </div>
  )
}

export default LoginPC
