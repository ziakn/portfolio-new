import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Resume – Zia Muhammad | Full Stack Software Engineer | 7+ Years in Qatar',
  description:
    "Zia Muhammad's CV and resume. Full Stack Software Engineer with 7+ years in Doha, Qatar. Expert in Laravel, React.js, Next.js, LLM/AI integrations.",
  alternates: { canonical: 'https://ziamuhammad.com/resume' },
  openGraph: {
    title: 'Resume – Zia Muhammad | Full Stack Software Engineer in Doha, Qatar',
    description:
      '7+ years of full-stack engineering experience in Qatar. Expert in Laravel, React.js, Next.js, AI/LLM integrations.',
    url: 'https://ziamuhammad.com/resume',
    type: 'profile',
  },
};

const skills = [
  { name: 'Web Development', value: 90 },
  { name: 'Frontend Frameworks', value: 85 },
  { name: 'Backend & APIs', value: 90 },
  { name: 'Databases', value: 85 },
  { name: 'Server & Deployment', value: 80 },
];

const skillDetails = [
  { label: 'Languages & Frameworks', text: 'Laravel (PHP/MVC), React.js, React Native, Vue.js, Next.js, JavaScript, TypeScript, HTML, CSS, SCSS' },
  { label: 'AI & LLMs', text: 'OpenAI API (GPT-4o), Google Gemini API, Ollama (local LLM deployment), RAG pipelines, vector databases (ChromaDB), prompt engineering' },
  { label: 'Databases', text: 'MySQL, MariaDB, PostgreSQL, SQL Server — optimization, indexing & query performance tuning' },
  { label: 'APIs & Integrations', text: 'RESTful APIs, Google Maps, Facebook/Meta, X (Twitter), Payment Gateways (Stripe, CyberSource, Qpay, Sadad), SMS (Twilio, Ooredoo), RSS, Sitemap XML' },
  { label: 'Architecture', text: 'MVC, MVP, real-time systems (WebSockets, Pusher), microservices, API-first design' },
  { label: 'Server & Deployment', text: 'Linux (Ubuntu, CentOS, AlmaLinux), Apache, Nginx, Docker, SSL, cPanel, shell scripting, cloud hosting, server optimization' },
  { label: 'Tools & Workflow', text: 'Git, GitHub, GitLab, Bitbucket, Postman, JMeter, AB Load Testing, JIRA, Trello, Slack, Agile/Scrum' },
];

export default function ResumePage() {
  return (
    <article className="resume active" data-page="resume">
      <Script id="breadcrumb-json-ld" type="application/ld+json" strategy="afterInteractive">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ziamuhammad.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Resume",
                "item": "https://ziamuhammad.com/resume"
              }
            ]
          }
        `}
      </Script>
      <header>
        <h1 className="h1 article-title">Resume</h1>
      </header>

      {/* Education */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h2 className="h2">Education</h2>
        </div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Institute of Management Sciences (IMSciences), Peshawar
            </h4>
            <span>2014 — 2018</span>
            <p className="timeline-text">BS Software Engineering (Hons.)</p>
          </li>
        </ol>
      </section>

      {/* Experience */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h2 className="h2">Experience</h2>
          <div className="resume-buttons">
            <a href="/resume/CV - Zia Muhammad.pdf" target="_blank" className="btn-plain">
              View Resume
            </a>
            <a href="/resume/CV - Zia Muhammad.pdf" download className="btn-plain">
              Download Resume
            </a>
          </div>
        </div>

        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Key Achievements</h4>
            <ul className="timeline-text">
              <li>Scaled Al Sharq News &amp; The Peninsula Qatar to 2M+ monthly users and 85M+ yearly views.</li>
              <li>Integrated LLMs (OpenAI, Gemini, Ollama) and RAG pipelines into live news platforms.</li>
              <li>Engineered zero-downtime migration of 12M+ records with full data integrity.</li>
              <li>Shipped 30+ RESTful APIs across mobile and web apps in 5 industries.</li>
              <li>Integrated payment gateways (CyberSource, Stripe, Qpay, Sadad) and SMS providers.</li>
              <li>Delivered React Native apps for news, e-commerce, and food delivery.</li>
              <li><Link href="/portfolio" style={{color: 'var(--orange-yellow-crayola)', textDecoration: 'underline'}}>View all projects →</Link></li>
            </ul>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Full Stack Software Engineer</h4>
            <span>Dar Al-Sharq Group, Doha, Qatar | Dec 2020 – Present</span>
            <ul className="timeline-text">
              <li>Designed and developed high-traffic platforms using Laravel, React.js, Next.js, Vue.js.</li>
              <li>Managed scalable MySQL/MariaDB/PostgreSQL/SQLServer databases.</li>
              <li>Integrated LLMs (OpenAI API, Gemini, Ollama) and RAG pipelines.</li>
              <li>Wrote reusable RESTful APIs for mobile apps and third-party integrations.</li>
              <li>Migrated millions of records with APIs ensuring consistency and performance.</li>
              <li>Led software lifecycle phases: SDLC, Agile methodologies, code reviews, and deployment.</li>
              <li>Collaborated with UI/UX teams for cross-platform responsive design.</li>
              <li>Research and implement new technology stacks.</li>
              <li>Design and prepare technical documentation supporting team collaboration.</li>
            </ul>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Software Engineer</h4>
            <span>SimplistQ Solutions, Doha, Qatar | Sep 2018 – Nov 2020</span>
            <ul className="timeline-text">
              <li>Developed full-stack web applications in Laravel, React.js, and Vue.js.</li>
              <li>Deployed CRM and invoicing systems for enterprise clients.</li>
              <li>Performed unit testing and system debugging to ensure stability.</li>
              <li>Mentored junior developers and coordinated with clients on project deliverables.</li>
            </ul>
          </li>
        </ol>
      </section>

      {/* Skills */}
      <section className="skill">
        <h2 className="h2 skills-title">My Skills</h2>
        <ul className="skills-list content-card">
          {skills.map((s) => (
            <li className="skills-item" key={s.name}>
              <div className="title-wrapper">
                <h5 className="h5">{s.name}</h5>
                <data value={s.value}>{s.value}%</data>
              </div>
              <div className="skill-progress-bg">
                <div className="skill-progress-fill" style={{ width: `${s.value}%` }}></div>
              </div>
            </li>
          ))}
        </ul>

        <ul className="skills-detail">
          {skillDetails.map((d) => (
            <li key={d.label}>
              <strong>{d.label}:</strong> {d.text}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
