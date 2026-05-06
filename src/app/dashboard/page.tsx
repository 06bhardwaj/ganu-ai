'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  BarChart3, 
  MessageSquare, 
  Clock, 
  Settings, 
  User, 
  Shield, 
  Zap,
  ArrowUpRight,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalChats: 0,
    totalMessages: 0,
    lastActive: 'Just now',
    usagePercentage: 15,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 animate-pulse">Initializing your secure dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {session?.user?.name}</h1>
          <p className="text-slate-400">Here&apos;s an overview of your AI activity and usage.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Chats" 
            value={stats.totalChats.toString()} 
            icon={MessageSquare} 
            trend="+12% from last week"
            color="text-cyber-blue"
          />
          <StatCard 
            title="Messages Sent" 
            value={stats.totalMessages.toString()} 
            icon={Zap} 
            trend="+5% from yesterday"
            color="text-accent"
          />
          <StatCard 
            title="API Usage" 
            value={`${stats.usagePercentage}%`} 
            icon={BarChart3} 
            trend="Under limit"
            color="text-green-400"
          />
          <StatCard 
            title="Account Status" 
            value="Pro Plan" 
            icon={Shield} 
            trend="Renews in 12 days"
            color="text-purple-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl border border-white/10 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <span>Activity Overview</span>
                </h2>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm outline-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
              
              <div className="h-64 flex items-end justify-between space-x-2 px-4">
                {[40, 70, 45, 90, 65, 80, 55].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1 }}
                    className="w-full bg-gradient-to-t from-accent/20 to-accent rounded-t-lg relative group"
                  >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {height}%
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between mt-4 px-4 text-xs text-slate-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-8">
              <h2 className="text-xl font-bold text-white mb-6">Recent Conversations</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl border border-transparent hover:border-white/10 transition-all cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-white">How to build a Next.js app</p>
                        <p className="text-xs text-slate-500">24 messages • 2 hours ago</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <div className="glass rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Account Settings</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-all text-sm">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile Information</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-all text-sm">
                  <CreditCard className="w-4 h-4 text-slate-400" />
                  <span>Billing & Subscription</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-all text-sm text-red-400">
                  <Shield className="w-4 h-4" />
                  <span>Security & API Keys</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent to-accent-hover rounded-2xl p-6 text-primary shadow-2xl shadow-accent/20">
              <h2 className="text-lg font-bold mb-2">Upgrade to Enterprise</h2>
              <p className="text-sm opacity-90 mb-6">Get unlimited API calls, priority support, and advanced model access.</p>
              <button className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-slate-900 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/10 hover:border-accent/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
          {trend}
        </span>
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
