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
  const isUnavailable = status_override || remainingSlots <= 0;

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

  const availabilityDot = isUnavailable ? "bg-rose-400" : "bg-emerald-400";

  return (
    <FadeInOnView>
      <section
        id="home"
        className="relative isolate overflow-hidden bg-slate-950 py-28 text-white sm:py-32"
      >
        <div className="absolute inset-x-0 -top-20 -z-10 flex justify-center">
          <div className="h-72 w-[42rem] rounded-full bg-gradient-to-br from-sky-400/30 via-emerald-400/25 to-blue-500/30 blur-3xl" />
        </div>
        <div className="absolute -bottom-20 -left-16 -z-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

        <div className="mx-auto grid w-full max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold tracking-[0.4em] text-white/70">
                PRODUCT ENGINEER • DESIGN PARTNER
              </span>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Crisp digital products crafted with a calm, systems-driven approach.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                I join founders and product teams to design thoughtful experiences, build resilient frontends, and ship work that feels considered. From product discovery to production-ready code, I help move ideas to launch.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-2.5 w-2.5 rounded-full ${availabilityDot}`} />
                  <div>
                    <p className="text-sm font-semibold text-white">{availabilityMessage}</p>
                    {availabilitySubtext && (
                      <p className="mt-1 text-xs text-white/60">{availabilitySubtext}</p>
                    )}
                  </div>
                </div>
                {open_to_jobs && (
                  <button
                    onClick={() => setShowJobModal(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                  >
                    Open to {job_type.toLowerCase()}
                  </button>
                )}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Experience</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {yearsOfExperience ? `${yearsOfExperience}+` : "7+"}
                  </p>
                  <p className="mt-1 text-xs text-white/60">Years building cross-disciplinary products</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Current focus</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {currentRole ? currentRole.title : "Product Engineering"}
                  </p>
                  <p className="mt-1 text-xs text-white/60">
                    {currentRole ? currentRole.company : "Independent partner"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setShowJobModal(true)}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-100"
              >
                Book a collaboration call
              </button>
              <a
                href="mailto:nomankhaliq2019@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                nomankhaliq2019@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-5 text-white/60">
              <a
                href="https://twitter.com/"
                className="transition hover:text-white"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://github.com/"
                className="transition hover:text-white"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/"
                className="transition hover:text-white"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://instagram.com/"
                className="transition hover:text-white"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl">
                <Image
                  src="/noman-khaliq-developer.webp"
                  alt="Noman Khaliq"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 240px"
                  priority
                />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-xl font-semibold text-white">Noman Khaliq</h2>
                <p className="mt-1 text-sm text-white/60">
                  {currentRole
                    ? `${currentRole.title} @ ${currentRole.company}`
                    : "Product Engineer & Design Consultant"}
                </p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Launches</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{total_built}+ projects</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/10 p-4 text-center">
                  <p className="text-[11px] uppercase tracking-[0.4em] text-white/50">Collaborations</p>
                  <p className="mt-3 text-2xl font-semibold text-white">{total_slots}+ teams</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4 text-left">
                <p className="text-sm font-semibold text-white">Latest note</p>
                <p className="mt-2 text-sm text-white/60">
                  “Noman brings calm energy and a systems mindset—our shipping velocity doubled.”
                </p>
              </div>
            </div>
            <div className="absolute -left-12 -top-10 h-24 w-24 rounded-full bg-emerald-400/40 blur-3xl" />
            <div className="absolute -bottom-16 right-4 h-32 w-32 rounded-full bg-sky-400/40 blur-3xl" />
          </div>
        </div>

        {open_to_jobs && showJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-white shadow-2xl backdrop-blur">
              <button
                onClick={() => setShowJobModal(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-white/40 hover:text-white"
                aria-label="Close modal"
              >
                ×
              </button>
              <h2 className="text-2xl font-semibold">Let’s talk about teaming up</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                I’m exploring {job_type.toLowerCase()} opportunities where thoughtful design systems and polished frontends matter. Share a little about your roadmap and I’ll be in touch.
              </p>
              <a
                href="mailto:nomanghouri.dev@gmail.com?subject=Collaboration%20with%20Noman"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-100"
              >
                Send a note
              </a>
            </div>
          </div>
        )}
      </section>
    </FadeInOnView>
  );
};

export default HeroSection;
