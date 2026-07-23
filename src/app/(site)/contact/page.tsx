'use client';

import { useState, type FormEvent } from 'react';
import Script from 'next/script';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error('Network response was not ok.');
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  }

  return (
    <article className="contact active" data-page="contact">
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
                "name": "Contact",
                "item": "https://ziamuhammad.com/contact"
              }
            ]
          }
        `}
      </Script>
      <header>
        <h1 className="h1 article-title">Contact</h1>
      </header>

      <section className="mapbox" data-mapbox>
        <figure>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34143.77025154011!2d51.52049495308756!3d25.277477058740445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45c534ffdce87f%3A0x44d9319f78cfd4b1!2sDoha!5e1!3m2!1sen!2sqa!4v1758628059799!5m2!1sen!2sqa"
            width="400"
            height="300"
            loading="lazy"
            title="Zia Muhammad location – Doha, Qatar"
            aria-label="Google Maps showing Doha, Qatar"
          ></iframe>
        </figure>
      </section>

      <section className="contact-form">
        <h2 className="h2 form-title">Contact Form</h2>
        <form
          action="/api/contact"
          method="POST"
          className="form"
          id="contact-form"
          onSubmit={handleSubmit}
        >
          {/* Honeypot: hidden from humans, catches bots. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />
          <div className="input-wrapper">
            <input type="text" name="fullname" className="form-input" placeholder="Full name" required />
            <input type="email" name="email" className="form-input" placeholder="Email address" required />
          </div>
          <textarea name="message" className="form-input" placeholder="Your Message" required></textarea>
          <button className="form-btn" type="submit" disabled={status === 'sending'}>
            {status === 'sending' && (
              <>
                <ion-icon name="sync-outline"></ion-icon>
                <span>Sending...</span>
              </>
            )}
            {status === 'success' && (
              <>
                <ion-icon name="checkmark-circle-outline"></ion-icon>
                <span>Message Sent!</span>
              </>
            )}
            {status === 'error' && (
              <>
                <ion-icon name="alert-circle-outline"></ion-icon>
                <span>Error. Try Again</span>
              </>
            )}
            {status === 'idle' && (
              <>
                <ion-icon name="paper-plane"></ion-icon>
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </section>
    </article>
  );
}
