/**
 * Hotel Patliputra Continental - Lightbox & Modal Manager
 */

const GalleryModal = {
  init() {
    this.createLightboxElements();
    this.bindEvents();
  },

  createLightboxElements() {
    if (document.getElementById('lightbox-modal')) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal';
    lightbox.innerHTML = `
      <button class="lightbox-close-btn" id="lightbox-close" aria-label="Close Lightbox">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div class="lightbox-img-wrapper">
        <img id="lightbox-img" src="" alt="Patliputra Continental Luxury Gallery">
        <div id="lightbox-caption" class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);
  },

  openLightbox(src, caption = 'Hotel Patliputra Continental') {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');

    if (modal && img) {
      img.src = src;
      captionEl.textContent = caption;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('#lightbox-close') || (e.target.classList.contains('lightbox-modal'))) {
        this.closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeLightbox();
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.GalleryModal = GalleryModal;
}
