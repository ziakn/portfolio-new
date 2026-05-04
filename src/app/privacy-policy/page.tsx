import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Zia Muhammad Portfolio.',
};

export default function PrivacyPolicy() {
  return (
    <article className="about active">
      <header>
        <h2 className="h2 article-title">Privacy Policy</h2>
      </header>
      <section className="about-text">
        <p>Last updated: May 04, 2026</p>
        <p>
          At Zia Muhammad Portfolio, accessible from https://ziamuhammad.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Zia Muhammad Portfolio and how we use it.
        </p>
        <h3 className="h3">Log Files</h3>
        <p>
          Zia Muhammad Portfolio follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
        </p>
        <h3 className="h3">Cookies and Web Beacons</h3>
        <p>
          Like any other website, Zia Muhammad Portfolio uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
        </p>
        <h3 className="h3">Google DoubleClick DART Cookie</h3>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" style={{color: 'var(--orange-yellow-crayola)'}}>https://policies.google.com/technologies/ads</a>
        </p>
        <h3 className="h3">Our Advertising Partners</h3>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
        </p>
        <ul>
          <li style={{color: 'var(--light-gray)', marginBottom: '10px'}}>• Google</li>
        </ul>
        <h3 className="h3">Contact Us</h3>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at ziakn03@gmail.com.
        </p>
      </section>
    </article>
  );
}
