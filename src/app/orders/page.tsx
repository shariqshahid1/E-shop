'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { Package, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Order, CartItem } from '@/types';

export default function Orders() {
  const { userInfo } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, router]);

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
             <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                  <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px]">Your History</p>
                </div>
                <h1 className="text-6xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                  Elite <br /><span className="text-blue-600">Deployments.</span>
                </h1>
             </div>
             <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Active</span>
             </div>
          </div>

          {loading ? (
            <div className="grid gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white h-48 rounded-[3rem] animate-pulse border border-gray-100"></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-24 rounded-[4rem] shadow-2xl shadow-gray-200/50 text-center border border-gray-100 flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                 <Package className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tight">No deployments found</p>
              <p className="text-gray-500 font-bold max-w-sm mb-12 leading-relaxed">Your mission history is currently blank. Start your first elite acquisition today.</p>
              <Link
                href="/"
                className="inline-block bg-gray-900 text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-2xl shadow-gray-900/20 active:scale-95"
              >
                Launch Hub
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order: Order) => (
                <div key={order._id} className="group bg-white rounded-[3.5rem] shadow-xl shadow-gray-200/30 border border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:border-blue-100">
                  <div className="bg-gray-50/30 p-8 md:p-10 border-b border-gray-50 flex flex-wrap justify-between items-center gap-8">
                    <div className="flex flex-wrap gap-12">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Initiated On</p>
                        <p className="font-black text-lg text-gray-900 uppercase">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Investment</p>
                        <p className="font-black text-lg text-blue-600">${order.totalPrice.toFixed(2)}</p>
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Manifest ID</p>
                        <p className="font-mono text-xs text-gray-400">#{order._id.substring(0, 12).toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {order.isPaid ? (
                        <div className="flex items-center bg-green-50 text-green-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-green-100 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 mr-2" /> Verified
                        </div>
                      ) : (
                        <div className="flex items-center bg-amber-50 text-amber-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-amber-100 shadow-sm">
                          <Zap className="w-4 h-4 mr-2" /> Pending
                        </div>
                      )}
                      <Link 
                        href={`/orders/${order._id}`}
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm group-hover:bg-blue-50"
                      >
                        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex overflow-x-auto space-x-6 pb-4 custom-scrollbar">
                      {order.orderItems.map((item: CartItem, i: number) => (
                        <div key={i} className="flex-shrink-0 group/item relative">
                          <div className="w-24 h-24 rounded-3xl border border-gray-50 overflow-hidden relative shadow-sm group-hover/item:scale-105 transition-transform duration-500">
                             <Image src={item.image} alt={item.name} fill className="object-cover" title={item.name} sizes="80px" />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg">
                             {item.qty}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Deployment Status</p>
                       <div className="flex-1 mx-8 h-1 bg-gray-50 rounded-full overflow-hidden">
                          <div className={`h-full bg-blue-600 transition-all duration-1000 ${order.isDelivered ? 'w-full' : 'w-1/3'}`}></div>
                       </div>
                       <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{order.isDelivered ? 'Fulfilled' : 'In Transit'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
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
      `}</style>
    </div>
  );
}
