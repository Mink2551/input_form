import React, { useState, useEffect } from 'react'
import TopcardSelecter from '@/app/Components/Settings/TopcardSelecter';
import Profile from '@/app/Components/Settings/content/profile';
import Department from '@/app/Components/Settings/content/department';
import Contact from '@/app/Components/Settings/content/contact';

function Settings() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [selectedCard, setSelectedCard] = useState<string>('profile');
    const [showContent, setShowContent] = useState<boolean>(true);

    const handleSelect = (card: string):void => {
        setSelectedCard(card);
        setShowContent(!showContent);
        setTimeout(() => {
            setShowContent((prevState) => !prevState);
        }, 200);
    };
    
    useEffect(() => {
      const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);


  return (
    windowSize.width >= 720 ? 
        (
            <div className='w-[80vw] min-h-[100vh] mt-16 relative mx-auto'>
            {/* Header */}
            <TopcardSelecter selectedCard={selectedCard} handleSelect={handleSelect}/>
            {/* Card */}
            <div className='bg-white min-h-[80vh] shadow-md rounded-b-lg rounded-r-lg p-6'>
                {
                    selectedCard === 'profile' ? 
                    (
                        showContent ? (
                            <Profile opa="100%"/>
                        ) : (
                            <Profile opa="0%"/>
                        )
                    ) 
                    : selectedCard === 'department' ? 
                    (
                        showContent ? (
                            <Department opa="100%"/>
                        ) : (
                            <Department opa="0%"/>
                        )
                    ) 
                    : 
                    (
                        showContent ? (
                            <Contact opa="100%"/>
                        ) : (
                            <Contact opa="0%"/>
                        )
                    ) 
                }
            </div>
          </div>
        ) 
            : 
        (
          <div>

          </div>
        )
    )
}

export default Settings
