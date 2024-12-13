"use client";

import { FC } from "react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image"; // Importing Next.js Image component

type Project = {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Fiskil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Nest.js",
      "PostgreSQL",
      "TailwindCSS",
      "Figma",
      "Cypress",
      "Storybook",
      "Git",
    ],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://fiskil.com",
  },
  {
    title: "Fiskil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Nest.js",
      "PostgreSQL",
      "TailwindCSS",
      "Figma",
      "Cypress",
      "Storybook",
      "Git",
    ],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://fiskil.com",
  },
];

const ProjectShowcase: FC = () => {
  return (
    <div className="px-6 py-20">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
          Work
        </span>
      </div>
      <p className="text-center text-gray-600 mb-10">
        Some of the noteworthy projects I have built:
      </p>
      <div className="max-w-5xl mx-auto space-y-12">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row rounded-lg shadow-lg items-stretch min-h-[400px] ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Project Image */}
            <div className="flex-shrink-0 w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-6">
              <Image
                src={project.image}
                alt={project.title}
                width={800} // Add appropriate dimensions
                height={400} // Add appropriate dimensions
                className="object-cover rounded-lg"
              />
            </div>

            {/* Project Details */}
            <div className="flex-1 flex flex-col justify-between p-8 bg-white">
              <div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6 text-[15px] leading-relaxed">
                  {project.description}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-800 hover:underline"
                >
                  <FiExternalLink className="ml-2" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
