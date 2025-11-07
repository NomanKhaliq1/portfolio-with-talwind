"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import FadeInOnView from "./FadeInOnView";
import { getPortfolioStatus } from "@/app/utils/getPortfolioStatus";
import { getExperiences } from "@/app/utils/getExperiences";
import { supabase } from "@/app/lib/supabaseClient";

type Status = {
  current_projects: number;
  total_slots: number;
  total_built: number;
  status_override: boolean;
  custom_message: string;
  vacation_until: string;
  open_to_jobs: boolean;
  job_type: string;
  dynamicMessage: string;
};

const HeroSection = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [yearsOfExperience, setYearsOfExperience] = useState<number | null>(null);
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const client = supabase;

    async function fetchAndSet() {
      const liveData = await getPortfolioStatus();
      if (!mounted || !liveData) return;

      setStatus({ ...liveData });
    }

    fetchAndSet();

    if (!client) {
      return () => {
        mounted = false;
      };
    }

    const channel = client
      .channel("realtime:portfolioStatus")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolioStatus" },
        () => fetchAndSet()
      )
      .subscribe();

    return () => {
      mounted = false;
      client.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    async function calculateExperience() {
      const experiences = await getExperiences();
      if (experiences.length > 0) {
        const sorted = [...experiences].sort(
          (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        const startDate = new Date(sorted[0].startDate);
        const today = new Date();
        const years = today.getFullYear() - startDate.getFullYear();
        setYearsOfExperience(years);

        const current = experiences.find((exp) =>
          exp.date.toLowerCase().includes("present")
        );
        if (current) {
          setCurrentRole(
            `Currently working as <strong>${current.title}</strong> at <strong>${current.company}</strong>`
          );
        }
      }
    }

    calculateExperience();
  }, []);

  if (!status) return null;

  const {
    current_projects,
    total_slots,
    total_built,
    status_override,
    open_to_jobs,
    job_type,
    dynamicMessage,
  } = status;

  const remainingSlots = total_slots - current_projects;

  return (
    <FadeInOnView>
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,_rgba(139,92,246,0.25),_transparent_60%)]" />
        <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-16 px-4 sm:px-6 lg:flex-row lg:items-end">
          <div className="relative w-full lg:w-[60%]">
            <div className="absolute -left-12 -top-16 hidden h-48 w-48 rounded-full bg-sky-500/20 blur-3xl lg:block" />
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200">
              Available for collaborations
              <span className={`inline-flex h-2 w-2 rounded-full ${status_override ? "bg-rose-400" : "bg-emerald-400"}`} />
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl">
              Building bold digital experiences that feel effortless
              <span className="ml-2 inline-block align-middle text-3xl sm:text-4xl">👋</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              I help growing teams turn complex ideas into scalable products. From rapid prototypes to production-grade platforms,
              I craft experiences that balance engineering rigor with visual polish.
            </p>

            <div className="mt-6 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="space-y-1">
                  <p className="font-semibold text-white">Based in Karachi, Pakistan</p>
                  <p className="text-slate-300">Collaborating remotely with teams across the globe.</p>
                </div>
              </div>
              {currentRole && (
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" />
                  <div
                    className="space-y-1"
                    dangerouslySetInnerHTML={{ __html: `<p class='font-semibold text-white'>${currentRole}</p>` }}
                  />
                </div>
              )}
              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${
                    status_override || remainingSlots <= 0 ? "bg-rose-400" : "bg-emerald-400"
                  }`}
                />
                <div className="space-y-1">
                  <p className="font-semibold text-white">
                    {status_override
                      ? `Currently unavailable — ${dynamicMessage}`
                      : remainingSlots > 0
                        ? `Now booking ${remainingSlots} project${remainingSlots === 1 ? "" : "s"}`
                        : "Currently fully booked"}
                  </p>
                  {!status_override && (
                    <p className="text-slate-300">
                      Managing {current_projects} of {total_slots} active collaborations.
                    </p>
                  )}
                </div>
              </div>
              {open_to_jobs && (
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-purple-400" />
                  <div className="space-y-1">
                    <p className="font-semibold text-white">Open to {job_type.toLowerCase()} roles</p>
                    <p className="text-slate-300">Let’s talk about crafting your next standout product.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-purple-600 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-500/30 transition hover:shadow-violet-500/50"
              >
                Let’s build something unforgettable
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              {open_to_jobs && (
                <button
                  onClick={() => setShowJobModal(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-slate-200 transition hover:border-white/40 hover:bg-white/10"
                >
                  Hiring? Let’s chat
                  <span aria-hidden>•</span>
                </button>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-slate-300">
              <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Connect</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/NomanKhaliq1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nomanghouri-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/nomanghouri2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com/nomankhaliq_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>

            <div className="mt-10 w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Shipped</span>
                  <p className="text-3xl font-semibold text-white">{total_built}+</p>
                  <p className="text-sm text-slate-300">High-impact websites launched</p>
                </div>
                {current_projects > 0 && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">In motion</span>
                    <p className="text-3xl font-semibold text-white">{current_projects}</p>
                    <p className="text-sm text-slate-300">Active builds right now</p>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Open slots</span>
                  <p className="text-3xl font-semibold text-white">{Math.max(remainingSlots, 0)}</p>
                  <p className="text-sm text-slate-300">Next availability window</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Experience</span>
                  <p className="text-3xl font-semibold text-white">
                    {yearsOfExperience !== null ? `${yearsOfExperience}+` : "—"}
                  </p>
                  <p className="text-sm text-slate-300">Years crafting digital products</p>
                </div>
              </div>
            </div>

            {remainingSlots <= 3 && remainingSlots > 0 && (
              <p className="mt-4 text-sm font-medium text-rose-300">
                Only {remainingSlots} project slot{remainingSlots === 1 ? "" : "s"} left for this quarter.
              </p>
            )}
          </div>

          <div className="relative flex w-full max-w-md justify-center lg:w-[40%]">
            <div className="absolute -top-10 right-10 h-32 w-32 rounded-full bg-purple-500/30 blur-3xl" />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.8)]">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_60%)]" />
              <Image
                src="/noman-khaliq-developer.webp"
                alt="Noman Khaliq Hero Image"
                fill
                className="rounded-[1.6rem] object-cover"
                priority
              />
              <div className="absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-200">Focused on</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  React • Next.js • TailwindCSS • WordPress
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Offer Modal */}
        {open_to_jobs && showJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
            <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-8 text-center shadow-2xl backdrop-blur">
              <button
                onClick={() => setShowJobModal(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/30 hover:text-white"
                aria-label="Close Modal"
              >
                ×
              </button>
              <h2 className="text-2xl font-semibold text-white">Interested in hiring me?</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                I’m open to remote opportunities focused on React, Next.js, WordPress, and product engineering. Let’s discuss how
                I can help your team move faster.
              </p>
              <a
                href="mailto:youremail@example.com?subject=Full-Time Job Opportunity for Noman"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/40 transition hover:shadow-violet-500/60"
              >
                Send job offer 📩
              </a>
            </div>
          </div>
        )}
      </section>
    </FadeInOnView>
  );
};

export default HeroSection;
