import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Zia Muhammad | Full Stack Software Engineer in Doha, Qatar',
  description:
    'Zia Muhammad – Full Stack Software Engineer in Doha, Qatar with 7+ years of experience. Expert in Laravel, React.js, Next.js, REST APIs, and LLM Integrations.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Zia Muhammad | Full Stack Software Engineer in Doha, Qatar',
    description:
      'Full Stack Software Engineer with 7+ years of experience scaling high-traffic platforms in Qatar.',
    url: '/',
  },
};

const services = [
  {
    icon: '/images/icon-dev.svg',
    title: 'Web Development',
    text: 'Building fast, scalable, and secure websites using Laravel, React.js, Vue.js, and Next.js. From corporate websites to high-traffic platforms in Qatar, I deliver tailor-made solutions with excellent performance.',
  },
  {
    icon: '/images/icon-api.svg',
    title: 'API Development',
    text: 'Designing and integrating secure REST APIs for mobile and web applications. Experienced in payment gateways, SMS services, Google Maps, and real-time apps with WebSockets & Pusher.',
  },
  {
    icon: '/images/icon-app.svg',
    title: 'Mobile Development',
    text: 'Creating cross-platform mobile apps with React Native. Delivering intuitive, responsive, and feature-rich applications for iOS and Android to help businesses connect with customers in Qatar and beyond.',
  },
  {
    icon: '/images/icon-hosting.svg',
    title: 'Hosting & Deployment',
    text: 'Offering reliable hosting solutions including VPS, cloud-based hosting, and dedicated servers. Expertise in deployment on Linux environments (Ubuntu, CentOS, AlmaLinux) with Apache/Nginx.',
  },
  {
    icon: '/images/icon-seo.svg',
    title: 'SEO Optimization',
    text: 'Boosting online visibility and search rankings with tailored SEO strategies. Helping businesses in Qatar attract more visitors and achieve higher conversions.',
  },
  {
    icon: '/images/icon-consulting.svg',
    title: 'IT Consultation',
    text: 'Providing expert IT consulting services in Qatar, helping organizations make the right technology choices for growth, security, and scalability.',
  },
];

const certifications = [
  { title: 'National Cyber Security Drill – NCSA Qatar', href: 'https://drive.google.com/file/d/12YQUkp1YYUh46x2vc_5T9L-5PJ8leAEz/view?usp=drive_link' },
  { title: 'GCP Fundamentals: Big Data & Machine Learning – Cloud Onboard', href: 'https://drive.google.com/file/d/1WTm0cJTXCmSf8j2i4Pi4o4keCA4DqEPL/view?usp=drive_link' },
  { title: 'MS Word – Microsoft', href: 'https://drive.google.com/file/d/1XXESYM6JkBI8wqFyz88As6GpulOCu834/view' },
  { title: 'MS Excel – Microsoft', href: 'https://drive.google.com/file/d/17NW9qB-pZTHXNkf0ZF9_zDKrSJcCaTCI/view' },
  { title: 'MS PowerPoint – Microsoft', href: 'https://drive.google.com/file/d/1Q-SQn6fVjeA2B3_oEhabToSO7X5kw-Ea/view' },
];

export default function AboutPage() {
  return (
    <article className="about active" data-page="about">
      <header>
        <h1 className="h1 article-title">About Me</h1>
      </header>

      <section className="about-text">
        <p>
          I&apos;m a <strong>Full Stack Software Engineer & Laravel Developer in Qatar</strong> with{' '}
          <strong>7+ years</strong> of experience building high-performance web applications. I specialize in
          scaling enterprise platforms, including{' '}
          <strong>Al Sharq News and The Peninsula Qatar (85M+ yearly views)</strong>.
        </p>
        <p>
          As a <strong>Next.js & React Expert</strong>, I focus on creating fast, SEO-optimized frontends
          integrated with robust PHP/Laravel backends. My current focus is <strong>AI Engineering</strong>—integrating 
          <strong>LLMs (OpenAI, Gemini)</strong> and <strong>RAG pipelines</strong> into production systems to 
          automate content workflows and enhance user engagement.
        </p>
        <p>
          If you are looking to <strong>hire a software engineer in Doha</strong> or need a 
          consultant for <strong>zero-downtime database migrations</strong> and <strong>API architecture</strong>, 
          let&apos;s connect. I help businesses in Qatar and globally transform their digital presence 
          with state-of-the-art technology.
        </p>
      </section>

      <section className="service">
        <h3 className="h3 service-title">What I&apos;m Doing</h3>
        <ul className="service-list">
          {services.map((s) => (
            <li className="service-item" key={s.title}>
              <div className="service-icon-box">
                <Image src={s.icon} alt={`${s.title} icon`} width={40} height={40} />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{s.title}</h4>
                <p className="service-item-text">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="certifications-section">
        <h3 className="h3 certifications-title">Certifications</h3>
        <ul className="certifications-list">
          {certifications.map((c) => (
            <li className="cert-card" key={c.title}>
              <a href={c.href} target="_blank" rel="noopener noreferrer">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
