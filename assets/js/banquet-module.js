/**
 * Hotel Patliputra Continental - Meetings, Banquets & Grand Events Module
 */

const BanquetModule = {
  state: {
    selectedHallId: 'ashoka-ballroom',
    eventType: 'Wedding',
    guestCount: 200,
    cateringType: 'royal_buffet' // 'standard_buffet', 'royal_buffet', 'premium_cocktail'
  },

  init() {
    this.bindEvents();
    this.calculateEstimate();
  },

  openHallDetails(hallId) {
    const hall = window.HOTEL_DATA.banquets.find(b => b.id === hallId);
    if (!hall) return;

    const modal = document.getElementById('banquet-details-modal');
    const modalBody = document.getElementById('banquet-details-content');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="mb-3">
        <span class="badge-gold">${hall.type}</span>
        <h2 class="mt-2 mb-1">${hall.name}</h2>
        <p class="lead" style="color: var(--color-text-muted);">${hall.idealFor}</p>
      </div>

      <div class="mb-4" style="height: 320px; border-radius: var(--radius-md); overflow: hidden;">
        <img src="${hall.image}" alt="${hall.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div class="banquet-specs-grid mb-4">
        <div>
          <span class="banquet-spec-label">Total Floor Area</span>
          <div class="banquet-spec-val">${hall.areaSqFt} Sq Ft</div>
        </div>
        <div>
          <span class="banquet-spec-label">Dimensions & Height</span>
          <div class="banquet-spec-val">${hall.dimensions}</div>
        </div>
        <div>
          <span class="banquet-spec-label">Max Guest Capacity</span>
          <div class="banquet-spec-val">${hall.maxCapacity} Guests</div>
        </div>
      </div>

      <div class="mb-4">
        <h4>About The Venue</h4>
        <p style="color: var(--color-text-muted);">${hall.description}</p>
      </div>

      <div class="mb-4">
        <h4>Seating Capacity Configurations</h4>
        <div style="background: var(--color-surface-warm); border-radius: var(--radius-md); padding: 18px; border: 1px solid var(--color-border-solid);">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; text-align: center;">
            <div style="background: #fff; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-solid);">
              <i class="fa-solid fa-users" style="color: var(--color-primary-gold); margin-bottom: 4px;"></i>
              <div style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">Theatre</div>
              <strong style="font-size: 1.1rem; color: var(--color-text-main);">${hall.seatingCapacities.theatre || 'N/A'}</strong>
            </div>

            <div style="background: #fff; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-solid);">
              <i class="fa-solid fa-circle-nodes" style="color: var(--color-primary-gold); margin-bottom: 4px;"></i>
              <div style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">Circular Banquet</div>
              <strong style="font-size: 1.1rem; color: var(--color-text-main);">${hall.seatingCapacities.circularBanquet || 'N/A'}</strong>
            </div>

            <div style="background: #fff; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-solid);">
              <i class="fa-solid fa-chart-column" style="color: var(--color-primary-gold); margin-bottom: 4px;"></i>
              <div style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">U-Shape</div>
              <strong style="font-size: 1.1rem; color: var(--color-text-main);">${hall.seatingCapacities.uShape || 'N/A'}</strong>
            </div>

            <div style="background: #fff; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-solid);">
              <i class="fa-solid fa-briefcase" style="color: var(--color-primary-gold); margin-bottom: 4px;"></i>
              <div style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">Boardroom</div>
              <strong style="font-size: 1.1rem; color: var(--color-text-main);">${hall.seatingCapacities.boardroom || 'N/A'}</strong>
            </div>

            <div style="background: #fff; padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-solid);">
              <i class="fa-solid fa-champagne-glasses" style="color: var(--color-primary-gold); margin-bottom: 4px;"></i>
              <div style="font-size: 0.72rem; color: var(--color-text-muted); text-transform: uppercase;">Reception</div>
              <strong style="font-size: 1.1rem; color: var(--color-text-main);">${hall.seatingCapacities.reception || 'N/A'}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h4>Included Venue Features</h4>
        <div class="room-amenities-matrix">
          ${hall.features.map(f => `
            <div class="room-amenity-entry">
              <i class="fa-solid fa-circle-check"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="text-center pt-3" style="border-top: 1px solid var(--color-border-solid);">
        <button class="btn btn-gold btn-lg" onclick="BanquetModule.openQuoteModal('${hall.id}')">
          <i class="fa-solid fa-file-invoice"></i> Request Personalized Quote for ${hall.name}
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  openQuoteModal(hallId = 'ashoka-ballroom') {
    BookingEngine.closeModal('banquet-details-modal');

    const modal = document.getElementById('banquet-quote-modal');
    const venueSelect = document.getElementById('rfq-venue-select');

    if (venueSelect) {
      venueSelect.value = hallId;
    }

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.calculateEstimate();
    }
  },

  calculateEstimate() {
    const venueSelect = document.getElementById('rfq-venue-select');
    const guestInput = document.getElementById('rfq-guests-input');
    const cateringSelect = document.getElementById('rfq-catering-select');
    const estimateValEl = document.getElementById('rfq-estimate-value');

    const hallId = venueSelect ? venueSelect.value : 'ashoka-ballroom';
    const guests = guestInput ? parseInt(guestInput.value) || 100 : 100;
    const catering = cateringSelect ? cateringSelect.value : 'royal_buffet';

    let venueRental = 45000;
    if (hallId === 'ashoka-ballroom') venueRental = 95000;
    else if (hallId === 'mandap-hall') venueRental = 65000;
    else if (hallId === 'mehfil-hall') venueRental = 55000;
    else if (hallId === 'diamond-boardroom') venueRental = 25000;

    let perPlate = 1400;
    if (catering === 'royal_buffet') perPlate = 1850;
    else if (catering === 'premium_cocktail') perPlate = 2200;

    const totalEstimated = venueRental + (perPlate * guests);

    if (estimateValEl) {
      estimateValEl.textContent = BookingEngine.formatPrice(totalEstimated);
    }
  },

  submitQuoteRequest(e) {
    e.preventDefault();
    const venue = document.getElementById('rfq-venue-select')?.value || 'Ashoka Ballroom';
    const name = document.getElementById('rfq-name')?.value || 'Client';
    const email = document.getElementById('rfq-email')?.value || 'client@example.com';
    const guests = document.getElementById('rfq-guests-input')?.value || '150';
    const date = document.getElementById('rfq-date')?.value || 'Upcoming Date';

    BookingEngine.closeModal('banquet-quote-modal');

    BookingEngine.showToast(`Quote request submitted for ${venue}. Our Banquet Director will contact you at ${email}!`, 'success');
  },

  bindEvents() {
    const rfqForm = document.getElementById('banquet-rfq-form');
    if (rfqForm) {
      rfqForm.addEventListener('submit', (e) => this.submitQuoteRequest(e));
    }

    const venueSelect = document.getElementById('rfq-venue-select');
    const guestInput = document.getElementById('rfq-guests-input');
    const cateringSelect = document.getElementById('rfq-catering-select');

    if (venueSelect) venueSelect.addEventListener('change', () => this.calculateEstimate());
    if (guestInput) guestInput.addEventListener('input', () => this.calculateEstimate());
    if (cateringSelect) cateringSelect.addEventListener('change', () => this.calculateEstimate());
  }
};

if (typeof window !== 'undefined') {
  window.BanquetModule = BanquetModule;
}
