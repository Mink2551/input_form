import React from 'react'
import LoginCardMobie from './LoginCardMobie';

type Props = {
    showContent: boolean;
    pageStage: string;
    handleStage: () => void; // Pass the handleStage function as a prop
  };

function LoginPageMobie({showContent, pageStage, handleStage}: Props) {
  return (
    <div>
        {
            <div className='flex w-fit min-h-screen items-center mx-auto'>
                <div className='opacity-100 duration-[50ms] '>
                    {showContent? (
                        <LoginCardMobie 
                            pageStage={pageStage}
                            handleStage={handleStage}
                            opa='100%'
                            dura='300'
                        />
                    ):(
                        <LoginCardMobie 
                            pageStage={pageStage}
                            handleStage={handleStage}
                            opa='10%'
                            dura='300'
                        />
                    )}
                </div>
            </div>
        }
    </div>
  )
}

export default LoginPageMobie
