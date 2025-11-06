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
    <div className="px-6 py-20 bg-gray-50">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
          Experience
        </span>
      </div>

      <p className="text-center text-gray-600 mb-8">
        Here is a quick summary of my most recent experiences:
      </p>

      <div className="max-w-4xl mx-auto space-y-6">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-stretch p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex-1">
              <h3 className="text-xl font-bold">{experience.title}</h3>
              <ul className="list-disc text-[14px] text-gray-600 pl-5 mt-2">
                {experience.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row md:flex-col items-start md:items-end justify-between mt-4 md:mt-0 md:ml-6 flex-shrink-0 w-full md:w-auto">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={128}
                height={64}
                className="object-contain md:mb-2"
              />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-1 text-sm text-gray-500 mt-2 md:mt-0">
                <span>{experience.date}</span>
                {experience.date.toLowerCase().includes("present") && (
                  <span className="text-green-600 font-medium text-xs bg-green-100 px-2 py-1 rounded-full">
                    Currently Working
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;