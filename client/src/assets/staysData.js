export const CATEGORIES = [
  { id: "all", label: "All Homes", icon: "Compass", description: "Explore all handcrafted stays" },
  { id: "beachfront", label: "Beachfront", icon: "Waves", description: "Steps away from white sand & ocean waves" },
  { id: "villas", label: "Luxury Villas", icon: "Crown", description: "Private pools, estates & world-class luxury" },
  { id: "cabins", label: "Cabins & Chalets", icon: "Trees", description: "Cozy fireside hideaways in the alpine mountains" },
  { id: "cities", label: "Iconic Cities", icon: "Building2", description: "Chic penthouses & lofts in world capitals" },
  { id: "castles", label: "Castles & Mansions", icon: "Castle", description: "Historic grandeur and timeless architecture" },
  { id: "treehouses", label: "Treehouses & Eco", icon: "Tent", description: "Immersive nature canopy retreats" },
  { id: "lakefront", label: "Lakefront", icon: "Anchor", description: "Private docks, kayaking, and serene water views" },
  { id: "tropical", label: "Tropical Islands", icon: "Palmtree", description: "Lush jungles, overwater bungalows, and island escapes" }
];

export const INITIAL_STAYS = [
  {
    id: "wl-101",
    title: "The Celestial Cliffside Sanctuary",
    tagline: "Panoramic Aegean sunset views with private infinity heated cave pool",
    category: "beachfront",
    type: "Entire Luxury Cave Villa",
    city: "Oia, Santorini",
    country: "Greece",
    price: 28500,
    cleaningFee: 2500,
    serviceFee: 1800,
    currency: "INR",
    rating: 4.98,
    reviewsCount: 142,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    highlight: "Guest Favorite",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Eleni Vassiliou",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 6,
      responseRate: "100%",
      responseTime: "within an hour"
    },
    description: "Perched high on the caldera edge of Oia, The Celestial Cliffside Sanctuary blends traditional Cycladic architecture with modern luxury. Wake up to breathtaking unobstructed views of the volcanic caldera, relax in your private heated cave infinity pool, and enjoy Greek wine as the world's most famous sunset paints the sky.",
    amenities: [
      "Infinity Heated Pool",
      "Panoramic Caldera View",
      "High-Speed Fiber WiFi (350 Mbps)",
      "Daily Chef Breakfast Included",
      "Air Conditioning",
      "Wine Cellar & Bar",
      "Luxury King Beds",
      "Sunset Private Terrace",
      "Dedicated Concierge"
    ],
    reviews: [
      {
        id: "rev-1",
        author: "Sophia Laurent",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        date: "May 2026",
        rating: 5,
        comment: "An absolute dream come true. The private cave pool looking over the caldera at golden hour is something you have to experience once in your life. Eleni was the most attentive host!"
      },
      {
        id: "rev-2",
        author: "Marcus Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        date: "April 2026",
        rating: 5,
        comment: "Worth every single rupee. Impeccable cleanliness, five-star breakfast served on the terrace every morning, and total tranquility."
      }
    ]
  },
  {
    id: "wl-102",
    title: "Hideout Bamboo Eco-Palace & Lagoon",
    tagline: "Eco-architectural bamboo masterpiece nestled in the lush Bali jungle river valley",
    category: "tropical",
    type: "Entire Artisan Bamboo Villa",
    city: "Sidemen, Bali",
    country: "Indonesia",
    price: 14200,
    cleaningFee: 1500,
    serviceFee: 1200,
    currency: "INR",
    rating: 4.96,
    reviewsCount: 218,
    maxGuests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 1.5,
    highlight: "Rare Find",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Wayan & Ketut",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 8,
      responseRate: "99%",
      responseTime: "within a few minutes"
    },
    description: "Immerse yourself in authentic Balinese tranquility. Crafted entirely from sustainable black bamboo, this open-concept architectural gem features a natural plunge pool fed by spring water, stargazing nets above the river, and outdoor stone soaking baths.",
    amenities: [
      "Natural River Plunge Pool",
      "Jungle & Mountain Views",
      "High-speed Starlink WiFi",
      "Floating Breakfast Available",
      "Open-Air Rain Shower",
      "Yoga Shala & Mats",
      "Scooter Rental Available",
      "Pet Friendly"
    ],
    reviews: [
      {
        id: "rev-3",
        author: "Emma Watson-Davis",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
        date: "June 2026",
        rating: 5,
        comment: "Pure magic. Falling asleep to the soothing sounds of the jungle river and waking up surrounded by palm trees was soul refreshing."
      }
    ]
  },
  {
    id: "wl-103",
    title: "The Matterhorn Glass Alpine Chalet",
    tagline: "Ski-in / ski-out luxury chalet with panoramic glass walls and heated cedar hot tub",
    category: "cabins",
    type: "Entire Luxury Alpine Chalet",
    city: "Zermatt",
    country: "Switzerland",
    price: 42000,
    cleaningFee: 3500,
    serviceFee: 2400,
    currency: "INR",
    rating: 4.99,
    reviewsCount: 97,
    maxGuests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    highlight: "Superhost",
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Hansruedi Keller",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 10,
      responseRate: "100%",
      responseTime: "within an hour"
    },
    description: "Experience the Swiss Alps like never before. Located directly on the ski slopes of Zermatt with front-row Matterhorn views, this ultra-luxury timber and glass lodge boasts a private sauna, outdoor hot tub overlooking snow-capped peaks, and a roaring stone fireplace.",
    amenities: [
      "Ski-in / Ski-out Access",
      "Matterhorn Mountain View",
      "Outdoor Heated Cedar Hot Tub",
      "Nordic Pine Sauna",
      "Wood-Burning Fireplace",
      "Gourmet Fondue & Raclette Setup",
      "Floor-to-Ceiling Glass Views",
      "Heated Ski Boot Room"
    ],
    reviews: [
      {
        id: "rev-4",
        author: "Oliver Jensen",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
        date: "February 2026",
        rating: 5,
        comment: "Watching the sun rise over the Matterhorn from the steaming hot tub is unforgettable. The ski slope is literally right outside the front door!"
      }
    ]
  },
  {
    id: "wl-104",
    title: "Villa Positano Bella Vista",
    tagline: "Historic Amalfi clifftop villa with lemon groves, private boat charter & seaside terrace",
    category: "villas",
    type: "Entire Historic Italian Villa",
    city: "Positano, Amalfi Coast",
    country: "Italy",
    price: 58000,
    cleaningFee: 4500,
    serviceFee: 3200,
    currency: "INR",
    rating: 4.97,
    reviewsCount: 88,
    maxGuests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    highlight: "Guest Favorite",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Matteo & Giulia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 7,
      responseRate: "100%",
      responseTime: "within an hour"
    },
    description: "An authentic slice of Italian paradise. Set amidst centuries-old fragrant lemon orchards with sweeping vistas of the Tyrrhenian Sea, Villa Positano features hand-painted Vietri tiles, expansive dining terraces, private sea stairs, and sunset aperitivo lounge.",
    amenities: [
      "Private Cliffside Sea Access",
      "Lemon Grove Garden",
      "Wood-Fired Pizza Oven",
      "Private Boat Excursions to Capri",
      "Air Conditioning in all Suites",
      "High-Speed Wifi",
      "Outdoor Dining for 10",
      "Wine Sommelier Tasting"
    ],
    reviews: [
      {
        id: "rev-5",
        author: "Claire DeWitt",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
        date: "July 2026",
        rating: 5,
        comment: "Positano at its finest. Making homemade pizza with fresh lemons picked directly from the garden while overlooking the sparkling coastline was pure joy."
      }
    ]
  },
  {
    id: "wl-105",
    title: "Kyoto Heritage Machiya & Zen Garden",
    tagline: "120-year-old restored samurai district residence with Hinoki cypress bath & tea room",
    category: "cities",
    type: "Entire Traditional Japanese Machiya",
    city: "Gion, Kyoto",
    country: "Japan",
    price: 18500,
    cleaningFee: 2000,
    serviceFee: 1500,
    currency: "INR",
    rating: 4.99,
    reviewsCount: 175,
    maxGuests: 5,
    bedrooms: 2,
    beds: 4,
    baths: 2,
    highlight: "Trending",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Kenji Takahashi",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 9,
      responseRate: "100%",
      responseTime: "within an hour"
    },
    description: "Step into timeless Japanese elegance in the historic heart of Gion. Painstakingly preserved with tatami rooms, hand-carved cedar screens, a private interior dry stone Zen garden, and an aromatic natural Hinoki cypress soaking tub.",
    amenities: [
      "Private Zen Rock Garden",
      "Natural Hinoki Soaking Tub",
      "Traditional Tatami Tea Room",
      "Modern Heated Floors",
      "Ultra-Fast WiFi",
      "Kimono Experience & Guide",
      "Walking Distance to Yasaka Shrine",
      "Nespresso & Organic Matcha"
    ],
    reviews: [
      {
        id: "rev-6",
        author: "Hiroshi & Sarah",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
        date: "May 2026",
        rating: 5,
        comment: "Stepping into this Machiya after a day walking Kyoto was like stepping into another era. The Hinoki tub smells heavenly."
      }
    ]
  },
  {
    id: "wl-106",
    title: "Château de Chambord Vineyard Estate",
    tagline: "17th-century Loire Valley castle with private wine cellar and moat gardens",
    category: "castles",
    type: "Entire French Renaissance Castle",
    city: "Amboise, Loire Valley",
    country: "France",
    price: 85000,
    cleaningFee: 6500,
    serviceFee: 4500,
    currency: "INR",
    rating: 4.95,
    reviewsCount: 64,
    maxGuests: 12,
    bedrooms: 6,
    beds: 8,
    baths: 6,
    highlight: "Rare Find",
    images: [
      "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Countess Henriette",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 12,
      responseRate: "98%",
      responseTime: "within 2 hours"
    },
    description: "Live like French royalty in this magnificent 17th-century estate. Surrounded by 40 acres of private vineyards, rose gardens, and a freshwater moat, the castle offers vaulted ceilings, antique fireplaces, a grand ballroom, and a private sommelier.",
    amenities: [
      "Private 40-Acre Vineyard Estate",
      "Grand Fireplaces in Every Suite",
      "Private Wine Cellar & Sommelier",
      "Heated Swimming Pool",
      "Billiard Room & Library",
      "Private Chef Available",
      "Helipad on Grounds",
      "Equestrian Trails"
    ],
    reviews: [
      {
        id: "rev-7",
        author: "Alexander Rothschild",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        date: "June 2026",
        rating: 5,
        comment: "Hosting our family reunion at Château de Chambord was an experience of a lifetime. The history, the wine, the atmosphere were breathtaking."
      }
    ]
  },
  {
    id: "wl-107",
    title: "Tulum Canopy Treehouse & Cenote Oasis",
    tagline: "Eco-chic jungle canopy retreat with private rooftop plunge pool and direct private cenote",
    category: "treehouses",
    type: "Entire Designer Jungle Treehouse",
    city: "Tulum, Quintana Roo",
    country: "Mexico",
    price: 19500,
    cleaningFee: 1800,
    serviceFee: 1400,
    currency: "INR",
    rating: 4.97,
    reviewsCount: 163,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    highlight: "Guest Favorite",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Rodrigo & Sofia",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 5,
      responseRate: "100%",
      responseTime: "within an hour"
    },
    description: "Suspended in the Maya jungle canopy just minutes from Tulum beach. Features solar-powered luxury, outdoor copper bathtubs, rooftop stargazing hammock nets, and exclusive private access to a crystal-clear natural cenote.",
    amenities: [
      "Direct Private Cenote Access",
      "Rooftop Jungle Plunge Pool",
      "Starlink High-Speed WiFi",
      "Custom Copper Outdoor Tub",
      "Complimentary Vintage Beach Bikes",
      "Artisan Mezcal Welcome Bar",
      "Solar Air Conditioning",
      "Daily Housekeeping"
    ],
    reviews: [
      {
        id: "rev-8",
        author: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
        date: "May 2026",
        rating: 5,
        comment: "Swimming in the private cenote in the morning mist with no one else around was transcendent. The treehouse design is out of Architectural Digest."
      }
    ]
  },
  {
    id: "wl-108",
    title: "Lake Como Floating Glass Boathouse",
    tagline: "Private water villa with dock, wooden Riva speedboat and dramatic mountain panoramas",
    category: "lakefront",
    type: "Entire Luxury Lakefront Villa",
    city: "Bellagio, Lake Como",
    country: "Italy",
    price: 48000,
    cleaningFee: 3800,
    serviceFee: 2800,
    currency: "INR",
    rating: 4.98,
    reviewsCount: 112,
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    highlight: "Guest Favorite",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80"
    ],
    host: {
      name: "Alessandro Riva",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
      isSuperhost: true,
      hostingYears: 8,
      responseRate: "100%",
      responseTime: "within an hour"
    },
    description: "Float above the crystalline waters of Lake Como. This ultra-modern glass boathouse in Bellagio offers 360-degree views of the Alps and lake, a private sundeck over the water, custom wine bar, and a classic wooden speedboat moored at your doorstep.",
    amenities: [
      "Private Boat Dock & Kayaks",
      "360° Lake & Alpine Panorama",
      "Waterfront Sun Deck & Lounge",
      "Italian Espresso Bar",
      "High-Speed Fiber WiFi",
      "Air Conditioning & Heating",
      "Close to Bellagio Center",
      "Private Sunset Cruise Booking"
    ],
    reviews: [
      {
        id: "rev-9",
        author: "Julian & Kate",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
        date: "June 2026",
        rating: 5,
        comment: "Unbelievable location right on the water. Having our morning cappuccino on the dock watching the ferries glide by was heavenly."
      }
    ]
  }
];

