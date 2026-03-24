import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      items: [
        {type: 'doc', id: 'intro', label: 'About these docs'},
        {
          type: 'doc',
          id: 'how-to-use-these-docs',
          label: 'How to use these docs',
        },
        {type: 'doc', id: 'reference/roadmap', label: 'Roadmap & Changelog'},
      ],
    },
    {
      type: 'category',
      label: 'Quick Start',
      items: [
        {
          type: 'doc',
          id: 'quick-start/quick-start-developer',
          label: 'Quick start — Developer',
        },
        {
          type: 'doc',
          id: 'quick-start/quick-start-operator',
          label: 'Quick start — Operator',
        },
        {
          type: 'doc',
          id: 'quick-start/quick-start-reader',
          label: 'Quick start — Reader',
        },
      ],
    },
    {
      type: 'category',
      label: 'Developer',
      items: [
        {type: 'doc', id: 'architecture/overview', label: 'Architecture overview'},
        {
          type: 'doc',
          id: 'architecture/theme-system',
          label: 'Theme (Ghost custom theme)',
        },
        {
          type: 'doc',
          id: 'architecture/templates-and-partials',
          label: 'Theme anatomy',
        },
        {
          type: 'doc',
          id: 'getting-started/local-development',
          label: 'Local development & build',
        },
        {
          type: 'doc',
          id: 'performance/scripts-and-assets',
          label: 'Asset pipeline & optimisation',
        },
        {type: 'doc', id: 'templates/overview', label: 'Templates & helpers'},

        {type: 'doc', id: 'ai-assistant/docsgpt-overview', label: 'DocsGPT / Botty'},
        {
          type: 'doc',
          id: 'design-system/overview',
          label: 'Design & components',
        },
        {
          type: 'doc',
          id: 'ai-assistant/docsgpt-implementation-plan',
          label: 'Ingestion & indexing',
        },
        {
          type: 'doc',
          id: 'ai-assistant/docsgpt-devops-and-deploy',
          label: 'API, SDK & widget integration',
        },
        {
          type: 'doc',
          id: 'ai-assistant/docsgpt-examples-and-snippets',
          label: 'Examples & snippets',
        },
      ],
    },
    {
      type: 'category',
      label: 'Operator (Ops & SRE)',
      items: [
        {type: 'doc', id: 'operations/deployment', label: 'Deployments'},
        {
          type: 'doc',
          id: 'getting-started/build-and-validate',
          label: 'Deploy checklist',
        },
        {
          type: 'doc',
          id: 'operations/deployment',
          label: 'Rollback & emergency procedures',
        },
        {
          type: 'doc',
          id: 'operations/observability',
          label: 'Observability',
        },
        {
          type: 'doc',
          id: 'ai-assistant/docsgpt-testing-and-operations',
          label: 'Runbooks',
        },
        {
          type: 'doc',
          id: 'performance/strategy',
          label: 'Performance strategy',
        },
      ],
    },
    {
      type: 'category',
      label: 'Non-technical / Product',
      items: [
        {type: 'doc', id: 'what-it-does', label: 'What it does'},
        {type: 'doc', id: 'benefits-and-outcomes', label: 'Benefits & outcomes'},
        {
          type: 'doc',
          id: 'privacy-and-data-handling',
          label: 'Privacy & data handling',
        },
        {type: 'doc', id: 'faq', label: 'FAQs'},
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        {
          type: 'doc',
          id: 'contributing/contributor-guide',
          label: 'Contributor guide',
        },
        {type: 'doc', id: 'contributing/style-guide', label: 'Style guide'},
        {
          type: 'doc',
          id: 'contributing/versioning-and-releases',
          label: 'Versioning & releases',
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        {type: 'doc', id: 'reference/system-map', label: 'System map'},
        {
          type: 'doc',
          id: 'reference/stack-and-dependencies',
          label: 'Stack & dependencies',
        },
        {type: 'doc', id: 'reference/glossary', label: 'Glossary'},
        {type: 'doc', id: 'reference/links', label: 'Notes & links'},
      ],
    },
  ],
};

export default sidebars;
