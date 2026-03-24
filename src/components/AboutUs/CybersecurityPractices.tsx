import React, { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import '../LandingPage/LegaeLandingPage.css';
import './AboutUs.css';
import Navbar from '../Shared/Navbar';

interface CybersecurityPracticesProps {
    onBackToLanding: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const CybersecurityPractices: React.FC<CybersecurityPracticesProps> = ({ onBackToLanding, onPortalLogin, onClientPortalLogin, onConsumerPortalLogin, onNavigate }) => {
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
                activePage="cybersecurity" 
            />

            {/* Hero Section Exactly like Landing Page */}

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
                        <h1>Best Cybersecurity Practices</h1>
                        <p className="hero-subtitle">
                            <strong>Guide:</strong> Learn best cybersecurity practices to protect your data online.
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
            
            {/* Cybersecurity Guidelines Document View */}
            <section className="practices-content" style={{ padding: '6rem 10%', background: '#fff', color: '#333' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', color: '#1a1a1a', marginBottom: '2rem', borderBottom: '2px solid #FFE4E4', paddingBottom: '1rem', fontWeight: '900' }}>National Cybersecurity Guidelines</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '3rem', color: '#555' }}>
                        In an increasingly connected world, protecting your digital assets is paramount. BOCRA provides these comprehensive guidelines to help individuals and enterprises mitigate cyber risks and prevent catastrophic infrastructure breaches.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                        <div style={{ background: '#FDF2F2', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: '#A31D1D', fontWeight: '900', fontSize: '2.2rem', lineHeight: '1' }}>1</div>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Phishing & Social Engineering</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Always verify the exact source of emails and SMS. Be highly suspicious of urgent requests for money or sensitive data. Do not click on unknown links. In case of doubt, contact the alleged organization directly using their official listed numbers, bypassing the communication channel entirely.</p>
                        </div>

                        <div style={{ background: '#FDF2F2', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: '#A31D1D', fontWeight: '900', fontSize: '2.2rem', lineHeight: '1' }}>2</div>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Password Hygiene & MFA</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Implement Multi-Factor Authentication (MFA) across all digital footprints. Ensure passwords are at least 12 characters long, combining uppercase, lowercase, numbers, and symbols. Utilize a secure password manager rather than reusing passwords across critical banking and work systems.</p>
                        </div>

                        <div style={{ background: '#FDF2F2', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: '#A31D1D', fontWeight: '900', fontSize: '2.2rem', lineHeight: '1' }}>3</div>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Secure Active Connectivity</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Avoid using public Wi-Fi networks in cafes or airports for financial transactions. If remote work is necessary, strictly enforce the use of a reputable Virtual Private Network (VPN) to encapsulate and encrypt your traffic from potential eavesdroppers on shared local networks.</p>
                        </div>

                        <div style={{ background: '#FDF2F2', padding: '2.5rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                <div style={{ color: '#A31D1D', fontWeight: '900', fontSize: '2.2rem', lineHeight: '1' }}>4</div>
                                <h3 style={{ fontSize: '1.6rem', color: '#1a1a1a', margin: 0 }}>Device Updates and Software</h3>
                            </div>
                            <p style={{ lineHeight: '1.7', color: '#666', fontSize: '1.05rem', margin: 0 }}>Cyber criminals continuously actively exploit known vulnerabilities. You must update your mobile and desktop Operating Systems, browsers, and endpoint applications immediately when security patches are released. Consider automating these updates where system policies allow.</p>
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
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert('Launching Regulatory Guide...')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><rect width="16" height="16" fill="none"/><path fill="currentColor" fill-rule="evenodd" d="M7.684.895L6.074.358a1 1 0 0 0-1.296.753L4.2 4H2.5a.5.5 0 0 0 0 1h1.626a4 4 0 0 0 .11 2.359l-2.072-.345A1 1 0 0 0 1 8v1c.364 0 .706.097 1 .268V8l1 .167l1.859.31l2.163.36l.478.08v6L2 14v-1.268A2 2 0 0 1 1 13v1a1 1 0 0 0 .836.986l6 1c.108.018.22.018.328 0l6-1A1 1 0 0 0 15 14v-1a2 2 0 0 1-1-.268V14l-5.5.917v-6l.478-.08l2.163-.36L13 8.166L14 8v1.268A2 2 0 0 1 15 9V8a1 1 0 0 0-1.164-.986l-2.073.345A4 4 0 0 0 11.874 5H13.5a.5.5 0 0 0 0-1h-1.7l-.578-2.89A1 1 0 0 0 9.925.359L8.316.895a1 1 0 0 1-.632 0m2.88 6.664A3.01 3.01 0 0 0 10.83 5H5.17a3.01 3.01 0 0 0 .266 2.559L8 7.986zM10.8 4H9.2L9 3l1.5-.5zM1 12a1 1 0 1 0 0-2a1 1 0 0 0 0 2m14 0a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/></svg>
                                Learn Regulations
                            </button>
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert('Starting Phishing Report...')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M11 8h2v1h-2zm0-4h2v1h-2zm0 6h2v1h-2z"/><path fill="currentColor" d="M21 12V9a13.12 13.12 0 0 0-8.354 3h-1.292A13.12 13.12 0 0 0 3 9v3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v4a13.15 13.15 0 0 1 9 3.55A13.2 13.2 0 0 1 21 20v-4a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><circle cx="9" cy="4" r="1" fill="currentColor"/><circle cx="15" cy="4" r="1" fill="currentColor"/><path fill="currentColor" d="M16 8H8a3.003 3.003 0 0 1-3-3V3a3.003 3.003 0 0 1 3-3h8a3.003 3.003 0 0 1 3 3v2a3.003 3.003 0 0 1-3 3M8 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z"/></svg>
                                Report Phishing
                            </button>
                            <button className="chat-action-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert('Connecting to human expert...')}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20"><rect width="20" height="20" fill="none"/><path fill="currentColor" d="M5.8 12.2V6H2C.9 6 0 6.9 0 8v6c0 1.1.9 2 2 2h1v3l3-3h5c1.1 0 2-.9 2-2v-1.82a1 1 0 0 1-.2.021h-7zM18 1H9c-1.1 0-2 .9-2 2v8h7l3 3v-3h1c1.1 0 2-.899 2-2V3c0-1.1-.9-2-2-2"/></svg>
                                Chat with an expert
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

export default CybersecurityPractices;
