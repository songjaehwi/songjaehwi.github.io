(() => {
  const emailContact = document.querySelector('.email-contact');
  if (emailContact) {
    const address = emailContact.querySelector('.email-address');
    const copy = emailContact.querySelector('.email-copy');
    const status = emailContact.querySelector('.email-status');
    copy.hidden = false;
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(address.textContent.trim());
        status.textContent = 'Copied!';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(address);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Select and copy the address above.';
      }
    });
    emailContact.addEventListener('toggle', () => {
      if (!emailContact.open) status.textContent = '';
    });
    document.addEventListener('click', event => {
      if (!emailContact.contains(event.target)) emailContact.open = false;
    });
    emailContact.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        emailContact.open = false;
        emailContact.querySelector('summary').focus();
      }
    });
  }

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
