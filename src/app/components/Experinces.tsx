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
        (payload) => {
          console.log("🔄 Realtime update received (experiences):", payload);
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
    <section id="experience" className="relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200">
            Experience
          </span>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">
            Partnerships that shaped my craft
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">
            A snapshot of meaningful collaborations where design, engineering, and business impact intersected.
          </p>
        </div>

        <div className="mt-16 space-y-10">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-white/30 hover:bg-white/10 sm:p-10"
            >
              <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-sky-400 to-purple-500 sm:block" />
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
                <div className="flex flex-col gap-4 sm:w-1/3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                      <Image
                        src={experience.logo}
                        alt={experience.company}
                        width={80}
                        height={80}
                        className="h-12 w-12 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{experience.company}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{experience.date}</p>
                    </div>
                  </div>
                  {experience.date.toLowerCase().includes("present") && (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      Currently contributing
                    </span>
                  )}
                  <p className="text-sm font-medium text-slate-300">{experience.title}</p>
                </div>

                <div className="sm:w-2/3">
                  <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                    {experience.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-gradient-to-r from-sky-400 to-purple-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;