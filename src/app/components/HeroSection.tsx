"use client";

import Image from "next/image";
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { experiences } from "@/app/data/experiences";
import FadeInOnView from "./FadeInOnView";

const currentProjects: number = 12;
const totalSlots = 20;
const remainingSlots = totalSlots - currentProjects;

const statusOverride = true;
const customMessage = "On vacation, back on 23rd July";

const openToJobOffers = false;
const jobType = "Remote Full-Time";

const totalWebsitesBuilt = 15;
const activeProjects = currentProjects;

const HeroSection = () => {
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16 lg:gap-24">
            {/* Left Content */}
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

              {/* Status List */}
              <ul className="list-none space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[8px] w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-gray-700 text-base font-medium">Karachi, Pakistan</span>
                </li>

                {currentExperience && (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Currently working as <span className="font-semibold">{currentExperience.title}</span> at{" "}
                      <span className="font-semibold">{currentExperience.company}</span>
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
                      Handling {currentProjects} of {totalSlots} project{currentProjects !== 1 ? "s" : ""}
                    </span>
                  </li>
                ) : (
                  <li className="flex items-start gap-2">
                    <span className="mt-[8px] w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <span className="text-gray-700 text-base font-medium">
                      Currently unavailable (Handling {currentProjects} project{currentProjects !== 1 ? "s" : ""})
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

              {/* Metrics Section */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-gray-700 text-sm md:text-base">
                <div>🌐 {totalWebsitesBuilt}+ Websites Built</div>
                {activeProjects > 0 && <div>🚀 {activeProjects} Ongoing Projects</div>}
                <div title={`From ${startDate.getFullYear()} to Present`}>💼 {yearsOfExperience}+ Years Experience</div>
                </div>

              {/* Social Icons */}
              <div className="flex justify-center lg:justify-start space-x-5 pt-4">
                <a href="https://github.com/NomanKhaliq1" target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-black" aria-label="GitHub">
                  <FaGithub size={22} />
                </a>
                <a href="https://www.linkedin.com/in/nomanghouri-dev/" target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700" aria-label="LinkedIn">
                  <FaLinkedin size={22} />
                </a>
                <a href="https://www.instagram.com/nomanghouri2/" target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500" aria-label="Instagram">
                  <FaInstagram size={22} />
                </a>
                <a href="https://twitter.com/nomankhaliq_" target="_blank" rel="noopener noreferrer"
                  className="text-gray-600 hover:text-sky-500" aria-label="Twitter">
                  <FaTwitter size={22} />
                </a>
              </div>

              {/* CTA */}
              <div className="flex justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="group inline-block mt-6 w-max bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-lg transform transition-all duration-300"
                >
                  Let’s Work Together{" "}
                  <span className="ml-2 text-base group-hover:animate-bounce inline-block">🤝</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[26rem] lg:w-[32rem] h-[26rem] sm:h-[30rem] md:h-[36rem] lg:h-[38rem] mx-auto bg-gradient-to-br from-yellow-400/10 via-orange-200/30 to-white rounded-[2rem] p-2 shadow-2xl hover:scale-105 transition-transform duration-300">
              <Image
                src="/noman-khaliq-developer.webp"
                alt="Noman Khaliq Hero Image"
                fill
                className="object-cover rounded-[2rem] border-2 border-white"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </FadeInOnView>
  );
};

export default HeroSection;
