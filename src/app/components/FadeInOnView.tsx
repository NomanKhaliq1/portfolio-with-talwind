"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

// ✅ Global toggle – control animation from here
const ANIMATIONS_ENABLED = false;

export default function FadeInOnView({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    margin: "-10% 0px -30% 0px",
    once: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (!ANIMATIONS_ENABLED) return;

    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay,
        },
      });
    } else {
      controls.start({
        opacity: 0,
        y: 60,
        transition: {
          duration: 0.6,
          delay,
        },
      });
    }
  }, [isInView, controls, delay]);

  // ✅ Return plain div when disabled — no motion at all
  if (!ANIMATIONS_ENABLED) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // ✅ Return animated version when enabled
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
