import Image from "next/image";
import BottomNavigation from "./components/BottomNavigation";

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden font-sans" style={{ backgroundColor: '#F0E8E6' }}>
      <main className="flex-1 overflow-y-auto overflow-x-hidden w-full max-w-[1080px] mx-auto flex flex-col items-start justify-start py-8 px-6 bg-white rounded-b-[60px] mb-20">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-start gap-6 text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-[#1a1a1a]">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-[#2a2a2a]">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-[#1a1a1a]"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-[#1a1a1a]"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
