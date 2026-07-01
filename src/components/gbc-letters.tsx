type GbcLettersProps = {
  text: string;
  className?: string;
};

export function GbcLetters({ text, className = "" }: GbcLettersProps) {
  return (
    <span aria-hidden="true" className={`items-center gap-[3px] ${className}`}>
      {text.split("").map((char, index) =>
        char === " " ? (
          <span key={index} className="w-1.5" />
        ) : (
          <span
            key={index}
            className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-b from-white to-zinc-300 text-[8px] leading-none font-pixel text-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.25)] ring-1 ring-black/10 dark:from-zinc-500 dark:to-zinc-950 dark:text-white dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_1px_2px_rgba(0,0,0,0.5)] dark:ring-white/15"
          >
            {char}
          </span>
        ),
      )}
    </span>
  );
}
