# 🏨 Hotel Patliputra Continental — 5-Star Luxury Web Portal Redesign

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00AD9F?style=for-the-badge&logo=netlify&logoColor=white)](https://patliputra-hotel-website.netlify.app/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-10b981?style=for-the-badge)](https://patliputra-hotel-website.netlify.app/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](#license)

> **A modern, high-conversion 5-star digital hospitality web portal redesign for Hotel Patliputra Continental (Patna, Bihar). Built with royal Magadh heritage aesthetics, glassmorphic UI, Ken Burns motion effects, direct reservation engine, interactive dining gastronomy, and instant banquet RFQ estimators.**

---

## 🌐 Live Demonstration

- **Live URL:** [https://patliputra-hotel-website.netlify.app/](https://patliputra-hotel-website.netlify.app/)
- **Original Reference Website:** [https://patliputracontinental.com/](https://patliputracontinental.com/)

---

## ✨ Key Features & Enhancements

### 1. 👑 Sovereign 5-Star Visual Design System
- **Palatial Color Palette:** Tailored royal gold gradients (`#d4af37`, `#c59b27`), deep obsidian neutrals (`#0a0d14`), and warm alabaster silk surfaces.
- **Cinematic Radiant Vignette:** High-vibrancy hero cover imagery with ambient golden radial glow and smooth 12-second **Ken Burns motion zoom**.
- **Authentic Brand Integration:** Pixel-perfect integration of the official registered trademark logo with central calligraphic monogram (`HPC`).
- **5-Star Luxury Trust Ribbon:** Direct display of government 5-star classifications, airport proximity, 24/7 butler service, and best-rate guarantees.

### 2. 🛎️ Interactive Direct Booking Engine
- **Floating Booking Bar:** Real-time date pickers, guest counter (adults/children/rooms), and single-click availability finder.
- **Live Currency Switcher:** Instant price conversion between **INR (₹)** and **USD ($)** for NRI and international travelers.
- **Offcanvas Checkout Drawer:** Add-on customizer (Airport Luxury Pickup, Candlelight Dinner, Ayurvedic Spa Ritual).
- **Dynamic Promo Codes:** Interactive coupon validation engine (`ROYAL10` for 10% off, `HONEYMOON` for 15% off, `SPA20` for 12% off).
- **Official Reservation Pass:** Instant printable 5-star booking voucher with generated reference numbers.

### 3. 🛏️ Accommodations & Suite Showcase
- Detailed room catalog including **Infinity Presidential Suite**, **Tower Honeymoon Suite**, **Executive Suite**, **Airport View Room**, **Grand Premium Room**, and **Classic Deluxe Room**.
- High-resolution modal popups with multi-angle galleries, amenity matrices, and flexible rate switcher (*Bed & Breakfast* vs *Room Only*).

### 4. 🍽️ Digital Gastronomy & Table Reservations
- Dedicated culinary venues showcase:
  - **Saffron:** Multi-cuisine & Royal Bihari fine dining (Champaran Handi mutton, Patliputra Paneer Tikka).
  - **Chao China:** Authentic Pan-Asian, handmade dim sums, and flaming wok creations.
  - **Coca Mocha:** 24/7 Parisian-inspired artisanal bakery and coffee lounge.
- Filterable digital menus with **Veg / Non-Veg / Chef Special** dietary indicators and instant table booking forms.

### 5. 🏛️ Grand Banquets & Instant RFQ Configurator
- Showcase for Patna's top convention venues: **Ashoka Grand Ballroom** (Cap. 400), **Mandap Banquet Hall** (Cap. 200), **Mehfil Lounge** (Cap. 200), and **Diamond Boardroom** (Cap. 30).
- **Automated Event Budget Estimator:** Configures guest count, event purpose, and catering tiers (*Standard Buffet*, *Royal Magadh Feast*, *Premium Cocktail*) with instant budget projections.

### 6. 🌿 Ocean Spa & Patna Cultural Concierge
- **Ocean Spa & Salon:** Ayurvedic therapy scheduler (Abhyanga, Swedish massage, Saffron facials).
- **Patna Excursions Guide:** Curated heritage guide for *Nalanda Mahavihara (UNESCO)*, *Takht Sri Harmandir Ji (Patna Sahib)*, *Padri Ki Haveli*, *Ancient Vaishali*, and *Sanjay Gandhi Zoo*.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Markup & Structure** | Semantic HTML5, Microdata SEO Tags, Open Graph Protocol |
| **Styling & Theme** | Vanilla CSS3 (Custom Design System, Modular Architecture, CSS Grid & Flexbox) |
| **Typography** | Google Fonts (*Playfair Display*, *Inter*, *Montserrat*) |
| **Iconography** | Font Awesome 6.5 Pro Solid / Regular / Brands |
| **Logic & Modules** | Vanilla JavaScript (ES6+ Modular Architecture, Zero Heavy Dependencies) |
| **Deployment** | Netlify CDN (Continuous Deployment with Instant Global Edge Caching) |

---

## 📁 Project Architecture

```
hotel-patliputra-5star/
│
├── index.html                   # Master single-page application entry
├── README.md                    # Project documentation & pitch brief
├── .gitignore                   # Version control ignore rules
│
├── assets/
│   ├── css/
│   │   ├── variables.css        # Design tokens (colors, fonts, shadows, radii)
│   │   ├── base.css             # Typography resets and global layouts
│   │   ├── components.css       # Buttons, badges, tabs, form controls, modals
│   │   ├── hero-booking.css     # Slideshow, navigation, header, booking bar
│   │   ├── rooms.css            # Room cards, suites gallery, rate selector
│   │   ├── dining.css           # Restaurant venues, digital menus
│   │   ├── banquets.css         # Ballrooms, RFQ quote configurator
│   │   ├── wellness.css         # Spa rituals, pool showcase, gym
│   │   ├── concierge.css        # Patna guide, offers, reviews, footer
│   │   └── responsive.css       # Mobile & tablet breakpoints
│   │
│   ├── js/
│   │   ├── data.js              # Hotel catalog data store (rooms, menus, banquets)
│   │   ├── app.js               # Main orchestrator, slideshow, currency switcher
│   │   ├── booking-engine.js    # Pricing calculator, promo codes, booking pass
│   │   ├── dining-module.js     # Menus viewer & table reservation logic
│   │   ├── banquet-module.js    # RFQ estimator & hall specs viewer
│   │   ├── spa-module.js        # Spa appointments scheduler
│   │   └── gallery-modal.js     # Lightbox photo inspector
│   │
│   └── img/
│       ├── logo-1.png           # Official hotel logo (transparent original)
│       ├── logo-dark-navbar.png # High-contrast gold & bronze navbar logo
│       ├── favicon.ico          # Browser tab icon
│       └── destinations/        # Authentic destination webp photography
```

---

## 💻 Local Development Setup

To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hotel-patliputra-website.git
   cd hotel-patliputra-website
   ```

2. **Start a local development server:**
   - With Python:
     ```bash
     python -m http.server 3000
     ```
   - With Node.js (npx):
     ```bash
     npx serve .
     ```

3. Open **`http://localhost:3000`** in your browser.

---

## 🚀 Deployment

### Deploy to Netlify
1. Navigate to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the root folder into the browser window.
3. Your site is live with a global SSL certificate in seconds.

### Deploy to Vercel
```bash
npx vercel
```

---

## 📄 License & Attribution

Designed and developed as a modern 5-star digital upgrade for **Hotel Patliputra Continental**, Anisabad, Patna, Bihar.  
*All trademarks, logos, and hotel brand assets are property of Hotel Patliputra Continental LLP.*
