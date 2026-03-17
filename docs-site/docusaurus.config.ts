import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Manny Roy Consulting — Docs',
  tagline: 'Architecture, performance, and operations for my custom Ghost theme and application.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.mannyroy.com',
  baseUrl: '/',

  organizationName: 'mannyroy',
  projectName: 'ghost-custom',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  scripts: [
    'https://unpkg.com/docsgpt@0.5.1/dist/legacy/browser.js',
  ],

  clientModules: [
    require.resolve('./src/clientModules/docsgpt-widget'),
  ],

  themeConfig: {
    image: 'img/logo.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Manny Roy Consulting',
        src: 'img/logo.jpg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Welcome',
        },
        {
          href: 'https://mannyroy.com',
          label: 'Main site',
          position: 'right',
        },
        {
          href: 'https://mannyroy.com/ghost-application/',
          label: 'Ghost application',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Site',
          items: [
            {label: 'Main site', href: 'https://mannyroy.com'},
            {label: 'Ghost application', href: 'https://mannyroy.com/ghost-application/'},
            {label: 'Blog', href: 'https://mannyroy.com/'},
          ],
        },
        {
          title: 'Docs',
          items: [
            {label: 'Introduction', to: '/docs/intro'},
            {label: 'Architecture', to: '/docs/architecture/overview'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Manny Roy Consulting. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
