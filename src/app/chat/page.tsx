'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Send, 
  Plus, 
  MessageSquare, 
  User, 
  Bot, 
  Loader2, 
  Trash2, 
  MoreVertical, 
  Paperclip,
  Image as ImageIcon,
  Mic,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Code,
  Sparkles,
  Globe,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  _id: string;
  title: string;
  updatedAt: string;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customInput) setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMessage],
        chatId: currentChatId,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      if (response.data.chatId && !currentChatId) {
        setCurrentChatId(response.data.chatId);
        fetchSessions();
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: `⚠️ ${errorMessage}`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSessions = async () => {
    try {
      const response = await axios.get('/api/chat/sessions');
      setChatSessions(response.data);
    } catch (error) {
      console.error('Failed to fetch sessions');
    }
  };

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-cyber-blue/5 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: 320, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="glass border-r border-white/5 flex flex-col h-full z-20 relative"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent rounded-xl shadow-lg shadow-accent/20">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <span className="font-black text-xl tracking-tighter">GANU AI</span>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <button 
                onClick={() => {
                  setMessages([]);
                  setCurrentChatId(null);
                }}
                className="w-full flex items-center justify-center space-x-3 bg-accent hover:bg-accent-hover text-primary py-4 rounded-2xl transition-all shadow-lg shadow-accent/10 font-black text-sm uppercase tracking-widest active:scale-95"
              >
                <Plus className="w-5 h-5" />
                <span>New Intelligence</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
              <p className="px-2 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 mt-4">Neural Archives</p>
              {chatSessions.length === 0 ? (
                <div className="text-center py-12 opacity-30">
                  <MessageSquare className="w-10 h-10 mx-auto mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest">No Active Links</p>
                </div>
              ) : (
                chatSessions.map((session) => (
                  <button
                    key={session._id}
                    onClick={() => setCurrentChatId(session._id)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl transition-all group flex items-center space-x-4 border",
                      currentChatId === session._id 
                        ? "bg-accent/10 border-accent/30 text-accent glow-accent" 
                        : "hover:bg-white/5 border-transparent text-slate-400 hover:text-slate-200"
                    )}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      currentChatId === session._id ? "bg-accent animate-pulse" : "bg-slate-700"
                    )} />
                    <span className="truncate text-sm font-bold flex-grow">{session.title}</span>
                  </button>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/5 bg-slate-900/40 backdrop-blur-xl">
              <div className="flex items-center space-x-4 p-4 glass border border-white/10 rounded-[1.5rem] relative overflow-hidden group">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-primary font-black shadow-lg">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow overflow-hidden relative">
                  <p className="text-xs font-black truncate text-white">{session?.user?.name}</p>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Status: Link Active</p>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/api/auth/signout')}
                  title="Terminate Link" 
                  className="text-slate-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg relative"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col h-full relative z-10">
        {/* Header */}
        <header className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 backdrop-blur-2xl">
          <div className="flex items-center space-x-6">
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 active:scale-95"
              >
                <Menu className="w-5 h-5 text-accent" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center">
                {currentChatId ? 'Active Intelligence' : 'Neural Command Center'}
                <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              </h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Latency: 24ms | Encryption: Active</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 text-slate-400 hover:text-accent">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-8 space-y-8 custom-scrollbar bg-slate-900/20">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-accent/10 rounded-[2.5rem] flex items-center justify-center border border-accent/20 shadow-2xl shadow-accent/5"
              >
                <Bot className="w-12 h-12 text-accent" />
              </motion.div>
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-white tracking-tighter">System Initialized.</h1>
                <p className="text-slate-400 text-lg font-medium leading-relaxed">
                  Welcome to Ganu AI. I am your high-performance neural assistant. How shall we amplify your productivity today?
                </p>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
              >
                {[
                  { title: "Strategic Analysis", desc: "Analyze complex data structures", icon: Activity, color: "from-blue-500/20 to-cyan-500/20" },
                  { title: "Code Synthesis", desc: "Generate optimized algorithms", icon: Code, color: "from-accent/20 to-orange-500/20" },
                  { title: "Creative Logic", desc: "Draft high-impact content", icon: Sparkles, color: "from-purple-500/20 to-pink-500/20" },
                  { title: "Neural Research", desc: "Query the global knowledge net", icon: Globe, color: "from-green-500/20 to-emerald-500/20" }
                ].map((item, i) => (
                  <motion.button 
                    key={i}
                    whileHover={{ 
                      scale: 1.02, 
                      translateY: -8,
                      boxShadow: "0 20px 40px -15px rgba(0,0,0,0.5)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.4 + (i * 0.1),
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    onClick={() => handleSend(undefined, item.title)}
                    className={cn(
                      "glass p-6 rounded-[2.5rem] border border-white/5 text-left transition-all group relative overflow-hidden h-full flex flex-col justify-between",
                      "hover:border-accent/40 hover:bg-white/[0.02]"
                    )}
                  >
                    {/* Background Gradient Glow */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                      item.color
                    )} />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                          <Send className="w-4 h-4 text-accent" />
                        </div>
                      </div>
                      
                      <p className="text-accent font-black text-sm mb-2 group-hover:glow-text-accent uppercase tracking-[0.1em]">{item.title}</p>
                      <p className="text-slate-500 text-[11px] font-bold leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    </div>

                    {/* Animated Border Beam (Simulated) */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out" />
                  </motion.button>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto w-full space-y-8">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i}
                  className={cn(
                    "flex space-x-6",
                    msg.role === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-lg",
                    msg.role === 'user' 
                      ? "bg-accent border-accent/20 text-primary" 
                      : "glass border-white/10 text-accent"
                  )}>
                    {msg.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div className={cn(
                    "p-6 rounded-[2rem] text-sm leading-relaxed max-w-[80%] shadow-2xl relative overflow-hidden group",
                    msg.role === 'user' 
                      ? "bg-accent/10 border border-accent/20 text-white rounded-tr-none" 
                      : "glass border border-white/10 text-slate-200 rounded-tl-none"
                  )}>
                    {msg.role === 'assistant' && (
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    )}
                    <div className="whitespace-pre-wrap relative z-10">{msg.content}</div>
                    <div className="mt-4 flex items-center justify-between opacity-30 text-[9px] font-black uppercase tracking-widest relative z-10">
                      <span>{msg.role === 'user' ? 'Transmission Sent' : 'Neural Response'}</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex space-x-6">
                  <div className="w-12 h-12 rounded-2xl glass border border-white/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-accent animate-pulse" />
                  </div>
                  <div className="glass border border-white/10 p-6 rounded-[2rem] rounded-tl-none flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                    <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] ml-2">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-8 glass border-t border-white/5 backdrop-blur-3xl relative">
          <div className="absolute -top-px left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
          <form onSubmit={handleSend} className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-cyber-blue/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <div className="relative flex items-center">
                <div className="absolute left-6 text-slate-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Input neural query..."
                  className="w-full bg-slate-950/50 border border-white/10 rounded-[1.5rem] pl-16 pr-32 py-6 text-sm text-white outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all placeholder:text-slate-600 font-medium"
                />
                <div className="absolute right-4 flex items-center space-x-2">
                  <button type="button" className="p-2 text-slate-500 hover:text-accent transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <button 
                    disabled={!input.trim() || isLoading}
                    className="bg-accent text-primary px-6 py-3 rounded-2xl hover:bg-accent-hover transition-all disabled:opacity-50 flex items-center space-x-2 font-black text-xs uppercase tracking-widest active:scale-95 shadow-lg shadow-accent/20"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <>
                        <span>Send</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                Neural Link Status: <span className="text-green-500/50">Optimal</span> | Privacy Mode: <span className="text-accent/50">Enabled</span>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
