import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProject from "@/components/home/FeaturedProject";
import Skills from "@/components/home/Skills";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProject />
      <Skills />
    </>
  );
}