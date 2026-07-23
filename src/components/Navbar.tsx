'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart, Heart, Search, Menu, X, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { cartItems, wishlist } = useCart();
  const { userInfo, logout } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
      setMobileOpen(false);
      setKeyword('');
    }
  };

  const doLogout = () => {
    logout();
    setMobileOpen(false);
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
      scrolled ? 'bg-white/95 backdrop-blur-sm border-gray-100 shadow-sm' : 'bg-white border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">
            E<span className="text-blue-600">Shop</span>
          </span>
        </Link>

        {/* Search - desktop only */}
        <form onSubmit={search} className="hidden md:flex flex-1 max-w-md mx-6 relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500/20"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-0.5">
          <Link href="/wishlist" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
            )}
          </Link>

          <Link href="/cart" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </Link>

          {userInfo ? (
            <>
              <Link href="/profile" className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <button onClick={doLogout} className="hidden sm:flex p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2 ml-1">
              <Link href="/login" className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                Sign In
              </Link>
              <Link href="/signup" className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            <form onSubmit={search} className="relative mb-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 outline-none"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </form>
            <Link href="/" className="block py-2.5 px-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/cart" className="block py-2.5 px-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>Cart</Link>
            <Link href="/wishlist" className="block py-2.5 px-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>Wishlist</Link>
            <Link href="/orders" className="block py-2.5 px-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>My Orders</Link>
            {userInfo ? (
              <>
                <Link href="/profile" className="block py-2.5 px-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg" onClick={() => setMobileOpen(false)}>Profile</Link>
                <button onClick={doLogout} className="block w-full text-left py-2.5 px-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg">Sign Out</button>
              </>
            ) : (
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <Link href="/login" className="flex-1 text-center py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Sign In</Link>
                <Link href="/signup" className="flex-1 text-center py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
