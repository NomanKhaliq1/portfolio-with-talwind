"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ✅ Global toggle to stop/start animations
const ANIMATIONS_ENABLED = true;

const Skills = () => {
  const skills = [
    { src: "/icons/javascript.svg", alt: "Javascript", label: "Javascript" },
    { src: "/icons/typescript.svg", alt: "Typescript", label: "Typescript" },
    { src: "/icons/react.svg", alt: "React", label: "React" },
    { src: "/icons/nextjs.svg", alt: "Next.js", label: "Next.js" },
    { src: "/icons/nodejs.svg", alt: "Node.js", label: "Node.js" },
    { src: "/icons/postgresql.svg", alt: "PostgreSQL", label: "PostgreSQL" },
    { src: "/icons/mongodb.svg", alt: "MongoDB", label: "MongoDB" },
    { src: "/icons/tailwindcss.svg", alt: "TailwindCSS", label: "TailwindCSS" },
    { src: "/icons/figma.svg", alt: "Figma", label: "Figma" },
    { src: "/icons/wordpress.svg", alt: "Wordpress", label: "Wordpress" },
    { src: "/icons/php.svg", alt: "PHP", label: "PHP" },
    { src: "/icons/python.svg", alt: "Python", label: "Python" },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
            Skills
          </span>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-20/28 font-regular text-gray-600">
            The skills, tools and technologies I am really good at:
          </h2>
        </div>

        {ANIMATIONS_ENABLED ? (
          <motion.div
            ref={ref}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 mt-10"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  {skill.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div
            ref={ref}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 mt-10"
          >
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src={skill.src}
                    alt={skill.alt}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-gray-600 font-medium text-sm">
                  {skill.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
