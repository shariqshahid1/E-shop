'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';
import { Product } from '@/types';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  return (
    <div className="group bg-white rounded-3xl md:rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-4">
      {/* Image Container */}
      <Link href={`/product/${product._id}`} className="relative block h-64 md:h-80 overflow-hidden m-3 md:m-4 rounded-2xl md:rounded-[2rem]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Badges */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-col gap-2">
          {product.countInStock === 0 ? (
            <div className="bg-red-500 text-white text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-[0.2em] shadow-lg backdrop-blur-md">
              Sold Out
            </div>
          ) : (
            <div className="bg-blue-600 text-white text-[9px] md:text-[10px] font-black px-3 md:px-4 py-1.5 md:py-2 rounded-full uppercase tracking-[0.2em] shadow-lg flex items-center">
              <Zap className="w-3 h-3 mr-1 md:mr-1.5 fill-current" /> Trending
            </div>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(product);
          }}
          className={`absolute top-4 md:top-6 right-4 md:right-6 p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-110 z-10 backdrop-blur-md ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-900 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 md:w-5 md:h-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View (Desktop Only) */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 w-full px-8 hidden md:block">
           <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white py-3 rounded-2xl text-center text-xs font-black uppercase tracking-widest shadow-2xl">
              View Details
           </div>
        </div>
      </Link>

      <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <span className="text-blue-700 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] bg-blue-50 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-blue-200">
            {product.category || 'Premium'}
          </span>
          <div className="flex items-center text-amber-600 bg-amber-50 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-amber-200">
            <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current mr-1 md:mr-1.5" />
            <span className="text-[10px] md:text-[11px] font-black tracking-tight">4.9</span>
          </div>
        </div>
        
        {/* Title */}
        <Link href={`/product/${product._id}`}>
          <h3 className="text-lg md:text-xl font-black text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-4 md:mb-6 leading-tight tracking-tight">
            {product.name}
          </h3>
        </Link>
        
        {/* Pricing & Add to Cart */}
        <div className="mt-auto pt-6 md:pt-8 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[8px] md:text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1 md:mb-1.5">Elite Price</p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-black text-gray-900 leading-none tracking-tighter">${product.price}</span>
            </div>
          </div>
          
          <button
            onClick={() => addToCart({ ...product, qty: 1 })}
            disabled={product.countInStock === 0}
            className="group/btn flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gray-900 text-white rounded-xl md:rounded-2xl hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed transition-all duration-500 shadow-xl hover:shadow-blue-500/40 transform active:scale-95"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 transform group-hover/btn:scale-110 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
