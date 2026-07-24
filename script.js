/* ================================================================
   Balit — Main Script
   Canvas Engine · i18n · Interactions · Motion
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     i18n — Translation System
     ============================================================ */
  const i18n = {
    en: {
      'nav.services': 'Services',
      'nav.solutions': 'Solutions',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.cta': 'Get Started',
      'hero.badge': 'AI-Native Intelligence',
      'hero.line1': 'Intelligence',
      'hero.line2': 'Redesigned',
      'hero.sub': 'Balit builds AI-native systems that transform how enterprises operate. From legacy architecture to intelligent infrastructure — we make the future practical.',
      'hero.ctaPrimary': 'Start Your Transformation',
      'hero.ctaSecondary': 'See Our Approach',
      'hero.stat1': 'Projects',
      'hero.stat2': 'Client Retention',
      'hero.stat3': 'Avg. Cost Reduction',
      'hero.scroll': 'Scroll',
      'concepts.label': 'Brand Exploration',
      'concepts.title': 'Logo Concepts',
      'concepts.sub': 'Five directions. One identity. Each mark explores the intersection of ascent, intelligence, and precision.',
      'concepts.c1': 'Rising diamond on an ascent arc',
      'concepts.c2': 'Geometric peak with neural edges',
      'concepts.c3': 'Elliptical paths around a focal point',
      'concepts.c4': 'An upward trajectory with momentum',
      'concepts.c5': 'Hexagonal structure with connected elements',
      'footer.copyright': '© 2026 Balit. All rights reserved.',
    },
    fa: {
      'nav.services': 'خدمات',
      'nav.solutions': 'راهکارها',
      'nav.about': 'درباره ما',
      'nav.contact': 'تماس',
      'nav.cta': 'شروع کنید',
      'hero.badge': 'هوش مصنوعی بومی',
      'hero.line1': 'هوش',
      'hero.line2': 'بازتعریف شده',
      'hero.sub': 'بالیت سیستم‌های بومی هوش مصنوعی می‌سازد که نحوه کار سازمان‌ها را متحول می‌کند. از معماری قدیمی تا زیرساخت هوشمند — آینده را عملی می‌کنیم.',
      'hero.ctaPrimary': 'تحول خود را آغاز کنید',
      'hero.ctaSecondary': 'رویکرد ما را ببینید',
      'hero.stat1': 'پروژه',
      'hero.stat2': 'رضایت مشتری',
      'hero.stat3': 'کاهش هزینه متوسط',
      'hero.scroll': 'اسکرول',
      'concepts.label': 'کاوش برند',
      'concepts.title': 'مفهوم لوگو',
      'concepts.sub': 'پنج مسیر. یک هویت. هر نشان‌واره تلاقی صعود، هوش و دقت را کاوش می‌کند.',
      'concepts.c1': 'الماس صعودی روی قوس پرواز',
      'concepts.c2': 'قله هندسی با لبه‌های عصبی',
      'concepts.c3': 'مسیرهای بیضوی حول یک نقطه کانونی',
      'concepts.c4': 'مسیر صعود با تکانه',
      'concepts.c5': 'ساختار شش‌ضلعی با عناصر متصل',
      'footer.copyright': '© ۲۰۲۶ بالیت. تمام حقوق محفوظ است.',
    },
  };

  function applyLanguage(lang) {
    const translations = i18n[lang];
    if (!translations) return;

    document.documentElement.lang = lang === 'fa' ? 'fa' : 'en';
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';

    // Update body font
    document.body.style.fontFamily = lang === 'fa'
      ? "'Vazirmatn', 'Inter', system-ui, sans-serif"
      : "'Inter', system-ui, -apple-system, sans-serif";

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Toggle EN/FA indicators
    document.querySelectorAll('.lang-en').forEach((el) => el.classList.toggle('hidden', lang === 'fa'));
    document.querySelectorAll('.lang-fa').forEach((el) => el.classList.toggle('hidden', lang === 'en'));

    // Logo text
    const logoText = document.querySelector('.logo-text');
    if (logoText) logoText.textContent = lang === 'fa' ? 'بالیت' : 'Balit';

    localStorage.setItem('balit-lang', lang);
  }

  // Init language
  const savedLang = localStorage.getItem('balit-lang') || 'en';
  applyLanguage(savedLang);

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = document.documentElement.lang;
      const next = current === 'fa' ? 'en' : 'fa';
      applyLanguage(next);
    });
  }

  /* ============================================================
     CURSOR FOLLOWER
     ============================================================ */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (cursorDot && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Scale ring on hoverables
    const hoverTargets = document.querySelectorAll('a, button, .magnetic-btn, .concept-card');
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorRing.style.width = '56px';
        cursorRing.style.height = '56px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.35)';
      });
      el.addEventListener('mouseleave', () => {
        cursorRing.style.width = '40px';
        cursorRing.style.height = '40px';
        cursorRing.style.borderColor = 'rgba(255,255,255,0.2)';
      });
    });
  }

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  document.querySelectorAll('.magnetic-btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ============================================================
     REVEAL ON SCROLL
     ============================================================ */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }

  /* ============================================================
     LOGO NODE LIGHTING
     ============================================================ */
  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    const nodes = logoLink.querySelectorAll('.logo-node');
    if (nodes.length) {
      let t;
      logoLink.addEventListener('mouseenter', () => {
        clearTimeout(t);
        nodes.forEach((n) => n.classList.remove('logo-node-lit'));
        nodes.forEach((n, i) => setTimeout(() => n.classList.add('logo-node-lit'), i * 35));
      });
      logoLink.addEventListener('mouseleave', () => {
        clearTimeout(t);
        t = setTimeout(() => {
          Array.from(nodes).reverse().forEach((n, i) => {
            setTimeout(() => n.classList.remove('logo-node-lit'), i * 20);
          });
        }, 200);
      });
    }
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', open);
      const s = toggleBtn.querySelectorAll('span');
      s[0].style.transform = open ? 'rotate(45deg) translate(3px,3px)' : '';
      s[1].style.opacity = open ? '0' : '';
      s[2].style.transform = open ? 'rotate(-45deg) translate(3px,-3px)' : '';
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.querySelectorAll('span').forEach((s) => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  /* ============================================================
     HEADER SCROLL
     ============================================================ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ============================================================
     CANVAS BACKGROUND ENGINE
     ============================================================ */
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ---- Mouse ----
  let mx = W / 2, my = H / 2;
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  document.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    mx = t.clientX; my = t.clientY;
  }, { passive: true });

  // ---- Scroll influence ----
  let scrollFactor = 0;
  window.addEventListener('scroll', () => {
    scrollFactor = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  }, { passive: true });

  // ---- Particles ----
  const PARTICLE_COUNT = 90;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.1,
      r: 0.5 + Math.random() * 2,
      baseAlpha: 0.15 + Math.random() * 0.25,
      alpha: 0,
    });
  }

  // ---- Geometric shapes ----
  const shapes = [];
  const SHAPE_COUNT = 6;
  const shapeTypes = ['triangle', 'hexagon'];

  for (let i = 0; i < SHAPE_COUNT; i++) {
    const type = shapeTypes[i % shapeTypes.length];
    const size = 8 + Math.random() * 18;
    shapes.push({
      type,
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15 - 0.05,
      size,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      alpha: 0.03 + Math.random() * 0.05,
    });
  }

  // ---- Aurora bands (canvas-based) ----
  const auroraBands = [
    { x: W * 0.2, y: H * 0.3, radius: 250, color: '59,130,246', alpha: 0.04, phase: 0 },
    { x: W * 0.7, y: H * 0.5, radius: 200, color: '139,92,246', alpha: 0.03, phase: 2 },
    { x: W * 0.5, y: H * 0.7, radius: 180, color: '6,182,212', alpha: 0.025, phase: 4 },
  ];

  // ---- Draw loop ----
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // -- Aurora bands --
    auroraBands.forEach((band, idx) => {
      const t = performance.now() / 1000;
      const dx = Math.sin(t * 0.1 + band.phase) * 60;
      const dy = Math.cos(t * 0.08 + band.phase) * 40;
      const scrollOff = scrollFactor * 80;
      const gradient = ctx.createRadialGradient(
        band.x + dx, band.y + dy + scrollOff, 0,
        band.x + dx, band.y + dy + scrollOff, band.radius
      );
      const a = band.alpha * (0.8 + 0.2 * Math.sin(t * 0.15 + band.phase));
      gradient.addColorStop(0, `rgba(${band.color},${a})`);
      gradient.addColorStop(0.5, `rgba(${band.color},${a * 0.4})`);
      gradient.addColorStop(1, `rgba(${band.color},0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, W, H);
    });

    // -- Particles --
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse influence (gentle repel)
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.3;
        p.vx += (dx / dist) * force * 0.02;
        p.vy += (dy / dist) * force * 0.02;
      }

      // Drift
      p.vx += (Math.random() - 0.5) * 0.004;
      p.vy += (Math.random() - 0.5) * 0.002;
      p.vx *= 0.995;
      p.vy *= 0.995;

      p.x += p.vx;
      p.y += p.vy + scrollFactor * 0.15;

      // Wrap
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // Draw
      const distToMouse = Math.sqrt((p.x - mx) ** 2 + (p.y - my) ** 2);
      const nearFactor = Math.max(0, 1 - distToMouse / 200);
      const alpha = Math.min(p.baseAlpha + nearFactor * 0.3, 0.6);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${alpha})`;
      ctx.fill();

      // Glow on brighter particles
      if (p.r > 1.5 && alpha > 0.3) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${alpha * 0.08})`;
        ctx.fill();
      }
    }

    // -- Connections --
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.06;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // -- Geometric shapes --
    for (let i = 0; i < shapes.length; i++) {
      const s = shapes[i];
      s.x += s.vx + scrollFactor * 0.1;
      s.y += s.vy + scrollFactor * 0.08;
      s.rotation += s.rotSpeed;

      if (s.x < -50) s.x = W + 50;
      if (s.x > W + 50) s.x = -50;
      if (s.y < -50) s.y = H + 50;
      if (s.y > H + 50) s.y = -50;

      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = s.alpha;
      ctx.strokeStyle = 'rgba(139,92,246,0.15)';
      ctx.lineWidth = 0.6;

      if (s.type === 'triangle') {
        ctx.beginPath();
        for (let k = 0; k < 3; k++) {
          const angle = (k / 3) * Math.PI * 2 - Math.PI / 2;
          const px = Math.cos(angle) * s.size;
          const py = Math.sin(angle) * s.size;
          k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const angle = (k / 6) * Math.PI * 2;
          const px = Math.cos(angle) * s.size;
          const py = Math.sin(angle) * s.size;
          k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Inner dot
      ctx.beginPath();
      ctx.arc(0, 0, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6,182,212,0.08)';
      ctx.fill();

      ctx.restore();
    }

    requestAnimationFrame(draw);
  }

  draw();

  /* ============================================================
     PARALLAX ON HERO (mouse-driven via CSS)
     ============================================================ */
  const hero = document.getElementById('hero');
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      const xFactor = (e.clientX / window.innerWidth - 0.5) * 2;
      const yFactor = (e.clientY / window.innerHeight - 0.5) * 2;
      const heroContent = hero.querySelector('.relative.z-10');
      if (heroContent) {
        heroContent.style.setProperty('--parallax-x', (xFactor * 6).toFixed(1) + 'px');
        heroContent.style.setProperty('--parallax-y', (yFactor * 4).toFixed(1) + 'px');
      }
    });

    // Apply parallax transform in animation frame for performance
    let parallaxRAF;
    function applyParallax() {
      const content = hero.querySelector('.relative.z-10');
      if (content) {
        const x = content.style.getPropertyValue('--parallax-x') || '0px';
        const y = content.style.getPropertyValue('--parallax-y') || '0px';
        content.style.transform = `translate(${x}, ${y})`;
      }
      parallaxRAF = requestAnimationFrame(applyParallax);
    }
    // Start after initial animations
    setTimeout(() => { parallaxRAF = requestAnimationFrame(applyParallax); }, 1000);
  }

  /* ============================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});