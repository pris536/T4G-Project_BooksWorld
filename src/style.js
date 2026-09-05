document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('primaryNav') || document.querySelector('nav.primary');
  let toggle = document.getElementById('menuToggle');

  if (nav) {
    nav.id = 'primaryNav';
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.className = 'menu-toggle';
      toggle.id = 'menuToggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', 'Toggle menu');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
      nav.parentNode.insertBefore(toggle, nav);
    }
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.textContent = isOpen ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }
});