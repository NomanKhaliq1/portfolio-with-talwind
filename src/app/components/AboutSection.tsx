"use client";

import Image from "next/image";
import { Code2, Server, Database, Wrench } from "lucide-react";
import FadeInOnView from "./FadeInOnView";

const AboutSection = () => {
  return (
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

              <h3 className="text-xl font-semibold text-gray-800">My Journey:</h3>
              <p className="text-gray-600 leading-relaxed">
                My development path started out of pure curiosity — wanting to solve real-world problems with code. Since then, I’ve embraced every challenge and upskilled through technologies like <span className="font-semibold">TypeScript</span>, RESTful APIs, and modern JavaScript ecosystems. I now specialize in building performant, maintainable, and meaningful software products.
              </p>

              <h3 className="text-xl font-semibold text-gray-800">What I Work With:</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <Code2 className="w-5 h-5 mt-1 text-gray-500" />
                  <span>
                    <span className="font-semibold text-gray-800">Frontend:</span> JavaScript, TypeScript, React.js, Next.js, TailwindCSS
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Server className="w-5 h-5 mt-1 text-gray-500" />
                  <span>
                    <span className="font-semibold text-gray-800">Backend:</span> Node.js, PHP (Core & WordPress), Python
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
                    <span className="font-semibold text-gray-800">Tools & Technologies:</span> Figma, REST APIs, Git, Storybook, Cypress
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </FadeInOnView>
  );
};

export default AboutSection;
