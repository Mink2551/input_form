import React from 'react'
import RegisterCardMobie from './RegisterCardMobie';

type Props = {
    showContent: boolean;
    pageStage: string;
    handleStage: () => void; // Pass the handleStage function as a prop
  };

function RegisterPageMobie({showContent, pageStage, handleStage}: Props) {
  return (
    <div>
      {
        <div className='flex w-fit min-h-screen items-center mx-auto'>
            {showContent? (
                <RegisterCardMobie 
                    pageStage={pageStage}
                    handleStage={handleStage}
                    opa="100%"
                    dura='300'
                    />
                ):(
                    <RegisterCardMobie 
                    pageStage={pageStage}
                    handleStage={handleStage}
                    opa="10%"
                    dura='300'
                    />
                )}
        </div>
      }
    </div>
  )
}

export default RegisterPageMobie
