"use client";

import { Suspense, useState } from 'react';
import React from 'react';
import Sidebar from "../../../Components/Navigation/sidebar";
import Overview from '../Components/overview';
import Tables from '@/app/Sections/DashBoard/Components/tables';
import Settings from '../Components/Settings';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function PageContent({ pageState }: { pageState: string }) {

  return (
    <div className="flex-grow py-10 mx-5">
      {pageState === 'overview' && <Overview />}
      {/* {pageState === 'member' && <Adjustment />} */}
      {pageState === 'trophy' && <Tables />}
      {/* {pageState === 'display' && <Members />} */}
      {pageState === 'settings' && <Settings />}
    </div>
  );
}


export default function Home() {
  const { data: session } = useSession()
  const [pageState, setPageState] = useState('overview');

  return (
    <main className="min-h-[100vh] bg-dashboard flex">
      {
        !session? (
        <Link href='/Sections/authentication/register' className='z-10 fixed mt-2 w-fit rounded-lg shadow-xl flex text-center right-3 max-w-[80vw] hover:text-red-400 cursor-pointer duration-300 bg-white px-5 py-2'>Do you already have an account? Login in Now! <span className='ml-1 text-red-500'>Click Here</span></Link>
        ) :""
      }
      <Sidebar pageState={pageState} onNavigate={setPageState} />
      <Suspense fallback={<div>Loading page content...</div>}>
        <PageContent pageState={pageState} />
      </Suspense>
    </main>
  );
}
