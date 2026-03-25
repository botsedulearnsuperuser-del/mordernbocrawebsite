import React, { useState } from 'react';

import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const CyberActive: React.FC = () => {
    const [isAiFullPage, setIsAiFullPage] = useState(false);
    const [messages, setMessages] = useState<any[]>([
        { 
            role: 'model', 
            parts: [{ text: "Hello! 👋 I am your BOCRA Cyber Intelligence Assistant. Welcome to **Cyber Active**! 🛡️\n\nHere, you will learn about the latest cyber attacks, witness real-world simulations, and discover critical strategies to stay safe from digital threats. \n\nWhat would you like to explore first? I can tell you about recent phishing trends or show you how to secure your accounts." }] 
        }
    ]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Initialize Gemini 
    const ai = new GoogleGenAI({ 
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" 
    });

    const handleSend = async () => {
        if (!input.trim() || isGenerating) return;
        
        const userMsg = { role: 'user', parts: [{ text: input }] };
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);
        setInput('');
        setIsGenerating(true);

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: newHistory,
                config: {
                    systemInstruction: "You are the BOCRA Cyber Active Expert. Your goal is to educate users on cybersecurity, latest attacks, simulations, and safety protocols in Botswana. Keep responses professional, highly informative, but very concise. Use **bolding** for emphasis. Encourage digital safety."
                }
            });
            
            setMessages([...newHistory, { role: 'model', parts: [{ text: response.text }] }]);
        } catch (error) {
            console.error(error);
            setMessages([...newHistory, { role: 'model', parts: [{ text: "I'm having trouble connecting to my cyber-shield right now. Please try again." }] }]);
        } finally {
            setIsGenerating(false);
        }
    };

    if (isAiFullPage) {
        return (
            <div style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', background: '#f8f9fa', borderRadius: '12px', overflow: 'hidden', margin: '1rem', border: '1px solid #eee' }}>
                <div style={{ background: '#3F4E60', padding: '1.25rem 2rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '45px', height: '45px', background: '#FF7F50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            AI
                        </div>
                        <div>
                            <span style={{ fontWeight: '800', fontSize: '1.2rem', display: 'block' }}>BOCRA Cyber AI</span>
                            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Technical Advisor • Online</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsAiFullPage(false)}
                        style={{ background: 'white', color: '#A80000', border: 'none', padding: '10px 20px', borderRadius: '50px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s' }}
                    >
                        End Session
                    </button>
                </div>

                <div className="messages-area" style={{ flex: 1, padding: '2.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fff' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ 
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                background: msg.role === 'user' ? '#A80000' : '#f0f2f7',
                                color: msg.role === 'user' ? 'white' : '#333',
                                padding: '1.25rem 1.5rem',
                                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                                fontSize: '1.05rem',
                                maxWidth: '85%',
                                lineHeight: '1.6',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                            }}>
                                <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                            </div>
                        ))}
                        {isGenerating && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#999', fontStyle: 'italic', paddingLeft: '10px' }}>
                                <div className="typing-indicator"></div> BOCRA AI is analyzing threat vectors...
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ padding: '2rem', borderTop: '1px solid #eee', display: 'flex', gap: '15px', background: 'white', justifyContent: 'center' }}>
                    <div style={{ maxWidth: '900px', width: '100%', display: 'flex', gap: '15px' }}>
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me anything about cyber safety and best practices..." 
                            style={{ flex: 1, padding: '15px 25px', border: '2px solid #eee', background: '#f9f9f9', borderRadius: '50px', fontSize: '1.1rem', outline: 'none', transition: 'border-color 0.2s' }}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isGenerating || !input.trim()}
                            style={{ 
                                background: (isGenerating || !input.trim()) ? '#ccc' : '#A80000', 
                                color: 'white', 
                                border: 'none', 
                                padding: '0 35px', 
                                borderRadius: '50px',
                                cursor: 'pointer', 
                                fontWeight: '800',
                                fontSize: '1rem'
                            }}
                        >
                            Ask AI
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cyber-active-container" style={{ padding: '2rem', height: '100%', maxWidth: '1100px', margin: '0 auto' }}>
            {/* The single main container holding everything */}
            <div style={{ background: 'white', padding: '4rem', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 8px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                
                {/* Header Container */}
                <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                    <h2 style={{ margin: '0 0 15px 0', fontSize: '2.5rem', fontWeight: '900', color: '#1a1a1a' }}>
                        Cyber Active Hub
                    </h2>
                    <p style={{ margin: 0, fontSize: '1.2rem', color: '#555', lineHeight: '1.6', maxWidth: '800px' }}>
                        Interactive intelligence center for monitoring, simulating, and defending against cyber threats in Botswana.
                    </p>
                </div>

                {/* 3-in-a-row Grid Container */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    {/* Threat Matrix Section */}
                    <div>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.6rem', fontWeight: '800', color: '#1a1a1a' }}>Threat Matrix</h3>
                        <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                            Currently tracking 15+ major phishing campaigns targeting local telecommunications and banking gateways.
                        </p>
                        <button style={{ background: '#fdf2f2', border: '1px solid #A80000', color: '#A80000', padding: '12px 24px', fontWeight: '800', cursor: 'pointer', fontSize: '1rem', borderRadius: '4px' }}>
                            View Map
                        </button>
                    </div>

                    {/* Simulation Lab Section */}
                    <div>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.6rem', fontWeight: '800', color: '#1a1a1a' }}>Simulation Lab</h3>
                        <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                            Launch a controlled phishing simulation to test your organization's or your personal detection readiness.
                        </p>
                        <button style={{ background: '#A80000', border: 'none', color: 'white', padding: '12px 24px', fontWeight: '800', cursor: 'pointer', fontSize: '1rem', borderRadius: '4px' }}>
                            Start Sim
                        </button>
                    </div>

                    {/* Intelligence Advisor Section */}
                    <div>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.6rem', fontWeight: '800', color: '#1a1a1a', whiteSpace: 'nowrap' }}>Intelligence Advisor</h3>
                        <p style={{ margin: '0 0 20px 0', fontSize: '1.1rem', color: '#666', lineHeight: '1.6' }}>
                            ASK AI and learn how to stay safe online and discover the best cybersecurity practices for 2024.
                        </p>
                        <button 
                            onClick={() => setIsAiFullPage(true)}
                            style={{ background: '#FF7F50', border: 'none', color: 'white', padding: '12px 24px', fontWeight: '800', cursor: 'pointer', fontSize: '1rem', borderRadius: '4px' }}
                        >
                            Ask AI
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CyberActive;
