(() => {
  const key = 'neeklass-theme';
  const modes = ['system', 'light', 'dark'];
  const root = document.documentElement;

  function readPreference() {
    try {
      const saved = localStorage.getItem(key);
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch {
      return 'system';
    }
  }

  // Run in the head before paint. CSS resolves system mode without JavaScript.
  root.dataset.theme = readPreference();

  document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('[data-theme-toggle]');
    const status = document.querySelector('[data-theme-status]');
    if (!(button instanceof HTMLButtonElement)) return;

    function updateControl() {
      const mode = root.dataset.theme || 'system';
      const next = modes[(modes.indexOf(mode) + 1) % modes.length];
      const currentLabel = `${button.dataset.appearance}: ${button.dataset[mode]}`;
      const label = `${currentLabel}. ${button.dataset.next}: ${button.dataset[next]}.`;
      button.setAttribute('aria-label', label);
      button.title = label;
      return currentLabel;
    }

    updateControl();
    button.hidden = false;
    button.addEventListener('click', () => {
      const mode = root.dataset.theme || 'system';
      const next = modes[(modes.indexOf(mode) + 1) % modes.length];
      root.dataset.theme = next;
      try {
        if (next === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, next);
      } catch {
        // The control still works on this page if storage is unavailable.
      }
      const label = updateControl();
      if (status) status.textContent = label;
    });

    // Keep another open page consistent when a preference changes in this tab.
    window.addEventListener('storage', (event) => {
      if (event.key === key || event.key === null) {
        root.dataset.theme = readPreference();
        updateControl();
      }
    });
  }, { once: true });
})();
