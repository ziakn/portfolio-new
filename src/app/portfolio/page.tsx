'use client';

import { useState } from 'react';
import Image from 'next/image';

const projects = [
  { 
    title: 'Al Sharq News', 
    category: 'web development', 
    href: 'https://al-sharq.com/', 
    img: '/images/al-sharq.png', 
    desc: 'Scaled high-traffic Arabic daily to 85M+ yearly views using Laravel and React. Optimized frontend performance and managed real-time content delivery.' 
  },
  { 
    title: 'The Peninsula Qatar', 
    category: 'web development', 
    href: 'https://thepeninsulaqatar.com/', 
    img: '/images/peninsula.png', 
    desc: 'Engineered zero-downtime migration of 12M+ records for Qatar’s leading English news site. Improved page load speed and user engagement by 40%.' 
  },
  { 
    title: 'Alarab News', 
    category: 'web design', 
    href: 'https://alarab.qa/', 
    img: '/images/alarab.png', 
    desc: 'Designed and developed a global Middle East news hub with a focus on RTL layout optimization and high-fidelity responsive design.' 
  },
  { 
    title: 'Lusail News', 
    category: 'applications', 
    href: 'https://lusailnews.net/', 
    img: '/images/lusail.png', 
    desc: 'Developed robust RESTful APIs and backend services for a mobile news application, ensuring seamless integration and high availability.' 
  },
  { 
    title: 'Qatar Press Centre', 
    category: 'web design', 
    href: 'https://qatarpressc.qa/', 
    img: '/images/qatarpressc.png', 
    desc: 'Built a centralized media hub for journalists and influencers, featuring advanced content management and influencer tracking tools.' 
  },
  { 
    title: 'Tasklink', 
    category: 'web development', 
    href: 'https://tasklink.qa', 
    img: '/images/project-1.jpg', 
    desc: 'Created a remote freelancer marketplace application with real-time job bidding, secure payment integration, and user verification systems.' 
  },
  { 
    title: 'Foras', 
    category: 'web development', 
    href: 'https://foras.qa', 
    img: '/images/project-2.png', 
    desc: 'Developed a feature-rich e-commerce platform with multi-vendor support, automated inventory management, and integrated shipping providers.' 
  },
  { 
    title: 'Thakira Al Sharq', 
    category: 'web development', 
    href: 'https://thakiratalsharq.com/', 
    img: '/images/thakiratalsharq.png', 
    desc: 'Architected a massive newspaper archival platform. Solved data search latency for millions of records using advanced database indexing.' 
  },
  { 
    title: 'Kids Expo', 
    category: 'applications', 
    href: 'https://www.kidsexpo.qa/en', 
    img: '/images/kidsexpo.png', 
    desc: 'Platform for government-led education and health events. Managed high-concurrency registration and live attendee tracking.' 
  },
];

const categories = ['all', 'web development', 'web design', 'applications', 'mobile development'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  const [selectOpen, setSelectOpen] = useState(false);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <article className="portfolio active" data-page="portfolio">
      <header>
        <h1 className="h1 article-title">Portfolio</h1>
      </header>

      <section className="projects">
        {/* Desktop filter buttons */}
        <ul className="filter-list">
          {categories.map((c) => (
            <li className="filter-item" key={c}>
              <button
                className={filter === c ? 'active' : ''}
                onClick={() => setFilter(c)}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile select dropdown */}
        <div className="filter-select-box">
          <button
            className={`filter-select${selectOpen ? ' active' : ''}`}
            onClick={() => setSelectOpen(!selectOpen)}
          >
            <div className="select-value">
              {filter === 'all' ? 'Select category' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>
          <ul className="select-list">
            {categories.map((c) => (
              <li className="select-item" key={c}>
                <button
                  onClick={() => {
                    setFilter(c);
                    setSelectOpen(false);
                  }}
                >
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="project-list">
          {filtered.map((p) => (
            <li className="project-item active" key={p.title}>
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <figure className="project-img">
                  <div className="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <Image
                    src={p.img}
                    alt={p.title}
                    width={600}
                    height={400}
                    loading="lazy"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </figure>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-category">{p.desc}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
