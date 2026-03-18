(function () {
    'use strict';

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
            var el = event.target && event.target.closest ? event.target.closest('[data-ga-event], [data-portal]') : null;
            if (!el) {
                return;
            }

            // Ghost Portal intent tracking (signup/signin/account upgrade)
            if (el.hasAttribute('data-portal')) {
                var portalAction = el.getAttribute('data-portal') || '';
                track('sign_up', {
                    method: 'ghost_portal',
                    event_category: 'intent',
                    event_label: portalAction
                });
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
        pagination(false);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
