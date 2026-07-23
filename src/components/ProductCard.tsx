'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [imgError, setImgError] = useState(false);

  const isWishlisted = wishlist.some((item) => item._id === product._id);
  const fallbackImage = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80';

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
      <Link href={`/product/${product._id}`} className="relative block aspect-square bg-gray-50 overflow-hidden">
        {!imgError ? (
          <Image
            src={product.image || fallbackImage}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            <span className="text-xs sm:text-sm">No image</span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-lg shadow-sm transition-colors ${
            isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {product.countInStock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Sold Out
          </div>
        )}
      </Link>

      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <span className="text-[10px] sm:text-xs text-blue-600 font-semibold uppercase tracking-wide mb-0.5 sm:mb-1">{product.category}</span>
        <Link href={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-2 text-xs sm:text-sm leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm sm:text-base font-bold text-gray-900">${product.price.toLocaleString()}</span>
          <button
            onClick={() => addToCart({ ...product, qty: 1 })}
            disabled={product.countInStock === 0}
            className="p-2 sm:p-2.5 bg-gray-900 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
