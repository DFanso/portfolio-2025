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
    title: "Techxeed",
    description: "A comprehensive digital solutions platform offering web development, mobile apps, AI solutions, and digital marketing services. Features include a mobile app for project management, secure Stripe payments, and a content hub for business insights. The platform serves both creators and businesses with over 130 specialized skills.",
    tech: [
      { name: "Next.js", color: "nextjs" },
      { name: "Nest.js", color: "nestjs" },
      { name: "MongoDB", color: "mongodb" },
      { name: "TailwindCSS", color: "tailwindcss" },
      { name: "Firebase", color: "firebase" },
      { name: "AWS", color: "aws" },
      { name: "Stripe", color: "stripe" }
    ],
    demoUrl: "https://techxeed.com"
  },
  
  {
    title: "QuickQuest",
    description: "A location-based platform connecting customers with laborers, featuring real-time chat via SSE, geospatial queries with MongoDB, and secure PayPal transactions. Built with Next.js and Nest.js, it includes role-based frontends, AWS Cognito authentication, and ML-powered recommendations.",
    tech: [
      { name: "Next.js", color: "nextjs" },
      { name: "Nest.js", color: "nestjs" },
      { name: "MongoDB", color: "mongodb" },
      { name: "Python", color: "python" },
      { name: "AWS", color: "aws" },
      { name: "TailwindCSS", color: "tailwindcss" },
      { name: "PayPal", color: "paypal" },
      { name: "Swagger", color: "swagger" },
      { name: "Jest", color: "jest" },
      { name: "ML", color: "ml" }
    ],
    repoUrl: "https://github.com/DFanso/QuickQuest"
  },
  
  {
    title: "CineMagic Cinema",
    description: "A comprehensive cinema ticket booking system featuring real-time seat selection, secure payments via PayPal, and automated movie data sync with OMDB API. Includes user authentication, email notifications, and an admin dashboard for cinema management. Built with React, NestJS, and MongoDB, utilizing WebSocket for real-time updates.",
    tech: [
      { name: "React.js", color: "reactjs" },
      { name: "Redux", color: "redux" },
      { name: "Nest.js", color: "nestjs" },
      { name: "MongoDB", color: "mongodb" },
      { name: "WebSocket", color: "websocket" },
      { name: "PayPal", color: "paypal" },
      { name: "Swagger", color: "swagger" },
      { name: "Jest", color: "jest" },
    ],
    repoUrl: "https://github.com/DFanso/cine-magic-cinema"
  },
  {
    title: "K8s DigitalOcean Cluster",
    description: "Infrastructure as Code project that automates the setup of a Kubernetes cluster on DigitalOcean using Terraform. Features include VPC creation, master-worker node configuration, and project integration.",
    tech: [
      { name: "Terraform", color: "terraform" },
      { name: "Kubernetes", color: "kubernetes" },
      { name: "Docker", color: "docker" },
      { name: "Shell", color: "accent" },
      { name: "TypeScript", color: "typescript" }
    ],
    repoUrl: "https://github.com/DFanso/k8s-digitalOcean"
  },
];
