'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hi! I'm Ganu AI. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMsg],
      });
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.data.content 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 40, filter: 'blur(10px)' }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className={cn(
              "glass border border-white/10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col mb-4 relative",
              isMinimized ? "h-20 w-72" : "h-[600px] w-[380px] sm:w-[420px]"
            )}
          >
            {/* Animated Background for Widget */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 via-transparent to-cyber-blue/10" />
            </div>

            {/* Header */}
            <div className="bg-accent p-5 flex items-center justify-between relative z-10 shadow-lg shadow-accent/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-inner shadow-white/10">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-primary font-black text-sm tracking-tight">GANU ASSISTANT</h3>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    <span className="text-[9px] text-primary/80 font-black uppercase tracking-widest">Neural Link: Active</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-primary/10 rounded-xl transition-all text-primary active:scale-90"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-primary/10 rounded-xl transition-all text-primary active:scale-90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-6 space-y-8 bg-[#020617]/95 relative z-10 custom-scrollbar">
                  {messages.map((msg, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      key={i} 
                      className={cn(
                        "flex space-x-4 max-w-[85%]",
                        msg.role === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-[14px] flex items-center justify-center flex-shrink-0 border shadow-lg",
                        msg.role === 'user' ? "bg-accent border-accent/20 text-primary shadow-accent/10" : "glass border-white/10 text-accent shadow-black/20"
                      )}>
                        {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                      </div>
                      <div className={cn(
                        "p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-2xl relative group",
                        msg.role === 'user' 
                          ? "bg-accent/10 border border-accent/20 text-white rounded-tr-none" 
                          : "glass border border-white/10 text-slate-200 rounded-tl-none"
                      )}>
                        {msg.content}
                        <div className="absolute -bottom-5 left-0 opacity-0 group-hover:opacity-40 transition-opacity text-[8px] font-black uppercase tracking-widest text-slate-500">
                          {msg.role === 'user' ? 'Transmission Verified' : 'Neural Process'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex space-x-4 mr-auto">
                      <div className="w-9 h-9 rounded-[14px] glass border border-white/10 flex items-center justify-center shadow-lg">
                        <Bot className="w-5 h-5 text-accent" />
                      </div>
                      <div className="glass border border-white/10 p-5 rounded-[1.5rem] rounded-tl-none flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-5 border-t border-white/5 bg-slate-900/50 backdrop-blur-3xl relative z-10">
                  <form onSubmit={handleSend} className="relative group">
                    <div className="absolute -inset-0.5 bg-accent/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                    <div className="relative flex items-center">
                      <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a neural query..."
                        className="w-full bg-slate-950/50 border border-white/10 rounded-2xl pl-5 pr-14 py-4 text-[13px] text-white outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all placeholder:text-slate-600 font-medium"
                      />
                      <button 
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 bg-accent text-primary p-2.5 rounded-xl hover:bg-accent-hover transition-all disabled:opacity-50 active:scale-90 shadow-lg shadow-accent/20"
                      >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      </button>
                    </div>
                  </form>
                  <p className="text-[8px] text-center text-slate-700 mt-4 font-black tracking-[0.3em] uppercase">
                    Secured by Ganu Neural Net
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95, rotate: -5 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "w-16 h-16 rounded-[1.75rem] bg-accent flex items-center justify-center shadow-[0_10px_40px_-10px_rgba(245,158,11,0.5)] transition-all relative overflow-hidden group",
          isOpen && "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <MessageSquare className="w-8 h-8 text-primary relative z-10" />
      </motion.button>
    </div>
  );
}
