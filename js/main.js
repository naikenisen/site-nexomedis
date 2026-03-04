/* ================================
   NEXOMEDIS — Main JavaScript
   Menu burger, scroll reveal, smooth interactions
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Elements ----
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const reveals = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');

  // ============================
  // BURGER MENU
  // ============================
  function toggleMenu() {
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.classList.toggle('nav-open');
  }

  function closeMenu() {
    burger.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.classList.remove('nav-open');
  }

  burger.addEventListener('click', toggleMenu);

  // Close menu on link click
  allNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on overlay click
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') &&
      !navLinks.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ============================
  // NAVBAR SCROLL EFFECT
  // ============================
  let lastScroll = 0;

  function handleNavScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ============================
  // ACTIVE NAV LINK HIGHLIGHT
  // ============================
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ============================
  // SCROLL REVEAL (Intersection Observer)
  // ============================
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  reveals.forEach(el => revealObserver.observe(el));

  // ============================
  // SMOOTH SCROLL for anchor links
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    });
  });

  // ============================
  // CONTACT FORM (basic validation + feedback)
  // ============================
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      // Simple visual feedback
      btn.textContent = 'Message envoyé ✓';
      btn.style.background = 'linear-gradient(135deg, #00D4AA, #00B894)';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ============================
  // PARALLAX on hero shapes
  // ============================
  const shapes = document.querySelectorAll('.shape');

  function parallax() {
    const scrolled = window.scrollY;
    if (scrolled > window.innerHeight) return;

    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.03;
      shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  window.addEventListener('scroll', parallax, { passive: true });

  // ============================
  // TILT EFFECT on service cards (desktop only)
  // ============================
  if (window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) {
    const cards = document.querySelectorAll('.service-card, .stat-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================
  // TEXT TYPING EFFECT on hero tag
  // ============================
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    const text = heroTag.textContent;
    heroTag.textContent = '';
    heroTag.style.opacity = '1';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroTag.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
      }
    }

    // Delay start
    setTimeout(typeWriter, 500);
  }

  // ============================
  // COUNTER ANIMATION for stat icons
  // ============================
  const statCards = document.querySelectorAll('.stat-card');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'pulse 0.6s ease';
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statCards.forEach(card => counterObserver.observe(card));

  // Run once on load
  handleNavScroll();
  highlightNav();
});
