// HEADER SCROLL
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

// MOBILE NAV
const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileOverlay = document.getElementById('mobile-overlay');
const mobileClose = document.getElementById('mobile-close-btn');
function openNav() { mobileNav.classList.add('open'); mobileOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeNav() { mobileNav.classList.remove('open'); mobileOverlay.classList.remove('active'); document.body.style.overflow = ''; }
hamburger?.addEventListener('click', openNav);
mobileClose?.addEventListener('click', closeNav);
mobileOverlay?.addEventListener('click', closeNav);
document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeNav));

// MENU TABS
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const panel = document.getElementById('panel-' + tab.dataset.tab);
    if (panel) panel.classList.add('active');
  });
});

// COUNTER ANIMATION
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const step = target / (1800 / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(t); }
    el.textContent = target >= 1000 ? Math.floor(cur).toLocaleString() : Math.floor(cur);
  }, 16);
}

// STATS OBSERVER
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.stat-number').forEach(animateCounter); statsObs.unobserve(e.target); } });
}, { threshold: 0.3 });
const statsEl = document.querySelector('.stats-bar');
if (statsEl) statsObs.observe(statsEl);

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function updateActiveNav() {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// GALLERY PARALLAX
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', e => {
    const r = item.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const img = item.querySelector('img');
    if (img) img.style.transform = `scale(1.1) translate(${x*8}px,${y*8}px)`;
  });
  item.addEventListener('mouseleave', () => {
    const img = item.querySelector('img');
    if (img) img.style.transform = '';
  });
});

// THEME TOGGLE (Night / Light Mode)
const themeToggleBtns = document.querySelectorAll('#theme-toggle-btn, #m-theme-toggle-btn');
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
  document.documentElement.setAttribute('data-theme', 'light');
  updateThemeIcons(true);
} else {
  document.documentElement.removeAttribute('data-theme');
  updateThemeIcons(false);
}

function updateThemeIcons(isLight) {
  const iconText = isLight ? '🌙' : '☀️';
  document.querySelectorAll('.theme-toggle-icon').forEach(icon => {
    icon.textContent = iconText;
  });
}

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
    updateThemeIcons(false);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    updateThemeIcons(true);
  }
}

themeToggleBtns.forEach(btn => btn?.addEventListener('click', toggleTheme));

console.log('Be-Nice Restaurant & Bar | Tema, Ghana');
