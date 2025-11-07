"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient";
import { getSkills, type Skill } from "@/app/utils/getSkills";

const ANIMATIONS_ENABLED = true;

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    let mounted = true;
    const client = supabase;

    async function fetchAndSet() {
      const skillsData = await getSkills();
      if (mounted) setSkills(skillsData);
    }

    fetchAndSet();

    if (!client) {
      return () => {
        mounted = false;
      };
    }

    const channel = client
      .channel("realtime:skills")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "skills",
        },
        () => {
          fetchAndSet();
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      client.removeChannel(channel);
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden bg-slate-950 py-24 sm:py-32"
    >
      {/* Background gradients */}
      <div className="absolute inset-x-0 -top-32 -z-10 flex justify-center">
        <div className="h-80 w-[48rem] rounded-full bg-gradient-to-br from-emerald-400/25 via-sky-400/20 to-blue-500/25 blur-3xl" />
      </div>
      <div className="absolute -bottom-16 left-10 -z-10 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute -bottom-24 right-0 -z-10 h-40 w-40 rounded-full bg-sky-400/20 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.35em] text-white/70">
            SKILLSET
          </span>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            A toolkit for designing and engineering calm, scalable experiences.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
            From rapid prototyping to production systems, these are the
            languages, frameworks, and tools that keep shipping velocity high
            without sacrificing quality.
          </p>
        </div>

        {/* Animated skill cards */}
        {ANIMATIONS_ENABLED ? (
          <motion.div
            ref={ref}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.12 },
              },
            }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-left shadow-lg shadow-slate-900/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {skill.label}
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Used to ship resilient, accessible interfaces.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-left shadow-lg shadow-slate-900/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {skill.label}
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    Used to ship resilient, accessible interfaces.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
