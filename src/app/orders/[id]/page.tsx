'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import Image from 'next/image';
import { CheckCircle2, XCircle, ArrowLeft, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { Order, CartItem } from '@/types';

export default function OrderDetail() {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
      return;
    }

    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, userInfo, router]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!order) return <div className="p-12 text-center font-bold">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-8 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to orders
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Order Details</h1>
              <p className="text-gray-500 font-mono text-sm mt-1">ID: #{order._id}</p>
            </div>
            <div className="flex items-center space-x-3">
              {order.isPaid ? (
                <span className="flex items-center bg-green-50 text-green-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border border-green-100">
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Paid on {order.paidAt && new Date(order.paidAt).toLocaleDateString()}
                </span>
              ) : (
                <span className="flex items-center bg-red-50 text-red-600 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider border border-red-100">
                  <XCircle className="w-5 h-5 mr-2" /> Payment Pending
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <ShoppingBag className="w-6 h-6 mr-2 text-blue-600" /> Order Items
                </h2>
                <div className="divide-y">
                  {order.orderItems.map((item: CartItem, i: number) => (
                    <div key={i} className="py-6 flex items-center first:pt-0 last:pb-0">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-100 relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="ml-6 flex-1">
                        <p className="font-bold text-gray-900 leading-tight">{item.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.qty} x ${item.price}</p>
                      </div>
                      <p className="font-black text-gray-900">${(item.qty * item.price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-2 text-blue-600" /> Shipping
                </h2>
                <div className="text-gray-600 space-y-1 font-medium">
                  <p className="font-bold text-gray-900">{order.user.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-600" /> Payment Info
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold uppercase tracking-widest text-gray-400">
                    <span>Method</span>
                    <span className="text-gray-900">{order.paymentMethod}</span>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span className="font-bold">Items Total</span>
                      <span className="font-black">${order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="font-bold">Shipping</span>
                      <span className="text-green-600 font-black tracking-widest uppercase text-xs">Free</span>
                    </div>
                    <div className="flex justify-between text-xl font-black pt-2 border-t text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-600">${order.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
