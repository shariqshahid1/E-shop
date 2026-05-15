'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import api from '@/lib/api';
import { User, Mail, Shield, Calendar, Edit2, CheckCircle } from 'lucide-react';

export default function Profile() {
  const { userInfo, login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      Promise.resolve().then(() => {
        setName(n => n === '' ? userInfo.name : n);
        setEmail(e => e === '' ? userInfo.email : e);
      });
    }
  }, [userInfo, router]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await api.put('/users/profile', {
        name,
        email,
        password,
      });
      login(data);
      setMessage('Profile updated successfully!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black">
              {userInfo.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Profile</h1>
              <p className="text-gray-500 font-medium">Manage your account settings and info</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="font-bold">{userInfo.isAdmin ? 'Administrator' : 'Verified Member'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-sm">Joined May 2026</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={submitHandler} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-black text-gray-900 flex items-center">
                    <Edit2 className="w-5 h-5 mr-2 text-blue-600" /> Account Details
                  </h2>
                </div>

                {message && <div className="bg-green-50 text-green-600 p-4 rounded-2xl text-sm font-bold border border-green-100 mb-6 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" /> {message}
                </div>}
                {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm font-bold border border-red-100 mb-6">{error}</div>}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-gray-900"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <User className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          className="w-full pl-10 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-gray-900"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="absolute left-3 top-4 text-gray-400 w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-gray-900"
                        placeholder="Leave blank to keep same"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-gray-900"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 transform active:scale-95 disabled:bg-blue-400 mt-8"
                  >
                    {loading ? 'SAVING CHANGES...' : 'UPDATE PROFILE'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
