declare global {
  interface Window {
    renderDocsGPTWidget?: (rootId: string, props: Record<string, unknown>) => void;
  }
}

function ensureRoot(rootId: string) {
  if (document.getElementById(rootId)) return;
  const el = document.createElement('div');
  el.id = rootId;
  document.body.appendChild(el);
}

function mount() {
  const rootId = 'docsgpt-widget-root';
  ensureRoot(rootId);

  if (typeof window.renderDocsGPTWidget !== 'function') {
    // External script may not be ready yet; retry briefly.
    window.setTimeout(mount, 200);
    return;
  }

  window.renderDocsGPTWidget(rootId, {
    apiHost: 'https://assistant-api.mannyroy.com',
    apiKey: 'dd39c6e5-6298-4b87-82a8-22528453df58',

    theme: 'dark',
    title: 'Ask BottyGPT anything about Manny Roy Consulting',
    description: 'Get answers grounded in site posts and documentation.',
    heroTitle: 'Hi — what can I help with?',
    heroDescription:
      'I’ll answer questions about MRC using site content and show sources when available.',
    showSources: true,
    size: 'medium',

    avatar:
      'https://assistant-api.mannyroy.com/api/images/inputs/local/attachments/89431c36-c8b3-4dfe-b888-ad6863fe0f65_Botty_Avatar.png',
    buttonBg: '#804050',
    buttonIcon:
      'https://assistant-api.mannyroy.com/api/images/inputs/local/attachments/89431c36-c8b3-4dfe-b888-ad6863fe0f65_Botty_Avatar.png',
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
}

