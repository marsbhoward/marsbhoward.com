export const tagColors = [
  "border-retro-purple/30 bg-retro-purple/10 text-retro-purple dark:bg-retro-purple/15",
  "border-retro-blue/30 bg-retro-blue/10 text-retro-blue dark:bg-retro-blue/15",
  "border-retro-teal/30 bg-retro-teal/10 text-retro-teal dark:bg-retro-teal/15",
  "border-retro-green/30 bg-retro-green/10 text-retro-green dark:bg-retro-green/15",
  "border-retro-orange/30 bg-retro-orange/10 text-retro-orange dark:bg-retro-orange/15",
  "border-retro-red/30 bg-retro-red/10 text-retro-red dark:bg-retro-red/15",
];

export function tagColor(index: number) {
  return tagColors[index % tagColors.length];
}
