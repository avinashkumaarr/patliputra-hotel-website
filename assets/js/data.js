/**
 * Hotel Patliputra Continental - Luxury 5-Star Hotel Data Store
 * Contains comprehensive property details, room catalog, dining menus, banquets, spa, and destinations.
 */

const HOTEL_DATA = {
  property: {
    name: "Hotel Patliputra Continental",
    tagline: "Where Patna's Heritage Meets 5-Star Grandeur",
    address: "PC Golambar, Bypass Crossing, Anisabad, Patna, Bihar 800002, India",
    phone: "+91 612 2250 204",
    phoneAlternate: "+91 7061 552 455 / +91 913 555 1379",
    email: "reservations@hpcpatna.com",
    banquetEmail: "dygm@hpcpatna.com",
    rating: 4.8,
    reviewCount: "2,850+ Verified Reviews",
    checkInTime: "14:00 (2:00 PM)",
    checkOutTime: "12:00 (12:00 PM)",
    coordinates: { lat: 25.585852, lng: 85.09594 },
    certifications: [
      { name: "SAATHI Certified 5-Star Unit", authority: "Quality Council of India" },
      { name: "NIDHI Classified Luxury Property", authority: "Ministry of Tourism, Govt of India" },
      { name: "Travellers' Choice 2024", authority: "TripAdvisor Winner" }
    ]
  },

  rooms: [
    {
      id: "presidential-suite",
      name: "Presidential Suite",
      category: "Signature Suite",
      badge: "Ultimate Opulence",
      tagline: "A Private Regal Haven Perched Above The City",
      sizeSqFt: 1277,
      maxAdults: 4,
      maxChildren: 2,
      maxGuests: 4,
      bedType: "2 Master King Bedrooms",
      view: "Panoramic City Skyline & Runway",
      basePriceINR: 35999,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "The Infinity Presidential Suite is your private royal enclave. Elegantly appointed with two master bedrooms open to an expansive living salon, dining table for 8 guests, 3 high-definition 55-inch smart TVs, private bar counter, and dedicated 24/7 royal butler service with handcrafted cutlery.",
      amenities: [
        "Dedicated 24/7 Royal Butler Service",
        "Separate Living & 8-Seater Dining Salon",
        "Deep Soaking Jacuzzi with Skyline View",
        "Complimentary High-Speed Wi-Fi 6",
        "Two 55\" & One 65\" 4K Smart OLED TVs",
        "Nespresso Espresso & Artisanal Tea Bar",
        "Italian Marble Bathroom with Rain Shower",
        "Luxury Feather Plush Posturepedic Mattress",
        "Complimentary Airport Chauffeur Transfer",
        "Palace Lounge VIP Access with Free Cocktails",
        "Daily Housekeeping & Evening Turndown",
        "Motorized Blackout Drapes & Mood Lighting"
      ]
    },
    {
      id: "tower-suite",
      name: "Tower Honeymoon Suite",
      category: "Signature Suite",
      badge: "Honeymoon Favorite",
      tagline: "Romantic Circular Architecture With Aerial Runway Views",
      sizeSqFt: 672,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "Custom Round Royal King Bed",
      view: "360° Aerial City & Airport Runway View",
      basePriceINR: 17999,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Situated in the exclusive hotel tower, this romantic suite combines contemporary architectural art with an iconic round plush bed, dramatic floor-to-ceiling panoramic windows overlooking the green expanses and the runway.",
      amenities: [
        "Bespoke Round Bed with 600-Thread Count Linen",
        "Floor-to-Ceiling 360° Runway Vista Windows",
        "Palace Lounge Unlimited Access",
        "Complimentary In-Room Welcome Champagne",
        "50\" 4K Smart TV with Satellite Streaming",
        "Luxurious Freestanding Bathtub",
        "Dual-Zone Centralized Climate Control",
        "Complimentary High-Speed Wi-Fi",
        "24-Hour Gourmet In-Room Dining",
        "In-Room Electronic Safe & Minibar"
      ]
    },
    {
      id: "executive-suite",
      name: "Executive Suite",
      category: "Signature Suite",
      badge: "Corporate Elite",
      tagline: "Designed for Dignitaries and High-Profile Travelers",
      sizeSqFt: 747,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed with Ergonomic Workstation",
      view: "Urban Skyline View",
      basePriceINR: 16999,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Specially crafted with fine allegiance for senior executives and VIP guests. Features a distinguished wood-paneled executive lounge, private workspace, customized butler services, and soundproof acoustic architecture.",
      amenities: [
        "Dedicated Ergonomic Workspace & High-Back Leather Chair",
        "24/7 Butler Service with Artisanal Crockery",
        "Unlimited Palace Lounge VIP Access",
        "High-Speed Gigabit Wi-Fi Connectivity",
        "Dual-Line International Telephones",
        "50\" Flat-Screen UHD TV with Video Conferencing Hub",
        "Spacious Granite Bathroom with Walk-in Shower",
        "Daily Fresh Fruit Basket & Newspaper"
      ]
    },
    {
      id: "airport-view-room",
      name: "Airport View Luxury Room",
      category: "City & Runway View",
      badge: "Scenic View",
      tagline: "Watch Flights Take Flight From Your Luxury Bed",
      sizeSqFt: 484,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed or Twin Beds",
      view: "Direct Patna Airport Runway & Garden View",
      basePriceINR: 8000,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "A favorite for business travelers, aviators, and wedding visitors. Features soundproof triple-glazed glass windows with uninterrupted views of the runway, brown & black polished granite luxury bathrooms, and plush bedding.",
      amenities: [
        "Soundproof Acoustic Double Glazed Windows",
        "Brown & Black Polished Granite Bathroom",
        "Complimentary High-Speed Wi-Fi",
        "43\" 4K Smart TV",
        "Posturepedic Luxury Mattress",
        "Coffee & Tea Maker with Premium Pods",
        "In-Room Safe & Mini Refrigerator",
        "24-Hour In-Room Dining"
      ]
    },
    {
      id: "premium-room",
      name: "Grand Premium Room",
      category: "Executive Collection",
      badge: "Popular Choice",
      tagline: "Spacious Comfort Tailored For Business & Leisure",
      sizeSqFt: 432,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed",
      view: "City Panorama",
      basePriceINR: 8000,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Generously proportioned room decorated in soothing neutral tones with rich wooden accents. Equipped with comfortable sitting lounge, workstation, and lavish bathroom with rain shower.",
      amenities: [
        "Plush King-Size Posturepedic Mattress",
        "Spacious Lounge Chair & Coffee Table",
        "Complimentary Wi-Fi Access",
        "40\" HD Smart TV",
        "Individual Climate Control",
        "Electronic Safe, Hairdryer & Ironing Set",
        "Daily Housekeeping & Mineral Water"
      ]
    },
    {
      id: "deluxe-room",
      name: "Classic Deluxe Room",
      category: "Executive Collection",
      badge: "Best Value",
      tagline: "Peaceful Meditative Comfort and 5-Star Amenities",
      sizeSqFt: 351,
      maxAdults: 3,
      maxChildren: 2,
      maxGuests: 3,
      bedType: "King Bed or Twin Beds",
      view: "Courtyard & Garden View",
      basePriceINR: 7000,
      breakfastAddonINR: 1000,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80"
      ],
      description: "Designed for guests seeking tranquil relaxation with high quality woodwork, wooden flooring, Posturepedic bedding, and complete 5-star conveniences at an accessible rate.",
      amenities: [
        "Rich Woodwork & Natural Wood Flooring",
        "Posturepedic Mattress with Feather Pillows",
        "Complimentary High-Speed Wi-Fi",
        "40\" Flat-Screen TV",
        "Tea & Coffee Maker",
        "Centralized Air Conditioning",
        "In-Room Safe & Wardrobe"
      ]
    }
  ],

  dining: [
    {
      id: "saffron",
      name: "Saffron",
      cuisineType: "Multi-Cuisine & Royal Bihari Specialities",
      location: "2nd Floor",
      timings: "Breakfast: 7:30 AM - 10:30 AM | Lunch & Dinner: 12:00 PM - 11:00 PM",
      avgPriceForTwo: 1500,
      phone: "+91 7061 552 463",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85",
      description: "Located on the second floor, Saffron brings the finest international gourmet dishes together with revered regional Bihari royal culinary heritage in a cheerful, opulent ambiance with weekend live classical music and lavish buffets.",
      highlights: ["Lavish Breakfast & Dinner Buffet", "Royal Magadh & Awadhi Signatures", "Live Instrumental Music on Weekends", "Private Dining Section Available"],
      menu: [
        { name: "Champaran Handi Mutton", category: "Chef Special", price: 795, veg: false, description: "Slow-cooked in sealed earthen clay pot with whole garlic pods, mustard oil, and ground heritage spices." },
        { name: "Patliputra Paneer Tikka Lazeez", category: "Starters", price: 545, veg: true, description: "Cottage cheese marinated in saffron, hung curd, and roasted carom seeds, char-grilled in clay tandoor." },
        { name: "Murgh Dum Biryani HPC", category: "Mains", price: 695, veg: false, description: "Fragrant aged basmati rice cooked on slow dum with tender chicken, brown onions, and saffron milk." },
        { name: "Dal Makhani Patliputra", category: "Mains", price: 495, veg: true, description: "Black lentils slow-simmered overnight over charcoal with churned butter and fresh organic cream." },
        { name: "Shahi Tukda & Gulab Jamun", category: "Desserts", price: 345, veg: true, description: "Crisp saffron brioche steeped in cardamom rabri and garnished with slivered Iranian pistachios." }
      ]
    },
    {
      id: "chao-china",
      name: "Chao China",
      cuisineType: "Authentic Cantonese & Pan-Asian Gastronomy",
      location: "1st Floor",
      timings: "Lunch: 12:30 PM - 3:30 PM | Dinner: 7:00 PM - 11:00 PM",
      avgPriceForTwo: 1300,
      phone: "+91 7061 552 463",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
      description: "Chao China delights with vibrant Far Eastern flavors, featuring handmade dim sums, fiery Szechuan wok delicacies, and authentic Cantonese recipes crafted by master Asian specialty chefs.",
      highlights: ["Handcrafted Dim Sum & Bao", "Live Teppanyaki & Wok Station", "Imported Oriental Teas & Mocktails", "Chic Crimson & Dark Walnut Interior"],
      menu: [
        { name: "Truffle Edamame & Crystal Dumplings", category: "Starters", price: 525, veg: true, description: "Steamed translucent pouches with fresh edamame and black truffle aroma." },
        { name: "Crispy Szechuan Prawns", category: "Starters", price: 745, veg: false, description: "Jumbo prawns tossed in wok with dry red chillies, garlic flakes, and roasted Szechuan peppercorns." },
        { name: "Kung Pao Chicken Classic", category: "Mains", price: 625, veg: false, description: "Diced chicken, toasted peanuts, and scallions in a sweet-savory soy glaze." },
        { name: "Stir-Fried Asian Greens & Silken Tofu", category: "Mains", price: 495, veg: true, description: "Pak choi, asparagus, and shiitake mushrooms tossed in ginger-garlic reduction." },
        { name: "Date Pancake with Vanilla Bean Gelato", category: "Desserts", price: 375, veg: true, description: "Golden-fried Chinese pastry stuffed with dates, paired with rich vanilla bean ice cream." }
      ]
    },
    {
      id: "coca-mocha",
      name: "Coca Mocha",
      cuisineType: "Artisanal Bakery, Chocolatier & 24/7 Coffee Lounge",
      location: "Lobby Level",
      timings: "Open 24 Hours",
      avgPriceForTwo: 700,
      phone: "+91 7061 552 463",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85",
      description: "An elegant all-day café and delicatessen offering artisanal breads, single-origin pour-overs, decadent Belgian chocolates, macarons, and light European deli platters in a relaxed lounge setting.",
      highlights: ["Single Origin 100% Arabica Coffees", "Handmade Belgian Chocolate Pralines", "Fresh Artisanal Viennoiserie & Sourdough", "Express High-Speed Business Meeting Booths"],
      menu: [
        { name: "Patliputra Signature Hazelnut Cappuccino", category: "Beverages", price: 295, veg: true, description: "Double espresso shot layered with steamed velvety milk and roasted hazelnut syrup." },
        { name: "Belgian Dark Chocolate Mousse Tart", category: "Desserts", price: 325, veg: true, description: "70% single-origin Callebaut dark chocolate with edible gold leaf garnish." },
        { name: "Smoked Chicken & Avocado Panini", category: "Starters", price: 445, veg: false, description: "Herb-marinated chicken breast, Haas avocado, and gouda cheese on grilled sourdough." },
        { name: "Wild Mushroom & Truffle Croissant", category: "Starters", price: 385, veg: true, description: "Flaky butter croissant baked with sautéed porcini mushrooms and emmental cheese." }
      ]
    }
  ],

  banquets: [
    {
      id: "ashoka-ballroom",
      name: "Ashoka Grand Ballroom",
      type: "Grand Ballroom & Convention Arena",
      areaSqFt: 5110,
      dimensions: "82 ft × 101 ft (9 ft Height)",
      maxCapacity: 400,
      guestEntryPoints: 2,
      idealFor: "Grand Royal Weddings, Mega Conferences, Gala Dinners, Product Launches",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85",
      description: "An expansive, magnificently built pillarless ballroom that stands as Patna's premier venue for society weddings and international corporate summits. Features crystal chandeliers and state-of-the-art acoustics.",
      seatingCapacities: {
        theatre: 275,
        reception: 400,
        circularBanquet: 125,
        uShape: 80,
        boardroom: 80,
        classroom: 80
      },
      features: ["Pillarless Grand Space", "High-Definition 4K Projector & Surround Sound", "Separate Bridal Green Room", "Direct VIP Entrance & Dedicated Valet"]
    },
    {
      id: "mandap-hall",
      name: "Mandap Banquet Hall",
      type: "Contemporary Banquet & Dining Arena",
      areaSqFt: 4129,
      dimensions: "62 ft × 46 ft (9 ft Height)",
      maxCapacity: 200,
      guestEntryPoints: 1,
      idealFor: "Sangeet Ceremonies, Engagement Parties, Corporate Seminars, Annual Dinners",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85",
      description: "Located on the ground floor with abundant natural light, beautifully finished marble floors, and a dedicated attached culinary buffet arena. Seamlessly integrates meeting and dining needs.",
      seatingCapacities: {
        theatre: 100,
        reception: 200,
        circularBanquet: 75,
        uShape: 50,
        boardroom: 50,
        classroom: 50
      },
      features: ["Attached Dedicated Buffet Arena", "Abundant Natural Lighting", "Acoustic Wall Panels", "Flexible Stage Setups"]
    },
    {
      id: "mehfil-hall",
      name: "Mehfil Banquet Lounge",
      type: "Luxury Veneer & Carpeted Hall",
      areaSqFt: 3262,
      dimensions: "62 ft × 45 ft (9 ft Height)",
      maxCapacity: 200,
      guestEntryPoints: 1,
      idealFor: "Cocktail Receptions, Corporate Board Meetings, Private Family Banquets",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      description: "An exquisitely designed banquet space with rich wood veneer paneling, acoustic plush carpeted floors, and ambient warm lighting for upscale corporate and social events.",
      seatingCapacities: {
        theatre: 100,
        reception: 200,
        circularBanquet: 75,
        uShape: 50,
        boardroom: 50,
        classroom: 50
      },
      features: ["Rich Teak Veneer Walls", "Acoustic Plush Carpet Flooring", "Built-in Sound System", "Custom Mood Lighting"]
    },
    {
      id: "diamond-boardroom",
      name: "Diamond Executive Boardroom",
      type: "High-Tech Corporate Boardroom",
      areaSqFt: 450,
      dimensions: "25 ft × 18 ft",
      maxCapacity: 30,
      guestEntryPoints: 1,
      idealFor: "Board Meetings, Video Conferences, Investor Pitches, High-Level Consultations",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      description: "An intimate boardroom with ergonomic leather seating, motorized video conference displays, integrated microphones, and high-speed enterprise telecommunication infrastructure.",
      seatingCapacities: {
        theatre: 30,
        reception: 30,
        circularBanquet: 0,
        uShape: 22,
        boardroom: 22,
        classroom: 18
      },
      features: ["85\" Interactive 4K Touch Screen", "Cisco Video Conferencing", "Wireless Content Sharing", "Private Butler Service Bar"]
    }
  ],

  wellness: [
    {
      id: "ocean-spa",
      name: "Ocean Spa & Ayurvedic Salon",
      tagline: "Sanctuary of Healing & Rejuvenation",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
      description: "Indulge in time-tested Ayurvedic therapies, Swedish relaxation rituals, deep tissue massage, and bridal grooming packages performed by certified master therapists.",
      services: [
        { name: "Royal Ayurvedic Abhyanga Massage", duration: "75 Mins", price: 3800, desc: "Warm herbal medicated oils infused with botanical extracts to revitalize prana." },
        { name: "Swedish De-stress Therapy", duration: "60 Mins", price: 3200, desc: "Gentle rhythmic effleurage strokes to release muscular fatigue and stress." },
        { name: "Deep Tissue Muscle Recovery", duration: "60 Mins", price: 3500, desc: "Firm targeted acupressure pressure targeting deeper muscular tensions." },
        { name: "Saffron Radiance Facial & Polish", duration: "60 Mins", price: 2900, desc: "Organic saffron and sandalwood skin rejuvenation treatment." }
      ]
    },
    {
      id: "swimming-pool",
      name: "Skyview Swimming Pool",
      tagline: "Temperature-Controlled Azure Oasis",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
      description: "Immerse in crystal blue waters on our sun terrace with plush sun loungers, poolside beverage service, and a separate children's wading pool.",
      features: ["Temperature Controlled Water", "Poolside Loungers & Towel Service", "Dedicated Lifeguards on Duty", "Complimentary for In-House Guests"]
    },
    {
      id: "fitness-gym",
      name: "HPC Elite Fitness Club",
      tagline: "State-of-the-Art Wellness Technology",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      description: "Equipped with the latest LifeFitness cardio machinery, free weights, cable stations, stretching zone, and on-demand certified personal fitness trainers.",
      features: ["LifeFitness Treadmills & Ellipticals", "Comprehensive Free Weight Zone", "Steam & Sauna Rooms", "Open 6:00 AM - 10:00 PM"]
    }
  ],

  destinations: [
    {
      id: "nalanda-university",
      name: "Nalanda Mahavihara (UNESCO)",
      distance: "82 km from Hotel",
      travelTime: "1 hr 45 min drive",
      image: "assets/img/destinations/nalanda.webp",
      description: "One of ancient history's most renowned residential universities and a UNESCO World Heritage site, active from the 5th to 13th centuries CE, where scholars from across the globe studied Buddhist philosophy, mathematics, and astronomy."
    },
    {
      id: "takht-patna-sahib",
      name: "Takht Sri Harmandir Ji (Patna Sahib)",
      distance: "14 km from Hotel",
      travelTime: "30 min drive",
      image: "assets/img/destinations/takht-patna-sahib.webp",
      description: "One of the five sacred Takhts of Sikhism, commemorating the birthplace of the tenth Guru, Guru Gobind Singh Ji in 1666. Built by Maharaja Ranjit Singh with white marble and intricate gold work."
    },
    {
      id: "padri-ki-haveli",
      name: "Padri Ki Haveli & Old Church",
      distance: "12 km from Hotel",
      travelTime: "25 min drive",
      image: "assets/img/destinations/padri-ki-haveli.webp",
      description: "The oldest church in Bihar, redesign by Venetian architect Tirreto in 1772. Known for its historical European architecture and ancient cathedral bells."
    },
    {
      id: "vaishali",
      name: "Ancient Vaishali Republic",
      distance: "55 km from Hotel",
      travelTime: "1 hr 15 min drive",
      image: "assets/img/destinations/vaishali.webp",
      description: "The world's earliest known democratic republic where Lord Buddha preached his last sermon, featuring the famed intact Ashoka Pillar topped with an Asiatic lion."
    },
    {
      id: "patna-zoo",
      name: "Sanjay Gandhi Zoological Garden",
      distance: "4.5 km from Hotel",
      travelTime: "12 min drive",
      image: "assets/img/destinations/patna-zoo.webp",
      description: "Expansive 150-acre botanical and zoological park near Bailey Road featuring over 800 species of flora, fauna, safari walks, and a scenic lake."
    }
  ],

  specialOffers: [
    {
      id: "royal-honeymoon",
      code: "HONEYMOON",
      title: "Royal Honeymoon Retreat",
      discountPercent: 15,
      description: "Stay in the Tower Suite or Presidential Suite with complimentary sparkling champagne, candlelit dinner at Saffron, 60-minute couple's spa session, and late checkout.",
      badge: "Exclusive Package"
    },
    {
      id: "advance-booking",
      code: "ROYAL10",
      title: "Advance Purchase 10% Off",
      discountPercent: 10,
      description: "Book 7+ days in advance on any luxury room or suite and enjoy 10% off the best flexible rate plus daily gourmet breakfast buffet.",
      badge: "Best Rate Guarantee"
    },
    {
      id: "weekend-spa-getaway",
      code: "SPA20",
      title: "Weekend Spa & Gastronomy Escape",
      discountPercent: 12,
      description: "Includes ₹1,500 spa credit at Ocean Spa, 20% discount on Saffron and Chao China dining, and complimentary airport pickup.",
      badge: "Weekend Special"
    }
  ],

  testimonials: [
    {
      guestName: "Vikramaditya Singhania",
      role: "Managing Director, Global Logistics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      title: "Unrivaled 5-Star Luxury in Bihar",
      comment: "Hotel Patliputra Continental sets an astonishing benchmark. The Presidential Suite was immaculate, the butler service was as courteous as the Taj, and Saffron's Champaran mutton was extraordinary. My preferred residence in Patna."
    },
    {
      guestName: "Dr. Ananya Roy",
      role: "International Medical Delegate",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      title: "Flawless Conference & Airport Proximity",
      comment: "We hosted our national symposium at the Ashoka Ballroom for 350 doctors. The audiovisual tech, high ceiling, seamless catering, and courteous banquet staff were world-class. Being 5 minutes from the airport was a massive plus."
    },
    {
      guestName: "Rohan & Megha Verma",
      role: "Newlyweds",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
      rating: 5,
      title: "The Tower Suite was Dreamy!",
      comment: "We spent our honeymoon in the Tower Suite. Watching the runway and Patna city lights from the unique circular bed with champagne was magical. The Ocean Spa couple massage left us completely refreshed!"
    }
  ]
};

// Export to window for browser use
if (typeof window !== 'undefined') {
  window.HOTEL_DATA = HOTEL_DATA;
}
