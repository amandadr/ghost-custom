declare global {
  interface Window {
    renderDocsGPTWidget?:
      | ((rootId: string, props: Record<string, unknown>) => unknown)
      | undefined;
  }
}

const DOCSGPT_LEGACY_SCRIPT = 'https://unpkg.com/docsgpt@0.5.1/dist/legacy/browser.js';
const RENDER_HOOK_KEY = '__mrcDocsGptAltHook';
const MOUNT_RETRY_MS = 200;
const MOUNT_RETRY_MAX = 50;

type PatchedRenderFn = NonNullable<Window['renderDocsGPTWidget']> & {[RENDER_HOOK_KEY]?: boolean};

const rootsWithAltObserver = new WeakSet<Element>();

function ensureRoot(rootId: string) {
  if (document.getElementById(rootId)) return;
  const el = document.createElement('div');
  el.id = rootId;
  document.body.appendChild(el);
}

/** DocsGPT launcher `<img>` has no alt; createRoot().render() is async and later commits strip DOM alt. */
function ensureDocsGptImagesHaveAlt(rootId: string) {
  const root = document.getElementById(rootId);
  if (!root) return;
  const altText = 'Botty assistant';
  const setAlts = () => {
    root.querySelectorAll('img').forEach((img) => {
      if (!img.hasAttribute('alt') || img.getAttribute('alt')?.trim() === '') {
        img.alt = altText;
        img.setAttribute('alt', altText);
      }
    });
  };

  if (!rootsWithAltObserver.has(root)) {
    rootsWithAltObserver.add(root);
    new MutationObserver(setAlts).observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  }

  setAlts();
  queueMicrotask(setAlts);
  if (typeof requestAnimationFrame === 'function') {
    requestAnimationFrame(() => {
      setAlts();
      requestAnimationFrame(setAlts);
    });
  }
  [0, 10, 40, 100, 280, 600, 1200, 2500].forEach((ms) => {
    window.setTimeout(setAlts, ms);
  });

  const host = root as HTMLElement & {__mrcAltSweep?: number};
  if (host.__mrcAltSweep === undefined) {
    let n = 0;
    host.__mrcAltSweep = window.setInterval(() => {
      n += 1;
      setAlts();
      if (n >= 40) {
        window.clearInterval(host.__mrcAltSweep);
        host.__mrcAltSweep = undefined;
      }
    }, 200) as unknown as number;
  }
}

function installRenderDocsGptAltPatrol(rootIdFallback: string) {
  const fn = window.renderDocsGPTWidget as PatchedRenderFn | undefined;
  if (typeof fn !== 'function' || fn[RENDER_HOOK_KEY]) {
    return;
  }
  const original = fn;
  const wrapped: PatchedRenderFn = (id: string, props: Record<string, unknown>) => {
    const ret = original(id, props);
    ensureDocsGptImagesHaveAlt(id);
    return ret;
  };
  wrapped[RENDER_HOOK_KEY] = true;
  window.renderDocsGPTWidget = wrapped;
  ensureDocsGptImagesHaveAlt(rootIdFallback);
}

function pollInstallRenderPatrol(rootIdFallback: string) {
  installRenderDocsGptAltPatrol(rootIdFallback);
  const w = window.renderDocsGPTWidget as PatchedRenderFn | undefined;
  if (w?.[RENDER_HOOK_KEY]) {
    return;
  }
  let tries = 0;
  const id = window.setInterval(() => {
    tries += 1;
    installRenderDocsGptAltPatrol(rootIdFallback);
    const f = window.renderDocsGPTWidget as PatchedRenderFn | undefined;
    if (f?.[RENDER_HOOK_KEY] || tries > 400) {
      window.clearInterval(id);
    }
  }, 25);
}

/**
 * Inject unpkg script asynchronously so it does not block HTML parsing or early render.
 * Prefer requestIdleCallback so work stays off the critical path; fall back to window load.
 */
function loadDocsGPTScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window.renderDocsGPTWidget === 'function') {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-docsgpt-widget-src]');
    if (existing) {
      if (typeof window.renderDocsGPTWidget === 'function') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), {once: true});
      existing.addEventListener('error', () => reject(new Error('DocsGPT script load error')), {
        once: true,
      });
      return;
    }

    const s = document.createElement('script');
    s.src = DOCSGPT_LEGACY_SCRIPT;
    s.async = true;
    s.dataset.docsgptWidgetSrc = DOCSGPT_LEGACY_SCRIPT;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('DocsGPT CDN script failed'));
    document.body.appendChild(s);
  });
}

let mountAttempts = 0;

function mount() {
  const rootId = 'docsgpt-widget-root';
  ensureRoot(rootId);

  if (typeof window.renderDocsGPTWidget !== 'function') {
    mountAttempts += 1;
    if (mountAttempts >= MOUNT_RETRY_MAX) {
      return;
    }
    window.setTimeout(mount, MOUNT_RETRY_MS);
    return;
  }

  window.renderDocsGPTWidget!(rootId, {
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
  ensureDocsGptImagesHaveAlt(rootId);
}

function kickoff() {
  mountAttempts = 0;
  loadDocsGPTScript()
    .then(() => {
      installRenderDocsGptAltPatrol('docsgpt-widget-root');
      mountAttempts = 0;
      mount();
    })
    .catch(() => {
      /* CDN blocked / offline — widget absent is acceptable */
    });
}

function scheduleDocsGPT() {
  if (typeof window === 'undefined') {
    return;
  }
  const run = () => kickoff();
  // Typed as optional so environments without requestIdleCallback still type-check the fallback.
  const w = window as Window & {requestIdleCallback?: Window['requestIdleCallback']};

  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(run, {timeout: 4000});
  } else {
    w.addEventListener('load', () => window.setTimeout(run, 0), {once: true});
  }
}

if (typeof window !== 'undefined') {
  pollInstallRenderPatrol('docsgpt-widget-root');
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleDocsGPT);
  } else {
    scheduleDocsGPT();
  }
}

export {};
