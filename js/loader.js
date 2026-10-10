(() => {
  const SESSION_KEY = 'wellIconSplashSeen';
  let showSplash = false;

  try {
    showSplash = sessionStorage.getItem(SESSION_KEY) !== '1';
    if (showSplash) sessionStorage.setItem(SESSION_KEY, '1');
  } catch (_) {
    // Storage can be unavailable in private or restricted browsing contexts.
    // Keep this page graceful and avoid blocking the visitor with a splash.
  }

  if (showSplash) document.documentElement.classList.add('well-icon-first-visit');

  const installLoader = () => {
    const topLoader = document.createElement('div');
    topLoader.className = 'well-icon-page-loader';
    topLoader.setAttribute('role', 'progressbar');
    topLoader.setAttribute('aria-label', 'Loading page');
    topLoader.setAttribute('aria-valuemin', '0');
    topLoader.setAttribute('aria-valuemax', '100');
    topLoader.innerHTML = '<span></span>';
    document.body.appendChild(topLoader);

    const showSimpleLoader = () => {
      topLoader.classList.remove('is-finishing');
      topLoader.classList.add('is-visible');
      topLoader.setAttribute('aria-valuenow', '35');
    };

    if (showSplash) {
      const splash = document.createElement('div');
      splash.className = 'well-icon-splash';
      splash.setAttribute('role', 'status');
      splash.setAttribute('aria-label', 'Welcome to Well Icon');
      splash.innerHTML = `
        <div class="well-icon-splash__content">
          <div class="well-icon-splash__mark" aria-hidden="true"><span>W</span></div>
          <p class="well-icon-splash__wordmark">WELL <span>ICON</span></p>
          <p class="well-icon-splash__tagline">Comfort for every day</p>
          <div class="well-icon-splash__track" aria-hidden="true"><span></span></div>
        </div>`;
      document.body.prepend(splash);

      const dismissSplash = () => {
        if (!splash.isConnected) return;
        splash.classList.add('is-leaving');
        document.documentElement.classList.remove('well-icon-first-visit');
        window.setTimeout(() => splash.remove(), 420);
      };

      // Keep the welcome moment calm and short; never wait for third-party fonts.
      window.setTimeout(dismissSplash, 1450);
      window.addEventListener('keydown', event => {
        if (event.key === 'Escape') dismissSplash();
      }, { once: true });
    } else {
      // A restrained page-entry cue replaces the full-screen welcome on later pages.
      showSimpleLoader();
      window.addEventListener('load', () => {
        topLoader.setAttribute('aria-valuenow', '100');
        topLoader.classList.add('is-finishing');
        window.setTimeout(() => topLoader.classList.remove('is-visible', 'is-finishing'), 220);
      }, { once: true });
      window.setTimeout(() => topLoader.classList.remove('is-visible', 'is-finishing'), 1200);
    }

    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (link) {
        const href = link.getAttribute('href') || '';
        const isLocalPage = href && !href.startsWith('#') && !href.startsWith('mailto:') &&
          !href.startsWith('tel:') && !link.hasAttribute('download') &&
          (!link.target || link.target === '_self') &&
          new URL(link.href, window.location.href).origin === window.location.origin;
        if (isLocalPage && link.href !== window.location.href) showSimpleLoader();
        return;
      }

      const button = event.target.closest('button');
      const productNavigation = event.target.closest('.detail-view-bound, .zoom-trigger-btn, .view-details-btn, [data-action="view-details"]');
      if (productNavigation) {
        showSimpleLoader();
        return;
      }
      if (!button) return;
      const label = `${button.textContent} ${button.getAttribute('aria-label') || ''}`.toLowerCase();
      if (/go to cart|proceed to order|buy now|continue shopping/.test(label)) showSimpleLoader();
    }, true);

    document.addEventListener('submit', showSimpleLoader, true);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installLoader, { once: true });
  else installLoader();
})();
