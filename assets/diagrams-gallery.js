(() => {
  'use strict';

  document.querySelectorAll('[data-diagram-gallery]').forEach((gallery) => {

  const links = Array.from(gallery.querySelectorAll('[data-gallery-item]'));
  const image = gallery.querySelector('[data-focus-image]');
  const frame = gallery.querySelector('[data-focus-frame]');
  const position = gallery.querySelector('[data-gallery-position]');
  const message = gallery.querySelector('[data-gallery-message]');
  const error = gallery.querySelector('[data-gallery-error]');
  const caption = gallery.querySelector('[data-focus-caption]');
  const previous = gallery.querySelector('[data-gallery-previous]');
  const next = gallery.querySelector('[data-gallery-next]');
  if (!links.length || !image || !frame || !position || !message || !error || !previous || !next) return;

  let selected = 0;
  let displayed = 0;
  let request = 0;
  const noun = gallery.dataset.galleryLabel || 'Diagram';
  const wrap = gallery.dataset.galleryWrap !== 'false';

  const markSelected = () => {
    links.forEach((link, index) => {
      if (index === selected) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    position.textContent = `${selected + 1} / ${links.length}`;
    // Keep the focused control in the tab order when reaching a story's end.
    previous.setAttribute('aria-disabled', String(!wrap && selected === 0));
    next.setAttribute('aria-disabled', String(!wrap && selected === links.length - 1));
  };

  const show = (index, reveal = false) => {
    selected = wrap ? (index + links.length) % links.length : Math.max(0, Math.min(index, links.length - 1));
    const link = links[selected];
    const requested = selected;
    const ticket = ++request;
    markSelected();
    frame.setAttribute('aria-busy', 'true');
    error.hidden = true;
    message.textContent = `Loading ${noun.toLowerCase()} ${selected + 1} of ${links.length}.`;

    // Keep the current artwork visible until its replacement has loaded, and
    // discard stale responses if the visitor moves through images quickly.
    const candidate = new Image();
    candidate.onload = () => {
      if (ticket !== request) return;
      image.src = link.href;
      image.alt = link.dataset.description;
      image.width = candidate.naturalWidth;
      image.height = candidate.naturalHeight;
      if (caption) {
        caption.textContent = link.dataset.caption || '';
        caption.hidden = !caption.textContent;
      }
      displayed = requested;
      frame.setAttribute('aria-busy', 'false');
      message.textContent = `${noun} ${selected + 1} of ${links.length}.`;
      if (reveal && window.matchMedia('(max-width: 720px)').matches) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        frame.scrollIntoView({block: 'start', behavior: reduceMotion ? 'instant' : 'smooth'});
      }
    };
    candidate.onerror = () => {
      if (ticket !== request) return;
      selected = displayed;
      markSelected();
      frame.setAttribute('aria-busy', 'false');
      message.textContent = `${noun} ${requested + 1} could not be loaded. Please try that selection again.`;
      error.textContent = message.textContent;
      error.hidden = false;
    };
    candidate.src = link.href;
  };

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      // Preserve native open-in-new-tab / download gestures on full-size links.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(index, true);
    });
  });

  previous.addEventListener('click', () => {
    if (previous.getAttribute('aria-disabled') !== 'true') show(selected - 1);
  });
  next.addEventListener('click', () => {
    if (next.getAttribute('aria-disabled') !== 'true') show(selected + 1);
  });
  gallery.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const destination = selected + (event.key === 'ArrowRight' ? 1 : -1);
    if (!wrap && (destination < 0 || destination >= links.length)) return;
    show(destination, Boolean(event.target.closest('[data-gallery-item]')));
    if (event.target.closest('[data-gallery-item]')) links[selected].focus({preventScroll: true});
  });

  previous.hidden = false;
  next.hidden = false;
  markSelected();
  });
})();
