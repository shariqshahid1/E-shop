'use client';

import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Heart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
           <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-1 bg-red-500 rounded-full"></div>
                <p className="text-red-500 font-black uppercase tracking-[0.3em] text-[10px]">Saved Items</p>
              </div>
              <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Elite <br /><span className="text-red-500">Wishlist.</span>
              </h1>
           </div>
           <Link href="/" className="group flex items-center text-gray-400 hover:text-gray-900 font-black text-xs uppercase tracking-widest transition-all">
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Return to Catalog
           </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white p-24 rounded-[4rem] shadow-2xl shadow-gray-200/50 text-center border border-gray-100 flex flex-col items-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
               <Heart className="w-10 h-10 text-red-200" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your vault is empty</p>
            <p className="text-gray-500 font-bold max-w-sm mb-12 leading-relaxed">Secure your favorite tech by adding them to your elite wishlist for future acquisition.</p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-2xl shadow-gray-900/20 active:scale-95"
            >
              Explore Tech
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
