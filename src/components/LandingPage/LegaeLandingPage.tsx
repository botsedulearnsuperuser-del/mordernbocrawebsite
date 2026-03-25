import React, { useState, useEffect } from 'react';

import { GoogleGenAI } from "@google/genai";
import './LegaeLandingPage.css';
import Navbar from '../Shared/Navbar';
import ReactMarkdown from 'react-markdown';

interface LegaeLandingPageProps {
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    onAboutUs?: () => void;
    onNavigate?: (page: string) => void;
}

const LegaeLandingPage: React.FC<LegaeLandingPageProps> = ({ onPortalLogin, onClientPortalLogin, onConsumerPortalLogin, onAboutUs, onNavigate }) => {
    const logoImg = '/assets/bocralogo.png';

    const heroBgImages = [
        '/assets/justice-hubane-OjmO-dNF0lQ-unsplash (1).jpg',
        '/assets/justice-hubane-tyCcpbkgaR4-unsplash (2).jpg',
        '/assets/matt-artz-DAWOv3XpPWY-unsplash.jpg',
        '/assets/michael-bennett-AMk9rGzVSHs-unsplash.jpg',
        '/assets/colin-watts-newE0057quQ-unsplash.jpg'
    ];
    
    const [currentBgIndex, setCurrentBgIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBgIndex(prev => (prev + 1) % heroBgImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroBgImages.length]);

    // Images based on the directory scan
    
    const featureImg1 = '/assets/Untitled design (7) (1).png';
    const featureImg2 = '/assets/Untitled design (8) (1).png';
    const featureImg3 = '/assets/Untitled design (9) (1).png';
    const brandLogo = logoImg;

    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showDemoModal, setShowDemoModal] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showChatTooltip, setShowChatTooltip] = useState(true);
    const [chatMessages, setChatMessages] = useState<any[]>([
        { role: 'model', parts: [{ text: "Hi there! 👋 I'm the BOCRA assistant. Ask me anything about communications regulation in Botswana." }] }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Initialize Gemini with the new SDK
    const ai = new GoogleGenAI({ 
        apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" 
    });

    const handleSendChat = async (text: string = chatInput) => {
        if (!text.trim() || isGenerating) return;
        
        const userMsg = { role: 'user', parts: [{ text }] };
        const newHistory = [...chatMessages, userMsg];
        setChatMessages(newHistory);
        setChatInput('');
        setIsGenerating(true);

        try {
            // New SDK usage: generateContent with history & system instruction
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: newHistory,
                config: {
                    systemInstruction: "You are the official BOCRA (Botswana Communications Regulatory Authority) AI assistant. Only answer questions related to BOCRA's regulatory mandate (Broadcasting, Telecommunications, Postal, and Spectrum Management). If a user asks about anything else, politely decline and redirect them to BOCRA-related topics. Keep responses professional, and very concise. Avoid using asterisks (*) for lists or emphasis; use **bolding** instead where necessary. Do not make the reply very long. Always end with a follow-up question like 'What else can I help you with?'"
                }
            });
            
            const modelMsg = { role: 'model', parts: [{ text: response.text }] };
            setChatMessages([...newHistory, modelMsg]);
        } catch (error: any) {
            console.error(error);
            const errorMsg = error.message?.includes("API key") 
                ? "BOCRA AI Error: Invalid or missing API key. Please check your .env file."
                : "I'm having trouble connecting to my brain right now. Please try again later.";
            setChatMessages([...newHistory, { role: 'model', parts: [{ text: errorMsg }] }]);
        } finally {
            setIsGenerating(false);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');

    const searchSuggestions = [
        { title: 'Best Cybersecurity Practices', type: 'Guide', desc: 'Learn best cybersecurity practices to protect your data online' },
        { title: 'AI Regulation Laws', type: 'Framework', desc: 'Learn how BOCRA works with laws in AI regulation in Botswana' },
        { title: 'Consumer Protection', type: 'Service', desc: 'File a complaint or dispute against an operator' },
        { title: 'Type Approval Guidelines', type: 'Regulation', desc: 'Equipment certification guidelines 2024' },
        { title: 'Mascom Wireless', type: 'Licensee', desc: 'Public Telecommunications Operator (Tier 1)' },
        { title: 'Orange Botswana', type: 'Licensee', desc: 'Public Telecommunications Operator (Tier 1)' },
        { title: 'Spectrum Auction 5G', type: 'Resource', desc: 'Ongoing frequency allocation and mapping' },
        { title: '.BW Domain Registry', type: 'Service', desc: 'Register a national web domain for business' },
    ];

    const filteredSuggestions = searchQuery 
        ? searchSuggestions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()))
        : searchSuggestions.slice(0, 3);

    const faqData = [
        {
            question: "How do I file a complaint?",
            answer: "Consumers must first exhaust all complaint channels with their service provider (Mascom, Orange, BTC, etc.). If the issue remains unresolved, you can escalate it to BOCRA for redress."
        },
        {
            question: "What is Type Approval?",
            answer: "Every communication device (phones, routers, radios) must be registered and tested to ensure it is electrically safe and compatible with Botswana's networks before it can be used or sold."
        },
        {
            question: "How can I register a .BW domain?",
            answer: "BOCRA operates the .bw ccTLD registry. You can register your domain through any of our accredited registrars listed on our portal."
        },
        {
            question: "What is the UASF?",
            answer: "The Universal Access and Service Fund (UASF) is managed by BOCRA to ensure that even the most rural settlements in Botswana achieve digital connectivity."
        }
    ];

    return (
        <div className="legae-landing">
            <style>
                {`
                    .chat-action-btn {
                        background: #fff;
                        border: 1px solid #ddd;
                        padding: 0.6rem 1rem;
                        border-radius: 8px;
                        font-size: 0.85rem;
                        color: #333;
                        cursor: pointer;
                        transition: all 0.2s;
                        text-align: left;
                        width: fit-content;
                    }
                    .chat-action-btn:hover {
                        background: #f0f2f7;
                        border-color: #3F4E60;
                        color: #3F4E60;
                        transform: translateX(5px);
                    }
                `}
            </style>
            {/* Navigation */}
            <Navbar 
                onNavigate={onNavigate} 
                onPortalLogin={onPortalLogin} 
                onClientPortalLogin={onClientPortalLogin} 
                onConsumerPortalLogin={onConsumerPortalLogin}
                onAboutUs={onAboutUs} 
                activePage="landing" 
            />

            {/* Mobile Menu Overlay */}
            {/* The Navbar component now handles its own mobile menu state and overlay */}

            {/* Hero Section */}
            <header className="hero" id="strategy">
                <div className="hero-slider-bg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    {heroBgImages.map((src, index) => (
                        <div 
                            key={index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url("${src}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: currentBgIndex === index ? 1 : 0,
                                transition: 'opacity 1.5s ease-in-out'
                            }}
                        />
                    ))}
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-container" style={{ alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <div className="hero-content-wrapper">
                        <h1>Regulating for a Digitally Enabled Economy</h1>
                        <p className="hero-subtitle">
                            <strong>Mission:</strong> To regulate and promote an inclusive and impactful communications sector through innovation, fair competition, and effective consumer protection.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <button className="try-free-btn" onClick={onConsumerPortalLogin}>Report an Issue (Consumer Portal)</button>
                            <button className="watch-demo-btn" onClick={onClientPortalLogin}>Portal for Licensees</button>
                        </div>
                    </div>

                    <div className="hero-image-container">
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '650px', gap: '1.5rem', alignItems: 'flex-end', marginTop: '1.25rem' }}>
                            {/* Search Bar */}
                            <div className="hero-search-wrapper" style={{ width: '100%', position: 'relative' }}>
                                <div className="hero-search-bar" style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    background: 'rgba(255, 255, 255, 0.98)', 
                                    backdropFilter: 'blur(10px)', 
                                    padding: '1rem 1.75rem', 
                                    borderRadius: '50px', 
                                    border: '1px solid rgba(255, 255, 255, 0.5)',
                                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                                    width: '100%',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ color: '#A80000', marginRight: '15px' }}>
                                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.5-1.5l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                                    </svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search services, regulations, or licensee registry..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ 
                                            border: 'none', 
                                            background: 'transparent', 
                                            flex: 1, 
                                            fontSize: '1.05rem', 
                                            outline: 'none', 
                                            color: '#222',
                                            fontWeight: '500'
                                        }}
                                    />
                                </div>
                                
                                {/* Search Dropdown */}
                                <div className="search-dropdown" style={{
                                    position: 'absolute',
                                    top: 'calc(100% + 10px)',
                                    left: 0,
                                    width: '100%',
                                    background: 'rgba(255, 255, 255, 0.98)',
                                    backdropFilter: 'blur(16px)',
                                    borderRadius: '16px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    border: '1px solid rgba(255,255,255,0.5)',
                                    overflow: 'hidden',
                                    zIndex: 50,
                                    animation: 'fadeInDown 0.2s ease forwards',
                                    textAlign: 'left'
                                }}>
                                    {filteredSuggestions.length > 0 ? (
                                        <ul style={{ listStyle: 'none', padding: '0.5rem', margin: 0 }}>
                                            {filteredSuggestions.map((suggestion, idx) => (
                                                <li key={idx} style={{ 
                                                    padding: '0.75rem 1rem', 
                                                    borderRadius: '10px',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s ease',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '4px'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#FDF2F2'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                                onClick={() => { 
                                                    setSearchQuery(suggestion.title); 
                                                    if (suggestion.title === 'Best Cybersecurity Practices' && onNavigate) {
                                                        onNavigate('cybersecurity');
                                                    } else if (suggestion.title === 'AI Regulation Laws' && onNavigate) {
                                                        onNavigate('airegulation');
                                                    } else {
                                                        alert('Navigating to: ' + suggestion.title); 
                                                    }
                                                }}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <strong style={{ color: '#222', fontSize: '0.95rem' }}>{suggestion.title}</strong>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#A80000', background: '#ffe4e4', padding: '2px 8px', borderRadius: '12px' }}>{suggestion.type}</span>
                                                    </div>
                                                    <span style={{ color: '#666', fontSize: '0.85rem' }}>{suggestion.desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div style={{ padding: '1.5rem', textAlign: 'center', color: '#888', fontSize: '0.95rem' }}>
                                            No results found for "{searchQuery}"
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </header>

            {/* Pillars Section */}
            <section style={{ padding: '2rem 10%', background: '#fff', borderBottom: '1px solid #eee' }}>
                <div style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    textAlign: 'center',
                    justifyContent: 'center',
                    flexWrap: 'nowrap',
                }}>
                    {['Collaborative Regulation', 'Inclusivity', 'Digitalisation', 'Trusted Corporate Leadership', 'Inclusive/Diverse Culture'].map((pillar, i) => (
                        <div key={i} style={{ 
                            padding: '1.25rem 0.75rem', 
                            background: '#FDF2F2', 
                            borderRadius: '12px', 
                            fontWeight: '700', 
                            color: '#A31D1D',
                            fontSize: '0.85rem',
                            flex: '1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: '0'
                        }}>
                            {pillar}
                        </div>
                    ))}
                </div>
            </section>

            {/* Regulated Entities Marquee */}
            <section style={{ padding: '6rem 10% 3rem', background: '#fff', overflow: 'hidden' }}>
                <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ maxWidth: 'none' }}>Entities Regulated by BOCRA</h2>
                </div>
                <div className="marquee-container">
                    <div className="marquee-content">
                        {[
                            'Mascom Wireless', 'Orange Botswana', 'BTC', 'BoFiNet', 
                            'Paratus Botswana', 'Liquid Intelligent Technologies', 
                            'BotswanaPost', 'DStv Botswana', 'Vumatel', 'BBI', 
                            'Abari', 'MicroTeck'
                        ].map((company, i) => (
                            <div key={i} className="marquee-item">
                                <img src={brandLogo} alt={company} style={{ height: '2.5rem', opacity: 0.6, marginBottom: '0.5rem' }} />
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#333' }}>{company}</span>
                            </div>
                        ))}
                        {/* Duplicate for infinite loop */}
                        {[
                            'Mascom Wireless', 'Orange Botswana', 'BTC', 'BoFiNet', 
                            'Paratus Botswana', 'Liquid Intelligent Technologies', 
                            'BotswanaPost', 'DStv Botswana', 'Vumatel', 'BBI', 
                            'Abari', 'MicroTeck'
                        ].map((company, i) => (
                            <div key={`dup-${i}`} className="marquee-item">
                                <img src={brandLogo} alt={company} style={{ height: '2.5rem', opacity: 0.6, marginBottom: '0.5rem' }} />
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#333' }}>{company}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sectors Section */}
            <section className="features" id="sectors">
                <div className="section-header">
                    <div>
                        <h2>The Four Regulatory Sectors</h2>
                    </div>
                    <div>
                        <p>BOCRA ensures the stability and growth of Botswana's communications landscape across four key pillars.</p>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <img src={featureImg1} alt="Telecommunications" />
                        <h3>Telecommunications & ICT</h3>
                        <p>Regulation of Public Telecommunications Operators (PTOs) like BTC, Mascom, Orange, and BoFiNet. Focus on affordable, high-quality real-time services.</p>
                    </div>
                    <div className="feature-card">
                        <img src={featureImg2} alt="Broadcasting" />
                        <h3>Broadcasting Services</h3>
                        <p>Regulation of commercial radio and private television. Mandatory local content quotas to promote Botswana's unique artists and culture.</p>
                    </div>
                    <div className="feature-card">
                        <img src={featureImg3} alt="Postal" />
                        <h3>Postal Services</h3>
                        <p>Oversight of BotswanaPost and private courier markets. Ensuring safe, reliable, and affordable mail delivery nationwide.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-container">
                            <div className="feature-icon-box">
                                <div className="feature-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="#A31D1D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 17.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                </div>
                                <h4>Internet & .BW Registry</h4>
                                <p>Operation of the .bw ccTLD registry and accreditation of secure digital signatures to foster trust.</p>
                            </div>
                        </div>
                        <h3>Digital Trust</h3>
                        <p>Elevating regulatory maturity to Generation 4 – integrated, policy-led regulation for a digital future.</p>
                    </div>
                </div>
            </section>

            {/* Consumer Rights Section */}
            <section className="how-it-works" id="protection">
                <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
                    <h2 style={{ marginBottom: 0 }}>Consumer Rights & Protection</h2>
                    <img 
                        src="/assets/undraw_two-factor-authentication_ofho (1).svg" 
                        alt="Security Illustration" 
                        style={{ 
                            height: '140px', 
                            width: 'auto', 
                            objectFit: 'contain'
                        }} 
                    />
                </div>

                <div className="steps-list">
                    <div className="steps-content">
                        <div className="step-item">
                            <div className="step-number">01</div>
                            <h3>Right to Redress</h3>
                            <p>File complaints regarding billing, faulty equipment, or poor service quality.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">02</div>
                            <h3>Follow Protocol</h3>
                            <p>Exhaust all complaint channels with your provider before escalating to BOCRA.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">03</div>
                            <h3>Data Safety</h3>
                            <p>Safeguarding citizens against data loss, phishing, fraud, and harmful emissions.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">04</div>
                            <h3>Technical Safety</h3>
                            <p>Ensuring every device is type-approved for electrical safety and network compatibility.</p>
                        </div>
                    </div>
                    <div className="steps-image">
                        <img src={featureImg2} alt="Consumer Protection" className="steps-protection-img" />
                    </div>
                </div>
            </section>

            {/* Technical Highlights */}
            <section className="scenarios">
                <div className="scenarios-content">
                    <h2>Regulatory Functions</h2>
                    <p>Moving Botswana toward a secure and globally competitive digital landscape.</p>
                    <div className="scenario-list">
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#A31D1D" d="M18.918 17.48c-.126 2.727-2.384 4.696-5.364 4.696H7.34v-6.123l-2.185-.957V24h8.381c4.334 0 7.549-2.962 7.549-6.881v-.163c-.65.235-1.372.415-2.167.524m1.355-9.501C18.611 4.313 17.726.989 15.432.213c-1.336-.452-2.005-.091-2.637.217a.306.306 0 0 0-.072.505c.361.307.813.687 1.336 1.174c-1.95-1.138-7.333-2.835-7.874-.776c-.488 1.86-1.319 4.587-1.319 4.587S.603 5.487.116 7.293s3.323 5.274 9.627 7.134c6.303 1.861 11.198 1.373 13.311-.921s.072-5.473-2.781-5.527m-1.247.036c-.487.47-2.077 1.68-5.563 1.427c-3.738-.271-6.809-2.474-7.604-3.088a.34.34 0 0 1-.126-.398c.054-.18.126-.469.253-.849c.072-.234.343-.343.542-.216c1.571.903 4.1 2.221 6.791 2.402c2.402.163 3.847-.542 4.786-1.066a.39.39 0 0 1 .542.199l.47 1.156c.036.162.018.325-.091.433"/></svg>
                                </span>
                                Cybersecurity (CSIRT) Monitoring
                            </span>
                            <span>→</span>
                        </div>
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="#A31D1D" d="M5.25 4A3.25 3.25 0 0 0 2 7.25v7.92a7 7 0 0 1 11.5 7.938V25h13.25A3.25 3.25 0 0 0 30 21.75V7.25A3.25 3.25 0 0 0 26.75 4zM9 10h14a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2m7 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2h-6a1 1 0 0 1-1-1m-3 1.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-1 5.362A6.97 6.97 0 0 1 7.5 26.5A6.97 6.97 0 0 1 3 24.862V29a1 1 0 0 0 1.528.849l2.972-1.85l2.972 1.85a1 1 0 0 0 1.528-.85z"/></svg>
                                </span>
                                Universal Access Connectivity (UASF)
                            </span>
                            <span>→</span>
                        </div>
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><defs><mask id="SVGjA1oAU1K"><g fill="none"><path fill="#fff" stroke="#fff" strokeWidth="4" d="M24 38c7.732 0 14-6.268 14-14s-6.268-14-14-14s-14 6.268-14 14s6.268 14 14 14Z"/><path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M11 29c1.509.624 4 1 5.259-.468c1.258-1.469.136-3.78 1.53-4.564c1.528-.86 2.631 2.064 5.502 1.548S28 21 28 19s-1.715-2-1.838-3.946C26 12.5 28 11 28 11m0 26c-1.086-.909-2-1.5-2-3s1-1 2-2s.5-3 1.5-3.5s4.108.556 6.5 2.5"/><circle cx="24" cy="4" r="2" fill="#fff"/><circle cx="24" cy="44" r="2" fill="#fff"/><circle cx="44" cy="24" r="2" fill="#fff"/><circle cx="38" cy="10" r="2" fill="#fff"/><circle cx="10" cy="38" r="2" fill="#fff"/><circle cx="4" cy="24" r="2" fill="#fff"/><circle cx="10" cy="10" r="2" fill="#fff"/><circle cx="38" cy="38" r="2" fill="#fff"/><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M10 24c0 3.815 1.526 7.273 4 9.798M24 38c7.732 0 14-6.268 14-14M24 10c3.815 0 7.273 1.526 9.798 4"/></g></mask></defs><path fill="#A31D1D" d="M0 0h48v48H0z" mask="url(#SVGjA1oAU1K)"/></svg>
                                </span>
                                Evidence Act & Electronic Certification
                            </span>
                            <span>→</span>
                        </div>
                    </div>
                </div>
                <div className="scenarios-image">
                    <img src={featureImg1} alt="BOCRA Regulation" />
                </div>
            </section>

            {/* Testimonials - Repurposed as Vision Statement */}
            <section className="testimonials">
                <div className="testimonial-card">
                    <div className="testimonial-user-icon" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', color: '#A31D1D' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 36 36"><path fill="currentColor" d="M30.86 20.94a4.7 4.7 0 0 1 1.86.64h.05a15.1 15.1 0 0 0-.61-8.37a1 1 0 1 0-1.87.69a13.2 13.2 0 0 1 .57 7.04m-4.53 7.64a13 13 0 0 1-6.07 2.82a1 1 0 1 0 .17 2h.18a15.16 15.16 0 0 0 7.21-3.4v-.07a4.7 4.7 0 0 1-1.49-1.35m-10.71 2.76a13.3 13.3 0 0 1-4.29-1.61a15 15 0 0 1-1.63-1.11A4.7 4.7 0 0 1 8.24 30a16 16 0 0 0 2.07 1.48a15.4 15.4 0 0 0 4.94 1.86h.19a1 1 0 0 0 .18-2M4.56 21.15q.3 0 .6-.09A13 13 0 0 1 5.7 14a1 1 0 0 0-1.88-.69a15 15 0 0 0-.56 8.43a4.8 4.8 0 0 1 1.3-.59"/><path fill="currentColor" d="M31.9 23a3.2 3.2 0 0 0-2.43-.42a3.3 3.3 0 0 0-1.4.77l-3.87-2.24a6.87 6.87 0 0 0-2.77-8.43l-.11-.07a6.7 6.7 0 0 0-2.42-.81V8a3.23 3.23 0 0 0 1.88-1.5A3.3 3.3 0 0 0 19.65 2a3.15 3.15 0 0 0-2.42-.32a3.24 3.24 0 0 0-2 1.51a3.3 3.3 0 0 0 1.13 4.46a3 3 0 0 0 .74.35v3.8a6.63 6.63 0 0 0-4.86 3.28a6.85 6.85 0 0 0-.42 6l-4 2.29a4 4 0 0 0-.45-.37A3.2 3.2 0 0 0 3 24.21a3.3 3.3 0 0 0 1.1 4.46a3.2 3.2 0 0 0 1.65.46a3 3 0 0 0 .78-.1a3.25 3.25 0 0 0 2.34-3.94v-.17l3.88-2.24a7 7 0 0 0 1.89 1.71a6.49 6.49 0 0 0 8.73-1.7l3.83 2.21a3.29 3.29 0 0 0 1.45 3.64A3.18 3.18 0 0 0 33 27.41A3.3 3.3 0 0 0 31.9 23M8.05 10a13 13 0 0 1 5.35-3.77a5 5 0 0 1-.17-2.07a15.15 15.15 0 0 0-6.7 4.51A1 1 0 0 0 8.05 10"/><path fill="currentColor" d="M24.67 7.23A13.1 13.1 0 0 1 27.93 10a1 1 0 1 0 1.52-1.3a15 15 0 0 0-3.76-3.2a16 16 0 0 0-2.94-1.33a4.8 4.8 0 0 1-.15 2.06a14 14 0 0 1 2.07 1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                    </div>
                    <p className="testimonial-text">
                        "Vision: A digitally enabled economy. Elevating regulatory maturity from Generation 3 to Generation 4 – policy-led, integrated regulation for all."
                    </p>
                    <div className="testimonial-author">
                        <strong>BOCRA Strategic Focus</strong>
                        <p>National Regulatory Mandate</p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq">
                <div className="faq-title">
                    <h2>Frequently asked questions</h2>
                </div>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-question-row">
                                <span className="faq-question">{faq.question}</span>
                                <span className="faq-icon">{activeFaq === index ? '-' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Early Access - Repurposed for Portal */}
            <section className="early-access">
                <h2>Access Customer Portal</h2>
                <p>Track your complaints, check type-approved devices, and manage your registrations in one place.</p>
                <button className="try-free-btn" style={{ background: '#A31D1D', marginBottom: '2rem' }} onClick={onConsumerPortalLogin}>Login to Portal</button>
                <div className="early-access-images">
                    <img src={featureImg1} alt="Portal 1" />
                    <img src={featureImg2} alt="Portal 2" />
                    <img src={featureImg3} alt="Portal 3" />
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="footer-logo-large" style={{ textAlign: 'left', marginBottom: '1.5rem', display: 'block' }}>
                            BOCRA
                        </div>
                        <p style={{ color: '#666', maxWidth: '300px', marginBottom: '1.5rem' }}>
                            Botswana Communications Regulatory Authority. Promoting an inclusive and impactful communications sector.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ display: 'flex', gap: '12px', color: 'var(--legae-text)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 8 8"><path fill="currentColor" d="M0 0v8h8V0M4 8V4H3V3h1V2l1-1h2v1H5v1h2l-.5 1H5v4"/></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1200 1200"><path fill="currentColor" d="M0 0v1200h1200V0zm294.287 235.913c47.53.535 94.35 33.325 96.387 90.088c1.016 50.475-42.971 88.921-97.632 90.088h-1.318c-47.057-.543-93.012-34.156-95.142-90.088c.671-49.913 42.627-88.904 97.705-90.088M804.199 474.39c52.255.324 101.572 15.826 142.09 57.13c42.106 46.96 55.624 111.71 57.129 177.538v299.414H830.859V729.419c-.384-52.302-18.3-115.877-87.524-117.993c-40.571.432-69.18 24.007-88.77 63.428c-5.348 12.688-6.118 27.273-6.372 41.821v291.797H475.708c.66-145.877 1.567-291.743 1.245-437.622c0-41.438-.399-69.34-1.245-83.716h172.485v73.535c14.641-20.823 30.879-40.571 52.66-56.47c29.545-21.085 65.036-29.168 103.346-29.809m-597.436 12.744h172.485v521.338H206.763z"/></svg>
                            </div>
                            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>
                                Official Portal for Communications Regulation in Botswana.
                            </p>
                        </div>
                    </div>
                    <div className="footer-links">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#sectors">Sectors</a></li>
                            <li><a href="#strategy">Strategy</a></li>
                            <li><a href="#protection">Consumer Protection</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('resources'); }}>Type Approval</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); if(onNavigate) onNavigate('resources'); }}>CSIRT Monitor</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>Terms & Privacy</a></li>
                        </ul>
                        <div style={{ marginTop: '1.5rem', opacity: 0.8 }}>
                            <img 
                                src="/assets/undraw_data-thief_d66l (1).svg" 
                                alt="Security Illustration" 
                                style={{ width: '100%', maxWidth: '140px', height: 'auto' }} 
                            />
                        </div>
                    </div>
                </div>
                <div className="footer-bottom" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #FFE4E4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#666' }}>
                    <p>&copy; {new Date().getFullYear()} BOCRA. All rights reserved.</p>
                    <p>Regulating for the Future</p>
                </div>
            </footer>

            {/* Waitlist/Contact Popup Overlay - Hidden for now */}
            {/*
            {showWaitlist && (
                ...
            )}
            */}

            {/* Terms Modal */}
            {showPrivacy && (
                <div className="popup-overlay privacy-modal-overlay" onClick={() => setShowPrivacy(false)}>
                    <div className="waitlist-popup privacy-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="close-popup" onClick={() => setShowPrivacy(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                        </button>
                        <div className="privacy-content-wrapper" style={{ padding: '6rem 4rem 4rem 4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#1a1a1a', textAlign: 'left' }}>BOCRA Terms of Service</h2>

                            <div className="privacy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>1. Regulatory Scope</h3>
                                    <p>BOCRA regulates Telecommunications, Postal, and Broadcasting services in Botswana, ensuring fair competition and consumer protection.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>2. Domain Registry</h3>
                                    <p>As the ccTLD registry for .bw, BOCRA maintains the integrity and availability of the national domain space.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>3. Consumer Protection</h3>
                                    <p>We provide a framework for redress, ensuring that service providers adhere to quality standards and billing accuracy.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>4. Data & Use</h3>
                                    <p>Data collected through this portal is used strictly for regulatory purposes and service improvements.</p>
                                </div>

                                <div className="privacy-section" style={{ gridColumn: 'span 2' }}>
                                    <h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>5. Legal Compliance</h3>
                                    <p>All activities on this portal are governed by the Communications Regulatory Authority Act and relevant laws of Botswana.</p>
                                </div>
                            </div>
                            <p style={{ marginTop: '3rem', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Personalized Action Modal */}
            {showDemoModal && (
                <div className="demo-modal-overlay">
                    <div className="demo-modal-container">
                        <button 
                            className="modal-close-btn demo-modal-close-btn"
                            onClick={() => setShowDemoModal(false)}
                            style={{
                                position: 'absolute',
                                top: '30px',
                                right: '20px',
                                width: '36px',
                                height: '36px',
                                borderRadius: '0',
                                border: 'none',
                                background: '#A31D1D',
                                color: '#ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                zIndex: 100,
                                boxShadow: '0 4px 12px rgba(163, 29, 29, 0.2)'
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20"><rect width="20" height="20" fill="none"/><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"/></svg>
                        </button>
                        
                        <div 
                            className="demo-modal-image-panel"
                            style={{ backgroundImage: `url("${heroBgImages[2]}")` }}
                        >
                            <div className="demo-modal-image-inner">
                                <h1 style={{ color: '#000000', fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.1', margin: 0 }}>BOCRA<br/>UPDATES</h1>
                                <p style={{ color: '#000000', opacity: 0.95, marginTop: '1rem', fontWeight: '600', fontSize: '1.1rem' }}>Regulating for the Future.</p>
                            </div>
                        </div>

                        <div className="demo-modal-content">
                            <div className="demo-modal-cards-grid">
                                {/* Card 1: Phishing */}
                                <div 
                                    className="modal-card-item"
                                    style={{ 
                                        background: '#FFF5F5', 
                                        padding: '1.25rem', 
                                        borderRadius: '0px', 
                                        border: '1px solid #FFE4E4', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        height: '100%',
                                        cursor: 'default'
                                    }}
                                >
                                    <div style={{ color: '#000', marginBottom: '0.75rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><path fill="currentColor" d="M28.002 40.462a11 11 0 0 1-.942-1.612Q26 36.614 26 33.9v-5.775a.83.83 0 0 1 .833-.825q2.333 0 4.606-.863a16 16 0 0 0 2.547-1.253a19 19 0 0 0 1.514-1.019a.84.84 0 0 1 1 0q1.132.84 2.278 1.455q1.379.74 2.778 1.153a13 13 0 0 0 2.186.446q.71.081 1.425.081c.46 0 .833.37.833.825V33.9c0 5.501-3.286 9.543-9.695 12.043a.84.84 0 0 1-.61 0q-3.177-1.24-5.323-2.98a14 14 0 0 1-.63-.54q-.436-.4-.823-.823q-.501-.549-.917-1.138m6.306-17.903q-.162.12-.322.234a49 49 0 0 0-.287-4.293h9.535a20 20 0 0 1 .729 6.731a11 11 0 0 1-1.84-.376a12.7 12.7 0 0 1-2.4-.997q-1.006-.54-2.03-1.299a2.84 2.84 0 0 0-3.385 0m-8.139 20.362q.324-.308.65-.704a13 13 0 0 1-1.567-2.512C24.41 37.924 24 35.977 24 33.9v-1.4h-6.718c.471 2.437 1.135 4.603 1.931 6.395c.82 1.844 1.732 3.183 2.618 4.026C22.704 43.75 23.433 44 24 44s1.296-.248 2.169-1.08m.664-17.621c1.544 0 3.095-.337 4.666-1.056L31.5 24a47 47 0 0 0-.317-5.5H16.817A47 47 0 0 0 16.5 24c0 2.098.134 4.111.38 6H24v-1.875a2.83 2.83 0 0 1 2.833-2.825M14.36 30a49 49 0 0 1-.36-6c0-1.897.104-3.74.3-5.5H4.767A20 20 0 0 0 4 24c0 2.09.32 4.106.916 6zm-8.47 2.5c2.49 5.295 7.235 9.321 12.997 10.84c-1.856-2.49-3.324-6.293-4.149-10.84zM28.788 9.105c.85 1.914 1.55 4.254 2.025 6.895H17.188c.476-2.64 1.175-4.981 2.026-6.895c.82-1.844 1.731-3.183 2.617-4.026C22.704 4.25 23.433 4 24 4s1.296.248 2.169 1.08c.886.842 1.798 2.18 2.617 4.025M33.349 16h8.987c-2.421-5.541-7.281-9.774-13.223-11.34c1.924 2.58 3.43 6.572 4.236 11.34M5.664 16h8.987c.806-4.768 2.312-8.76 4.236-11.34C12.945 6.226 8.085 10.459 5.664 16M35.5 24.165l-1.192-1.606Z"/></svg>
                                    </div>
                                    <h3 style={{ color: '#000000', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1.05rem' }}>
                                        A wena o batlile go tsietswa?
                                    </h3>
                                    <p style={{ color: '#000000', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1rem', flexGrow: 1 }}>
                                        Scams are on the rise. Report phishing to protect your family and help build safer online spaces for all Batswana.
                                    </p>
                                    <button 
                                        className="modal-card-button"
                                        onClick={(e) => { e.stopPropagation(); setShowDemoModal(false); alert('Opening Scams Report...'); }}
                                        style={{ width: 'fit-content', padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', background: '#A31D1D', color: '#fff', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                    >
                                        Report Phishing
                                    </button>
                                </div>

                                {/* Card 2: Org Complaint */}
                                <div 
                                    className="modal-card-item"
                                    style={{ 
                                        background: '#F8F9FF', 
                                        padding: '1.25rem', 
                                        borderRadius: '0px', 
                                        border: '1px solid #E4E7FF', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        height: '100%',
                                        cursor: 'default'
                                    }}
                                >
                                    <div style={{ color: '#000', marginBottom: '0.75rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m6.48 15.38a1 1 0 0 1-1.19.76A6.2 6.2 0 0 0 16 16a6 6 0 0 0-4.6 2.14a1 1 0 0 1-.76.36a1 1 0 0 1-.77-1.64A8 8 0 0 1 16 14a7.5 7.5 0 0 1 1.71.19a1 1 0 0 1 .77 1.19M9.5 9a2 2 0 1 1-2-2a2 2 0 0 1 2 2m5 0a2 2 0 1 1 2 2a2 2 0 0 1-2-2"/></svg>
                                    </div>
                                    <h3 style={{ color: '#000000', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1.05rem' }}>
                                        Unhappy with a service?
                                    </h3>
                                    <p style={{ color: '#000000', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1rem', flexGrow: 1 }}>
                                        Experience poor service or unfair billing? We regulate telecoms, postal, and radio to ensure you get what you pay for.
                                    </p>
                                    <button 
                                        className="modal-card-button"
                                        onClick={(e) => { e.stopPropagation(); setShowDemoModal(false); alert('Opening Complaint Form...'); }}
                                        style={{ width: 'fit-content', padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', background: '#A31D1D', color: '#fff', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                    >
                                        Report Provider
                                    </button>
                                </div>

                                {/* Card 3: Cyber Intel */}
                                <div 
                                    className="modal-card-item"
                                    style={{ 
                                        background: '#F5FFF9', 
                                        padding: '1.25rem', 
                                        borderRadius: '0px', 
                                        border: '1px solid #E4FFE9', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        height: '100%',
                                        cursor: 'default'
                                    }}
                                >
                                    <div style={{ color: '#000', marginBottom: '0.75rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><path stroke-linejoin="round" d="M9.767 18.849L12 14l2.233 4.849c.647 1.406.971 2.109.628 2.617l-.029.04C14.466 22 13.644 22 12 22s-2.466 0-2.832-.493l-.03-.041c-.342-.508-.018-1.211.63-2.617"/><circle cx="12" cy="12" r="2"/><path d="M4 18.001A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 2.252-.744 4.33-2 6.001"/><path d="M7.528 16a6 6 0 1 1 8.944 0"/></g></svg>
                                    </div>
                                    <h3 style={{ color: '#000000', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1.05rem' }}>
                                        Botswana Cyber Intel
                                    </h3>
                                    <p style={{ color: '#000000', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1rem', flexGrow: 1 }}>
                                        Your reports help build our public threat analytics dashboard, helping the nation stay ahead of cyber threats.
                                    </p>
                                    <button 
                                        className="modal-card-button"
                                        onClick={(e) => { e.stopPropagation(); setShowDemoModal(false); alert('Opening Analytics Dashboard...'); }}
                                        style={{ width: 'fit-content', padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', background: '#A31D1D', color: '#fff', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                    >
                                        View Analytics
                                    </button>
                                </div>

                                {/* Card 4: Support */}
                                <div 
                                    className="modal-card-item"
                                    style={{ 
                                        background: '#FFFBF5', 
                                        padding: '1.25rem', 
                                        borderRadius: '0px', 
                                        border: '1px solid #FFF1E4', 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        height: '100%',
                                        cursor: 'default'
                                    }}
                                >
                                    <div style={{ color: '#000', marginBottom: '0.75rem' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><path fill="currentColor" fill-rule="evenodd" d="M13 19.5a8 8 0 0 1 4.023-6.943Q17.002 11.238 17 9.5c0-2.551.044-4.405.09-5.645c.043-1.2.854-2.187 2.05-2.285c.51-.041 1.128-.07 1.86-.07s1.35.029 1.86-.07c1.196.098 2.007 1.085 2.05 2.285c.046 1.24.09 3.094.09 5.645q-.001 1.738-.023 3.057A8 8 0 1 1 13 19.5m14.995-8.49Q28 10.3 28 9.5c0-2.585-.044-4.476-.091-5.755a5.6 5.6 0 0 0-.183-1.224c7.348 2.504 12.663 9.335 12.829 17.423l3.88 5.41c.693.967.62 2.38-.505 3.069c-.853.52-2.099 1.127-3.771 1.57l-.576 6.83a3.5 3.5 0 0 1-3.917 3.18l-2.52-.312v2.917c0 1.507-.981 2.87-2.519 3.155c-1.851.345-4.884.737-9.098.737s-7.246-.392-9.098-.737c-1.537-.286-2.52-1.648-2.52-3.155V35.25C5.407 31.808 2.5 26.407 2.5 20.333c0-7.824 4.82-14.53 11.677-17.375q-.07.39-.086.787C14.044 5.024 14 6.915 14 9.5q0 .8.005 1.51A10.98 10.98 0 0 0 10 19.5c0 5.866 4.592 10.66 10.377 10.983C23.645 33.517 28.4 35.5 33 35.5a1.5 1.5 0 0 0 0-3c-2.922 0-5.969-.983-8.462-2.581C28.878 28.446 32 24.337 32 19.5a10.98 10.98 0 0 0-4.005-8.49" clip-rule="evenodd"/></svg>
                                    </div>
                                    <h3 style={{ color: '#000000', fontWeight: '800', marginBottom: '0.4rem', fontSize: '1.05rem' }}>
                                        Technical Guidance?
                                    </h3>
                                    <p style={{ color: '#000000', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1rem', flexGrow: 1 }}>
                                        Have questions about Type Approval, licensing, or spectrum use? Our experts are here to help you navigate regulations.
                                    </p>
                                    <button 
                                        className="modal-card-button"
                                        onClick={(e) => { e.stopPropagation(); setShowDemoModal(false); onPortalLogin?.(); }}
                                        style={{ width: 'fit-content', padding: '0.5rem 1.2rem', borderRadius: '50px', border: 'none', background: '#A31D1D', color: '#fff', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                    >
                                        Ask an Expert 
                                    </button>
                                </div>
                            </div>

                            <p style={{ marginTop: '2.5rem', textAlign: 'center', color: '#000000', fontSize: '0.85rem', fontWeight: '600' }}>
                                Securely powered by the Communications Regulatory Authority of Botswana.
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/* Floating Chatbot Icon & Tooltip */}
            <div style={{ position: 'fixed', bottom: '15px', right: '25px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
                {/* Tooltip Container */}
                {!isChatOpen && showChatTooltip && (
                    <div 
                        className="chatbot-tooltip"
                        style={{ 
                            background: 'white', 
                            padding: '0.75rem 1rem', 
                            borderRadius: '20px 20px 5px 20px', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                            maxWidth: '220px',
                            border: '1px solid #eee',
                            position: 'relative',
                            marginBottom: '10px',
                            animation: 'chatSlideUp 0.4s ease forwards'
                        }}
                    >
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowChatTooltip(false); }}
                            style={{ 
                                position: 'absolute', 
                                top: '-12px', 
                                right: '-12px', 
                                background: 'white', 
                                color: '#3F4E60', 
                                border: 'none', 
                                borderRadius: '50%', 
                                width: '22px', 
                                height: '22px', 
                                cursor: 'pointer', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                                padding: 0
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><rect width="20" height="20" fill="none"/><path fill="currentColor" d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"/></svg>
                        </button>
                        <div style={{ position: 'absolute', bottom: '-15px', right: '25px', width: '30px', height: '30px', background: 'white', transform: 'rotate(45deg)', borderRight: '1px solid #eee', borderBottom: '1px solid #eee', zIndex: -1 }}></div>
                        <div style={{ position: 'absolute', top: '-15px', right: '20px', width: '36px', height: '36px', background: '#FF7F50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15"><path fill="white" d="M7.5 5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/><path fill="white" fillRule="evenodd" d="M9 2H8V0H7v2H6a6 6 0 0 0 0 12h3q.195 0 .389-.013l3.99.998a.5.5 0 0 0 .606-.606l-.577-2.309A6 6 0 0 0 9 2M5 6.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 12a4.48 4.48 0 0 1-2.813-.987l.626-.78c.599.48 1.359.767 2.187.767s1.588-.287 2.187-.767l.626.78A4.48 4.48 0 0 1 7.5 12" clipRule="evenodd"/></svg>
                        </div>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#444', lineHeight: '1.4' }}>
                            👋 Want to chat about BOCRA? I'm an AI chatbot here to help you find your way.
                        </p>
                    </div>
                )}

                {/* Chat Window Container */}
                {isChatOpen && (
                    <div 
                        className="chatbot-window"
                        style={{ 
                            width: '320px', 
                            height: '480px', 
                            background: 'white', 
                            borderRadius: '15px', 
                            boxShadow: '0 20px 50px rgba(0,0,0,0.25)', 
                            display: 'flex', 
                            flexDirection: 'column',
                            overflow: 'hidden',
                            animation: 'chatSlideUp 0.3s ease forwards',
                            marginBottom: '10px',
                            border: '1px solid #e0e0e0'
                        }}
                    >
                        {/* Header */}
                        <div style={{ background: '#3F4E60', padding: '1.5rem 1.25rem 1rem 1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', background: '#FF7F50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 15 15"><path fill="white" d="M7.5 5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/><path fill="white" fillRule="evenodd" d="M9 2H8V0H7v2H6a6 6 0 0 0 0 12h3q.195 0 .389-.013l3.99.998a.5.5 0 0 0 .606-.606l-.577-2.309A6 6 0 0 0 9 2M5 6.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 12a4.48 4.48 0 0 1-2.813-.987l.626-.78c.599.48 1.359.767 2.187.767s1.588-.287 2.187-.767l.626.78A4.48 4.48 0 0 1 7.5 12" clipRule="evenodd"/></svg>
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>BOCRA Bot</h4>
                                <span style={{ fontSize: '0.7rem', opacity: '0.8' }}>Online • Ready to help</span>
                            </div>
                            <button onClick={() => setIsChatOpen(false)} style={{ marginLeft: 'auto', alignSelf: 'flex-start', background: 'none', border: 'none', color: 'white', fontSize: '1.25rem', cursor: 'pointer', marginTop: '0px' }}>&times;</button>
                        </div>
                        {/* Chat History */}
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#f9fafb' }}>
                            {chatMessages.map((msg, index) => (
                                <React.Fragment key={index}>
                                    <div style={{ 
                                        background: msg.role === 'user' ? '#3F4E60' : '#edf2f7', 
                                        padding: '0.75rem', 
                                        borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', 
                                        maxWidth: '90%', 
                                        fontSize: '0.8rem', 
                                        color: msg.role === 'user' ? 'white' : '#333', 
                                        lineHeight: '1.4',
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
                                    }}>
                                        {msg.role === 'user' ? (
                                            msg.parts[0].text
                                        ) : (
                                            <ReactMarkdown 
                                                components={{
                                                    p: ({node, ...props}) => <p style={{margin: 0, paddingBottom: '0.5rem'}} {...props} />,
                                                    strong: ({node, ...props}) => <strong style={{fontWeight: '900', color: '#1a1a1a'}} {...props} />,
                                                    ul: ({node, ...props}) => <ul style={{margin: 0, paddingLeft: '1.2rem', paddingBottom: '0.5rem'}} {...props} />,
                                                    li: ({node, ...props}) => <li style={{marginBottom: '0.2rem'}} {...props} />,
                                                }}
                                            >
                                                {msg.parts[0].text}
                                            </ReactMarkdown>
                                        )}
                                    </div>
                                    
                                    {msg.role === 'model' && index === chatMessages.length - 1 && (
                                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-start' }}>
                                            {index === 0 ? (
                                                <>
                                                    <button className="chat-action-btn" onClick={() => onNavigate?.('resources')} style={{ fontSize: '0.75rem', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36"><path fill="currentColor" d="m33 6.4l-3.7-3.7a1.71 1.71 0 0 0-2.36 0L23.65 6H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V11.76l3-3a1.67 1.67 0 0 0 0-2.36M18.83 20.13l-4.19.93l1-4.15l9.55-9.57l3.23 3.23ZM29.5 9.43L26.27 6.2l1.85-1.85l3.23 3.23Z"/></svg>
                                                        Get Regulatory Guides
                                                    </button>
                                                    <button className="chat-action-btn" onClick={() => handleSendChat('How do I apply for a spectrum license?')} style={{ fontSize: '0.75rem', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 36 36"><rect width="36" height="36" fill="none"/><path fill="currentColor" d="M33.83 23.59a6.37 6.37 0 1 0-10.77 4.59l-1.94 2.37l.9 3.61l3.66-4.46a6.26 6.26 0 0 0 3.55 0l3.66 4.46l.9-3.61l-1.94-2.37a6.34 6.34 0 0 0 1.98-4.59m-10.74 0a4.37 4.37 0 1 1 4.37 4.31a4.35 4.35 0 0 1-4.36-4.31Z"/><path fill="currentColor" d="M33.68 15.4h-4.43a8.36 8.36 0 0 1 4.75 3v-3Z"/><path fill="currentColor" d="M19.07 13.6H7V12h11.57A3.67 3.67 0 0 1 19 9.89L21.29 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h15l.57-.7l.93-1.14a8.34 8.34 0 0 1 5.16-12.76h-3.43a3.68 3.68 0 0 1-3.16-1.8M17 24.6H7V23h10Zm1-7H7V16h11Z"/><path fill="currentColor" d="M26.85 1.14L21.13 11a1.28 1.28 0 0 0 1.1 2h11.45a1.28 1.28 0 0 0 1.1-2l-5.72-9.86a1.28 1.28 0 0 0-2.21 0"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                                        Apply for License
                                                    </button>
                                                    <button className="chat-action-btn" onClick={() => handleSendChat('What are the latest broadcasting regulations?')} style={{ fontSize: '0.75rem', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M15.963 21.788q-.213-.213-.213-.538V17q-.225-.2-.363-.462T15.25 16q0-.525.375-.888t.875-.362q.525 0 .888.363t.362.887q0 .275-.112.55t-.388.45v4.25q0 .325-.213.538T16.5 22t-.537-.213m.537-8.312q-1.05 0-1.775.725T14 15.975q0 .3.088.6t.237.575t.138.588t-.238.537t-.537.213t-.488-.263q-.35-.5-.525-1.075t-.175-1.175q0-1.675 1.175-2.837t2.825-1.163q1.675 0 2.838 1.163t1.162 2.837q0 .575-.162 1.15t-.513 1.075q-.175.25-.475.263t-.525-.213q-.225-.2-.25-.513t.125-.587t.225-.575t.075-.6q0-1.05-.725-1.775t-1.775-.725m0-2.475q-2.075 0-3.537 1.45T11.5 16q0 .8.263 1.55t.737 1.4q.2.275.175.588t-.25.537t-.525.2t-.5-.275q-.65-.875-1.025-1.887T10 16q0-2.725 1.9-4.612T16.5 9.5q2.725 0 4.613 1.888T23 16q0 1.1-.35 2.113T21.625 20q-.2.25-.513.25t-.537-.225t-.225-.525t.2-.575q.475-.65.712-1.388T21.5 16q0-2.1-1.45-3.55T16.5 11m-14 9q-.625 0-1.062-.437T1 18.5v-9q0-.625.438-1.062T2.5 8h5q.625 0 1.063.438T9 9.5v9q0 .625-.437 1.063T7.5 20zm14-12.5q-1.575 0-2.975.538T11 9.525V9.5q0-1.45-1.025-2.475T7.5 6H2.475q-.125 0-.238.013T2 6.05V6q0-.825.588-1.412T4 4h15q.825 0 1.413.588T21 6v2.8q-1.05-.625-2.162-.962T16.5 7.5M5 12.525q.325 0 .538-.225t.212-.525q0-.325-.213-.537T5 11.025q-.3 0-.525.213t-.225.537q0 .3.225.525t.525.225"/></svg>
                                                        Broadcasting Regulations
                                                    </button>
                                                    <button className="chat-action-btn" onClick={() => handleSendChat('Report a consumer complaint')} style={{ fontSize: '0.75rem', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" fill-rule="evenodd" d="M6 6.25a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0m-4.486 8.576A18.4 18.4 0 0 1 11 12.506V19.5H1v-4.389zM12.5 20v-7.5H23V20l-5.25 3z" clip-rule="evenodd"/></svg>
                                                        Consumer Protection
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#666', fontWeight: '600' }}>What would you like to do next?</div>
                                                    <button className="chat-action-btn" onClick={() => handleSendChat('Speak with an agent')}>Chat with the team</button>
                                                    <button className="chat-action-btn" onClick={() => setChatMessages([...chatMessages, { role: 'model', parts: [{ text: "Ask me anything else!" }] }])}>Ask another question</button>
                                                    <button className="chat-action-btn" style={{ background: '#fdf2f2', color: '#A80000' }} onClick={() => setIsChatOpen(false)}>End chat</button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                            {isGenerating && <div style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>BOCRA AI is thinking...</div>}
                        </div>

                        {/* Footer Input */}
                        <form 
                            onSubmit={(e) => { e.preventDefault(); handleSendChat(); }}
                            style={{ padding: '0.75rem 1rem', borderTop: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <input 
                                type="text" 
                                placeholder="Write a message" 
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.8rem', color: '#444' }}
                            />
                            <button type="submit" style={{ background: 'none', border: 'none', color: '#3F4E60', cursor: 'pointer', opacity: (chatInput.trim() && !isGenerating) ? 1 : 0.5 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
                            </button>
                        </form>
                    </div>
                )}

                {/* Floating Icon */}
                <div 
                    className="chatbot-trigger"
                    style={{ 
                        background: isChatOpen ? '#3F4E60' : 'white',
                        padding: '12px',
                        borderRadius: '50%',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        width: '60px',
                        height: '60px'
                    }}
                    onClick={() => {
                        setIsChatOpen(!isChatOpen);
                        setShowChatTooltip(false);
                    }}
                >
                    {isChatOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 36 36"><rect width="36" height="36" fill="none"/><path fill="white" d="m33 6.4l-3.7-3.7a1.71 1.71 0 0 0-2.36 0L23.65 6H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V11.76l3-3a1.67 1.67 0 0 0 0-2.36M18.83 20.13l-4.19.93l1-4.15l9.55-9.57l3.23 3.23ZM29.5 9.43L26.27 6.2l1.85-1.85l3.23 3.23Z" className="clr-i-solid clr-i-solid-path-1"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15">
                            <rect width="15" height="15" fill="none"/>
                            <path fill="#1a1c23" d="M7.5 5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/>
                            <path fill="#1a1c23" fillRule="evenodd" d="M9 2H8V0H7v2H6a6 6 0 0 0 0 12h3q.195 0 .389-.013l3.99.998a.5.5 0 0 0 .606-.606l-.577-2.309A6 6 0 0 0 9 2M5 6.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 12a4.48 4.48 0 0 1-2.813-.987l.626-.78c.599.48 1.359.767 2.187.767s1.588-.287 2.187-.767l.626.78A4.48 4.48 0 0 1 7.5 12" clipRule="evenodd"/>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LegaeLandingPage;


