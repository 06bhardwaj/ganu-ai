import Navbar from '@/components/Navbar';
import { Bot, Zap, Shield, Cpu, MessageSquare, Globe, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-[128px]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-accent" />
              <span>Next Generation AI is Here</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
              Experience the Power of <br />
              <span className="bg-gradient-to-r from-accent via-white to-cyber-blue bg-clip-text text-transparent">
                Ganu AI Assistant
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
              Unlock unlimited potential with our advanced AI chatbot. Designed for professionals who demand speed, security, and intelligence in every conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-primary font-bold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl shadow-accent/20">
                <span>Start Chatting Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/5 text-white font-medium rounded-xl transition-all border border-white/10 flex items-center justify-center">
                Explore Features
              </Link>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-20 relative max-w-5xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-cyber-blue rounded-2xl blur opacity-20" />
              <div className="relative glass rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="bg-primary/50 px-4 py-2 border-b border-white/10 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="p-4 lg:p-8 bg-[#020617]/80">
                   <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-3 space-y-4">
                        <div className="h-4 bg-white/5 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                        <div className="h-4 bg-white/5 rounded w-2/3" />
                      </div>
                      <div className="col-span-9 space-y-6">
                        <div className="flex justify-start">
                          <div className="glass p-4 rounded-2xl rounded-tl-none max-w-[80%] border border-white/5">
                            <div className="h-4 bg-white/10 rounded w-48 mb-2" />
                            <div className="h-4 bg-white/10 rounded w-32" />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-accent/20 p-4 rounded-2xl rounded-tr-none max-w-[80%] border border-accent/10">
                            <div className="h-4 bg-accent/20 rounded w-64 mb-2" />
                            <div className="h-4 bg-accent/20 rounded w-40" />
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-[#010409]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-accent font-semibold tracking-wide uppercase text-sm mb-3">Capabilities</h2>
              <p className="text-3xl lg:text-5xl font-bold text-white mb-4">Powerful Features for Modern Users</p>
              <p className="text-slate-400 max-w-2xl mx-auto">Built with cutting-edge technology to provide the best AI experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="glass p-8 rounded-2xl border border-white/5 hover:border-accent/30 transition-all group">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent/5 -z-10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to transform your productivity?</h2>
            <p className="text-xl text-slate-400 mb-10">Join thousands of users who are already using Ganu AI to supercharge their daily tasks.</p>
            <Link href="/register" className="inline-flex items-center space-x-2 px-10 py-5 bg-accent hover:bg-accent-hover text-primary font-bold rounded-2xl transition-all transform hover:scale-105 shadow-2xl shadow-accent/20">
              <span>Get Started Now - It&apos;s Free</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="glass border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Bot className="w-6 h-6 text-accent" />
            <span className="text-xl font-bold text-white">Ganu AI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2026 Ganu AI. All rights reserved.</p>
          <div className="flex space-x-6 text-slate-400 text-sm">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: 'Real-time Intelligence',
    description: 'Get instant, accurate responses powered by the latest large language models.',
    icon: Zap,
  },
  {
    title: 'Context Memory',
    description: 'Ganu remembers your previous messages for truly natural conversations.',
    icon: MessageSquare,
  },
  {
    title: 'Enterprise Security',
    description: 'Your data is encrypted and protected with industry-leading security standards.',
    icon: Shield,
  },
  {
    title: 'Multi-language Support',
    description: 'Communicate effortlessly in over 50 languages with native-level accuracy.',
    icon: Globe,
  },
  {
    title: 'File Understanding',
    description: 'Upload documents and images for Ganu to analyze and summarize for you.',
    icon: Cpu,
  },
  {
    title: 'Advanced Analytics',
    description: 'Track your usage and gain insights through our comprehensive dashboard.',
    icon: Bot,
  },
];
