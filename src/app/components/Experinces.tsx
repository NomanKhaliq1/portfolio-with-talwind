"use client";

import { FC } from "react";
import Image from "next/image";
import { experiences } from "@/app/data/experiences"; // 🔁 Import from new file

const ExperienceSection: FC = () => {
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
              <p className="text-sm text-gray-500 ml-auto md:ml-0 mt-2 md:mt-0 flex items-center gap-2">
                <span>{experience.date}</span>
                {experience.date.toLowerCase().includes("present") && (
                  <span className="text-green-600 font-medium text-xs bg-green-100 px-2 py-1 rounded-full">
                    Currently Working
                  </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;