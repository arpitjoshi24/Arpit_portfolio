import {
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, SiTypescript,
  SiNodedotjs, SiPython, SiFastapi, SiMongodb, SiFirebase, SiRedis,
  SiPostgresql, SiDocker, SiGit, SiGithub, SiVercel,
} from "react-icons/si";

export const RARITY = {
  legendary: { label: "Legendary", color: "#e3a72f" },
  epic: { label: "Epic", color: "#a86bff" },
  rare: { label: "Rare", color: "#4ea1ff" },
};

// ✏️ edit names, levels and descriptions to match the real you
export const SKILLS = [
  { id: "react", name: "React", Icon: SiReact, color: "#61DAFB", type: "UI Library", rarity: "legendary", level: 92, desc: "Builds living interfaces out of tiny reusable spells." },
  { id: "nextjs", name: "Next.js", Icon: SiNextdotjs, color: "#f5f0e6", type: "Framework", rarity: "legendary", level: 90, desc: "A whole realm in one: routing, SSR and API routes." },
  { id: "tailwind", name: "Tailwind", Icon: SiTailwindcss, color: "#38BDF8", type: "Styling", rarity: "legendary", level: 94, desc: "Casts beautiful styles at lightning speed." },
  { id: "javascript", name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", type: "Language", rarity: "legendary", level: 93, desc: "The native tongue of the web. The weapon of choice." },
  { id: "typescript", name: "TypeScript", Icon: SiTypescript, color: "#4a9be8", type: "Language", rarity: "epic", level: 78, desc: "Armor for JavaScript: bugs get caught before they bite." },
  { id: "nodejs", name: "Node.js", Icon: SiNodedotjs, color: "#6CC24A", type: "Runtime", rarity: "epic", level: 82, desc: "Runs JavaScript on the server side of the kingdom." },
  { id: "python", name: "Python", Icon: SiPython, color: "#5aa9e6", type: "Language", rarity: "epic", level: 80, desc: "A calm, readable language for scripts and backends." },
  { id: "fastapi", name: "FastAPI", Icon: SiFastapi, color: "#2dd4bf", type: "Backend Framework", rarity: "epic", level: 85, desc: "Blazing fast Python APIs with docs that write themselves." },
  { id: "mongodb", name: "MongoDB", Icon: SiMongodb, color: "#4DB33D", type: "Database", rarity: "rare", level: 80, desc: "A flexible vault for documents of every shape." },
  { id: "firebase", name: "Firebase", Icon: SiFirebase, color: "#FFCA28", type: "Backend Service", rarity: "epic", level: 82, desc: "Auth, realtime data and hosting without a server." },
  { id: "redis", name: "Redis", Icon: SiRedis, color: "#DC382D", type: "Cache", rarity: "rare", level: 70, desc: "Memory-fast cache that makes slow things instant." },
  { id: "postgresql", name: "PostgreSQL", Icon: SiPostgresql, color: "#6aa4d9", type: "Database", rarity: "rare", level: 68, desc: "The sturdy, trusted relational database." },
  { id: "docker", name: "Docker", Icon: SiDocker, color: "#2496ED", type: "DevOps", rarity: "epic", level: 74, desc: "Packs any app into a container that runs anywhere." },
  { id: "git", name: "Git", Icon: SiGit, color: "#F05032", type: "Version Control", rarity: "rare", level: 90, desc: "Time travel for code: every change can be undone." },
  { id: "github", name: "GitHub", Icon: SiGithub, color: "#f5f0e6", type: "Collaboration", rarity: "rare", level: 88, desc: "Home of the code, the reviews and the pull requests." },
  { id: "vercel", name: "Vercel", Icon: SiVercel, color: "#f5f0e6", type: "Deployment", rarity: "epic", level: 88, desc: "Ships the app to the world with a single push." },
];

export const BY_ID = Object.fromEntries(SKILLS.map((s) => [s.id, s]));

// first 3 = left column, last 3 = right column on the Equipment page
export const LOADOUT = [
  { slot: "head", label: "Head", id: "react" },
  { slot: "hands", label: "Hands", id: "tailwind" },
  { slot: "weapon", label: "Weapon", id: "javascript" },
  { slot: "chest", label: "Chest", id: "nextjs" },
  { slot: "legs", label: "Legs", id: "fastapi" },
  { slot: "shield", label: "Shield", id: "vercel" },
];

export const STATS = [
  { label: "Frontend", value: 92, color: "#e3a72f" },
  { label: "Backend", value: 80, color: "#d9622b" },
  { label: "Database", value: 74, color: "#1f5f5b" },
  { label: "DevOps", value: 70, color: "#a86bff" },
];