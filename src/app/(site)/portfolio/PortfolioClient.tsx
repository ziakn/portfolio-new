'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Project } from '@/data/projects';

export default function PortfolioClient({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [filter, setFilter] = useState('all');
  const [selectOpen, setSelectOpen] = useState(false);

  const filterOptions = ['all', ...categories];
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const cap = (c: string) => c.charAt(0).toUpperCase() + c.slice(1);

  const renderProjectContent = (p: Project) => (
    <>
      <figure className="project-img">
        {p.href && (
          <div className="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
        )}
        <Image
          src={p.img}
          alt={`Screenshot of ${p.title} project: ${p.description.substring(0, 100)}`}
          width={600}
          height={400}
          loading="lazy"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </figure>
      <h3 className="project-title">{p.title}</h3>
      <p className="project-category">{p.description}</p>
    </>
  );

  return (
    <section className="projects">
      {/* Desktop filter buttons */}
      <ul className="filter-list">
        {filterOptions.map((c) => (
          <li className="filter-item" key={c}>
            <button className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>
              {cap(c)}
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
          <div className="select-value">{filter === 'all' ? 'Select category' : cap(filter)}</div>
          <div className="select-icon">
            <ion-icon name="chevron-down"></ion-icon>
          </div>
        </button>
        <ul className="select-list">
          {filterOptions.map((c) => (
            <li className="select-item" key={c}>
              <button
                onClick={() => {
                  setFilter(c);
                  setSelectOpen(false);
                }}
              >
                {cap(c)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ul className="project-list">
        {filtered.map((p) => (
          <li className="project-item active" key={p.id}>
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
  );
}
