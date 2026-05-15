'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import api from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { Product } from '@/types';

import { Smartphone, Laptop, Headphones, ShoppingBag, Sofa, Coffee, ChevronRight, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { name: 'Phones', icon: Smartphone, color: 'bg-blue-50 text-blue-600', hover: 'group-hover:bg-blue-600 group-hover:text-white' },
    { name: 'Laptops', icon: Laptop, color: 'bg-purple-50 text-purple-600', hover: 'group-hover:bg-purple-600 group-hover:text-white' },
    { name: 'Audio', icon: Headphones, color: 'bg-green-50 text-green-600', hover: 'group-hover:bg-green-600 group-hover:text-white' },
    { name: 'Clothing', icon: ShoppingBag, color: 'bg-orange-50 text-orange-600', hover: 'group-hover:bg-orange-600 group-hover:text-white' },
    { name: 'Furniture', icon: Sofa, color: 'bg-indigo-50 text-indigo-600', hover: 'group-hover:bg-indigo-600 group-hover:text-white' },
    { name: 'Appliances', icon: Coffee, color: 'bg-amber-50 text-amber-600', hover: 'group-hover:bg-amber-600 group-hover:text-white' },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (err: unknown) {
        console.error('Error fetching products:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to connect to the elite server.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-900 pt-48 md:pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80" 
            fill
            className="object-cover object-center opacity-60 scale-105 animate-pulse-slow"
            alt="Hero background"
            priority
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-blue-600/10 backdrop-blur-md border border-blue-500/20 px-4 py-2 rounded-full mb-6 md:mb-8 animate-fade-in-up">
              <Zap className="w-4 h-4 text-blue-400 fill-current" />
              <span className="text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">Next-Gen Tech is Here</span>
            </div>
            
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-black text-white leading-[0.8] tracking-tighter mb-6 md:mb-8 animate-fade-in-up delay-100 uppercase">
              ELITE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">EXPERIENCE.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-400 mb-10 md:mb-12 max-w-2xl leading-relaxed font-medium animate-fade-in-up delay-200">
              Discover a curated selection of premium electronics and lifestyle products designed for those who demand excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 animate-fade-in-up delay-300">
              <button className="group relative bg-blue-600 text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/20">
                <span className="relative z-10 flex items-center justify-center">
                  START EXPLORING <ChevronRight className="ml-2 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <button className="bg-white/5 backdrop-blur-xl border border-white/10 text-white px-8 md:px-12 py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                VIEW COLLECTIONS
              </button>
            </div>
          </div>
        </div>

        {/* Floating Features */}
        <div className="absolute bottom-12 right-12 hidden xl:grid grid-cols-2 gap-4 animate-fade-in delay-500">
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-48">
              <p className="text-blue-400 font-black text-2xl mb-1">4.9/5</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Average Rating</p>
           </div>
           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] w-48">
              <p className="text-blue-400 font-black text-2xl mb-1">24H</p>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Global Support</p>
           </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gray-50 rounded-2xl"><Truck className="w-6 h-6 text-gray-900" /></div>
              <div>
                <p className="font-black text-gray-900 text-sm uppercase tracking-tight">Free Shipping</p>
                <p className="text-xs text-gray-500 font-medium">On orders over $500</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gray-50 rounded-2xl"><ShieldCheck className="w-6 h-6 text-gray-900" /></div>
              <div>
                <p className="font-black text-gray-900 text-sm uppercase tracking-tight">Secure Payment</p>
                <p className="text-xs text-gray-500 font-medium">100% encrypted</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gray-50 rounded-2xl"><RotateCcw className="w-6 h-6 text-gray-900" /></div>
              <div>
                <p className="font-black text-gray-900 text-sm uppercase tracking-tight">Easy Returns</p>
                <p className="text-xs text-gray-500 font-medium">30-day guarantee</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gray-50 rounded-2xl"><Zap className="w-6 h-6 text-gray-900" /></div>
              <div>
                <p className="font-black text-gray-900 text-sm uppercase tracking-tight">Fast Delivery</p>
                <p className="text-xs text-gray-500 font-medium">Global reach</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Curated Selections</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Shop by <span className="text-blue-600">Lifestyle</span></h2>
            </div>
            <button className="group flex items-center text-gray-900 font-black text-sm uppercase tracking-widest hover:text-blue-600 transition-colors self-start md:self-auto">
              Explore All <div className="ml-4 w-10 h-10 md:w-12 md:h-12 bg-gray-900 group-hover:bg-blue-600 rounded-full flex items-center justify-center text-white transition-all transform group-hover:rotate-45"><ChevronRight className="w-5 h-5" /></div>
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`aspect-square rounded-3xl md:rounded-[3rem] ${cat.color} ${cat.hover} flex items-center justify-center mb-4 md:mb-6 transition-all duration-700 shadow-sm group-hover:shadow-2xl group-hover:shadow-blue-500/20 transform group-hover:-translate-y-4`}>
                  <cat.icon className="w-10 h-10 md:w-12 md:h-12 transition-transform duration-700 group-hover:scale-110" />
                </div>
                <p className="text-center font-black text-gray-900 text-xs md:text-sm uppercase tracking-widest group-hover:text-blue-600 transition-colors">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-16 md:py-32 bg-white rounded-3xl md:rounded-[4rem] shadow-2xl shadow-gray-200/50 mb-16 md:mb-32 border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 md:mb-20 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 md:w-12 h-1 bg-blue-600 rounded-full"></div>
              <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Editor&apos;s Choice</p>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
              Featured <br /><span className="text-blue-600">Collections.</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button className="px-6 md:px-8 py-3 md:py-4 bg-gray-50 hover:bg-gray-100 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all">All Products</button>
            <button className="px-6 md:px-8 py-3 md:py-4 text-gray-400 hover:text-gray-900 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all">Trending</button>
            <button className="px-6 md:px-8 py-3 md:py-4 text-gray-400 hover:text-gray-900 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all">Newest</button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-100 aspect-square rounded-[2.5rem] mb-6"></div>
                <div className="h-4 bg-gray-100 rounded-full w-2/3 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded-full w-1/3"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-32 bg-red-50 rounded-[4rem] border-4 border-dashed border-red-100">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
               <Zap className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">System Offline</h3>
            <p className="text-gray-500 font-bold max-w-md mx-auto leading-relaxed">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-10 bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl"
            >
              Re-establish Connection
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-[4rem] border-4 border-dashed border-gray-100">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
               <ShoppingBag className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">No Products Found</h3>
            <p className="text-gray-500 font-bold max-w-md mx-auto leading-relaxed">We&apos;re currently updating our catalog with new premium arrivals. Please ensure you have run the seed command in the backend.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-10 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
            >
              Refresh Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <section className="container mx-auto px-6 mb-32">
        <div className="bg-blue-600 rounded-[4rem] p-12 md:p-24 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">Join the Inner Circle.</h2>
            <p className="text-blue-100 text-lg mb-12 font-medium">Subscribe to receive early access to new drops, exclusive offers, and tech insights.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] px-8 py-6 text-white placeholder:text-blue-200 outline-none focus:bg-white/20 transition-all font-bold"
              />
              <button className="bg-white text-blue-600 px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}

