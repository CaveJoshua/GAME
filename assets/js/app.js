/**
 * JOSHUA CAVE - RESUME & PORTFOLIO ENGINE
 * Handles dynamic rendering, filters, theme transitions, and live state synchronization.
 */

// SVG Icon Library
const icons = {
  server: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
  layout: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
  cpu: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  shield: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
  cloud: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
  award: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
  graduationCap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>`,
  external: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  github: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  copy: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  check: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`,
  mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  mapPin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  printer: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`
};

/* ==============================================================
   STATE MANAGEMENT ENGINE (Rule Compliant Live State Sync)
   ============================================================== */
const state = {
  theme: localStorage.getItem('jc_theme') || 'dark',
  accent: localStorage.getItem('jc_accent') || 'cyan',
  density: localStorage.getItem('jc_density') || 'standard',
  filter: 'all'
};

/**
 * Dynamically updates live application styles and elements in real time.
 * Never requires a reload or restart.
 */
function applyState(partialState = {}) {
  Object.assign(state, partialState);

  // Update HTML root attributes
  const root = document.documentElement;
  root.setAttribute('data-theme', state.theme);
  root.setAttribute('data-accent', state.accent);
  root.setAttribute('data-density', state.density);

  // Persist settings
  localStorage.setItem('jc_theme', state.theme);
  localStorage.setItem('jc_accent', state.accent);
  localStorage.setItem('jc_density', state.density);

  // Synchronize Customizer Drawer UI
  updateDrawerControls();

  // Update Quick Theme Toggle icon in navbar
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = state.theme === 'light' ? icons.moon : icons.sun;
    themeToggleBtn.setAttribute('title', `Switch to ${state.theme === 'light' ? 'Dark' : 'Light'} Mode`);
  }
}

function updateDrawerControls() {
  // Sync Theme buttons
  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.setTheme === state.theme);
  });

  // Sync Accent buttons
  document.querySelectorAll('[data-set-accent]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.setAccent === state.accent);
  });

  // Sync Density buttons
  document.querySelectorAll('[data-set-density]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.setDensity === state.density);
  });
}

/* ==============================================================
   DOM POPULATION / RENDERING
   ============================================================== */
function renderProfile() {
  const p = resumeData.profile;
  document.querySelectorAll('.js-profile-name').forEach(el => el.textContent = p.name);
  document.querySelectorAll('.js-profile-title').forEach(el => el.textContent = p.title);
  document.querySelectorAll('.js-profile-bio').forEach(el => el.textContent = p.bio);
  document.querySelectorAll('.js-profile-email').forEach(el => el.textContent = p.email);
  document.querySelectorAll('.js-profile-location').forEach(el => el.textContent = p.location);

  const statusEl = document.getElementById('hero-status-text');
  if (statusEl) statusEl.textContent = p.statusText;

  // Social Links
  const githubLinks = document.querySelectorAll('.js-github-link');
  githubLinks.forEach(el => el.href = p.github);

  const linkedinLinks = document.querySelectorAll('.js-linkedin-link');
  linkedinLinks.forEach(el => el.href = p.linkedin);

  // Metrics Bar
  const metricsContainer = document.getElementById('metrics-container');
  if (metricsContainer) {
    metricsContainer.innerHTML = resumeData.stats.map(s => `
      <div class="metric-item">
        <div class="metric-val">${s.value}</div>
        <div class="metric-label">${s.label}</div>
      </div>
    `).join('');
  }
}

function renderPillars() {
  const container = document.getElementById('pillars-container');
  if (!container) return;

  container.innerHTML = resumeData.pillars.map(p => `
    <div class="pillar-card">
      <div class="pillar-icon">${icons[p.icon] || icons.shield}</div>
      <h3 class="pillar-title">${p.title}</h3>
      <p class="pillar-desc">${p.desc}</p>
    </div>
  `).join('');
}

function renderExperience() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = resumeData.experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${exp.role}</h3>
            <span class="timeline-company">${exp.company}</span> • <span class="timeline-location">${exp.location}</span>
          </div>
          <span class="timeline-date">${exp.period}</span>
        </div>
        <ul class="timeline-bullets">
          ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
        <div class="timeline-tags">
          ${exp.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderProjects(filter = 'all') {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const filtered = filter === 'all' 
    ? resumeData.projects 
    : resumeData.projects.filter(p => p.category === filter);

  container.innerHTML = filtered.map(p => `
    <div class="project-card ${p.featured ? 'featured' : ''}" data-category="${p.category}">
      <div class="project-body">
        <span class="project-category">${p.categoryLabel}</span>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-meta">
          <div class="project-tags">
            ${p.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            ${p.internalDemo ? `
              <a href="${p.demoUrl}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">
                ${icons.play} Launch Terminal Demo
              </a>
            ` : `
              <a href="${p.demoUrl}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">
                ${icons.external} Live View
              </a>
            `}
            <a href="${p.sourceUrl}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener">
              ${icons.github} Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = resumeData.skills.map(cat => `
    <div class="skill-category-card">
      <div class="category-header">
        <div class="category-icon">${icons[cat.icon] || icons.code}</div>
        <h3 class="category-name">${cat.category}</h3>
      </div>
      <div class="skill-items-list">
        ${cat.items.map(s => `
          <div class="skill-row">
            <div class="skill-info">
              <span>${s.name}</span>
              <span class="skill-pct">${s.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-bar-fill" style="width: ${s.level}%"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function renderEducationAndCerts() {
  const container = document.getElementById('credentials-container');
  if (!container) return;

  container.innerHTML = resumeData.educationAndCerts.map(c => `
    <div class="credential-card">
      <div class="credential-icon">${c.type === 'education' ? icons.graduationCap : icons.award}</div>
      <div>
        <h3 class="credential-title">${c.title}</h3>
        <div class="credential-issuer">${c.issuer}</div>
        <div class="credential-meta">${c.period}</div>
        <p class="pillar-desc" style="margin-top: 0.5rem; font-size: 0.88rem;">${c.desc}</p>
      </div>
    </div>
  `).join('');
}

/* ==============================================================
   INTERACTIONS & EVENT HANDLERS
   ============================================================== */
function setupInteractions() {
  // 1. Navigation Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 2. Project Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filter = btn.dataset.filter;
      renderProjects(state.filter);
    });
  });

  // 3. Quick Theme Toggle Button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyState({ theme: nextTheme });
      showToast(`Switched to ${nextTheme.charAt(0).toUpperCase() + nextTheme.slice(1)} Mode`);
    });
  }

  // 4. Customizer Drawer Toggle
  const openDrawerBtn = document.getElementById('open-settings-btn');
  const closeDrawerBtn = document.getElementById('close-settings-btn');
  const drawerBackdrop = document.getElementById('settings-backdrop');

  if (openDrawerBtn && drawerBackdrop) {
    openDrawerBtn.addEventListener('click', () => drawerBackdrop.classList.add('active'));
  }

  if (closeDrawerBtn && drawerBackdrop) {
    closeDrawerBtn.addEventListener('click', () => drawerBackdrop.classList.remove('active'));
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', (e) => {
      if (e.target === drawerBackdrop) {
        drawerBackdrop.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawerBackdrop && drawerBackdrop.classList.contains('active')) {
      drawerBackdrop.classList.remove('active');
    }
  });

  // 5. Drawer Controls Click Listeners (Theme, Accent, Density)
  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyState({ theme: btn.dataset.setTheme });
    });
  });

  document.querySelectorAll('[data-set-accent]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyState({ accent: btn.dataset.setAccent });
      showToast(`Accent updated to ${btn.dataset.setAccent.toUpperCase()}`);
    });
  });

  document.querySelectorAll('[data-set-density]').forEach(btn => {
    btn.addEventListener('click', () => {
      applyState({ density: btn.dataset.setDensity });
      showToast(`Layout density: ${btn.dataset.setDensity.toUpperCase()}`);
    });
  });

  // 6. Print Button Handler
  document.querySelectorAll('.js-print-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.print();
    });
  });

  // 7. Copy Email Button
  function copyTextToClipboard(text, btn) {
    function onSuccess() {
      showToast('Email address copied to clipboard!');
      btn.innerHTML = `${icons.check} Copied!`;
      setTimeout(() => {
        btn.innerHTML = `${icons.copy} Copy`;
      }, 2500);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(() => {
        fallback();
      });
    } else {
      fallback();
    }

    function fallback() {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        tempInput.style.position = 'fixed';
        tempInput.style.opacity = '0';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        const success = document.execCommand('copy');
        document.body.removeChild(tempInput);
        if (success) {
          onSuccess();
        } else {
          showToast('Email: ' + text);
        }
      } catch (err) {
        showToast('Email: ' + text);
      }
    }
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyTextToClipboard(resumeData.profile.email, copyEmailBtn);
    });
  }

  // 8. Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const subject = encodeURIComponent(`Inquiry from ${name} via Resume Portfolio`);
      const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
      window.location.href = `mailto:${resumeData.profile.email}?subject=${subject}&body=${body}`;

      showToast('Thank you! Opening your email client...');
      contactForm.reset();
    });
  }
}

/**
 * Toast Notification system
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('app-toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==============================================================
   INITIALIZATION
   ============================================================== */
function initApp() {
  renderProfile();
  renderPillars();
  renderExperience();
  renderProjects('all');
  renderSkills();
  renderEducationAndCerts();

  setupInteractions();
  applyState(); // Initialize with persisted or default state
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

