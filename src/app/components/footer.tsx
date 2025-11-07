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
    setTimeout(() => setCopied(null), 2000); // Clear popup after 2 seconds
  };

  return (
    <footer id="contact" className="relative overflow-hidden">
      {copied && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/20 px-4 py-2 text-sm font-medium text-emerald-100 shadow-lg shadow-emerald-500/30">
          {copied} copied to clipboard
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/90 p-8 sm:p-12 backdrop-blur">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200">
                Let’s collaborate
              </span>
              <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                Ready to bring your next idea to life?
              </h2>
              <p className="text-base leading-relaxed text-slate-300">
                Whether you need a rapid prototype, a full product launch, or ongoing support, I’d love to explore how we can
                craft something impactful together.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => copyToClipboard("nomanghouri.dev@gmail.com")}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/15"
                >
                  <FaEnvelope className="text-sky-300" />
                  nomanghouri.dev@gmail.com
                  <FaRegCopy className="text-slate-400 transition group-hover:text-white" />
                </button>
                <button
                  onClick={() => copyToClipboard("+92 308 2452547")}
                  className="group inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/15"
                >
                  <FaPhone className="text-emerald-300" />
                  +92 308 2452547
                  <FaRegCopy className="text-slate-400 transition group-hover:text-white" />
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Elsewhere</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/NomanKhaliq1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nomanghouri-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com/nomanghouri2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://twitter.com/nomankhaliq_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-100 transition hover:border-white/40 hover:bg-white/20"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-left backdrop-blur">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Newsletter</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Be the first to know when I launch new case studies or drop actionable insights from the build room.
              </p>
              <a
                href="mailto:nomanghouri.dev@gmail.com?subject=Let%27s%20collaborate"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 via-violet-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/40 transition hover:shadow-violet-500/60"
              >
                Start a project
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} · Designed & built by Noman Khaliq
      </div>
    </footer>
  );
};

export default FooterContact;
