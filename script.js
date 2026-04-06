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

document.addEventListener('DOMContentLoaded', () => {
  const ctx1 = document.getElementById('chartMahasiswa');
  if (ctx1) {
    new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['T. Mesin', 'T. Elektro', 'Arsitektur', 'T. Sipil', 'T. Kimia'],
        datasets: [{
          label: 'Jumlah Mahasiswa',
          data: [980, 1120, 680, 1050, 890],
          backgroundColor: [
            'rgba(231,76,60,0.75)',
            'rgba(52,152,219,0.75)',
            'rgba(142,68,173,0.75)',
            'rgba(243,156,18,0.75)',
            'rgba(46,204,113,0.75)'
          ],
          borderColor: [
            '#e74c3c','#3498db','#8e44ad','#f39c12','#2ecc71'
          ],
          borderWidth: 2,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => ' ' + ctx.parsed.y + ' Mahasiswa'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.06)' }
          },
          y: {
            ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.08)' },
            beginAtZero: true
          }
        }
      }
    });
  }

  const ctx2 = document.getElementById('chartTren');
  if (ctx2) {
    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: ['2020/21', '2021/22', '2022/23', '2023/24', '2024/25'],
        datasets: [{
          label: 'Mahasiswa Baru',
          data: [820, 870, 910, 960, 1020],
          borderColor: '#fbbf24',
          backgroundColor: 'rgba(251,191,36,0.1)',
          pointBackgroundColor: '#fbbf24',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.4,
          fill: true,
          borderWidth: 2.5
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } }
          },
          tooltip: {
            callbacks: {
              label: ctx => ' ' + ctx.parsed.y + ' Mahasiswa Baru'
            }
          }
        },
        scales: {
          x: {
            ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.06)' }
          },
          y: {
            ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } },
            grid: { color: 'rgba(255,255,255,0.08)' },
            beginAtZero: false
          }
        }
      }
    });
  }
});

function handleSubmit(e) {
  e.preventDefault();

  const nama = document.getElementById('inputNama').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const topik = document.getElementById('inputTopik').value;
  const pesan = document.getElementById('inputPesan').value.trim();

  if (!nama || !email || !pesan) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Tidak Lengkap',
      text: 'Mohon lengkapi semua field yang diperlukan.',
      confirmButtonColor: '#1a4fd8',
      confirmButtonText: 'OK, Mengerti'
    });
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';

    Swal.fire({
      icon: 'success',
      title: 'Pesan Terkirim!',
      html: `<p>Terima kasih <strong>${nama}</strong>, pesan Anda mengenai <em>${topik}</em> telah kami terima.</p><p style="margin-top:8px;font-size:0.9rem;color:#64748b">Tim kami akan menghubungi Anda melalui <strong>${email}</strong> secepatnya.</p>`,
      confirmButtonColor: '#1a4fd8',
      confirmButtonText: 'Tutup',
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' },
      footer: '<small>Fakultas Teknik – Universitas Riau</small>'
    });

    e.target.reset();
  }, 1600);
}