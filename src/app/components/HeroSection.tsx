"use client";

import Image from "next/image";
import { useState } from "react";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { experiences } from "@/app/data/experiences";
import { portfolioStatus, type PortfolioStatus } from "@/app/data/portfolioStatus";
import FadeInOnView from "./FadeInOnView";

const {
  currentProjects,
  totalSlots,
  totalWebsitesBuilt,
  statusOverride,
  customMessage,
  openToJobOffers,
  jobType,
}: PortfolioStatus = portfolioStatus;

const remainingSlots = totalSlots - currentProjects;

const HeroSection = () => {
  const [showJobModal, setShowJobModal] = useState(false);

  const currentExperience = experiences.find((exp) =>
    exp.date.toLowerCase().includes("present")
  );

  const startDate = new Date(experiences[0].startDate);
  const today = new Date();
  const yearsOfExperience = today.getFullYear() - startDate.getFullYear();

  return (
    <FadeInOnView>
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-14">
            {/* Left Text */}
            <div className="w-full lg:w-2/3 space-y-8 text-left">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Hi, I&apos;m Noman Khaliq <span className="animate-waving-hand">👋</span>
                </h1>
                <p className="text-indigo-600 text-base sm:text-lg font-medium mt-2">
                  I help businesses turn complex ideas into sleek, scalable web apps.
                </p>
                <div className="space-y-2 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  <p>Expert in <strong>React</strong>, <strong>Next.js</strong>, <strong>TailwindCSS</strong>, and <strong>WordPress</strong></p>
                  <p>I build scalable, high-performance web apps with clean, user-friendly designs.</p>
                  <p>Passionate about turning real-world problems into powerful digital solutions.</p>
                </div>
              </div>

              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[8px] w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-gray-700 text-base font-medium">Karachi, Pakistan</span>
                </li>

                {currentExperience && (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Currently working as <strong>{currentExperience.title}</strong> at{" "}
                      <strong>{currentExperience.company}</strong>
                    </span>
                  </li>
                )}

                {statusOverride ? (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Currently unavailable {customMessage && `— ${customMessage}`}
                    </span>
                  </li>
                ) : currentProjects === 0 ? (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Available for new projects
                    </span>
                  </li>
                ) : remainingSlots > 0 ? (
                  <li className="flex items-start gap-2 group relative">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Available for new projects ({remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} left)
                    </span>
                    <span className="absolute left-0 top-full mt-1 z-10 text-xs text-white bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                      Handling {currentProjects} of {totalSlots} projects
                    </span>
                  </li>
                ) : (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Currently unavailable (Handling {currentProjects} projects)
                    </span>
                  </li>
                )}

                {openToJobOffers && (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Open to job offers ({jobType})
                    </span>
                  </li>
                )}
              </ul>

              <div className="mt-6 w-full max-w-3xl mx-auto lg:mx-0 bg-white/40 backdrop-blur-md border border-gray-200 rounded-xl px-6 py-6 shadow-sm">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 text-center text-gray-800">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl sm:text-3xl">🌐</span>
                    <span className="text-sm sm:text-base font-semibold">{totalWebsitesBuilt}+ Websites Built</span>
                  </div>

                  {currentProjects > 0 && (
                    <div className="flex flex-col items-center space-y-1" title="Live projects in development">
                      <span className="text-2xl sm:text-3xl">🚀</span>
                      <span className="text-sm sm:text-base font-semibold">{currentProjects} Ongoing Projects</span>
                    </div>
                  )}

                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl sm:text-3xl">💼</span>
                    <span className="text-sm sm:text-base font-semibold">{remainingSlots} Available Slots</span>
                  </div>

                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-2xl sm:text-3xl">📅</span>
                    <span className="text-sm sm:text-base font-semibold">{yearsOfExperience}+ Years Experience</span>
                  </div>
                </div>
              </div>

              {remainingSlots <= 3 && (
                <p className="text-sm text-red-500 font-semibold text-center lg:text-left mt-4 mx-auto lg:mx-0 max-w-3xl">
                  Bonus Tip: Only {remainingSlots} project slot{remainingSlots !== 1 ? "s" : ""} left — grab yours now!
                </p>
              )}

              <div className="pt-6 sm:pt-8 flex justify-center sm:justify-start space-x-5">
                <a href="https://github.com/NomanKhaliq1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black" aria-label="GitHub">
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/nomanghouri-dev/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700" aria-label="LinkedIn">
                  <FaLinkedin size={22} />
                </a>
                <a href="https://www.instagram.com/nomanghouri2/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500" aria-label="Instagram">
                  <FaInstagram size={22} />
                </a>
                <a href="https://twitter.com/nomankhaliq_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-500" aria-label="Twitter">
                  <FaTwitter size={22} />
                </a>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0 w-fit mx-auto sm:mx-0">
                <a href="#contact" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition w-fit text-center">
                  Let’s Work Together 🤝
                </a>
                {openToJobOffers && (
                  <button onClick={() => setShowJobModal(true)} className="text-indigo-600 font-medium hover:underline text-sm sm:text-base">
                    Want to offer me a job? Click here →
                  </button>
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[30rem] lg:w-[35rem] h-[30rem] sm:h-[34rem] md:h-[40rem] lg:h-[42rem] mx-auto bg-gradient-to-br from-yellow-400/10 via-orange-200/30 to-white rounded-[2rem] p-2 shadow-2xl hover:scale-105 transition-transform duration-300">
              <Image src="/noman-khaliq-developer.webp" alt="Noman Khaliq Hero Image" fill className="object-cover rounded-[2rem] border-2 border-white" priority />
            </div>
          </div>

          {/* Job Offer Modal */}
          {openToJobOffers && showJobModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 transition-opacity duration-300 ease-out animate-fadeIn">
              <div className="relative">
                <button onClick={() => setShowJobModal(false)}
                  className="absolute -top-5 -right-5 w-10 h-10 rounded-full bg-foreground text-white hover:opacity-90 flex items-center justify-center shadow-lg z-10"
                  aria-label="Close Modal">
                  <span className="text-lg">×</span>
                </button>
                <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl text-center animate-modalIn">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Interested in Hiring Me?</h2>
                  <p className="mt-4 text-gray-600">
                    I&apos;m open to remote full-time roles in React, Next.js, WordPress, or UI-focused web development.<br />
                    If you have an opportunity, let’s connect!
                  </p>
                  <a href="mailto:youremail@example.com?subject=Full-Time Job Opportunity for Noman"
                    className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition">
                    Send Job Offer 📩
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </FadeInOnView>
  );
};

export default HeroSection;
