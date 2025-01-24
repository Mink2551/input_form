"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import Sidebar from "../../Components/sidebar";
import Overview from '../../Sections/overview';
import Tables from '@/app/Sections/tables';
import Adjustment from '@/app/Sections/adjustment';
import Settings from '@/app/Sections/settings';
import Members from '@/app/Sections/members';

function PageContent() {
  const searchParams = useSearchParams();
  const pageState = searchParams.get('page') || 'overview';

  return (
    <div className="flex-grow py-10 mx-5 xl:p-10">
      {pageState === 'overview' && <Overview />}
      {pageState === 'member' && <Adjustment />}
      {pageState === 'trophy' && <Tables />}
      {pageState === 'display' && <Members />}
      {pageState === 'settings' && <Settings />}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-[100vh] bg-dashboard flex">
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    </main>
  );
}