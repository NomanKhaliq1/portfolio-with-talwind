"use client";

import { FC, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ClientOnly from "./ClientOnly";
import { projects } from "@/app/data/projects";
import { modalContentMap } from "@/app/data/ModalContent";

const getPreviewText = (text: string, wordLimit = 32) => {
  const words = text.split(" ");
  const shouldTrim = words.length > wordLimit;
  const trimmed = shouldTrim ? `${words.slice(0, wordLimit).join(" ")}…` : text;
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
    }, 320);
  };

  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-24 sm:py-32" id="projects">
      <div className="absolute inset-x-0 -top-24 -z-10 flex justify-center">
        <div className="h-72 w-[40rem] rounded-full bg-gradient-to-br from-emerald-300/35 via-sky-300/30 to-blue-300/35 blur-3xl" />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-white" />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-[11px] font-semibold tracking-[0.4em] text-slate-500">
          SELECTED WORK
        </span>
        <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Modern products crafted with clarity and lasting polish.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
          A curated mix of launches—design systems, marketing experiences, and product interfaces—built alongside founders and product teams who value thoughtful detail.
        </p>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-6xl">
        <ClientOnly>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }}
            loop
            className="!pb-12"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/90 shadow-xl shadow-slate-900/10 backdrop-blur-lg lg:flex-row">
                  <div className="flex items-center justify-center bg-slate-100/60 p-6 lg:w-1/2">
                    <div className="relative aspect-video w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/80 bg-white">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-8 p-8 text-left lg:p-12">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-slate-900">{project.title}</h3>
                      {(() => {
                        const { trimmed, shouldTrim } = getPreviewText(project.description, 32);
                        return (
                          <>
                            <p className="text-sm leading-relaxed text-slate-600">{trimmed}</p>
                            {shouldTrim && (
                              <button
                                onClick={() => handleOpen(project)}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-600"
                              >
                                Explore case study
                                <span aria-hidden>→</span>
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
                            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-emerald-600"
                      >
                        Visit project <FiExternalLink />
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
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 px-4 pb-10 pt-20 backdrop-blur">
          <div
            className={`relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/90 p-8 text-left text-white shadow-2xl transition ${
              isClosing ? "animate-fadeDown" : "animate-fadeUp"
            }`}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/40 hover:text-white"
            >
              ×
            </button>

            <h2 className="pr-12 text-3xl font-semibold text-white sm:text-4xl">{selectedProject.title}</h2>

            <Image
              src={selectedProject.image}
              alt="Project preview"
              width={1100}
              height={500}
              className="mt-6 rounded-2xl border border-white/10 object-contain"
            />

            <p className="mt-6 text-sm leading-relaxed text-white/70">{selectedProject.description}</p>

            {selectedProject.modalKey && modalContentMap[selectedProject.modalKey] && (
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-white/70">
                {modalContentMap[selectedProject.modalKey]}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-emerald-300"
            >
              Visit project <FiExternalLink />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectShowcase;
