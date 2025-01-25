"use client";

import Image from 'next/image';
import Logo from '../../../public/logo_sc.png';
import { MdMenuOpen, MdOutlineMenu, MdDisplaySettings } from "react-icons/md";
import { FaHome, FaTrophy } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { useState, useEffect } from 'react';

const SidebarElements: React.FC<{ pageState: string; handlePageState: (page: string) => void }> = ({ pageState, handlePageState }) => {
  return (
    <div>
      <hr className="border-SC_Red2 border my-10 w-[90%] mx-auto" />
      <div className="text-gray-400 flex flex-col gap-5 mx-auto w-fit text-3xl">
        <FaHome aria-label="Home" onClick={() => handlePageState('overview')} className={`duration-300 cursor-pointer p-1 ${pageState === 'overview' ? "bg-red-500 rounded-md text-SC_Cream2" : ""}`} />
        <IoPerson aria-label="Member" onClick={() => handlePageState('member')} className={`duration-300 cursor-pointer p-1 ${pageState === 'member' ? "bg-red-500 rounded-md text-SC_Cream2" : ""}`} />
        <FaTrophy aria-label="Trophy" onClick={() => handlePageState('trophy')} className={`duration-300 cursor-pointer p-1 ${pageState === 'trophy' ? "bg-red-500 rounded-md text-SC_Cream2" : ""}`} />
        <MdDisplaySettings aria-label="Display" onClick={() => handlePageState('display')} className={`duration-300 cursor-pointer p-1 ${pageState === 'display' ? "bg-red-500 rounded-md text-SC_Cream2" : ""}`} />
        <FiSettings aria-label="Settings" onClick={() => handlePageState('settings')} className={`duration-300 cursor-pointer p-1 ${pageState === 'settings' ? "bg-red-500 rounded-md text-SC_Cream2" : ""}`} />
      </div>
      <hr className="border-SC_Red2 border my-10 w-[90%] mx-auto" />
    </div>
  );
};

export default function Sidebar({ pageState, onNavigate }: { pageState: string; onNavigate: (page: string) => void }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const handleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-[70px] h-[90vh] sticky top-12 left-2">
      {windowSize.width <= 720 ? (
        isSidebarOpen ? (
          <div className="h-[90vh] cursor-pointer absolute w-[70px] bg-SC_Cream2 rounded-2xl shadow-2xl duration-300">
            <div onClick={handleSidebar} className="absolute -right-8 text-3xl font-bold text-SC_Red1 top-3">
              <MdMenuOpen />
            </div>
            <Image alt="SC Logo" width={60} className="mx-auto relative top-2" src={Logo} />
            <SidebarElements pageState={pageState} handlePageState={onNavigate} />
          </div>
        ) : (
          <div className="h-[90vh]  cursor-pointer absolute w-[70px] -translate-x-[115%] bg-SC_Cream2 rounded-2xl shadow-2xl duration-300">
            <div onClick={handleSidebar} className="absolute -right-8 text-3xl font-bold text-SC_Red1 top-3">
              <MdOutlineMenu />
            </div>
            <Image alt="SC Logo" width={60} className="mx-auto relative top-2" src={Logo} />
            <SidebarElements pageState={pageState} handlePageState={onNavigate} />
          </div>
        )
      ) : (
        <div className="h-[90vh] bg-SC_Cream2 rounded-2xl shadow-2xl w-[70px]">
          <Image alt="SC Logo" width={60} className="mx-auto relative top-2" src={Logo} />
          <SidebarElements pageState={pageState} handlePageState={onNavigate} />
        </div>
      )}
    </div>
  );
}
