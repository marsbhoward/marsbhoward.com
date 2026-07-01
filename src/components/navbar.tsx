import Link from "next/link";
import { GbcLetters } from "@/components/gbc-letters";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/data";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
  { href: "/resume", label: "Resume" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-black/70">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="led h-2 w-2 rounded-full bg-retro-red"
          />
          <span className="font-pixel text-[10px] leading-none tracking-tight">
            {site.name}
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="flex items-center gap-1 transition-colors hover:text-black dark:hover:text-white"
                >
                  <GbcLetters text={link.label[0]} />
                  <span aria-hidden="true">{link.label.slice(1)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
