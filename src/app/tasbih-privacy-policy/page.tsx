import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasbih App Privacy Policy',
  description:
    'Privacy Policy for the Tasbih dhikr counter app: local data storage, Google AdMob ads, Firebase analytics, optional sync, permissions, and your choices.',
  alternates: { canonical: 'https://ziamuhammad.com/tasbih-privacy-policy' },
};

export default function TasbihPrivacyPolicy() {
  return (
    <article className="about active">
      <header>
        <h1 className="h1 article-title">Tasbih App Privacy Policy</h1>
      </header>
      <section className="about-text">
        <p>Last updated: June 21, 2026</p>
        <p>
          This Privacy Policy explains how the <strong>Tasbih</strong> mobile application
          (the &quot;App&quot;) handles your information. The App is a digital dhikr counter that helps
          you keep track of your tasbih and remembrances. By downloading or using the App, you agree
          to the practices described in this policy.
        </p>

        <h3 className="h3">Information Stored on Your Device</h3>
        <p>
          The core features of the App work offline. Your tasbih counts, counter presets, targets,
          themes, sound and vibration preferences, and other settings are stored locally on your
          device. This information stays on your device and is not transmitted to us unless you enable
          an optional account or cloud sync feature described below.
        </p>

        <h3 className="h3">Account and Cloud Sync (Optional)</h3>
        <p>
          If the App offers sign-in and cloud backup, and you choose to use it, we may collect your
          email address and a basic profile identifier in order to create your account and sync your
          counts and settings across devices. Authentication and storage may be handled through
          Google Firebase (Firebase Authentication and Cloud Firestore). You can continue to use the
          App&apos;s core features without creating an account, and you may request deletion of your
          account and synced data at any time using the contact details below.
        </p>

        <h3 className="h3">Advertising</h3>
        <p>
          The App may display advertisements through Google AdMob. To serve and measure ads, AdMob and
          its partners may collect device and usage information, including an advertising identifier,
          IP address, device type, and interaction with ads. This may be used to provide personalized
          or non-personalized advertising. You can review Google&apos;s advertising practices at{' '}
          <a href="https://policies.google.com/technologies/ads" style={{ color: 'var(--orange-yellow-crayola)' }}>
            policies.google.com/technologies/ads
          </a>
          .
        </p>

        <h3 className="h3">Analytics</h3>
        <p>
          The App may use Google Analytics for Firebase to understand aggregate usage, such as which
          features are used, app stability and crashes, device types, and general region. This
          information helps us improve the App. It is processed in aggregate and is not used to
          personally identify you.
        </p>

        <h3 className="h3">Permissions</h3>
        <p>
          The App may request certain device permissions to provide its features, such as vibration
          for haptic feedback on each count, and network access to load ads or sync data. The App only
          uses these permissions for the purposes described in this policy.
        </p>

        <h3 className="h3">Third-Party Services</h3>
        <p>
          The App relies on third-party services that have their own privacy policies governing how
          they handle data:
        </p>
        <ul>
          <li style={{ color: 'var(--light-gray)', marginBottom: '10px' }}>
            • Google AdMob –{' '}
            <a href="https://policies.google.com/privacy" style={{ color: 'var(--orange-yellow-crayola)' }}>
              policies.google.com/privacy
            </a>
          </li>
          <li style={{ color: 'var(--light-gray)', marginBottom: '10px' }}>
            • Google Firebase (Analytics, Authentication, Firestore) –{' '}
            <a href="https://firebase.google.com/support/privacy" style={{ color: 'var(--orange-yellow-crayola)' }}>
              firebase.google.com/support/privacy
            </a>
          </li>
        </ul>

        <h3 className="h3">Children&apos;s Privacy</h3>
        <p>
          The App is intended for a general audience and is not directed at children under the age of
          13. We do not knowingly collect personal information from children. If you believe a child
          has provided us with personal information, please contact us so we can remove it.
        </p>

        <h3 className="h3">Data Retention and Deletion</h3>
        <p>
          Data stored locally on your device remains until you clear it from within the App or
          uninstall the App. If you use the optional account and cloud sync feature, your synced data
          is retained until you delete it or request account deletion. To request deletion of any data
          we hold, contact us at the email below.
        </p>

        <h3 className="h3">Your Choices</h3>
        <p>
          You can reset or clear your counts and settings inside the App, opt out of personalized ads
          through your device&apos;s advertising settings, and choose not to create an account. You may
          also uninstall the App at any time to stop all data collection going forward.
        </p>

        <h3 className="h3">Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be reflected on this
          page with an updated &quot;Last updated&quot; date. Continued use of the App after changes are
          posted constitutes acceptance of the revised policy.
        </p>

        <h3 className="h3">Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy or the Tasbih app, please contact us at
          ziakn03@gmail.com.
        </p>
      </section>
    </article>
  );
}
