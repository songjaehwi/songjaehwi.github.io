(() => {
  const dialog = document.getElementById('figure-dialog');
  if (dialog && typeof dialog.showModal === 'function') {
    const image = dialog.querySelector('.expanded-figure');
    const title = dialog.querySelector('#figure-title');
    const caption = dialog.querySelector('.figure-caption');
    const source = dialog.querySelector('.figure-source');
    let trigger;

    document.querySelectorAll('[data-figure]').forEach(link => {
      link.addEventListener('click', event => {
        // Preserve browser gestures for opening images in another tab.
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        image.src = link.href;
        image.alt = link.dataset.caption;
        title.textContent = link.dataset.title;
        caption.textContent = link.dataset.caption;
        source.href = link.dataset.source;
        dialog.showModal();
      });
    });

    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) {
        dialog.close();
      }
    });
    dialog.addEventListener('close', () => trigger?.focus({ preventScroll: true }));
  }

  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.site-header nav a[href^="#"]')];
    const sections = links.map(link => document.querySelector(link.hash)).filter(Boolean);
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target));
      const active = sections.find(section => visible.has(section));
      links.forEach(link => {
        if (active && link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-5% 0px -35% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
