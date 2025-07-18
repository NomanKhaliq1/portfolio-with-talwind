export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
  modalKey?: string;
}

export const projects: Project[] = [
  {
    title: "Fiskil",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. In bibendum libero nec tellus scelerisque, sed cursus nulla lobortis. Curabitur sed nibh suscipit, blandit tellus a, lacinia magna. Morbi facilisis tellus non augue ullamcorper, sed sodales felis lacinia. Suspendisse consectetur neque et turpis mattis, a faucibus lorem commodo.",
    technologies: ["React", "Next.js", "TailwindCSS"],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://fiskil.com",
    modalKey: "fiskil",
  },
  {
    title: "Another Project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. In bibendum libero nec tellus scelerisque, sed cursus nulla lobortis. Curabitur sed nibh suscipit, blandit tellus a, lacinia magna. Morbi facilisis tellus non augue ullamcorper, sed sodales felis lacinia. Suspendisse consectetur neque et turpis mattis, a faucibus lorem commodo.",
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "Nest.js",
      "PostgreSQL",
      "TailwindCSS",
      "Figma",
      "Cypress",
      "Storybook",
      "Git",
    ],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://example.com",
    modalKey: "anotherProject",
  },
  {
    title: "Third Project",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas nec arcu ac tellus volutpat viverra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. In bibendum libero nec tellus scelerisque, sed cursus nulla lobortis. Curabitur sed nibh suscipit, blandit tellus a, lacinia magna. Morbi facilisis tellus non augue ullamcorper, sed sodales felis lacinia. Suspendisse consectetur neque et turpis mattis, a faucibus lorem commodo.",
    technologies: [
      "React",
      "Next.js",
      "Typescript",
      "TailwindCSS",
      "Prisma",
      "Vercel",
    ],
    image: "/projectimages/DummyPortfolio.png",
    link: "https://example2.com",
    modalKey: "thirdProject",
  },
];