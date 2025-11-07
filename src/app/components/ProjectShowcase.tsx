"use client";

import { FC, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ClientOnly from './ClientOnly';
import { projects } from "@/app/data/projects";
import { modalContentMap } from "@/app/data/ModalContent";

const getPreviewText = (text: string, wordLimit = 35) => {
  const words = text.split(" ");
  const shouldTrim = words.length > wordLimit;
  const trimmed = shouldTrim ? words.slice(0, wordLimit).join(" ") + "..." : text;
  return { trimmed, shouldTrim };
};

const ProjectShowcase: FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = (project: typeof projects[0]) => {
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
    <section className="relative overflow-hidden py-24" id="work">
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/10 to-transparent" />
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200">
          Selected Work
        </span>
        <h2 className="mt-6 text-center text-3xl font-semibold text-white sm:text-4xl">
          Digital products crafted to unlock momentum
        </h2>
        <p className="mt-4 max-w-3xl text-center text-base leading-relaxed text-slate-300">
          A collection of high-impact launches, from bold marketing sites to bespoke product experiences.
        </p>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-6xl">
        <ClientOnly>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="!pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur lg:flex-row">
                  <div className="relative flex items-center justify-center bg-white/5 p-6 lg:w-1/2">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={400}
                      className="rounded-2xl border border-white/10 object-cover shadow-[0_20px_60px_-25px_rgba(56,189,248,0.35)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-6 p-8 lg:p-12">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                      {(() => {
                        const { trimmed, shouldTrim } = getPreviewText(project.description, 35);
                        return (
                          <>
                            <p className="text-sm leading-relaxed text-slate-300">{trimmed}</p>
                            {shouldTrim && (
                              <button
                                onClick={() => handleOpen(project)}
                                className="mt-3 text-sm font-medium text-sky-300 transition hover:text-white"
                              >
                                Read More →
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-sky-300 transition hover:text-white"
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
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 px-4 pb-10 pt-20">
          <div
            className={`relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-6 sm:p-10 text-left shadow-2xl backdrop-blur ${
              isClosing ? "animate-slideDown" : "animate-slideUp"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-200 transition hover:border-white/30 hover:text-white"
            >
              ×
            </button>

            <h2 className="pr-10 text-3xl font-semibold text-white sm:text-4xl">{selectedProject.title}</h2>

            <Image
              src={selectedProject.image}
              alt="Project preview"
              width={1100}
              height={500}
              className="mt-6 rounded-2xl border border-white/10 object-contain"
            />

            <p className="mt-6 text-sm leading-relaxed text-slate-200">
              {selectedProject.description}
            </p>

            {selectedProject.modalKey && modalContentMap[selectedProject.modalKey] && (
              <div className="mt-6 text-slate-200">
                {modalContentMap[selectedProject.modalKey]}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center text-sm font-semibold text-sky-300 transition hover:text-white"
            >
              Visit <FiExternalLink className="ml-2" />
            </a>
          </div>
        </div>
      )}

    </section>
  );
};

export default ProjectShowcase;
