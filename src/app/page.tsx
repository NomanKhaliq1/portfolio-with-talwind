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

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <section className="bg-white py-32 md:py-32">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="w-full md:w-2/3 mb-8 md:mb-0">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h1 className="text-3xl md:text-6xl font-bold">
                      Hi, I&apos;m Noman Khaliq <span className="animate-waving-hand">👋</span>
                    </h1>
                    <p className="text-base md:text-xl text-gray-600">
                      A Full Stack Developer with expertise in designing modern, scalable, and user-centric web applications. I leverage cutting-edge technologies like generative AI, responsive design principles, and advanced frameworks to deliver innovative solutions aligned with the latest global tech trends.
                    </p>
                  </div>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center">
                      <i className="fas fa-map-marker-alt text-gray-700 text-xl mr-2"></i>
                      <span className="text-gray-700 text-base font-medium">
                        Karachi, Pakistan
                      </span>
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-circle text-green-500 text-xs mr-2"></i>
                      <span className="text-gray-700 text-base font-medium">
                        Available for new projects
                      </span>
                    </li>
                  </ul>

                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/NomanKhaliq1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <FaGithub size={24} />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nomanghouri-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href="https://www.instagram.com/nomanghouri2/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <FaInstagram size={24} />
                    </a>
                    <a
                      href="https://twitter.com/yourprofile"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-indigo-600"
                    >
                      <FaTwitter size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/hero-sec-img.png"
                    alt="Hero Image"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

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
                  width={500}
                  height={500}
                  className="object-cover rounded-lg mx-auto"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Curious about me? Here you have it:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  I&apos;m a passionate full-stack developer who specializes in creating modern, user-friendly, and scalable web applications. Leveraging my expertise in frontend technologies like <span className="font-semibold">React.js</span>, <span className="font-semibold">Next.js</span>, and <span className="font-semibold">TailwindCSS</span>, alongside backend frameworks like <span className="font-semibold">Node.js</span>, I enjoy bringing innovative ideas to life with seamless technical solutions.
                </p>
                <h3 className="text-xl font-semibold text-gray-800">
                  My Journey:
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  My development journey began a few years ago, driven by curiosity and a desire to solve real-world problems through technology. Since then, I’ve continuously enhanced my skills by embracing challenges and mastering tools like <span className="font-semibold">TypeScript</span>, RESTful APIs, and modern JavaScript frameworks. Today, I focus on building highly efficient, maintainable, and impactful web applications.
                </p>
                <h3 className="text-xl font-semibold text-gray-800">
                  What I Work With:
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>
                    Frontend: <span className="font-semibold">React.js</span>,{" "}
                    <span className="font-semibold">Next.js</span>,{" "}
                    <span className="font-semibold">TailwindCSS</span>
                  </li>
                  <li>
                    Backend: <span className="font-semibold">Node.js</span>
                  </li>
                  <li>
                    Technologies:{" "}
                    <span className="font-semibold">TypeScript</span>, REST APIs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Skills />
        <ExperienceSection />
        <section id="work" className="bg-white">
          <ProjectShowcase />
        </section>
        <section id="testimonials" className="bg-gray-50">
          <TestimonialSlider />
        </section>
      </main>
    </>
  );
}
