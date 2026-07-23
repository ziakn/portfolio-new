#!/usr/bin/env node
//
// One-time migration: copy the portfolio projects that used to be hardcoded in
// src/app/portfolio/page.tsx into the `projects` table. Idempotent — it skips
// if the table already has rows (pass --force to wipe and reseed).
//
//   npm run seed:projects
//   npm run seed:projects -- --force

import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'data', 'posts.sqlite');
const force = process.argv.includes('--force');

const PROJECTS = [
  { title: 'Al Sharq News', category: 'web development', href: 'https://al-sharq.com/', img: '/images/al-sharq.webp', description: 'Leading Arabic daily in Qatar with 85M+ views. Scaled using Laravel and React with optimized real-time content delivery.' },
  { title: 'The Peninsula Qatar', category: 'web development', href: 'https://thepeninsulaqatar.com/', img: '/images/peninsula.webp', description: 'English news site with 65M+ views. Engineered zero-downtime migration and high-performance frontend architecture.' },
  { title: 'Alarab News', category: 'web design', href: 'https://alarab.qa/', img: '/images/alarab.webp', description: 'Global Middle East news hub. Focused on RTL layout optimization and high-fidelity responsive design.' },
  { title: 'Lusail News', category: 'applications', href: 'https://lusailnews.net/', img: '/images/lusail.webp', description: 'Robust APIs & backend for mobile news applications, ensuring seamless data integration and high availability.' },
  { title: 'Qatar Press Centre', category: 'web design', href: 'https://qatarpressc.qa/', img: '/images/qatarpressc.webp', description: 'Journalist & influencer media hub with advanced content management and influencer tracking tools.' },
  { title: 'Tasklink', category: 'web development', href: 'https://tasklink.qa', img: '/images/project-1.webp', description: 'Remote and Freelancer website/application with real-time job bidding and secure payment systems.' },
  { title: 'Foras', category: 'web development', href: 'https://foras.qa', img: '/images/project-2.webp', description: 'Ecommerce website/application featuring multi-vendor support and automated inventory management.' },
  { title: 'Thakira Al Sharq', category: 'web development', href: 'https://thakiratalsharq.com/', img: '/images/thakiratalsharq.webp', description: 'Newspaper archival & analytics platform. Solved data search latency for millions of historical records.' },
  { title: 'Kids Expo', category: 'applications', href: 'https://www.kidsexpo.qa/en', img: '/images/kidsexpo.webp', description: 'Event platform for education, health, and government events. Managed high-concurrency registration.' },
  { title: 'Dar Al Sharq Group', category: 'web development', href: 'https://daralsharq.net/', img: '/images/daralsharq.webp', description: "Centralized publishing systems for Qatar's leading media group, unifying multiple publication workflows." },
  { title: 'Alsharq Technology', category: 'web development', href: 'https://alsharqtech.com/', img: '/images/alsharqtech.webp', description: 'Corporate Website and portfolio for a leading technology solutions provider in Doha, Qatar.' },
  { title: 'Top Solution Qatar', category: 'applications', href: 'https://topsolutionsqatar.com/', img: '/images/topsolutionsqatar.webp', description: 'Turnkey exhibition services platform managing event logistics, services, and digital interactions.' },
  { title: 'Alwaraq Printing Press', category: 'applications', href: 'https://alwaraq.qa/', img: '/images/alwaraq.webp', description: 'Printing ERP & workflow system managing production lifecycle, inventory, and customer orders.' },
  { title: 'Bon and Bean', category: 'web development', href: 'https://bonandbean.com/', img: '/images/bonandbean.webp', description: 'Specialty coffee e-commerce platform with a premium shopping experience and subscription models.' },
  { title: 'Al Mahbara', category: 'web development', href: 'https://almahbrah.com/', img: '/images/almahbrah.webp', description: 'Custom gift design & printing platform for personalized corporate and individual gifting solutions.' },
  { title: 'Alwaseet Qatar’s', category: 'web development', href: 'https://alwaseetqatar.com/', img: '/images/alwaseetqatar.webp', description: 'Classified ads platform for selling and renting properties, vehicles, and services across Qatar.' },
  { title: 'Little Sailor', category: 'mobile development', href: 'https://www.littlesailor.com.qa/', img: '/images/littlesailor.webp', description: 'Restaurant dine-in & takeaway application with real-time order tracking and loyalty integration.' },
  { title: 'Almass Water', category: 'applications', href: 'https://almaswater.com/', img: '/images/almaswater.webp', description: 'Bottle distribution & delivery portal managing high-volume water supply and logistics.' },
  { title: 'KPK Arms License', category: 'applications', href: 'https://armslicensekpk.com/', img: '/images/arms-license.webp', description: 'Digital licensing system for 22 districts in Pakistan, automating verification and issuance.' },
  { title: 'UET Peshawar', category: 'applications', href: 'https://uetpeshawar.edu.pk/', img: '/images/uet-peshawar.webp', description: 'Academic system lifecycle participation, improving student portals and faculty management systems.' },
  { title: 'SoloStore', category: 'web development', href: null, img: '/images/solostore.webp', description: 'Single vendor shopping platform optimized for performance, conversion, and seamless UX.' },
  { title: 'Maroon Mall', category: 'web development', href: null, img: '/images/project-3.webp', description: 'Mall aggregator e-commerce platform connecting multiple retailers in a unified shopping portal.' },
  { title: 'Tiollo SaaS', category: 'mobile development', href: null, img: '/images/tiollo.webp', description: 'Multi-vendor food delivery & hotel booking SaaS with advanced dispatching and booking engines.' },
  { title: 'SimplistQ CRM', category: 'applications', href: null, img: '/images/project-4.webp', description: 'Enterprise CRM for invoicing, support, and payment integration (Twyla/Sadad) for corporate clients.' },
  { title: 'SimplistQ Sales', category: 'applications', href: null, img: '/images/project-5.webp', description: 'Internal telesales & staff communications tool for lead management and performance tracking.' },
  { title: 'SSR Qatar', category: 'web development', href: null, img: '/images/project-6.webp', description: 'HR & staffing portal for companies and job seekers with automated matching and profile management.' },
  { title: 'AJT Properties', category: 'web development', href: null, img: '/images/project-7.webp', description: 'Real estate sales & rental platforms with interactive property listings and lead generation.' },
  { title: 'Hamilton Qatar', category: 'applications', href: null, img: '/images/project-8.webp', description: 'Enterprise project management tool for Qatar Civil Defence (QCDD) compliance and monitoring.' },
  { title: 'Eaqaqa', category: 'applications', href: null, img: '/images/project-9.webp', description: 'Academic research publishing system for Qatar University, managing peer reviews and digital archives.' },
];

const SCHEMA = `
CREATE TABLE IF NOT EXISTS projects (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  category    TEXT NOT NULL,
  href        TEXT,
  img         TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
);`;

const db = new Database(dbPath, { fileMustExist: true });
db.exec(SCHEMA);

const existing = db.prepare('SELECT COUNT(*) AS c FROM projects').get().c;
if (existing > 0 && !force) {
  console.log(`projects table already has ${existing} row(s). Use --force to wipe and reseed.`);
  db.close();
  process.exit(0);
}
if (force) db.prepare('DELETE FROM projects').run();

const insert = db.prepare(
  `INSERT INTO projects (title, category, href, img, description, sort_order)
   VALUES (@title, @category, @href, @img, @description, @sort_order)`,
);
const run = db.transaction((rows) => {
  rows.forEach((row, i) => insert.run({ ...row, sort_order: (i + 1) * 10 }));
});
run(PROJECTS);
db.close();

console.log(`Seeded ${PROJECTS.length} projects.`);
