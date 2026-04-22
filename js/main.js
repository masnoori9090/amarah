/* Amarah — interactions */
(() => {
  'use strict';

  /* ================================================================
     NAV — scroll state + mobile toggle
  ================================================================ */
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');

  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 48) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    document.querySelectorAll('.nav__mobile a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', e => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ================================================================
     REVEAL ON SCROLL — fade + translateY on intersection
  ================================================================ */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: reveal everything immediately
    revealEls.forEach(el => el.classList.add('is-revealed'));
  }

  /* ================================================================
     PROJECTS — horizontal scroll on desktop
  ================================================================ */
  const projectsOuter = document.querySelector('.projects-scroll-section');
  const projectsRail  = document.querySelector('.projects-rail');

  const isMobile = () => window.innerWidth <= 1024;

  const updateProjectsScroll = () => {
    if (!projectsOuter || !projectsRail) return;
    if (isMobile()) {
      projectsRail.style.transform = '';
      return;
    }
    const rect = projectsOuter.getBoundingClientRect();
    const scrollable = projectsOuter.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
    const maxTranslate = projectsRail.scrollWidth - window.innerWidth;
    if (maxTranslate <= 0) return;
    projectsRail.style.transform = `translateX(${-maxTranslate * progress}px)`;
  };

  window.addEventListener('scroll', updateProjectsScroll, { passive: true });
  window.addEventListener('resize', updateProjectsScroll);
  updateProjectsScroll();

  /* ================================================================
     GALLERY LIGHTBOX
  ================================================================ */
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = lightbox && lightbox.querySelector('.lightbox__img');
  const galleryItems = [...document.querySelectorAll('.gallery__item')];

  let currentIndex = -1;

  const openLightbox = (index) => {
    if (!lightbox || !lightboxImg || !galleryItems[index]) return;
    currentIndex = index;
    const item = galleryItems[index];
    const src  = item.getAttribute('href') || item.querySelector('img').src;
    const alt  = item.querySelector('img').getAttribute('alt') || '';
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox__close').focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    if (currentIndex !== -1) {
      galleryItems[currentIndex].focus();
    }
    currentIndex = -1;
    // Clear src after transition to avoid flicker
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 200);
  };

  const navigateLightbox = (dir) => {
    if (currentIndex === -1 || !galleryItems.length) return;
    openLightbox((currentIndex + dir + galleryItems.length) % galleryItems.length);
  };

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', e => {
      e.preventDefault();
      openLightbox(i);
    });
    // Keyboard: Enter or Space on focused gallery item
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  lightbox && lightbox.querySelector('.lightbox__backdrop')
    .addEventListener('click', closeLightbox);
  lightbox && lightbox.querySelector('.lightbox__close')
    .addEventListener('click', closeLightbox);
  lightbox && lightbox.querySelector('.lightbox__prev')
    .addEventListener('click', () => navigateLightbox(-1));
  lightbox && lightbox.querySelector('.lightbox__next')
    .addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', e => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigateLightbox(-1);
    if (e.key === 'ArrowRight')  navigateLightbox(1);
  });

  /* ================================================================
     PROPERTY SEARCH FILTERS
  ================================================================ */
  const filterItems = [...document.querySelectorAll('.filter-item')];

  const closeAllFilters = (except = null) => {
    filterItems.forEach(item => {
      if (item === except) return;
      item.classList.remove('is-open');
      const btn = item.querySelector('.filter-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  filterItems.forEach(item => {
    const btn      = item.querySelector('.filter-btn');
    const dropdown = item.querySelector('.filter-dropdown');
    if (!btn || !dropdown) return;

    // Toggle dropdown on button click
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = item.classList.contains('is-open');
      closeAllFilters();
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });

    // Select option from dropdown
    dropdown.querySelectorAll('li').forEach(option => {
      option.addEventListener('click', () => {
        const label = option.textContent.trim();
        const valueEl = btn.querySelector('.filter-value');
        if (valueEl) valueEl.textContent = label;

        // Mark selected
        dropdown.querySelectorAll('li').forEach(o => o.classList.remove('is-selected'));
        option.classList.add('is-selected');

        // Close dropdown
        item.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');

        // Return focus to button
        btn.focus();
      });

      // Keyboard: Enter or Space to select
      option.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          option.click();
        }
      });
    });
  });

  // Close all filters on outside click or ESC
  document.addEventListener('click', () => closeAllFilters());
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllFilters();
  });

  // Search button — scroll to contact / filter results
  const filterSearchBtn = document.querySelector('.filter-search-btn');
  if (filterSearchBtn) {
    filterSearchBtn.addEventListener('click', () => {
      closeAllFilters();
      // Collect current filter values
      const selections = {};
      filterItems.forEach(item => {
        const key = item.dataset.filter;
        const selected = item.querySelector('.filter-dropdown li.is-selected');
        selections[key] = selected ? selected.dataset.value : '';
      });

      // Update the contact form's project select to match chosen project
      const projectSelect = document.getElementById('project');
      if (projectSelect && selections.project) {
        const projectMap = {
          'maison-liwa':    'Maison Liwa',
          'serai-tower':    'Serai Tower',
          'dar-amarah':     'Dar Amarah',
          'noor-courtyards':'Noor Courtyards',
          'rayan-estates':  'Rayan Estates',
        };
        const projectName = projectMap[selections.project];
        if (projectName) {
          [...projectSelect.options].forEach(opt => {
            opt.selected = opt.text === projectName;
          });
        }
      }

      // Update budget select
      const budgetSelect = document.getElementById('budget');
      if (budgetSelect && selections.budget) {
        const budgetMap = {
          'under-5m': 'Under AED 5M',
          '5-10m':    'AED 5M – 10M',
          '10-25m':   'AED 10M – 25M',
          '25-50m':   'AED 25M – 50M',
          '50m':      'AED 50M+',
          'discuss':  'Prefer to discuss',
        };
        const budgetName = budgetMap[selections.budget];
        if (budgetName) {
          [...budgetSelect.options].forEach(opt => {
            opt.selected = opt.text === budgetName;
          });
        }
      }

      // Scroll to contact section
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ================================================================
     CONTACT FORM
  ================================================================ */
  const form          = document.getElementById('enquiry-form');
  const submitBtn     = form && form.querySelector('.contact__submit');
  const submitText    = submitBtn && submitBtn.querySelector('.contact__submit-text');
  const errorMsg      = form && form.querySelector('.contact__error');
  const successPanel  = document.getElementById('contact-success');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      // Basic client-side check
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
      }
      if (submitText) submitText.textContent = 'Sending…';
      if (errorMsg)   errorMsg.hidden = true;

      // Simulated submission (replace with real fetch in production)
      await new Promise(r => setTimeout(r, 1400));

      // Show success
      form.hidden = true;
      if (successPanel) successPanel.hidden = false;
    });
  }

  /* ================================================================
     FOOTER — current year
  ================================================================ */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
