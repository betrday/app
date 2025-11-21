'use client';

import { useState } from 'react';
import BottomNavigation from "./components/BottomNavigation";

export default function Home() {
  const [activeTab, setActiveTab] = useState('center');

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: '#F0E8E6' }}>
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-[1080px] mx-auto flex flex-col items-start justify-start py-8 px-6 bg-white rounded-b-[60px] mb-20">

        {activeTab === 'center' && (
          <div className="flex flex-col items-start gap-1 text-left">
            <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-[#1a1a1a]">
              Betr Day
            </h1>
            <div className="flex items-center gap-1 max-w-md text-md leading-6 text-[#2a2a2a]">
              <span>Виж всички</span>
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-[#1a1a1a] flex items-center justify-center"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="w-full flex flex-col gap-8">
            <h1 className="text-4xl font-semibold text-[#1a1a1a]">Ресурси</h1>

            <div className="relative w-full">
              <input
                type="text"
                placeholder="Търси..."
                className="w-full h-12 pl-12 pr-4 rounded-full bg-[#F2F2F2] text-[#1a1a1a] placeholder-[#8E8E93] focus:outline-none focus:ring-2 focus:ring-[#1a1a1a]/10 transition-all"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E93]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="h-[136px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[136px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[236px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[236px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[236px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[236px] bg-[#D9D9D9] rounded-[12px]" />
            </div>
          </div>
        )}

      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
