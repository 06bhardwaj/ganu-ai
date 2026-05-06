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
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && (session?.user as any).role !== 'admin') {
      router.push('/dashboard');
    } else if (status === 'authenticated') {
      fetchAdminData();
    }
  }, [status, session, router]);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data.stats);
      setUsers(response.data.recentUsers);
    } catch (error) {
      console.error('Failed to fetch admin data');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 animate-pulse font-black uppercase tracking-widest text-xs">Accessing Admin Control Center...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-red-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[10%] left-[5%] w-[30%] h-[30%] bg-red-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3 h-3" />
              <span>Privileged Access Level: Admin</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter leading-none mb-4">Command Center</h1>
            <p className="text-slate-500 font-medium max-w-xl">Oversee system architecture, monitor neural traffic, and manage user link authorizations in real-time.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="px-6 py-3 glass rounded-2xl border border-white/5 text-xs font-black uppercase tracking-widest hover:bg-white/5 flex items-center space-x-3 transition-all active:scale-95">
                <BarChart className="w-4 h-4 text-accent" />
                <span>Export Intelligence</span>
              </button>
              <div className="absolute right-0 mt-3 w-56 glass rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 border border-white/10 z-20 overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
                <button 
                  onClick={() => window.open('/api/admin/export?collection=users')}
                  className="w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-accent hover:bg-accent/5 transition-all"
                >
                  Neural Links (JSON)
                </button>
                <button 
                  onClick={() => window.open('/api/admin/export?collection=chats')}
                  className="w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-accent hover:bg-accent/5 transition-all"
                >
                  Archive Logs (JSON)
                </button>
              </div>
            </div>
            <button className="px-6 py-3 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl active:scale-95">
              System Settings
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <AdminStatCard title="Active Links" value={stats?.totalUsers?.toString() || '0'} icon={Users} trend="+12%" positive={true} />
          <AdminStatCard title="Neural Sessions" value={stats?.totalChats?.toString() || '0'} icon={MessageSquare} trend="+24%" positive={true} />
          <AdminStatCard title="Total Signals" value={stats?.totalMessages?.toString() || '0'} icon={Activity} trend="+5%" positive={true} />
          <AdminStatCard title="Core Uptime" value={stats?.uptime || '100%'} icon={ShieldCheck} trend="Stable" positive={true} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* User Management Table */}
          <div className="lg:col-span-2 glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.02]">
              <div>
                <h2 className="text-xl font-black text-foreground tracking-tight">Neural Link Registry</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Latest system authorizations</p>
              </div>
              <div className="relative w-full md:w-72 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-accent/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search archives..." 
                    className="w-full bg-slate-900/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:border-red-500/50 transition-all placeholder:text-slate-600"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/[0.01] text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] border-b border-white/5">
                  <tr>
                    <th className="px-8 py-5 font-black">Identity</th>
                    <th className="px-8 py-5 font-black">Link Status</th>
                    <th className="px-8 py-5 font-black">Clearance</th>
                    <th className="px-8 py-5 font-black text-right">Operations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user, i) => (
                    <tr key={i} className="hover:bg-white/[0.02] transition-all group cursor-default">
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-xs font-black border border-white/10 text-white shadow-lg group-hover:scale-110 transition-transform">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground group-hover:text-accent transition-colors">{user.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-500 border border-green-500/20">
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2 animate-pulse" />
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'text-red-500' : 'text-slate-400'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/10 active:scale-90">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-white/[0.01] border-t border-white/5 text-center">
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-accent transition-all">View All Intelligence Reports</button>
            </div>
          </div>

          {/* System Alerts */}
          <div className="space-y-8">
            <div className="glass rounded-[2rem] border border-white/5 p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <AlertTriangle className="w-16 h-16" />
              </div>
              <h2 className="text-sm font-black text-foreground mb-8 flex items-center space-x-3 uppercase tracking-widest">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                </div>
                <span>Neural Alerts</span>
              </h2>
              <div className="space-y-4">
                <div className="p-5 bg-red-500/5 border border-red-500/10 rounded-[1.5rem] group hover:border-red-500/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Priority: Critical</p>
                    <span className="text-[8px] text-slate-600 font-bold uppercase">2m ago</span>
                  </div>
                  <p className="text-xs font-black text-foreground mb-1">Link Rate Overload</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Identity 'sarah_m' has exceeded the 500 signals/min threshold.</p>
                </div>
                <div className="p-5 bg-yellow-500/5 border border-yellow-500/10 rounded-[1.5rem] group hover:border-yellow-500/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Priority: Elevated</p>
                    <span className="text-[8px] text-slate-600 font-bold uppercase">14m ago</span>
                  </div>
                  <p className="text-xs font-black text-foreground mb-1">Latency Shift</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">Response delta increased to 142ms in sector US-West-2.</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-[2rem] border border-white/5 p-8 shadow-xl relative overflow-hidden">
              <h2 className="text-sm font-black text-foreground mb-8 uppercase tracking-widest">Real-time Flux</h2>
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Channels</span>
                    <span className="text-xl font-black text-accent tracking-tighter">142</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="h-full bg-accent relative" 
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[scan_2s_linear_infinite]" />
                    </motion.div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 glass rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">CPU Load</p>
                    <p className="text-sm font-black text-foreground">24.2%</p>
                  </div>
                  <div className="p-4 glass rounded-2xl border border-white/5">
                    <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Mem Flux</p>
                    <p className="text-sm font-black text-foreground">4.8 GB</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <p className="text-[8px] text-center text-slate-600 font-black uppercase tracking-[0.3em]">System Health: Optimal</p>
                </div>
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
    <motion.div 
      whileHover={{ scale: 1.02, translateY: -5 }}
      className="glass p-8 rounded-[2rem] border border-white/5 hover:border-accent/30 transition-all shadow-xl group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        <Icon className="w-16 h-16" />
      </div>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="p-3 rounded-2xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${positive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {positive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span>{trend}</span>
        </div>
      </div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2 relative z-10">{title}</p>
      <p className="text-4xl font-black text-foreground tracking-tighter relative z-10">{value}</p>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
