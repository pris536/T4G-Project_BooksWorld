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
      toggle.textContent = '☰';
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  document.querySelectorAll('.footer-connect').forEach(connect => {
    if (!connect.querySelector('.social-links')) {
      connect.insertAdjacentHTML('beforeend', '<div class="social-links" aria-label="BooksWorld social media"><a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a><a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="https://x.com/" aria-label="X" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a></div>');
    }
  });

  const accountForm = document.querySelector('.form-card form');
  const isLoginPage = document.title.startsWith('Log In');
  const isSignupPage = document.title.startsWith('Sign Up');
  if (isLoginPage && accountForm && !accountForm.querySelector('.forgot-password')) {
    const passwordInput = accountForm.querySelector('input[type="password"]');
    if (passwordInput) {
      passwordInput.insertAdjacentHTML('afterend', '<a class="forgot-password" href="#forgot-password">Forgot password?</a>');
    }
  }
  if (accountForm && (isLoginPage || isSignupPage) && !accountForm.querySelector('.social-login')) {
    const action = isSignupPage ? 'Sign up' : 'Log in';
    accountForm.querySelector('button[type="submit"]').insertAdjacentHTML('afterend', `<div class="social-login"><a class="social-login-button google-login" href="#google-login"><i class="fa-brands fa-google" aria-hidden="true"></i><span>${action} with Google</span></a><a class="social-login-button facebook-login" href="#facebook-login"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i><span>${action} with Facebook</span></a></div>`);
  }
});