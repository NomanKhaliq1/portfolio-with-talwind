"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const ANIMATIONS_ENABLED = true;

export default function FadeInOnView({
  children,
  className = "",
  delay = 0,
  forceShow = false, // ✅ new prop added
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  forceShow?: boolean; // ✅ typed here
}) {
  const ref = useRef(null);
  const controls = useAnimation();

  const isInView = useInView(ref, {
    margin: "-10% 0px -30% 0px",
    once: false,
  });

  useEffect(() => {
    if (!ANIMATIONS_ENABLED) return;

    // ✅ if forceShow is true, immediately show without animation
    if (forceShow) {
      controls.set({ opacity: 1, y: 0 });
      return;
    }

    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 60,
        transition: { duration: 0.6, delay },
      });
    }
  }, [isInView, controls, delay, forceShow]);

  // ✅ Skip motion if animations disabled
  if (!ANIMATIONS_ENABLED) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
