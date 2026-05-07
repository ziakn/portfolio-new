import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zia Muhammad | Full Stack Software Engineer',
    short_name: 'Zia Muhammad',
    description: 'Zia Muhammad – Full Stack Software Engineer in Doha, Qatar. Expert in Laravel, React.js, and AI Integrations.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1e1e2e',
    theme_color: '#1e1e2e',
    icons: [
      {
        src: '/images/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
