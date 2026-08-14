/**
 * Hotel Patliputra Continental - Meetings, Banquets & Grand Events Module
 * Handles official banquet hall specs (Marhaba, Mandap, Mehfil, Diamond) and RFQ quote submission.
 */

const BanquetModule = {
  state: {
    selectedHallId: 'marhaba',
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

      <div class="mb-4" style="height: 300px; border-radius: var(--radius-md); overflow: hidden;">
        <img src="${hall.image}" alt="${hall.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div class="banquet-specs-grid mb-4">
        <div>
          <span class="banquet-spec-label">Capacity</span>
          <div class="banquet-spec-val">Up to ${hall.maxCapacity} Guests</div>
        </div>
        <div>
          <span class="banquet-spec-label">Dimensions / Area</span>
          <div class="banquet-spec-val">${hall.dimensions || (hall.areaSqFt ? hall.areaSqFt + ' Sq Ft' : 'Grand Layout')}</div>
        </div>
        <div>
          <span class="banquet-spec-label">Ideal For</span>
          <div class="banquet-spec-val" style="font-size: 0.95rem;">${hall.idealFor.split(',')[0]}</div>
        </div>
      </div>

      <div class="mb-4">
        <h4>About The Venue</h4>
        <p style="color: var(--color-text-muted); line-height: 1.7;">${hall.description}</p>
      </div>

      <div class="mb-4">
        <h4>Included Venue Features</h4>
        <div class="room-amenities-matrix">
          ${hall.features.map(f => `
            <div class="room-amenity-entry">
              <i class="fa-solid fa-circle-check" style="color: var(--color-primary-gold);"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="text-center pt-3" style="border-top: 1px solid var(--color-border-solid); display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <button class="btn btn-gold btn-lg" onclick="BanquetModule.openQuoteModal('${hall.id}')">
          <i class="fa-solid fa-file-invoice"></i> Request a Quote for ${hall.name}
        </button>
        <a href="https://wa.me/919135551331?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20booking%20${encodeURIComponent(hall.name)}%20at%20Hotel%20Patliputra%20Continental." target="_blank" class="btn btn-outline-gold btn-lg">
          <i class="fa-brands fa-whatsapp"></i> Chat with Banquet Team
        </a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  openQuoteModal(hallId = 'marhaba') {
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

    const hallId = venueSelect ? venueSelect.value : 'marhaba';
    const guests = guestInput ? parseInt(guestInput.value) || 100 : 100;
    const catering = cateringSelect ? cateringSelect.value : 'royal_buffet';

    let venueRental = 45000;
    if (hallId === 'marhaba') venueRental = 85000;
    else if (hallId === 'mandap') venueRental = 60000;
    else if (hallId === 'mehfil') venueRental = 50000;
    else if (hallId === 'diamond') venueRental = 20000;

    let perPlate = 1400;
    if (catering === 'royal_buffet') perPlate = 1800;
    else if (catering === 'premium_cocktail') perPlate = 2200;

    const totalEstimated = venueRental + (perPlate * guests);

    if (estimateValEl) {
      estimateValEl.textContent = BookingEngine.formatPrice(totalEstimated);
    }
  },

  submitQuoteRequest(e) {
    e.preventDefault();
    const venue = document.getElementById('rfq-venue-select')?.value || 'Marhaba';
    const name = document.getElementById('rfq-name')?.value || 'Valued Client';
    const phone = document.getElementById('rfq-phone')?.value || '';
    const email = document.getElementById('rfq-email')?.value || '';
    const eventType = document.getElementById('rfq-event-type')?.value || 'Wedding';
    const guests = document.getElementById('rfq-guests-input')?.value || '150';
    const date = document.getElementById('rfq-date')?.value || 'Upcoming Date';
    const message = document.getElementById('rfq-message')?.value || '';

    BookingEngine.closeModal('banquet-quote-modal');

    // Display confirmation and give option to WhatsApp or Email Dy. GM S.M. Razi Anwar
    const subject = encodeURIComponent(`Event Inquiry: ${eventType} at ${venue} (${date})`);
    const body = encodeURIComponent(`Hello S.M. Razi Anwar,\n\nI would like to request an event quote for Hotel Patliputra Continental:\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email}\n- Event Type: ${eventType}\n- Preferred Venue: ${venue}\n- Date: ${date}\n- Expected Guests: ${guests}\n- Notes: ${message}\n\nThank you.`);

    BookingEngine.showToast(`Thank you ${name}! Your RFP has been routed to S.M. Razi Anwar (Dy. General Manager - dygm@hpcpatna.com).`, 'success');
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
