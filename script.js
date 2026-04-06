NProgress.configure({ showSpinner: true, speed: 400 });
NProgress.start();
window.addEventListener('load', () => NProgress.done());

AOS.init({
  duration: 700,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic'
});

const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('visible');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('visible');
  }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = '#fbbf24';
  });
});

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000
      ? (current >= 1000 ? Math.floor(current).toLocaleString('id-ID') + '+' : Math.floor(current).toLocaleString('id-ID'))
      : Math.floor(current);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-count]').forEach(el => counterObserver.observe(el));

document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(28px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 250);
  }
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('.geo').forEach((g, i) => {
    g.style.transform = `translateY(${window.scrollY * (0.04 + i * 0.025)}px)`;
  });
});

$(document).ready(function () {
  if ($.fn.DataTable && document.getElementById('prodiTable')) {
    $('#prodiTable').DataTable({
      language: {
        search: 'Cari:',
        lengthMenu: 'Tampilkan _MENU_ data',
        info: 'Menampilkan _START_ - _END_ dari _TOTAL_ program studi',
        infoEmpty: 'Tidak ada data tersedia',
        zeroRecords: 'Tidak ada program studi yang cocok',
        paginate: { first: 'Pertama', last: 'Terakhir', next: 'Lanjut', previous: 'Sebelum' }
      },
      pageLength: 5,
      ordering: true,
      responsive: true,
      columnDefs: [
        { targets: 0, width: '5%' },
        { targets: 5, orderable: false }
      ]
    });
  }
});