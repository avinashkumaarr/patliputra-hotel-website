/**
 * Hotel Patliputra Continental - Dining & Table Reservation Module
 */

const DiningModule = {
  state: {
    activeRestaurantId: 'saffron',
    activeCategory: 'all',
    dietFilter: 'all' // 'all', 'veg', 'non-veg'
  },

  init() {
    this.bindEvents();
  },

  openMenuModal(restaurantId) {
    this.state.activeRestaurantId = restaurantId;
    this.state.activeCategory = 'all';
    this.state.dietFilter = 'all';

    const restaurant = window.HOTEL_DATA.dining.find(d => d.id === restaurantId);
    if (!restaurant) return;

    const modal = document.getElementById('digital-menu-modal');
    const modalBody = document.getElementById('digital-menu-content');

    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="menu-modal-header mb-4 text-center">
        <span class="badge-gold">${restaurant.cuisineType}</span>
        <h2 class="mt-2 mb-1">${restaurant.name} Digital Menu</h2>
        <p style="color: var(--color-text-muted);">${restaurant.timings} | Location: <strong>${restaurant.location}</strong></p>
      </div>

      <div class="menu-category-filter">
        <div class="menu-category-tabs">
          <button class="tab-btn active menu-tab-btn" data-cat="all" onclick="DiningModule.setMenuCategory('all')">Full Menu</button>
          <button class="tab-btn menu-tab-btn" data-cat="Chef Special" onclick="DiningModule.setMenuCategory('Chef Special')">Chef's Signatures</button>
          <button class="tab-btn menu-tab-btn" data-cat="Starters" onclick="DiningModule.setMenuCategory('Starters')">Starters & Dim Sum</button>
          <button class="tab-btn menu-tab-btn" data-cat="Mains" onclick="DiningModule.setMenuCategory('Mains')">Main Courses</button>
          <button class="tab-btn menu-tab-btn" data-cat="Desserts" onclick="DiningModule.setMenuCategory('Desserts')">Desserts & Bakery</button>
          ${restaurant.id === 'coca-mocha' ? `<button class="tab-btn menu-tab-btn" data-cat="Beverages" onclick="DiningModule.setMenuCategory('Beverages')">Gourmet Coffees</button>` : ''}
        </div>

        <div class="diet-filter-toggles">
          <button class="diet-toggle-btn active" id="diet-all" onclick="DiningModule.setDietFilter('all')">All</button>
          <button class="diet-toggle-btn" id="diet-veg" onclick="DiningModule.setDietFilter('veg')"><span class="diet-icon"></span> Veg</button>
          <button class="diet-toggle-btn" id="diet-non-veg" onclick="DiningModule.setDietFilter('non-veg')"><span class="diet-icon non-veg"></span> Non-Veg</button>
        </div>
      </div>

      <div id="menu-items-rendered-grid" class="menu-items-grid">
        ${this.renderMenuItemsHtml(restaurant)}
      </div>

      <div class="mt-4 pt-3 text-center" style="border-top: 1px solid var(--color-border-solid);">
        <button class="btn btn-gold" onclick="DiningModule.openTableReservation('${restaurant.id}')">
          <i class="fa-solid fa-utensils"></i> Reserve A Table At ${restaurant.name}
        </button>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  renderMenuItemsHtml(restaurant) {
    let items = restaurant.menu;

    if (this.state.activeCategory !== 'all') {
      items = items.filter(item => item.category === this.state.activeCategory);
    }

    if (this.state.dietFilter === 'veg') {
      items = items.filter(item => item.veg === true);
    } else if (this.state.dietFilter === 'non-veg') {
      items = items.filter(item => item.veg === false);
    }

    if (items.length === 0) {
      return `<div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--color-text-muted);">No menu items found for this selection.</div>`;
    }

    return items.map(item => `
      <div class="menu-item-card">
        <div>
          <div class="menu-item-header">
            <div class="menu-item-name">
              <span class="diet-icon ${item.veg ? '' : 'non-veg'}"></span>
              ${item.name}
            </div>
            <div class="menu-item-price">
              ${BookingEngine.formatPrice(item.price)}
            </div>
          </div>
          <p class="menu-item-desc">${item.description}</p>
        </div>
        <div style="margin-top: 12px; font-size: 0.75rem; color: var(--color-primary-gold); font-weight: 600;">
          <i class="fa-solid fa-crown"></i> ${item.category}
        </div>
      </div>
    `).join('');
  },

  setMenuCategory(cat) {
    this.state.activeCategory = cat;
    document.querySelectorAll('.menu-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
    });

    const restaurant = window.HOTEL_DATA.dining.find(d => d.id === this.state.activeRestaurantId);
    const grid = document.getElementById('menu-items-rendered-grid');
    if (grid && restaurant) {
      grid.innerHTML = this.renderMenuItemsHtml(restaurant);
    }
  },

  setDietFilter(diet) {
    this.state.dietFilter = diet;
    document.querySelectorAll('.diet-toggle-btn').forEach(btn => btn.classList.remove('active', 'veg-active'));
    
    const activeBtn = document.getElementById(`diet-${diet}`);
    if (activeBtn) {
      if (diet === 'veg') activeBtn.classList.add('veg-active');
      else activeBtn.classList.add('active');
    }

    const restaurant = window.HOTEL_DATA.dining.find(d => d.id === this.state.activeRestaurantId);
    const grid = document.getElementById('menu-items-rendered-grid');
    if (grid && restaurant) {
      grid.innerHTML = this.renderMenuItemsHtml(restaurant);
    }
  },

  openTableReservation(restaurantId = 'saffron') {
    BookingEngine.closeModal('digital-menu-modal');

    const modal = document.getElementById('table-reservation-modal');
    const selectVenue = document.getElementById('table-res-venue');
    
    if (selectVenue) {
      selectVenue.value = restaurantId;
    }

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  submitTableReservation(e) {
    e.preventDefault();
    const venueId = document.getElementById('table-res-venue')?.value || 'saffron';
    const guestName = document.getElementById('table-res-name')?.value || 'Valued Guest';
    const guests = document.getElementById('table-res-guests')?.value || '2';
    const date = document.getElementById('table-res-date')?.value || 'Today';
    const time = document.getElementById('table-res-time')?.value || '20:00';
    const seating = document.getElementById('table-res-seating')?.value || 'Window View';

    const restaurant = window.HOTEL_DATA.dining.find(d => d.id === venueId);
    const venueName = restaurant ? restaurant.name : 'Saffron Restaurant';

    BookingEngine.closeModal('table-reservation-modal');

    BookingEngine.showToast(`Table confirmed for ${guests} guests at ${venueName} on ${date} (${time})`, 'success');
  },

  bindEvents() {
    const tableForm = document.getElementById('table-reservation-form');
    if (tableForm) {
      tableForm.addEventListener('submit', (e) => this.submitTableReservation(e));
    }
  }
};

if (typeof window !== 'undefined') {
  window.DiningModule = DiningModule;
}
