(function () {
    'use strict';

    function buildPdfJsViewerUrl(pdfUrl) {
        if (!pdfUrl) {
            return null;
        }
        // Hosted PDF.js viewer (CDN). The PDF URL must be publicly fetchable (CORS-compatible).
        // Using hash params keeps the viewer stable and avoids query encoding issues.
        var viewerBase = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/web/viewer.html';
        return viewerBase + '?file=' + encodeURIComponent(pdfUrl);
    }

    function initPdfViewers() {
        var roots = document.querySelectorAll('[data-pdf-viewer]');
        if (!roots || !roots.length) {
            return;
        }

        roots.forEach(function (root) {
            // Convention: store a PDF link in the post body (hidden by the template).
            // We’ll detect the first PDF link and render it in a PDF.js viewer iframe.
            var article = root.closest('article');
            var scope = article || document;
            var pdfLink =
                scope.querySelector('a[href$=".pdf"]') ||
                scope.querySelector('a[href*=".pdf"]');

            var pdfUrl = pdfLink && pdfLink.getAttribute('href');
            if (!pdfUrl) {
                return;
            }

            var frame = root.querySelector('[data-pdf-frame]');
            if (!frame) {
                return;
            }

            var viewerUrl = buildPdfJsViewerUrl(pdfUrl);
            if (!viewerUrl) {
                return;
            }

            frame.hidden = false;
            frame.innerHTML = '<iframe class="mrc-pdf-viewer__iframe" title="PDF viewer" loading="lazy" referrerpolicy="no-referrer" src="' + viewerUrl + '"></iframe>';
        });
    }

    function hasGtag() {
        return typeof window.gtag === 'function';
    }

    function track(eventName, params) {
        if (!hasGtag()) {
            return;
        }

        window.gtag('event', eventName, params || {});
    }

    function initAnalytics() {
        // GA4 base tag is injected via `partials/ga4.hbs` when configured.
        // Here we only wire up low-noise interaction events.

        document.addEventListener('click', function (event) {
            var el = event.target && event.target.closest ? event.target.closest('[data-ga-event]') : null;
            if (!el) {
                return;
            }

            var name = el.getAttribute('data-ga-event');
            if (!name) {
                return;
            }

            var category = el.getAttribute('data-ga-category') || 'engagement';
            var label = el.getAttribute('data-ga-label') || el.getAttribute('aria-label') || (el.textContent || '').trim().slice(0, 100);

            track(name, {
                event_category: category,
                event_label: label,
                page_path: window.location.pathname
            });
        }, {capture: true});

        document.addEventListener('submit', function (event) {
            var form = event.target;
            if (!form || !form.matches) {
                return;
            }

            if (!form.matches('[data-ga-form="contact_form"], .mrc-contact-form')) {
                return;
            }

            track('generate_lead', {
                method: 'contact_form',
                event_category: 'conversion',
                event_label: 'contact_form'
            });
        }, {capture: true});
    }

    function init() {
        initAnalytics();
        initPdfViewers();
        pagination(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
