'use client';

import { useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import initialProducts from '@/data/products';
import { Smartphone, Laptop, Headphones, ShoppingBag, Sofa, Coffee } from 'lucide-react';

export default function Home() {
  const [products] = useState(initialProducts);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { name: 'All', icon: null },
    { name: 'Phones', icon: Smartphone },
    { name: 'Laptops', icon: Laptop },
    { name: 'Audio', icon: Headphones },
    { name: 'Electronics', icon: ShoppingBag },
    { name: 'Clothing', icon: Sofa },
    { name: 'Appliances', icon: Coffee },
  ];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden mt-14">
        <Image
          src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80"
          fill
          className="object-cover"
          alt="Hero background"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="max-w-lg">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wide">New arrivals are in</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4">
              Find your next<br />
              <span className="text-blue-400">favorite gadget.</span>
            </h1>
            <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Handpicked tech products at prices you will actually like. Free shipping on orders over $500.
            </p>
            <a
              href="#products"
              className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Browse Categories</h2>
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat.icon && <cat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="pb-12 sm:pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h2>
            <span className="text-xs sm:text-sm text-gray-500">{filteredProducts.length} items</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white border-t border-gray-100 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: 'Genuine Products', desc: 'Every item verified with manufacturer warranty.', icon: 'M5 13l4 4L19 7' },
              { title: 'Free Shipping', desc: 'Free delivery on all orders above $500.', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
              { title: 'Secure Payment', desc: '100% secure checkout with Razorpay.', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
            ].map((f) => (
              <div key={f.title} className="flex items-start gap-3 sm:text-center sm:flex-col sm:items-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} /></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 md:p-14 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Stay in the loop</h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto">
              Get notified about new product drops and exclusive deals. No spam, we promise.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 sm:py-3 text-gray-900 placeholder:text-gray-400 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
