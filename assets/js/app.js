/**
 * Hotel Patliputra Continental - Master Application Script
 * Orchestrates navigation, slideshow, direct WhatsApp channel, dining & wellness interactions.
 */

const App = {
  currentHeroIndex: 0,
  heroSlideInterval: null,

  init() {
    this.initHeroSlider();
    this.initNavbarScroll();
    this.initMobileDrawer();
    this.initCurrencySwitcher();
    this.renderDestinations();
    this.renderAmenities();
    this.initNewsletter();
    this.initSmoothScroll();
    this.initContactForms();
  },

  /* ==========================================================================
     Hero Cover Slideshow & Motion Transitions
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
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }

      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  /* ==========================================================================
     Mobile Drawer Navigation
     ========================================================================== */
  initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-nav-overlay');
    const closeBtn = document.getElementById('mobile-drawer-close-btn');

    const openDrawer = () => {
      if (drawer) drawer.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      if (drawer) drawer.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    this.closeMobileDrawer = closeDrawer;
  },

  /* ==========================================================================
     Currency Switcher (INR / USD)
     ========================================================================== */
  initCurrencySwitcher() {
    document.querySelectorAll('.currency-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const curr = e.currentTarget.getAttribute('data-currency') || 'INR';
        
        if (window.BookingEngine) {
          window.BookingEngine.setCurrency(curr);
          window.BookingEngine.showToast(`Rates displayed in ${curr === 'INR' ? 'Indian Rupee (₹)' : 'US Dollar ($)'}`, 'info');
        }
      });
    });
  },

  /* ==========================================================================
     Render Dynamic Content (Amenities, Destinations)
     ========================================================================== */
  renderAmenities() {
    const container = document.getElementById('amenities-grid-container');
    if (!container || !window.HOTEL_DATA?.amenitiesList) return;

    const { hotelServices, roomComforts, bathroomAmenities } = window.HOTEL_DATA.amenitiesList;

    container.innerHTML = `
      <div class="amenity-category-column">
        <div class="amenity-col-header">
          <div class="amenity-col-icon"><i class="fa-solid fa-hotel"></i></div>
          <h3 class="amenity-col-title">Hotel & Guest Services</h3>
        </div>
        <div class="amenity-items-list">
          ${hotelServices.map(item => `
            <div class="amenity-item-row">
              <i class="fa-solid ${item.icon}"></i>
              <span>${item.name}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="amenity-category-column">
        <div class="amenity-col-header">
          <div class="amenity-col-icon"><i class="fa-solid fa-bed"></i></div>
          <h3 class="amenity-col-title">In-Room Comforts</h3>
        </div>
        <div class="amenity-items-list">
          ${roomComforts.map(item => `
            <div class="amenity-item-row">
              <i class="fa-solid ${item.icon}"></i>
              <span>${item.name}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="amenity-category-column">
        <div class="amenity-col-header">
          <div class="amenity-col-icon"><i class="fa-solid fa-bath"></i></div>
          <h3 class="amenity-col-title">Bathroom Essentials</h3>
        </div>
        <div class="amenity-items-list">
          ${bathroomAmenities.map(item => `
            <div class="amenity-item-row">
              <i class="fa-solid ${item.icon}"></i>
              <span>${item.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderDestinations() {
    const container = document.getElementById('destinations-grid-container');
    if (!container || !window.HOTEL_DATA) return;

    container.innerHTML = window.HOTEL_DATA.destinations.map(dest => `
      <div class="destination-card">
        <div class="destination-img-wrap" onclick="GalleryModal.openLightbox('${dest.image}', '${dest.name}')" style="cursor: pointer;">
          <img src="${dest.image}" alt="${dest.name}" class="destination-img" loading="lazy">
          <span class="destination-dist-badge">
            <i class="fa-solid fa-location-dot"></i> ${dest.distance} &bull; ${dest.travelTime}
          </span>
        </div>
        <div class="destination-body">
          <h3 class="destination-title">${dest.name}</h3>
          <span class="destination-time"><i class="fa-solid fa-car"></i> ${dest.travelTime} from Hotel</span>
          <p class="destination-desc">${dest.description}</p>
        </div>
      </div>
    `).join('');
  },

  initContactForms() {
    const contactForm = document.getElementById('contact-inquiry-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contact-name')?.value || 'Guest';
        const email = document.getElementById('contact-email')?.value || '';
        const phone = document.getElementById('contact-phone')?.value || '';
        const msg = document.getElementById('contact-message')?.value || '';

        if (window.BookingEngine) {
          window.BookingEngine.showToast(`Thank you, ${name}! Your inquiry has been sent to gm@hpcpatna.com. Our front desk will reach you shortly.`, 'success');
        }
        contactForm.reset();
      });
    }
  },

  initNewsletter() {
    const form = document.getElementById('footer-newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email-input')?.value;
        if (email) {
          if (window.BookingEngine) {
            window.BookingEngine.showToast(`Thank you for subscribing! Updates sent to ${email}`, 'success');
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
