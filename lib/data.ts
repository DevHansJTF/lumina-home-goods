export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "p1",
<<<<<<< HEAD
    name: "Mid Century Oak Bed",
=======
    name: "Mid-Century Oak Bed",
>>>>>>> 3499689 (fix: hover effect fix for featured products)
    category: "Furniture",
    price: 899,
    description:
      "A timeless mid-century modern platform bed crafted from solid oak. Features clean lines, tapered legs, and a sturdy slat system for optimal mattress support.",
    image: "/mid-centure-bed.jpg",
    inStock: true,
  },
  {
    id: "p2",
    name: "Minimalist Ceramic Lamp",
    category: "Lighting",
    price: 85,
    description:
      "Hand-thrown ceramic table lamp with a matte white finish. The simple, organic shape brings a calming presence to any nightstand or side table.",
    image: "/minimalist-ceramic-table-lamp.jpg",
    inStock: true,
  },
  {
    id: "p3",
<<<<<<< HEAD
    name: "Velvet Tufted Emerald Sofa ",
=======
    name: "Velvet Tufted Emerald Sofa",
>>>>>>> 3499689 (fix: hover effect fix for featured products)
    category: "Furniture",
    price: 1200,
    description:
      "Luxurious emerald green velvet sofa with deep button tufting and subtle gold-finished legs. A striking centerpiece for any living room.",
    image: "/velvet-emerald-sofa.jpg",
    inStock: true,
  },
  {
    id: "p4",
    name: "Brushed Brass Floor Lamp",
    category: "Lighting",
    price: 150,
    description:
      "Slim and elegant floor lamp finished in brushed brass. Features an adjustable head and a weighted base for stability.",
    image: "/brushed-brass-lamp-floor.jpg",
    inStock: true,
  },
  {
    id: "p5",
    name: "Linen Accent Armchair",
    category: "Furniture",
    price: 350,
    description:
      "Comfortable accent chair upholstered in breathable natural linen. The curved back and plush cushioning ensure hours of relaxation.",
    image: "/linen-accent-armchair.jpg",
    inStock: true,
  },
  {
    id: "p6",
    name: "Solid Walnut Dining Table",
    category: "Furniture",
    price: 1050,
    description:
      "Spacious dining table constructed from sustainably sourced solid walnut. Seats up to eight people comfortably.",
    image: "/solid-walnut-dining-table.jpg",
    inStock: true,
  },
  {
    id: "p7",
    name: "Bouclé Dining Chairs",
    category: "Furniture",
    price: 280,
    description: "Modern dining chairs featuring highly textured bouclé fabric and sleek black metal frames.",
    image: "/bouclé-dining-chairs.jpg",
    inStock: true,
  },
  {
    id: "p8",
    name: "Handwoven Jute Area Rug",
    category: "Textiles",
    price: 200,
    description:
      "Eco-friendly 5x8 ft area rug handwoven from natural jute fibers. Adds texture and warmth to any room layout.",
    image: "/handwoven-jute-area-rug.jpg",
    inStock: true,
  },
  {
    id: "p9",
    name: "Tempered Glass Coffee Table",
    category: "Furniture",
    price: 450,
    description: "Minimalist coffee table with a clear tempered glass top and a sculptural ash wood base.",
    image: "/tempered-glass-coffee-table.jpg",
    inStock: true,
  },
  {
    id: "p10",
    name: "Floating Oak Wall Shelves",
    category: "Decor",
    price: 95,
    description:
      "Set of three floating wall shelves made from genuine oak wood. Perfect for displaying books, plants, and photos.",
    image: "/floating-oak-wall-shelves.jpg",
    inStock: true,
  },
  {
    id: "p11",
    name: "Matte Black Minimalist Nightstand",
    category: "Furniture",
    price: 120,
    description: "Compact nightstand with a single drawer and open bottom shelf, finished in a smooth matte black.",
    image: "/modern-minimalist-curved-top-solid-wood-nightstand-black.jpg",
    inStock: true,
  },
  {
    id: "p12",
    name: "Rust Terracotta Throw Pillows",
    category: "Textiles",
    price: 45,
    description:
      "Soft cotton canvas throw pillows in a warm rust terracotta hue. Includes plush down-alternative inserts.",
    image: "/rust-terracotta-throw-pillows.jpg",
    inStock: true,
  },
  {
    id: "p13",
    name: "Linen Blackout Curtains",
    category: "Textiles",
    price: 110,
    description:
      "Heavyweight linen-blend curtains with a full blackout lining. Sold as a pair, each panel measuring 50x84 inches.",
    image: "/linen-blackout-curtains.jpg",
    inStock: true,
  },
  {
    id: "p14",
    name: "Asymmetrical Brass Wall Mirror",
    category: "Decor",
    price: 175,
    description:
      "Unique asymmetrical wall mirror framed in thin, antiqued brass. A functional art piece for entryways or bedrooms.",
    image: "/asymmetrical-brass-wall-mirror.jpg",
    inStock: true,
  },
  {
    id: "p15",
    name: "Geometric LED Chandelier",
    category: "Lighting",
    price: 320,
    description: "Contemporary chandelier featuring intersecting matte black rings with integrated warm-white LEDs.",
    image: "/geometric-led-chandelier.jpg",
    inStock: true,
  },
  {
    id: "p16",
    name: "Chunky Knit Throw Blanket",
    category: "Textiles",
    price: 85,
    description: "Oversized, hand-knitted throw blanket made from ultra-soft, hypoallergenic acrylic yarn in cream.",
    image: "/chunky-knit-throw-blanket.jpg",
    inStock: true,
  },
  {
    id: "p17",
    name: "Woven Rattan Storage Basket",
    category: "Decor",
    price: 55,
    description:
      "Large, handwoven rattan basket with sturdy leather handles. Ideal for storing blankets, firewood, or toys.",
    image: "/woven-rattan-storage-basket.jpg",
    inStock: true,
  },
  {
    id: "p18",
    name: "Teak Wood Lounge Chair",
    category: "Furniture",
    price: 410,
    description: "Weather-resistant lounge chair made from grade-A teak wood. Slatted design prevents water pooling.",
    image: "/teak-wood-outdoor-lounge-chair.jpg",
    inStock: true,
  },
  {
    id: "p19",
    name: "Speckled Ceramic Vase",
    category: "Decor",
    price: 115,
    description:
      "Tall floor vase featuring a textured speckled glaze. Beautiful on its own or filled with dried pampas grass.",
    image: "/speckled-ceramic-floor-vase.jpg",
    inStock: true,
  },
  {
    id: "p20",
<<<<<<< HEAD
    name: "Ergonomic Standing Desk",
=======
    name: "Ergonomic Standing Bamboo Desk",
>>>>>>> 3499689 (fix: hover effect fix for featured products)
    category: "Furniture",
    price: 550,
    description: "Height-adjustable standing desk with a sustainable solid bamboo top and a memory keypad controller.",
    image: "/ergonomic-standing-desk.jpg",
    inStock: true,
  },
];
