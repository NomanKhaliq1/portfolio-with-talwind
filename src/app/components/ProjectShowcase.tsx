"use client";

import { FC, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ClientOnly from './ClientOnly';

// Dummy project data
const projects = [
  {
    title: "Fiskil",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. In bibendum libero nec tellus scelerisque, sed cursus nulla lobortis. Curabitur sed nibh suscipit, blandit tellus a, lacinia magna. Morbi facilisis tellus non augue ullamcorper, sed sodales felis lacinia. Suspendisse consectetur neque et turpis mattis, a faucibus lorem commodo.",
    technologies: ["React", "Next.js", "TailwindCSS"],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://fiskil.com",
    modalOnlyContent: (
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-2">Key Features</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
          <li>Real-time transaction monitoring</li>
          <li>Bank integration with open banking</li>
          <li>Data visualizations for insights</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Fiskil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. In bibendum libero nec tellus scelerisque, sed cursus nulla lobortis. Curabitur sed nibh suscipit, blandit tellus a, lacinia magna. Morbi facilisis tellus non augue ullamcorper, sed sodales felis lacinia. Suspendisse consectetur neque et turpis mattis, a faucibus lorem commodo.",
    technologies: [
      "React", "Next.js", "Typescript", "Nest.js", "PostgreSQL",
      "TailwindCSS", "Figma", "Cypress", "Storybook", "Git"
    ],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://fiskil.com",
  },
];

// Helper function to trim description to approx. 7 lines
const getPreviewText = (text: string, wordLimit = 35) => {
  const words = text.split(" ");
  const shouldTrim = words.length > wordLimit;
  const trimmed = shouldTrim ? words.slice(0, wordLimit).join(" ") + "..." : text;
  return { trimmed, shouldTrim };
};

const ProjectShowcase: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="px-6 py-20 bg-gray-50">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
          Work
        </span>
      </div>
      <p className="text-center text-gray-600 mb-10">
        Some of the noteworthy projects I have built:
      </p>

      <div className="relative max-w-5xl mx-auto">
        <ClientOnly>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="!pb-12" // Extra padding for bullets
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[450px]">
                {/* Image */}
                <div className="md:w-1/2 bg-gray-100 flex justify-center items-center p-6">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={400}
                    className="object-cover rounded-md"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    {(() => {
                      const { trimmed, shouldTrim } = getPreviewText(project.description, 35);
                      return (
                        <>
                          <p className="text-gray-600 text-[15px] leading-relaxed">{trimmed}</p>
                          {shouldTrim && (
                            <button
                              onClick={() => {
                                setSelectedProject(project);
                                setShowModal(true);
                              }}
                              className="mt-3 text-[var(--accent-purple)] text-sm hover:underline"
                            >
                              Read More →
                            </button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mt-6">
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
                      className="inline-flex items-center text-gray-800 mt-4 hover:underline text-sm"
                    >
                      Visit <FiExternalLink className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </ClientOnly>
      </div>

      {/* Modal */}
      {showModal && selectedProject && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white max-w-5xl w-full mx-4 p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[95vh] relative">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl"
          >
            ×
          </button>

          <h2 className="text-3xl font-bold mb-6">{selectedProject.title}</h2>

          <Image
            src={selectedProject.image}
            alt="Project preview"
            width={1100}
            height={500}
            className="rounded-lg mb-6"
          />

          <p className="text-gray-700 mb-4 text-[16px] leading-relaxed">
            {selectedProject.description}
          </p>

          {/* ✅ Modal-Only Extra Content Here */}
          {selectedProject.modalOnlyContent && (
            <div className="mb-6">{selectedProject.modalOnlyContent}</div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedProject.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={selectedProject.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--accent-purple)] hover:underline text-base"
          >
            Visit <FiExternalLink className="ml-2" />
          </a>
        </div>
      </div>
    )}
    </div>
  );
};

export default ProjectShowcase;
