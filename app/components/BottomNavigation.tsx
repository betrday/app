'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState('center');

  const tabs: Tab[] = [
    {
      id: 'resources',
      label: 'Ресурси',
      icon: (
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 25L27 5L47 25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 25V45C7 46.1046 7.89543 47 9 47H19V35C19 33.8954 19.8954 33 21 33H33C34.1046 33 35 33.8954 35 35V47H45C46.1046 47 47 46.1046 47 45V25"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="27" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'center',
      label: 'Betr Day',
      icon: (
        <svg
          width="56"
          height="53"
          viewBox="0 0 56 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28 0L34.641 20.359L56 26.5L34.641 32.641L28 53L21.359 32.641L0 26.5L21.359 20.359L28 0Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      id: 'notes',
      label: 'Записки',
      icon: (
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="27" cy="18" r="8" stroke="currentColor" strokeWidth="2" />
          <path
            d="M15 42C15 36 20 31 27 31C34 31 39 36 39 42"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-center px-4">
      <div className="relative flex w-full max-w-[1098px] items-center justify-center gap-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative flex items-center justify-center min-h-[54px] min-w-[80px]"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Active indicator */}
                <div
                  className={`absolute flex items-center justify-center rounded-full border border-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive
                    ? 'opacity-100 scale-100 h-11 w-[83px]'
                    : 'opacity-0 scale-95 h-11 w-[83px] pointer-events-none'
                    }`}
                  style={{
                    backgroundColor: 'rgb(73, 160, 8)',
                  }}
                >
                  <div
                    className={`text-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [&>svg]:h-5 [&>svg]:w-5 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                  >
                    {tab.icon}
                  </div>
                </div>
                {/* Inactive label */}
                <div
                  className={`flex items-center justify-center px-4 py-2 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive
                    ? 'opacity-0 scale-95 pointer-events-none'
                    : 'opacity-60 scale-100'
                    }`}
                  style={{ color: '#1a1a1a' }}
                >
                  {tab.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

