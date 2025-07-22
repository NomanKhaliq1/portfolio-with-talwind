export type Skill = {
  src: string;
  alt: string;
  label: string;
  order: number;
};

export const fallbackSkills: Skill[] = [
  { src: "/icons/javascript.svg", alt: "Javascript", label: "Javascript", order: 1 },
  { src: "/icons/typescript.svg", alt: "Typescript", label: "Typescript", order: 2 },
  { src: "/icons/react.svg", alt: "React", label: "React", order: 3 },
  { src: "/icons/nextjs.svg", alt: "Next.js", label: "Next.js", order: 4 },
  { src: "/icons/nodejs.svg", alt: "Node.js", label: "Node.js", order: 5 },
  { src: "/icons/postgresql.svg", alt: "PostgreSQL", label: "PostgreSQL", order: 6 },
  { src: "/icons/mongodb.svg", alt: "MongoDB", label: "MongoDB", order: 7 },
  { src: "/icons/tailwindcss.svg", alt: "TailwindCSS", label: "TailwindCSS", order: 8 },
  { src: "/icons/github.svg", alt: "Git & GitHub", label: "Git & GitHub", order: 9 },
  { src: "/icons/wordpress.svg", alt: "Wordpress", label: "Wordpress", order: 10 },
  { src: "/icons/php.svg", alt: "PHP", label: "PHP", order: 11 },
  { src: "/icons/python.svg", alt: "Python", label: "Python", order: 12 },
];