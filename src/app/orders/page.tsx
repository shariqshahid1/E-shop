'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Package } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Orders() {
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
  }, [userInfo, router]);

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">My Orders</h1>

        <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-gray-200">
          <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-200 mx-auto mb-4" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6 text-sm">When you place an order, it will show up here.</p>
          <Link
            href="/"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    </div>
  );
}
