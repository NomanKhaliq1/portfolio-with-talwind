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
    <footer id="contact" className="relative overflow-hidden bg-white">
      {copied && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
          {copied} copied to clipboard
        </div>
      )}

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-100/60 blur-3xl" />
          <div className="absolute -bottom-16 left-10 h-52 w-52 rounded-full bg-emerald-100/60 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[2fr_1fr] lg:items-start">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-500">
                Let’s collaborate
              </span>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Ready to build something calm, clear, and effective?
              </h2>
              <p className="text-base leading-relaxed text-slate-600">
                Share your idea, product roadmap, or pain point. I’ll help translate it into a plan that balances usability, performance, and momentum.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => copyToClipboard("nomanghouri.dev@gmail.com")}
                  className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  <FaEnvelope className="text-blue-600" />
                  nomanghouri.dev@gmail.com
                  <FaRegCopy className="text-slate-400 transition group-hover:text-slate-600" />
                </button>
                <button
                  onClick={() => copyToClipboard("+92 308 2452547")}
                  className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                >
                  <FaPhone className="text-emerald-600" />
                  +92 308 2452547
                  <FaRegCopy className="text-slate-400 transition group-hover:text-slate-600" />
                </button>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Elsewhere</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/NomanKhaliq1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
                    aria-label="GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nomanghouri-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.instagram.com/nomanghouri2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://twitter.com/nomankhaliq_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-400 hover:bg-slate-100"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Project fit</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                I’m most helpful when:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• You need a partner who can design, build, and ship with intention.</li>
                <li>• You value clear communication and tidy handover.</li>
                <li>• You’re ready to iterate quickly without sacrificing craft.</li>
              </ul>
              <a
                href="mailto:nomanghouri.dev@gmail.com?subject=Let%27s%20collaborate"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start a project
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} · Designed & built by Noman Khaliq
      </div>
    </footer>
  );
};

export default FooterContact;
