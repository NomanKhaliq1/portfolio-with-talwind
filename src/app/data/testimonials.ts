export type Testimonial = {
  name: string;
  role: string;
  designation: string;
  companyLogo: string;
  image: string;
  review: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ahsan Raza",
    designation: "Senior Developer",
    role: "awesometechinc.com",
    companyLogo: "/reveiws/company-logos/awesometechinc.webp",
    image: "/reveiws/persons/ahsan-raza.jpeg",
    review:
      "I want to express my admiration for Noman Khaliq, an exceptional developer who has recently worked on React projects that truly inspired me. I firmly believe that Noman has the potential to make Pakistan proud in the future. His dedication and consistent efforts are commendable, and he has proven himself to be a highly capable developer.",
    rating: 5,
  },
  {
    name: "Adnan Habib",
    designation: "Team Lead",
    role: "awesometechinc.com",
    companyLogo: "/reveiws/company-logos/awesometechinc.webp",
    image: "/reveiws/persons/adnan-habib.jpeg",
    review: "Noman is a skilled and reliable web developer who consistently delivers quality work. He’s quick to learn, detail-oriented, and always approaches tasks with a positive, problem-solving attitude. A great team player and a valuable asset to any project.",
    rating: 5,
  },
  {
    name: "Michael Brown",
    designation: "CTO",
    role: "xyz solutions",
    companyLogo: "",
    image: "",
    review: "Noman is highly skilled...",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    designation: "Freelance MERN Developer",
    role: "Freelancer",
    companyLogo: "",
    image: "",
    review: "Working with Noman was extremely easy...",
    rating: 5,
  },
];
