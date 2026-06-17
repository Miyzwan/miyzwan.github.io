import Image from "next/image";

type Project = {
  title: string;
  description: string;
  stack: string[];
  href: string;
  image: string;
};

const projects: Project[] = [
  {
    title: "Facial Emotion Recognition",
    description:
      "A computer vision project that classifies facial expressions in real time using a TensorFlow CNN pipeline optimized for practical inference.",
    stack: ["Python", "TensorFlow", "OpenCV"],
    href: "https://github.com/Miyzwan/EmoScan",
    image: "/assets/head1.png",
  },
  {
    title: "Bitcoin Price Prediction",
    description:
      "A forecasting study using LSTM and GRU models on long-range historical market data to evaluate sequence-learning performance in financial trends.",
    stack: ["Python", "TensorFlow", "Scikit-learn"],
    href: "https://github.com/Miyzwan/BTC-Price-Prediction",
    image: "/assets/bitcoin-forecast.svg",
  },
  {
    title: "Boarding House Manager",
    description:
      "A web platform that streamlines boarding house operations, from resident records and payment tracking to day-to-day facility management.",
    stack: ["Flask", "Python", "SQLite"],
    href: "https://github.com/Miyzwan/BoardingHouse-Manager",
    image: "/assets/BoardingHouseManagement.png",
  },
  {
    title: "SIMRS Hospital System",
    description:
      "A healthcare information system concept focused on improving clinical administration workflows and delivering better operational visibility.",
    stack: ["Python", "Flask", "Bootstrap"],
    href: "https://github.com/Miyzwan/SIMRS",
    image: "/assets/SIMRS.png",
  },
  {
    title: "Smart Study Organizer",
    description:
      "A productivity application built to help students plan study sessions, manage coursework, and stay consistent with smart reminders.",
    stack: ["Tailwind", "Flask", "Docker"],
    href: "https://github.com/Miyzwan/Kelompok-5",
    image: "/assets/smorgan.png",
  },
];

const highlights = [
  {
    title: "AI + Product Mindset",
    text: "Building machine learning solutions with a strong focus on real-world usability and measurable outcomes.",
  },
  {
    title: "Full-Stack Execution",
    text: "Designing and shipping end-to-end web experiences with modern frontend patterns and dependable backend logic.",
  },
  {
    title: "Cloud-Ready Thinking",
    text: "Approaching architecture with scalability, deployment, and long-term maintainability in mind.",
  },
];

const skills = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "JavaScript",
  "Tailwind CSS",
  "Flask",
  "Docker",
  "AWS",
  "Kubernetes",
  "SQL",
  "Git",
];

export default function Home() {
  return (
    <div className="portfolio-root">
      <header className="site-header">
        <a href="#home" className="brand">
          MIYZWAN
        </a>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#highlights">Highlights</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-pad">
          <p className="eyebrow">Portfolio</p>
          <h1>
            Dimas Dwi Ismaunnizam
            <span>Machine Learning & Web Developer</span>
          </h1>
          <p className="lead">
            I build intelligent, polished, and scalable digital products—combining machine learning insight with production-ready web engineering.
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              Let&apos;s Collaborate
            </a>
          </div>
        </section>

        <section id="about" className="section-pad split-section">
          <div>
            <h2>About</h2>
            <p>
              I&apos;m a Computer Science student at Binus University, passionate about building software that feels effortless to use and strong under the hood.
              My work sits at the intersection of AI, modern web development, and cloud practices.
            </p>
            <p>
              From data-driven prototypes to full web applications, I focus on delivering solutions that are technically sound, practical, and ready to evolve.
            </p>
          </div>
          <div className="profile-card">
            <Image src="/assets/head1.png" alt="Dimas Dwi Ismaunnizam" width={280} height={280} className="profile-image" priority />
            <h3>Based in Jakarta, Indonesia</h3>
            <p>Open to internships, collaborations, and impactful product work.</p>
          </div>
        </section>

        <section id="skills" className="section-pad">
          <h2>Skills & Technologies</h2>
          <p className="section-intro">A focused stack for AI-powered applications, robust backend systems, and premium front-end experiences.</p>
          <div className="chips">
            {skills.map((skill) => (
              <span key={skill} className="chip">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="section-pad">
          <h2>Selected Projects</h2>
          <p className="section-intro">A curated look at projects across machine learning, productivity systems, and application engineering.</p>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <Image src={project.image} alt={project.title} width={640} height={360} className="project-image" />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="stack-list" aria-label={`${project.title} technologies`}>
                    {project.stack.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                    View Repository
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="highlights" className="section-pad">
          <h2>Experience Highlights</h2>
          <div className="highlight-grid">
            {highlights.map((highlight) => (
              <article key={highlight.title} className="highlight-card">
                <h3>{highlight.title}</h3>
                <p>{highlight.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-pad contact-panel">
          <h2>Let&apos;s Build Something Great</h2>
          <p>
            If you&apos;re looking for a developer who can bridge machine learning ideas and production-ready web products, I&apos;d love to connect.
          </p>
          <div className="contact-links">
            <a href="mailto:dimas.ismaunnizam@binus.ac.id" className="btn btn-primary">
              Email Me
            </a>
            <a href="https://github.com/Miyzwan" target="_blank" rel="noreferrer" className="btn btn-ghost">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/miyzwan/" target="_blank" rel="noreferrer" className="btn btn-ghost">
              LinkedIn
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
