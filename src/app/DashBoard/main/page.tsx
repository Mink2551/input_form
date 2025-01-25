"use client";

import { Suspense, useState } from 'react';
import React from 'react';
import Sidebar from "../../Components/sidebar";
import Overview from '../../Sections/overview';
import Tables from '@/app/Sections/tables';

function PageContent({ pageState }: { pageState: string }) {
  return (
    <div className="flex-grow py-10 mx-5">
      {pageState === 'overview' && <Overview />}
      {/* {pageState === 'member' && <Adjustment />} */}
      {pageState === 'trophy' && <Tables />}
      {/* {pageState === 'display' && <Members />} */}
      {/* {pageState === 'settings' && <Settings />} */}
    </div>
  );
}

export default function Home() {
  const [pageState, setPageState] = useState('overview');

  return (
    <main className="min-h-[100vh] bg-dashboard flex">
      <Sidebar pageState={pageState} onNavigate={setPageState} />
      <Suspense fallback={<div>Loading page content...</div>}>
        <PageContent pageState={pageState} />
      </Suspense>
    </main>
  );
}
