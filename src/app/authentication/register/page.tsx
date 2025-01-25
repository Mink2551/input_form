"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RegisterPC from '@/app/Components/auth/RegisterPC';
import LoginPC from '@/app/Components/auth/LoginPC';
import CardContentPC from '@/app/Components/auth/CardContentPC';
import LoginPageMobie from '@/app/Components/auth/LoginPageMobie';
import RegisterPageMobie from '@/app/Components/auth/RegisterPageMobie';

function RegisterPage() {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [pageStage, setPageStage] = useState<string>('login'); // Renamed from pageState to pageStage for consistency
    const [showContent, setShowContent] = useState<boolean>(true);

    // Track window size
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleStage = (): void => {
        setShowContent(!showContent);
        setTimeout(() => {
            setShowContent((prevState) => !prevState);
        }, 500);
        setPageStage(pageStage === 'login' ? 'register' : 'login');
    };

    return (
        windowSize.width >= 720 ? (
            <div className="mx-auto flex items-center min-h-[100vh]">
                {/* Card */}
                <div className="bg-gray-100 grid grid-cols-2 relative mx-auto rounded-3xl shadow-2xl w-[700px] min-h-[500px] max-h-[80vh]">
                    {/* Left */}
                    <div className="m-10">
                        {showContent ? (
                            <RegisterPC opa="100%" dura="300" />
                        ) : (
                            <RegisterPC opa="0%" dura="100" />
                        )}
                    </div>

                    {/* Right */}
                    <div className="m-10">
                        {showContent ? (
                            <LoginPC opa="100%" dura="300" />
                        ) : (
                            <LoginPC opa="0%" dura="100" />
                        )}
                    </div>

                    {/* inner Card */}
                    <motion.div
                        initial={{ x: pageStage === 'login' ? "-100" : 0 }}
                        animate={{ x: pageStage === 'login' ? 0 : '100%' }}
                        transition={{ type: 'spring', stiffness: 100, damping: 17 }}
                        className={`absolute min-h-[500px] max-h-[80vh] w-[350px] shadow-2xl ${
                            showContent
                                ? pageStage !== 'register'
                                    ? "rounded-l-3xl rounded-r-[4rem] duration-100"
                                    : "duration-100 rounded-r-3xl rounded-l-[4rem]"
                                : "duration-100 rounded-3xl"
                        } bg-red-600`}
                    >
                        <CardContentPC
                            showContent={showContent}
                            pageStage={pageStage}
                            handleStage={handleStage}
                        />
                    </motion.div>
                </div>
            </div>
        ) : (
            pageStage === "login"? (
                <LoginPageMobie 
                    showContent={showContent}
                    pageStage={pageStage}
                    handleStage={handleStage}/>
            ) : (
                <RegisterPageMobie
                    showContent={showContent}
                    pageStage={pageStage}
                    handleStage={handleStage}/>
            )
        )
    );
}

export default RegisterPage;
