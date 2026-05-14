'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Heart, Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const { cartItems, wishlist } = useCart();
  const { isSignedIn, isLoaded } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use scrolled state if actually scrolled OR if we're not on the Home page
  const shouldBeSolid = !isHomePage || isScrolled;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search/${keyword}`);
    } else {
      router.push('/');
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      shouldBeSolid 
        ? 'py-4 bg-white border-b border-gray-100 shadow-lg shadow-gray-200/20' 
        : 'py-8 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center space-x-2 md:space-x-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 group-hover:bg-blue-600 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl group-hover:shadow-blue-500/20 group-hover:rotate-12">
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className={`text-xl md:text-2xl font-black tracking-tighter transition-colors duration-500 ${shouldBeSolid ? 'text-gray-900' : 'text-white'}`}>
            E<span className="text-blue-500">SHOP.</span>
          </span>
        </Link>

        {/* Search Bar - Desktop */}
        <form onSubmit={submitHandler} className="hidden lg:flex flex-1 max-w-xl mx-12 relative group">
          <input
            type="text"
            placeholder="Search premium tech..."
            className={`w-full pl-14 pr-6 py-4 rounded-[1.5rem] outline-none transition-all duration-500 font-bold text-sm ${
              shouldBeSolid 
                ? 'bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500/10 text-gray-900 placeholder:text-gray-500 border border-transparent focus:border-blue-100' 
                : 'bg-white/10 focus:bg-white/20 text-white placeholder:text-gray-300 backdrop-blur-md border border-white/10'
            }`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Search className={`absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-500 ${
            shouldBeSolid ? 'text-gray-400 group-focus-within:text-blue-600' : 'text-gray-300 group-focus-within:text-white'
          }`} />
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link href="/wishlist" className={`relative p-3 rounded-2xl transition-all duration-500 group ${
            shouldBeSolid ? 'text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200' : 'text-white hover:bg-white/10'
          }`}>
            <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
            {wishlist.length > 0 && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white animate-pulse">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link href="/cart" className={`relative p-3 rounded-2xl transition-all duration-500 group ${
            shouldBeSolid ? 'text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-200' : 'text-white hover:bg-white/10'
          }`}>
            <ShoppingCart className="w-6 h-6 group-hover:text-blue-500 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoaded && isSignedIn && (
            <div className="ml-2 flex items-center space-x-4">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10 rounded-xl shadow-lg border-2 border-white/20",
                    userButtonTrigger: "hover:scale-105 transition-transform"
                  }
                }}
              />
            </div>
          )}

          {isLoaded && !isSignedIn && (
            <div className={`hidden md:block rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl active:scale-95 overflow-hidden ${
              shouldBeSolid 
                ? 'bg-gray-900 text-white hover:bg-blue-600 hover:shadow-blue-500/20' 
                : 'bg-white text-gray-900 hover:bg-blue-500 hover:text-white'
            }`}>
              <SignInButton mode="modal">
                <button className="w-full h-full px-8 py-4">Join Now</button>
              </SignInButton>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-3 lg:hidden rounded-2xl transition-colors ${
              shouldBeSolid ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-white z-[90] transition-transform duration-500 transform ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      } pt-24 md:pt-32 px-6 overflow-y-auto`}>
        <div className="flex flex-col space-y-8 text-center pb-12">
           <form onSubmit={submitHandler} className="relative group max-w-md mx-auto w-full">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-12 pr-6 py-4 md:py-5 bg-gray-100 rounded-2xl md:rounded-[2rem] outline-none font-bold text-gray-900"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
           </form>
           <nav className="flex flex-col space-y-4 md:space-y-6">
              <Link href="/" className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link href="/cart" className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase" onClick={() => setIsMobileMenuOpen(false)}>Cart</Link>
              <Link href="/wishlist" className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase" onClick={() => setIsMobileMenuOpen(false)}>Wishlist</Link>
              {isLoaded && !isSignedIn && (
                <SignInButton mode="modal">
                  <button className="text-4xl md:text-5xl font-black text-blue-600 tracking-tighter uppercase" onClick={() => setIsMobileMenuOpen(false)}>Sign In</button>
                </SignInButton>
              )}
              {isLoaded && isSignedIn && (
                <div className="flex justify-center py-4">
                  <UserButton appearance={{ elements: { userButtonAvatarBox: "w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl" } }} />
                </div>
              )}
           </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


