(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  const filters = document.querySelector('[data-blog-filters]');
  const posts = Array.from(document.querySelectorAll('[data-blog-post]'));

  if (filters && posts.length) {
    const search = filters.elements.q;
    const year = filters.elements.year;
    const count = document.querySelector('[data-blog-count]');
    const empty = document.querySelector('[data-blog-empty]');
    search.value = params.get('q') || '';
    year.value = params.get('year') || '';
    if (year.selectedIndex < 0) year.value = '';

    const update = () => {
      const query = search.value.trim();
      const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
      let visible = 0;
      const catalogue = new URLSearchParams();
      if (query) catalogue.set('q', query);
      if (year.value) catalogue.set('year', year.value);
      const suffix = catalogue.toString() ? `?${catalogue}` : '';
      history.replaceState(null, '', `${location.pathname}${suffix}${location.hash}`);
      posts.forEach((post) => {
        const text = post.dataset.search.toLocaleLowerCase();
        const match = (!year.value || post.dataset.year === year.value) && words.every(word => text.includes(word));
        post.hidden = !match;
        if (match) visible += 1;
        post.querySelectorAll('[data-post-link]').forEach((link) => {
          const url = new URL(link.href);
          if (query) url.searchParams.set('catalogue_q', query);
          else url.searchParams.delete('catalogue_q');
          if (year.value) url.searchParams.set('catalogue_year', year.value);
          else url.searchParams.delete('catalogue_year');
          link.href = `${url.pathname}${url.search}${url.hash}`;
        });
      });
      count.textContent = `${visible} ${visible === 1 ? 'essay' : 'essays'}`;
      empty.hidden = visible !== 0;
    };

    filters.hidden = false;
    filters.addEventListener('submit', event => event.preventDefault());
    search.addEventListener('input', update);
    year.addEventListener('change', update);
    filters.addEventListener('reset', () => {
      // Reset explicit values too: restored query values are the DOM defaults
      // only in some browsers, and native reset happens after the event.
      requestAnimationFrame(() => { search.value = ''; year.value = ''; update(); });
    });
    window.addEventListener('pageshow', update);
    update();
    return;
  }

  const query = params.get('catalogue_q') || '';
  const year = params.get('catalogue_year') || '';
  const catalogue = new URLSearchParams();
  if (query) catalogue.set('q', query);
  if (year) catalogue.set('year', year);
  document.querySelectorAll('[data-catalogue-return]').forEach((link) => {
    const url = new URL(link.href);
    url.search = catalogue.toString();
    link.href = `${url.pathname}${url.search}${url.hash}`;
  });
  document.querySelectorAll('[data-essay-navigation]').forEach((link) => {
    const url = new URL(link.href);
    if (query) url.searchParams.set('catalogue_q', query);
    if (year) url.searchParams.set('catalogue_year', year);
    link.href = `${url.pathname}${url.search}${url.hash}`;
  });
})();
