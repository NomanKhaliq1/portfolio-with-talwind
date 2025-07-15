"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function FadeInOnView({
  children,
  className = "",
  delay = 0,
  enabled = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  enabled?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-10% 0px -30% 0px", once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (!enabled) return;

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
  }, [isInView, controls, delay, enabled]);

  if (!enabled) return <div className={className}>{children}</div>;

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
