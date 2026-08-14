/**
 * Hotel Patliputra Continental - Ocean Spa & Wellness Module
 */

const SpaModule = {
  openAppointmentModal(serviceName = 'Royal Ayurvedic Abhyanga Massage') {
    const modal = document.getElementById('spa-appointment-modal');
    const selectEl = document.getElementById('spa-service-select');
    
    if (selectEl) {
      selectEl.value = serviceName;
    }

    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  submitAppointment(e) {
    e.preventDefault();
    const service = document.getElementById('spa-service-select')?.value || 'Swedish De-stress Therapy';
    const date = document.getElementById('spa-app-date')?.value || 'Tomorrow';
    const time = document.getElementById('spa-app-time')?.value || '11:00 AM';
    const guestName = document.getElementById('spa-app-name')?.value || 'Valued Guest';

    BookingEngine.closeModal('spa-appointment-modal');
    BookingEngine.showToast(`Spa appointment confirmed for ${service} on ${date} at ${time}. We look forward to pampering you!`, 'success');
  },

  bindEvents() {
    const form = document.getElementById('spa-appointment-form');
    if (form) {
      form.addEventListener('submit', (e) => this.submitAppointment(e));
    }
  }
};

if (typeof window !== 'undefined') {
  window.SpaModule = SpaModule;
}
