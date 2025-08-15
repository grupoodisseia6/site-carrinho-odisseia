/* =====================================
   Intersection Observer para revelar elementos
   ===================================== */
(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* =====================================
   Modal logic
   ===================================== */
const modal = document.getElementById('modal');
const openBtns = [
  document.getElementById('openDemo'),
  document.getElementById('openDemo2')
];
const closeBtn = document.getElementById('closeModal');

function closeModal() {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto';
}

// Abrir modal
openBtns.forEach(btn => {
  if (btn) {
    btn.addEventListener('click', () => {
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }
});

// Fechar modal via botão
closeBtn.addEventListener('click', closeModal);
modal.querySelector('[data-close]').addEventListener('click', closeModal);

// Fechar modal via tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

/* =====================================
   Visual tilt (subtle 3D) on mousemove
   ===================================== */
const visual = document.getElementById('visual');

if (visual) {
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  visual.addEventListener('mousemove', (ev) => {
    const rect = visual.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (ev.clientY - rect.top) / rect.height - 0.5;

    const rotX = clamp(-y * 8, -12, 12);
    const rotY = clamp(x * 12, -12, 12);

    visual.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
  });

  visual.addEventListener('mouseleave', () => {
    visual.style.transform = 'none';
  });
}

/* =====================================
   Smooth scroll para âncoras
   ===================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
