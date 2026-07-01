"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/data";

const PARALLAX_FACTORS = [50, -35, 60];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | null = null;

    function handleMouseMove(event: MouseEvent) {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const rect = section!.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;

        blobRefs.current.forEach((blob, index) => {
          if (!blob) return;
          const factor = PARALLAX_FACTORS[index % PARALLAX_FACTORS.length];
          blob.style.transform = `translate3d(${relX * factor}px, ${relY * factor}px, 0)`;
        });
      });
    }

    function handleMouseLeave() {
      blobRefs.current.forEach((blob) => {
        if (blob) blob.style.transform = "translate3d(0, 0, 0)";
      });
    }

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] flex-col justify-center gap-6 overflow-hidden py-24"
    >
      <div
        ref={(el) => {
          blobRefs.current[0] = el;
        }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 transition-transform duration-500 ease-out"
      >
        <div className="animate-blob h-72 w-72 rounded-full bg-retro-purple/25 blur-3xl" />
      </div>
      <div
        ref={(el) => {
          blobRefs.current[1] = el;
        }}
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -bottom-32 transition-transform duration-500 ease-out"
      >
        <div
          style={{ animationDelay: "-3s" }}
          className="animate-blob h-80 w-80 rounded-full bg-retro-teal/20 blur-3xl"
        />
      </div>
      <div
        ref={(el) => {
          blobRefs.current[2] = el;
        }}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 transition-transform duration-500 ease-out"
      >
        <div
          style={{ animationDelay: "-6s" }}
          className="animate-blob h-56 w-56 rounded-full bg-retro-orange/10 blur-3xl"
        />
      </div>

      <p className="animate-fade-up font-pixel text-[10px] leading-relaxed tracking-tight text-zinc-500 dark:text-zinc-400">
        Hi, I&apos;m {site.name.split(" ")[0]} — {site.title}
      </p>
      <h1
        style={{ animationDelay: "100ms" }}
        className="animate-fade-up max-w-xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl"
      >
        <span className="text-gbc-gradient">{site.tagline}</span>
      </h1>
      <div
        style={{ animationDelay: "200ms" }}
        className="animate-fade-up flex flex-wrap gap-4 pt-2 text-sm font-medium"
      >
        <a
          href="#projects"
          className="rounded-full bg-foreground px-5 py-2.5 text-background transition-all active:scale-95 hover:opacity-90 hover:shadow-[0_0_0_3px_var(--color-retro-red)]"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-black/10 px-5 py-2.5 transition-all active:scale-95 hover:border-transparent hover:bg-black/5 hover:shadow-[0_0_0_3px_var(--color-retro-blue)] dark:border-white/15 dark:hover:bg-white/10"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
