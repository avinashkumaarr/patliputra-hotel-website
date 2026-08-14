/**
 * Hotel Patliputra Continental - Verified Hotel Data Store
 * Sourced directly from official hotel records & commercial specifications.
 * Location: PC Golambar, Bypass Crossing, Anisabad, Patna – 800002, Bihar
 */

const HOTEL_DATA = {
  property: {
    name: "Hotel Patliputra Continental",
    tagline: "A Distinctive Stay in the Heart of Patna",
    description: "Experience refined hospitality, exceptional dining and thoughtfully designed spaces at Hotel Patliputra Continental, situated just 5 minutes from Jay Prakash Narayan Airport (PAT).",
    address: "PC Golambar, Bypass Crossing, Anisabad, Patna – 800002, Bihar, India",
    
    // Official Contact Channels
    guestSupportPhone: "+91 612 2250 204 / 205 / 206",
    mobilePhone: "+91 7061 552 455",
    corporatePhone: "+91 913 555 1331",
    socialPhone: "+91 913 555 1379",
    
    // Official Email Routing
    generalEmail: "gm@hpcpatna.com",
    reservationsEmail: "reservations@hpcpatna.com",
    banquetEmail: "dygm@hpcpatna.com", // S.M. Razi Anwar (Dy. General Manager)
    guestRelationsEmail: "grm@hpcpatna.com",
    
    // WhatsApp Direct
    whatsAppNumber: "917061552455",
    whatsAppUrl: "https://wa.me/917061552455?text=Hello%20Hotel%20Patliputra%20Continental%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability%20and%20reservations.",
    
    checkInTime: "14:00 (2:00 PM)",
    checkOutTime: "12:00 (12:00 PM)",
    coordinates: { lat: 25.585852, lng: 85.09594 },
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Patliputra+Continental+Patna"
  },

  // 1. Exact 5 Official Room Categories
  rooms: [
    {
      id: "deluxe-room",
      name: "Deluxe Room",
      category: "Deluxe",
      badge: "Essential Luxury",
      tagline: "Thoughtfully Designed Comfort with Premium Amenities",
      sizeSqFt: 351,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed or Twin Beds",
      view: "City & Courtyard View",
      basePriceINR: 7000,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
      ],
      description: "Designed for business and leisure travelers seeking peaceful comfort. Features high quality woodwork, Posturepedic bedding, dedicated work desk, and full 5-star conveniences.",
      amenities: [
        "High-Speed Wi-Fi",
        "24-Hour In-Room Dining",
        "40\" HD Smart TV",
        "Minibar & Refrigerator",
        "Electronic Digital Safe",
        "Tea / Coffee Maker",
        "Hairdryer",
        "Iron & Ironing Board",
        "Individual Air Conditioning",
        "High-Pressure Shower & Toiletries",
        "Daily Housekeeping & Mineral Water"
      ]
    },
    {
      id: "premium-room",
      name: "Premium Room",
      category: "Premium",
      badge: "Spacious Comfort",
      tagline: "Generous Living Area Crafted for Business & Relaxation",
      sizeSqFt: 432,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed",
      view: "Panoramic City View",
      basePriceINR: 8000,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
      ],
      description: "Generously proportioned room decorated in soothing neutral tones with rich wooden accents. Equipped with a comfortable sitting lounge, executive workspace, and lavish bathroom.",
      amenities: [
        "High-Speed Wi-Fi",
        "24-Hour In-Room Dining",
        "43\" 4K UHD Smart TV",
        "Minibar & Refrigerator",
        "Electronic Safe",
        "Tea / Coffee Maker with Premium Pods",
        "Hairdryer & Vanity Mirror",
        "Iron & Ironing Board",
        "Climate Control Air Conditioning",
        "High-Pressure Rain Shower & Toiletries",
        "Plush Bathrobes & Slippers"
      ]
    },
    {
      id: "executive-suite",
      name: "Executive Suite",
      category: "Signature Suite",
      badge: "Corporate Elite",
      tagline: "Distinct Executive Lounge & Ergonomic Workstation",
      sizeSqFt: 747,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed with Separate Living Salon",
      view: "Urban Skyline View",
      basePriceINR: 16999,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85"
      ],
      description: "Specially tailored for dignitaries, executives, and VIP guests. Features an expansive wood-paneled living salon, private workspace with high-back leather chair, and soundproof acoustic glass.",
      amenities: [
        "Separate Living Salon & Master Bedroom",
        "Dedicated Ergonomic Workspace",
        "24-Hour In-Room Dining & Butler Service",
        "High-Speed Gigabit Wi-Fi",
        "50\" Flat-Screen UHD Smart TV",
        "Minibar & Gourmet Refreshment Center",
        "Electronic Safe",
        "Tea / Coffee Maker",
        "Hairdryer, Bathrobes & Luxury Toiletries",
        "Spacious Bathroom with Rain Shower",
        "Daily Housekeeping & Evening Turndown"
      ]
    },
    {
      id: "tower-suite",
      name: "Tower Suite",
      category: "Signature Suite",
      badge: "Architectural Showcase",
      tagline: "Romantic Circular Architecture With Panoramic Vistas",
      sizeSqFt: 672,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "Custom Round Royal Bed",
      view: "360° Aerial City & Airport View",
      basePriceINR: 17999,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85"
      ],
      description: "Located in the exclusive hotel tower, this unique suite features circular architectural geometry, a plush round king bed, and dramatic floor-to-ceiling panoramic windows overlooking the green expanses.",
      amenities: [
        "Bespoke Round Bed with Luxury Linen",
        "Floor-to-Ceiling 360° Vista Windows",
        "Freestanding Bathtub & Rain Shower",
        "High-Speed Wi-Fi Access",
        "50\" 4K Smart TV",
        "Minibar & Beverage Center",
        "Electronic Digital Safe",
        "Tea / Coffee Maker",
        "Hairdryer, Bathrobes & Premium Toiletries",
        "Dual-Zone Centralized Air Conditioning",
        "24-Hour In-Room Dining"
      ]
    },
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      category: "Signature Suite",
      badge: "Palatial Opulence",
      tagline: "Over 1,277 Sq Ft of Unrivaled Hospitality Grandeur",
      sizeSqFt: 1277,
      maxAdults: 4,
      maxChildren: 2,
      maxGuests: 4,
      bedType: "2 Master King Bedrooms",
      view: "Panoramic City Skyline & Runway",
      basePriceINR: 35999,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=85"
      ],
      description: "The crown jewel of Hotel Patliputra Continental. An expansive 1,277 sq ft layout with two master bedrooms, private living and dining salon for 8 guests, 3 smart UHD TVs, and dedicated butler service.",
      amenities: [
        "Two Master King Bedrooms",
        "Separate Living & 8-Seater Dining Salon",
        "Deep Soaking Jacuzzi with Skyline Views",
        "Dedicated Butler Service",
        "Three 55\" & 65\" 4K UHD Smart TVs",
        "High-Speed Wi-Fi",
        "Espresso & Tea Bar",
        "Minibar & Electronic Safe",
        "Italian Marble Bathrooms with Rain Showers",
        "Hairdryer, Plush Bathrobes & Luxury Amenities",
        "Daily Housekeeping & Evening Turndown"
      ]
    }
  ],

  // 2. Exact 3 Verified Dining Destinations
  dining: [
    {
      id: "saffron",
      name: "Saffron",
      cuisineType: "Multi-Cuisine",
      cuisineTag: "Multi-Cuisine Fine Dining",
      location: "Ground Floor Lobby Level",
      timings: "Breakfast: 7:30 AM – 10:30 AM | Lunch & Dinner: 12:00 PM – 11:00 PM",
      avgPriceForTwo: 1500,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
      description: "Saffron brings together refined multi-cuisine masterworks and revered regional culinary specialities in a warm, welcoming fine dining ambiance with expansive buffets and à la carte offerings.",
      highlights: ["Daily Breakfast Buffet", "Curated À La Carte Menu", "Vegetarian & Non-Vegetarian Specialities", "Private Dining Section"],
      menu: [
        { name: "Champaran Handi Special", category: "Mains", price: 795, veg: false, description: "Slow-cooked in sealed earthen clay pot with whole garlic and heritage spices." },
        { name: "Paneer Tikka Lazeez", category: "Starters", price: 545, veg: true, description: "Char-grilled cottage cheese marinated in saffron and hung curd." },
        { name: "Murgh Dum Biryani", category: "Mains", price: 695, veg: false, description: "Fragrant aged basmati rice cooked on slow dum with tender chicken and saffron." },
        { name: "Dal Makhani Patliputra", category: "Mains", price: 495, veg: true, description: "Black lentils slow-simmered overnight with butter and fresh cream." },
        { name: "Shahi Tukda & Gulab Jamun", category: "Desserts", price: 345, veg: true, description: "Crisp saffron brioche in cardamom rabri with pistachios." }
      ]
    },
    {
      id: "chao-china",
      name: "Chao China",
      cuisineType: "Chinese",
      cuisineTag: "Authentic Chinese Gastronomy",
      location: "1st Floor Luxury Pavilion",
      timings: "Breakfast: 7:30 AM – 10:30 AM | Lunch & Dinner: 12:00 PM – 11:00 PM",
      avgPriceForTwo: 1300,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
      description: "Chao China delights with authentic Far Eastern flavors, featuring handmade dim sums, sizzling wok creations, and oriental recipes prepared with specialized culinary techniques.",
      highlights: ["Handcrafted Dim Sum & Baos", "Flaming Wok Delicacies", "Oriental Jasmine & Herbal Teas", "Warm Ambient Setting"],
      menu: [
        { name: "Crystal Veg Dumplings", category: "Starters", price: 485, veg: true, description: "Steamed translucent pouches with fresh garden greens." },
        { name: "Crispy Szechuan Prawns", category: "Starters", price: 745, veg: false, description: "Wok-tossed prawns with dry red chillies and Szechuan pepper." },
        { name: "Kung Pao Chicken", category: "Mains", price: 625, veg: false, description: "Diced chicken, toasted peanuts, and scallions in savory soy glaze." },
        { name: "Stir-Fried Asian Greens", category: "Mains", price: 495, veg: true, description: "Fresh seasonal greens tossed in garlic reduction." },
        { name: "Date Pancake with Ice Cream", category: "Desserts", price: 375, veg: true, description: "Golden-fried Chinese pastry stuffed with dates." }
      ]
    },
    {
      id: "coca-mocha",
      name: "Coca Mocha",
      cuisineType: "Café & Patisserie",
      cuisineTag: "Coffee Shop & Patisserie",
      location: "Lobby Atrium",
      timings: "Breakfast: 7:30 AM – 10:30 AM | Lunch & Dinner: 12:00 PM – 11:00 PM",
      avgPriceForTwo: 700,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85",
      description: "An elegant café and patisserie offering freshly baked breads, single-origin coffees, delicate chocolates, pastries, and savory deli snacks in a relaxed atmosphere.",
      highlights: ["Artisanal Single-Origin Coffee", "Handcrafted Chocolates & Pastries", "Fresh Breads & Croissants", "Comfortable Lounge Seating"],
      menu: [
        { name: "Signature Cappuccino", category: "Beverages", price: 275, veg: true, description: "Espresso shot with steamed velvety milk foam." },
        { name: "Belgian Chocolate Tart", category: "Desserts", price: 325, veg: true, description: "Rich dark chocolate ganache in a crisp pastry crust." },
        { name: "Grilled Chicken & Cheese Panini", category: "Starters", price: 425, veg: false, description: "Herb-marinated chicken and cheese on toasted sourdough." },
        { name: "Fresh Butter Croissant", category: "Starters", price: 245, veg: true, description: "Flaky golden butter croissant served with preserves." }
      ]
    }
  ],

  // 3. Exact 4 Verified Event & Banquet Venues
  banquets: [
    {
      id: "marhaba",
      name: "Marhaba Banquet Hall",
      type: "Grand Ballroom & Convention Arena",
      maxCapacity: 400,
      dimensions: "Pillarless Grand Layout",
      idealFor: "Weddings, Receptions, Mega Conferences, Gala Dinners",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      description: "The hotel's largest event venue with a capacity of up to 400 guests. Pillarless architecture, crystal chandeliers, acoustic wall treatment, and integrated AV infrastructure.",
      features: ["Pillarless Grand Design", "Dedicated Buffet Arena", "High-Definition AV & Sound System", "Flexible Stage & Mandap Setups"]
    },
    {
      id: "mandap",
      name: "Mandap Banquet Hall",
      type: "Contemporary Banquet Hall",
      maxCapacity: 200,
      areaSqFt: 4129,
      dimensions: "62 ft × 46 ft (9 ft Height)",
      idealFor: "Sangeet, Engagement Ceremonies, Corporate Seminars",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      description: "Located on the ground floor with natural lighting, marble floors, and an attached dedicated culinary buffet area, ideal for social and corporate gatherings.",
      features: ["4,129 Sq Ft Flexible Space", "Attached Buffet Dining Zone", "Italian Marble Flooring", "Acoustic Wall Panels"]
    },
    {
      id: "mehfil",
      name: "Mehfil Banquet Lounge",
      type: "Luxury Veneer & Carpeted Hall",
      maxCapacity: 200,
      areaSqFt: 3262,
      dimensions: "62 ft × 45 ft (9 ft Height)",
      idealFor: "Cocktail Receptions, Corporate Meetings, Private Banquets",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
      description: "An exquisitely styled banquet venue featuring rich wood veneer paneling, acoustic carpeted floors, and warm ambient lighting.",
      features: ["3,262 Sq Ft Area", "Rich Teak Veneer Walls", "Plush Acoustic Carpet", "Integrated Sound System"]
    },
    {
      id: "diamond",
      name: "Diamond Executive Boardroom",
      type: "Executive Boardroom",
      maxCapacity: 30,
      areaSqFt: 450,
      dimensions: "25 ft × 18 ft",
      idealFor: "Board Meetings, Video Conferences, High-Level Consultations",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      description: "An intimate boardroom equipped with ergonomic leather seating, video conferencing displays, microphones, and high-speed network connections.",
      features: ["Ergonomic Executive Seating", "Interactive Video Conference Display", "Wireless Content Sharing", "Private Hospitality Bar"]
    }
  ],

  // 4. Exact 4 Verified Wellness Facilities (11:00 AM – 8:00 PM)
  wellness: [
    {
      id: "ocean-spa",
      name: "Ocean Salon & Spa",
      tagline: "Relax. Rejuvenate. Restore.",
      hours: "11:00 AM – 8:00 PM",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      description: "A serene wellness sanctuary offering personalized massages, Ayurvedic herbal therapies, and grooming services by skilled therapists.",
      highlights: ["Ayurvedic Body Therapies", "Stress Relief Massages", "Bridal & Salon Grooming", "Organic Botanical Oils"]
    },
    {
      id: "swimming-pool",
      name: "Swimming Pool",
      tagline: "Rooftop Pool Experience",
      hours: "11:00 AM – 8:00 PM",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
      description: "Take a refreshing dip in our crystal-clear outdoor swimming pool with sun terrace loungers and dedicated poolside assistance.",
      highlights: ["Outdoor Pool", "Sun Loungers", "Towel Service", "Complimentary for In-House Guests"]
    },
    {
      id: "fitness-gym",
      name: "Fitness Centre",
      tagline: "Modern Equipment & Training Facilities",
      hours: "11:00 AM – 8:00 PM",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      description: "Maintain your daily fitness routine with advanced cardiovascular treadmills, elliptical machines, free weights, and stretching zones.",
      highlights: ["Cardio Treadmills & Ellipticals", "Free Weights Zone", "Steam & Sauna Facilities", "Air Conditioned Workout Hall"]
    },
    {
      id: "game-zone",
      name: "Game Zone",
      tagline: "Pool Table & Recreation for Guests",
      hours: "11:00 AM – 8:00 PM",
      image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=1200&q=80",
      description: "Unwind with leisure recreational games including standard billiards/pool table and indoor board games for guests and families.",
      highlights: ["Billiards & Pool Table", "Indoor Board Games", "Relaxed Lounge Seating", "Family Friendly"]
    }
  ],

  // 5. Categorized Amenities & Services
  amenitiesList: {
    hotelServices: [
      { name: "Valet Parking & Car Park", icon: "fa-car" },
      { name: "Concierge & Travel Desk", icon: "fa-bell-concierge" },
      { name: "24-Hour Front Desk Support", icon: "fa-headset" },
      { name: "Laundry & Dry Cleaning", icon: "fa-shirt" },
      { name: "High-Speed Wi-Fi Throughout", icon: "fa-wifi" },
      { name: "Airport Transfer Assistance", icon: "fa-plane-departure" }
    ],
    roomComforts: [
      { name: "24-Hour In-Room Dining", icon: "fa-utensils" },
      { name: "Individual Air Conditioning", icon: "fa-snowflake" },
      { name: "Mini Refrigerator & Minibar", icon: "fa-martini-glass-citrus" },
      { name: "Tea & Coffee Maker", icon: "fa-mug-hot" },
      { name: "In-Room Electronic Safe", icon: "fa-vault" },
      { name: "Iron & Ironing Board", icon: "fa-rug" },
      { name: "Daily Housekeeping Service", icon: "fa-broom" }
    ],
    bathroomAmenities: [
      { name: "High-Pressure Rain Shower", icon: "fa-shower" },
      { name: "Essential Bath Toiletries", icon: "fa-pump-soap" },
      { name: "Hairdryer & Vanity Mirror", icon: "fa-wind" },
      { name: "Plush Bathrobes & Slippers", icon: "fa-spa" },
      { name: "Fresh Cotton Bath Towels", icon: "fa-layer-group" }
    ]
  },

  // 6. Verified Patna Heritage Destinations with Distances
  destinations: [
    {
      id: "golghar",
      name: "Golghar Granary",
      distance: "8 km from Hotel",
      travelTime: "20 min drive",
      image: "assets/img/destinations/golghar.webp",
      description: "Iconic beehive-shaped British-era granary built in 1786 offering spiral staircases and sweeping panoramic views of the Ganges and Patna city."
    },
    {
      id: "bihar-museum",
      name: "Bihar Museum",
      distance: "5.5 km from Hotel",
      travelTime: "15 min drive",
      image: "assets/img/destinations/bihar-museum.webp",
      description: "World-class contemporary museum designed by Maki & Associates, housing ancient Mauryan sculptures, historical artifacts, and interactive art galleries."
    },
    {
      id: "patna-museum",
      name: "Patna Museum (Jadu Ghar)",
      distance: "7 km from Hotel",
      travelTime: "18 min drive",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=1200&q=85",
      description: "State museum showcasing Mughal and Rajput architecture, the famed Didarganj Yakshi statue, and an ancient fossilized tree trunk."
    },
    {
      id: "mahavir-mandir",
      name: "Mahavir Mandir",
      distance: "6 km from Hotel",
      travelTime: "15 min drive",
      image: "assets/img/destinations/mahavir-mandir.webp",
      description: "One of the holiest and most visited Hanuman temples in North India, situated right next to Patna Junction railway station."
    },
    {
      id: "takht-patna-sahib",
      name: "Takht Sri Harmandir Ji (Patna Sahib)",
      distance: "14 km from Hotel",
      travelTime: "30 min drive",
      image: "assets/img/destinations/takht-patna-sahib.webp",
      description: "One of the five sacred Takhts of Sikhism, commemorating the birthplace of Guru Gobind Singh Ji in 1666, built with white marble and intricate gold work."
    },
    {
      id: "nalanda-university",
      name: "Nalanda Mahavihara (UNESCO)",
      distance: "82 km from Hotel",
      travelTime: "1 hr 45 min drive",
      image: "assets/img/destinations/nalanda.webp",
      description: "UNESCO World Heritage ancient residential university active from 5th to 13th centuries CE, renowned worldwide for Buddhist philosophy and learning."
    }
  ]
};

// Export to global scope
window.HOTEL_DATA = HOTEL_DATA;
