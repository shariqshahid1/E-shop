import Link from 'next/link';
import { Mail, Phone, MapPin, ShoppingCart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">E<span className="text-blue-500">Shop</span></span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your one-stop shop for the latest electronics, gadgets, and lifestyle products.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/cart" className="hover:text-blue-600 transition-colors">Cart</Link></li>
              <li><Link href="/wishlist" className="hover:text-blue-600 transition-colors">Wishlist</Link></li>
              <li><Link href="/orders" className="hover:text-blue-600 transition-colors">My Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                123 Tech Avenue, San Francisco, CA
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                support@eshop.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} EShop. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
