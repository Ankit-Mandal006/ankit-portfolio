import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProject from "@/components/home/FeaturedProject";
import About from "@/components/home/About";
import Skills from "@/components/home/Skills";
import Education from "@/components/home/Education";
import Experience from "@/components/home/Experience";
import SectionContainer from "@/components/ui/SectionContainer";

export default function HomePage() {
  return (
    <main className="w-full space-y-16 md:space-y-24 py-12">
      <Hero />

      <SectionContainer>
        <About />
      </SectionContainer>

      <SectionContainer>
        <Stats />
      </SectionContainer>

      <SectionContainer>
        <FeaturedProject />
      </SectionContainer>

      <SectionContainer>
        <Experience />
      </SectionContainer>

      <SectionContainer>
        <Education />
      </SectionContainer>

      <SectionContainer>
        <Skills />
      </SectionContainer>
    </main>
  );
}