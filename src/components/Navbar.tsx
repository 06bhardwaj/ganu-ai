'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Bot, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2.5 bg-accent rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-accent/20">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-white leading-none">
                  GANU <span className="text-accent">AI</span>
                </span>
                <span className="text-[8px] font-black tracking-[0.3em] uppercase text-slate-500">Neural Net</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link href="/#features" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-all">Features</Link>
              <Link href="/#tech" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-accent transition-all">Infrastructure</Link>
              
              <div className="h-4 w-px bg-white/10 mx-2" />
              
              <ThemeToggle />

              {session ? (
                <div className="flex items-center space-x-6">
                  <Link href="/chat" className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95">
                    Terminal
                  </Link>
                  <div className="relative group inline-block">
                    <button className="flex items-center space-x-3 focus:outline-none p-1 pr-3 rounded-full hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-primary font-black shadow-lg">
                        {session.user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-white">{session.user?.name?.split(' ')[0]}</span>
                    </button>
                    <div className="absolute right-0 mt-3 w-56 glass rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 border border-white/10 overflow-hidden">
                      <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                      <div className="px-5 py-3 border-b border-white/5 mb-2 relative">
                        <p className="font-black text-xs text-white truncate uppercase tracking-tighter">{session.user?.name}</p>
                        <p className="text-[10px] text-slate-500 truncate font-bold">{session.user?.email}</p>
                      </div>
                      <Link href="/dashboard" className="block px-5 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-accent hover:bg-accent/5 transition-all">Command Center</Link>
                      { (session?.user as any)?.role === 'admin' && (
                        <Link href="/admin" className="block px-5 py-2.5 text-xs font-black uppercase tracking-widest text-accent hover:bg-accent/10 transition-all border-t border-white/5 mt-1">Admin Access</Link>
                      )}
                      <button 
                        onClick={() => signOut()}
                        className="w-full text-left px-5 py-2.5 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all flex items-center space-x-3"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Terminate Link</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link href="/login" className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Login</Link>
                  <Link href="/register" className="bg-accent hover:bg-accent-hover text-primary px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-accent/20 active:scale-95">
                    Activate Account
                  </Link>
                </div>
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
