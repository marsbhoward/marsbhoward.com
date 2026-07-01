import { site } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-16">
      <h2 className="font-pixel text-[10px] tracking-tight text-retro-orange">
        Contact
      </h2>
      <p className="mt-6 max-w-xl leading-relaxed text-zinc-700 dark:text-zinc-300">
        I&apos;m always open to discussing new projects or opportunities. Feel
        free to reach out.
      </p>
      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-foreground px-5 py-2.5 text-background transition-all active:scale-95 hover:opacity-90 hover:shadow-[0_0_0_3px_var(--color-retro-red)]"
        >
          {site.email}
        </a>
        <a
          href={site.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black/10 px-5 py-2.5 transition-all active:scale-95 hover:border-transparent hover:bg-black/5 hover:shadow-[0_0_0_3px_var(--color-retro-purple)] dark:border-white/15 dark:hover:bg-white/10"
        >
          GitHub
        </a>
        <a
          href={site.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black/10 px-5 py-2.5 transition-all active:scale-95 hover:border-transparent hover:bg-black/5 hover:shadow-[0_0_0_3px_var(--color-retro-blue)] dark:border-white/15 dark:hover:bg-white/10"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
