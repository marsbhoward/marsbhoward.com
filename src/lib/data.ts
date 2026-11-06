export const site = {
  name: "Mars B. Howard",
  title: "Full Stack Software Engineer",
  location: "Saint Louis, MO",
  email: "marsbhoward@icloud.com",
  phone: "(314) 313-6452",
  tagline: "I build fast, accessible web experiences.",
  bio: [
    "I'm a full stack software engineer who builds and ships complete products, from React and Next.js frontends to on-chain smart contracts. Before going independent, I spent over four years at Mastercard, first in network operations and then as a Software Engineer in Test. There I built API regression suites with Rest Assured and the application's Splunk and Dynatrace monitoring, and tracked down a parsing defect that cut response times from 60ms to 25ms before go-live.",
    "Today I'm the founder and sole engineer behind Donada, a Cardano NFT platform live on mainnet. Holders can rent out their NFTs to earn yield, and renters and community wallets become eligible for scheduled prize draws whose winners anyone can verify on-chain. I also built Equivalence, a browser roguelike in Unity with Cardano wallet integration, using AI-assisted development with Claude Code.",
    "When I'm not building, you'll find me biking, gaming, tinkering on hobby coding projects, or indulging in general nerdery 🤓.",
  ],
  socials: {
    github: "https://github.com/marsbhoward",
    linkedin: "https://www.linkedin.com/in/mars-howard/",
  },
};

export const skills = [
  "TypeScript",
  "JavaScript",
  "Java",
  "Python",
  "Ruby",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Redux",
  "Node.js",
  "Express",
  "Ruby on Rails",
  "Cardano",
  "Aiken",
  "Lucid Evolution",
  "Marlowe",
  "Blockfrost",
  "IPFS",
  "Unity",
  "C#",
  "Rest Assured",
  "Selenium",
  "Postman",
  "Insomnia",
  "GitHub Actions",
  "Railway",
  "Heroku",
  "Sentry",
  "Splunk",
  "Dynatrace",
  "PostgreSQL",
  "SQLite",
  "Git",
  "Linux/Unix",
  "SSH",
  "Claude Code",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
  apiLink?: string;
  repo?: string;
  category: "work" | "hobby";
};

const EQUIVALENCE_SHOWCASE =
  "https://equivalence-showcase-production.up.railway.app/play/";

export const projects: Project[] = [
  {
    title: "Donada",
    description:
      "Cardano NFT rental contract platform. NFT holders list assets for rent and earn yield, while renters and community wallets gain eligibility for scheduled on-chain prize draws with automatic payouts.",
    tags: ["Cardano", "React", "Blockfrost", "Marlowe"],
    link: "https://app.donada.io",
    repo: "https://github.com/marsbhoward/donada",
    category: "work",
  },
  {
    title: "Donada Mint",
    description:
      "On-demand NFT minting platform on Cardano. Users connect a wallet and mint 1–5 random NFTs per transaction, backed by an Aiken Plutus V3 minting policy with on-chain price enforcement.",
    tags: ["Cardano", "Aiken", "Lucid", "TypeScript"],
    link: "https://mint.donada.io",
    repo: "https://github.com/marsbhoward/donada-mint",
    category: "work",
  },
  {
    title: "Donada Landing",
    description:
      "Marketing site for the Donada ecosystem — introduces the rent-to-earn NFT model and prize draw mechanics, and routes users into the mint and rental apps.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Custom CSS"],
    link: "https://donada.io",
    repo: "https://github.com/marsbhoward/donada-landing",
    category: "work",
  },
  {
    title: "Equivalence",
    description:
      "A roguelike extraction game with pixel-art arena combat, built in Unity and playable in the browser. Rolled gear, a forge and a mastery board drive progression, with Cardano wallet integration.",
    tags: ["Unity", "C#", "WebGL", "Cardano", "TypeScript"],
    link: EQUIVALENCE_SHOWCASE,
    linkLabel: "Play the showcase",
    category: "work",
  },
  {
    title: "River",
    description:
      "Full-stack app for browsing what's streaming across your favorite platforms, combining scraped and external API data. React/Redux frontend with a Rails API backend and async, Promise-based data fetching.",
    tags: ["React", "Redux", "Ruby on Rails", "PostgreSQL"],
    link: "https://river-wheat.vercel.app/",
    apiLink: "https://river-api.herokuapp.com/",
    repo: "https://github.com/marsbhoward/river-frontend",
    category: "hobby",
  },
  {
    title: "Double Dog Dare",
    description:
      "A group dare roulette game that incentivizes competitive play by declaring a winner. A Rails API translates database models to frontend objects for an interactive dare-tracking interface.",
    tags: ["Ruby on Rails", "JavaScript", "Heroku", "CSS"],
    repo: "https://github.com/marsbhoward/double-dog",
    category: "hobby",
  },
  {
    title: "PadderPro",
    description:
      "A macOS app that remaps game controller input — buttons, triggers, and analog sticks — into keyboard presses and mouse movement, with per-game configuration profiles and proportional analog cursor control.",
    tags: ["Objective-C", "macOS", "Cocoa"],
    repo: "https://github.com/marsbhoward/padderPro",
    category: "hobby",
  },
];

export type Bullet = string | { text: string; href: string; linkLabel: string };

export type Job = {
  role: string;
  company: string;
  period: string;
  bullets: Bullet[];
};

export const experience: Job[] = [
  {
    role: "Founder & Lead Engineer",
    company: "Donada",
    period: "Apr 2026 — Present",
    bullets: [
      "Sole engineer on the Donada platform, live on Cardano mainnet: rental app, mint, Next.js site, Discord bots, and game backend, shipped through GitHub Actions CI/CD and Railway.",
      "Wrote an Aiken (Plutus V3) minting policy that enforces price, mint window, and supply on-chain, with a React, TypeScript, and Lucid Evolution frontend for wallet connection and transaction building.",
      "Built automated prize draws on GitHub Actions that pick winners from the hash of the first block after the draw time, so any participant can verify the result.",
      {
        text: "Built Equivalence, a browser roguelike in Unity 6 (C#) built with AI-assisted development in Claude Code, plus a CIP-30 wallet connector and a Node.js service that mints in-game gear on Cardano testnet.",
        href: EQUIVALENCE_SHOWCASE,
        linkLabel: "Play the showcase",
      },
      "Built Discord bots that verify wallet ownership and sync token-gated roles from on-chain holdings.",
    ],
  },
  {
    role: "Software Engineer in Test",
    company: "Mastercard",
    period: "Dec 2022 — Apr 2026",
    bullets: [
      "Pinpointed a parsing defect before go-live that was limiting throughput, cutting API response time from 60ms to 25ms and raising projected capacity to 10,000 TPS.",
      "Built the application's full Splunk and Dynatrace monitoring suite: a KPI dashboard for senior leadership, a golden-signals dashboard tracking live performance against SLAs, an error dashboard mapping failure trends, and 20 alerts tuned to fire without false alarms.",
      "Developed and enhanced automated regression suites using Rest Assured, reducing manual testing effort.",
      "Ran functional and integration tests on distributed systems and triaged production incidents.",
      "Contributed to CI/CD quality gates for release validation.",
    ],
  },
  {
    role: "Network Operations Analyst",
    company: "Mastercard",
    period: "Nov 2021 — Dec 2022",
    bullets: [
      "Provided technical analysis and support for 18 customer-impacting applications.",
      "Retrieved data with SQL and accessed remote servers over SSH using Unix commands.",
      "Created automation processes utilizing Python and Selenium.",
    ],
  },
  {
    role: "Vehicle Service Technician",
    company: "Enterprise Holdings",
    period: "Oct 2015 — Nov 2021",
    bullets: [
      "Analyzed an average of one hundred vehicles per week for damage, inoperative equipment, and safety hazards.",
      "Communicated with partnering shops to move vehicles in and out of the database, raising customer service score to 90/100.",
    ],
  },
];

export const education = [
  {
    school: "Flatiron School",
    degree: "Full Stack Developer Program",
    period: "Jan — Jun 2020",
  },
  {
    school: "LaunchCode",
    degree: "CS50x",
    period: "2016",
  },
  {
    school: "Lincoln University",
    degree: "Computer Information Systems",
    period: "2009 — 2014",
  },
];
