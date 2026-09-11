document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const counters = document.querySelectorAll('.counter');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const runCounter = (el) => {
    const target = Number(el.dataset.target || 0);
    if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
    const duration = 1300;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.counter').forEach(runCounter);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    const section = document.querySelector('#impact');
    if (section) observer.observe(section);
  } else {
    counters.forEach(runCounter);
  }
});
