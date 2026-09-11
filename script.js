document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const counters = document.querySelectorAll('.counter');
  const impactSection = document.querySelector('#impact');
  let countersHaveRun = false;

  function animateCounter(el) {
    const target = Number(el.dataset.target || 0);
    const duration = 2200;
    const startTime = performance.now();

    el.textContent = '0';

    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.floor(target * eased).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(frame);
  }

  function runCounters() {
    if (countersHaveRun) return;
    countersHaveRun = true;

    counters.forEach((counter, index) => {
      setTimeout(() => animateCounter(counter), index * 140);
    });
  }

  if (impactSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -8% 0px'
    });

    observer.observe(impactSection);
  } else {
    runCounters();
  }
});
