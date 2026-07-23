'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import allProducts from '@/data/products';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      router.push('/login');
      return;
    }
    setProducts(allProducts);
  }, [userInfo, router]);

  const deleteHandler = (id: string) => {
    setProducts(products.filter((p) => p._id !== id));
  };

  const createProductHandler = () => {
    const newProduct: Product = {
      _id: String(Date.now()),
      name: 'New Product',
      price: 0,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      category: 'Category',
      countInStock: 0,
      description: 'Product description goes here.',
    };
    setProducts([newProduct, ...products]);
  };

  if (!userInfo || !userInfo.isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Products
          </h1>
          <button
            onClick={createProductHandler}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
          <table className="w-full text-left min-w-[560px]">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Category</th>
                <th className="px-3 sm:px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-5 py-3 text-xs text-gray-400 font-mono">{product._id.substring(0, 8)}...</td>
                  <td className="px-3 sm:px-5 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-3 sm:px-5 py-3 text-sm font-semibold text-gray-900">${product.price}</td>
                  <td className="px-3 sm:px-5 py-3 text-sm text-gray-500 hidden sm:table-cell">{product.category}</td>
                  <td className="px-3 sm:px-5 py-3 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => deleteHandler(product._id)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
