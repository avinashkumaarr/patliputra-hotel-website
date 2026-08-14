/**
 * Hotel Patliputra Continental - Luxury Booking Engine & Room Showcase Module
 */

const BookingEngine = {
  state: {
    checkInDate: '',
    checkOutDate: '',
    nights: 1,
    adults: 2,
    children: 0,
    rooms: 1,
    promoCode: '',
    discountPercent: 0,
    currency: 'INR', // 'INR' or 'USD'
    usdRate: 83.5,
    selectedCategory: 'all',
    activeRoomForDetails: null,
    cart: {
      room: null,
      ratePlan: 'room_only', // 'room_only' or 'breakfast'
      addOns: {
        airportTransfer: false, // ₹1,500
        candlelightDinner: false, // ₹2,500
        spaTherapy: false // ₹3,000
      }
    }
  },

  init() {
    this.initDates();
    this.renderRooms();
    this.bindEvents();
    this.renderGuestCountDisplay();
  },

  initDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const formatDate = (d) => d.toISOString().split('T')[0];

    this.state.checkInDate = formatDate(tomorrow);
    this.state.checkOutDate = formatDate(dayAfter);
    this.state.nights = 1;

    const checkInInput = document.getElementById('booking-checkin');
    const checkOutInput = document.getElementById('booking-checkout');

    if (checkInInput && checkOutInput) {
      checkInInput.value = this.state.checkInDate;
      checkOutInput.value = this.state.checkOutDate;
      checkInInput.min = formatDate(today);
      checkOutInput.min = this.state.checkInDate;
    }
  },

  formatPrice(inrAmount) {
    if (this.state.currency === 'USD') {
      const usdAmount = Math.round(inrAmount / this.state.usdRate);
      return `$ ${usdAmount.toLocaleString('en-US')}`;
    }
    return `₹ ${inrAmount.toLocaleString('en-IN')}`;
  },

  setCurrency(curr) {
    this.state.currency = curr;
    this.renderRooms();
    this.updateCartCalculation();
  },

  renderRooms(category = this.state.selectedCategory) {
    const container = document.getElementById('rooms-grid-container');
    if (!container || !window.HOTEL_DATA) return;

    this.state.selectedCategory = category;
    let filteredRooms = window.HOTEL_DATA.rooms;

    if (category !== 'all') {
      filteredRooms = window.HOTEL_DATA.rooms.filter(r => 
        r.category.toLowerCase().includes(category.toLowerCase()) || 
        (category === 'suites' && r.category.toLowerCase().includes('suite'))
      );
    }

    // Update active tab styling
    document.querySelectorAll('.room-filter-tabs .tab-btn').forEach(btn => {
      const text = btn.textContent.toLowerCase();
      if (category === 'all' && text.includes('all')) btn.classList.add('active');
      else if (category !== 'all' && text.includes(category.toLowerCase())) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    container.innerHTML = filteredRooms.map(room => `
      <div class="room-card" data-room-id="${room.id}">
        <div class="room-card-image-wrap" onclick="BookingEngine.openRoomDetails('${room.id}')">
          <img src="${room.image}" alt="${room.name}" class="room-card-image" loading="lazy">
          <span class="badge-gold room-card-badge">${room.badge}</span>
          <button class="room-gallery-trigger" onclick="event.stopPropagation(); GalleryModal.openLightbox('${room.image}', '${room.name}')">
            <i class="fa-solid fa-camera"></i> Photos
          </button>
        </div>

        <div class="room-card-body">
          <div class="room-card-header">
            <h3 class="room-title">${room.name}</h3>
            <p class="room-meta-sub" style="color: var(--color-text-muted); font-size: 0.88rem; margin: 4px 0 10px 0;">
              <strong>${room.sizeSqFt} sq ft</strong> &bull; ${room.bedType.split(' ')[0]} Bed &bull; Up to ${room.maxGuests} guests
            </p>
            <p class="room-tagline">${room.tagline}</p>
          </div>

          <div class="room-features-list">
            ${room.amenities.slice(0, 4).map(a => `
              <span class="room-feature-pill"><i class="fa-solid fa-circle-check"></i> ${a}</span>
            `).join('')}
          </div>

          <div class="room-card-footer">
            <div class="room-pricing">
              <span class="room-price-label">Official Starting Rate*</span>
              <span class="room-price-val">${this.formatPrice(room.basePriceINR)}</span>
              <span class="room-price-unit">per night (excl. taxes)</span>
            </div>

            <div class="room-card-actions">
              <button class="btn btn-outline-gold btn-sm" onclick="BookingEngine.openRoomDetails('${room.id}')">
                Explore Room &rarr;
              </button>
              <button class="btn btn-gold btn-sm" onclick="BookingEngine.selectRoomForBooking('${room.id}')">
                Check Availability &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  openRoomDetails(roomId) {
    const room = window.HOTEL_DATA.rooms.find(r => r.id === roomId);
    if (!room) return;

    this.state.activeRoomForDetails = room;
    const modal = document.getElementById('room-details-modal');
    const modalBody = document.getElementById('room-details-content');

    if (!modal || !modalBody) return;

    const basePriceFormatted = this.formatPrice(room.basePriceINR);
    const bfastPriceFormatted = this.formatPrice(room.basePriceINR + room.breakfastAddonINR);

    modalBody.innerHTML = `
      <div class="room-modal-hero mb-3">
        <div class="room-modal-main-img" style="height: 300px; border-radius: var(--radius-md); overflow: hidden; cursor: pointer;" onclick="GalleryModal.openLightbox('${room.image}', '${room.name}')">
          <img src="${room.image}" alt="${room.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      </div>

      <div style="background: var(--color-surface-warm); padding: 14px 20px; border-radius: var(--radius-sm); border: 1px solid var(--color-border-solid); display: flex; justify-content: space-around; text-align: center; margin-bottom: 20px;">
        <div>
          <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--color-text-muted); display: block; letter-spacing: 0.08em;">Room Size</span>
          <strong style="font-size: 1.1rem; color: var(--color-text-main);">${room.sizeSqFt} sq ft</strong>
        </div>
        <div style="border-left: 1px solid var(--color-border-solid); border-right: 1px solid var(--color-border-solid); padding: 0 20px;">
          <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--color-text-muted); display: block; letter-spacing: 0.08em;">Bedding</span>
          <strong style="font-size: 1.1rem; color: var(--color-text-main);">${room.bedType}</strong>
        </div>
        <div>
          <span style="font-size: 0.72rem; text-transform: uppercase; color: var(--color-text-muted); display: block; letter-spacing: 0.08em;">Occupancy</span>
          <strong style="font-size: 1.1rem; color: var(--color-text-main);">Up to ${room.maxGuests} Guests</strong>
        </div>
      </div>

      <div class="mb-4">
        <h4 style="font-size: 1.15rem; margin-bottom: 8px; color: var(--color-text-main);">Room Overview</h4>
        <p style="color: var(--color-text-muted); line-height: 1.7; font-size: 0.95rem;">${room.description}</p>
      </div>

      <div class="mb-4">
        <h4 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--color-text-main);">Amenities & Features</h4>
        <div class="room-amenities-matrix">
          ${room.amenities.map(amenity => `
            <div class="room-amenity-entry">
              <i class="fa-solid fa-circle-check" style="color: var(--color-primary-gold);"></i>
              <span>${amenity}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="mb-4">
        <h4 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--color-text-main);">Photo Gallery</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
          ${(room.gallery || [room.image]).map((img, idx) => `
            <div style="height: 90px; border-radius: var(--radius-sm); overflow: hidden; cursor: pointer; border: 1px solid var(--color-border-solid);" onclick="GalleryModal.openLightbox('${img}', '${room.name} - Photo ${idx+1}')">
              <img src="${img}" alt="${room.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-footer-action pt-3" style="border-top: 1px solid var(--color-border-solid); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
        <div>
          <span style="font-size: 0.75rem; color: var(--color-text-muted); display: block; text-transform: uppercase; letter-spacing: 0.08em;">Official Starting Rate*</span>
          <strong style="font-size: 1.4rem; color: var(--color-primary-gold); font-family: var(--font-serif);">${basePriceFormatted}</strong>
          <small style="color: var(--color-text-muted); font-size: 0.75rem;">/ night + taxes</small>
        </div>
        <button class="btn btn-gold btn-lg" onclick="BookingEngine.proceedToCheckoutFromModal('${room.id}')">
          <i class="fa-solid fa-calendar-check"></i> Check Availability &rarr;
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  proceedToCheckoutFromModal(roomId) {
    this.closeModal('room-details-modal');
    this.selectRoomForBooking(roomId);
  },

  selectRoomForBooking(roomId) {
    const room = window.HOTEL_DATA.rooms.find(r => r.id === roomId);
    if (!room) return;

    this.state.cart.room = room;
    this.openBookingDrawer();
    this.updateCartCalculation();
  },

  openBookingDrawer() {
    const drawer = document.getElementById('booking-drawer');
    const overlay = document.getElementById('booking-drawer-overlay');
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // If no room is selected yet, default to first room
    if (!this.state.cart.room && window.HOTEL_DATA.rooms.length) {
      this.state.cart.room = window.HOTEL_DATA.rooms[0];
    }
    this.updateCartCalculation();
  },

  closeBookingDrawer() {
    const drawer = document.getElementById('booking-drawer');
    const overlay = document.getElementById('booking-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  },

  // Guest counters
  updateAdults(delta) {
    this.state.adults = Math.max(1, Math.min(8, this.state.adults + delta));
    this.renderGuestCountDisplay();
  },

  updateChildren(delta) {
    this.state.children = Math.max(0, Math.min(6, this.state.children + delta));
    this.renderGuestCountDisplay();
  },

  updateRoomsCount(delta) {
    this.state.rooms = Math.max(1, Math.min(5, this.state.rooms + delta));
    this.renderGuestCountDisplay();
  },

  updateGuestCount(type, delta) {
    if (type === 'adults') this.updateAdults(delta);
    else if (type === 'children') this.updateChildren(delta);
    else if (type === 'rooms') this.updateRoomsCount(delta);
  },

  renderGuestCountDisplay() {
    const summary = `${this.state.adults} Adult${this.state.adults > 1 ? 's' : ''}, ${this.state.children > 0 ? this.state.children + ' Child, ' : ''}${this.state.rooms} Room${this.state.rooms > 1 ? 's' : ''}`;
    
    const summaryEl = document.getElementById('guest-summary-text');
    if (summaryEl) summaryEl.textContent = summary;

    const adultEl = document.getElementById('adult-counter-val');
    const childEl = document.getElementById('child-counter-val');
    const roomEl = document.getElementById('room-counter-val');

    if (adultEl) adultEl.textContent = this.state.adults;
    if (childEl) childEl.textContent = this.state.children;
    if (roomEl) roomEl.textContent = this.state.rooms;

    const drawerGuestsVal = document.getElementById('drawer-guests-val');
    if (drawerGuestsVal) drawerGuestsVal.textContent = summary;
  },

  // Add-on toggles
  toggleAddOn(addonKey) {
    if (this.state.cart.addOns.hasOwnProperty(addonKey)) {
      this.state.cart.addOns[addonKey] = !this.state.cart.addOns[addonKey];
      this.updateCartCalculation();
    }
  },

  toggleAddon(addonKey) {
    this.toggleAddOn(addonKey);
  },

  // Promo code
  applyPromoCode(codeOverride = null) {
    const promoInput = document.getElementById('booking-promo') || document.getElementById('drawer-promo-input');
    const code = (codeOverride || (promoInput ? promoInput.value : '')).trim().toUpperCase();

    const messageEl = document.getElementById('promo-applied-message');

    if (code === 'ROYAL10') {
      this.state.promoCode = 'ROYAL10';
      this.state.discountPercent = 10;
      if (messageEl) {
        messageEl.style.color = 'var(--color-success)';
        messageEl.textContent = 'Promo ROYAL10 applied (10% Off!)';
      }
      this.showToast('Promo code ROYAL10 applied (10% Discount)!', 'success');
    } else if (code === 'HONEYMOON') {
      this.state.promoCode = 'HONEYMOON';
      this.state.discountPercent = 15;
      if (messageEl) {
        messageEl.style.color = 'var(--color-success)';
        messageEl.textContent = 'Promo HONEYMOON applied (15% Off!)';
      }
      this.showToast('Promo code HONEYMOON applied (15% Discount)!', 'success');
    } else if (code === 'SPA20') {
      this.state.promoCode = 'SPA20';
      this.state.discountPercent = 12;
      if (messageEl) {
        messageEl.style.color = 'var(--color-success)';
        messageEl.textContent = 'Promo SPA20 applied (12% Off!)';
      }
      this.showToast('Promo code SPA20 applied (12% Discount)!', 'success');
    } else if (code === '') {
      this.state.promoCode = '';
      this.state.discountPercent = 0;
      if (messageEl) messageEl.textContent = '';
    } else {
      this.state.discountPercent = 0;
      if (messageEl) {
        messageEl.style.color = 'var(--color-danger)';
        messageEl.textContent = 'Invalid promo code. Try ROYAL10 or HONEYMOON.';
      }
      this.showToast('Invalid promo code. Try ROYAL10', 'warning');
    }

    this.updateCartCalculation();
  },

  applyPromoCodeFromDrawer() {
    const input = document.getElementById('drawer-promo-input');
    if (input) {
      this.applyPromoCode(input.value);
    }
  },

  updateCartCalculation() {
    const room = this.state.cart.room;
    const detailsContainer = document.getElementById('drawer-room-details');

    if (room && detailsContainer) {
      detailsContainer.innerHTML = `
        <div style="display: flex; gap: 14px; align-items: center;">
          <img src="${room.image}" alt="${room.name}" style="width: 74px; height: 74px; border-radius: var(--radius-sm); object-fit: cover;">
          <div>
            <h4 style="margin: 0 0 4px 0; font-size: 1.05rem;">${room.name}</h4>
            <div style="font-size: 0.78rem; color: var(--color-text-muted);">${room.sizeSqFt} sq ft &bull; ${room.bedType}</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary-gold); margin-top: 4px;">${this.formatPrice(room.basePriceINR)} <small style="font-size: 0.75rem; color: var(--color-text-muted); font-weight: normal;">/ night</small></div>
          </div>
        </div>
      `;
    }

    // Itinerary values
    const checkinEl = document.getElementById('booking-checkin');
    const checkoutEl = document.getElementById('booking-checkout');
    if (checkinEl) this.state.checkInDate = checkinEl.value || this.state.checkInDate;
    if (checkoutEl) this.state.checkOutDate = checkoutEl.value || this.state.checkOutDate;

    // Calculate nights
    if (this.state.checkInDate && this.state.checkOutDate) {
      const d1 = new Date(this.state.checkInDate);
      const d2 = new Date(this.state.checkOutDate);
      const diffTime = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
      this.state.nights = isNaN(diffTime) ? 1 : diffTime;
    }

    const drawerCheckinVal = document.getElementById('drawer-checkin-val');
    const drawerCheckoutVal = document.getElementById('drawer-checkout-val');
    const drawerNightsVal = document.getElementById('drawer-nights-val');

    if (drawerCheckinVal) drawerCheckinVal.textContent = this.state.checkInDate;
    if (drawerCheckoutVal) drawerCheckoutVal.textContent = this.state.checkOutDate;
    if (drawerNightsVal) drawerNightsVal.textContent = `${this.state.nights} Night${this.state.nights > 1 ? 's' : ''}`;

    // Calculate financials
    const roomRate = room ? room.basePriceINR : 0;
    const roomSubtotal = roomRate * this.state.nights * this.state.rooms;

    let addonsTotal = 0;
    if (this.state.cart.addOns.airportTransfer) addonsTotal += 1500;
    if (this.state.cart.addOns.candlelightDinner) addonsTotal += 2500;
    if (this.state.cart.addOns.spaTherapy) addonsTotal += 3000;

    const discountAmount = (roomSubtotal * this.state.discountPercent) / 100;
    const taxableSubtotal = (roomSubtotal - discountAmount) + addonsTotal;
    const taxes = Math.round(taxableSubtotal * 0.18); // 18% GST
    const grandTotal = taxableSubtotal + taxes;

    // Update display elements
    const subtotalEl = document.getElementById('price-room-subtotal');
    const addonsEl = document.getElementById('price-addons-total');
    const discountRow = document.getElementById('price-discount-row');
    const discountValEl = document.getElementById('price-discount-val');
    const taxesEl = document.getElementById('price-taxes-val');
    const grandTotalEl = document.getElementById('price-grand-total');

    if (subtotalEl) subtotalEl.textContent = this.formatPrice(roomSubtotal);
    if (addonsEl) addonsEl.textContent = this.formatPrice(addonsTotal);
    if (taxesEl) taxesEl.textContent = this.formatPrice(taxes);
    if (grandTotalEl) grandTotalEl.textContent = this.formatPrice(grandTotal);

    if (discountRow && discountValEl) {
      if (this.state.discountPercent > 0) {
        discountRow.style.display = 'flex';
        discountValEl.textContent = `- ${this.formatPrice(discountAmount)} (${this.state.discountPercent}%)`;
      } else {
        discountRow.style.display = 'none';
      }
    }
  },

  finalizeBooking() {
    this.submitReservation();
  },

  submitReservation() {
    const room = this.state.cart.room;
    if (!room) {
      this.showToast('Please select a room before confirming reservation.', 'warning');
      return;
    }

    const name = document.getElementById('checkout-guest-name')?.value || 'Valued Guest';
    const email = document.getElementById('checkout-guest-email')?.value || 'guest@example.com';
    const phone = document.getElementById('checkout-guest-phone')?.value || '+91 7061552455';
    const bookingRef = `HPC-${Math.floor(100000 + Math.random() * 900000)}`;

    this.closeBookingDrawer();

    const passModal = document.getElementById('booking-confirmation-modal');
    const passContent = document.getElementById('confirmation-pass-content');

    if (passModal && passContent) {
      passContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 22px;">
          <img src="assets/img/logo-1.png" alt="Hotel Patliputra Continental Logo" style="height: 52px; width: auto; object-fit: contain; margin-bottom: 14px;">
          <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 6px;">
            <div style="width: 32px; height: 32px; background: rgba(16, 185, 129, 0.15); border: 1.5px solid var(--color-success); border-radius: 50%; color: var(--color-success); font-size: 1rem; display: inline-flex; align-items: center; justify-content: center;">
              <i class="fa-solid fa-check"></i>
            </div>
            <h2 style="color: var(--color-text-main); font-size: 1.6rem; margin: 0;">Reservation Confirmed</h2>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">Thank you, <strong>${name}</strong>. We look forward to welcoming you to Hotel Patliputra Continental.</p>
        </div>

        <div style="background: var(--color-surface-warm); border: 1px dashed var(--color-primary-gold); border-radius: var(--radius-md); padding: 24px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--color-border-solid); padding-bottom: 12px; margin-bottom: 14px;">
            <span style="font-family: var(--font-accent); font-size: 0.8rem; text-transform: uppercase; color: var(--color-text-muted);">Booking Reference</span>
            <strong style="color: var(--color-primary-gold); font-size: 1.15rem; letter-spacing: 0.08em;">${bookingRef}</strong>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.88rem; margin-bottom: 14px;">
            <div>
              <span style="color: var(--color-text-muted); display: block; font-size: 0.75rem;">Accommodation:</span>
              <strong>${room.name}</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block; font-size: 0.75rem;">Total Rooms:</span>
              <strong>${this.state.rooms} Room (${this.state.adults} Adults)</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block; font-size: 0.75rem;">Check-In:</span>
              <strong>${this.state.checkInDate} (14:00)</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block; font-size: 0.75rem;">Check-Out:</span>
              <strong>${this.state.checkOutDate} (12:00)</strong>
            </div>
          </div>

          <div style="border-top: 1px solid var(--color-border-solid); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600;">Contact Email:</span>
            <span>${email}</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-outline-gold" onclick="window.print()"><i class="fa-solid fa-print"></i> Print Voucher</button>
          <a href="https://wa.me/917061552455?text=Hello%20Hotel%20Patliputra%20Continental%2C%20my%20booking%20reference%20is%20${bookingRef}%20for%20${encodeURIComponent(room.name)}." target="_blank" class="btn btn-gold"><i class="fa-brands fa-whatsapp"></i> WhatsApp Concierge</a>
        </div>
      `;

      passModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  },

  bindEvents() {
    // Guest dropdown toggler
    const guestBtn = document.getElementById('guest-selector-btn') || document.getElementById('guest-picker-trigger');
    const guestDropdown = document.getElementById('guest-dropdown-menu') || document.getElementById('guest-picker-dropdown');

    if (guestBtn && guestDropdown) {
      guestBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        guestDropdown.classList.toggle('show');
      });

      document.addEventListener('click', (e) => {
        if (!guestDropdown.contains(e.target) && e.target !== guestBtn) {
          guestDropdown.classList.remove('show');
        }
      });
    }

    // Date change listeners
    const checkin = document.getElementById('booking-checkin');
    const checkout = document.getElementById('booking-checkout');

    if (checkin) {
      checkin.addEventListener('change', () => {
        this.state.checkInDate = checkin.value;
        if (checkout) checkout.min = checkin.value;
        this.updateCartCalculation();
      });
    }

    if (checkout) {
      checkout.addEventListener('change', () => {
        this.state.checkOutDate = checkout.value;
        this.updateCartCalculation();
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.BookingEngine = BookingEngine;
}
