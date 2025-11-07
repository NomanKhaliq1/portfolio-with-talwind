"use client";

import { FC, useEffect, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ClientOnly from './ClientOnly';
import { getProjects } from "@/app/utils/getProjects";
import { modalContentMap } from "@/app/data/ModalContent";
import { supabase } from "@/app/lib/supabaseClient"; // ✅ import Supabase client

const getPreviewText = (text: string, wordLimit = 35) => {
  const words = text.split(" ");
  const shouldTrim = words.length > wordLimit;
  const trimmed = shouldTrim ? words.slice(0, wordLimit).join(" ") + "..." : text;
  return { trimmed, shouldTrim };
};

const ProjectShowcase: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  // Initial load
  useEffect(() => {
    let mounted = true;

    const fetchAndSet = async () => {
      const data = await getProjects();
      if (mounted) setProjects(data);
    };

    fetchAndSet();

    // Realtime subscription
    const channel = supabase
      .channel("realtime:projects")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "projects",
        },
        () => fetchAndSet()
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const handleOpen = (project: any) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedProject(null);
      setIsClosing(false);
      document.body.style.overflow = "auto";
    }, 400);
  };

  return (
    <div className="px-6 py-20 bg-gray-50">
      <div className="text-center mb-6">
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">Work</span>
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
            loop
            className="!pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden min-h-[450px]">
                  <div className="md:w-1/2 bg-gray-100 flex justify-center items-center p-6">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={400}
                      className="object-cover rounded-md"
                    />
                  </div>

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
                                onClick={() => handleOpen(project)}
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
                        {project.technologies.map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
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

      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 z-50 px-4 pt-10 md:px-10 overflow-y-auto">
          <div className={`bg-white w-full md:w-[90%] lg:w-[85%] rounded-xl shadow-2xl p-6 md:p-10 relative mx-auto ${isClosing ? "animate-slideDown" : "animate-slideUp"}`}>
            <button onClick={handleClose} className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-2xl">
              ×
            </button>

            <h2 className="text-3xl font-bold mb-6">{selectedProject.title}</h2>

            <Image
              src={selectedProject.image}
              alt="Project preview"
              width={1100}
              height={500}
              className="rounded-lg mb-6 w-full object-contain"
            />

            <p className="text-gray-700 mb-4 text-[16px] leading-relaxed">
              {selectedProject.description}
            </p>

            {selectedProject.modalKey && modalContentMap[selectedProject.modalKey] && (
              <div className="mb-6">
                {modalContentMap[selectedProject.modalKey]}
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md">
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
