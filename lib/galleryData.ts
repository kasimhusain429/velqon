export interface GalleryHotspot {
  id: string;
  name: string;
  subtitle: string;
  position: [number, number, number]; // 3D world position
  cameraPos: [number, number, number]; // Camera eye position when viewing
  cameraTarget: [number, number, number]; // Look-at point
  title: string;
  category: string;
  overview: string;
  descriptionCol1: string;
  descriptionCol2: string;
  images: string[];
  materials: {
    name: string;
    type: string;
    origin: string;
    finish: string;
  }[];
}

export interface WalkthroughStation {
  id: string;
  step: string;
  progress: number; // 0.0 to 1.0 along the scroll timeline
  cameraPos: [number, number, number];
  cameraTarget: [number, number, number];
  spaceName: string;
  subtitle: string;
  architecturalThesis: string;
  featuredMaterial: string;
  finish: string;
  dimension: string;
  hotspotId?: string;
}

export interface GalleryFloor {
  id: string;
  slug: string;
  level: string; // "+1", "0", "-1"
  name: string;
  tagline: string;
  modelPath: string;
  defaultCameraPos: [number, number, number];
  defaultCameraTarget: [number, number, number];
  hotspots: GalleryHotspot[];
  stations: WalkthroughStation[];
}

export const galleryFloors: GalleryFloor[] = [
  {
    id: "ground-floor",
    slug: "ground-floor",
    level: "0",
    name: "Ground Floor",
    tagline: "Living, Reception Monolith & Material Bar",
    modelPath: "/models/ground_floor.glb",
    defaultCameraPos: [-18.57, 1.7, 24.62],
    defaultCameraTarget: [-18.57, 1.7, 19.62],
    hotspots: [
      {
        id: "gf-hotspot-1",
        name: "The Monolithic Reception & Fluted Bar",
        subtitle: "Honed Roman Travertine & Smoked Oak Joinery",
        position: [4.77, 1.2, 18.0],
        cameraPos: [4.77, 1.70, 21.64],
        cameraTarget: [4.77, 1.70, 16.64],
        category: "ICG ATELIER · GROUND FLOOR",
        title: "Reale e virtuale: The Monolithic Reception & Architectural Bar",
        overview:
          "A monolithic bar counter carved from continuous Italian travertine, set against vertical fluted smoked oak joinery.",
        descriptionCol1:
          "The ground floor reception establishes the architectural thesis of VELQON Gallery: pure rectilinear geometry balanced with the warmth of natural stone and timber.",
        descriptionCol2:
          "Behind the continuous marble plinth, concealed sliding pocket screens reveal an extensive collection of large-format architectural porcelain and natural stone slabs.",
        images: [
          "/images/rooms/room-1.jpg",
          "/images/rooms/room-3.jpg",
          "/images/projects/project-1.jpg",
        ],
        materials: [
          { name: "Roman Travertine", type: "Monolith Counter", origin: "Tivoli, Italy", finish: "Honed Matte" },
          { name: "Smoked French Oak", type: "Fluted Joinery", origin: "Black Forest, Germany", finish: "Organic Wax Oil" },
          { name: "Brushed Gunmetal", type: "Architectural Trims", origin: "Milan, Italy", finish: "PVD Coated" },
        ],
      },
      {
        id: "gf-hotspot-2",
        name: "Central Lounge & Low Plinths",
        subtitle: "Geometric Stone Tables & Bouclé Seating",
        position: [27.0, 0.7, -9.44],
        cameraPos: [31.18, 1.70, -9.44],
        cameraTarget: [26.18, 1.70, -9.44],
        category: "ICG ATELIER · LOUNGE",
        title: "The Conversation Salon & Sculptural Seating",
        overview:
          "Low center-of-gravity architectural seating arranged around block-carved travertine cocktail plinths.",
        descriptionCol1:
          "Designed for deliberate pause, this salon integrates micro-cement floor transitions with tactile bouclé textiles sourced from Dedar Milano.",
        descriptionCol2:
          "Recessed linear downlights cast grazing shadows across the stone surfaces, emphasizing the tactile relief and subtle geological vein lines.",
        images: [
          "/images/rooms/room-2.jpg",
          "/images/projects/project-3.jpg",
          "/images/rooms/room-4.jpg",
        ],
        materials: [
          { name: "Dedar Bouclé", type: "Lounge Upholstery", origin: "Como, Italy", finish: "Heavyweight Wool-Linen" },
          { name: "Navona Travertine", type: "Cocktail Plinths", origin: "Rome, Italy", finish: "Cross-Cut Honed" },
        ],
      },
      {
        id: "gf-hotspot-3",
        name: "Acoustic Glazing & Zen Courtyard",
        subtitle: "Floor-to-Ceiling Minimal Pivot Glass",
        position: [20.0, 1.7, -26.0],
        cameraPos: [22.03, 1.70, -29.58],
        cameraTarget: [20.04, 1.70, -24.99],
        category: "ICG ATELIER · COURTYARD",
        title: "Blurring Boundaries: The Glazed Atrium",
        overview:
          "Zero-threshold Swiss acoustic glass walls dissolving the partition between climate-controlled calm and lush courtyard foliage.",
        descriptionCol1:
          "Natural light filters through Japanese black pine bonsai trees into the interior stone flooring, shifting tone throughout the day.",
        descriptionCol2:
          "Engineered with motorized coplanar pocket tracks that slide entirely into the perimeter concrete cavity walls.",
        images: [
          "/images/rooms/room-5.jpg",
          "/images/projects/project-5.jpg",
        ],
        materials: [
          { name: "Sky-Frame Glass", type: "Minimal Glazing", origin: "Switzerland", finish: "Low-Iron Acoustic Triple" },
          { name: "Crushed Black Basalt", type: "Courtyard Garden", origin: "Iceland", finish: "Natural Volcanic" },
        ],
      },
      {
        id: "gf-hotspot-4",
        name: "Material Atelier & Sample Archive",
        subtitle: "Curated Finish Drawers & Tactile Vitrines",
        position: [23.0, 1.5, 10.0],
        cameraPos: [25.86, 1.70, 12.82],
        cameraTarget: [22.19, 1.70, 9.43],
        category: "ICG ATELIER · ARCHIVE",
        title: "The Physical Library: Touch & Materiality",
        overview:
          "An extensive tactile sample library allowing clients and architects to experiment with stone and wood combinations under calibrated daylight.",
        descriptionCol1:
          "Over 300 mineral stone slabs, textured plasters, and patinated bronze hardware finishes arranged in motorized presentation trays.",
        descriptionCol2:
          "Equipped with 2700K to 6500K tunable circadian light stages to evaluate materials under morning, noon, and sunset illumination.",
        images: [
          "/images/rooms/room-3.jpg",
          "/images/projects/project-6.jpg",
        ],
        materials: [
          { name: "Calacatta Extra", type: "Large Format Slab", origin: "Carrara, Italy", finish: "Polished Silk" },
          { name: "Smoked American Walnut", type: "Architectural Veneer", origin: "USA", finish: "Deep Smoked Matt" },
        ],
      },
],
  stations: [
    {
      id: "gf-st-1",
      step: "01",
      progress: 0.0,
      cameraPos: [-18.57, 1.70, 24.62],
      cameraTarget: [-18.57, 1.70, 19.62],
      spaceName: "The Grand Entrance Threshold",
      subtitle: "Monolithic Portal & Atmospheric Welcome",
      architecturalThesis:
        "The entrance sequence initiates the visitor into a sensory transition from urban rush to tranquil mineral stillness.",
      featuredMaterial: "Honed Pietra d'Avola Stone",
      finish: "Velvet Matte Finish",
      dimension: "Floor-to-Ceiling 3.8m Clearance",
    },
    {
      id: "gf-st-2",
      step: "02",
      progress: 0.17,
      cameraPos: [4.77, 1.70, 21.64],
      cameraTarget: [4.77, 1.70, 16.64],
      spaceName: "The Monolithic Reception Bar",
      subtitle: "Carved Roman Travertine & Smoked Oak",
      architecturalThesis:
        "A continuous rectilinear block carved from Italian travertine anchored against fluted French oak acoustic paneling.",
      featuredMaterial: "Roman Travertine Navona",
      finish: "Cross-cut Honed",
      dimension: "7.2m Continuous Slab Island",
      hotspotId: "gf-hotspot-1",
    },
    {
      id: "gf-st-3",
      step: "03",
      progress: 0.33,
      cameraPos: [25.86, 1.70, 12.82],
      cameraTarget: [22.19, 1.70, 9.43],
      spaceName: "Architectural Surface Gallery",
      subtitle: "MaxFine Large Format Continuous Porcelain",
      architecturalThesis:
        "Full-height sliding architectural wings showcasing 320x160cm sintered mineral surfaces with zero visible joints.",
      featuredMaterial: "Fior di Bosco Sintered Porcelain",
      finish: "Natural Soft-Touch Satin",
      dimension: "3200 × 1600 × 6mm",
      hotspotId: "gf-hotspot-4",
    },
    {
      id: "gf-st-4",
      step: "04",
      progress: 0.5,
      cameraPos: [31.18, 1.70, -9.44],
      cameraTarget: [26.18, 1.70, -9.44],
      spaceName: "The Conversation Salon",
      subtitle: "Tactile Bouclé & Low-Center Stone Plinths",
      architecturalThesis:
        "Arranged for contemplative dialogue, featuring custom monolithic coffee plinths and textured Italian upholstery.",
      featuredMaterial: "Dedar Milano Wool Bouclé",
      finish: "Cross-Woven Texture",
      dimension: "Sunken Architectural Lounge",
      hotspotId: "gf-hotspot-2",
    },
    {
      id: "gf-st-5",
      step: "05",
      progress: 0.67,
      cameraPos: [22.03, 1.70, -29.58],
      cameraTarget: [20.04, 1.70, -24.99],
      spaceName: "Acoustic Glazing & Courtyard Portal",
      subtitle: "Minimalist Floor-to-Ceiling Pivot Glass",
      architecturalThesis:
        "Connecting interior stonework with the exterior zen garden through seamless acoustic pivot portals.",
      featuredMaterial: "PVD Brushed Gunmetal & Low-Iron Glass",
      finish: "Micro-Satin Architectural Grade",
      dimension: "4.2m Pivot Axis Height",
      hotspotId: "gf-hotspot-3",
    },
    {
      id: "gf-st-6",
      step: "06",
      progress: 0.83,
      cameraPos: [-1.12, 1.70, -32.29],
      cameraTarget: [-1.12, 1.70, -27.29],
      spaceName: "Executive Media Salon & Vitrines",
      subtitle: "Integrated Display Plinths & Smoked Glass",
      architecturalThesis:
        "High-performance media technology integrated into blackened steel plinths with hidden acoustic baffles.",
      featuredMaterial: "Smoked French Oak & Black Steel",
      finish: "Brushed Organic Wax Oil",
      dimension: "Bespoke Acoustic Integration",
    },
    {
      id: "gf-st-7",
      step: "07",
      progress: 1.0,
      cameraPos: [-24.73, 1.70, -32.29],
      cameraTarget: [-24.73, 1.70, -27.29],
      spaceName: "The Architectural Horizon",
      subtitle: "Curated Horizon & Complete Spatial Continuum",
      architecturalThesis:
        "A sweeping vantage point revealing the harmonic rhythm of light, volume, and mineral surfaces across the entire floor.",
      featuredMaterial: "Seamless Mineral Microcement",
      finish: "Hand-Troweled Silk Plaster",
      dimension: "Full Pavilion Panorama",
    },
  ],
  },
{
  id: "first-floor",
    slug: "first-floor",
      level: "+1",
        name: "First Floor",
          tagline: "Executive Suite & Private Penthouse Sky Terrace",
            modelPath: "/models/first_floor.glb",
    defaultCameraPos: [-17.48, 1.71, -5.90],
    defaultCameraTarget: [-12.48, 1.71, -5.90],
    hotspots: [
      {
        id: "ff-hotspot-1",
        name: "Executive Penthouse Suite",
        subtitle: "Belgian Linen Drapes & Smoked Oak Plinth",
        position: [-16.02, 1.5, 10.0],
        cameraPos: [-16.02, 1.71, 13.60],
        cameraTarget: [-14.49, 1.71, 8.84],
        category: "ICG ATELIER · FIRST FLOOR",
        title: "Primary Penthouse Sanctuary",
        overview:
          "A private master residential suite wrapped in micro-perforated acoustic timber panels and floor-to-ceiling silk drapes.",
        descriptionCol1:
          "Features a floating low-profile bedstead crafted with seamless Italian joinery and integrated wireless bedside controls.",
        descriptionCol2:
          "Adjacent private dressing salon with climate-controlled display vitrines for haute horlogerie and wardrobe collections.",
        images: [
          "/images/rooms/room-4.jpg",
          "/images/projects/project-4.jpg",
        ],
        materials: [
          { name: "Belgian Linen", type: "Drapes & Bedding", origin: "Antwerp, Belgium", finish: "Raw Washed" },
          { name: "French Smoked Oak", type: "Floating Plinth", origin: "France", finish: "Zero Gloss Oil" },
        ],
      },
      {
        id: "ff-hotspot-2",
        name: "Monolithic Master Bath",
        subtitle: "Freestanding Resin Tub & Dornbracht Platinum",
        position: [4.70, 1.4, 11.0],
        cameraPos: [4.70, 1.70, 14.69],
        cameraTarget: [4.70, 1.70, 9.69],
        category: "ICG ATELIER · WELLNESS",
        title: "The Monolithic Bath: Water & Stillness",
        overview:
          "Carved stone bathing sanctuary with concealed floor drains and architectural rain fixtures.",
        descriptionCol1:
          "Slabs of Roman Travertine wrap floor, walls, and cantilevered vanities in one continuous stone envelope.",
        descriptionCol2:
          "Dornbracht brushed platinum wall-mounted mixers provide laminar water flow reminiscent of a mountain spring.",
        images: [
          "/images/rooms/room-6.jpg",
          "/images/projects/project-1.jpg",
        ],
        materials: [
          { name: "Matte Resin-Stone", type: "Freestanding Tub", origin: "Valencia, Spain", finish: "Velvet Matte" },
          { name: "Brushed Platinum", type: "Fixtures", origin: "Iserlohn, Germany", finish: "Dornbracht PVD" },
        ],
      },
    ],
    stations: [
      {
        id: "ff-st-1",
        step: "01",
        progress: 0.0,
        cameraPos: [-17.48, 1.71, -5.90],
        cameraTarget: [-12.48, 1.71, -5.90],
        spaceName: "Sky Terrace & Penthouse Arrival",
        subtitle: "Panoramic Elevation & Private Loggia",
        architecturalThesis:
          "Ascending to the executive level, continuous perimeter glazing establishes an expansive dialogue between interior volumes and the sky.",
        featuredMaterial: "Belgian Bluestone & Smoked Oak",
        finish: "Satin Honed",
        dimension: "Floor-to-Ceiling 3.6m Glazing",
      },
      {
        id: "ff-st-2",
        step: "02",
        progress: 0.25,
        cameraPos: [-16.02, 1.71, 13.60],
        cameraTarget: [-14.49, 1.71, 8.84],
        spaceName: "Primary Penthouse Sanctuary",
        subtitle: "Acoustic Slatted Timber & Belgian Linen",
        architecturalThesis:
          "A sanctuary enveloped in acoustic micro-perforated smoked oak battens, low-profile bed plinths, and bespoke linen drapery.",
        featuredMaterial: "French Smoked Oak & Belgian Linen",
        finish: "Zero Gloss Organic Oil",
        dimension: "Floating Plinth Bedstead",
        hotspotId: "ff-hotspot-1",
      },
      {
        id: "ff-st-3",
        step: "03",
        progress: 0.5,
        cameraPos: [4.70, 1.70, 14.69],
        cameraTarget: [4.70, 1.70, 9.69],
        spaceName: "The Monolithic Bath & Rain Spa",
        subtitle: "Freestanding Resin Tub & Dornbracht Platinum",
        architecturalThesis:
          "A singular block-carved wet volume wrapped entirely in continuous Roman Travertine with concealed drainage channels.",
        featuredMaterial: "Matte Resin-Stone & Brushed Platinum",
        finish: "Velvet Matte PVD",
        dimension: "Monolithic Seamless Wet Room",
        hotspotId: "ff-hotspot-2",
      },
      {
        id: "ff-st-4",
        step: "04",
        progress: 0.75,
        cameraPos: [18.38, 1.70, 2.21],
        cameraTarget: [13.46, 1.70, 1.29],
        spaceName: "Private Dressing Vitrine Salon",
        subtitle: "Bronze Trims & Illuminated Leather Trays",
        architecturalThesis:
          "Museum-grade wardrobe vitrines with climate-controlled glass cases and integrated soft grazing illumination.",
        featuredMaterial: "Patinated Architectural Bronze",
        finish: "Hand-Rubbed Satin Sheen",
        dimension: "Concealed Motorized Pivot Units",
      },
      {
        id: "ff-st-5",
        step: "05",
        progress: 1.0,
        cameraPos: [18.38, 1.70, -19.02],
        cameraTarget: [13.38, 1.70, -19.02],
        spaceName: "Executive Study & Sky Vista",
        subtitle: "Cantilevered Desk & Horizon Gallery",
        architecturalThesis:
          "A secluded private workspace commanding views across the entire architectural complex and sky horizon.",
        featuredMaterial: "Nero Marquina Marble & Gunmetal",
        finish: "Leathered Honed Finish",
        dimension: "Full Penthouse Vista",
      },
    ],
  },
{
  id: "underground",
    slug: "underground",
      level: "-1",
        name: "Underground Sanctuary",
          tagline: "Acoustic Vault & Monolithic Reflection Pool",
            modelPath: "/models/underground_floor.glb",
    defaultCameraPos: [-9.04, 1.50, 10.61],
    defaultCameraTarget: [-9.04, 1.50, 5.61],
    hotspots: [
      {
        id: "uf-hotspot-1",
        name: "Basalt Reflection Spa",
        subtitle: "Volcanic Stone & Submerged Lighting",
        position: [8.00, 0.8, 8.0],
        cameraPos: [8.00, 1.53, 12.08],
        cameraTarget: [6.73, 1.53, 7.24],
        category: "ICG ATELIER · SUB-TERRANEAN",
        title: "Subterranean Sanctuary: Basalt & Reflection",
        overview:
          "A subterranean acoustic sanctuary featuring an indoor reflection plunge pool lined with volcanic basalt.",
        descriptionCol1:
          "The subterranean level is completely decoupled acoustically from external street vibrations, achieving NC-15 recording studio silence.",
        descriptionCol2:
          "Indirect underwater fibre-optic illumination casts rhythmic light ripples across the raw board-formed concrete ceiling.",
        images: [
          "/images/rooms/room-6.jpg",
          "/images/projects/project-2.jpg",
        ],
        materials: [
          { name: "Volcanic Basalt", type: "Plunge Pool Lining", origin: "Sicily, Italy", finish: "Flamed & Brushed" },
          { name: "Board-Formed Concrete", type: "Vault Walls", origin: "Dubai Atelier", finish: "Mineral Sealant" },
        ],
      },
    ],
    stations: [
      {
        id: "uf-st-1",
        step: "01",
        progress: 0.0,
        cameraPos: [-9.04, 1.50, 10.61],
        cameraTarget: [-9.04, 1.50, 5.61],
        spaceName: "Subterranean Acoustic Descent",
        subtitle: "Board-Formed Concrete & Shadow Play",
        architecturalThesis:
          "A descent into the earth characterized by acoustic decoupling, sound-absorbing textures, and grazing wall illumination.",
        featuredMaterial: "Board-Formed Architecture Concrete",
        finish: "Raw Mineral Textured",
        dimension: "Acoustic Rating NC-15",
      },
      {
        id: "uf-st-2",
        step: "02",
        progress: 0.25,
        cameraPos: [8.00, 1.53, 12.08],
        cameraTarget: [6.73, 1.53, 7.24],
        spaceName: "Basalt Reflection Plunge Pool",
        subtitle: "Volcanic Stone & Submerged Fiber Optics",
        architecturalThesis:
          "Still reflection water pool lined with Italian volcanic basalt, throwing aquatic caustics onto monolithic ceilings.",
        featuredMaterial: "Sicilian Volcanic Basalt",
        finish: "Flamed & Brushed Slip-Resistant",
        dimension: "8.5m Long Mirror Pool",
        hotspotId: "uf-hotspot-1",
      },
      {
        id: "uf-st-3",
        step: "03",
        progress: 0.5,
        cameraPos: [17.31, 1.69, -1.14],
        cameraTarget: [12.31, 1.69, -1.19],
        spaceName: "Vaulted Rare Vintage Reserve",
        subtitle: "Precision Climate Cellar & Smoked Glass",
        architecturalThesis:
          "Dedicated sommelier reserve with humidity-stabilized travertine racks and invisible thermal perimeter seals.",
        featuredMaterial: "Roman Travertine & Low-Iron Double Glaze",
        finish: "Cross-Cut Open Pore",
        dimension: "1,200 Bottle Collector Vault",
      },
      {
        id: "uf-st-4",
        step: "04",
        progress: 0.75,
        cameraPos: [11.59, 1.69, -16.57],
        cameraTarget: [9.52, 1.69, -12.02],
        spaceName: "Private Acoustic Screening Salon",
        subtitle: "Dedar Mohair & Concealed Reference Audio",
        architecturalThesis:
          "Audiophile cinema salon calibrated for zero flutter echo with wall-integrated reference architectural speakers.",
        featuredMaterial: "Italian Mohair Velvet & Fumed Oak",
        finish: "Deep Charcoal Acoustic",
        dimension: "Dolby Atmos 9.4.6 Spec",
      },
      {
        id: "uf-st-5",
        step: "05",
        progress: 1.0,
        cameraPos: [-5.25, 1.70, -18.84],
        cameraTarget: [-5.25, 1.70, -13.84],
        spaceName: "Thermal Wellness & Hammam Rotunda",
        subtitle: "Continuous Heated Stone Slabs & Steam Vault",
        architecturalThesis:
          "Curved monolithic steam chamber with heated travertine benches and integrated aromatic mist diffusion.",
        featuredMaterial: "Heated Roman Travertine & Micro-Mosaic",
        finish: "Silken Honed Non-Slip",
        dimension: "Full Subterranean Horizon",
      },
    ],
  },
];

