'use client';

import Image from 'next/image';

interface Tab {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {

  const tabs: Tab[] = [
    {
      id: 'resources',
      label: 'Ресурси',
      icon: (
        <Image
          src="/media_library/resursi.svg"
          alt="Ресурси"
          width={20}
          height={20}
          className="h-5 w-5 brightness-0 invert"
        />
      ),
    },
    {
      id: 'center',
      label: 'Betr Day',
      icon: (
        <Image
          src="/media_library/betrday.svg"
          alt="Betr Day"
          width={20}
          height={20}
          className="h-5 w-5 brightness-0 invert"
        />
      ),
    },
    {
      id: 'notes',
      label: 'Записки',
      icon: (
        <Image
          src="/media_library/belejki.svg"
          alt="Записки"
          width={20}
          height={20}
          className="h-5 w-5 brightness-0 invert"
        />
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-center px-4">
      <div className="relative flex w-full max-w-[1098px] items-center justify-center gap-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex items-center justify-center min-h-[54px] min-w-[80px]"
            >
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Active indicator */}
                <div
                  className={`absolute flex items-center justify-center rounded-full border border-white shadow-[0_1px_1px_rgba(20,20,20,0.33)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isActive
                    ? 'opacity-100 scale-100 h-11 w-[88px]'
                    : 'opacity-0 scale-95 h-11 w-[88px] pointer-events-none'
                    }`}
                  style={{
                    backgroundColor: '#47a743',
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

