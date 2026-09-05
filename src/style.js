const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  // close mobile menu after a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });