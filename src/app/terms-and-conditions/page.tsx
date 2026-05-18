import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and Conditions for Zia Muhammad Portfolio.',
  alternates: { canonical: 'https://ziamuhammad.com/terms-and-conditions' },
};

export default function TermsAndConditions() {
  return (
    <article className="about active">
      <header>
        <h2 className="h2 article-title">Terms and Conditions</h2>
      </header>
      <section className="about-text">
        <p>Welcome to Zia Muhammad Portfolio!</p>
        <p>
          These terms and conditions outline the rules and regulations for the use of Zia Muhammad Portfolio&apos;s Website, located at https://ziamuhammad.com.
        </p>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Zia Muhammad Portfolio if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <h3 className="h3">License</h3>
        <p>
          Unless otherwise stated, Zia Muhammad Portfolio and/or its licensors own the intellectual property rights for all material on Zia Muhammad Portfolio. All intellectual property rights are reserved. You may access this from Zia Muhammad Portfolio for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <h3 className="h3">Professional Content</h3>
        <p>
          This website publishes portfolio information, contact details, and software engineering articles written for informational and professional purposes. Visitors may contact Zia Muhammad through the contact form or listed email address, but the site does not provide public user comments or community posting features.
        </p>
      </section>
    </article>
  );
}
