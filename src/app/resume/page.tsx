import type { Metadata } from "next";
import { site, experience, education, skills } from "@/lib/data";
import { tagColor } from "@/lib/retro-colors";

export const metadata: Metadata = {
  title: `Resume — ${site.name}`,
};

export default function ResumePage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {site.title} &middot; {site.location}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-sm">
          <a
            href={`mailto:${site.email}`}
            className="font-medium underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
          <span className="text-zinc-500 dark:text-zinc-400">{site.phone}</span>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="font-pixel text-[10px] tracking-tight text-retro-purple">
          Experience
        </h2>
        <div className="mt-6 flex flex-col gap-8">
          {experience.map((job) => (
            <div key={`${job.company}-${job.role}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {job.role} &middot; {job.company}
                </h3>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {job.period}
                </span>
              </div>
              <ul className="mt-2 list-disc pl-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-pixel text-[10px] tracking-tight text-retro-teal">
          Education
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {education.map((school) => (
            <div
              key={school.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <h3 className="font-medium">
                {school.degree} &middot; {school.school}
              </h3>
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                {school.period}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-pixel text-[10px] tracking-tight text-retro-orange">
          Skills
        </h2>
        <div className="mt-6 flex flex-wrap gap-2">
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
    </main>
  );
}
