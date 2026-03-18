/**
 * Power Factor - Global JavaScript
 * Navigation, carousels, accordions, counters, scroll animations
 */

(function () {
  'use strict';

  // ----- Loader -----
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  });

  // ----- Sticky header -----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ----- Mobile nav -----
  const hamburger = document.querySelector('.hamburger');
  const navMobile = document.querySelector('.nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMobile.classList.toggle('open');
      document.body.style.overflow = navMobile.classList.contains('open') ? 'hidden' : '';
    });
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ----- Hero carousel (slide + fade transition) -----
  const heroSlides = document.querySelectorAll('.hero__slide');
  const heroDots = document.querySelectorAll('.hero__dot');
  const heroPrev = document.querySelector('.hero__arrow--prev');
  const heroNext = document.querySelector('.hero__arrow--next');
  if (heroSlides.length > 1) {
    let heroIndex = 0;
    const heroTotal = heroSlides.length;
    let heroBusy = false;
    function showHeroSlide(i) {
      const nextIndex = (i + heroTotal) % heroTotal;
      if (nextIndex === heroIndex || heroBusy) return;
      heroBusy = true;
      const currentSlide = heroSlides[heroIndex];
      currentSlide.classList.add('leaving');
      currentSlide.classList.remove('active');
      setTimeout(function () {
        currentSlide.classList.remove('leaving');
        heroIndex = nextIndex;
        heroSlides[heroIndex].classList.add('active');
        heroDots.forEach(function (d, idx) { d.classList.toggle('active', idx === heroIndex); });
        heroBusy = false;
      }, 400);
    }
    function next() { showHeroSlide(heroIndex + 1); }
    heroDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showHeroSlide(i); });
    });
    if (heroPrev) heroPrev.addEventListener('click', function () { showHeroSlide(heroIndex - 1); });
    if (heroNext) heroNext.addEventListener('click', next);
    setInterval(next, 5000);
  }

  // ----- Testimonials slider -----
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonials-dots button');
  if (testimonialSlides.length > 1 && testimonialDots.length) {
    let testimonialIndex = 0;
    const testimonialTotal = testimonialSlides.length;
    function showTestimonial(i) {
      testimonialIndex = (i + testimonialTotal) % testimonialTotal;
      testimonialSlides.forEach(function (s, idx) { s.classList.toggle('active', idx === testimonialIndex); });
      testimonialDots.forEach(function (d, idx) { d.classList.toggle('active', idx === testimonialIndex); });
    }
    testimonialDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { showTestimonial(i); });
    });
    setInterval(function () { showTestimonial(testimonialIndex + 1); }, 6000);
  }

  // ----- Animated counters -----
  const counterEls = document.querySelectorAll('[data-counter]');
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-counter-suffix') || '';
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(start + (target - start) * easeOut);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
  const observerCounters = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observerCounters.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  counterEls.forEach(function (el) { observerCounters.observe(el); });

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('.reveal');
  const observerReveal = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { observerReveal.observe(el); });

  // ----- Accordion (FAQ) -----
  document.querySelectorAll('.accordion-header').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  // ----- Tabs -----
  document.querySelectorAll('.tabs-header button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const container = this.closest('.tabs-container');
      if (!container) return;
      const index = Array.from(container.querySelectorAll('.tabs-header button')).indexOf(this);
      container.querySelectorAll('.tabs-header button').forEach(function (b) { b.classList.remove('active'); });
      container.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      container.querySelectorAll('.tab-pane')[index].classList.add('active');
    });
  });

  // ----- Project filter -----
  const filterButtons = document.querySelectorAll('.filter-bar button');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = this.getAttribute('data-filter') || 'all';
        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        projectCards.forEach(function (card) {
          const cat = card.getAttribute('data-category');
          const show = category === 'all' || cat === category;
          card.style.display = show ? '' : 'none';
          if (show) card.classList.add('reveal');
        });
      });
    });
  }

  // ----- Contact form (basic) -----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = contactForm.querySelector('[name="name"]').value.trim();
      var email = contactForm.querySelector('[name="email"]').value.trim();
      var message = contactForm.querySelector('[name="message"]').value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      alert('Thank you! We will get back to you soon.');
      contactForm.reset();
    });
  }

  // ----- Newsletter form -----
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = newsletterForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;
      alert('Thanks for subscribing!');
      newsletterForm.reset();
    });
  }
})();
