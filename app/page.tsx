import Image from "next/image";
import BottomNavigation from "./components/BottomNavigation";

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: '#F0E8E6' }}>
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-[1080px] mx-auto flex flex-col items-start justify-start py-8 px-6 bg-white rounded-b-[60px] mb-20">

        <div className="flex flex-col items-start gap-1 text-left">
          <h1 className="max-w-xs text-4xl font-semibold leading-10 tracking-tight text-[#1a1a1a]">
            Betr Day
          </h1>
          <p className="max-w-md text-md leading-6 text-[#2a2a2a]">
            Виж всички  <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-[#1a1a1a]"
            >

            </a>

          </p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
