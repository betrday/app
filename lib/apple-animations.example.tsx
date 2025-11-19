/**
 * Example usage of Apple-style animations
 * 
 * This file demonstrates how to use the Apple animation presets
 * to replicate Apple's animation style in your React/Next.js app.
 */

"use client";

import { motion } from "framer-motion";
import {
  appleSprings,
  appleEasing,
  appleVariants,
  appleButtonAnimations,
  createAppleTransition,
  createPageTransition,
  createModalVariants,
} from "@/lib/apple-animations";

// Example 1: Basic fade-in with Apple's spring physics
export function FadeInExample() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={appleSprings.default}
    >
      Content fades in smoothly
    </motion.div>
  );
}

// Example 2: Using predefined variants
export function VariantsExample() {
  return (
    <motion.div variants={appleVariants.fadeInUp} initial="hidden" animate="visible">
      Uses Apple's fade-in-up animation
    </motion.div>
  );
}

// Example 3: Staggered list animation
export function StaggeredListExample() {
  const items = ["Item 1", "Item 2", "Item 3"];

  return (
    <motion.ul
      variants={appleVariants.staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={appleVariants.staggerItem}>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Example 4: Button with Apple-style interactions
export function ButtonExample() {
  return (
    <motion.button
      whileHover={appleButtonAnimations.hover}
      whileTap={appleButtonAnimations.tap}
    >
      Click me
    </motion.button>
  );
}

// Example 5: Custom transition with Apple's easing
export function CustomTransitionExample() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={createAppleTransition("tween", {
        duration: 0.3,
        ease: appleEasing.easeOut,
      })}
    >
      Custom transition
    </motion.div>
  );
}

// Example 6: Page transition (like iOS navigation)
export function PageTransitionExample() {
  const pageVariants = createPageTransition("forward");

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      Page content
    </motion.div>
  );
}

// Example 7: Modal animation
export function ModalExample() {
  const modalVariants = createModalVariants();

  return (
    <motion.div
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      Modal content
    </motion.div>
  );
}

// Example 8: Different spring types
export function SpringTypesExample() {
  return (
    <>
      <motion.div
        animate={{ x: 100 }}
        transition={appleSprings.gentle}
      >
        Gentle spring
      </motion.div>
      <motion.div
        animate={{ x: 100 }}
        transition={appleSprings.snappy}
      >
        Snappy spring
      </motion.div>
      <motion.div
        animate={{ x: 100 }}
        transition={appleSprings.bouncy}
      >
        Bouncy spring
      </motion.div>
    </>
  );
}

