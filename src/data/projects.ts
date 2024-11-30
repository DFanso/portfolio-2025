interface Tech {
  name: string;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  tech: Tech[];
  repoUrl?: string; // Optional repository URL
  demoUrl?: string; // Optional demo URL
  image?: string;   // Optional project image
}

export const projects: Project[] = [
  {
    title: "QuickQuest",
    description: "A platform connecting customers with laborers using geospatial queries and real-time chat.",
    tech: [
      { name: "Nest.js", color: "nestjs" },
      { name: "Next.js", color: "nextjs" },
      { name: "MongoDB", color: "mongodb" }
    ],
    repoUrl: "https://github.com/DFanso/QuickQuest"
  },
  {
    title: "CineMagic Cinema",
    description: "Online ticket booking system with client, admin, and server components. Integrated with PayPal and OMDB API.",
    tech: [
      { name: "React.js", color: "reactjs" },
      { name: "Nest.js", color: "nestjs" },
      { name: "MongoDB", color: "mongodb" }
    ],
    repoUrl: "https://github.com/DFanso/CineMagic"
  }
];
