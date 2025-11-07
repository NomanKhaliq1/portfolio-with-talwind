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
      const skills = await getSkills();
      if (mounted) setSkills(skills);
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
        (payload) => {
          console.log("🔄 Realtime skill update:", payload);
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
    <section id="skills" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.18),_transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-white/5 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200">
            Skillset
          </span>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            A curated toolkit for crafting fast, immersive, and scalable interfaces
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            From design systems to data orchestration, these are the frameworks and tools I lean on to ship experiences that feel
            effortless.
          </p>
        </div>

        {(ANIMATIONS_ENABLED ? (
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
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{skill.label}</p>
                  <p className="mt-1 text-xs text-slate-300">Crafted with intention, tuned for performance.</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-white/30 hover:bg-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{skill.label}</p>
                  <p className="mt-1 text-xs text-slate-300">Crafted with intention, tuned for performance.</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
