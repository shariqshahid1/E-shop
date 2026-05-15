const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const products = [
  // --- ELECTRONICS ---
  {
    name: 'MacBook Pro 16" M3 Max',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    description: 'The most powerful MacBook ever, featuring the M3 Max chip for professional-grade performance.',
    category: 'Laptops',
    price: 3499.00,
    countInStock: 5,
  },
  {
    name: 'iPhone 15 Pro Max Titanium',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    description: 'Experience the future with a titanium design, A17 Pro chip, and advanced camera system.',
    category: 'Phones',
    price: 1199.99,
    countInStock: 10,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1675243015569-80791485600f?w=800&q=80',
    description: 'Industry-leading noise cancellation and premium sound quality for the elite listener.',
    category: 'Audio',
    price: 399.00,
    countInStock: 15,
  },
  {
    name: 'PlayStation 5 Console',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
    description: 'Next-gen gaming with lightning-fast SSD and immersive 3D audio.',
    category: 'Electronics',
    price: 499.99,
    countInStock: 8,
  },
  {
    name: 'DJI Mini 4 Pro Drone',
    image: 'https://images.unsplash.com/photo-1508614589041-895b83967a4f?w=800&q=80',
    description: 'Capture stunning 4K aerial shots with this lightweight, high-performance drone.',
    category: 'Electronics',
    price: 759.00,
    countInStock: 4,
  },
  {
    name: 'Apple Watch Series 9',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    description: 'The ultimate health and fitness companion with a brighter-than-ever display.',
    category: 'Phones',
    price: 399.00,
    countInStock: 20,
  },
  {
    name: 'Canon EOS R5 Mirrorless',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    description: 'Professional-grade mirrorless camera with 45MP resolution and 8K video.',
    category: 'Electronics',
    price: 3899.00,
    countInStock: 3,
  },
  {
    name: 'Keychron Q1 Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    description: 'Fully customizable mechanical keyboard with premium aluminum body.',
    category: 'Electronics',
    price: 189.00,
    countInStock: 12,
  },

  // --- FASHION & ACCESSORIES ---
  {
    name: 'Premium Leather Moto Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    description: 'Handcrafted from genuine top-grain leather for a timeless, rugged look.',
    category: 'Clothing',
    price: 249.00,
    countInStock: 10,
  },
  {
    name: 'Elite Ray-Ban Sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    description: 'Classic luxury eyewear with polarized lenses for ultimate protection.',
    category: 'Clothing',
    price: 159.99,
    countInStock: 25,
  },
  {
    name: 'Nike Air Jordan 1 Low',
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800&q=80',
    description: 'Iconic street style with premium comfort and lasting durability.',
    category: 'Clothing',
    price: 129.00,
    countInStock: 15,
  },
  {
    name: 'Minimalist Titanium Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: 'Sleek, lightweight titanium watch for the modern professional.',
    category: 'Appliances',
    price: 299.00,
    countInStock: 18,
  },

  // --- HOME & LIFESTYLE ---
  {
    name: 'Modern Velvet Accent Chair',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    description: 'Luxurious velvet chair that adds a touch of sophistication to any room.',
    category: 'Furniture',
    price: 499.00,
    countInStock: 6,
  },
  {
    name: 'Smart Espresso Station',
    image: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=800&q=80',
    description: 'Barista-quality coffee at home with intelligent temperature control.',
    category: 'Appliances',
    price: 899.00,
    countInStock: 4,
  },
  {
    name: 'Pure Copper Water Vessel',
    image: 'https://images.unsplash.com/photo-1523362628744-0c14a394bc85?w=800&q=80',
    description: 'Artisanal hammered copper bottle for a healthy and stylish lifestyle.',
    category: 'Furniture',
    price: 65.00,
    countInStock: 40,
  },
  {
    name: 'Minimalist Walnut Desk',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&q=80',
    description: 'Solid walnut desk designed for the ultimate minimalist workspace.',
    category: 'Furniture',
    price: 1299.00,
    countInStock: 3,
  },
  {
    name: 'Dyson V15 Detect Vacuum',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
    description: 'The most powerful, intelligent cordless vacuum with laser illumination.',
    category: 'Appliances',
    price: 749.00,
    countInStock: 7,
  },
  {
    name: 'Premium Yoga Manifest Mat',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    description: 'High-grip, eco-friendly mat designed for elite yoga practice.',
    category: 'Furniture',
    price: 95.00,
    countInStock: 30,
  },
  {
    name: 'Acoustic Mahogany Guitar',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    description: 'Handcrafted mahogany guitar for a rich, warm acoustic experience.',
    category: 'Electronics',
    price: 849.00,
    countInStock: 5,
  },
  {
    name: 'Smart Mirror 4K Display',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    description: 'Interactive smart mirror with built-in fitness tracking and news feed.',
    category: 'Electronics',
    price: 1599.00,
    countInStock: 2,
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Elite Catalog Imported Successfully with 20 Premium Items!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
