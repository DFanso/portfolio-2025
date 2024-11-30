interface Experience {
  company: string;
  companyDescription?: string;
  position: string;
  period: string;
  current: boolean;
  description?: string;
  items: string[];
  technologies: Array<{
    name: string;
    color: string;
  }>;
}

export const experiences: Experience[] = [
  {
    company: "Empite",
    companyDescription: "A leading software development company specializing in enterprise solutions and digital transformation.",
    position: "Associate DevOps Engineer",
    period: "November 2024 - Present",
    current: true,
    description: "As an Associate DevOps Engineer at Empite, I specialize in:",
    items: [
      "Building and maintaining CI/CD pipelines using Azure DevOps",
      "Infrastructure as Code (IaC) implementation with Terraform",
      "Container orchestration with Docker and Kubernetes",
      "Cloud infrastructure management on AWS and Azure",
      "Monitoring and logging system implementation",
      "Automation of deployment processes"
    ],
    technologies: [
      { name: "Azure DevOps", color: "azure" },
      { name: "AWS", color: "aws" },
      { name: "Docker", color: "docker" },
      { name: "Kubernetes", color: "kubernetes" },
      { name: "Terraform", color: "terraform" },
      { name: "CI/CD", color: "accent" }
    ]
  },
  {
    company: "Empite",
    companyDescription: "A leading software development company specializing in enterprise solutions and digital transformation.",
    position: "Software Engineer Intern",
    period: "July 2024 - October 2024",
    current: false,
    items: [
      "Developed and maintained web applications using modern frameworks",
      "Collaborated with senior developers on project implementations",
      "Participated in code reviews and agile development processes",
      "Assisted in DevOps tasks and CI/CD pipeline maintenance"
    ],
    technologies: [
      { name: "Next.js", color: "nextjs" },
      { name: "NestJS", color: "nestjs" },
      { name: "Swagger", color: "swagger" },
      { name: "TypeScript", color: "typescript" },
      { name: "Docker", color: "docker" },
      { name: "Kubernetes", color: "kubernetes" },
      { name:"MySQL", color:"mysql"},
    ]
  },
  {
    company: "Fiverr",
    companyDescription: "World's largest marketplace for digital services, connecting freelancers with clients globally.",
    position: "Software Engineer",
    period: "May 2023 - Present",
    current: false,
    items: [
      "Developing custom web and mobile applications for clients",
      "Providing technical consulting and solution architecture",
      "Implementing full-stack solutions with modern technologies",
      "Managing client relationships and project deliverables"
    ],
    technologies: [
      { name: "TypeScript", color: "typescript" },
      { name: "Docker", color: "docker" },
      { name: "Next.js", color: "nextjs" },
      { name: "NestJS", color: "nestjs" },
      { name: "MongoDB", color: "mongodb" },
      { name: "AWS", color: "aws" }
    ]
  },
  
  
];
