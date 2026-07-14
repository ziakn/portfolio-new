'use client';

import { useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

const projects = [
  { 
    title: 'Al Sharq News', 
    category: 'web development', 
    href: 'https://al-sharq.com/', 
    img: '/images/al-sharq.webp', 
    desc: 'Leading Arabic daily in Qatar with 85M+ views. Scaled using Laravel and React with optimized real-time content delivery.' 
  },
  { 
    title: 'The Peninsula Qatar', 
    category: 'web development', 
    href: 'https://thepeninsulaqatar.com/', 
    img: '/images/peninsula.webp', 
    desc: 'English news site with 65M+ views. Engineered zero-downtime migration and high-performance frontend architecture.' 
  },
  { 
    title: 'Alarab News', 
    category: 'web design', 
    href: 'https://alarab.qa/', 
    img: '/images/alarab.webp', 
    desc: 'Global Middle East news hub. Focused on RTL layout optimization and high-fidelity responsive design.' 
  },
  { 
    title: 'Lusail News', 
    category: 'applications', 
    href: 'https://lusailnews.net/', 
    img: '/images/lusail.webp', 
    desc: 'Robust APIs & backend for mobile news applications, ensuring seamless data integration and high availability.' 
  },
  { 
    title: 'Qatar Press Centre', 
    category: 'web design', 
    href: 'https://qatarpressc.qa/', 
    img: '/images/qatarpressc.webp', 
    desc: 'Journalist & influencer media hub with advanced content management and influencer tracking tools.' 
  },
  { 
    title: 'Tasklink', 
    category: 'web development', 
    href: 'https://tasklink.qa', 
    img: '/images/project-1.webp', 
    desc: 'Remote and Freelancer website/application with real-time job bidding and secure payment systems.' 
  },
  { 
    title: 'Foras', 
    category: 'web development', 
    href: 'https://foras.qa', 
    img: '/images/project-2.webp', 
    desc: 'Ecommerce website/application featuring multi-vendor support and automated inventory management.' 
  },
  { 
    title: 'Thakira Al Sharq', 
    category: 'web development', 
    href: 'https://thakiratalsharq.com/', 
    img: '/images/thakiratalsharq.webp', 
    desc: 'Newspaper archival & analytics platform. Solved data search latency for millions of historical records.' 
  },
  { 
    title: 'Kids Expo', 
    category: 'applications', 
    href: 'https://www.kidsexpo.qa/en', 
    img: '/images/kidsexpo.webp', 
    desc: 'Event platform for education, health, and government events. Managed high-concurrency registration.' 
  },
  { 
    title: 'Dar Al Sharq Group', 
    category: 'web development', 
    href: 'https://daralsharq.net/', 
    img: '/images/daralsharq.webp', 
    desc: 'Centralized publishing systems for Qatar\'s leading media group, unifying multiple publication workflows.' 
  },
  { 
    title: 'Alsharq Technology', 
    category: 'web development', 
    href: 'https://alsharqtech.com/', 
    img: '/images/alsharqtech.webp', 
    desc: 'Corporate Website and portfolio for a leading technology solutions provider in Doha, Qatar.' 
  },
  { 
    title: 'Top Solution Qatar', 
    category: 'applications', 
    href: 'https://topsolutionsqatar.com/', 
    img: '/images/topsolutionsqatar.webp', 
    desc: 'Turnkey exhibition services platform managing event logistics, services, and digital interactions.' 
  },
  { 
    title: 'Alwaraq Printing Press', 
    category: 'applications', 
    href: 'https://alwaraq.qa/', 
    img: '/images/alwaraq.webp', 
    desc: 'Printing ERP & workflow system managing production lifecycle, inventory, and customer orders.' 
  },
  { 
    title: 'Bon and Bean', 
    category: 'web development', 
    href: 'https://bonandbean.com/', 
    img: '/images/bonandbean.webp', 
    desc: 'Specialty coffee e-commerce platform with a premium shopping experience and subscription models.' 
  },
  { 
    title: 'Al Mahbara', 
    category: 'web development', 
    href: 'https://almahbrah.com/', 
    img: '/images/almahbrah.webp', 
    desc: 'Custom gift design & printing platform for personalized corporate and individual gifting solutions.' 
  },
  { 
    title: 'Alwaseet Qatar’s', 
    category: 'web development', 
    href: 'https://alwaseetqatar.com/', 
    img: '/images/alwaseetqatar.webp', 
    desc: 'Classified ads platform for selling and renting properties, vehicles, and services across Qatar.' 
  },
  { 
    title: 'Little Sailor', 
    category: 'mobile development', 
    href: 'https://www.littlesailor.com.qa/', 
    img: '/images/littlesailor.webp', 
    desc: 'Restaurant dine-in & takeaway application with real-time order tracking and loyalty integration.' 
  },
  { 
    title: 'Almass Water', 
    category: 'applications', 
    href: 'https://almaswater.com/', 
    img: '/images/almaswater.webp', 
    desc: 'Bottle distribution & delivery portal managing high-volume water supply and logistics.' 
  },
  { 
    title: 'KPK Arms License', 
    category: 'applications', 
    href: 'https://armslicensekpk.com/', 
    img: '/images/arms-license.webp', 
    desc: 'Digital licensing system for 22 districts in Pakistan, automating verification and issuance.' 
  },
  { 
    title: 'UET Peshawar', 
    category: 'applications', 
    href: 'https://uetpeshawar.edu.pk/', 
    img: '/images/uet-peshawar.webp', 
    desc: 'Academic system lifecycle participation, improving student portals and faculty management systems.' 
  },
  { 
    title: 'SoloStore', 
    category: 'web development', 
    img: '/images/solostore.webp', 
    desc: 'Single vendor shopping platform optimized for performance, conversion, and seamless UX.' 
  },
  { 
    title: 'Maroon Mall', 
    category: 'web development', 
    img: '/images/project-3.webp', 
    desc: 'Mall aggregator e-commerce platform connecting multiple retailers in a unified shopping portal.' 
  },
  { 
    title: 'Tiollo SaaS', 
    category: 'mobile development', 
    img: '/images/tiollo.webp', 
    desc: 'Multi-vendor food delivery & hotel booking SaaS with advanced dispatching and booking engines.' 
  },
  { 
    title: 'SimplistQ CRM', 
    category: 'applications', 
    img: '/images/project-4.webp', 
    desc: 'Enterprise CRM for invoicing, support, and payment integration (Twyla/Sadad) for corporate clients.' 
  },
  { 
    title: 'SimplistQ Sales', 
    category: 'applications', 
    img: '/images/project-5.webp', 
    desc: 'Internal telesales & staff communications tool for lead management and performance tracking.' 
  },
  { 
    title: 'SSR Qatar', 
    category: 'web development', 
    img: '/images/project-6.webp', 
    desc: 'HR & staffing portal for companies and job seekers with automated matching and profile management.' 
  },
  { 
    title: 'AJT Properties', 
    category: 'web development', 
    img: '/images/project-7.webp', 
    desc: 'Real estate sales & rental platforms with interactive property listings and lead generation.' 
  },
  { 
    title: 'Hamilton Qatar', 
    category: 'applications', 
    img: '/images/project-8.webp', 
    desc: 'Enterprise project management tool for Qatar Civil Defence (QCDD) compliance and monitoring.' 
  },
  { 
    title: 'Eaqaqa', 
    category: 'applications', 
    img: '/images/project-9.webp', 
    desc: 'Academic research publishing system for Qatar University, managing peer reviews and digital archives.' 
  },
];

const categories = ['all', 'web development', 'web design', 'applications', 'mobile development'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('all');
  const [selectOpen, setSelectOpen] = useState(false);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const renderProjectContent = (p: (typeof projects)[number]) => (
    <>
      <figure className="project-img">
        {p.href && (
          <div className="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
        )}
        <Image
          src={p.img}
          alt={`Screenshot of ${p.title} project: ${p.desc.substring(0, 100)}`}
          width={600}
          height={400}
          loading="lazy"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </figure>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-category">{p.desc}</p>
    </>
  );

  return (
    <article className="portfolio active" data-page="portfolio">
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
                "name": "Portfolio",
                "item": "https://ziamuhammad.com/portfolio"
              }
            ]
          }
        `}
      </Script>
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
              {p.href ? (
                <a href={p.href} target="_blank" rel="noopener noreferrer">
                  {renderProjectContent(p)}
                </a>
              ) : (
                <div className="project-card-static">{renderProjectContent(p)}</div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
