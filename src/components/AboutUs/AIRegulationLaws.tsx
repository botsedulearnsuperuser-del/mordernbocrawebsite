import React, { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import '../LandingPage/LegaeLandingPage.css';
import './AboutUs.css';
import Navbar from '../Shared/Navbar';

interface AIRegulationLawsProps {
    onBackToLanding: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const AIRegulationLaws: React.FC<AIRegulationLawsProps> = ({ onBackToLanding, onPortalLogin, onClientPortalLogin, onConsumerPortalLogin, onNavigate }) => {
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

    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "👋 Want to chat about BOCRA? I'm an AI chatbot here to help you find your way.", sender: 'bot' },
        { id: 2, text: "Ask me or select an option below.", sender: 'bot' }
    ]);
    const [showGlobeModal, setShowGlobeModal] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;
        let globe: any = null;
        let currentRef = canvasRef.current;
        let reqId: number;

        if (showGlobeModal && currentRef) {
            // Using a slightly higher resolution canvas that gets scaled down via CSS for crispness
            const canvasWidth = currentRef.offsetWidth * 2 || 1000;
            const canvasHeight = currentRef.offsetHeight * 2 || 1000;

            globe = createGlobe(currentRef, {
                devicePixelRatio: 2,
                width: canvasWidth,
                height: canvasHeight,
                phi: 0,
                theta: 0.2,
                dark: 0,
                diffuse: 1.2,
                mapSamples: 16000,
                mapBrightness: 6,
                baseColor: [1, 1, 1],
                markerColor: [0.8, 0.1, 0.1], // Deeper Red
                glowColor: [0.95, 0.95, 0.95],
                markers: [
                    { location: [-24.6282, 25.9231], size: 0.08, id: 'bw' }, // Botswana
                    { location: [37.78, -122.44], size: 0.04, id: 'sf' }, // SF
                    { location: [40.71, -74.01], size: 0.04, id: 'nyc' }, // NYC
                    { location: [51.5074, -0.1278], size: 0.05, id: 'lon' }, // London
                    { location: [35.68, 139.65], size: 0.04, id: 'tokyo' } // Tokyo
                ],
                arcs: [
                    { from: [37.78, -122.44], to: [-24.6282, 25.9231] },
                    { from: [40.71, -74.01], to: [-24.6282, 25.9231] },
                    { from: [51.5074, -0.1278], to: [-24.6282, 25.9231] },
                    { from: [35.68, 139.65], to: [-24.6282, 25.9231] }
                ],
                arcColor: [0.8, 0.1, 0.1],
                arcWidth: 0.6,
                arcHeight: 0.3,
            });

            const animate = () => {
                phi += 0.005;
                if (globe) {
                    globe.update({ phi });
                }
                reqId = requestAnimationFrame(animate);
            };
            animate();
        }

        return () => {
            if (reqId) cancelAnimationFrame(reqId);
            if (globe) globe.destroy();
        }
    }, [showGlobeModal]);

    const [searchQuery, setSearchQuery] = useState('');

    const searchSuggestions = [
        { title: 'Cyber Threats Analysis', type: 'Intelligence', desc: 'View current cyber threats analysis in Botswana and beyond' },
        { title: 'Best Cybersecurity Practices', type: 'Guide', desc: 'Learn best cybersecurity practices to protect your data online' },
        { title: 'AI Regulation Laws', type: 'Framework', desc: 'Learn how BOCRA works and laws in AI regulation in Botswana' },
        { title: 'CSIRT Threat Monitor', type: 'Service', desc: 'Live monitoring of national cyber incident responses' },
        { title: 'Data Protection Guidelines', type: 'Regulation', desc: 'Compliance frameworks for data privacy and storage' },
        { title: 'Future of Digital Economy', type: 'Strategy', desc: 'BOCRA Generation 4 regulatory strategies and beyond' },
    ];

    const filteredSuggestions = searchQuery 
        ? searchSuggestions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()))
        : searchSuggestions.slice(0, 3);

    return (
        <div className="legae-landing">
            <style>
                {`
                    .modal-card-button:hover {
                        transform: scale(1.05);
                        filter: brightness(1.1);
                    }
                    .chatbot-trigger:hover {
                        transform: translateY(-5px) scale(1.05);
                        box-shadow: 0 12px 40px rgba(0,0,0,0.25);
                        background-color: #f8f8f8 !important;
                    }
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
                    @keyframes chatSlideUp {
                        from { transform: translateY(20px) scale(0.95); opacity: 0; }
                        to { transform: translateY(0) scale(1); opacity: 1; }
                    }
                    @keyframes ping-severe {
                        75%, 100% { transform: scale(3); opacity: 0; }
                    }
                `}
            </style>
            
            <Navbar 
                onNavigate={onNavigate} 
                onPortalLogin={onPortalLogin} 
                onClientPortalLogin={onClientPortalLogin} 
                onConsumerPortalLogin={onConsumerPortalLogin}
                activePage="airegulation" 
            />

            {/* Hero Section Exactly like Landing Page */}
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
                <div className="hero-container" style={{ alignItems: 'flex-start' }}>
                    <div className="hero-content-wrapper">
                        <h1>AI Regulation Laws</h1>
                        <p className="hero-subtitle">
                            <strong>Framework:</strong> Learn how BOCRA works with laws in AI regulation across Botswana.
                        </p>
                    </div>

                    <div className="hero-image-container">
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '650px', gap: '1.5rem', alignItems: 'flex-end', marginTop: '1.25rem' }}>
                            {/* Search Bar matching Landing Page */}
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
                                        placeholder="Search cyber threats, best practices, AI regulations..." 
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
                                                        setShowGlobeModal(true); 
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

            {/* About Sections replaced within Landing Page container styling */}
            
            {/* AI Regulation Laws Document View */}
            <section className="practices-content" style={{ padding: '6rem 10%', background: '#fff', color: '#333' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '2rem', borderBottom: '2px solid #FFE4E4', paddingBottom: '1rem', fontWeight: '900' }}>National AI Regulatory Framework</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem', color: '#555' }}>
                        Providing the foundational legal and ethical guidelines necessary for the responsible development and employment of Artificial Intelligence within national borders, ensuring innovation is balanced with human rights and data privacy.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                        
                        <div style={{ background: '#f8f9fa', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style={{ color: '#3F4E60', flexShrink: 0 }}><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M10.97 12.055H9.028L10 8.815z"/><path fill="currentColor" d="M14.487 2A5.5 5.5 0 0 0 22 9.512V22H2V2zM5.152 18h2.092l1.184-3.945h3.142L12.753 18h2.09L11.245 6H8.756zM16 18h2v-7h-2z"/><path fill="currentColor" d="M20.532 3.467L23.57 4.75l-3.037 1.282L19.25 9.07l-1.283-3.037L14.93 4.75l3.036-1.283L19.25.43z"/></svg>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Section A: Ethical AI Development</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>All deployed machine learning models must undergo rigorous bias testing to ensure equitable treatment across demographics. Any automated decision-making processes impacting public life, finance, or justice must maintain a "human-in-the-loop" override capacity.</p>
                        </div>

                        <div style={{ background: '#f8f9fa', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" style={{ color: '#3F4E60', flexShrink: 0 }}><rect width="48" height="48" fill="none"/><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path d="M22 8v12c0 2.21-4.03 4-9 4s-9-1.79-9-4V8"/><path d="M22 14c0 2.21-4.03 4-9 4s-9-1.79-9-4"/><path fill="currentColor" d="M22 8c0 2.21-4.03 4-9 4s-9-1.79-9-4s4.03-4 9-4s9 1.79 9 4"/><path d="M32 6h6a4 4 0 0 1 4 4v6M16 42h-6a4 4 0 0 1-4-4v-6"/><circle cx="35" cy="29" r="5" fill="currentColor"/><path fill="currentColor" d="M44 44H26a9 9 0 1 1 18 0"/></g></svg>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Section B: Data Origin & Copyright</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Corporations utilizing LLMs or generative AI systems must actively log the provenance of their training datasets. Unauthorized scraping of citizens' private data or domestic intellectual property for use in commercial AI models is strictly prohibited under the expanded CRA Act.</p>
                        </div>

                        <div style={{ background: '#f8f9fa', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024" style={{ color: '#3F4E60', flexShrink: 0 }}><rect width="1024" height="1024" fill="none"/><path fill="currentColor" d="m709.6 210l.4-.2h.2L512 96L313.9 209.8h-.2l.7.3L151.5 304v416L512 928l360.5-208V304zM482.7 843.6L339.6 761V621.4L210 547.8V372.9l272.7 157.3zM238.2 321.5l134.7-77.8l138.9 79.7l139.1-79.9l135.2 78l-273.9 158zM814 548.3l-128.8 73.1v139.1l-143.9 83V530.4L814 373.1z"/></svg>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Section C: The Innovation Sandbox</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Developers testing high-risk AI capabilities (such as facial recognition or autonomous navigation) must apply for a temporary Sandbox License. This allows supervised real-world testing in highly controlled, geo-fenced zones with explicit informed consent from any participating subjects.</p>
                        </div>

                        <div style={{ background: '#f8f9fa', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14" style={{ color: '#3F4E60', flexShrink: 0 }}><rect width="14" height="14" fill="none"/><path fill="currentColor" fill-rule="evenodd" d="M1.5 0A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h3.164l.048-.06a1.998 1.998 0 0 1 0-3.373a2 2 0 0 1 2.72-2.89A4.33 4.33 0 0 1 11 5.406V3.5a.5.5 0 0 0-.146-.354l-3-3A.5.5 0 0 0 7.5 0zm4.198 6.788a.75.75 0 0 1 1.059-.05l.781.709a2.83 2.83 0 0 1 3.95 0l.782-.71a.75.75 0 0 1 1.008 1.11l-1.022.93q.086.338.086.695v.032h.898a.75.75 0 0 1 0 1.5h-.898v.032q-.001.356-.086.696l1.022.929a.75.75 0 1 1-1.008 1.11l-.781-.71a2.83 2.83 0 0 1-3.95 0l-.782.71a.75.75 0 0 1-1.009-1.11l1.023-.93a2.8 2.8 0 0 1-.087-.695v-.032h-.897a.75.75 0 0 1 0-1.5h.897v-.032q0-.357.087-.695l-1.023-.93a.75.75 0 0 1-.05-1.059" clip-rule="evenodd"/></svg>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Section D: Reporting & Liability</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Organizations deploying generative tools must conspicuously label AI-generated content (deepfakes, synthetically generated news, or automated financial advice) to prevent public deception. Failure to do so establishes direct liability on the deploying entity for any resultant damages.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* EXACT same Footer as Landing Page */}
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
                            <li><a href="#sectors" onClick={onBackToLanding}>Sectors</a></li>
                            <li><a href="#strategy" onClick={onBackToLanding}>Strategy</a></li>
                            <li><a href="#protection" onClick={onBackToLanding}>Consumer Protection</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onBackToLanding(); }}>Type Approval</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onBackToLanding(); }}>CSIRT Monitor</a></li>
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

            {/* Globe Modal */}
            {showGlobeModal && (
                <div className="popup-overlay privacy-modal-overlay" onClick={() => setShowGlobeModal(false)} style={{ zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="waitlist-popup privacy-popup" onClick={(e) => e.stopPropagation()} style={{ width: '1000px', maxWidth: '95%', padding: '3rem', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', position: 'relative' }}>
                        <button className="close-popup" onClick={() => setShowGlobeModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                        </button>
                        
                        {/* Left Pane: Globe & Legend */}
                        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', maxWidth: '500px', aspectRatio: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                <canvas
                                    ref={canvasRef}
                                    style={{ width: '100%', height: '100%', contain: 'layout paint size', opacity: 1, transition: 'opacity 1s ease', cursor: 'grab' }}
                                />
                                
                                {/* Map Legend */}
                                <div style={{ position: 'absolute', bottom: '0', right: '0', background: 'rgba(255, 255, 255, 0.95)', padding: '1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: '0.75rem', color: '#444', border: '1px solid #eee' }}>
                                    <div style={{ fontWeight: '800', marginBottom: '8px', color: '#1a1a1a' }}>Map Key</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ccc' }}></div>
                                        <span>Global Intelligence Nodes</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#cc2222' }}></div>
                                        <span>Active CSIRT Tracking Marker</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '12px', height: '2px', background: '#e05555' }}></div>
                                        <span>Live Threat Data Arcs</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Pane: Live Threat Dashboard */}
                        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                            <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem', color: '#1a1a1a', lineHeight: '1.2', fontWeight: '900' }}>Global Threat Analysis</h2>
                            
                            {/* Threat Status Indicator Removed */}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ color: '#D32F2F' }}><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M9 2.725a.75.75 0 0 1 .799-.699c5.992.394 10.782 5.185 11.175 11.179a.75.75 0 0 1-1.497.098c-.343-5.242-4.535-9.435-9.777-9.78a.75.75 0 0 1-.7-.798M7.589 21.386l.388.386a.75.75 0 0 0 1.057 0l1.346-1.337c.728-.723 1.568-1.559 2.012-2.003a5.496 5.496 0 1 0-7.773 0a1162 1162 0 0 0 2.97 2.954M8.5 15.75a1.25 1.25 0 1 1 0-2.5a1.25 1.25 0 0 1 0 2.5M9.818 5.503a.75.75 0 1 0-.134 1.494a6.99 6.99 0 0 1 6.319 6.317a.75.75 0 1 0 1.494-.136a8.49 8.49 0 0 0-7.679-7.675"/></svg>
                                        Active Risk: AI Spoofing & Phishing
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                        Advanced persistent threats utilizing AI-generated deepfakes and mass phishing campaigns are currently targeting domestic financial ecosystems. Cross-border traffic analysis indicates coordinated spoofing attacks originating from external nodes.
                                    </p>
                                </div>

                                <div>
                                    <h3 style={{ fontSize: '1.1rem', color: '#1a1a1a', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="#2E7D32" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                                        BOCRA Mitigation Strategy
                                    </h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                                        Our national CSIRT is actively filtering malicious traffic signatures at the ISP level. Strict KYC mandates for SIM registration and digital identity verification are being enforced to block spoofed communications before they reach consumers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Terms Modal */}
            {showPrivacy && (
                <div className="popup-overlay privacy-modal-overlay" onClick={() => setShowPrivacy(false)}>
                    <div className="waitlist-popup privacy-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="close-popup" onClick={() => setShowPrivacy(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                        </button>
                        <div className="privacy-content-wrapper" style={{ padding: '6rem 4rem 4rem 4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '3rem', color: '#1a1a1a', textAlign: 'left' }}>BOCRA Terms of Service</h2>

                            <div className="privacy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '1rem' }}>1. Regulatory Scope</h3>
                                    <p>BOCRA regulates Telecommunications, Postal, and Broadcasting services in Botswana, ensuring fair competition and consumer protection.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '1rem' }}>2. Domain Registry</h3>
                                    <p>As the ccTLD registry for .bw, BOCRA maintains the integrity and availability of the national domain space.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '1rem' }}>3. Consumer Protection</h3>
                                    <p>We provide a framework for redress, ensuring that service providers adhere to quality standards and billing accuracy.</p>
                                </div>

                                <div className="privacy-section">
                                    <h3 style={{ color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '1rem' }}>4. Data & Use</h3>
                                    <p>Data collected through this portal is used strictly for regulatory purposes and service improvements.</p>
                                </div>

                                <div className="privacy-section" style={{ gridColumn: 'span 2' }}>
                                    <h3 style={{ color: '#1a1a1a', textTransform: 'uppercase', marginBottom: '1rem' }}>5. Legal Compliance</h3>
                                    <p>All activities on this portal are governed by the Communications Regulatory Authority Act and relevant laws of Botswana.</p>
                                </div>
                            </div>
                            <p style={{ marginTop: '3rem', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Chatbot Window */}
            {showChatWindow && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '30px',
                    width: '380px',
                    height: '420px',
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    boxShadow: '0 12px 48px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    zIndex: 9999,
                    animation: 'chatSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)'
                }}>
                    {/* Header */}
                    <div style={{ background: '#3F4E60', padding: '1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            background: '#ffffff', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            position: 'relative',
                            color: '#000000'
                        }}>
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15"><rect width="15" height="15" fill="none"/><path fill="currentColor" d="M7.5 5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/><path fill="currentColor" fill-rule="evenodd" d="M9 2H8V0H7v2H6a6 6 0 0 0 0 12h3q.195 0 .389-.013l3.99.998a.5.5 0 0 0 .606-.606l-.577-2.309A6 6 0 0 0 9 2M5 6.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 12a4.48 4.48 0 0 1-2.813-.987l.626-.78c.599.48 1.359.767 2.187.767s1.588-.287 2.187-.767l.626.78A4.48 4.48 0 0 1 7.5 12" clip-rule="evenodd"/></svg>
                            <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '10px', background: '#4CAF50', border: '2px solid #3F4E60', borderRadius: '50%', height: '10px', zIndex: 10 }}></div>
                        </div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>BOCRA Bot</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Online</div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{ flexGrow: 1, padding: '1.5rem', background: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {messages.map((msg) => (
                            <div key={msg.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                {msg.sender === 'bot' && (
                                    <div style={{ 
                                        width: '28px', 
                                        height: '28px', 
                                        background: '#ffffff', 
                                        border: '1px solid #ddd',
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center', 
                                        flexShrink: 0,
                                        color: '#000000'
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 15"><rect width="15" height="15" fill="none"/><path fill="currentColor" d="M7.5 5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/><path fill="currentColor" fill-rule="evenodd" d="M9 2H8V0H7v2H6a6 6 0 0 0 0 12h3q.195 0 .389-.013l3.99.998a.5.5 0 0 0 .606-.606l-.577-2.309A6 6 0 0 0 9 2M5 6.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 12a4.48 4.48 0 0 1-2.813-.987l.626-.78c.599.48 1.359.767 2.187.767s1.588-.287 2.187-.767l.626.78A4.48 4.48 0 0 1 7.5 12" clip-rule="evenodd"/></svg>
                                    </div>
                                )}
                                <div style={{ 
                                    background: msg.sender === 'bot' ? '#F0F2F7' : '#3F4E60', 
                                    color: msg.sender === 'bot' ? '#333' : '#fff', 
                                    padding: '0.85rem 1rem', 
                                    borderRadius: '14px', 
                                    borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '14px',
                                    borderTopRightRadius: msg.sender === 'bot' ? '14px' : '2px',
                                    fontSize: '0.9rem', 
                                    lineHeight: '1.4',
                                    maxWidth: '85%',
                                    marginLeft: msg.sender === 'bot' ? '0' : 'auto'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Quick Actions */}
                        <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start', marginLeft: '38px' }}>
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => onNavigate?.('resources')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 36 36"><path fill="currentColor" d="m33 6.4l-3.7-3.7a1.71 1.71 0 0 0-2.36 0L23.65 6H6a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V11.76l3-3a1.67 1.67 0 0 0 0-2.36M18.83 20.13l-4.19.93l1-4.15l9.55-9.57l3.23 3.23ZM29.5 9.43L26.27 6.2l1.85-1.85l3.23 3.23Z"/></svg>
                                Learn Regulations
                            </button>
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => {
                                const text = "How do I apply for a license?";
                                setMessages([...messages, { id: Date.now(), text, sender: 'user' }]);
                                setTimeout(() => {
                                    setMessages(prev => [...prev, { id: Date.now() + 1, text: "To apply for a license, please visit our Licensing portal or contact our licensing department. I can help guide you through the requirements.", sender: 'bot' }]);
                                }, 1000);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 36 36"><rect width="36" height="36" fill="none"/><path fill="currentColor" d="M33.83 23.59a6.37 6.37 0 1 0-10.77 4.59l-1.94 2.37l.9 3.61l3.66-4.46a6.26 6.26 0 0 0 3.55 0l3.66 4.46l.9-3.61l-1.94-2.37a6.34 6.34 0 0 0 1.98-4.59m-10.74 0a4.37 4.37 0 1 1 4.37 4.31a4.35 4.35 0 0 1-4.36-4.31Z"/><path fill="currentColor" d="M33.68 15.4h-4.43a8.36 8.36 0 0 1 4.75 3v-3Z"/><path fill="currentColor" d="M19.07 13.6H7V12h11.57A3.67 3.67 0 0 1 19 9.89L21.29 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h15l.57-.7l.93-1.14a8.34 8.34 0 0 1 5.16-12.76h-3.43a3.68 3.68 0 0 1-3.16-1.8M17 24.6H7V23h10Zm1-7H7V16h11Z"/><path fill="currentColor" d="M26.85 1.14L21.13 11a1.28 1.28 0 0 0 1.1 2h11.45a1.28 1.28 0 0 0 1.1-2l-5.72-9.86a1.28 1.28 0 0 0-2.21 0"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                                Apply for License
                            </button>
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => {
                                const text = "What are the broadcasting regulations?";
                                setMessages([...messages, { id: Date.now(), text, sender: 'user' }]);
                                setTimeout(() => {
                                    setMessages(prev => [...prev, { id: Date.now() + 1, text: "Broadcasting regulations in Botswana cover content quotas, licensing for radio and TV, and technical standards. You can find the full CRA Act details in our resources section.", sender: 'bot' }]);
                                }, 1000);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M15.963 21.788q-.213-.213-.213-.538V17q-.225-.2-.363-.462T15.25 16q0-.525.375-.888t.875-.362q.525 0 .888.363t.362.887q0 .275-.112.55t-.388.45v4.25q0 .325-.213.538T16.5 22t-.537-.213m.537-8.312q-1.05 0-1.775.725T14 15.975q0 .3.088.6t.237.575t.138.588t-.238.537t-.537.213t-.488-.263q-.35-.5-.525-1.075t-.175-1.175q0-1.675 1.175-2.837t2.825-1.163q1.675 0 2.838 1.163t1.162 2.837q0 .575-.162 1.15t-.513 1.075q-.175.25-.475.263t-.525-.213q-.225-.2-.25-.513t.125-.587t.225-.575t.075-.6q0-1.05-.725-1.775t-1.775-.725m0-2.475q-2.075 0-3.537 1.45T11.5 16q0 .8.263 1.55t.737 1.4q.2.275.175.588t-.25.537t-.525.2t-.5-.275q-.65-.875-1.025-1.887T10 16q0-2.725 1.9-4.612T16.5 9.5q2.725 0 4.613 1.888T23 16q0 1.1-.35 2.113T21.625 20q-.2.25-.513.25t-.537-.225t-.225-.525t.2-.575q.475-.65.712-1.388T21.5 16q0-2.1-1.45-3.55T16.5 11m-14 9q-.625 0-1.062-.437T1 18.5v-9q0-.625.438-1.062T2.5 8h5q.625 0 1.063.438T9 9.5v9q0 .625-.437 1.063T7.5 20zm14-12.5q-1.575 0-2.975.538T11 9.525V9.5q0-1.45-1.025-2.475T7.5 6H2.475q-.125 0-.238.013T2 6.05V6q0-.825.588-1.412T4 4h15q.825 0 1.413.588T21 6v2.8q-1.05-.625-2.162-.962T16.5 7.5M5 12.525q.325 0 .538-.225t.212-.525q0-.325-.213-.537T5 11.025q-.3 0-.525.213t-.225.537q0 .3.225.525t.525.225"/></svg>
                                Broadcasting Regulations
                            </button>
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => {
                                const text = "How do I report a consumer complaint?";
                                setMessages([...messages, { id: Date.now(), text, sender: 'user' }]);
                                setTimeout(() => {
                                    setMessages(prev => [...prev, { id: Date.now() + 1, text: "If you have a complaint against a service provider, you should first try to resolve it with them. If unsatisfied, you can lodge a formal complaint with BOCRA through our Consumer Portal.", sender: 'bot' }]);
                                }, 1000);
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" fill-rule="evenodd" d="M6 6.25a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0m-4.486 8.576A18.4 18.4 0 0 1 11 12.506V19.5H1v-4.389zM12.5 20v-7.5H23V20l-5.25 3z" clip-rule="evenodd"/></svg>
                                Consumer Protection
                            </button>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div style={{ padding: '1rem', borderTop: '1px solid #eee', background: '#fff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f9f9f9', padding: '0.5rem 1rem', borderRadius: '24px' }}>
                            <input 
                                type="text" 
                                placeholder="Write a message" 
                                style={{ flexGrow: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', color: '#333' }}
                                onKeyPress={(e) => {
                                    if(e.key === 'Enter' && e.currentTarget.value) {
                                        const text = e.currentTarget.value;
                                        setMessages([...messages, { id: Date.now(), text, sender: 'user' }]);
                                        e.currentTarget.value = '';
                                        setTimeout(() => {
                                            setMessages(prev => [...prev, { id: Date.now() + 1, text: "I've received your query about " + text + ". Let me find an expert to assist you.", sender: 'bot' }]);
                                        }, 1000);
                                    }
                                }}
                            />
                            <div style={{ color: '#3F4E60', cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
                            </div>
                        </div>
                        <div style={{ fontSize: '0.7rem', textAlign: 'center', marginTop: '10px', color: '#999' }}>
                            HubBot uses the information you provide to us to contact you... <span style={{ color: '#3F4E60', cursor: 'pointer', fontWeight: '600' }}>privacy policy</span>.
                        </div>
                    </div>
                </div>
            )}

            {/* Chatbot Bubble Trigger */}
            <div 
                className="chatbot-trigger"
                onClick={() => setShowChatWindow(!showChatWindow)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    backgroundColor: showChatWindow ? '#3F4E60' : '#ffffff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    cursor: 'pointer',
                    zIndex: 10000,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
            >
                <div style={{ color: showChatWindow ? '#ffffff' : '#000000' }}>
                    {showChatWindow ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5l14 14M5 19l14 -14"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5l14 0M5 19l14 0;M5 5l14 14M5 19l14 -14"/></path><path d="M12 12h0"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12h14;M12 12h0"/><set fill="freeze" attributeName="opacity" begin="0.4s" to="0"/></path></g></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><rect width="15" height="15" fill="none"/><path fill="currentColor" d="M7.5 5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3"/><path fill="currentColor" fill-rule="evenodd" d="M9 2H8V0H7v2H6a6 6 0 0 0 0 12h3q.195 0 .389-.013l3.99.998a.5.5 0 0 0 .606-.606l-.577-2.309A6 6 0 0 0 9 2M5 6.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0M7.5 12a4.48 4.48 0 0 1-2.813-.987l.626-.78c.599.48 1.359.767 2.187.767s1.588-.287 2.187-.767l.626.78A4.48 4.48 0 0 1 7.5 12" clip-rule="evenodd"/></svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIRegulationLaws;
