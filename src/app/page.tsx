"use client";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import Skills from "./components/skills";
import ExperienceSection from "./components/Experinces";
import ProjectShowcase from "./components/ProjectShowcase";
import TestimonialSlider from "./components/testimonials";
import FadeInOnView from "./components/FadeInOnView";

export default function Home() {

return (
<>
  <main className="min-h-screen bg-white">
    <HeroSection />

    <AboutSection />

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