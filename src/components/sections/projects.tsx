import { projects, type Project } from "@/lib/data";
import { tagColor } from "@/lib/retro-colors";

const ledColors = ["bg-retro-purple", "bg-retro-teal", "bg-retro-orange"];

function ProjectGrid({ items }: { items: Project[] }) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
      {items.map((project, projectIndex) => (
        <article
          key={project.title}
          className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white/40 p-5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-black/20 hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/25"
        >
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${ledColors[projectIndex % ledColors.length]}`}
            />
            <h3 className="font-medium">{project.title}</h3>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className={`rounded-full border px-2.5 py-0.5 text-xs ${tagColor(tagIndex)}`}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-1 flex gap-4 text-sm font-medium">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Live site
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline"
              >
                Source
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Projects() {
  const workProjects = projects.filter((project) => project.category === "work");
  const hobbyProjects = projects.filter((project) => project.category === "hobby");

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <h2 className="font-pixel text-[10px] tracking-tight text-retro-teal">
        Projects
      </h2>
      <ProjectGrid items={workProjects} />

      <h3 className="mt-12 font-pixel text-[10px] tracking-tight text-retro-purple">
        School & Hobby Projects
      </h3>
      <ProjectGrid items={hobbyProjects} />
    </section>
  );
}
