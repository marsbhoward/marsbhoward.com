import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-black/10 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 font-pixel text-[8px] leading-relaxed text-zinc-500 sm:flex-row sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>Built with Next.js &amp; Tailwind CSS.</p>
      </div>
    </footer>
  );
}
