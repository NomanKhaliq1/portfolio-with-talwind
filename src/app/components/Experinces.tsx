"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { getExperiences, type Experience } from "@/app/utils/getExperiences";
import { supabase } from "@/app/lib/supabaseClient";

const ExperienceSection: FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    let mounted = true;
    const client = supabase;

    async function fetchAndSet() {
      const data = await getExperiences();
      if (mounted) setExperiences(data);
    }

    fetchAndSet();

    if (!client) {
      return () => {
        mounted = false;
      };
    }

    const channel = client
      .channel("realtime:experiences")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "experiences",
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
    <section id="experience" className="relative overflow-hidden bg-slate-50 py-24">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            Experience
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Partnerships that shipped meaningful change
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            A snapshot of collaborations where research, design, and engineering aligned to deliver lasting outcomes.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:flex-row sm:p-8"
            >
              <div className="flex items-start gap-4 sm:w-1/3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={experience.logo}
                    alt={experience.company}
                    width={80}
                    height={80}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">{experience.company}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{experience.date}</p>
                  <p className="text-sm font-medium text-slate-600">{experience.title}</p>
                  {experience.date.toLowerCase().includes("present") && (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Currently contributing
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:w-2/3">
                <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                  {experience.description.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-slate-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
