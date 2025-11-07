"use client";

import Image from "next/image";
import { Code2, Server, Database, Wrench } from "lucide-react";
import FadeInOnView from "./FadeInOnView";

const AboutSection = () => {
  return (
    <FadeInOnView>
      <section id="about" className="relative overflow-hidden py-24">
        <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:flex-row lg:items-stretch">
          <div className="relative w-full lg:w-[45%]">
            <div className="absolute -left-10 top-1/4 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="absolute -right-16 bottom-10 h-44 w-44 rounded-full bg-sky-400/20 blur-3xl" />
            <div className="relative flex h-full flex-col justify-end rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-900">
                <Image
                  src="/aboutme.jpeg"
                  alt="About Me Image"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              </div>
              <div className="mt-6 space-y-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200">
                  About
                </span>
                <p className="text-sm text-slate-300">
                  Full-stack product engineer with a passion for blending motion, accessibility, and performance.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col justify-center space-y-8 lg:w-[55%]">
            <div>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                A developer obsessed with shipping delightful, resilient interfaces
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                I&apos;m a product-focused engineer crafting immersive web experiences with React, Next.js, and TailwindCSS. I love
                translating ambitious concepts into polished, performant products—supported by a backend toolkit spanning Node.js,
                PHP, and Python.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">What drives me</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Curiosity and craft. From proof-of-concept prototypes to production-ready systems, I focus on details that
                  create clarity, confidence, and velocity for teams.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Currently exploring</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Design systems, motion-first storytelling, and developer experience tooling that keeps teams shipping fast.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">Toolkit</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Code2 className="mt-1 h-5 w-5 text-sky-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Frontend craft</p>
                    <p className="text-sm text-slate-300">TypeScript, React, Next.js, TailwindCSS, Framer Motion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Server className="mt-1 h-5 w-5 text-purple-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Backend foundations</p>
                    <p className="text-sm text-slate-300">Node.js, PHP (Core & WordPress), Python</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="mt-1 h-5 w-5 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Data layer</p>
                    <p className="text-sm text-slate-300">PostgreSQL, MongoDB, Supabase</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wrench className="mt-1 h-5 w-5 text-amber-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">Workflow</p>
                    <p className="text-sm text-slate-300">Figma, REST APIs, Git, Storybook, Cypress</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-emerald-300">
              Currently open to remote collaborations—let’s shape your next standout experience.
            </p>
          </div>
        </div>
      </section>
    </FadeInOnView>
  );
};

export default AboutSection;
