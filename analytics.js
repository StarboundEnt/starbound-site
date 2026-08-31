(() => {
  // Keep analytics events deliberately free of health questions, comments,
  // names, email addresses, and other visitor-provided text.
  window.starboundTrack = (eventName, parameters = {}) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, parameters);
  };

  document.querySelectorAll('[data-analytics-event]').forEach(element => {
    element.addEventListener('click', () => {
      window.starboundTrack(element.dataset.analyticsEvent, {
        audience: element.dataset.analyticsAudience
      });
    });
  });
})();
