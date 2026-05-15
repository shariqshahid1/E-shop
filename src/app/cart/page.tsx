'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft, ShieldCheck, CreditCard } from 'lucide-react';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { userInfo } = useAuth();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
           <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 md:w-12 h-1 bg-blue-600 rounded-full"></div>
                <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Your Selection</p>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                Shopping <br /><span className="text-blue-600">Cart.</span>
              </h1>
           </div>
           <Link href="/" className="group flex items-center text-gray-400 hover:text-gray-900 font-black text-[10px] md:text-xs uppercase tracking-widest transition-all self-start md:self-auto">
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Exploring
           </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-12 md:p-24 rounded-3xl md:rounded-[4rem] shadow-2xl shadow-gray-200/50 text-center border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
               <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-gray-300" />
            </div>
            <p className="text-2xl md:text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">Your vault is empty</p>
            <p className="text-gray-500 font-bold max-w-sm mb-12 leading-relaxed text-sm md:text-base">It seems you haven&apos;t added any elite tech to your collection yet.</p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-10 md:px-12 py-5 md:py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-blue-600 transition-all shadow-2xl shadow-gray-900/20 active:scale-95"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
            <div className="lg:col-span-8 space-y-4 md:space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="group bg-white p-6 md:p-8 rounded-3xl md:rounded-[3rem] shadow-xl shadow-gray-200/30 flex flex-col md:flex-row items-center border border-gray-100 transition-all hover:shadow-2xl hover:border-blue-100">
                  <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 overflow-hidden rounded-2xl md:rounded-[2rem] relative border border-gray-50 group-hover:scale-105 transition-transform duration-500">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 128px, 160px" />
                  </div>
                  <div className="md:ml-10 flex-1 mt-6 md:mt-0 text-center md:text-left w-full">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                       <div>
                          <p className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-2">{item.category}</p>
                          <Link href={`/product/${item._id}`} className="text-xl md:text-2xl font-black text-gray-900 hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">
                            {item.name}
                          </Link>
                          <p className="text-gray-400 font-bold mt-1 text-sm">Unit Price: ${item.price}</p>
                       </div>
                       <div className="flex items-center justify-center md:justify-end space-x-4 md:space-x-6">
                          <div className="relative">
                            <select
                              value={item.qty}
                              onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) })}
                              className="appearance-none bg-gray-50 border-2 border-transparent rounded-xl md:rounded-2xl pl-4 md:pl-6 pr-10 md:pr-12 py-3 md:py-4 font-black text-gray-900 focus:border-blue-500/30 outline-none transition-all cursor-pointer hover:bg-gray-100 text-sm"
                            >
                              {[...Array(item.countInStock || 10).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                               <ArrowRight className="w-4 h-4 rotate-90" />
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="w-12 h-12 md:w-14 md:h-14 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl md:rounded-2xl flex items-center justify-center transition-all group/trash shadow-sm"
                          >
                            <Trash2 className="w-5 h-5 md:w-6 md:h-6 group-hover/trash:scale-110 transition-transform" />
                          </button>
                       </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-6">
                       <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Item Total</p>
                       <p className="text-xl md:text-2xl font-black text-blue-600 tracking-tighter">${(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="p-6 md:p-8 bg-blue-50 rounded-3xl md:rounded-[3rem] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                       <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <p className="text-blue-900 font-bold text-xs md:text-sm text-center md:text-left">Every order is protected by our Elite Purchase Guarantee.</p>
                 </div>
                 <div className="hidden md:flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-300" />
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Verified Payment</span>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 h-fit lg:sticky lg:top-32">
                <h2 className="text-xl md:text-2xl font-black mb-8 md:mb-10 text-gray-900 tracking-tight uppercase">Summary</h2>
                <div className="space-y-6 mb-8 md:mb-10">
                  <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    <span>Elite Logistics</span>
                    <span className="text-green-600">Complimentary</span>
                  </div>
                  <div className="border-t border-gray-50 pt-8 flex justify-between items-end">
                    <div>
                       <p className="text-[9px] md:text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Total</p>
                       <p className="text-4xl md:text-5xl font-black text-blue-600 tracking-tighter">${subtotal.toFixed(2)}</p>
                    </div>
                    <p className="mb-1 text-gray-400 font-black text-[10px] md:text-xs uppercase tracking-widest">USD</p>
                  </div>
                </div>

                <Link
                  href={userInfo ? "/checkout" : "/login?redirect=checkout"}
                  className="w-full group relative flex items-center justify-center space-x-3 bg-gray-900 text-white py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-gray-900/20"
                >
                  <span className="relative z-10 flex items-center">
                    Proceed to Deployment <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
...
                
                <p className="mt-8 text-center text-[10px] text-gray-400 font-medium leading-relaxed">
                   Taxes and duties calculated at checkout. <br />
                   Secure global checkout powered by Elite-Pay.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
