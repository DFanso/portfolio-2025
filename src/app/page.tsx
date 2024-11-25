import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Leo Felcianas - DevOps & Software Engineer',
  description: 'Portfolio of Leo Felcianas, DevOps & Software Engineer',
};

export default function Home() {
  return (
    <div className="min-h-screen p-8 space-y-12 max-w-7xl mx-auto dark:bg-[#1A1A1A] dark:text-white">
      {/* Hero Section */}
      <header className="space-y-8">
        <h1 className="heading-style">
          Hey, I'm <span className="gradient-text">Leo Felcianas</span>
          <br />
          DevOps & Software Engineer
        </h1>
        <p className="text-xl font-bold max-w-2xl">
          Associate DevOps Engineer at Empite | First Class Honours Graduate from University of Plymouth | 
          Specialized in DevOps pipelines and Backend development.
        </p>
        <div className="flex gap-4">
          <a href="mailto:leogavin123@outlook.com" className="button bg-[var(--yellow)]">Get in Touch</a>
          <a href="tel:+940772067102" className="button neo-brutalism-accent">Call Me</a>
        </div>
      </header>

      {/* Skills Section */}
      <section className="card space-y-6">
        <h2 className="text-3xl font-bold">Top Skills</h2>
        <div className="flex flex-wrap gap-3">
          <span className="skill-tag bg-[var(--yellow)] text-black">Load Testing</span>
          <span className="skill-tag bg-[var(--green)] text-black">Infrastructure as Code</span>
          <span className="skill-tag bg-[var(--blue)] text-black">Azure DevOps</span>
          <span className="skill-tag bg-[var(--purple)] text-black dark:text-white">MERN Stack</span>
          <span className="skill-tag bg-[var(--pink)] text-black dark:text-white">Docker</span>
          <span className="skill-tag bg-[var(--accent)] text-white">AWS</span>
        </div>
      </section>

      {/* Experience Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Experience</h2>
        <div className="card space-y-4">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold">Empite</h3>
              <p className="text-lg font-bold text-[var(--accent)]">Associate DevOps Engineer</p>
            </div>
            <span className="neo-brutalism px-3 py-1 text-sm font-bold bg-[var(--yellow)]">Nov 2024 - Present</span>
          </div>
          <p>DevOps engineering and infrastructure management</p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card space-y-4">
            <h3 className="text-2xl font-bold">QuickQuest</h3>
            <p>A platform connecting customers with laborers using geospatial queries and real-time chat.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[var(--yellow)] neo-brutalism text-sm font-bold">Nest.js</span>
              <span className="px-3 py-1 bg-[var(--green)] neo-brutalism text-sm font-bold">Next.js</span>
              <span className="px-3 py-1 bg-[var(--blue)] neo-brutalism text-sm font-bold">MongoDB</span>
            </div>
          </div>

          <div className="card space-y-4">
            <h3 className="text-2xl font-bold">B2B Portal</h3>
            <p>Java Spring Boot microservices project for secure B2B product purchases.</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[var(--purple)] neo-brutalism text-sm font-bold text-white">Spring Boot</span>
              <span className="px-3 py-1 bg-[var(--pink)] neo-brutalism text-sm font-bold text-white">Docker</span>
              <span className="px-3 py-1 bg-[var(--accent)] neo-brutalism text-sm font-bold text-white">Postgres</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="card space-y-6">
        <h2 className="text-3xl font-bold">Let's Connect</h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/leogavin" target="_blank" rel="noopener noreferrer" 
             className="button bg-[var(--blue)]">LinkedIn</a>
          <a href="https://github.com/DFanso" target="_blank" rel="noopener noreferrer" 
             className="button bg-[var(--purple)] text-white">GitHub</a>
          <a href="https://dfanso.github.io/Portfolio-Site/" target="_blank" rel="noopener noreferrer" 
             className="button bg-[var(--green)]">Portfolio</a>
        </div>
        <div className="mt-4 space-y-2">
          <p className="font-bold">📧 leogavin123@outlook.com</p>
          <p className="font-bold">📱 +94 772067102</p>
          <p className="font-bold">📍 Colombo, Western Province, Sri Lanka</p>
        </div>
      </section>
    </div>
  );
}
