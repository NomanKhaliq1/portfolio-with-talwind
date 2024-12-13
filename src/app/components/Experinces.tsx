"use client";

import { FC } from "react";
import Image from "next/image"; // Ensure you use this component

type Experience = {
  title: string;
  company: string;
  logo: string;
  date: string;
  description: string[];
};

const experiences: Experience[] = [
  {
    title: "Web Developer",
    company: "Awesome Technologies Inc",
    logo: "/experience-logos/AwesomeTech.webp",
    date: "Nov 2021 - Present",
    description: [
      "Developed and maintained responsive websites using platforms like Webflow and WordPress, focusing on delivering seamless user experiences.",
      "Specialized in e-commerce websites and custom WordPress solutions, including the creation of custom plugins tailored to client needs.",
      "Collaborated with teams to design visually appealing and high-performance websites aligned with client goals.",
      "Ensured adherence to best practices in web development, including responsive design, cross-browser compatibility, and performance optimization.",
      "Worked on CMS-based projects, implementing content updates, and managing website functionalities for various industries.",
    ],
  },
  {
    title: "Team Lead",
    company: "Upwork",
    logo: "/experience-logos/upwork.png",
    date: "Jul 2017 - Oct 2021",
    description: [
      "Sed quis justo ac magna.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed quis justo ac magna.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
  },
];

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
                width={128} // Adjust as needed
                height={64} // Adjust as needed
                className="object-contain md:mb-2"
              />
              <p className="text-sm text-gray-500 ml-auto md:ml-0 mt-2 md:mt-0">
                {experience.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
