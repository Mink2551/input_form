import React from 'react';
import CardPC from '@/app/Components/auth/CardPC';

type Props = {
  showContent: boolean;
  pageStage: string;
  handleStage: () => void; // Pass the handleStage function as a prop
};

function CardContentPC({ showContent, pageStage, handleStage }: Props) {
  return (
    <div>
      {
        showContent ? (
          <div className='opacity-100 duration-300'>
            <CardPC pageStage={pageStage} />
            {/* Button */}
            <div className='w-fit flex mx-auto mt-5'>
              <button
                onClick={handleStage} // Use the handleStage function passed as a prop
                className='text-red-600 hover:bg-gray-300 transition-all font-medium px-4 py-2 rounded-xl shadow-2xl bg-gray-200'
              >
                {pageStage === 'login' ? 'Click Here For Sign Up' : 'Click Here For Sign In'}
              </button>
            </div>
          </div>
        ) : (
          <div className='opacity-0 duration-[50ms]'>
            <CardPC pageStage={pageStage} />
            {/* Button */}
            <div className='w-fit flex mx-auto mt-5'>
              <button
                onClick={handleStage} // Use the handleStage function passed as a prop
                className='text-red-600 hover:bg-gray-300 transition-all font-medium px-4 py-2 rounded-xl shadow-2xl bg-gray-200'
              >
                {pageStage === 'login' ? 'Click Here For Sign Up' : 'Click Here For Sign In'}
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default CardContentPC;
