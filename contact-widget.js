(() => {
  const EMAIL_ADDRESS = 'prathesa@iamstarbound.com';
  const BOOKING_URL = 'https://calendar.app.google/hEiL2AXbZxb5QnQk9';

  const widget = document.createElement('aside');
  widget.className = 'contact-orbit';
  widget.dataset.open = 'false';
  widget.setAttribute('aria-label', 'Contact Starbound');
  widget.innerHTML = `
    <a class="contact-orbit__action contact-orbit__action--email" href="mailto:${EMAIL_ADDRESS}" aria-label="Email Starbound">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4.5 8.5c5.7-.5 17.2-.3 23 .4.5 4.9.3 10.2-.3 15-6.9.5-15.7.4-22.4-.2-.6-5.1-.7-10.1-.3-15.2Z"></path><path d="m5.5 10 10.6 8.3L26.7 10M5.8 22.5l7.5-6.3M26.2 22.5l-7.3-6.3"></path><path d="m16 14.2 1 2 2.2.3-1.6 1.6.4 2.2-2-1-2 1 .4-2.2-1.6-1.6 2.2-.3 1-2Z"></path></svg>
      <span class="contact-orbit__label" aria-hidden="true">Email</span>
    </a>
    <a class="contact-orbit__action contact-orbit__action--booking" href="${BOOKING_URL}" aria-label="Book a time with Starbound">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6.2 7.5c5.8-.4 13.7-.3 19.6.2.4 5.8.3 12.1-.3 17.9-5.7.5-13.7.4-19.1-.2-.6-5.7-.6-12.1-.2-17.9Z"></path><path d="M10 4.5v5M22 4.5v5M6.3 12h19.4M10 17h4M10 21h4M18 17h4"></path><circle cx="25.8" cy="24.3" r="1.3"></circle></svg>
      <span class="contact-orbit__label" aria-hidden="true">Book a time</span>
    </a>
    <button class="contact-orbit__launcher" type="button" aria-expanded="false" aria-label="Open contact options">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 23.5 3.8 28l5.7-1.5A13 13 0 1 0 5.4 22"></path><path d="M10 15.5h12M10 20h7"></path></svg>
    </button>`;

  const launcher = widget.querySelector('.contact-orbit__launcher');
  const actions = [...widget.querySelectorAll('.contact-orbit__action')];

  const setOpen = (open, returnFocus = false) => {
    widget.dataset.open = String(open);
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close contact options' : 'Open contact options');
    actions.forEach((action) => action.tabIndex = open ? 0 : -1);
    if (!open && returnFocus) launcher.focus();
  };

  launcher.addEventListener('click', () => setOpen(widget.dataset.open !== 'true'));

  document.addEventListener('click', (event) => {
    if (widget.dataset.open === 'true' && !widget.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && widget.dataset.open === 'true') setOpen(false, true);
  });

  actions.forEach((action) => action.tabIndex = -1);
  document.body.append(widget);
})();
