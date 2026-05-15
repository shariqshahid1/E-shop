'use client';

import { SignIn } from "@clerk/nextjs";
import Navbar from '@/components/Navbar';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 pt-32">
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm font-black uppercase tracking-widest rounded-2xl py-4",
              card: "shadow-2xl border border-gray-100 rounded-[3rem] p-8",
              headerTitle: "text-3xl font-black text-gray-900 tracking-tighter",
              headerSubtitle: "text-gray-400 font-medium",
              socialButtonsBlockButton: "rounded-2xl border-gray-100 hover:bg-gray-50 transition-all font-bold",
              formFieldInput: "rounded-xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all",
              footerActionLink: "text-blue-600 font-black hover:text-blue-700",
            }
          }}
          routing="path"
          path="/login"
        />
      </div>
    </div>
  );
}
