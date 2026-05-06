'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Bot, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-accent rounded-lg group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
                Ganu AI
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/#features" className="hover:text-accent px-3 py-2 transition-colors">Features</Link>
              <Link href="/#pricing" className="hover:text-accent px-3 py-2 transition-colors">Pricing</Link>
              {session ? (
                <>
                  <Link href="/chat" className="bg-accent text-primary px-4 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors">
                    Open Chat
                  </Link>
                  <div className="relative group ml-4 inline-block">
                    <button className="flex items-center space-x-2 focus:outline-none">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border border-white/10">
                        <User className="w-5 h-5" />
                      </div>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 border border-white/10">
                      <div className="px-4 py-2 text-sm border-b border-white/10 mb-2">
                        <p className="font-medium truncate">{session.user?.name}</p>
                        <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                      </div>
                      <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors">Dashboard</Link>
                      { (session?.user as any)?.role === 'admin' ? (
                        <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-white/5 transition-colors text-accent font-bold border-t border-white/5 mt-1">Admin Panel</Link>
                      ) : (
                        <p className="px-4 py-2 text-[10px] text-slate-500 uppercase">Role: {(session?.user as any)?.role || 'User'}</p>
                      )}
                      <button 
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-accent px-3 py-2 transition-colors">Login</Link>
                  <Link href="/register" className="bg-accent text-primary px-4 py-2 rounded-lg font-medium hover:bg-accent-hover transition-colors">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/#features" className="block px-3 py-2 hover:bg-white/5 rounded-md">Features</Link>
              <Link href="/#pricing" className="block px-3 py-2 hover:bg-white/5 rounded-md">Pricing</Link>
              {session ? (
                <>
                  <Link href="/chat" className="block px-3 py-2 bg-accent text-primary rounded-md font-medium">Open Chat</Link>
                  <Link href="/dashboard" className="block px-3 py-2 hover:bg-white/5 rounded-md">Dashboard</Link>
                  <button 
                    onClick={() => signOut()}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-white/5 rounded-md"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 hover:bg-white/5 rounded-md">Login</Link>
                  <Link href="/register" className="block px-3 py-2 bg-accent text-primary rounded-md font-medium">Get Started</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
