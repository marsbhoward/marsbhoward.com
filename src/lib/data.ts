export const site = {
  name: "Mars B. Howard",
  title: "Full Stack Software Engineer",
  location: "Saint Louis, MO",
  email: "marsbhoward@icloud.com",
  phone: "(314) 313-6452",
  tagline: "I build fast, accessible web experiences.",
  bio: [
    "I'm a full-stack software engineer with a deep passion for problem solving, working across Java and JavaScript frameworks along with SQL and NoSQL databases. Most recently I spent over three years as a Software Engineer in Test at Mastercard, building automated regression suites and monitoring infrastructure that kept production systems reliable.",
    "Today I'm the founder and lead engineer behind Donada, a Cardano-based NFT platform where holders can rent out their assets to earn yield and become eligible for scheduled, automatically-paid prize draws. As a solo developer, I own the full stack — smart contracts, frontend, and infrastructure.",
    "When I'm not building, you'll find me biking, gaming, tinkering on hobby coding projects, or indulging in general nerdery 🤓.",
  ],
  socials: {
    github: "https://github.com/marsbhoward",
    linkedin: "https://www.linkedin.com/in/mars-howard/",
  },
};

export const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Redux",
  "Ruby on Rails",
  "Java",
  "Python",
  "Rest Assured",
  "Selenium",
  "Postman",
  "Insomnia",
  "Splunk",
  "Dynatrace",
  "PostgreSQL",
  "SQLite",
  "Git",
  "Heroku",
  "Linux/Unix",
  "SSH",
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  apiLink?: string;
  repo?: string;
  category: "work" | "hobby";
};

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

export type Job = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    role: "Founder & Lead Engineer",
    company: "Donada",
    period: "Apr 2026 — Present",
    bullets: [
      "Built and maintain a Cardano-based NFT platform end to end — smart contracts, frontend, and infrastructure — as the sole engineer.",
      "Designed a rental contract system letting NFT holders earn yield while renters and community wallets gain eligibility for scheduled, automatically-paid on-chain prize draws.",
      "Shipped an on-demand NFT minting platform backed by an Aiken Plutus V3 minting policy with on-chain price enforcement.",
    ],
  },
  {
    role: "Software Engineer in Test",
    company: "Mastercard",
    period: "Dec 2022 — Apr 2026",
    bullets: [
      "Designed and maintained Splunk and Dynatrace monitoring infrastructure to improve production visibility.",
      "Developed and enhanced automated regression suites using Rest Assured, reducing manual testing effort.",
      "Performed functional and integration testing in distributed systems environments.",
      "Collaborated with engineering and operations teams to troubleshoot production incidents.",
      "Contributed to CI/CD quality gates for release validation.",
    ],
  },
  {
    role: "Network Operations Analyst",
    company: "Mastercard",
    period: "Nov 2021 — Dec 2022",
    bullets: [
      "Provided technical analysis and support to eighteen customer-impacting applications.",
      "Retrieved database information via SQL and accessed remote servers via SSH and Unix commands.",
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
    school: "Launch Code",
    degree: "CS50x",
    period: "2016",
  },
  {
    school: "Lincoln University",
    degree: "Computer Information Systems",
    period: "2009 — 2014",
  },
];
