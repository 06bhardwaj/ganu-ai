'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Users, 
  MessageSquare, 
  BarChart, 
  ShieldCheck, 
  AlertTriangle,
  Activity,
  Search,
  MoreVertical,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (session?.user as any).role !== 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#020617] text-white">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 animate-pulse">Accessing Admin Control Center...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-slate-400">Manage users, monitor API usage, and view system analytics.</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <button className="px-4 py-2 glass rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 flex items-center space-x-2">
                <BarChart className="w-4 h-4" />
                <span>Export Data</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 border border-white/10 z-20">
                <button 
                  onClick={() => window.open('/api/admin/export?collection=users')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                >
                  Export Users (JSON)
                </button>
                <button 
                  onClick={() => window.open('/api/admin/export?collection=chats')}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors"
                >
                  Export Chats (JSON)
                </button>
              </div>
            </div>
            <button className="px-4 py-2 bg-accent text-primary rounded-xl font-bold text-sm hover:bg-accent-hover shadow-lg shadow-accent/20">
              System Settings
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <AdminStatCard title="Total Users" value="1,284" icon={Users} trend="+12%" positive={true} />
          <AdminStatCard title="Total Messages" value="45.2k" icon={MessageSquare} trend="+24%" positive={true} />
          <AdminStatCard title="API Costs" value="$142.50" icon={Activity} trend="-8%" positive={true} />
          <AdminStatCard title="System Health" value="99.9%" icon={ShieldCheck} trend="Stable" positive={true} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Management Table */}
          <div className="lg:col-span-2 glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold text-white">User Management</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-accent"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Usage</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { name: 'Alex Johnson', email: 'alex@example.com', status: 'Active', role: 'User', usage: 'High' },
                    { name: 'Sarah Miller', email: 'sarah@example.com', status: 'Active', role: 'Admin', usage: 'Medium' },
                    { name: 'David Smith', email: 'david@example.com', status: 'Blocked', role: 'User', usage: 'None' },
                    { name: 'Emma Wilson', email: 'emma@example.com', status: 'Active', role: 'User', usage: 'Low' },
                  ].map((user, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold border border-white/10">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                          user.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{user.usage}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-slate-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Alerts */}
          <div className="space-y-8">
            <div className="glass rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-6 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span>System Alerts</span>
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-sm font-bold text-red-400 mb-1">API Rate Limit Exceeded</p>
                  <p className="text-xs text-slate-400">User Sarah Miller has exceeded the 100 requests/min limit.</p>
                </div>
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <p className="text-sm font-bold text-yellow-400 mb-1">Database High Latency</p>
                  <p className="text-xs text-slate-400">Response time increased to 450ms in region US-East.</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <h2 className="text-lg font-bold text-white mb-6">Real-time Traffic</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Active Connections</span>
                  <span className="text-lg font-bold text-accent">142</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-accent" 
                  />
                </div>
                <p className="text-xs text-slate-500">65% of server capacity currently utilized.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminStatCard({ title, value, icon: Icon, trend, positive }: any) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/10 hover:border-accent/30 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-accent/10">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className={`flex items-center space-x-1 text-xs font-bold ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span>{trend}</span>
        </div>
      </div>
      <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
