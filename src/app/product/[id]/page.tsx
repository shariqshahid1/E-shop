'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import allProducts from '@/data/products';
import { ShoppingCart, Heart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const { addToCart, addToWishlist, wishlist } = useCart();
  const router = useRouter();

  useEffect(() => {
    const found = allProducts.find((p) => p._id === id);
    setProduct(found || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h1>
        <p className="text-gray-500 mb-6">The product you are looking for does not exist or has been removed.</p>
        <button onClick={() => router.push('/')} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
          Go Back Home
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some((item) => item._id === product._id);
  const fallbackImage = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80';

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-28 md:pb-20">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16">
          <div className="relative aspect-square bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200">
            {!imgError ? (
              <Image
                src={product.image || fallbackImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                <span className="text-sm">No image available</span>
              </div>
            )}
            {product.countInStock > 0 && (
              <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                In Stock
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">{product.category}</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm text-gray-500">4.9 (1,240 reviews)</span>
            </div>

            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-5">${product.price.toLocaleString()}</p>

            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 sm:mb-8 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>2 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
                <span>30-Day Returns</span>
              </div>
            </div>

            {product.countInStock > 0 ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold text-gray-900">{qty}</span>
                    <button
                      onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                      className="w-10 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-50 transition-colors rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-400">{product.countInStock} available</span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart({ ...product, qty })}
                    className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className={`px-5 py-3.5 rounded-xl border-2 transition-colors ${
                      isWishlisted
                        ? 'bg-red-50 border-red-200 text-red-500'
                        : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </>
            ) : (
              <p className="text-red-500 font-semibold">This product is currently out of stock.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
