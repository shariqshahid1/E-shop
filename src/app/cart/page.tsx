'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Trash2, ShoppingBag, ChevronLeft } from 'lucide-react';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { userInfo } = useAuth();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Your Cart</h1>
          <Link href="/" className="text-xs sm:text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Continue shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl border border-gray-200">
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6 text-sm">Looks like you have not added anything yet.</p>
            <Link
              href="/"
              className="inline-block bg-gray-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white p-3 sm:p-5 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
                  <div className="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden relative bg-gray-50">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
                  </div>
                  <div className="flex-1 text-center sm:text-left w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <p className="text-xs text-blue-600 font-medium mb-1">{item.category}</p>
                        <Link href={`/product/${item._id}`} className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">${item.price} each</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <select
                          value={item.qty}
                          onChange={(e) => addToCart({ ...item, qty: Number(e.target.value) })}
                          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          {[...Array(item.countInStock || 10).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-right font-bold text-gray-900 mt-3">${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl border border-gray-200 sticky top-28">
                <h2 className="font-bold text-gray-900 mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4 mb-6 flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <Link
                  href={userInfo ? '/checkout' : '/login?redirect=checkout'}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-xs text-gray-400 text-center mt-4">
                  Taxes calculated at checkout. Secure checkout powered by Razorpay.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
