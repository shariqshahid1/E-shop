import Link from 'next/link';
import { Mail, Phone, MapPin, ShoppingCart, ArrowRight } from 'lucide-react';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 2-2 69.44 69.44 0 0 1 15 0 2 2 0 0 1 2 2 24.12 24.12 0 0 1 0 10 2 2 0 0 1-2 2 69.44 69.44 0 0 1-15 0 2 2 0 0 1-2-2Z"/><path d="m10 15 5-3-5-3v6Z"/></svg>
);

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 pt-32 pb-12 overflow-hidden relative border-t border-gray-900">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-4">
            <Link href="/" className="group flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl shadow-blue-600/20 group-hover:rotate-12">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter text-white">
                E<span className="text-blue-500">SHOP.</span>
              </span>
            </Link>
            <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-sm font-medium">
              Redefining the digital shopping experience with premium tech, elite support, and global reach. Join the future of commerce.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: InstagramIcon, color: 'hover:bg-pink-600' },
                { icon: TwitterIcon, color: 'hover:bg-blue-400' },
                { icon: FacebookIcon, color: 'hover:bg-blue-700' },
                { icon: YoutubeIcon, color: 'hover:bg-red-600' }
              ].map((social, i) => (
                <a key={i} href="#" className={`w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-white transition-all duration-300 ${social.color}`}>
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Collections', 'Trending', 'Wishlist', 'Cart'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="group flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Support Hub</h4>
            <ul className="space-y-4">
              {['Terms of Service', 'Privacy Policy', 'Shipping Guide', 'Return Center', 'Secure Payments'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Direct Contact</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <MapPin className="w-5 h-5 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-tight">Global HQ</p>
                  <p className="text-sm font-medium text-gray-300">123 Tech Avenue, Silicon Valley, CA</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Phone className="w-5 h-5 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-tight">24/7 Hotline</p>
                  <p className="text-sm font-medium text-gray-300">+1 (555) ELITE-TECH</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Mail className="w-5 h-5 text-blue-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-tight">Direct Support</p>
                  <p className="text-sm font-medium text-gray-300">support@eshop.elite</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm font-bold tracking-tight text-gray-400">
            &copy; {new Date().getFullYear()} <span className="text-white">ESHOP.</span> Developed for the Elite.
          </p>
          <div className="flex items-center space-x-8 text-xs font-black uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-white transition-colors">System Status</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">English (US)</a>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10"></div>
    </footer>
  );
};

export default Footer;

