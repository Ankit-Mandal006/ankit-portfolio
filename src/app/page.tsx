import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProject from "@/components/home/FeaturedProject";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Education from "@/components/home/Education";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Stats />

      <FeaturedProject />

      <About />

      <Education />

      <Skills />
    </main>
  );
}