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

  const cards = skills.map((skill, index) => (
    <div
      key={index}
      className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
        <Image
          src={skill.src}
          alt={skill.alt}
          width={48}
          height={48}
          className="h-12 w-12 object-contain"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900">{skill.label}</p>
        <p className="mt-1 text-xs text-slate-600">Crafted for reliability and considerate UX.</p>
      </div>
    </div>
  ));

  return (
    <section id="skills" className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-50 to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            Skillset
          </span>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold text-slate-900 sm:text-4xl">
            A toolkit designed for thoughtful, scalable product delivery
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            From design systems to data orchestration, these are the languages and libraries I rely on to bring resilient interfaces to life.
          </p>
        </div>

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
                className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{skill.label}</p>
                  <p className="mt-1 text-xs text-slate-600">Crafted for reliability and considerate UX.</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div ref={ref} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
