'use client';

import { useState } from 'react';
import BottomNavigation from "./components/BottomNavigation";
import CardSlider from "./components/CardSlider";

export default function Home() {
  const [activeTab, setActiveTab] = useState('center');

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: '#F0E8E6' }}>
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-[1080px] mx-auto flex flex-col items-start justify-start bg-white rounded-b-[60px] mb-20">

        {activeTab === 'center' && (
          <CardSlider />
        )}

        {activeTab === 'resources' && (
          <div className="w-full flex flex-col gap-8 px-6">
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
              <div className="h-[68px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[68px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[118px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[118px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[118px] bg-[#D9D9D9] rounded-[12px]" />
              <div className="h-[118px] bg-[#D9D9D9] rounded-[12px]" />
            </div>
          </div>
        )}

      </main>
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
