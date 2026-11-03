import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </main>
  );
}
