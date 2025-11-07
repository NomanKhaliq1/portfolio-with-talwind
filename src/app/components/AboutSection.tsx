"use client";

import Image from "next/image";
import { Code2, Server, Database, Wrench } from "lucide-react";
import FadeInOnView from "./FadeInOnView";

const AboutSection = () => {
  const pillars = [
    {
      title: "Interface engineering",
      description: "TypeScript, React, Next.js, Tailwind CSS, Framer Motion",
      icon: Code2,
    },
    {
      title: "Backend foundations",
      description: "Node.js, PHP (Core & WordPress), Python, REST APIs",
      icon: Server,
    },
    {
      title: "Data layer",
      description: "PostgreSQL, MongoDB, Supabase, Prisma",
      icon: Database,
    },
    {
      title: "Workflow",
      description: "Figma, Git, Storybook, testing automation",
      icon: Wrench,
    },
  ];

  return (
    <FadeInOnView>
      <section id="about" className="relative isolate overflow-hidden bg-slate-50 py-24 sm:py-32">
        {/* Gradient background elements */}
        <div className="absolute inset-x-0 -top-20 -z-10 flex justify-center">
          <div className="h-56 w-[36rem] rounded-full bg-gradient-to-r from-emerald-300/40 to-sky-300/40 blur-3xl" />
        </div>
        <div className="absolute -bottom-16 left-8 -z-10 h-40 w-40 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute -right-10 top-24 -z-10 h-52 w-52 rounded-full bg-sky-300/25 blur-3xl" />

        <div className="mx-auto grid w-full max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left Column */}
          <div className="order-2 space-y-10 lg:order-1">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.4em] text-slate-500">
                ABOUT
              </span>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Pairing design sensitivity with resilient engineering.
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                I’m a product engineer who thrives at the intersection of interaction design and full-stack development. From the first lo-fi prototype to polished launch, I help teams articulate the experience, architect the system, and ship with confidence.
              </p>
            </div>

            {/* Secondary info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/60 bg-white p-6 shadow-sm shadow-emerald-500/5">
                <h3 className="text-sm font-semibold text-slate-900">Approach</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Every engagement starts with listening. I translate product goals into flows, then deliver polished interfaces built on maintainable foundations.
                </p>
              </div>
              <div className="rounded-3xl border border-white/60 bg-white p-6 shadow-sm shadow-sky-500/5">
                <h3 className="text-sm font-semibold text-slate-900">Currently exploring</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Design systems, motion-led storytelling, and performance budgets that keep products fast as they grow.
                </p>
              </div>
            </div>

            {/* Toolkit section */}
            <div className="rounded-3xl border border-white/60 bg-white p-6 shadow-lg shadow-slate-900/5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">Toolkit</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {pillars.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{title}</p>
                      <p className="mt-1 text-sm text-slate-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm font-medium text-emerald-700">
              Open to thoughtful collaborations — let’s build something enduring together.
            </p>
          </div>

          {/* Right Column */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/80 p-5 shadow-xl shadow-slate-900/10 backdrop-blur">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
                  <Image
                    src="/aboutme.jpeg"
                    alt="About Me"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="mx-auto -mt-10 w-[85%] rounded-3xl border border-white/70 bg-white p-6 text-left shadow-lg shadow-slate-900/5">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">Snapshot</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li>• 8+ product launches navigated from discovery to delivery.</li>
                    <li>• Championing accessibility, performance, and maintainability.</li>
                    <li>• Comfortable leading cross-functional conversations and workshops.</li>
                  </ul>
                </div>
              </div>
              <div className="absolute -right-8 top-12 h-24 w-24 rounded-full bg-emerald-300/40 blur-3xl" />
              <div className="absolute -left-6 -bottom-10 h-28 w-28 rounded-full bg-sky-300/30 blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </FadeInOnView>
  );
};

export default AboutSection;
