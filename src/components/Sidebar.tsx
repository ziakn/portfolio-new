'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Sidebar() {
  const [active, setActive] = useState(false);

  return (
    <aside className={`sidebar${active ? ' active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <Image src="/images/Profile-W.png" alt="Zia Muhammad" width={80} height={80} priority />
        </figure>

        <div className="info-content">
          <p className="name" title="Zia Muhammad">Zia Muhammad</p>
          <p className="title">Software Engineer</p>
        </div>

        <button className="info_more-btn" onClick={() => setActive(!active)} data-sidebar-btn>
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:ziakn03@gmail.com" className="contact-link">ziakn03@gmail.com</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+97450684583" className="contact-link">+974 50684583</a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="1994-04-11">April 11, 1994</time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Doha, Qatar</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a target="_blank" href="https://twitter.com/ziamuhmmad2" className="social-link" rel="noopener noreferrer" aria-label="Zia Muhammad on Twitter">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a target="_blank" href="https://www.linkedin.com/in/zia-software/" className="social-link" rel="noopener noreferrer" aria-label="Zia Muhammad on LinkedIn">
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a target="_blank" href="https://github.com/ziakn" className="social-link" rel="noopener noreferrer" aria-label="Zia Muhammad on GitHub">
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a target="_blank" href="https://wa.me/+97450684583" className="social-link" rel="noopener noreferrer" aria-label="Message Zia Muhammad on WhatsApp">
              <ion-icon name="logo-whatsapp"></ion-icon>
            </a>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list" style={{ flexWrap: 'wrap', fontSize: '12px', gap: '10px', color: 'var(--light-gray-70)' }}>
          <li><a href="/privacy-policy" className="contact-link">Privacy Policy</a></li>
          <li><a href="/terms-and-conditions" className="contact-link">Terms</a></li>
          <li><a href="/disclaimer" className="contact-link">Disclaimer</a></li>
        </ul>
      </div>
    </aside>
  );
}
