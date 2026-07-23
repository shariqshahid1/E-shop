'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
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
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4 sm:mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to orders
        </button>
        <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Order not found</h2>
          <p className="text-gray-500 text-sm">This order does not exist or you do not have access to it.</p>
        </div>
      </main>
    </div>
  );
}
