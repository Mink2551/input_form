import React from 'react';
import SignupPC from '@/app/Sections/authentication/authComponents/signupPC';

function RegisterPC({ opa, dura }: { opa: string; dura: string }) {
  return (
    <div style={{ opacity: opa, transitionDuration: `${dura}ms` }}>
      <h2 className='font-bold text-2xl w-fit mx-auto text-SC_Red2'>- Register -</h2>
      <hr className='border w-[90%] mx-auto my-5 border-SC_Red2 rounded-xl' />
      <SignupPC/>
    </div>
  );
}

export default RegisterPC;
