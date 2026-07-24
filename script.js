/* ============================================================
   BalitGroup — Main Script
   Mountain Mesh Generator · Interactions · Responsive
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     MOUNTAIN MESH GENERATOR
     Creates an abstract wireframe mountain peak with
     neural network–style nodes and floating particles.
     ========================================================== */
  class MountainMesh {
    constructor(container) {
      this.container = container;
      this.svg       = null;
      this.nodes     = [];
      this.particles = [];
      this.resizeId  = null;
      this.init();
    }

    /* ---------- Build the full scene ---------- */
    init() {
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      this.draw();
      this.container.appendChild(this.svg);
      window.addEventListener('resize', () => {
        clearTimeout(this.resizeId);
        this.resizeId = setTimeout(() => this.draw(), 200);
      });
    }

    draw() {
      const W = window.innerWidth;
      const H = window.innerHeight;

      this.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

      // Clear previous content (keep SVGGElement list fast)
      while (this.svg.firstChild) this.svg.removeChild(this.svg.firstChild);

      if (W < 640) {
        this.drawMobile(W, H);
      } else {
        this.drawDesktop(W, H);
      }
    }

    /* ---------- Desktop / Tablet version ---------- */
    drawDesktop(W, H) {
      const peakX  = W * 0.58;
      const peakY  = H * 0.13;
      const baseY  = H * 0.92;
      const halfW  = Math.min(W * 0.35, 480);

      const levels = 16;
      const rows   = [];

      // --- Generate node grid ---
      for (let i = 0; i <= levels; i++) {
        const t     = i / levels;
        const y     = peakY + (baseY - peakY) * t;
        const w     = halfW * (1 - t * 0.88);
        const count = Math.max(3, Math.round(14 - t * 9));
        const row   = [];

        for (let j = 0; j < count; j++) {
          const xFrac  = j / (count - 1 || 1);
          const x      = peakX - w + w * 2 * xFrac;
          const noiseX = (Math.random() - 0.5) * 12 * t;
          const noiseY = (Math.random() - 0.5) * 6 * t;
          row.push({ x: x + noiseX, y: y + noiseY });
        }
        rows.push(row);
      }

      // --- Draw horizontal lines ---
      rows.forEach((row) => {
        if (row.length < 2) return;
        for (let j = 0; j < row.length - 1; j++) {
          this.line(row[j], row[j + 1], 'mesh-line');
        }
      });

      // --- Draw vertical (connector) lines ---
      for (let i = 0; i < rows.length - 1; i++) {
        const cur = rows[i];
        const nxt = rows[i + 1];
        const pairs = Math.min(cur.length, nxt.length);
        for (let j = 0; j < pairs; j++) {
          this.line(cur[j], nxt[j], 'mesh-line');
        }
        // Cross connections for mesh effect
        for (let j = 0; j < pairs - 1; j++) {
          this.line(cur[j], nxt[j + 1], 'mesh-line');
          this.line(cur[j + 1], nxt[j], 'mesh-line');
        }
      }

      // --- Draw nodes ---
      rows.forEach((row, i) => {
        row.forEach((pt) => {
          const isPeak = i === 0 && pt === row[Math.floor(row.length / 2)];
          this.circle(pt.x, pt.y, isPeak ? 3 : 1.4, isPeak ? 'mesh-node-peak' : 'mesh-node');
        });
      });

      // --- Outline silhouette ---
      const firstRow = rows[0];
      const lastRow  = rows[rows.length - 1];
      if (firstRow && lastRow) {
        this.line(
          { x: lastRow[0].x, y: lastRow[0].y },
          { x: firstRow[Math.floor(firstRow.length / 2)].x, y: firstRow[Math.floor(firstRow.length / 2)].y },
          'mesh-outline'
        );
        this.line(
          { x: lastRow[lastRow.length - 1].x, y: lastRow[lastRow.length - 1].y },
          { x: firstRow[Math.floor(firstRow.length / 2)].x, y: firstRow[Math.floor(firstRow.length / 2)].y },
          'mesh-outline'
        );
      }

      // --- Neural particles ---
      this.spawnParticles(W, H);
    }

    /* ---------- Mobile simplified version ---------- */
    drawMobile(W, H) {
      const peakX  = W * 0.5;
      const peakY  = H * 0.18;
      const baseY  = H * 0.88;
      const halfW  = W * 0.32;

      const levels = 10;
      const rows   = [];

      for (let i = 0; i <= levels; i++) {
        const t     = i / levels;
        const y     = peakY + (baseY - peakY) * t;
        const w     = halfW * (1 - t * 0.85);
        const count = Math.max(2, Math.round(10 - t * 7));
        const row   = [];
        for (let j = 0; j < count; j++) {
          const xFrac = j / (count - 1 || 1);
          const x     = peakX - w + w * 2 * xFrac;
          row.push({ x, y });
        }
        rows.push(row);
      }

      rows.forEach((row) => {
        for (let j = 0; j < row.length - 1; j++) {
          this.line(row[j], row[j + 1], 'mesh-line');
        }
      });
      for (let i = 0; i < rows.length - 1; i++) {
        const pairs = Math.min(rows[i].length, rows[i + 1].length);
        for (let j = 0; j < pairs; j++) {
          this.line(rows[i][j], rows[i + 1][j], 'mesh-line');
        }
      }
      rows.forEach((row) => {
        row.forEach((pt) => this.circle(pt.x, pt.y, 1.2, 'mesh-node'));
      });

      this.spawnParticles(W, H);
    }

    /* ---------- SVG helpers ---------- */
    line(a, b, cls) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      el.setAttribute('x1', a.x);
      el.setAttribute('y1', a.y);
      el.setAttribute('x2', b.x);
      el.setAttribute('y2', b.y);
      el.setAttribute('class', cls);
      this.svg.appendChild(el);
    }

    circle(cx, cy, r, cls) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      el.setAttribute('cx', cx);
      el.setAttribute('cy', cy);
      el.setAttribute('r', r);
      el.setAttribute('class', cls);
      this.svg.appendChild(el);
    }

    /* ---------- Floating particles ---------- */
    spawnParticles(W, H) {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const x = 0.1 + Math.random() * 0.8;
        const y = 0.15 + Math.random() * 0.7;
        const cx = W * x;
        const cy = H * y;
        const r  = 1 + Math.random() * 1.5;

        const el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        el.setAttribute('cx', cx);
        el.setAttribute('cy', cy);
        el.setAttribute('r', r);
        el.setAttribute('class', 'neural-particle');
        const dx = (Math.random() - 0.5) * 60;
        const dy = -(20 + Math.random() * 50);
        el.style.setProperty('--dx', `${dx}px`);
        el.style.setProperty('--dy', `${dy}px`);
        el.style.animationDelay = `${-Math.random() * 12}s`;
        this.svg.appendChild(el);
      }
    }
  }

  /* ==========================================================
     INITIALIZE MOUNTAIN MESH
     ========================================================== */
  const container = document.getElementById('mountain-container');
  if (container) new MountainMesh(container);

  /* ==========================================================
     HEADER SCROLL BEHAVIOR
     ========================================================== */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = sy;
  }, { passive: true });

  /* ==========================================================
     MOBILE MENU TOGGLE
     ========================================================== */
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      // Animate hamburger
      const spans = toggleBtn.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(3px, 3px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(3px, -3px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        const spans = toggleBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      });
    });
  }

  /* ==========================================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ==========================================================
     INTERSECTION OBSERVER FOR FUTURE SECTIONS
     ========================================================== */
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
      { threshold: 0.15 }
    );
    document.querySelectorAll('.observe').forEach((el) => observer.observe(el));
  }

});