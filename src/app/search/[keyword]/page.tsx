'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import { Search } from 'lucide-react';
import allProducts from '@/data/products';

export default function SearchResults() {
  const { keyword } = useParams();
  const searchTerm = decodeURIComponent(keyword as string);

  const results = useMemo(() => {
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        <div className="mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Search results for &quot;{searchTerm}&quot;
          </h1>
          <p className="text-gray-500">{results.length} product{results.length !== 1 ? 's' : ''} found</p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-lg text-gray-500 mb-6">No products match your search.</p>
            <a href="/" className="text-blue-600 font-semibold hover:underline">
              Browse all products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {results.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
