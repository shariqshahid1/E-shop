const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
  },
  {
    name: 'iPhone 13 Pro 256GB Memory',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
    description:
      'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
  },
  {
    name: 'Sony Playstation 5',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&q=80',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, Music',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80',
    description:
      'Meet Echo Dot - Our most popular voice-controlled speaker, now with a fabric design and improved speaker for richer and louder sound.',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
  },
  {
    name: 'MacBook Pro 16-inch M2',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    description:
      'Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency further than ever. It delivers exceptional performance whether it’s plugged in or not.',
    category: 'Electronics',
    price: 2499.99,
    countInStock: 5,
  },
  {
    name: 'Samsung Galaxy Tab S9',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80',
    description:
      'The new standard for premium tablets. Experience ultimate productivity and entertainment on a stunning Dynamic AMOLED 2X display.',
    category: 'Electronics',
    price: 799.99,
    countInStock: 8,
  },
  {
    name: 'Sony WH-1000XM5 Headphones',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    description:
      'Industry-leading noise cancellation and premium sound quality. The WH-1000XM5 headphones rewrite the rules for distraction-free listening.',
    category: 'Electronics',
    price: 398.00,
    countInStock: 12,
  },
  {
    name: 'Apple Watch Series 9',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    description:
      'Smarter, brighter, mightier. The most powerful chip in Apple Watch ever. A magic new way to use your watch without touching the screen.',
    category: 'Electronics',
    price: 399.00,
    countInStock: 15,
  },
  {
    name: 'Nintendo Switch OLED Model',
    image: 'https://images.unsplash.com/photo-1578303321116-b74301548842?w=800&q=80',
    description:
      'Play at home on the TV or on-the-go with a vibrant 7-inch OLED screen.',
    category: 'Electronics',
    price: 349.99,
    countInStock: 20,
  },
  {
    name: 'DJI Mini 4 Pro Drone',
    image: 'https://images.unsplash.com/photo-1473968512647-3e44a224fe8f?w=800&q=80',
    description:
      'Fly Mini, Create Big. The DJI Mini 4 Pro is our most advanced mini-camera drone to date.',
    category: 'Electronics',
    price: 759.00,
    countInStock: 4,
  },
  {
    name: 'Keychron Q1 Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1618384881928-220556c382DF?w=800&q=80',
    description:
      'A fully customizable mechanical keyboard with QMK/VIA support and a solid aluminum body.',
    category: 'Electronics',
    price: 169.00,
    countInStock: 10,
  },
  {
    name: 'Bose Smart Soundbar 900',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    description:
      'The most immersive Bose soundbar. For all your content. It’s a Dolby Atmos soundbar that does more.',
    category: 'Electronics',
    price: 899.00,
    countInStock: 6,
  },
  {
    name: 'Kindle Paperwhite (16 GB)',
    image: 'https://images.unsplash.com/photo-1594980596247-87c52a3479b1?w=800&q=80',
    description:
      'Now with a 6.8” display and thinner borders, adjustable warm light, up to 10 weeks of battery life.',
    category: 'Electronics',
    price: 149.99,
    countInStock: 30,
  },
  {
    name: 'Classic Leather Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
    description:
      'Timeless leather jacket made from premium cowhide. Features multiple pockets and a comfortable quilted lining.',
    category: 'Clothing',
    price: 199.99,
    countInStock: 15,
  },
  {
    name: 'Minimalist Wall Clock',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&q=80',
    description:
      'A sleek, minimalist wall clock that adds a touch of modern elegance to any room.',
    category: 'Home Decor',
    price: 45.00,
    countInStock: 25,
  },
  {
    name: 'Ergonomic Office Chair',
    image: 'https://images.unsplash.com/photo-1505843490701-5be5d2b3395b?w=800&q=80',
    description:
      'Designed for comfort and productivity. Features adjustable lumbar support and breathable mesh back.',
    category: 'Furniture',
    price: 289.00,
    countInStock: 12,
  },
  {
    name: 'Designer Sunglasses',
    image: 'https://images.unsplash.com/photo-1511499767390-903390e6fbc1?w=800&q=80',
    description:
      'Premium sunglasses with UV400 protection. Stylish frame that complements any face shape.',
    category: 'Accessories',
    price: 129.99,
    countInStock: 20,
  },
  {
    name: 'Smart Coffee Maker',
    image: 'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=800&q=80',
    description:
      'Brew your favorite coffee from your smartphone. Features programmable settings and a built-in grinder.',
    category: 'Appliances',
    price: 159.00,
    countInStock: 10,
  },
  {
    name: 'Running Shoes Pro',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    description:
      'High-performance running shoes with superior cushioning and grip. Lightweight and breathable.',
    category: 'Clothing',
    price: 110.00,
    countInStock: 35,
  },
  {
    name: 'Modern Table Lamp',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
    description:
      'Elegant table lamp with a soft glow. Perfect for bedside tables or study desks.',
    category: 'Home Decor',
    price: 65.00,
    countInStock: 18,
  },
  {
    name: 'Wireless Charging Pad',
    image: 'https://images.unsplash.com/photo-1586810165616-94c631fc2f79?w=800&q=80',
    description:
      'Fast wireless charging for all Qi-enabled devices. Sleek and compact design.',
    category: 'Electronics',
    price: 39.99,
    countInStock: 50,
  },
  {
    name: 'Ultra-Wide Gaming Monitor',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    description: '34-inch curved gaming monitor with 144Hz refresh rate and 1ms response time.',
    category: 'Electronics',
    price: 499.99,
    countInStock: 5,
  },
  {
    name: 'Cotton Polo Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    description: '100% organic cotton polo shirt, breathable and stylish.',
    category: 'Clothing',
    price: 35.00,
    countInStock: 40,
  },
  {
    name: 'Smart Door Lock',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    description: 'Secure your home with this smart door lock featuring fingerprint and keypad access.',
    category: 'Smart Home',
    price: 189.00,
    countInStock: 15,
  },
  {
    name: 'Acoustic Guitar',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&q=80',
    description: 'Beautiful acoustic guitar with a rich, warm tone. Perfect for beginners and pros.',
    category: 'Instruments',
    price: 249.99,
    countInStock: 8,
  },
  {
    name: 'Yoga Mat Premium',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    description: 'Eco-friendly non-slip yoga mat with extra cushioning for maximum comfort.',
    category: 'Fitness',
    price: 45.00,
    countInStock: 25,
  },
  {
    name: 'Stainless Steel Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143399827-bd9349339626?w=800&q=80',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours and hot for 12 hours.',
    category: 'Accessories',
    price: 25.00,
    countInStock: 100,
  },
  {
    name: 'Electric Stand Mixer',
    image: 'https://images.unsplash.com/photo-1594385208974-2e75f9d8ad48?w=800&q=80',
    description: 'Powerful stand mixer for all your baking needs. Includes multiple attachments.',
    category: 'Appliances',
    price: 329.00,
    countInStock: 10,
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    await Product.insertMany(products);

    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      isAdmin: true,
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
