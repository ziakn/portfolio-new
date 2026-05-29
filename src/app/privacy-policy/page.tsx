import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for ziamuhammad.com covering contact forms, analytics, cookies, Google AdSense, and visitor choices.',
  alternates: { canonical: 'https://ziamuhammad.com/privacy-policy' },
};

export default function PrivacyPolicy() {
  return (
    <article className="about active">
      <header>
        <h2 className="h2 article-title">Privacy Policy</h2>
      </header>
      <section className="about-text">
        <p>Last updated: May 29, 2026</p>
        <p>
          Zia Muhammad operates ziamuhammad.com as a professional portfolio and software engineering
          publication. This policy explains what information may be collected when you read articles,
          view portfolio pages, or contact me through the website.
        </p>
        <h3 className="h3">Information You Provide</h3>
        <p>
          If you use the contact form or send an email, I may receive your name, email address, message,
          and any details you choose to include. I use this information only to respond to your request,
          discuss project work, and maintain professional records.
        </p>
        <h3 className="h3">Log Files</h3>
        <p>
          Zia Muhammad Portfolio follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
        </p>
        <h3 className="h3">Cookies and Web Beacons</h3>
        <p>
          Like any other website, Zia Muhammad Portfolio uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
        </p>
        <h3 className="h3">Analytics</h3>
        <p>
          This site may use Google Analytics to understand aggregate traffic patterns, popular pages,
          device types, and referral sources. Analytics data helps improve the content and user
          experience. It is not used to identify individual visitors.
        </p>
        <h3 className="h3">Google DoubleClick DART Cookie</h3>
        <p>
          Google may use cookies, including advertising cookies, to serve ads to visitors based on their visits to ziamuhammad.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" style={{color: 'var(--orange-yellow-crayola)'}}>https://policies.google.com/technologies/ads</a>
        </p>
        <h3 className="h3">Our Advertising Partners</h3>
        <p>
          Third-party advertising partners on this site may use cookies and web beacons. Our advertising partners include:
        </p>
        <ul>
          <li style={{color: 'var(--light-gray)', marginBottom: '10px'}}>• Google</li>
        </ul>
        <p>
          Third-party ad servers or ad networks may use technologies such as cookies, JavaScript, or
          web beacons in their advertisements and links. They automatically receive your IP address
          when this occurs. These technologies are used to measure advertising effectiveness and
          personalize advertising content. Zia Muhammad does not control cookies used by third-party
          advertisers.
        </p>
        <h3 className="h3">Your Choices</h3>
        <p>
          You can disable cookies through your browser settings. You can also review Google&apos;s
          advertising settings and opt-out resources at{' '}
          <a href="https://policies.google.com/technologies/ads" style={{color: 'var(--orange-yellow-crayola)'}}>
            policies.google.com/technologies/ads
          </a>
          .
        </p>
        <h3 className="h3">Contact Us</h3>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at ziakn03@gmail.com.
        </p>
      </section>
    </article>
  );
}
