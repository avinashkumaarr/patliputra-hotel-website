/**
 * Hotel Patliputra Continental - Main Application Orchestrator
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  currentHeroIndex: 0,
  heroSlideInterval: null,

  init() {
    this.initHeroSlider();
    this.initNavbarScroll();
    this.initMobileDrawer();
    this.initCurrencySwitcher();
    this.renderDestinations();
    this.renderOffers();
    this.renderTestimonials();
    this.initNewsletter();
    this.initSmoothScroll();

    // Initialize Submodules
    if (window.GalleryModal) window.GalleryModal.init();
    if (window.BookingEngine) window.BookingEngine.init();
    if (window.DiningModule) window.DiningModule.init();
    if (window.BanquetModule) window.BanquetModule.init();
    if (window.SpaModule) window.SpaModule.bindEvents();

    console.log("Hotel Patliputra Continental Luxury 5-Star Portal Initialized.");
  },

  /* ==========================================================================
     Hero Slideshow Logic
     ========================================================================== */
  initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.querySelector('.hero-prev');
    const nextBtn = document.querySelector('.hero-next');

    if (!slides.length) return;

    const showSlide = (index) => {
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      this.currentHeroIndex = index;
    };

    const nextSlide = () => {
      const nextIdx = (this.currentHeroIndex + 1) % slides.length;
      showSlide(nextIdx);
    };

    const prevSlide = () => {
      const prevIdx = (this.currentHeroIndex - 1 + slides.length) % slides.length;
      showSlide(prevIdx);
    };

    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      this.resetHeroTimer();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      this.resetHeroTimer();
    });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        this.resetHeroTimer();
      });
    });

    this.heroSlideInterval = setInterval(nextSlide, 6500);
  },

  resetHeroTimer() {
    clearInterval(this.heroSlideInterval);
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length) {
      this.heroSlideInterval = setInterval(() => {
        const nextIdx = (this.currentHeroIndex + 1) % slides.length;
        document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === nextIdx));
        document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === nextIdx));
        this.currentHeroIndex = nextIdx;
      }, 6500);
    }
  },

  /* ==========================================================================
     Navbar Scroll & Scrollspy
     ========================================================================== */
  initNavbarScroll() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Active Section Scrollspy
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset + 120;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
          if (navLink) navLink.classList.add('active');
        }
      });
    });
  },

  /* ==========================================================================
     Mobile Drawer Toggle
     ========================================================================== */
  initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-menu-toggle-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const closeBtn = document.getElementById('mobile-drawer-close-btn');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        drawer.classList.add('active');
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('active');
      });
    }

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (drawer) drawer.classList.remove('active');
      });
    });
  },

  /* ==========================================================================
     Currency Switcher
     ========================================================================== */
  initCurrencySwitcher() {
    document.querySelectorAll('.currency-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const curr = e.currentTarget.getAttribute('data-currency') || 'INR';
        
        if (window.BookingEngine) {
          window.BookingEngine.setCurrency(curr);
          window.BookingEngine.showToast(`Currency converted to ${curr === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}`, 'info');
        }
      });
    });
  },

  /* ==========================================================================
     Render Dynamic Content (Destinations, Offers, Reviews)
     ========================================================================== */
  renderDestinations() {
    const container = document.getElementById('destinations-grid-container');
    if (!container || !window.HOTEL_DATA) return;

    container.innerHTML = window.HOTEL_DATA.destinations.map(dest => `
      <div class="destination-card">
        <div class="destination-img-wrap" onclick="GalleryModal.openLightbox('${dest.image}', '${dest.name}')" style="cursor: pointer;">
          <img src="${dest.image}" alt="${dest.name}" class="destination-img" loading="lazy">
          <span class="destination-distance-badge">
            <i class="fa-solid fa-location-dot" style="color: var(--color-primary-gold);"></i> ${dest.distance} (${dest.travelTime})
          </span>
        </div>
        <div class="destination-card-body">
          <h3 class="destination-name">${dest.name}</h3>
          <p class="destination-desc">${dest.description}</p>
        </div>
      </div>
    `).join('');
  },

  renderOffers() {
    const container = document.getElementById('offers-grid-container');
    if (!container || !window.HOTEL_DATA) return;

    container.innerHTML = window.HOTEL_DATA.specialOffers.map(offer => `
      <div class="offer-card">
        <div>
          <span class="offer-badge">${offer.badge}</span>
          <h3 class="offer-title">${offer.title}</h3>
          <p class="offer-desc">${offer.description}</p>
        </div>

        <div>
          <div class="offer-code-box">
            <span style="font-size: 0.8rem; color: var(--color-text-light-muted);">Use Promo Code:</span>
            <span class="offer-code-val">${offer.code}</span>
          </div>

          <button class="btn btn-gold w-100" onclick="App.applyOfferCode('${offer.code}')" style="width: 100%;">
            <i class="fa-solid fa-bolt"></i> Claim Offer Now
          </button>
        </div>
      </div>
    `).join('');
  },

  applyOfferCode(code) {
    if (window.BookingEngine) {
      window.BookingEngine.state.promoCode = code;
      window.BookingEngine.applyPromoCode();
      document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  },

  renderTestimonials() {
    const container = document.getElementById('testimonials-grid-container');
    if (!container || !window.HOTEL_DATA) return;

    container.innerHTML = window.HOTEL_DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <div>
          <div class="testimonial-quote-icon"><i class="fa-solid fa-quote-left"></i></div>
          <div class="star-rating mb-2">
            ${Array(t.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
          </div>
          <h4 class="testimonial-title">${t.title}</h4>
          <p class="testimonial-comment">"${t.comment}"</p>
        </div>

        <div class="testimonial-author-row">
          <img src="${t.avatar}" alt="${t.guestName}" class="testimonial-avatar">
          <div>
            <div class="testimonial-author-name">${t.guestName}</div>
            <div class="testimonial-author-role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join('');
  },

  initNewsletter() {
    const form = document.getElementById('footer-newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email-input')?.value;
        if (email) {
          if (window.BookingEngine) {
            window.BookingEngine.showToast(`Thank you for subscribing! Exclusive 5-star offers sent to ${email}`, 'success');
          }
          form.reset();
        }
      });
    }
  },

  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
};

if (typeof window !== 'undefined') {
  window.App = App;
}
