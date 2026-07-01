import { site, skills } from "@/lib/data";
import { tagColor } from "@/lib/retro-colors";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16">
      <h2 className="font-pixel text-[10px] tracking-tight text-retro-purple">
        About
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        {site.bio.map((paragraph) => (
          <p key={paragraph} className="max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={skill}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${tagColor(index)}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
