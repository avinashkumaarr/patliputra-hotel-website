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
            <span class="room-category-label">${room.category}</span>
            <h3 class="room-title">${room.name}</h3>
            <p class="room-tagline">${room.tagline}</p>
          </div>

          <div class="room-specs-strip">
            <div class="room-spec-item">
              <i class="fa-solid fa-vector-square"></i>
              <span><strong>${room.sizeSqFt}</strong> Sq Ft</span>
            </div>
            <div class="room-spec-item">
              <i class="fa-solid fa-bed"></i>
              <span><strong>${room.bedType.split(' ')[0]}</strong> Bed</span>
            </div>
            <div class="room-spec-item">
              <i class="fa-solid fa-users"></i>
              <span>Up to <strong>${room.maxGuests}</strong> Guests</span>
            </div>
          </div>

          <div class="room-features-list">
            ${room.amenities.slice(0, 4).map(a => `
              <span class="room-feature-pill"><i class="fa-solid fa-circle-check"></i> ${a}</span>
            `).join('')}
          </div>

          <div class="room-card-footer">
            <div class="room-pricing">
              <span class="room-price-label">Starting From</span>
              <span class="room-price-val">${this.formatPrice(room.basePriceINR)}</span>
              <span class="room-price-unit">per night (excl. taxes)</span>
            </div>

            <div class="room-card-actions">
              <button class="btn btn-outline-gold btn-sm" onclick="BookingEngine.openRoomDetails('${room.id}')">
                Details
              </button>
              <button class="btn btn-gold btn-sm" onclick="BookingEngine.selectRoomForBooking('${room.id}')">
                Book Now
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
      <div class="room-modal-header-top mb-3">
        <span class="badge-gold">${room.category}</span>
        <h2 class="mt-2 mb-1">${room.name}</h2>
        <p class="lead" style="color: var(--color-text-muted);">${room.tagline}</p>
      </div>

      <div class="room-modal-gallery">
        <div class="room-modal-main-img" onclick="GalleryModal.openLightbox('${room.image}', '${room.name}')" style="cursor: pointer;">
          <img src="${room.image}" alt="${room.name}">
        </div>
        <div class="room-modal-thumbs">
          ${(room.gallery || [room.image]).slice(1, 3).map((img, idx) => `
            <div class="room-modal-thumb" onclick="GalleryModal.openLightbox('${img}', '${room.name} - View ${idx+2}')">
              <img src="${img}" alt="${room.name} gallery">
            </div>
          `).join('')}
        </div>
      </div>

      <div class="room-modal-desc mb-4">
        <h4>About This Luxury Accommodation</h4>
        <p>${room.description}</p>
      </div>

      <div class="room-specs-strip mb-4">
        <div class="room-spec-item">
          <i class="fa-solid fa-maximize"></i>
          <span>Area: <strong>${room.sizeSqFt} Sq Ft</strong></span>
        </div>
        <div class="room-spec-item">
          <i class="fa-solid fa-bed"></i>
          <span>Bedding: <strong>${room.bedType}</strong></span>
        </div>
        <div class="room-spec-item">
          <i class="fa-solid fa-mountain-sun"></i>
          <span>View: <strong>${room.view}</strong></span>
        </div>
        <div class="room-spec-item">
          <i class="fa-solid fa-user-group"></i>
          <span>Occupancy: <strong>Max ${room.maxAdults} Adults, ${room.maxChildren} Child</strong></span>
        </div>
      </div>

      <div class="mb-4">
        <h4>Included 5-Star Amenities & Conveniences</h4>
        <div class="room-amenities-matrix">
          ${room.amenities.map(amenity => `
            <div class="room-amenity-entry">
              <i class="fa-solid fa-star"></i>
              <span>${amenity}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="mb-4">
        <h4>Select Your Preferred Rate Plan</h4>
        
        <div class="rate-plan-card selected" id="plan-room-only" onclick="BookingEngine.toggleRatePlan('room_only')">
          <div>
            <div class="font-weight-bold" style="font-size: 1.05rem;">Best Flexible Rate (Room Only)</div>
            <small style="color: var(--color-text-muted);">Free cancellation up to 24 hours prior to check-in. High-speed Wi-Fi included.</small>
          </div>
          <div class="text-right">
            <div class="room-price-val">${basePriceFormatted}</div>
            <small>/ night</small>
          </div>
        </div>

        <div class="rate-plan-card" id="plan-breakfast" onclick="BookingEngine.toggleRatePlan('breakfast')">
          <div>
            <div class="font-weight-bold" style="font-size: 1.05rem;">Bed, Gourmet Breakfast & More</div>
            <small style="color: var(--color-text-muted);">Includes full buffet breakfast at Saffron Restaurant, early check-in & late check-out upon availability.</small>
          </div>
          <div class="text-right">
            <div class="room-price-val">${bfastPriceFormatted}</div>
            <small>/ night</small>
          </div>
        </div>
      </div>

      <div class="modal-footer-action pt-3" style="border-top: 1px solid var(--color-border-solid); display: flex; justify-content: space-between; align-items: center;">
        <div>
          <small class="text-muted">Dates: <strong>${this.state.checkInDate} to ${this.state.checkOutDate}</strong> (${this.state.nights} night${this.state.nights > 1 ? 's' : ''})</small>
        </div>
        <button class="btn btn-gold btn-lg" onclick="BookingEngine.proceedToCheckoutFromModal('${room.id}')">
          <i class="fa-solid fa-calendar-check"></i> Reserve This Suite
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

  toggleRatePlan(planType) {
    this.state.cart.ratePlan = planType;
    document.querySelectorAll('.rate-plan-card').forEach(c => c.classList.remove('selected'));
    const activePlan = document.getElementById(`plan-${planType.replace('_', '-')}`);
    if (activePlan) activePlan.classList.add('selected');
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
    if (drawer) {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  closeBookingDrawer() {
    const drawer = document.getElementById('booking-drawer');
    if (drawer) {
      drawer.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  updateCartCalculation() {
    const cart = this.state.cart;
    if (!cart.room) return;

    const room = cart.room;
    let baseRate = room.basePriceINR;
    if (cart.ratePlan === 'breakfast') {
      baseRate += room.breakfastAddonINR;
    }

    const roomSubtotal = baseRate * this.state.nights * this.state.rooms;
    
    // Addons
    let addonsTotal = 0;
    if (cart.addOns.airportTransfer) addonsTotal += 1500;
    if (cart.addOns.candlelightDinner) addonsTotal += 2500;
    if (cart.addOns.spaTherapy) addonsTotal += 3000;

    let grossTotal = roomSubtotal + addonsTotal;

    // Discount
    let discountAmount = 0;
    if (this.state.discountPercent > 0) {
      discountAmount = Math.round((grossTotal * this.state.discountPercent) / 100);
    }

    const netBeforeTax = grossTotal - discountAmount;
    const taxesAndGST = Math.round(netBeforeTax * 0.12); // 12% GST
    const finalPayable = netBeforeTax + taxesAndGST;

    // Render Drawer Content
    const drawerContainer = document.getElementById('booking-drawer-content');
    if (!drawerContainer) return;

    drawerContainer.innerHTML = `
      <div class="cart-room-summary mb-4" style="background: var(--color-surface-warm); padding: 18px; border-radius: var(--radius-md); border: 1px solid var(--color-border-solid);">
        <div style="display: flex; gap: 14px; align-items: center;">
          <img src="${room.image}" alt="${room.name}" style="width: 84px; height: 84px; object-fit: cover; border-radius: var(--radius-sm);">
          <div>
            <h4 style="margin-bottom: 2px;">${room.name}</h4>
            <span class="badge-gold" style="font-size: 0.68rem;">${cart.ratePlan === 'breakfast' ? 'Breakfast Included' : 'Room Only'}</span>
            <div style="font-size: 0.8rem; color: var(--color-text-muted); margin-top: 4px;">
              ${this.state.nights} Night(s) × ${this.state.rooms} Room(s) | ${this.state.adults} Adults
            </div>
          </div>
        </div>
      </div>

      <div class="cart-stay-dates mb-4" style="font-size: 0.88rem; background: #fff; padding: 14px; border: 1px solid var(--color-border-solid); border-radius: var(--radius-sm);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Check-in:</span>
          <strong>${this.state.checkInDate} (From 2:00 PM)</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Check-out:</span>
          <strong>${this.state.checkOutDate} (By 12:00 PM)</strong>
        </div>
      </div>

      <div class="cart-addons-section mb-4">
        <h4 style="font-size: 1.05rem; margin-bottom: 12px;">Enhance Your 5-Star Stay</h4>
        
        <label class="addon-option-label" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--color-surface-warm); border-radius: var(--radius-sm); margin-bottom: 8px; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="addon-airport" ${cart.addOns.airportTransfer ? 'checked' : ''} onchange="BookingEngine.toggleAddon('airportTransfer')">
            <span style="font-size: 0.88rem;">Chauffeured Airport Transfer</span>
          </div>
          <strong style="color: var(--color-primary-gold);">${this.formatPrice(1500)}</strong>
        </label>

        <label class="addon-option-label" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--color-surface-warm); border-radius: var(--radius-sm); margin-bottom: 8px; cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="addon-dinner" ${cart.addOns.candlelightDinner ? 'checked' : ''} onchange="BookingEngine.toggleAddon('candlelightDinner')">
            <span style="font-size: 0.88rem;">Saffron 4-Course Candlelight Dinner</span>
          </div>
          <strong style="color: var(--color-primary-gold);">${this.formatPrice(2500)}</strong>
        </label>

        <label class="addon-option-label" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--color-surface-warm); border-radius: var(--radius-sm); cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <input type="checkbox" id="addon-spa" ${cart.addOns.spaTherapy ? 'checked' : ''} onchange="BookingEngine.toggleAddon('spaTherapy')">
            <span style="font-size: 0.88rem;">60-Min Ocean Spa Ayurvedic Therapy</span>
          </div>
          <strong style="color: var(--color-primary-gold);">${this.formatPrice(3000)}</strong>
        </label>
      </div>

      <div class="cart-promo-section mb-4">
        <label class="form-label" style="font-size: 0.78rem;">Promo / Voucher Code</label>
        <div style="display: flex; gap: 8px;">
          <input type="text" id="cart-promo-input" class="form-control" placeholder="e.g. ROYAL10" value="${this.state.promoCode}" style="text-transform: uppercase;">
          <button class="btn btn-dark btn-sm" onclick="BookingEngine.applyPromoCode()">Apply</button>
        </div>
        ${this.state.discountPercent > 0 ? `
          <div style="color: var(--color-success); font-size: 0.8rem; margin-top: 6px;">
            <i class="fa-solid fa-tag"></i> Coupon Applied: ${this.state.discountPercent}% Discount Granted!
          </div>
        ` : ''}
      </div>

      <div class="cart-price-breakdown" style="border-top: 1px solid var(--color-border-solid); padding-top: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
          <span>Room Tariff (${this.state.nights} Night${this.state.nights > 1 ? 's' : ''})</span>
          <span>${this.formatPrice(roomSubtotal)}</span>
        </div>
        ${addonsTotal > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem;">
            <span>Selected Experiences & Addons</span>
            <span>${this.formatPrice(addonsTotal)}</span>
          </div>
        ` : ''}
        ${discountAmount > 0 ? `
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: var(--color-success);">
            <span>Special Promotion Discount</span>
            <span>-${this.formatPrice(discountAmount)}</span>
          </div>
        ` : ''}
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; color: var(--color-text-muted);">
          <span>Luxury GST & Service Taxes (12%)</span>
          <span>${this.formatPrice(taxesAndGST)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 14px; padding-top: 12px; border-top: 2px solid var(--color-primary-gold); font-size: 1.25rem;">
          <strong>Total Payable Amount</strong>
          <strong style="color: var(--color-primary-gold); font-family: var(--font-serif);">${this.formatPrice(finalPayable)}</strong>
        </div>
      </div>
    `;

    // Update Drawer Footer Checkout Button
    const checkoutBtn = document.getElementById('drawer-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.onclick = () => this.openFinalReservationModal(finalPayable);
    }
  },

  toggleAddon(addonName) {
    this.state.cart.addOns[addonName] = !this.state.cart.addOns[addonName];
    this.updateCartCalculation();
  },

  applyPromoCode() {
    const input = document.getElementById('cart-promo-input');
    if (!input) return;

    const code = input.value.trim().toUpperCase();
    this.state.promoCode = code;

    if (code === 'ROYAL10') {
      this.state.discountPercent = 10;
      this.showToast('Special 10% Royal Discount Applied!', 'success');
    } else if (code === 'HONEYMOON') {
      this.state.discountPercent = 15;
      this.showToast('15% Honeymoon Package Applied!', 'success');
    } else if (code === 'SPA20') {
      this.state.discountPercent = 12;
      this.showToast('12% Spa Weekend Discount Applied!', 'success');
    } else if (code === '') {
      this.state.discountPercent = 0;
    } else {
      this.state.discountPercent = 0;
      this.showToast('Invalid Promo Code. Try ROYAL10', 'error');
    }

    this.updateCartCalculation();
  },

  openFinalReservationModal(payableTotal) {
    this.closeBookingDrawer();
    const modal = document.getElementById('reservation-checkout-modal');
    const totalDisplay = document.getElementById('reservation-total-val');
    
    if (totalDisplay) {
      totalDisplay.textContent = this.formatPrice(payableTotal);
    }
    
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  submitReservation(e) {
    e.preventDefault();
    const name = document.getElementById('res-guest-name')?.value || 'Valued Guest';
    const email = document.getElementById('res-guest-email')?.value || 'guest@example.com';
    const phone = document.getElementById('res-guest-phone')?.value || '+91 9876543210';
    const specialReq = document.getElementById('res-special-req')?.value || 'None';

    const bookingRef = 'HPC-' + Math.floor(100000 + Math.random() * 900000);

    this.closeModal('reservation-checkout-modal');

    // Show Confirmation Pass Modal
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

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.88rem;">
            <div>
              <span style="color: var(--color-text-muted); display: block;">Accommodation:</span>
              <strong>${this.state.cart.room?.name || 'Luxury Suite'}</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block;">Rate Plan:</span>
              <strong>${this.state.cart.ratePlan === 'breakfast' ? 'Bed & Breakfast' : 'Room Only'}</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block;">Check-In:</span>
              <strong>${this.state.checkInDate} (14:00)</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block;">Check-Out:</span>
              <strong>${this.state.checkOutDate} (12:00)</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block;">Primary Guest:</span>
              <strong>${name}</strong>
            </div>
            <div>
              <span style="color: var(--color-text-muted); display: block;">Confirmation Sent To:</span>
              <strong>${email}</strong>
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center;">
          <button class="btn btn-gold" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Print Confirmation Pass
          </button>
          <button class="btn btn-outline-gold" onclick="BookingEngine.closeModal('booking-confirmation-modal')">
            Done
          </button>
        </div>
      `;

      passModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.showToast(`Booking ${bookingRef} created successfully!`, 'success');
    }
  },

  renderGuestCountDisplay() {
    const display = document.getElementById('guest-display-text');
    if (display) {
      display.textContent = `${this.state.adults} Adult${this.state.adults > 1 ? 's' : ''}${this.state.children > 0 ? `, ${this.state.children} Child` : ''}, ${this.state.rooms} Room`;
    }

    const adultsVal = document.getElementById('counter-adults-val');
    const childrenVal = document.getElementById('counter-children-val');
    const roomsVal = document.getElementById('counter-rooms-val');

    if (adultsVal) adultsVal.textContent = this.state.adults;
    if (childrenVal) childrenVal.textContent = this.state.children;
    if (roomsVal) roomsVal.textContent = this.state.rooms;
  },

  updateGuestCount(type, delta) {
    if (type === 'adults') {
      this.state.adults = Math.max(1, Math.min(8, this.state.adults + delta));
    } else if (type === 'children') {
      this.state.children = Math.max(0, Math.min(6, this.state.children + delta));
    } else if (type === 'rooms') {
      this.state.rooms = Math.max(1, Math.min(4, this.state.rooms + delta));
    }

    this.renderGuestCountDisplay();
    if (this.state.cart.room) {
      this.updateCartCalculation();
    }
  },

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" style="color: ${type === 'success' ? 'var(--color-success)' : 'var(--color-primary-gold)'};"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4500);
  },

  bindEvents() {
    // Checkin / Checkout date pickers
    const checkInInput = document.getElementById('booking-checkin');
    const checkOutInput = document.getElementById('booking-checkout');

    if (checkInInput && checkOutInput) {
      checkInInput.addEventListener('change', (e) => {
        this.state.checkInDate = e.target.value;
        checkOutInput.min = e.target.value;
        const d1 = new Date(this.state.checkInDate);
        const d2 = new Date(this.state.checkOutDate);
        const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
        this.state.nights = diffDays;
        if (this.state.cart.room) this.updateCartCalculation();
      });

      checkOutInput.addEventListener('change', (e) => {
        this.state.checkOutDate = e.target.value;
        const d1 = new Date(this.state.checkInDate);
        const d2 = new Date(this.state.checkOutDate);
        const diffDays = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
        this.state.nights = diffDays;
        if (this.state.cart.room) this.updateCartCalculation();
      });
    }

    // Guest dropdown toggle
    const guestTrigger = document.getElementById('guest-picker-trigger');
    const guestDropdown = document.getElementById('guest-picker-dropdown');

    if (guestTrigger && guestDropdown) {
      guestTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        guestDropdown.classList.toggle('show');
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('#guest-picker-dropdown') && !e.target.closest('#guest-picker-trigger')) {
          guestDropdown.classList.remove('show');
        }
      });
    }

    // Modal Close Triggers
    document.querySelectorAll('.modal-close-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Drawer Close
    const drawerCloseBtn = document.getElementById('booking-drawer-close');
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', () => this.closeBookingDrawer());
    }

    // Category Tabs
    document.querySelectorAll('.room-filter-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.room-filter-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const cat = e.currentTarget.getAttribute('data-category') || 'all';
        this.renderRooms(cat);
      });
    });

    // Booking search button
    const searchBtn = document.getElementById('booking-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        document.getElementById('rooms-section')?.scrollIntoView({ behavior: 'smooth' });
        this.showToast(`Showing luxury rooms for ${this.state.nights} Night(s) (${this.state.adults} Adults)`, 'info');
      });
    }
  }
};

if (typeof window !== 'undefined') {
  window.BookingEngine = BookingEngine;
}
