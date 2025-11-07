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

type CurrentRole = {
  title: string;
  company: string;
};

const HeroSection = () => {
  const [showJobModal, setShowJobModal] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [yearsOfExperience, setYearsOfExperience] = useState<number | null>(null);
  const [currentRole, setCurrentRole] = useState<CurrentRole | null>(null);

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
          setCurrentRole({
            title: current.title,
            company: current.company,
          });
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

  const availabilityMessage = status_override
    ? dynamicMessage || "Currently unavailable"
    : remainingSlots > 0
      ? `Available for ${remainingSlots} new project${remainingSlots === 1 ? "" : "s"}`
      : "Currently fully booked";

  const availabilitySubtext = status_override
    ? open_to_jobs
      ? "Happy to chat about upcoming opportunities."
      : undefined
    : `Partnering on ${current_projects} of ${total_slots} active collaborations.`;

  const availabilityAccent =
    status_override || remainingSlots <= 0
      ? "border-rose-200 bg-rose-50 text-rose-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  const availabilityDot =
    status_override || remainingSlots <= 0 ? "bg-rose-500" : "bg-emerald-500";

  return (
    <FadeInOnView>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-28 sm:py-32">
        <div className="absolute -left-16 top-12 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
              Product engineer & design partner
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
              Calm, considered digital products for teams who care about craft.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              I help founders and product teams transform ambitious ideas into well-structured, scalable interfaces. Every engagement blends interaction design, thoughtful storytelling, and reliable engineering.
            </p>

            <div className="mt-8 space-y-4">
              <div
                className={`flex items-start gap-3 rounded-2xl border ${availabilityAccent} p-4 transition`}
              >
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${availabilityDot}`} />
                <div>
                  <p className="text-sm font-semibold">{availabilityMessage}</p>
                  {availabilitySubtext && (
                    <p className="mt-1 text-xs text-slate-600">{availabilitySubtext}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Location</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">Karachi, Pakistan</p>
                  <p className="text-sm text-slate-500">Collaborating remotely worldwide.</p>
                </div>
                {currentRole && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Current focus</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{currentRole.title}</p>
                    <p className="text-sm text-slate-500">at {currentRole.company}</p>
                  </div>
                )}
              </div>

              {open_to_jobs && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Exploring</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{job_type}</p>
                  <p className="text-sm text-slate-500">Let’s discuss long-term, product-minded partnerships.</p>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                Start a project
                <span aria-hidden>→</span>
              </a>
              {open_to_jobs && (
                <button
                  onClick={() => setShowJobModal(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Hiring? Let’s chat
                  <span aria-hidden>•</span>
                </button>
              )}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-slate-500">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Connect</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/NomanKhaliq1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                  aria-label="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/nomanghouri-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/nomanghouri2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com/nomankhaliq_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
                  aria-label="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Products shipped</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{total_built}+</p>
                <p className="text-sm text-slate-500">High-impact launches delivered.</p>
              </div>
              {current_projects > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Active builds</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{current_projects}</p>
                  <p className="text-sm text-slate-500">In-progress collaborations.</p>
                </div>
              )}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Next availability</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{Math.max(remainingSlots, 0)}</p>
                <p className="text-sm text-slate-500">Project slots remaining this quarter.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Experience</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {yearsOfExperience !== null ? `${yearsOfExperience}+` : "—"}
                </p>
                <p className="text-sm text-slate-500">Years crafting digital products.</p>
              </div>
            </div>

            {remainingSlots <= 3 && remainingSlots > 0 && (
              <p className="mt-4 text-sm font-medium text-rose-600">
                Only {remainingSlots} project slot{remainingSlots === 1 ? "" : "s"} left for this quarter.
              </p>
            )}
          </div>

          <div className="relative w-full max-w-md lg:w-[45%]">
            <div className="absolute -top-12 left-6 h-36 w-36 rounded-full bg-blue-100 blur-3xl" />
            <div className="relative rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem]">
                <Image
                  src="/noman-khaliq-developer.webp"
                  alt="Noman Khaliq Hero Image"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="relative mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Core stack</p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  React • Next.js • Tailwind CSS • WordPress
                </p>
                {yearsOfExperience !== null && (
                  <p className="mt-4 text-sm text-slate-600">
                    {yearsOfExperience}+ years shipping interfaces end-to-end.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {open_to_jobs && showJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-2xl">
              <button
                onClick={() => setShowJobModal(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-400 hover:text-slate-900"
                aria-label="Close Modal"
              >
                ×
              </button>
              <h2 className="text-2xl font-semibold text-slate-900">Interested in hiring me?</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                I’m open to remote opportunities focused on React, Next.js, WordPress, and product engineering. Let’s discuss how I can help your team move faster.
              </p>
              <a
                href="mailto:nomanghouri.dev@gmail.com?subject=Full-Time%20Job%20Opportunity%20for%20Noman"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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
