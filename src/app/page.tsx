"use client";

import Image from "next/image";
import {
FaTwitter,
FaGithub,
FaLinkedin,
FaInstagram,
} from "react-icons/fa";

import Skills from "./components/skills";
import ExperienceSection from "./components/Experinces";
import ProjectShowcase from "./components/ProjectShowcase";
import TestimonialSlider from "./components/testimonials";
import { Code2, Server, Wrench, Database } from "lucide-react";
import FadeInOnView from "./components/FadeInOnView";
import { experiences } from "@/app/data/experiences";

const currentProjects = 12;
const totalSlots = 20;
const remainingSlots = totalSlots - currentProjects;

const statusOverride = true;
const customMessage = "On vacation, back on 23rd July";

const openToJobOffers = true;
const jobType = "Remote Full-Time";

export default function Home() {

const currentExperience = experiences.find((exp) =>
  exp.date.toLowerCase().includes("present")
);

// Calculate Experience Duration
const startDate = new Date(experiences[0].startDate);
const today = new Date();
const yearsOfExperience = today.getFullYear() - startDate.getFullYear();

// Sample static project data
const totalWebsitesBuilt = 15;
const activeProjects = currentProjects;

return (
<>
  <main className="min-h-screen bg-white">
    <FadeInOnView>
  <section className="bg-white py-28 md:py-32">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
        {/* Text Left Side */}
        <div className="w-full md:w-2/3 space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
              Hi, I&apos;m Noman Khaliq <span className="animate-waving-hand">👋</span>
            </h1>
            <p className="text-indigo-600 text-lg font-medium mt-2">
              I help businesses turn complex ideas into sleek, scalable web apps.
            </p>
            <div className="space-y-2 text-lg md:text-xl text-gray-600 leading-relaxed">
              <p>
                Expert in <strong>React</strong>, <strong>Next.js</strong>, <strong>TailwindCSS</strong>, and <strong>WordPress</strong>
              </p>
              <p>
                I build scalable, high-performance web apps with clean, user-friendly designs.
              </p>
              <p>
                Passionate about turning real-world problems into powerful digital solutions.
              </p>
            </div>
          </div>

          {/* Highlights */}
          <ul className="list-none space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <span className="text-gray-700 text-base font-medium">Karachi, Pakistan</span>
            </li>

            {currentExperience && (
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                <span className="text-gray-700 text-base font-medium">
                  Currently working as <span className="font-semibold">{currentExperience.title}</span> at{" "}
                  <span className="font-semibold">{currentExperience.company}</span>
                </span>
              </li>
            )}

            {statusOverride ? (
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <span className="text-gray-700 text-base font-medium">
                  Currently unavailable {customMessage && `— ${customMessage}`}
                </span>
              </li>
            ) : currentProjects === 0 ? (
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <span className="text-gray-700 text-base font-medium">Available for new projects</span>
              </li>
            ) : remainingSlots > 0 ? (
              <li className="flex items-center group relative">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                <span className="text-gray-700 text-base font-medium">
                  Available for new projects ({remainingSlots} slot{remainingSlots !== 1 ? "s" : ""} left)
                </span>
                <span className="absolute left-0 top-full mt-1 z-10 text-xs text-white bg-gray-800 px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  Handling {currentProjects} of {totalSlots} project{currentProjects !== 1 ? "s" : ""}
                </span>
              </li>
            ) : (
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                <span className="text-gray-700 text-base font-medium">
                  Currently unavailable (Handling {currentProjects} project{currentProjects !== 1 ? "s" : ""})
                </span>
              </li>
            )}

            {openToJobOffers && (
              <li className="flex items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                <span className="text-gray-700 text-base font-medium">
                  Open to job offers ({jobType})
                </span>
              </li>
            )}
          </ul>

          {/* Highlights (Websites, Projects, Experience) */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-gray-700 text-sm md:text-base">
            <div title="Based on real client work">🌐 {totalWebsitesBuilt}+ Websites Built</div>
            {activeProjects > 0 && (
              <div title="Live projects in development">
                🚀 {activeProjects} Ongoing Projects
              </div>
            )}
            <div title={`From ${startDate.getFullYear()} to Present`}>💼 {yearsOfExperience}+ Years Experience
            </div>
          </div>

          {/* Social + CTA */}
          <div className="flex items-center space-x-5 pt-2">
            <a href="https://github.com/NomanKhaliq1" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black" title="GitHub">
              <FaGithub size={22} />
            </a>
            <a href="https://www.linkedin.com/in/nomanghouri-dev/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700" title="LinkedIn">
              <FaLinkedin size={22} />
            </a>
            <a href="https://www.instagram.com/nomanghouri2/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500" title="Instagram">
              <FaInstagram size={22} />
            </a>
            <a href="https://twitter.com/nomankhaliq_" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-sky-500" title="Twitter">
              <FaTwitter size={22} />
            </a>
          </div>

          <a
            href="#contact"
            className="group inline-block mt-6 w-max bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold shadow hover:bg-indigo-700 hover:-translate-y-1 hover:shadow-lg transform transition-all duration-300"
          >
            Let’s Work Together
            <span className="ml-2 text-base group-hover:animate-bounce inline-block">🤝</span>
          </a>
        </div>

        {/* Image Right Side */}
        <div className="relative w-[32rem] h-[38rem] mx-auto bg-gradient-to-br from-yellow-400/10 via-orange-200/30 to-white rounded-[2rem] p-2 shadow-2xl hover:scale-105 transition-transform duration-300">
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

<FadeInOnView>
  <section id="about" className="py-20 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
          About Me
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center">
          <Image
            src="/aboutme.jpeg"
            alt="About Me Image"
            width={600}
            height={600}
            className="object-cover rounded-lg mx-auto"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800">
            Curious about me? Here you have it:
          </h3>
          <p className="text-gray-600 leading-relaxed">
            I&apos;m a passionate full-stack developer focused on crafting modern, user-friendly, and scalable web applications. With hands-on experience in <span className="font-semibold">React.js</span>, <span className="font-semibold">Next.js</span>, and <span className="font-semibold">TailwindCSS</span>, I turn complex ideas into seamless digital experiences. My backend toolkit includes <span className="font-semibold">Node.js</span>, PHP, and Python — enabling me to build robust and secure systems.
          </p>

          <p className="text-green-600 font-medium">
            I’m currently open for freelance and full-time remote opportunities.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">
            My Journey:
          </h3>
          <p className="text-gray-600 leading-relaxed">
            My development path started out of pure curiosity — wanting to solve real-world problems with code. Since then, I’ve embraced every challenge and upskilled through technologies like <span className="font-semibold">TypeScript</span>, RESTful APIs, and modern JavaScript ecosystems. I now specialize in building performant, maintainable, and meaningful software products.
          </p>

          <h3 className="text-xl font-semibold text-gray-800">
            What I Work With:
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <Code2 className="w-5 h-5 mt-1 text-gray-500" />
              <span>
                <span className="font-semibold text-gray-800">Frontend:</span> JavaScript, TypeScript, React.js,
                Next.js, TailwindCSS
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Server className="w-5 h-5 mt-1 text-gray-500" />
              <span>
                <span className="font-semibold text-gray-800">Backend:</span> Node.js, PHP (Core & WordPress),
                Python
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-5 h-5 mt-1 text-gray-500" />
              <span>
                <span className="font-semibold text-gray-800">Database:</span> PostgreSQL, MongoDB
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Wrench className="w-5 h-5 mt-1 text-gray-500" />
              <span>
                <span className="font-semibold text-gray-800">Tools & Technologies:</span> Figma, REST APIs, Git,
                Storybook, Cypress
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</FadeInOnView>

    <FadeInOnView>
      <Skills />
    </FadeInOnView>

    <FadeInOnView>
      <ExperienceSection />
    </FadeInOnView>

    <FadeInOnView>
      <section id="work" className="bg-white">
        <ProjectShowcase />
      </section>
    </FadeInOnView>

    <section id="testimonials" className="bg-gray-50">
      <TestimonialSlider />
    </section>
  </main>
</>
);
}