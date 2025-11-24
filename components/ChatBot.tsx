
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/geminiService';

interface Message {
    id: string;
    role: 'user' | 'bot';
    text: string;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 'welcome', role: 'bot', text: 'Olá! Sou o Leo, seu assistente do Clube Salesiano. 🦁 Pergunte sobre descontos, lanches ou lojas!' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        // Prepare history for API (simplified)
        const history = messages.map(m => ({ role: m.role === 'user' ? 'Usuário' : 'Leo', text: m.text }));

        const responseText = await sendChatMessage(userMsg.text, history);
        
        const botMsg: Message = { id: (Date.now() + 1).toString(), role: 'bot', text: responseText };
        setMessages(prev => [...prev, botMsg]);
        setIsLoading(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-24 right-4 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${isOpen ? 'bg-slate-700 rotate-90' : 'bg-salesiano-red animate-bounce-slow'}`}
            >
                {isOpen ? <X className="text-white" /> : <MessageCircle className="text-white" size={28} />}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                )}
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-40 right-4 w-80 sm:w-96 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden z-50 transition-all duration-300 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-salesiano-red to-red-800 p-4 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                        <Bot className="text-white" size={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-sm">Leo - Assistente Virtual</h3>
                        <p className="text-red-100 text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online agora
                        </p>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="h-80 overflow-y-auto p-4 bg-slate-950 space-y-3 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                                msg.role === 'user' 
                                    ? 'bg-salesiano-red text-white rounded-br-none' 
                                    : 'bg-slate-800 text-gray-200 border border-slate-700 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-700 shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Digite sua dúvida..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-red-900/50 focus:bg-slate-800 transition outline-none text-white placeholder-gray-500"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-salesiano-red text-white p-2.5 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <Send size={18} />
                    </button>
                </div>
                
                <div className="bg-slate-900 px-4 py-1 text-[10px] text-gray-500 text-center border-t border-slate-800 flex items-center justify-center gap-1">
                    <Sparkles size={8} /> Powered by Gemini AI
                </div>
            </div>
        </>
    );
};

export default ChatBot;