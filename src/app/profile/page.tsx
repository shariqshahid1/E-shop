'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { CheckCircle } from 'lucide-react';

export default function Profile() {
  const { userInfo, updateProfile } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, router]);

  if (!userInfo) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!name.trim() || !email.trim()) {
      setError('Name and email are required');
      return;
    }

    updateProfile(name.trim(), email.trim());
    setMessage('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold shrink-0">
              {userInfo.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{userInfo.name}</h1>
              <p className="text-xs sm:text-sm text-gray-500 truncate">{userInfo.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-8 rounded-2xl border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-5 sm:mb-6">Edit Profile</h2>

            {message && (
              <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> {message}
              </div>
            )}
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium mb-4">{error}</div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
