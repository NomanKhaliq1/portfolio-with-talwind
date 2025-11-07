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
    <section
      id="experience"
      className="relative isolate overflow-hidden bg-white py-24 sm:py-32"
    >
      {/* Subtle background gradients */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-slate-100 via-white" />
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 bg-gradient-to-l from-slate-100/60 via-white sm:block" />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.4em] text-slate-500">
            EXPERIENCE
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Partnerships that shipped meaningful change.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            A mix of collaborations where research, design, and engineering came
            together to build products that feel calm yet powerful.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute inset-y-0 left-4 hidden w-px bg-gradient-to-b from-emerald-200 via-slate-200 to-transparent md:block" />
          <div className="space-y-10">
            {experiences.map((experience, index) => {
              const isCurrent = experience.date
                .toLowerCase()
                .includes("present");

              return (
                <div
                  key={`${experience.company}-${index}`}
                  className="group relative rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 md:pl-16"
                >
                  <div className="absolute -left-7 top-8 hidden h-3 w-3 rounded-full border border-white bg-emerald-400 shadow-md shadow-emerald-500/30 md:block" />
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    {/* Company Info */}
                    <div className="flex items-start gap-4 sm:w-1/3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                        <Image
                          src={experience.logo}
                          alt={experience.company}
                          width={72}
                          height={72}
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-slate-900">
                          {experience.company}
                        </p>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                          {experience.date}
                        </p>
                        <p className="text-sm font-medium text-slate-600">
                          {experience.title}
                        </p>
                        {isCurrent && (
                          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Currently contributing
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="sm:w-2/3">
                      <ul className="space-y-3 text-sm leading-relaxed text-slate-600">
                        {experience.description.map((point, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-emerald-200" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
