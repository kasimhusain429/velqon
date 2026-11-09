export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  subtitle: string;
  heading?: string;
  col1?: string;
  col2?: string;
  material: string;
  origin: string;
  dimensions: string;
  description?: string;
  images?: string[];
}

export interface GalleryRoom {
  id: number;
  slug: string;
  number: string;
  name: string;
  title: string;
  subtitle: string;
  floor: 'Underground' | 'Ground Floor' | 'First Floor' | 'Sky Terrace';
  image: string;
  hotspot: {
    id: string;
    x: number;
    y: number;
    title: string;
    subtitle: string;
    heading: string;
    col1: string;
    col2: string;
    material: string;
    origin: string;
    dimensions: string;
    images: string[];
  };
}

export interface RoomData {
  id: number;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  textAlign: "left" | "right";
  hotspots: any[];
}

export interface FloorInfo {
  id: string;
  name: string;
  label: string;
  number: string;
  subtitle: string;
  description: string;
  roomsCount: number;
  isoImage: string;
  defaultRoomIndex: number;
}

export const floorsData: FloorInfo[] = [
  {
    id: 'underground',
    name: 'Underground',
    label: 'Level -1',
    number: '-1',
    subtitle: 'Material Library & Joinery Ateliers',
    description: 'The tactile foundation of VELQON, housing raw stone slabs, custom wood finishes, and acoustic prototyping labs.',
    roomsCount: 4,
    isoImage: '/images/rooms/iso-underground-pure.png',
    defaultRoomIndex: 3,
  },
  {
    id: 'ground-floor',
    name: 'Ground Floor',
    label: 'Level 0',
    number: '0',
    subtitle: 'The Living Pavilion & Exhibition Rooms',
    description: 'The main public and residential spaces, blending monolithic travertine finishes, fluted oak, and seamless fluid transitions.',
    roomsCount: 8,
    isoImage: '/images/rooms/iso-ground-pure.png',
    defaultRoomIndex: 0,
  },
  {
    id: 'first-floor',
    name: 'First Floor',
    label: 'Level +1',
    number: '+1',
    subtitle: 'Primary Suites & Culinary Atelier',
    description: 'Whisper-quiet dining suites, backlit onyx tasting cellars, and monolithic stone bars designed for restoration and intimate calm.',
    roomsCount: 5,
    isoImage: '/images/rooms/iso-first-pure.png',
    defaultRoomIndex: 5,
  },
  {
    id: 'sky-terrace',
    name: 'Pop-Up Window',
    label: 'Level +2',
    number: '+2',
    subtitle: 'Architectural Salon & Daybed Horizon',
    description: 'Bespoke fluted wall reliefs, sculptural daybeds, and private consultation lounges calibrated for deep focus and spatial quietude.',
    roomsCount: 3,
    isoImage: '/images/rooms/iso-first-pure.png',
    defaultRoomIndex: 7,
  },
];

export const galleryRooms: GalleryRoom[] = [
  {
    id: 1,
    slug: 'reception-bar',
    number: '01',
    name: 'Reception Bar',
    title: 'THE RECEPTION LOUNGE',
    subtitle: 'Smoked Oak & Travertine Monolith',
    floor: 'Ground Floor',
    image: '/images/rooms/room-ground-bar-pure.png',
    hotspot: {
      id: 'pin-1',
      x: 27.1,
      y: 47.8,
      title: 'VELQON RECEPTION BAR',
      subtitle: 'Fluted Oak Slat Wall & Honed Travertine Plinth',
      heading: 'Real and virtual: the new VELQON Gallery is a sensory experience, blending physical craft and architectural silence.',
      col1: 'Within this space lies the heart of VELQON, where architectural research takes center stage — driving the curation of rare mineral stones alongside precision joinery that brings noble surfaces to life.',
      col2: 'A gallery where tactile values take shape, color, and texture: an immersive environment extending beyond mere decoration into the art of quiet contemplation.',
      material: 'Roman Travertine Classico & Smoked French Oak',
      origin: 'Tivoli, Italy & VELQON Dubai Atelier',
      dimensions: 'Counter: 6200 x 950 x 920 mm',
      images: [
        '/images/rooms/material-1.jpg',
        '/images/rooms/material-2.jpg',
        '/images/rooms/material-3.jpg',
        '/images/rooms/material-4.jpg',
      ],
    },
  },
  {
    id: 2,
    slug: 'alchimia-living',
    number: '02',
    name: 'Alchimia Living',
    title: 'THE LIVING SALON',
    subtitle: 'Floating Bronze Fireplace & Low Sectional',
    floor: 'Ground Floor',
    image: '/images/rooms/room-fireplace.jpg',
    hotspot: {
      id: 'pin-2',
      x: 48,
      y: 60,
      title: 'LINEAR FIREPLACE & SALON',
      subtitle: 'Patinated Architectural Bronze & Monolithic Plinth',
      heading: 'An ancient art of transformation, a seemingly magical process that redefines interior spatial volume.',
      col1: 'With our custom hearth treatments, a wall or furnishing becomes a monumental narrative. Raw textured plaster and fluted bronze meet low-slung Italian bouclé seating.',
      col2: 'The transformation is silent yet ever-present, an architectural hearth that anchors family gatherings without demanding visual excess.',
      material: 'Hand-patinated Cast Bronze & Charcoal Lime Plaster',
      origin: 'Venice, Italy & Dubai Ateliers',
      dimensions: 'Hearth plinth: 4800 x 1200 x 300 mm',
      images: [
        '/images/rooms/material-2.jpg',
        '/images/rooms/material-1.jpg',
        '/images/rooms/room-fireplace.jpg',
      ],
    },
  },
  {
    id: 3,
    slug: 'dining-pavilion',
    number: '03',
    name: 'Dining Pavilion',
    title: 'THE DINING ROOM',
    subtitle: 'Ten-Seater Oak Table & Linear Luminaire',
    floor: 'Ground Floor',
    image: '/images/rooms/room-2.jpg',
    hotspot: {
      id: 'pin-3',
      x: 52,
      y: 54,
      title: 'BESPOKE DINING TABLE',
      subtitle: 'Solid Smoked European White Oak',
      heading: 'Design for a better life. Spaces calibrated for the rituals of gathering and celebration.',
      col1: 'Crafted from mature European white oak, smoked over organic oils to reveal deep grain fissures, paired with invisible mortise joinery that allows the tabletop to hover gracefully.',
      col2: 'Illuminated by a commissioned fluted bronze chandelier that casts a soft, candle-like 2700K temperature across the table plane.',
      material: 'Solid European Oak & Handblown Frosted Glass',
      origin: 'Black Forest, Germany',
      dimensions: '3600 x 1150 x 750 mm',
      images: [
        '/images/rooms/material-3.jpg',
        '/images/rooms/material-1.jpg',
        '/images/rooms/room-2.jpg',
      ],
    },
  },
  {
    id: 4,
    slug: 'material-library',
    number: '04',
    name: 'Material Archive',
    title: 'TACTILE ATELIER',
    subtitle: 'Magnetic Stone Slabs & Textile Pulls',
    floor: 'Underground',
    image: '/images/rooms/room-underground-archive-pure.png',
    hotspot: {
      id: 'pin-4',
      x: 18.4,
      y: 61.1,
      title: 'MAGNETIC STONE ARCHIVE',
      subtitle: 'Interchangeable Mineral Swatches',
      heading: 'Smart curation goes tactile. An interactive library of quarried marbles, onyx, and natural linen.',
      col1: 'Our bespoke magnetic dry-mounting system allows clients to arrange and touch stone specimens side-by-side under various natural light spectra.',
      col2: 'From honed Calacatta Viola to dark Grigio Carnico, every sample is authenticated with quarry coordinates and extraction dates.',
      material: 'Honed Marbles, Travertines & Belgian Linens',
      origin: 'Italy, Spain, Switzerland',
      dimensions: 'Archive modular wall: 7200 x 3200 mm',
      images: [
        '/images/rooms/material-1.jpg',
        '/images/rooms/material-4.jpg',
        '/images/rooms/material-2.jpg',
        '/images/rooms/material-3.jpg',
      ],
    },
  },
  {
    id: 5,
    slug: 'billiard-hall',
    number: '05',
    name: 'Exhibition Hall',
    title: 'SCULPTURAL GALLERY',
    subtitle: 'Monolithic Stone Billiard Table & Art Vitrines',
    floor: 'Ground Floor',
    image: '/images/rooms/room-billiard.jpg',
    hotspot: {
      id: 'pin-5',
      x: 50,
      y: 58,
      title: 'SCULPTURAL BILLIARD TABLE',
      subtitle: 'Solid Carved Romano Travertine Base',
      heading: 'Beauty and Art. A monumental exhibition space where architecture meets play.',
      col1: 'Commissioned as an architectural sculpture as much as a tournament-grade billiard table, carved from two bookmatched travertine blocks with concealed slate leveling.',
      col2: 'Set beneath museum-grade directional spotlights that eliminate shadows across the playing field while maintaining moody ambient peripheral light.',
      material: 'Solid Roman Travertine & Worsted Wool Baize',
      origin: 'Tivoli, Italy & Simonis, Belgium',
      dimensions: '9-foot regulation: 2900 x 1630 x 820 mm',
      images: [
        '/images/rooms/material-2.jpg',
        '/images/rooms/room-billiard.jpg',
      ],
    },
  },
  {
    id: 6,
    slug: 'kitchen-monolith',
    number: '06',
    name: 'Kitchen Atelier',
    title: 'THE KITCHEN',
    subtitle: 'Grigio Carnico Marble Island & Pocket Joinery',
    floor: 'First Floor',
    image: '/images/rooms/room-first-kitchen-pure.png',
    hotspot: {
      id: 'pin-6',
      x: 69.7,
      y: 53.8,
      title: 'MONOLITHIC MARBLE ISLAND & ONYX CELLAR',
      subtitle: 'Continuous Bookmatched Charcoal Stone & Ribbed Oak',
      heading: 'Feel free to touch. Precision architectural engineering concealed behind solid quarried stone.',
      col1: 'The induction cooking zones and downdraft ventilation are integrated directly beneath the stone surface, leaving a pure, uninterrupted monolithic block for preparation and dining.',
      col2: 'Suspended industrial metal stemware racks and illuminated fluted onyx display walls keep grand cru selections at precisely calibrated resting temperatures.',
      material: 'Honed Grigio Carnico & Backlit Fluted Onyx',
      origin: 'Friuli, Italy & Shiraz Quarries',
      dimensions: '3800 x 1250 x 920 mm',
      images: [
        '/images/rooms/material-4.jpg',
        '/images/rooms/material-3.jpg',
        '/images/rooms/material-1.jpg',
      ],
    },
  },
  {
    id: 7,
    slug: 'primary-suite',
    number: '07',
    name: 'Primary Suite',
    title: 'PRIMARY SUITE',
    subtitle: 'Acoustic Slats & Platform Floating Bed',
    floor: 'First Floor',
    image: '/images/rooms/room-4.jpg',
    hotspot: {
      id: 'pin-7',
      x: 55,
      y: 58,
      title: 'PLATFORM FLOATING BED',
      subtitle: 'Belgian Linen & Acoustic Walnut Slats',
      heading: 'Whisper-quiet restoration. An acoustic sanctuary calibrated for deep rest and morning contemplation.',
      col1: 'Micro-perforated acoustic timber slats line the headboard wall, damping ambient reverberation to recording-studio standards.',
      col2: 'The low-profile floating bed base features integrated nightstands, wireless induction docks, and motorized blackout drapery controls.',
      material: 'American Walnut, Belgian Bouclé & Raw Linen',
      origin: 'Antwerp, Belgium & Dubai Atelier',
      dimensions: '2200 x 2400 x 880 mm',
      images: [
        '/images/rooms/material-2.jpg',
        '/images/rooms/room-4.jpg',
      ],
    },
  },
  {
    id: 8,
    slug: 'stone-bath',
    number: '08',
    name: 'Pop-Up Salon',
    title: 'THE SCULPTURAL SALON',
    subtitle: 'Fluted Relief Panels & Daybed',
    floor: 'Sky Terrace',
    image: '/images/rooms/room-popup-salon-pure.png',
    hotspot: {
      id: 'pin-8',
      x: 44.2,
      y: 68.7,
      title: 'FLUTED WALL RELIEF & SCULPTURAL DAYBED',
      subtitle: 'Carved Architectural Panels & Cast Bronze Accent',
      heading: 'Quietude and Light. Natural illumination filtering through rhythmically fluted architectural planes.',
      col1: 'Geometric rhythm meets tactile softness in this private consultation lounge, anchored by a custom cylindrical cocktail plinth and Italian daybed with terracotta piping.',
      col2: 'Subtle cove lighting outlines the perimeter, creating gentle shadow gradients across each sculpted travertine groove as day transitions to evening.',
      material: 'Sculpted Matte Travertine, Cast Bronze & Woven Wool',
      origin: 'Rome, Italy & VELQON Atelier',
      dimensions: 'Lounge suite: 4200 x 3800 mm',
      images: [
        '/images/rooms/material-3.jpg',
        '/images/rooms/material-1.jpg',
        '/images/rooms/material-2.jpg',
      ],
    },
  },
];

export interface Project {
  slug: string;
  title: string;
  category: "Residential" | "Hospitality" | "Commercial" | "Penthouse";
  location: string;
  year: string;
  area: string;
  client: string;
  duration: string;
  coverImage: string;
  gallery: string[];
  tagline: string;
  overview: string;
  concept: string;
  materials: { name: string; type: string; color: string }[];
  featured?: boolean;
  span?: string;
}

export interface Service {
  number: string;
  id: string;
  title: string;
  tagline: string;
  description: string;
  scope: string[];
  deliverables: string[];
  timeline: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  qualification: string;
  bio: string;
  image: string;
}

export interface Enquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
  status: "New" | "Contacted" | "Proposal Sent" | "In Progress" | "Closed";
  createdAt: string;
}

// 7 Cinematic Walkthrough Rooms matching the Reference Videos
export const roomsData: RoomData[] = [
  {
    id: 1,
    number: "01",
    label: "LIVING",
    title: "THE LIVING\nSPACE",
    subtitle: "Where The Day Gathers.",
    quote: "A monolithic sanctuary sculpted from lime plaster and continuous low-slung seating.",
    image: "/images/rooms/room-1.jpg",
    textAlign: "left",
    hotspots: [
      {
        id: "h1-1",
        x: 48,
        y: 68,
        title: "Monolithic Travertine Coffee Table",
        subtitle: "Honed Roman Travertine",
        material: "Natural Unfilled Roman Travertine",
        origin: "Tivoli, Italy",
        dimensions: "1800 x 950 x 280 mm",
        description: "Carved from a single quarried block with subtle vein detailing and softened chamfered perimeter.",
      },
      {
        id: "h1-2",
        x: 22,
        y: 62,
        title: "Custom Low-Slung Lounge Sectional",
        subtitle: "Charcoal Bouclé & Smoked Oak",
        material: "Dedar Milano Bouclé Fabric",
        origin: "Milan, Italy",
        dimensions: "4200 x 3100 x 640 mm",
        description: "Bespoke continuous profile sitting deep within the architectural floor plane with dual-density down fill.",
      },
      {
        id: "h1-3",
        x: 82,
        y: 42,
        title: "Recessed Architectural Cove Luminaire",
        subtitle: "2700K Warm Dim Architectural Lighting",
        material: "Micro-prismatic Diffuser / Flos Architecture",
        origin: "Brescia, Italy",
        dimensions: "Continuous 12m perimeter slot",
        description: "Indirect wash eliminating glare and emphasizing raw mineral wall texture at twilight.",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    label: "DINING",
    title: "THE DINING\nROOM",
    subtitle: "Made For Long Tables, Longer Evenings.",
    quote: "A balance of smoked timber grain and warm ambient illumination designed for ritual gathering.",
    image: "/images/rooms/room-2.jpg",
    textAlign: "right",
    hotspots: [
      {
        id: "h2-1",
        x: 52,
        y: 65,
        title: "Ten-Seater Smoked Oak Dining Table",
        subtitle: "Solid European White Oak",
        material: "Deep Smoked Oak / Organic Wax Oil",
        origin: "Black Forest, Germany",
        dimensions: "3600 x 1100 x 750 mm",
        description: "Crafted with invisible mortise-and-tenon joinery and balanced on dual sculptural pedestals.",
      },
      {
        id: "h2-2",
        x: 50,
        y: 35,
        title: "Linear Fluted Bronze Chandelier",
        subtitle: "Patinated Architectural Bronze",
        material: "Cast Bronze & Handblown Frosted Glass",
        origin: "Venice, Italy",
        dimensions: "2400 x 120 x 140 mm",
        description: "Custom commissioned fixture casting a warm, candle-like glow across the timber grain.",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    label: "KITCHEN",
    title: "THE\nKITCHEN",
    subtitle: "Honest Materials, Quiet Function.",
    quote: "A sculpted cooking monolith concealing precision German engineering behind raw stone facades.",
    image: "/images/rooms/room-3.jpg",
    textAlign: "left",
    hotspots: [
      {
        id: "h3-1",
        x: 45,
        y: 64,
        title: "Monolithic Grigio Carnico Marble Island",
        subtitle: "Honed Charcoal Marble",
        material: "Italian Grigio Carnico Marble",
        origin: "Friuli, Italy",
        dimensions: "3800 x 1250 x 920 mm",
        description: "Integrated induction cooktop concealed flush within continuous bookmatched stone surfaces.",
      },
      {
        id: "h3-2",
        x: 75,
        y: 50,
        title: "Smoked Oak Pocket Wall Cabinetry",
        subtitle: "Concealed Chef's Pantry",
        material: "Quarter-sawn Smoked Oak & Gunmetal Pulls",
        origin: "Bespoke VELQON Joinery Studio, Dubai",
        dimensions: "Full Height 3400 mm",
        description: "Full motorized coplanar sliding doors that tuck away seamlessly into wall pockets.",
      },
    ],
  },
  {
    id: 4,
    number: "04",
    label: "SUITE",
    title: "PRIMARY\nSUITE",
    subtitle: "A Sanctuary Of Quiet Luxury.",
    quote: "A private retreat wrapped in acoustic timber panels and natural linen drapes.",
    image: "/images/rooms/room-4.jpg",
    textAlign: "right",
    hotspots: [
      {
        id: "h4-1",
        x: 50,
        y: 62,
        title: "Platform Floating Bedstead",
        subtitle: "Upholstered Headboard Wall",
        material: "Raw Belgian Linen & Smoked Oak Plinth",
        origin: "Antwerp, Belgium",
        dimensions: "2200 x 2400 x 900 mm",
        description: "Low center of gravity floating architecture with integrated bedside nightstands and wireless charging.",
      },
      {
        id: "h4-2",
        x: 78,
        y: 48,
        title: "Acoustic Slatted Timber Accent Wall",
        subtitle: "Sound-Absorbing Micro-perforated Oak",
        material: "Smoked American Walnut on Acoustic Felt",
        origin: "Dubai Joinery Atelier",
        dimensions: "6000 x 3200 mm",
        description: "Engineered to deliver recording-studio acoustics and whisper-quiet serenity.",
      },
    ],
  },
  {
    id: 5,
    number: "05",
    label: "GARDEN",
    title: "THE GARDEN\nROOM",
    subtitle: "Where The Interior Meets The Outside.",
    quote: "Floor-to-ceiling minimal frame glazing blurring the boundary between climate-controlled calm and lush courtyard foliage.",
    image: "/images/rooms/room-5.jpg",
    textAlign: "left",
    hotspots: [
      {
        id: "h5-1",
        x: 40,
        y: 55,
        title: "Motorized Slim-Profile Pocket Glazing",
        subtitle: "Sky-Frame Classic Minimal Windows",
        material: "Triple-glazed Low-Iron Acoustic Glass",
        origin: "Frauenfeld, Switzerland",
        dimensions: "7200 x 3400 mm (Zero-threshold)",
        description: "Completely automated glass walls that slide silently into exterior cavity walls.",
      },
      {
        id: "h5-2",
        x: 65,
        y: 72,
        title: "Internal Japanese Bonsai Courtyard",
        subtitle: "Bonsai Pinus Parviflora & Crushed Black Basalt",
        material: "Japanese Black Pine & Volcanic Stone",
        origin: "Saitama, Japan",
        dimensions: "4000 x 4000 mm atrium",
        description: "Biophilic focal centerpiece illuminated by architectural moonlighting.",
      },
    ],
  },
  {
    id: 6,
    number: "06",
    label: "BATH",
    title: "THE BATH",
    subtitle: "Stone, Water, Stillness.",
    quote: "Monolithic stone slabs, concealed rain showers, and natural sunlight filtering through textured glass.",
    image: "/images/rooms/room-6.jpg",
    textAlign: "right",
    hotspots: [
      {
        id: "h6-1",
        x: 52,
        y: 66,
        title: "Sculptural Freestanding Stone Bath",
        subtitle: "Monolithic Composite Stone",
        material: "Solid Surface Matte Resin-Stone",
        origin: "Valencia, Spain",
        dimensions: "1850 x 880 x 580 mm",
        description: "Ergonomically shaped double-ended soaking tub with concealed floor drain and floor-mounted brushed gunmetal mixer.",
      },
      {
        id: "h6-2",
        x: 25,
        y: 45,
        title: "Integrated Travertine Vanity Basin",
        subtitle: "Zero-Reveal Mitred Edges",
        material: "Filled & Honed Romano Navona Travertine",
        origin: "Rome, Italy",
        dimensions: "2400 x 600 x 850 mm",
        description: "Continuous inclined stone bottom with hidden slit drainage and Dornbracht brushed platinum wall faucets.",
      },
    ],
  },
  {
    id: 7,
    number: "07",
    label: "TOP VIEW",
    title: "THE GRAND\nVIEW",
    subtitle: "Luxury Architecture. Ocean View. Private Living.",
    quote: "A panoramic perspective over the Arabian Gulf, framing horizons where architecture dissolves into light.",
    image: "/images/rooms/room-7.jpg",
    textAlign: "left",
    hotspots: [
      {
        id: "h7-1",
        x: 50,
        y: 70,
        title: "Cantilevered Penthouse Terrace Lounge",
        subtitle: "Weatherproof Charcoal Titanium Framing",
        material: "Titanium Metal, Weatherproof Chenille",
        origin: "Geneva, Switzerland",
        dimensions: "5000 x 3000 mm seating cluster",
        description: "Engineered to withstand coastal sea spray while retaining ultra-soft tactile comfort.",
      },
    ],
  },
];

// Featured Projects & Portfolio
export const projectsData: Project[] = [
  {
    slug: "residence-noir",
    title: "Residence Noir",
    category: "Residential",
    location: "Palm Jumeirah, Dubai",
    year: "2025",
    area: "14,500 sq ft",
    client: "Private Collector",
    duration: "14 Months",
    coverImage: "/images/projects/project-1.jpg",
    gallery: [
      "/images/projects/project-1.jpg",
      "/images/rooms/room-1.jpg",
      "/images/rooms/room-2.jpg",
      "/images/rooms/room-3.jpg",
    ],
    tagline: "A Beachfront Villa of Tactile Stillness",
    overview:
      "Positioned along the pristine fronds of Palm Jumeirah, Residence Noir is a bespoke architectural renovation translating charcoal materiality into a warm sanctuary of quiet luxury.",
    concept:
      "We stripped away ornate embellishments to reveal pure rectilinear geometry. Honed travertine flooring continues from the foyer right out to the infinity pool coping, dissolving boundaries between indoors and the Arabian Gulf.",
    materials: [
      { name: "Roman Travertine", type: "Flooring & Facade", color: "#d6ceb8" },
      { name: "Smoked French Oak", type: "Bespoke Millwork", color: "#362e26" },
      { name: "Charcoal Lime Plaster", type: "Wall Finish", color: "#222222" },
      { name: "Brushed Gunmetal", type: "Hardware & Trim", color: "#48484a" },
    ],
    featured: true,
    span: "md:col-span-2 md:row-span-2",
  },
  {
    slug: "the-loft-collective",
    title: "The Loft Collective",
    category: "Commercial",
    location: "DIFC, Dubai",
    year: "2025",
    area: "8,200 sq ft",
    client: "Fintech Venture Fund",
    duration: "8 Months",
    coverImage: "/images/projects/project-2.jpg",
    gallery: [
      "/images/projects/project-2.jpg",
      "/images/rooms/room-2.jpg",
      "/images/rooms/room-5.jpg",
    ],
    tagline: "Executive Quietude in the Financial Epicenter",
    overview:
      "A serene commercial headquarters designed to counterbalance the frenetic pace of financial trading with acoustic seclusion and residential warmth.",
    concept:
      "Micro-slatted walnut partitions and indirect circadian lighting maintain focus while providing private boardrooms and an executive salon.",
    materials: [
      { name: "American Walnut", type: "Slatted Partitions", color: "#422e1b" },
      { name: "Italian Calacatta", type: "Reception Monolith", color: "#e8e5dc" },
      { name: "Acoustic Felt Fabric", type: "Wall Panels", color: "#1c1c1e" },
    ],
    featured: true,
  },
  {
    slug: "casa-serena",
    title: "Casa Serena",
    category: "Residential",
    location: "Emirates Hills, Dubai",
    year: "2024",
    area: "18,000 sq ft",
    client: "Confidential Family Office",
    duration: "18 Months",
    coverImage: "/images/projects/project-3.jpg",
    gallery: [
      "/images/projects/project-3.jpg",
      "/images/rooms/room-4.jpg",
      "/images/rooms/room-6.jpg",
    ],
    tagline: "Timeless Architecture Rooted in Earth & Sun",
    overview:
      "A ground-up luxury family estate overlooking championship golf fairways, engineered around internal water courtyards and deep shaded overhangs.",
    concept:
      "Every room celebrates natural air currents and filtered daylight, using micro-cement, Belgian linen, and monolithic limestone vanities.",
    materials: [
      { name: "Jura Beige Limestone", type: "Monolith Features", color: "#d2c7af" },
      { name: "Belgian Linen", type: "Drapes & Bedding", color: "#eae4d7" },
      { name: "Brushed Champagne Brass", type: "Custom Hardware", color: "#c5a880" },
    ],
    featured: true,
  },
  {
    slug: "hotel-parallax",
    title: "Hotel Parallax",
    category: "Hospitality",
    location: "Downtown Dubai",
    year: "2024",
    area: "32,000 sq ft",
    client: "Boutique Hotelier Group",
    duration: "20 Months",
    coverImage: "/images/projects/project-4.jpg",
    gallery: [
      "/images/projects/project-4.jpg",
      "/images/rooms/room-1.jpg",
      "/images/rooms/room-7.jpg",
    ],
    tagline: "Bespoke Suites Redefining Modern Middle-Eastern Hospitality",
    overview:
      "A signature hospitality project encompassing 40 bespoke guest suites, signature restaurant lounge, and private penthouse wellness spa.",
    concept:
      "Monochromatic charcoal tones juxtaposed against luminous travertine and custom fluted bronze details create an immersive, seductive nocturnal ambiance.",
    materials: [
      { name: "Black Terrazzo", type: "Lobby Flooring", color: "#181818" },
      { name: "Fluted Bronze Glass", type: "Screens & Dividers", color: "#6e583c" },
      { name: "Tuscan Leather", type: "Custom Seating", color: "#2d241e" },
    ],
    featured: true,
    span: "md:col-span-2",
  },
  {
    slug: "villa-alize",
    title: "Villa Alizé",
    category: "Penthouse",
    location: "Jumeirah Bay Island, Dubai",
    year: "2024",
    area: "9,600 sq ft",
    client: "European Tech Entrepreneur",
    duration: "11 Months",
    coverImage: "/images/projects/project-5.jpg",
    gallery: [
      "/images/projects/project-5.jpg",
      "/images/rooms/room-3.jpg",
      "/images/rooms/room-6.jpg",
    ],
    tagline: "Sky-High Minimalist Sanctuary",
    overview:
      "A duplex penthouse suspended over the azure waters of Jumeirah Bay, boasting double-height ceilings and panoramic sea horizons.",
    concept:
      "Complete bespoke turnkey fit-out featuring floating cantilevered staircases, concealed audio engineering, and museum-grade art displays.",
    materials: [
      { name: "Statuario Venato", type: "Kitchen & Bath", color: "#f2f2f0" },
      { name: "Carbon Fiber Accents", type: "Staircase Stringers", color: "#121212" },
      { name: "Silk Georgette Stone", type: "Floor Slabs", color: "#b8b4ac" },
    ],
    featured: false,
  },
  {
    slug: "atelier-monolith",
    title: "Atelier Monolith",
    category: "Commercial",
    location: "Alserkal Avenue, Dubai",
    year: "2023",
    area: "5,400 sq ft",
    client: "Haute Horlogerie Brand",
    duration: "6 Months",
    coverImage: "/images/projects/project-6.jpg",
    gallery: [
      "/images/projects/project-6.jpg",
      "/images/rooms/room-1.jpg",
      "/images/rooms/room-2.jpg",
    ],
    tagline: "Monastic Precision for Fine Watchmaking",
    overview:
      "An exclusive private lounge and VIP client showcase crafted with horological discipline and museum-grade climate and light control.",
    concept:
      "Minimalist display vitrines carved into raw textured concrete pillars with fiber-optic micro lighting.",
    materials: [
      { name: "Board-Formed Concrete", type: "Walls & Pillars", color: "#7a7975" },
      { name: "Anodized Dark Bronze", type: "Display Cases", color: "#3a3028" },
      { name: "Low-Iron Museum Glass", type: "Vitrines", color: "#ffffff" },
    ],
    featured: false,
  },
];

// Services
export const servicesData: Service[] = [
  {
    number: "01",
    id: "residential",
    title: "Residential Interior Architecture",
    tagline: "Private Residences, Penthouses & Villas",
    description:
      "Comprehensive spatial planning, architectural renovations, and interior design for discerning private homeowners who demand timeless refinement and total privacy.",
    scope: [
      "Spatial layout optimization & architectural drawings",
      "Full 3D digital twin visualization & VR walkthroughs",
      "Bespoke material curation and direct quarry sourcing",
      "Full MEP, smart home & circadian lighting integration",
    ],
    deliverables: [
      "Complete tender package & construction documentation",
      "Detailed 3D photo-realistic walkthrough rendering sets",
      "Custom physical material & finishes moodboard samples",
      "On-site architectural supervision & client advocacy",
    ],
    timeline: "3 - 8 Months (Design & Documentation)",
    image: "/images/rooms/room-1.jpg",
  },
  {
    number: "02",
    id: "hospitality",
    title: "Hospitality & Commercial Design",
    tagline: "Boutique Hotels, Private Clubs & Headquarters",
    description:
      "Creating captivating brand sanctuaries that immerse guests in memorable luxury experiences while maximizing operational efficiency and durability.",
    scope: [
      "Brand identity alignment & guest journey mapping",
      "Public areas, dining rooms, suites & wellness amenities",
      "Acoustic engineering and commercial-grade durability testing",
      "Regulatory approvals & authority compliance in Dubai/UAE",
    ],
    deliverables: [
      "Comprehensive FF&E specification books",
      "Custom furniture prototypes & mock-up room reviews",
      "Lighting design scripts and control programming",
      "Handover & operations care documentation",
    ],
    timeline: "4 - 12 Months",
    image: "/images/rooms/room-2.jpg",
  },
  {
    number: "03",
    id: "furniture",
    title: "Bespoke Millwork & Furniture Engineering",
    tagline: "Custom Architectural Joinery & Sculptural Objects",
    description:
      "One-of-a-kind furniture, integrated cabinetry, and architectural woodwork engineered and hand-finished in our dedicated Dubai atelier and partnered Italian workshops.",
    scope: [
      "Custom dining tables, platform beds & credenzas",
      "Integrated dressing rooms, pantries & concealed bars",
      "Specialist metal patination, cast bronze & rare stone inlays",
      "Precision German hardware & motorized coplanar sliders",
    ],
    deliverables: [
      "1:1 scale shop drawings & joinery details",
      "Finish samples with tactile texture approvals",
      "Factory quality inspections prior to delivery",
      "Master artisan white-glove site installation",
    ],
    timeline: "6 - 12 Weeks (Fabrication)",
    image: "/images/rooms/room-3.jpg",
  },
  {
    number: "04",
    id: "turnkey",
    title: "Turnkey Project Execution & Fit-Out",
    tagline: "From Concrete Shell to Scented Candle Handover",
    description:
      "Single-point accountability managing every contractor, artisan, procurement pipeline, and site milestone with uncompromising Swiss precision.",
    scope: [
      "Complete construction management & general contracting",
      "Budget management with transparent open-book accounting",
      "Direct international logistics, customs & freight handling",
      "Defect-free snagging & zero-tolerance handover protocols",
    ],
    deliverables: [
      "Weekly milestone video reports & 360-degree site scans",
      "Complete warranties & maintenance manual binder",
      "Comprehensive smart-home automation training",
      "Full white-glove styling, art hanging & scent curation",
    ],
    timeline: "6 - 18 Months (Construction to Handover)",
    image: "/images/rooms/room-4.jpg",
  },
  {
    number: "05",
    id: "visualization",
    title: "3D Architectural Visualization & CGI",
    tagline: "Cinematic Digital Twins & Scroll Sequences",
    description:
      "High-end CGI, real-time interactive 3D WebGL experiences, and photorealistic animation sequences powered by Blender and custom graphic pipelines.",
    scope: [
      "High-poly 3D modeling of complex geometry & textures",
      "Physically based material shaders (PBR)",
      "Interactive 3D web configurators & virtual tours",
      "Cinematic video renders for marketing & presales",
    ],
    deliverables: [
      "8K Ultra-HD interior and exterior still renders",
      "Web-optimized GLTF/GLB models for browser viewing",
      "Scroll-driven animation frame sequences",
      "Virtual reality ready interactive tours",
    ],
    timeline: "2 - 4 Weeks",
    image: "/images/rooms/room-5.jpg",
  },
  {
    number: "06",
    id: "lighting",
    title: "Curated Lighting & Acoustic Architecture",
    tagline: "Sculpting Shadow, Atmosphere & Silence",
    description:
      "Lighting and acoustics define the emotional soul of an interior. We treat illumination as sculpture and silence as the ultimate luxury finish.",
    scope: [
      "Daylight study & solar angle calculations",
      "Concealed architectural cove details and zero-trim fixtures",
      "Reverberation time (RT60) acoustic engineering",
      "DALI-2 / Lutron HomeWorks programming and scene design",
    ],
    deliverables: [
      "Detailed lighting layout drawings & lux level heatmaps",
      "Fixture schedule with high CRI (>97) LED engines",
      "Acoustic wall & ceiling construction details",
      "Day/Evening/Night scene commissioning on site",
    ],
    timeline: "4 - 8 Weeks",
    image: "/images/rooms/room-6.jpg",
  },
];

// Team
export const teamMembers: TeamMember[] = [
  {
    name: "Tariq Al-Mansoor",
    role: "Founder & Principal Architect",
    qualification: "M.Arch, AA London · RIBA",
    bio: "With over 16 years leading high-profile residential commissions across London, Milan, and Dubai, Tariq founded VELQON with an uncompromising philosophy of architectural silence and honest materiality.",
    image: "/images/about/team-2.jpg",
  },
  {
    name: "Elena Rostova",
    role: "Design Director & Head of Interiors",
    qualification: "Politecnico di Milano · AD100 Honoree",
    bio: "Elena oversees all spatial concepts, textiles, and FF&E curation. Her signature work marries brutalist monolithic massing with the gentle tactile warmth of Italian natural stone and European bouclé.",
    image: "/images/about/team-1.jpg",
  },
  {
    name: "Farhan Siddiqui",
    role: "Head of Project Delivery & Joinery",
    qualification: "B.Eng Civil & Construction · PMP",
    bio: "Farhan commands VELQON’s dedicated Dubai fit-out ateliers and construction management teams, ensuring that millwork clearances to 0.5mm precision are executed without delay or deviation.",
    image: "/images/about/team-3.jpg",
  },
];

// Studio Contact & Info
export const studioInfo = {
  name: "VELQON INTERIOR DESIGN STUDIO",
  tagline: "A Residence Unfolding In One Continuous Take",
  address: "Alserkal Avenue, Unit 42, Al Quoz 1, Dubai, United Arab Emirates",
  phone: "+971 4 829 1000",
  whatsappNumber: "+971501234567",
  whatsappUrl: "https://wa.me/971501234567?text=Hello%20VELQON,%20I%20would%20like%20to%20discuss%20a%20new%20interior%20design%20project.",
  email: "contact@velqon.com",
  pressEmail: "press@velqon.com",
  workingHours: "Monday – Saturday: 9:00 AM – 7:00 PM GST",
  socials: {
    instagram: "https://instagram.com/velqon.studio",
    linkedin: "https://linkedin.com/company/velqon",
    behance: "https://behance.net/velqon",
  },
  meta: {
    title: "VELQON | Luxury Interior Design Studio Dubai",
    description: "VELQON is a premier Dubai-based interior architecture studio crafting extraordinary residences, penthouses, and hospitality spaces. Experience our cinematic scroll walkthrough.",
  },
};

// Initial Mock Enquiries
export const initialEnquiries: Enquiry[] = [
  {
    id: "enq-101",
    fullName: "H.E. Mansoor Al-Qasimi",
    email: "m.alqasimi@holding.ae",
    phone: "+971 50 882 1990",
    projectType: "Residential Villa",
    location: "Palm Jumeirah Frond N, Dubai",
    message: "We have acquired a 16,000 sq ft beachfront plot and require turnkey interior architecture with bespoke Italian travertine finishes throughout. Looking for a full presentation next week.",
    status: "New",
    createdAt: "2026-11-08T09:15:00Z",
  },
  {
    id: "enq-102",
    fullName: "Claire Beaumont",
    email: "c.beaumont@luxcapital.ch",
    phone: "+41 79 432 9911",
    projectType: "Penthouse",
    location: "Downtown Dubai (Burj Crown)",
    message: "Seeking complete redesign of a duplex penthouse. Interested in the minimalist charcoal aesthetic seen in Residence Noir. Please connect via WhatsApp.",
    status: "Contacted",
    createdAt: "2026-11-07T14:40:00Z",
  },
  {
    id: "enq-103",
    fullName: "Kaveh Radpour",
    email: "kaveh@radpour.co",
    phone: "+971 52 901 8833",
    projectType: "Commercial / Private Office",
    location: "DIFC Gate Village, Dubai",
    message: "Private wealth family office design requiring extreme acoustic isolation, bespoke smoked oak boardrooms, and art curation.",
    status: "Proposal Sent",
    createdAt: "2026-11-06T18:22:00Z",
  },
];

