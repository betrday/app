"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  appleSprings,
  appleEasing,
  appleVariants,
  appleButtonAnimations,
  createAppleTransition,
} from "@/lib/apple-animations";

export default function Home() {
  return (
    <motion.div
      className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={createAppleTransition("tween", {
        duration: 0.6,
        ease: appleEasing.easeOut,
      })}
    >
      <motion.main
        className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"
        variants={appleVariants.staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={appleVariants.staggerItem}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={appleSprings.default}
          >
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={20}
              priority
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left"
          variants={appleVariants.staggerItem}
        >
          <motion.h1
            className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50"
            variants={appleVariants.staggerItem}
          >
            To get started, edit the page.tsx file.
          </motion.h1>
          <motion.p
            className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400"
            variants={appleVariants.staggerItem}
          >
            Looking for a starting point or more instructions? Head over to{" "}
            <motion.a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50 underline decoration-1 underline-offset-2"
              whileHover={{ 
                scale: 1.05,
                textDecorationThickness: "2px",
              }}
              transition={appleSprings.default}
            >
              Templates
            </motion.a>{" "}
            or the{" "}
            <motion.a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50 underline decoration-1 underline-offset-2"
              whileHover={{ 
                scale: 1.05,
                textDecorationThickness: "2px",
              }}
              transition={appleSprings.default}
            >
              Learning
            </motion.a>{" "}
            center.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 text-base font-medium sm:flex-row"
          variants={appleVariants.staggerItem}
        >
          <motion.a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={appleButtonAnimations.hover}
            whileTap={appleButtonAnimations.tap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createAppleTransition("spring", {
              springConfig: appleSprings.default,
              delay: 0.4,
            })}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </motion.a>
          <motion.a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 dark:border-white/[.145] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              ...appleButtonAnimations.hover,
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              borderColor: "transparent",
            }}
            whileTap={appleButtonAnimations.tap}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createAppleTransition("spring", {
              springConfig: appleSprings.default,
              delay: 0.5,
            })}
          >
            Documentation
          </motion.a>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
