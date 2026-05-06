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
  Menu
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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
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
      <div className="h-screen flex items-center justify-center bg-[#020617]">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-[#020617] text-slate-200 overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="glass border-r border-white/10 flex flex-col h-full z-20"
          >
            <div className="p-4 border-b border-white/10">
              <button 
                onClick={() => {
                  setMessages([]);
                  setCurrentChatId(null);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 py-3 rounded-xl transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="font-bold">New Chat</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent Conversations</p>
              {chatSessions.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No chats yet</p>
                </div>
              ) : (
                chatSessions.map((session) => (
                  <button
                    key={session._id}
                    onClick={() => setCurrentChatId(session._id)}
                    className={cn(
                      "w-full text-left p-3 rounded-xl transition-all group flex items-center space-x-3",
                      currentChatId === session._id ? "bg-accent/20 border border-accent/20" : "hover:bg-white/5 border border-transparent"
                    )}
                  >
                    <MessageSquare className="w-4 h-4 text-slate-400 group-hover:text-accent" />
                    <span className="truncate text-sm flex-grow">{session.title}</span>
                  </button>
                ))
              )}
            </div>

            <div className="p-4 border-t border-white/10 space-y-2">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-white/5 rounded-xl transition-all">
                <Settings className="w-5 h-5 text-slate-400" />
                <span className="text-sm">Settings</span>
              </button>
              <div className="flex items-center space-x-3 p-3 glass border border-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                  {session?.user?.name?.charAt(0)}
                </div>
                <div className="flex-grow overflow-hidden">
                  <p className="text-xs font-medium truncate">{session?.user?.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{session?.user?.email}</p>
                </div>
                <button title="Log Out" className="text-slate-500 hover:text-red-400 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-grow flex flex-col relative">
        {/* Chat Header */}
        <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-6 z-10">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <h2 className="font-bold text-white">Ganu AI Assistant</h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button title="Clear Chat" className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-red-400 transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>
            <button title="More" className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
              <div className="p-6 bg-accent/10 rounded-3xl mb-6">
                <Bot className="w-16 h-16 text-accent" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">How can I assist you today?</h1>
              <p className="text-slate-400 mb-8">
                I can help you with coding, writing, analysis, or just a friendly conversation. 
                Upload a file or image to get started with advanced analysis.
              </p>
              <div className="grid grid-cols-2 gap-4 w-full">
                {['Write a Python script', 'Explain quantum physics', 'Plan a travel itinerary', 'Analyze my budget'].map((suggestion) => (
                  <button 
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="p-4 glass border border-white/5 rounded-2xl hover:border-accent/30 text-sm text-left transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={index}
                className={cn(
                  "flex space-x-4 max-w-4xl mx-auto",
                  msg.role === 'user' ? "flex-row-reverse space-x-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border",
                  msg.role === 'user' ? "bg-accent border-accent/20" : "glass border-white/10"
                )}>
                  {msg.role === 'user' ? <User className="w-6 h-6 text-primary" /> : <Bot className="w-6 h-6 text-accent" />}
                </div>
                <div className={cn(
                  "p-4 rounded-2xl max-w-[80%] shadow-xl",
                  msg.role === 'user' 
                    ? "bg-accent/10 border border-accent/20 rounded-tr-none text-slate-100" 
                    : "glass border border-white/10 rounded-tl-none text-slate-200"
                )}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <span className="text-[10px] text-slate-500 mt-2 block opacity-50">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))
          )}
          {isLoading && (
            <div className="flex space-x-4 max-w-4xl mx-auto">
              <div className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-accent" />
              </div>
              <div className="glass border border-white/10 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 pt-0 z-10">
          <div className="max-w-4xl mx-auto relative">
            <form 
              onSubmit={handleSend}
              className="glass border border-white/10 rounded-2xl p-2 flex items-end space-x-2 shadow-2xl focus-within:border-accent/50 transition-all"
            >
              <div className="flex items-center space-x-1 p-2">
                <button type="button" title="Upload File" className="p-2 text-slate-500 hover:text-accent transition-colors rounded-lg hover:bg-white/5">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button type="button" title="Upload Image" className="p-2 text-slate-500 hover:text-accent transition-colors rounded-lg hover:bg-white/5">
                  <ImageIcon className="w-5 h-5" />
                </button>
              </div>
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder="Ask anything..."
                className="flex-grow bg-transparent border-none focus:ring-0 text-slate-200 py-3 px-2 resize-none max-h-32 outline-none"
              />
              <div className="flex items-center space-x-1 p-2">
                <button type="button" title="Voice Input" className="p-2 text-slate-500 hover:text-accent transition-colors rounded-lg hover:bg-white/5">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-accent hover:bg-accent-hover text-primary p-3 rounded-xl transition-all transform active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-accent/20"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
            <p className="text-[10px] text-center text-slate-600 mt-2">
              Ganu AI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
