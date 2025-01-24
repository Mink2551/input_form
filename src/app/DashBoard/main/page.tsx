"use client";

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect} from 'react';
import Sidebar from "../../Components/sidebar";
import Overview from '../../Sections/overview';

export default function Home() {
  const searchParams = useSearchParams();
  const pageState = searchParams.get('page') || 'overview';

  return (
    <main className="min-h-[100vh] bg-dashboard flex">
      <Sidebar />
      <div className="flex-grow py-10 mx-5 xl:p-10">
        {pageState === 'overview' && <><Overview/></>}
        {pageState === 'member'   && <></>}
        {pageState === 'trophy'   && <></>}
        {pageState === 'display'  && <></>}
        {pageState === 'settings' && <></>}
      </div>
    </main>
  );
}
