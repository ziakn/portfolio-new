import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for Zia Muhammad Portfolio.',
};

export default function Disclaimer() {
  return (
    <article className="about active">
      <header>
        <h2 className="h2 article-title">Disclaimer</h2>
      </header>
      <section className="about-text">
        <p>
          If you require any more information or have any questions about our site&apos;s disclaimer, please feel free to contact us by email at ziakn03@gmail.com.
        </p>
        <h3 className="h3">Disclaimers for Zia Muhammad Portfolio</h3>
        <p>
          All the information on this website - https://ziamuhammad.com - is published in good faith and for general information purpose only. Zia Muhammad Portfolio does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (Zia Muhammad Portfolio), is strictly at your own risk. Zia Muhammad Portfolio will not be liable for any losses and/or damages in connection with the use of our website.
        </p>
        <h3 className="h3">Consent</h3>
        <p>
          By using our website, you hereby consent to our disclaimer and agree to its terms.
        </p>
        <h3 className="h3">Update</h3>
        <p>
          Should we update, amend or make any changes to this document, those changes will be prominently posted here.
        </p>
      </section>
    </article>
  );
}
