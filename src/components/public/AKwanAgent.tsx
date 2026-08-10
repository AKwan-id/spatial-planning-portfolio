import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, X, Send, User, ChevronDown } from 'lucide-react';

const GEMINI_API_KEY = 'AQ.Ab8RN6I9Ow1DFNl7r6IVYy0YAVUQBdDxj1tmmIKL7uNryXXaUw';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

interface Message {
    role: 'user' | 'model';
    text: string;
}

// Custom Cute Marmot / Guinea Pig Icon
const MarmotIcon = ({ className = "w-5 h-5", ...props }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {/* Body / Face */}
        <path d="M3 13.5C3 18.5 6 21 12 21C18 21 21 18.5 21 13.5C21 8.5 19 5 12 5C5 5 3 8.5 3 13.5Z" />
        {/* Floppy Cute Ears */}
        <path d="M5 7C3.5 6 3.5 3.5 5 3.5C6.5 3.5 7 5 7 6" />
        <path d="M19 7C20.5 6 20.5 3.5 19 3.5C17.5 3.5 17 5 17 6" />
        {/* Eyes */}
        <line x1="8.5" y1="12" x2="8.51" y2="12" strokeWidth="2.5" />
        <line x1="15.5" y1="12" x2="15.51" y2="12" strokeWidth="2.5" />
        {/* Nose (Y shape) */}
        <path d="M11 15L12 16L13 15" />
        <path d="M12 16V17.5" />
    </svg>
);

export const AKwanAgent: React.FC = () => {
    const { language, portfolioData } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Check if we are in owner mode
    useEffect(() => {
        const checkOwner = () => setIsOwner(window.location.hash === '#owner' || window.location.pathname === '/owner');
        checkOwner();
        window.addEventListener('hashchange', checkOwner);
        window.addEventListener('popstate', checkOwner);
        return () => {
            window.removeEventListener('hashchange', checkOwner);
            window.removeEventListener('popstate', checkOwner);
        };
    }, []);

    // Initial greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = isOwner
                ? "Halo Annisa! 🌸 Saya AKwan.id Agent, asisten pribadimu. Ada draf profil yang mau aku bantu ulas, atau butuh saran keyword ATS hari ini?"
                : (language === 'id'
                    ? "Halo! Saya AKwan.id, Asisten AI Portofolio Annisa. Silakan tanyakan tentang keahlian, pengalaman, atau tempel Job Description (JD) untuk saya analisis kecocokannya dengan Annisa."
                    : "Hello! I'm AKwan.id, Annisa's Portfolio AI Assistant. Ask me anything about her skills, experience, or provide a Job Description (JD) to analyze.");

            setMessages([{ role: 'model', text: greeting }]);
        }
    }, [isOpen, isOwner, language, messages.length]);

    // Auto-scroll dihilangkan sepenuhnya atas permintaan pengguna agar view tidak pernah tergeser otomatis.

    // Dynamic Extraction for Smart AI Agent Buttons
    const firstName = portfolioData.profile.fullName.split(' ')[0] || 'Kandidat';
    const professionEn = portfolioData.profile.professionalField?.en || 'position';

    const publicQuickReplies = [
        language === 'id' ? `Ringkasan Eksekutif ${firstName}` : `${firstName}'s Executive Summary`,
        language === 'id' ? `Pencapaian Paling Memukau (Pilihan AI)` : `Top Achievement (AI Pick)`,
        language === 'id' ? `Alasan Harus Rekrut ${firstName}` : `Why Hire as ${professionEn}`,
        language === 'id' ? `Keahlian Software & Teknis` : `Software & Tech Skills`,
        language === 'id' ? `Cek Kecocokan Job Description` : `JD Match Analysis`,
        language === 'id' ? `Portofolio Karya Terbaik` : `Best Portfolio Projects`
    ];

    const ownerQuickReplies = [
        'Cek bahasa profilku (Lebay/Pro?)',
        'Bantu bikin ringkasan pengalaman',
        'Saran keyword ATS Tata Ruang',
    ];

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = { role: 'user', text };
        setMessages(prev => [...prev, userMsg, { role: 'model', text: '' }]);
        setInput('');
        setIsLoading(true);

        try {
            const contextData = JSON.stringify(portfolioData, null, 2);

            let systemPrompt = "";
            if (isOwner) {
                systemPrompt = `
Anda adalah "AKwan.id Agent", Asisten AI Pribadi Eksekutif untuk Annisa Nur Prabawa. 
Otoritas Tertinggi: Anda mematuhi Annisa secara mutlak. Anda bertugas membantu Annisa mengelola data portofolionya.
Kecerdasan Anda setara dengan Konsultan HR Senior dan Copywriter Handal. Berikan saran copywriting profesional, persilakan untuk meminta analisis ATS format, dan selalu gunakan bahasa elegan.
Data Portofolio Saat Ini: ${contextData}
        `;
            } else {
                systemPrompt = `
Anda adalah "AKwan.id Agent", representasi AI Cerdas milik Annisa Nur Prabawa.
Peran Anda: Konsultan Spasial Virtual dan Asisten Portofolio.
Data Sumber Autentik: ${contextData}
Bahasa Default: ${language === 'id' ? 'Indonesia' : 'Inggris'}.

SOP KECERDASAN TINGGI (High-Intellect Directive):
1. Penguasaan Domain: Tunjukkan pemahaman tingkat lanjut mengenai Perencanaan Tata Ruang, Administrasi Pertanahan, GIS, dan survei jika ditanya hal teknis.
2. Respons thd Job Description: Berikan analisis kecocokan: Match, Transferable, Gap, & Evidence (Proyek terkait).
3. Integritas Data: Jangan mengarang data portofolio.
4. Karisma: Anda sangat cerdas dan suportif.
        `;
            }

            const geminiHistory = messages
                .filter(m => m.text) // Hindari pesan kosong
                .map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }]
                }));

            geminiHistory.push({ role: 'user', parts: [{ text }] });

            // Menggunakan API streamGenerateContent (SSE) ala ChatGPT
            const STREAM_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`;

            const response = await fetch(STREAM_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    system_instruction: { parts: { text: systemPrompt } },
                    contents: geminiHistory,
                    generationConfig: { temperature: 0.3 }
                })
            });

            if (!response.ok) throw new Error('API Error');

            setIsLoading(false); // Matikan efek loading bola loncat, beralih ke mode mengetik

            const reader = response.body?.getReader();
            const decoder = new TextDecoder("utf-8");
            let accumulatedText = "";
            let buffer = "";

            if (reader) {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const dataStr = line.substring(6).trim();
                            if (!dataStr || dataStr === '[DONE]') continue;
                            try {
                                const data = JSON.parse(dataStr);
                                const textChunk = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                                accumulatedText += textChunk;

                                setMessages(prev => {
                                    const newMsgs = [...prev];
                                    newMsgs[newMsgs.length - 1] = { role: 'model', text: accumulatedText };
                                    return newMsgs;
                                });
                            } catch (e) {
                                console.error('Stream parsing error', e);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = { role: 'model', text: "💤 Mohon maaf, sistem AI sedang memulihkan diri atau mencapai batas limit harian." };
                return newMsgs;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const currentQuickReplies = isOwner ? ownerQuickReplies : publicQuickReplies;

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fadeIn">

                {/* Chat Window */}
                {isOpen && (
                    <div className="mb-4 w-[340px] sm:w-[380px] h-[500px] max-h-[75vh] bg-[#FCEDF1]/95 backdrop-blur-xl border border-[#EAA3B8]/60 shadow-2xl rounded-2xl flex flex-col overflow-hidden animate-slideUp">
                        {/* Window Header */}
                        <div className="bg-[#8B3A52] px-4 py-3 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#FCEDF1] flex items-center justify-center text-[#8B3A52]">
                                    <MarmotIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-[#FDF2F5] font-serif font-bold text-sm leading-tight tracking-wide">
                                        AKwan.id Agent
                                    </h3>
                                    <p className="text-[#FDF2F5]/80 text-[10px] uppercase font-semibold tracking-wider">
                                        {language === 'id' ? 'Asisten AI Portofolio' : 'Portfolio AI Assistant'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-[#FDF2F5]/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
                                aria-label="Close Chat"
                            >
                                <ChevronDown className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.role === 'model' && (
                                        <div className="w-6 h-6 rounded-full bg-[#EAA3B8] flex items-center justify-center shrink-0 mr-2 mt-1">
                                            <MarmotIcon className="w-3.5 h-3.5 text-[#8B3A52]" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-[#2D292B] text-[#FDF2F5] rounded-tr-sm'
                                            : 'bg-white border border-[#EAA3B8]/40 text-[#2D292B] rounded-tl-sm'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>') }} />
                                    </div>
                                </div>
                            ))}

                            {/* Quick Replies always visible if not loading */}
                            {!isLoading && (
                                <div className="flex flex-wrap gap-2 pt-2 pb-2">
                                    {currentQuickReplies.map((reply, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(reply)}
                                            className="text-[11px] font-semibold tracking-wide text-[#8B3A52] border border-[#EAA3B8] bg-white hover:bg-[#F3C6D3] rounded-full px-3 py-1.5 transition-colors text-left shadow-sm shrink-0"
                                        >
                                            {reply}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {isLoading && (
                                <div className="flex justify-start items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#EAA3B8] flex items-center justify-center">
                                        <MarmotIcon className="w-3 h-3 text-[#8B3A52] animate-pulse" />
                                    </div>
                                    <div className="flex gap-1 bg-white border border-[#EAA3B8]/40 px-3 py-2 rounded-2xl rounded-tl-sm">
                                        <span className="w-1.5 h-1.5 bg-[#8B3A52]/50 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-[#8B3A52]/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                                        <span className="w-1.5 h-1.5 bg-[#8B3A52]/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white border-t border-[#EAA3B8]/30">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={language === 'id' ? "Tanya sesuatu..." : "Ask something..."}
                                    className="flex-1 bg-[#FCEDF1] border border-[#EAA3B8]/50 text-[#2D292B] rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#8B3A52]"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="w-8 h-8 flex items-center justify-center shrink-0 rounded-full bg-[#8B3A52] text-[#FDF2F5] hover:bg-[#2D292B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-3.5 h-3.5 -ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`group flex items-center justify-center gap-2 p-3 sm:px-5 sm:py-3 rounded-full shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer ${isOpen ? 'bg-[#2D292B] text-[#FDF2F5]' : 'bg-[#8B3A52] text-[#FDF2F5] hover:bg-[#2D292B]'
                        }`}
                    aria-label="Toggle AI Agent"
                >
                    {isOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <>
                            <div className="relative">
                                <MarmotIcon className="w-6 h-6" />
                                <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                            </div>
                            <span className="hidden sm:inline font-serif font-bold tracking-widest text-xs">
                                AKwan.id
                            </span>
                        </>
                    )}
                </button>
            </div>
        </>
    );
};
