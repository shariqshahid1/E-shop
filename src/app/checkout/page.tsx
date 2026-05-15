'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { CreditCard, MapPin, CheckCircle, ShieldCheck, Truck, Lock } from 'lucide-react';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { userInfo } = useAuth();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create order in our backend
      const { data: orderData } = await api.post('/orders', {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress,
        paymentMethod: 'Razorpay',
        totalPrice,
      });

      // 2. Initialize Razorpay payment
      const { data: paymentData } = await api.post('/payment/razorpay', {
        amount: totalPrice,
      });

      const res = await loadRazorpay();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_actual_key',
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'E-SHOP ELITE',
        description: 'Elite Experience Order Payment',
        order_id: paymentData.id,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            await api.put(`/orders/${orderData._id}/pay`, {
              id: response.razorpay_payment_id,
              status: 'COMPLETED',
              update_time: new Date().toISOString(),
              email_address: userInfo?.email,
            });

            setSuccess(true);
            clearCart();
          } catch (err) {
            console.error(err);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: userInfo?.name,
          email: userInfo?.email,
        },
        theme: {
          color: '#2563eb',
        },
      };

      // @ts-expect-error Razorpay is loaded via script
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Order creation failed. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <div className="w-32 h-32 bg-green-50 rounded-full flex items-center justify-center mb-10 animate-bounce-slow">
           <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-6xl font-black mb-6 text-gray-900 tracking-tighter uppercase">Payment Elite.</h1>
        <p className="text-xl text-gray-500 mb-12 max-w-md font-medium leading-relaxed">
          Your order has been verified and is now being prioritized for immediate fulfillment.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-gray-900 text-white px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl active:scale-95"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-32">
        <div className="flex items-center space-x-4 mb-16">
           <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-xl">
              <Lock className="w-7 h-7 text-white" />
           </div>
           <div>
              <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Secure Checkout</p>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">Complete Order</h1>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <form onSubmit={handlePayment} className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
              
              <div className="relative z-10">
                <h2 className="text-2xl font-black mb-10 flex items-center text-gray-900 tracking-tight">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mr-4">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  Delivery Logistics
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
                    <input
                      type="text"
                      placeholder="e.g. 123 Tech Avenue"
                      required
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:ring-0 focus:border-blue-500/30 focus:bg-white outline-none transition-all font-bold text-gray-900 text-lg placeholder:text-gray-300 shadow-inner"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                      <input
                        type="text"
                        placeholder="Silicon Valley"
                        required
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:ring-0 focus:border-blue-500/30 focus:bg-white outline-none transition-all font-bold text-gray-900 text-lg placeholder:text-gray-300 shadow-inner"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Postal Code</label>
                      <input
                        type="text"
                        placeholder="94025"
                        required
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:ring-0 focus:border-blue-500/30 focus:bg-white outline-none transition-all font-bold text-gray-900 text-lg placeholder:text-gray-300 shadow-inner"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Country</label>
                    <input
                      type="text"
                      placeholder="United States"
                      required
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:ring-0 focus:border-blue-500/30 focus:bg-white outline-none transition-all font-bold text-gray-900 text-lg placeholder:text-gray-300 shadow-inner"
                      value={shippingAddress.country}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-16 pt-10 border-t border-gray-50">
                   <div className="flex items-center justify-between mb-10 p-6 bg-blue-50 rounded-[2rem] border border-blue-100">
                      <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <CreditCard className="w-6 h-6 text-blue-600" />
                         </div>
                         <div>
                            <p className="font-black text-gray-900 text-sm">Razorpay Secure</p>
                            <p className="text-xs text-blue-500 font-bold">128-bit Encryption</p>
                         </div>
                      </div>
                      <div className="flex items-center text-green-600 space-x-1">
                         <ShieldCheck className="w-4 h-4" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                      </div>
                   </div>

                  <button
                    type="submit"
                    disabled={loading || cartItems.length === 0}
                    className="w-full group relative bg-gray-900 text-white py-8 rounded-[2.5rem] font-black text-xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-gray-900/20 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loading ? 'INITIALIZING...' : `DEPLOY PAYMENT — $${totalPrice.toFixed(2)}`}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>
            </form>

            <div className="grid grid-cols-2 gap-6">
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center"><Truck className="w-6 h-6 text-gray-900" /></div>
                  <div>
                    <p className="font-black text-gray-900 text-xs uppercase tracking-tight">Elite Shipping</p>
                    <p className="text-[10px] text-gray-500 font-medium">Global Express Delivery</p>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center"><ShieldCheck className="w-6 h-6 text-gray-900" /></div>
                  <div>
                    <p className="font-black text-gray-900 text-xs uppercase tracking-tight">Purchase Protect</p>
                    <p className="text-[10px] text-gray-500 font-medium">100% Refund Guarantee</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 sticky top-32">
              <h2 className="text-2xl font-black mb-10 text-gray-900 tracking-tight uppercase">Manifest</h2>
              <div className="space-y-8 mb-12 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center group">
                    <div className="w-24 h-24 relative rounded-3xl overflow-hidden border border-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="ml-6 flex-1">
                      <p className="font-black text-gray-900 text-lg line-clamp-1 leading-tight mb-2 uppercase tracking-tighter">{item.name}</p>
                      <div className="flex items-center justify-between">
                         <p className="text-xs text-blue-600 font-black tracking-widest bg-blue-50 px-3 py-1 rounded-full">{item.qty} UNIT{item.qty > 1 ? 'S' : ''}</p>
                         <p className="font-black text-gray-900 text-lg tracking-tighter">${(item.qty * item.price).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-6 pt-10 border-t border-gray-50">
                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs">
                  <span>Logistics</span>
                  <span className="text-green-600">Complimentary</span>
                </div>
                <div className="pt-6 flex justify-between items-end">
                  <div>
                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Grand Total</p>
                     <p className="text-5xl font-black text-gray-900 tracking-tighter">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="mb-1 text-blue-600 font-black text-xs uppercase tracking-widest">USD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e2e2;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d1d1;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
