import { getContent, isCustomized } from '@/data/content';
import ContentEditor from './ContentEditor';
import { saveAboutAction, saveAchievementsAction, saveServicesAction } from './actions';

export default function ContentAdminPage() {
  const about = getContent('home.about');
  const services = getContent('home.services');
  const achievements = getContent('resume.achievements');

  return (
    <>
      <div className="admin-header">
        <div>
          <h1>Site content</h1>
          <p className="admin-subtitle">Edit key text on the home and résumé pages. Blank/unset falls back to defaults.</p>
        </div>
      </div>

      <ContentEditor
        title="Home — About section"
        hint="HTML. Rendered inside the About block on the home page. Use <p>, <strong>, <a href> etc."
        value={about}
        action={saveAboutAction}
        resetKey="home.about"
        customized={isCustomized('home.about')}
        code
      />

      <ContentEditor
        title="Home — Services"
        hint='JSON array of {"icon": "/images/…svg", "title": "…", "text": "…"}. Shown under “What I’m Doing”.'
        value={JSON.stringify(services, null, 2)}
        action={saveServicesAction}
        resetKey="home.services"
        customized={isCustomized('home.services')}
        code
      />

      <ContentEditor
        title="Résumé — Key Achievements"
        hint="One achievement per line (HTML allowed). Shown as bullet points in the Experience section."
        value={achievements.join('\n')}
        action={saveAchievementsAction}
        resetKey="resume.achievements"
        customized={isCustomized('resume.achievements')}
      />
    </>
  );
}
