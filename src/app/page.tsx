'use client';

import Navbar from '@/components/Navbar';
import { Bot, Zap, Shield, Cpu, MessageSquare, Globe, ArrowRight, Star, Sparkles, CheckCircle, Code, Rocket, Brain, Fingerprint, Activity } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-accent selection:text-primary">
      <Navbar />
      
      <main className="flex-grow">
        {/* Ultra-Modern Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
          {/* Animated Mesh Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[140px] animate-mesh" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-blue/20 rounded-full blur-[140px] animate-mesh" style={{ animationDelay: '-5s' }} />
            <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-cyber-pink/10 rounded-full blur-[120px] animate-mesh" style={{ animationDelay: '-10s' }} />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/10 text-accent text-xs sm:text-sm font-bold mb-8 glow-accent"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>THE FUTURE OF INTELLIGENCE IS HERE</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl lg:text-9xl font-black tracking-tighter mb-8 leading-[0.9]"
            >
              Elevate Your <br />
              <span className="bg-gradient-to-r from-accent via-white to-cyber-blue bg-clip-text text-transparent drop-shadow-2xl inline-block">
                Digital Consciousness
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-3xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed font-medium"
            >
              Ganu AI is more than a chatbot. It's a high-performance neural assistant designed to amplify your productivity with surgical precision and unmatched speed.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link href="/register" className="w-full sm:w-auto px-10 py-5 bg-accent hover:bg-accent-hover text-primary font-black text-lg rounded-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                <span>GET STARTED FREE</span>
                <Rocket className="w-6 h-6" />
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-10 py-5 glass hover:bg-white/10 text-white font-bold text-lg rounded-2xl transition-all border border-white/10 flex items-center justify-center space-x-3 group">
                <span>EXPLORE TECH</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Floating Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
               {[
                 { label: 'Latency', value: '<30ms', icon: Zap },
                 { label: 'Uptime', value: '100%', icon: Activity },
                 { label: 'Security', value: 'Quantum', icon: Shield },
                 { label: 'Neural Net', value: 'v4.2-Pro', icon: Brain },
               ].map((stat, i) => (
                 <div key={i} className="glass p-6 rounded-2xl border border-white/5 scan-line">
                   <stat.icon className="w-5 h-5 text-accent/50 mx-auto mb-3" />
                   <p className="text-accent font-black text-2xl mb-1">{stat.value}</p>
                   <p className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                 </div>
               ))}
            </motion.div>
          </div>
        </section>

        {/* Dynamic Feature Grid */}
        <section id="features" className="py-40 relative overflow-hidden bg-[#010409]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-32"
            >
              <h2 className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-6">Neural Infrastructure</h2>
              <p className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tight">Engineered for Excellence</p>
              <div className="h-1.5 w-32 bg-accent mx-auto rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)]" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-12 rounded-[3rem] group cursor-default relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <feature.icon className="w-24 h-24" />
                  </div>
                  
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ${index % 2 === 0 ? 'bg-accent/10 text-accent glow-accent' : 'bg-cyber-blue/10 text-cyber-blue shadow-[0_0_20px_rgba(56,189,248,0.2)]'}`}>
                    <feature.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 tracking-tight group-hover:text-accent transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium mb-8">{feature.description}</p>
                  
                  <div className="flex items-center text-[10px] font-black tracking-[0.2em] uppercase">
                    <div className={`w-2 h-2 rounded-full mr-3 animate-pulse ${index % 2 === 0 ? 'bg-accent' : 'bg-cyber-blue'}`} />
                    <span className="text-slate-500">System Link: Active</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Showcase Section */}
        <section id="tech" className="py-40 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-7xl font-black text-white mb-10 leading-[0.95] tracking-tighter">
                Built for <span className="text-accent">Developers</span>, <br /> 
                Loved by Everyone.
              </h2>
              <div className="space-y-8">
                {[
                  { title: 'Neural API Access', desc: 'Seamlessly integrate Ganu AI into your existing tech stack with our robust API.', icon: Fingerprint },
                  { title: 'Zero-Knowledge Privacy', desc: 'End-to-end encryption ensures your data remains yours and yours alone.', icon: Shield },
                  { title: 'Adaptive Learning', desc: 'The engine evolves with your usage, becoming more intuitive over time.', icon: Brain }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-6 p-4 rounded-2xl hover:bg-white/5 transition-all"
                  >
                    <div className="p-4 bg-accent/10 rounded-2xl border border-accent/20">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow" />
              <div className="relative glass-card rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl animate-float">
                <div className="bg-slate-900/90 px-8 py-5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-red-500/40" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <div className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Neural_Core_v4.sh</span>
                </div>
                <div className="p-10 font-mono text-sm leading-loose relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Code className="w-20 h-20 text-white" />
                  </div>
                  <p className="text-slate-500 italic mb-4 tracking-wide">// Initializing Neural Link...</p>
                  <p className="text-white">
                    <span className="text-purple-400">const</span> assistant = <span className="text-purple-400">new</span> <span className="text-cyber-blue font-bold">GanuAI</span>({'{'}
                  </p>
                  <p className="pl-6 text-slate-300">
                    mode: <span className="text-accent">'HYPER_DRIVE'</span>,
                  </p>
                  <p className="pl-6 text-slate-300">
                    security: <span className="text-accent">'ENCRYPTED'</span>,
                  </p>
                  <p className="pl-6 text-slate-300">
                    latency: <span className="text-accent">'MINIMAL'</span>
                  </p>
                  <p className="text-white">{'}'});</p>
                  <p className="mt-6 text-slate-500 italic tracking-wide">// Syncing consciousness...</p>
                  <p className="text-white">
                    <span className="text-purple-400">await</span> assistant.<span className="text-cyber-blue">connect</span>();
                  </p>
                  <div className="mt-8 flex items-center space-x-3 bg-green-500/10 w-fit px-4 py-2 rounded-lg border border-green-500/20">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 text-[10px] font-black uppercase tracking-[0.2em]">System Status: Optimal</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 -z-10" />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="w-32 h-32 bg-accent rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-[0_0_60px_rgba(245,158,11,0.4)] animate-float">
                <Bot className="w-16 h-16 text-primary" />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl lg:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]"
            >
              Don't just chat. <br /> 
              <span className="text-accent glow-text-accent">Communicate.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-slate-400 mb-16 font-medium max-w-2xl mx-auto"
            >
              Join the next evolution of human-AI synergy and experience intelligence without limits.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/register" className="inline-flex items-center space-x-4 px-16 py-8 bg-accent hover:bg-accent-hover text-primary font-black text-2xl rounded-[2.5rem] transition-all shadow-[0_0_80px_rgba(245,158,11,0.5)]">
                <span>ACTIVATE GANU AI</span>
                <ArrowRight className="w-8 h-8" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="glass border-t border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-accent rounded-2xl shadow-lg">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <div>
                <span className="text-3xl font-black text-white tracking-tighter block leading-none">GANU AI</span>
                <span className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase">Neural Systems</span>
              </div>
            </div>
            <div className="flex space-x-12 text-slate-400 text-xs font-black tracking-[0.2em] uppercase">
              <Link href="#" className="hover:text-accent transition-colors">Security</Link>
              <Link href="#" className="hover:text-accent transition-colors">Terminal</Link>
              <Link href="#" className="hover:text-accent transition-colors">Uptime</Link>
            </div>
            <p className="text-slate-600 text-[10px] font-black tracking-widest uppercase">
              © 2026 GANU NEURAL SYSTEMS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: 'Neural Speed',
    description: 'Proprietary low-latency architecture delivering responses before you even finish your thought.',
    icon: Zap,
  },
  {
    title: 'Cognitive Link',
    description: 'Advanced contextual awareness that builds a deep profile of your needs over time.',
    icon: MessageSquare,
  },
  {
    title: 'Quantum Guard',
    description: 'Military-grade encryption for all data packets. Your digital footprint is sovereign.',
    icon: Shield,
  },
  {
    title: 'Global Fluency',
    description: 'Native-level mastery of over 100 languages, technical dialects, and specialized jargon.',
    icon: Globe,
  },
  {
    title: 'Neural Sync',
    description: 'Seamlessly synchronize your intelligence across all devices via our unified cloud link.',
    icon: Cpu,
  },
  {
    title: 'Apex Intelligence',
    description: 'Powered by the most advanced neural models available on the public interest network.',
    icon: Bot,
  },
];
