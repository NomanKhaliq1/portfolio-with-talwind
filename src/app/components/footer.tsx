"use client";

import { FC, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaRegCopy,
} from "react-icons/fa";

const FooterContact: FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <footer id="contact" className="relative isolate overflow-hidden bg-slate-950 text-white">
      {copied && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-emerald-300/50 bg-emerald-400/15 px-4 py-2 text-sm font-medium text-emerald-200 shadow-lg shadow-emerald-500/20 backdrop-blur">
          {copied} copied to clipboard
        </div>
      )}

      <div className="absolute inset-x-0 -top-20 -z-10 flex justify-center">
        <div className="h-72 w-[46rem] rounded-full bg-gradient-to-br from-emerald-400/30 via-sky-400/25 to-blue-500/30 blur-3xl" />
      </div>
      <div className="absolute -bottom-16 left-8 -z-10 h-44 w-44 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="absolute -bottom-24 right-0 -z-10 h-48 w-48 rounded-full bg-sky-400/25 blur-3xl" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-28 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/40 backdrop-blur-lg sm:p-14">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.35em] text-white/70">
                LET’S COLLABORATE
              </span>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Bring a calm, modern product experience to life.
              </h2>
              <p className="text-base leading-relaxed text-white/70">
                Share your roadmap or early ideas—I’ll help shape a plan that balances storytelling, design systems, and reliable engineering.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => copyToClipboard("nomanghouri.dev@gmail.com")}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/15"
                >
                  <FaEnvelope className="text-emerald-300" />
                  nomanghouri.dev@gmail.com
                  <FaRegCopy className="text-white/50 transition group-hover:text-white/80" />
                </button>
                <button
                  onClick={() => copyToClipboard("+92 308 2452547")}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/15"
                >
                  <FaPhone className="text-sky-300" />
                  +92 308 2452547
                  <FaRegCopy className="text-white/50 transition group-hover:text-white/80" />
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-white/50">Elsewhere</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/NomanKhaliq1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition hover:border-white/40 hover:text-white"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nomanghouri-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition hover:border-white/40 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com/nomanghouri2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition hover:border-white/40 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://twitter.com/nomankhaliq_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 transition hover:border-white/40 hover:text-white"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-white/70 shadow-lg shadow-slate-950/20">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Project fit</p>
              <p className="mt-3 text-sm leading-relaxed">
                I’m most impactful when:
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>• You value a partner who designs, builds, and iterates alongside your team.</li>
                <li>• Clear communication, thoughtful documentation, and tidy handover matter.</li>
                <li>• You’re ready to launch quickly while protecting craft and accessibility.</li>
              </ul>
              <a
                href="mailto:nomanghouri.dev@gmail.com?subject=Let%27s%20collaborate"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-100"
              >
                Start a project
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} · Designed & built by Noman Khaliq
      </div>
    </footer>
  );
};

export default FooterContact;
