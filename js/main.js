// ===== GENERATE STAR FIELD =====
function generateStars(layer, count, size) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);
    shadows.push(`${x}px ${y}px #fff`);
  }
  layer.style.boxShadow = shadows.join(',');
  layer.style.width = size + 'px';
  layer.style.height = size + 'px';
}

const star1 = document.querySelector('.stars--1');
const star2 = document.querySelector('.stars--2');
const star3 = document.querySelector('.stars--3');
if (star1 && star2 && star3) {
  generateStars(star1, 200, 1);
  generateStars(star2, 100, 2);
  generateStars(star3, 50, 3);

  // Apply same shadow to ::before via style injection
  const style = document.createElement('style');
  style.textContent = `
    .stars--1::before { box-shadow: ${star1.style.boxShadow}; width: 1px; height: 1px; }
    .stars--2::before { box-shadow: ${star2.style.boxShadow}; width: 2px; height: 2px; }
    .stars--3::before { box-shadow: ${star3.style.boxShadow}; width: 3px; height: 3px; }
    .stars--1, .stars--2, .stars--3 { background: transparent; }
  `;
  document.head.appendChild(style);

  // Apply via box-shadow directly on the layer instead
  star1.style.background = 'transparent';
  star2.style.background = 'transparent';
  star3.style.background = 'transparent';
}

// ===== NAVBAR: shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== CONTACT FORM =====
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<span>TRANSMITTING...</span>';
  formNote.textContent = '';
  formNote.className = 'form-note';

  const FORMSPREE_URL = 'https://formspree.io/f/GANTI_DENGAN_ID_ANDA';

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (res.ok) {
      formNote.textContent = '✦ Signal received. Response inbound from sector 7G.';
      formNote.classList.add('success');
      form.reset();
    } else throw new Error();
  } catch {
    formNote.textContent = '⚠ Transmission failed. Try again or use direct channel.';
    formNote.classList.add('error');
  }

  btn.disabled = false;
  btn.innerHTML = original;
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.timeline__item, .edu-card, .skill-block, .project-card, .award-card, .channel, .contact__form, .about__visual, .about__bio'
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = `opacity .8s ease ${(i % 6) * 80}ms, transform .8s ease ${(i % 6) * 80}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar').forEach(bar => barObserver.observe(bar));

// ===== PARALLAX HERO PLANET =====
const heroPlanet = document.querySelector('.hero__planet');
window.addEventListener('scroll', () => {
  if (heroPlanet && window.scrollY < window.innerHeight) {
    const y = window.scrollY * 0.3;
    heroPlanet.style.transform = `translateY(${y}px) rotate(${window.scrollY * 0.1}deg)`;
  }
}, { passive: true });

// ===== CURSOR GLOW (desktop only) =====
if (window.matchMedia('(pointer: fine)').matches) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(0,240,255,.08) 0%, transparent 60%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: opacity .3s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}
