export type Experience = {
  title: string;
  company: string;
  logo: string;
  date: string; 
  startDate: string;
  description: string[];
};

export const experiences: Experience[] = [
  {
    title: "Web Developer",
    company: "Awesome Technologies Inc",
    logo: "/experience-logos/AwesomeTech.webp",
    date: "Nov 2022 - Present",
    startDate: "2022-11-01",
    description: [
      "Developed and maintained responsive websites using platforms like Webflow and WordPress, focusing on delivering seamless user experiences.",
      "Specialized in e-commerce websites and custom WordPress solutions, including the creation of custom plugins tailored to client needs.",
      "Collaborated with teams to design visually appealing and high-performance websites aligned with client goals.",
      "Ensured adherence to best practices in web development, including responsive design, cross-browser compatibility, and performance optimization.",
      "Worked on CMS-based projects, implementing content updates, and managing website functionalities for various industries.",
    ],
  },
];
