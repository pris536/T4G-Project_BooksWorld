const initializePage = () => {
  const dropdownMenus = {
    'discussions.html': [
      ['Reviews & Recommendations', 'discussions.html#reviews-recommendations'],
      ['Author Talks', 'discussions.html#new-discussion'],
      ['Top Discussions', 'discussions.html#top-discussions'],
      ['Comments', 'discussions.html#comments']
    ],
    'challenges.html': [
      ['Top Challenges', 'challenges.html#top-challenges'],
      ['Leaderboard', 'challenges.html#leaderboard-list'],
      ['Giveaways', 'challenges.html#giveaways'],
      ['Badges', 'challenges.html#badges']
    ],
    'myspace.html': [
      ['My Bookclubs', 'myspace.html#my-bookclubs'],
      ['My Library', 'myspace.html#my-library'],
      ['My Blog', 'myspace.html#blog'],
      ['My Comments', 'myspace.html#my-comments'],
      ['My Challenges', 'myspace.html#my-challenges'],
      ['Chat', 'myspace.html#chat']
    ],
    'community.html': [
      ['Blogs', 'community.html#blog'],
      ['Bookclubs', 'community.html#bookclubs'],
      ['Community Polls', 'community.html#status']
    ]
  };

  Object.entries(dropdownMenus).forEach(([page, items]) => {
    document.querySelectorAll(`nav.primary a[href$="${page}"]`).forEach((parentLink) => {
      const parentItem = parentLink.closest('li');

      if (!parentItem || parentItem.querySelector('.nav-dropdown-menu')) {
        return;
      }

      parentItem.classList.add('nav-dropdown');

      if (!parentLink.querySelector('.caret')) {
        const caret = document.createElement('span');
        caret.className = 'caret';
        caret.setAttribute('aria-hidden', 'true');
        caret.textContent = '▾';
        parentLink.append(caret);
      }

      const menu = document.createElement('ul');
      menu.className = 'nav-dropdown-menu';
      menu.innerHTML = items
        .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
        .join('');
      parentItem.append(menu);
    });
  });

  const footerDestinations = {
    'terms of use': 'about.html#terms',
    privacy: 'about.html#privacy',
    pricing: 'signup.html#pricing',
    'my space': 'myspace.html',
    challenges: 'challenges.html',
    'discussion questions': 'discussions.html#new-discussion',
    blog: 'community.html#blog',
    'join a book club': 'index.html#community',
    'create a bookclub': 'index.html#community',
    faqs: 'contact.html#faqs'
  };

  document.querySelectorAll('footer a').forEach((footerLink) => {
    const destination = footerDestinations[footerLink.textContent.trim().toLowerCase()];

    if (destination) {
      footerLink.href = destination;
    }
  });

  const welcomeChat = document.querySelector('.welcome-chat');
  const welcomeChatClose = welcomeChat?.querySelector('.welcome-chat-close');

  welcomeChatClose?.addEventListener('click', () => {
    welcomeChat.classList.add('is-dismissed');
  });

  window.addEventListener('pageshow', () => {
    welcomeChat?.classList.remove('is-dismissed');
  });

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

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }

  document.querySelectorAll('.footer-connect').forEach((connect) => {
    if (!connect.querySelector('.social-links')) {
      connect.insertAdjacentHTML(
        'beforeend',
        '<div class="social-links" aria-label="BooksWorld social media">'
          + '<a href="https://www.facebook.com/" aria-label="Facebook" target="_blank" rel="noopener noreferrer">'
          + '<i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>'
          + '<a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noopener noreferrer">'
          + '<i class="fa-brands fa-instagram" aria-hidden="true"></i></a>'
          + '<a href="https://x.com/" aria-label="X" target="_blank" rel="noopener noreferrer">'
          + '<i class="fa-brands fa-x-twitter" aria-hidden="true"></i></a>'
          + '</div>'
      );
    }
  });

  const accountForm = document.querySelector('.form-card form');
  const isLoginPage = document.title.startsWith('Log In');
  const isSignupPage = document.title.startsWith('Sign Up');

  if (isLoginPage && accountForm && !accountForm.querySelector('.forgot-password')) {
    const passwordInput = accountForm.querySelector('input[type="password"]');

    if (passwordInput) {
      passwordInput.insertAdjacentHTML(
        'afterend',
        '<a class="forgot-password" href="#forgot-password">Forgot password?</a>'
      );
    }
  }

  if (
    accountForm
    && (isLoginPage || isSignupPage)
    && !accountForm.querySelector('.social-login')
  ) {
    const action = isSignupPage ? 'Sign up' : 'Log in';
    const submitButton = accountForm.querySelector('button[type="submit"]');

    submitButton.insertAdjacentHTML(
      'afterend',
      `<div class="social-login">
        <a class="social-login-button google-login" href="#google-login">
          <i class="fa-brands fa-google" aria-hidden="true"></i>
          <span>${action} with Google</span>
        </a>
        <a class="social-login-button facebook-login" href="#facebook-login">
          <i class="fa-brands fa-facebook-f" aria-hidden="true"></i>
          <span>${action} with Facebook</span>
        </a>
      </div>`
    );
  }

  const contactForm = document.querySelector('.form-card form');
  const isContactPage = document.title.startsWith('Contact');
  const nameInput = contactForm?.querySelector('#name');
  const nameLabel = contactForm?.querySelector('label[for="name"]');

  if (isContactPage && contactForm && nameInput && nameLabel) {
    nameLabel.remove();
    nameInput.remove();

    const firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'first-name');
    firstNameLabel.textContent = 'First name';

    const firstNameInput = document.createElement('input');
    firstNameInput.id = 'first-name';
    firstNameInput.name = 'first-name';
    firstNameInput.type = 'text';
    firstNameInput.placeholder = 'Your first name';
    firstNameInput.required = true;

    const lastNameLabel = document.createElement('label');
    lastNameLabel.setAttribute('for', 'last-name');
    lastNameLabel.textContent = 'Last name';

    const lastNameInput = document.createElement('input');
    lastNameInput.id = 'last-name';
    lastNameInput.name = 'last-name';
    lastNameInput.type = 'text';
    lastNameInput.placeholder = 'Your last name';
    lastNameInput.required = true;

    const emailLabel = contactForm.querySelector('label[for="email"]');
    contactForm.insertBefore(firstNameLabel, emailLabel);
    contactForm.insertBefore(firstNameInput, emailLabel);
    contactForm.insertBefore(lastNameLabel, emailLabel);
    contactForm.insertBefore(lastNameInput, emailLabel);
  }

  if (isContactPage && contactForm && !document.querySelector('.contact-email-link')) {
    const emailLink = document.createElement('a');
    emailLink.className = 'contact-email-link';
    emailLink.href = 'mailto:booksworldxx@gmail.com';
    emailLink.innerHTML = '<i class="fa-solid fa-envelope" aria-hidden="true"></i><span>booksworldxx@gmail.com</span>';
    contactForm.closest('.form-card').append(emailLink);
  }
  const pageHero = document.querySelector('.page-hero');

  if (pageHero && document.title.startsWith('Discussions')) {
    pageHero.className = 'discussion-slider';
    pageHero.innerHTML = `
      <p class="eyebrow">DISCUSSIONS</p>
      <h1>Say What The Story Made You Feel</h1>
      <p class="slider-intro">
        Join thoughtful conversations, share interpretations,leave comments and find new
        perspectives from readers around the world.
      </p>
      <form class="book-search" role="search">
        <label class="sr-only" for="discussion-book-search">Search books</label>
        <input id="discussion-book-search" type="search" placeholder="search book by title or author">
        <button type="submit" aria-label="Search books"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
      </form>
      <a class="btn btn-rose discussion-cta" href="#new-discussion">
        Start New Discussion
      </a>

      <div class="discussion-track" aria-live="polite">
        <article class="discussion-slide">
          <div class="novel-cover">
            THE<br>
      ABDUCTED<br>
            
          </div>
          <div>
            <blockquote>
              “That plot twist altered my brain chemistry,
 I am still processing.”
            </blockquote>
            <cite>Jessica, discussing The Abducted</cite>
          </div>
        </article>

        <article class="discussion-slide">
          <div class="novel-cover">BELOVED</div>
          <div>
            <blockquote>
              “What stayed with me was how memory becomes a place the characters
              have to keep living in.”
            </blockquote>
            <cite>Jordan, discussing Beloved</cite>
          </div>
        </article>

        <article class="discussion-slide">
          <div class="novel-cover">
            THE<br>
            NIGHT<br>
            CIRCUS
          </div>
          <div>
            <blockquote>
              “Every chapter feels like stepping through another tent:
              beautiful, strange, and impossible to leave too quickly.”
            </blockquote>
            <cite>Sam, discussing The Night Circus</cite>
          </div>
        </article>
      </div>

      <div class="discussion-controls">
        <div class="discussion-dots" aria-label="Choose a comment">
          <button class="discussion-dot" type="button" aria-label="Show first comment"></button>
          <button class="discussion-dot" type="button" aria-label="Show second comment"></button>
          <button class="discussion-dot" type="button" aria-label="Show third comment"></button>
        </div>
      </div>
    `;
  }

  const discussionHero = document.querySelector('.discussion-slider');

  if (discussionHero) {
    const slides = [...discussionHero.querySelectorAll('.discussion-slide')];
    const dots = [...discussionHero.querySelectorAll('.discussion-dot')];
    let currentSlide = 0;
    let rotation;

    const showSlide = (index) => {
      currentSlide = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle('is-active', slideIndex === currentSlide);
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === currentSlide);
        dot.setAttribute(
          'aria-current',
          dotIndex === currentSlide ? 'true' : 'false'
        );
      });
    };

    const restartRotation = () => {
      window.clearInterval(rotation);
      rotation = window.setInterval(() => showSlide(currentSlide + 1), 10000);
    };

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', () => {
        showSlide(dotIndex);
        restartRotation();
      });
    });

    discussionHero.addEventListener('mouseenter', () => {
      window.clearInterval(rotation);
    });

    discussionHero.addEventListener('mouseleave', restartRotation);

    showSlide(0);
    restartRotation();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializePage, { once: true });
} else {
  initializePage();
}



