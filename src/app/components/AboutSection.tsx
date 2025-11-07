"use client";

import Image from "next/image";
import { Code2, Server, Database, Wrench } from "lucide-react";
import FadeInOnView from "./FadeInOnView";

const AboutSection = () => {
  return (
    <FadeInOnView>
      <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-28">
        <div className="absolute -left-12 top-24 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-48 w-48 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="mx-auto grid w-full max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.9fr] lg:items-center">
          <div className="order-2 space-y-8 lg:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              About
            </span>
            <div className="space-y-5">
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Pairing design sensitivity with resilient engineering.
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                I’m a product engineer who thrives at the intersection of interaction design and full-stack development. From the first lo-fi prototype to polished launch, I help teams articulate the experience, architect the system, and ship with confidence.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">What guides my work</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Clarity and calm. I focus on building flows that feel intuitive, reduce cognitive load, and scale as products grow.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Currently exploring</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Design systems, motion-led storytelling, and tooling that keeps product teams shipping with momentum.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Toolkit</h3>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Code2 className="mt-1 h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Interface engineering</p>
                    <p className="text-sm text-slate-600">TypeScript, React, Next.js, Tailwind CSS, Framer Motion</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Server className="mt-1 h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Backend foundations</p>
                    <p className="text-sm text-slate-600">Node.js, PHP (Core & WordPress), Python</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Database className="mt-1 h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Data layer</p>
                    <p className="text-sm text-slate-600">PostgreSQL, MongoDB, Supabase</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Wrench className="mt-1 h-5 w-5 text-slate-500" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Workflow</p>
                    <p className="text-sm text-slate-600">Figma, REST APIs, Git, Storybook, Cypress</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-emerald-700">
              Open to thoughtful collaborations — let’s build something enduring together.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-[2.5rem] border border-slate-200 bg-white p-5 shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
                <Image
                  src="/aboutme.jpeg"
                  alt="About Me Image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mx-auto -mt-10 w-[85%] rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">A quick snapshot</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li>• 8+ product launches navigated from discovery to delivery.</li>
                  <li>• Championing accessibility, performance, and maintainability.</li>
                  <li>• Comfortable leading cross-functional conversations and workshops.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInOnView>
  );
};

export default AboutSection;
