// ============================================================
// NAVBAR — scroll effect + mobile menu
// ============================================================
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ============================================================
// SMOOTH ACTIVE LINK HIGHLIGHT
// ============================================================
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// ============================================================
// SCROLL-IN ANIMATIONS
// ============================================================
const animatedEls = document.querySelectorAll(
  '.timeline-item, .skill-category, .edu-card, .hobby-card'
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings slightly
      const siblings = [...entry.target.parentElement.children];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animatedEls.forEach(el => revealObserver.observe(el));


// ============================================================
// SKILL PILLS — hover ripple
// ============================================================
document.querySelectorAll('.skill-pills span').forEach(pill => {
  pill.addEventListener('mouseenter', () => {
    pill.style.setProperty('--x', '50%');
    pill.style.setProperty('--y', '50%');
  });
});

// ============================================================
// ACTIVE NAV STYLE
// ============================================================
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--white) !important; }`;
document.head.appendChild(style);
