'use client';

import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-gray-200">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6 text-sm">Save items you like by clicking the heart icon on any product.</p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
