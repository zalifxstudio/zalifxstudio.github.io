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

// ===== CONTACT FORM (Formspree-ready) =====
const form     = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type=submit]');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Mengirim... 🌱';
  formNote.textContent = '';
  formNote.className = 'form-note';

  // Ganti dengan endpoint Formspree Anda: https://formspree.io/f/XXXXXXXX
  const FORMSPREE_URL = 'https://formspree.io/f/GANTI_DENGAN_ID_ANDA';

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    if (res.ok) {
      formNote.textContent = '🌿 Pesan berhasil ditanam! Saya akan membalas segera.';
      formNote.classList.add('success');
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    formNote.textContent = '🍂 Gagal mengirim. Coba lagi atau hubungi via email.';
    formNote.classList.add('error');
  }

  btn.disabled = false;
  btn.textContent = originalText;
});

// ===== SCROLL REVEAL (ringan, tanpa library) =====
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .about__photo-wrap, .about__text, .quote, .contact-form, .contact-socials'
);

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity .7s ease ${i * 60}ms, transform .7s ease ${i * 60}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== PARALLAX RINGAN UNTUK DAUN BACKGROUND =====
const leaves = document.querySelectorAll('.leaf');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  leaves.forEach((leaf, i) => {
    const speed = 0.05 + (i % 3) * 0.04;
    leaf.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });
