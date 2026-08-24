(() => {
  const EMAIL_ADDRESS = 'prathesa@iamstarbound.com';
  const BOOKING_URL = 'https://calendar.app.google/hEiL2AXbZxb5QnQk9';

  const widget = document.createElement('aside');
  widget.className = 'contact-orbit';
  widget.dataset.open = 'false';
  widget.setAttribute('aria-label', 'Contact Starbound');
  widget.innerHTML = `
    <a class="contact-orbit__action contact-orbit__action--email" href="mailto:${EMAIL_ADDRESS}" aria-label="Email Starbound">
      <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3.5" y="9" width="25" height="14" rx="7"></rect><path d="m8 11.5 8 6 8-6"></path><path d="m8 20.5 5.5-5M24 20.5l-5.5-5"></path><circle cx="26.5" cy="7" r="1.2"></circle></svg>
      <span class="contact-orbit__label" aria-hidden="true">Email</span>
    </a>
    <a class="contact-orbit__action contact-orbit__action--booking" href="${BOOKING_URL}" aria-label="Book a time with Starbound">
      <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="7" width="20" height="19" rx="2"></rect><path d="M10 4.5v5M22 4.5v5M6 12h20"></path><path d="M10 17h4M10 21h4M18 17h4"></path><path d="M3.5 22.5c3.8 5.3 15.5 7.2 23.6 1.8"></path><circle cx="27" cy="23.8" r="1.4"></circle></svg>
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
