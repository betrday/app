/**
 * Apple-style Animation Presets
 * 
 * These presets replicate Apple's animation system used in iOS, macOS, and web.
 * While Swift code can't run directly in browsers, these configurations match
 * Apple's animation curves, spring physics, and timing functions.
 */

import { Variants, Transition } from "framer-motion";

/**
 * Apple's standard easing curves (cubic-bezier)
 * These match the curves used in SwiftUI and UIKit
 */
export const appleEasing = {
  // Standard ease-in-out (matches SwiftUI's .easeInOut)
  easeInOut: [0.42, 0, 0.58, 1] as [number, number, number, number],
  
  // Ease out (matches SwiftUI's .easeOut) - most common in Apple's UI
  easeOut: [0.22, 1, 0.36, 1] as [number, number, number, number],
  
  // Ease in (matches SwiftUI's .easeIn)
  easeIn: [0.42, 0, 1, 1] as [number, number, number, number],
  
  // Custom curve used in iOS transitions
  ios: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  
  // Material Design inspired (used in some Apple web properties)
  material: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
};

/**
 * Apple's spring physics configurations
 * These match SwiftUI's spring() function parameters
 */
export const appleSprings = {
  // Default spring (matches SwiftUI's .spring())
  default: {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  
  // Gentle spring (softer, more subtle)
  gentle: {
    type: "spring" as const,
    stiffness: 60,
    damping: 15,
    mass: 1,
  },
  
  // Snappy spring (quick, responsive)
  snappy: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
    mass: 1,
  },
  
  // Bouncy spring (more pronounced bounce)
  bouncy: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20,
    mass: 0.8,
  },
  
  // Smooth spring (very smooth, minimal bounce)
  smooth: {
    type: "spring" as const,
    stiffness: 100,
    damping: 25,
    mass: 1,
  },
  
  // Interactive spring (for buttons, hovers)
  interactive: {
    type: "spring" as const,
    stiffness: 400,
    damping: 17,
    mass: 1,
  },
} as const;

/**
 * Standard animation durations (in seconds)
 * Matches Apple's Human Interface Guidelines
 */
export const appleDurations = {
  instant: 0.1,
  quick: 0.2,
  standard: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;

/**
 * Common animation variants following Apple's patterns
 */
export const appleVariants = {
  // Fade in from bottom (common in iOS)
  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...appleSprings.default,
        duration: appleDurations.standard,
        ease: appleEasing.easeOut,
      },
    },
  },
  
  // Fade in with scale (common for modals)
  fadeInScale: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        ...appleSprings.default,
        duration: appleDurations.standard,
        ease: appleEasing.easeOut,
      },
    },
  },
  
  // Slide in from side (common in navigation)
  slideInRight: {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...appleSprings.default,
        duration: appleDurations.standard,
        ease: appleEasing.easeOut,
      },
    },
  },
  
  // Stagger container (for lists, grids)
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  // Stagger item (used with staggerContainer)
  staggerItem: {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: appleSprings.default,
    },
  },
} as const;

/**
 * Button interaction animations (matches iOS button behavior)
 */
export const appleButtonAnimations = {
  hover: {
    scale: 1.02,
    transition: appleSprings.interactive,
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 20,
    },
  },
} as const;

/**
 * Helper function to create custom transitions with Apple's style
 */
export function createAppleTransition(
  type: "spring" | "tween" = "spring",
  options?: {
    springConfig?: typeof appleSprings.default;
    duration?: number;
    ease?: typeof appleEasing.easeOut;
    delay?: number;
  }
): Transition {
  if (type === "spring") {
    return {
      ...(options?.springConfig || appleSprings.default),
      delay: options?.delay,
    };
  }
  
  return {
    type: "tween",
    duration: options?.duration || appleDurations.standard,
    ease: options?.ease || appleEasing.easeOut,
    delay: options?.delay,
  };
}

/**
 * Helper function to create page transition (matches iOS page transitions)
 */
export function createPageTransition(direction: "forward" | "back" = "forward"): Variants {
  return {
    initial: {
      opacity: 0,
      x: direction === "forward" ? 20 : -20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        ...appleSprings.default,
        duration: appleDurations.standard,
        ease: appleEasing.easeOut,
      },
    },
    exit: {
      opacity: 0,
      x: direction === "forward" ? -20 : 20,
      transition: {
        duration: appleDurations.quick,
        ease: appleEasing.easeIn,
      },
    },
  };
}

/**
 * Helper function for modal/popover animations (matches iOS modals)
 */
export function createModalVariants(): Variants {
  return {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        ...appleSprings.default,
        duration: appleDurations.standard,
        ease: appleEasing.easeOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: appleDurations.quick,
        ease: appleEasing.easeIn,
      },
    },
  };
}

