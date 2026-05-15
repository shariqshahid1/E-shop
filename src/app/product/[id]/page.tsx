'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import { ShoppingCart, Heart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Zap } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const { addToCart, addToWishlist, wishlist } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 text-center">
       <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Zap className="w-10 h-10 text-red-500" />
       </div>
       <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-4">Product Not Found</h1>
       <button onClick={() => router.push('/')} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all">Return to Hub</button>
    </div>
  );

  const isWishlisted = wishlist.some((item) => item._id === product._id);
  const fallbackImage = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=800&q=80';

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="container mx-auto px-6 py-24 md:py-32">
        <button
          onClick={() => router.back()}
          className="group flex items-center text-gray-400 hover:text-gray-900 font-black text-[10px] md:text-xs uppercase tracking-widest mb-12 md:mb-16 transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
          {/* Product Image Section */}
          <div className="lg:col-span-7">
             <div className="relative aspect-[4/5] bg-white rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 group">
                {!imgError ? (
                  <Image
                    src={product.image || fallbackImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-300">
                    <Zap className="w-20 h-20 mb-4 opacity-10" />
                    <span className="font-black uppercase tracking-widest opacity-20">Visual Preview Unavailable</span>
                  </div>
                )}
                <div className="absolute top-6 md:top-10 left-6 md:left-10 flex flex-col gap-2 md:gap-3">
                   <div className="bg-blue-600 text-white text-[9px] md:text-[10px] font-black px-4 md:px-5 py-2 md:py-2.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                      Elite Collection
                   </div>
                   {product.countInStock > 0 && (
                      <div className="bg-white/90 backdrop-blur-md text-green-600 text-[9px] md:text-[10px] font-black px-4 md:px-5 py-2 md:py-2.5 rounded-full uppercase tracking-[0.2em] shadow-xl border border-green-100">
                         In Stock
                      </div>
                   )}
                </div>
             </div>
          </div>

          {/* Product Info Section */}
          <div className="lg:col-span-5 flex flex-col mt-8 lg:mt-0">
            <div className="mb-8 md:mb-10">
              <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-3 md:mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase mb-6">{product.name}</h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center space-x-1 text-amber-500 bg-amber-50 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl border border-amber-100">
                  <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                  <span className="font-black text-xs md:text-sm">4.9</span>
                </div>
                <span className="text-gray-400 font-bold text-xs md:text-sm tracking-tight">Verified by 1,240 Buyers</span>
              </div>
            </div>

            <div className="mb-10 md:mb-12">
               <div className="flex items-baseline space-x-2">
                  <span className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">${product.price}</span>
                  <span className="text-gray-400 font-bold text-base md:text-lg uppercase tracking-widest">USD</span>
               </div>
               <p className="mt-3 md:mt-4 text-gray-400 font-bold text-xs md:text-sm">Taxes and customs duties included.</p>
            </div>
            
            <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3rem] shadow-xl shadow-gray-200/30 border border-gray-50 mb-10 md:mb-12">
              <p className="text-gray-600 leading-relaxed font-medium text-base md:text-lg mb-8">{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="flex items-center space-x-2 md:space-x-3 text-gray-900">
                    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-[9px] md:text-xs font-black uppercase tracking-widest">2 Year Warranty</span>
                 </div>
                 <div className="flex items-center space-x-2 md:space-x-3 text-gray-900">
                    <Truck className="w-4 h-4 md:w-5 md:h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-[9px] md:text-xs font-black uppercase tracking-widest">Fast Delivery</span>
                 </div>
              </div>
            </div>

            <div className="mt-auto space-y-6">
              {product.countInStock > 0 && (
                <div className="flex items-center justify-between bg-gray-50 p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 mb-6 md:mb-8">
                  <span className="font-black text-gray-900 uppercase tracking-widest text-[10px] md:text-xs">Specify Quantity</span>
                  <div className="flex items-center space-x-4 md:space-x-6">
                     <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center font-black text-base md:text-lg shadow-sm hover:bg-gray-100 transition-all border border-gray-100">-</button>
                     <span className="font-black text-lg md:text-xl text-gray-900 w-6 md:w-8 text-center">{qty}</span>
                     <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center font-black text-base md:text-lg shadow-sm hover:bg-gray-100 transition-all border border-gray-100">+</button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => addToCart({ ...product, qty })}
                  disabled={product.countInStock === 0}
                  className="flex-1 group relative bg-gray-900 text-white px-8 md:px-10 py-5 md:py-7 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-gray-900/20 disabled:bg-gray-100 disabled:text-gray-300"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                    Add to Manifest
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <button
                  onClick={() => addToWishlist(product)}
                  className={`h-16 md:h-auto sm:w-20 rounded-2xl md:rounded-[2rem] border-2 transition-all flex items-center justify-center group ${
                    isWishlisted 
                      ? 'bg-red-500 border-red-500 text-white shadow-xl shadow-red-500/20' 
                      : 'bg-white border-gray-100 text-gray-300 hover:border-red-200 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 md:w-7 md:h-7 transition-all ${isWishlisted ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                </button>
              </div>
            </div>
            
            <div className="mt-10 md:mt-12 grid grid-cols-3 gap-4 md:gap-6 pt-10 md:pt-12 border-t border-gray-100">
               <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4"><Truck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /></div>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-900 uppercase tracking-widest">Complimentary <br />Logistics</p>
               </div>
               <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4"><RotateCcw className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /></div>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-900 uppercase tracking-widest">30-Day Elite <br />Protection</p>
               </div>
               <div className="text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4"><ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" /></div>
                  <p className="text-[8px] md:text-[9px] font-black text-gray-900 uppercase tracking-widest">Secure <br />Cloud-Pay</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
