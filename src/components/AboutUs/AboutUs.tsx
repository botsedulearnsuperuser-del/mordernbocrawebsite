import React, { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import '../LandingPage/LegaeLandingPage.css';
import './AboutUs.css';
import Navbar from '../Shared/Navbar';

interface AboutUsProps {
    onBackToLanding: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onBackToLanding, onPortalLogin, onClientPortalLogin, onNavigate }) => {
    const heroBgImage = '/assets/7d6a5316-288a-4446-96e3-1046f0b9092b.png';


    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showDemoModal, setShowDemoModal] = useState(false);

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

    const [activeLeadershipCategory, setActiveLeadershipCategory] = useState<'board' | 'execs' | 'ops'>('board');

    const leadershipData = {
        board: {
            title: "Board Members (Governance)",
            members: [
                { name: "Dr. Bokamoso Basutli", role: "Chairperson", photo: "/assets/Dr. Bokamoso Basutli.png", desc: "A professional engineer and senior member of the IEEE, currently leading Electrical & Communications Systems Engineering at BIUST." },
                { name: "Ms. Alta Dimpho Seleka", role: "Board Member", photo: "/assets/Ms. Alta Dimpho Seleka.png", desc: "A senior finance professional (FCCA, FCPA) with extensive leadership in public financial management." },
                { name: "Mr. Moabi Pusumane", role: "Board Member", photo: "/assets/Mr. Moabi Pusumane.png", desc: "A commercial leadership expert with over 15 years of experience in telecommunications." }
            ]
        },
        execs: {
            title: "Executive Management (Strategy)",
            members: [
                { name: "Mr. Martin Mokgware", role: "Chief Executive", photo: "/assets/Mr. Martin Mokgware.png", desc: "Oversees the entire Authority's mandate and the implementation of the 2024–2029 Strategic Plan." },
                { name: "Mr. Murphy Setshwane", role: "Acting CEO / Executive", photo: "/assets/Mr. Murphy Setshwane.png", desc: "Represented the Authority at major international regulatory phases, such as the iPRIS Africa initiative." },
                { name: "Ms. Joyce Isa-Molwane", role: "Director of Legal & Compliance", photo: "/assets/Ms. Joyce Isa-Molwane.png", desc: "Serves as the Board Secretary, bridging the gap between governance and daily legal operations." }
            ]
        },
        ops: {
            title: "Operational Departments",
            members: [
                { name: "Mr. Tshoganetso Kepaletswe", role: "Chief Technology Officer", photo: "/assets/Mr. Tshoganetso Kepaletswe.png", desc: "Leads the technical strategy, focusing on infrastructure and technology standards." },
                { name: "Ms. Basebi Mosinyi", role: "Deputy Director, Spectrum Management", photo: "/assets/Ms. Basebi Mosinyi.png", desc: "Recently nominated to represent Botswana on the ITU Radio Regulation Board for 2026–2030." },
                { name: "Mr. Thapelo M. Mogopa", role: "Director of Strategy & Projects", desc: "Manages the execution of large-scale regulatory projects and performance tracking." }
            ]
        }
    };

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
                activePage="about" 
            />

            {/* Hero Section Exactly like Landing Page */}
            <header className="hero" id="strategy">
                <div className="hero-slider-bg" style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    backgroundImage: `url("${heroBgImage}")`, backgroundSize: 'cover', backgroundPosition: 'center',
                }} />

                <div className="hero-overlay"></div>
                <div className="hero-container" style={{ alignItems: 'flex-start' }}>
                    <div className="hero-content-wrapper">
                        <h1>About BOCRA</h1>
                        <p className="hero-subtitle">
                            <strong>Mission:</strong> To regulate the communications sector effectively to ensure continuous development and reliable services for all.
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
            
            {/* Our Mandate Section - styled like 'Sectors' */}
            <section className="features">
                <div className="section-header">
                    <div>
                        <h2>Our Mandate</h2>
                    </div>
                    <div>
                        <p>The Communications Regulatory Authority (BOCRA) was established through the Communications Regulatory Authority Act, 2012 (CRA Act) to regulate the communications sector in Botswana.</p>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card" style={{ gridColumn: 'span 2' }}>
                        <img src="/assets/justice-hubane-OjmO-dNF0lQ-unsplash (1).jpg" alt="BOCRA Headquarters" style={{ height: '300px', objectFit: 'cover' }} />
                        <h3>Regulatory Scope</h3>
                        <p>This comprises Telecommunications, Internet, Information and Communications Technologies (ICTs), Radio communications, Broadcasting, Postal services, and related matters. We ensure compliance, quality of service, and fair competition.</p>
                    </div>
                </div>
            </section>

            {/* Vision, Mission, Values - styled without animations, shadows, or borders */}
            <section className="how-it-works" style={{ background: '#fdfdfd' }}>
                <div className="section-header">
                    <h2>Our Vision & Mission</h2>
                </div>

                <div className="steps-list" style={{ gridTemplateColumns: 'repeat(3, 1fr)', display: 'grid', gap: '2rem' }}>
                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ color: '#A31D1D', marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 80 80"><rect width="80" height="80" fill="none"/><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6" d="m24 72l26.692-11.941c4.732-2.117 5.09-8.698.617-11.317v0c-4.296-2.515-4.18-8.762.206-11.116L62 32"/><path fill="currentColor" fillRule="evenodd" d="M30.45 35.336a14.76 14.76 0 0 0-20.847 10.02l-.051.226a15.24 15.24 0 0 0 2.659 12.491l1.356 1.816q.936 1.25 2.065 2.328l8.035 7.668c.186.178.48.178.666 0l8.035-7.668a18.7 18.7 0 0 0 2.065-2.328l1.357-1.816a15.25 15.25 0 0 0 2.658-12.491l-.051-.227a14.76 14.76 0 0 0-7.947-10.02m-3.6 6.205a6.55 6.55 0 0 0-5.702 0A6.58 6.58 0 0 0 17.612 46a6.63 6.63 0 0 0 1.264 5.572A6.55 6.55 0 0 0 24 54.052a6.55 6.55 0 0 0 5.124-2.48a6.63 6.63 0 0 0 1.264-5.571a6.58 6.58 0 0 0-3.537-4.46" clipRule="evenodd"/><path fill="currentColor" d="m17.55 35.336l-.873-1.8zm12.9 0l.874-1.8zM9.603 45.356l1.951.44zm-.051.226l-1.95-.441zm2.659 12.491l1.601-1.197zm1.356 1.816l-1.601 1.197zm2.065 2.328l-1.381 1.447zm8.035 7.668l-1.381 1.447zm.666 0l1.381 1.447zm8.035-7.668l1.381 1.447zm2.065-2.328L32.83 58.69zm1.357-1.816l-1.602-1.197zm2.658-12.491l-1.95.441zm-.051-.227l1.95-.441zM21.149 41.54l-.872-1.8zm5.702 0l.872-1.8zM17.612 46l-1.95-.442zm1.264 5.572l1.567-1.243zm10.248 0l1.566 1.243zm1.264-5.571l-1.95.443zm-11.964-8.866a12.76 12.76 0 0 1 11.152 0l1.747-3.598a16.76 16.76 0 0 0-14.646 0zm-6.87 8.662a12.76 12.76 0 0 1 6.87-8.662l-1.747-3.598a16.76 16.76 0 0 0-9.024 11.377zm-.051.226l.051-.227l-3.901-.882l-.052.227zm2.31 10.853a13.24 13.24 0 0 1-2.31-10.853L7.6 45.14a17.24 17.24 0 0 0 3.008 14.13zm1.356 1.815l-1.357-1.815l-3.203 2.395l1.357 1.815zm1.843 2.079a16.7 16.7 0 0 1-1.843-2.079l-3.203 2.395a20.7 20.7 0 0 0 2.285 2.578zm8.035 7.668l-8.035-7.668l-2.761 2.894l8.035 7.668zm-2.094 0a1.517 1.517 0 0 1 2.094 0l-2.761 2.894c.96.915 2.469.915 3.428 0zm8.035-7.668l-8.035 7.668l2.761 2.894l8.035-7.668zm1.843-2.079a16.7 16.7 0 0 1-1.843 2.079l2.761 2.894a20.7 20.7 0 0 0 2.285-2.578zm1.357-1.815L32.83 58.69l3.203 2.395l1.358-1.815zm2.31-10.853a13.24 13.24 0 0 1-2.31 10.853l3.203 2.395A17.24 17.24 0 0 0 40.4 45.14zm-.052-.227l.051.227l3.902-.883l-.052-.226zm-6.87-8.661a12.76 12.76 0 0 1 6.87 8.662l3.901-.883a16.76 16.76 0 0 0-9.024-11.377zM22.02 43.34a4.55 4.55 0 0 1 3.96 0l1.742-3.6a8.55 8.55 0 0 0-7.445 0zm-2.457 3.104a4.58 4.58 0 0 1 2.457-3.104l-1.743-3.6a8.58 8.58 0 0 0-4.615 5.818zm.88 3.885a4.63 4.63 0 0 1-.88-3.885l-3.901-.886a8.63 8.63 0 0 0 1.648 7.258zM24 52.052a4.55 4.55 0 0 1-3.557-1.723l-3.133 2.486A8.55 8.55 0 0 0 24 56.053zm3.557-1.723A4.55 4.55 0 0 1 24 52.052v4c2.607 0 5.074-1.2 6.69-3.236zm.88-3.885a4.64 4.64 0 0 1-.88 3.885l3.133 2.486a8.63 8.63 0 0 0 1.648-7.257zM25.98 43.34c1.239.6 2.15 1.75 2.457 3.104l3.901-.886a8.58 8.58 0 0 0-4.616-5.818z"/><path fill="currentColor" fillRule="evenodd" d="M63.015 9.991a9.206 9.206 0 0 0-13.04 6.253l-.05.222a9.68 9.68 0 0 0 1.664 7.872l.805 1.088q.628.85 1.388 1.583l4.968 4.79a.3.3 0 0 0 .416 0l4.968-4.79a13 13 0 0 0 1.388-1.582l.806-1.09a9.68 9.68 0 0 0 1.664-7.871l-.05-.222a9.2 9.2 0 0 0-4.927-6.253m-2.263 3.912a4.083 4.083 0 0 0-5.777 2.772l-.017.074a4.14 4.14 0 0 0 .784 3.467l.026.033a4.056 4.056 0 0 0 6.38 0l.026-.033a4.14 4.14 0 0 0 .784-3.467l-.016-.074a4.08 4.08 0 0 0-2.19-2.772" clipRule="evenodd"/><path fill="currentColor" d="m54.901 9.991l-.881-1.795zm8.114 0l.881-1.795zm-13.04 6.253l1.95.437zm-.05.222l-1.952-.437zm1.664 7.872l-1.608 1.19zm.805 1.088l1.608-1.189zm1.388 1.583l1.388-1.44zm4.968 4.79l-1.389 1.44zm.416 0l1.389 1.44zm4.968-4.79l1.388 1.44zm1.388-1.582l1.608 1.189zm.806-1.09l-1.608-1.189zm1.664-7.871l1.951-.437zm-.05-.222l-1.952.437zm-10.777-2.341l.878 1.797zm3.587 0l.878-1.797zm-5.777 2.772l1.95.439zm-.017.074l-1.951-.439zm.784 3.467l1.573-1.236zm.026.033l-1.573 1.235zm6.38 0l-1.572-1.236zm.026-.033l1.573 1.235zm.784-3.467l1.951-.439zm-.016-.074l-1.952.439zm-7.16-4.888a7.2 7.2 0 0 1 6.352 0l1.762-3.591a11.2 11.2 0 0 0-9.876 0zm-3.856 4.894a7.2 7.2 0 0 1 3.857-4.894L54.02 8.196a11.2 11.2 0 0 0-5.998 7.611zm-.05.222l.05-.222l-3.904-.874l-.05.222zm1.32 6.245a7.68 7.68 0 0 1-1.32-6.245l-3.903-.874a11.68 11.68 0 0 0 2.008 9.498zm.806 1.09l-.806-1.09l-3.215 2.38l.805 1.088zm1.168 1.33a10.7 10.7 0 0 1-1.168-1.33l-3.216 2.378a14.7 14.7 0 0 0 1.608 1.832zm4.968 4.791l-4.968-4.79l-2.776 2.88l4.967 4.79zm-2.36 0a1.7 1.7 0 0 1 2.36 0l-2.776 2.88a2.3 2.3 0 0 0 3.193 0zm4.968-4.79l-4.968 4.79l2.777 2.88l4.967-4.79zm1.168-1.332q-.528.715-1.168 1.332l2.776 2.88a14.7 14.7 0 0 0 1.608-1.833zm.806-1.089l-.806 1.09l3.216 2.378l.806-1.089zm1.32-6.245a7.68 7.68 0 0 1-1.32 6.245l3.216 2.38a11.68 11.68 0 0 0 2.007-9.5zm-.05-.222l.05.222l3.903-.874l-.05-.222zm-3.856-4.894a7.2 7.2 0 0 1 3.856 4.894l3.904-.874a11.2 11.2 0 0 0-5.998-7.611zm-4.09 3.913a2.08 2.08 0 0 1 1.83 0l1.756-3.594a6.08 6.08 0 0 0-5.344 0zm-1.118 1.414a2.08 2.08 0 0 1 1.117-1.414l-1.757-3.594a6.08 6.08 0 0 0-3.263 4.13zm-.017.073l.017-.073l-3.903-.877l-.016.073zm.406 1.793a2.14 2.14 0 0 1-.405-1.793l-3.903-.877a6.14 6.14 0 0 0 1.162 5.141zm.026.033l-.026-.033l-3.146 2.471l.026.033zm1.617.787c-.631 0-1.227-.29-1.617-.787l-3.146 2.471a6.06 6.06 0 0 0 4.763 2.316zm1.618-.787c-.39.497-.987.787-1.618.787v4a6.06 6.06 0 0 0 4.763-2.316zm.025-.033l-.025.033l3.145 2.471l.026-.033zm.406-1.793a2.14 2.14 0 0 1-.406 1.793l3.146 2.471a6.14 6.14 0 0 0 1.162-5.141zm-.017-.073l.017.073l3.902-.877l-.016-.073zM59.873 15.7c.568.277.979.797 1.117 1.414l3.903-.877a6.08 6.08 0 0 0-3.263-4.13z"/></g></svg>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>Our Vision</h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>To be an independent, effective, and progressive regulator of the communications sector.</p>
                    </div>

                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ color: '#A31D1D', marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M4.75 3A2.75 2.75 0 0 0 2 5.75V11a5 5 0 0 1 8 6v1h9.25A2.75 2.75 0 0 0 22 15.25v-9.5A2.75 2.75 0 0 0 19.25 3zm2 4h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1 0-1.5M12 12.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75M6 10a4 4 0 1 0 0 8.001A4 4 0 0 0 6 10m3 8.001c-.835.628-1.874 1-3 1a4.98 4.98 0 0 1-3-.998v3.246c0 .57.605.92 1.09.669l.09-.055L6 20.592l1.82 1.272a.75.75 0 0 0 1.172-.51L9 21.249z"/></svg>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>Our Mission</h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>To regulate the communications sector effectively to ensure continuous development and reliable services for all.</p>
                    </div>

                    <div style={{ background: '#fff', padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ color: '#A31D1D', marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>Our Values</h3>
                        <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.6' }}>Integrity, Transparency, Accountability, Innovation, and Teamwork guide everything we do.</p>
                    </div>
                </div>
            </section>

            {/* Leadership Section - Interactive */}
            <section className="scenarios" style={{ background: '#fff', padding: '6rem 10%' }}>
                <div className="scenarios-content" style={{ flex: '1' }}>
                    <h2>BOCRA Leadership</h2>
                    <p style={{ marginBottom: '2.5rem' }}>Guiding the strategic and operational direction of the Authority.</p>
                    <div className="scenario-list">
                        <div 
                            className={`scenario-item ${activeLeadershipCategory === 'board' ? 'active' : ''}`}
                            onClick={() => setActiveLeadershipCategory('board')}
                            style={{ 
                                cursor: 'pointer', 
                                borderLeft: activeLeadershipCategory === 'board' ? '4px solid #A31D1D' : '4px solid transparent',
                                background: activeLeadershipCategory === 'board' ? '#FDF2F2' : 'transparent',
                                padding: '1.25rem',
                                borderRadius: '0 12px 12px 0'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: activeLeadershipCategory === 'board' ? '#fff' : '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D', fontWeight: 'bold' }}>
                                    BM
                                </span>
                                <span style={{ fontWeight: 700 }}>Board Members</span>
                            </span>
                            <span style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>Governance & Strategy</span>
                        </div>
                        <div 
                            className={`scenario-item ${activeLeadershipCategory === 'execs' ? 'active' : ''}`}
                            onClick={() => setActiveLeadershipCategory('execs')}
                            style={{ 
                                cursor: 'pointer', 
                                borderLeft: activeLeadershipCategory === 'execs' ? '4px solid #A31D1D' : '4px solid transparent',
                                background: activeLeadershipCategory === 'execs' ? '#FDF2F2' : 'transparent',
                                padding: '1.25rem',
                                borderRadius: '0 12px 12px 0'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: activeLeadershipCategory === 'execs' ? '#fff' : '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D', fontWeight: 'bold' }}>
                                    EX
                                </span>
                                <span style={{ fontWeight: 700 }}>Executive Management</span>
                            </span>
                            <span style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>Mandate Execution</span>
                        </div>
                        <div 
                            className={`scenario-item ${activeLeadershipCategory === 'ops' ? 'active' : ''}`}
                            onClick={() => setActiveLeadershipCategory('ops')}
                            style={{ 
                                cursor: 'pointer', 
                                borderLeft: activeLeadershipCategory === 'ops' ? '4px solid #A31D1D' : '4px solid transparent',
                                background: activeLeadershipCategory === 'ops' ? '#FDF2F2' : 'transparent',
                                padding: '1.25rem',
                                borderRadius: '0 12px 12px 0'
                            }}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: activeLeadershipCategory === 'ops' ? '#fff' : '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D', fontWeight: 'bold' }}>
                                    OD
                                </span>
                                <span style={{ fontWeight: 700 }}>Operational Departments</span>
                            </span>
                            <span style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>Compliance & Licensing</span>
                        </div>
                    </div>
                </div>
                
                {/* Leadership Right Side: Profile Grid */}
                <div className="scenarios-image" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '2rem', paddingLeft: '4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a1a', borderBottom: '2px solid #FDF2F2', paddingBottom: '1rem', width: 'fit-content' }}>
                        {leadershipData[activeLeadershipCategory].title}
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
                        {/* Top Person */}
                        <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                            <div style={{ 
                                width: '160px', 
                                height: '160px', 
                                borderRadius: '50%', 
                                background: '#F8F9FF', 
                                border: '4px solid #FDF2F2',
                                margin: '0 auto 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                fontSize: '2rem',
                                color: '#A31D1D',
                                fontWeight: 900,
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                            }}>
                                {(leadershipData[activeLeadershipCategory].members[0] as any).photo ? (
                                    <img src={(leadershipData[activeLeadershipCategory].members[0] as any).photo} alt={leadershipData[activeLeadershipCategory].members[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>
                                )}
                            </div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.25rem' }}>{leadershipData[activeLeadershipCategory].members[0].name}</h4>
                            <p style={{ color: '#A31D1D', fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase' }}>{leadershipData[activeLeadershipCategory].members[0].role}</p>
                            <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5' }}>{leadershipData[activeLeadershipCategory].members[0].desc}</p>
                        </div>
                        
                        {/* Bottom Two in Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '100%' }}>
                            {leadershipData[activeLeadershipCategory].members.slice(1).map((member, i) => (
                                <div key={i} style={{ textAlign: 'center' }}>
                                    <div style={{ 
                                        width: '120px', 
                                        height: '120px', 
                                        borderRadius: '50%', 
                                        background: '#F8F9FF', 
                                        border: '3px solid #FDF2F2',
                                        margin: '0 auto 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        fontSize: '1.5rem',
                                        color: '#A31D1D',
                                        fontWeight: 800,
                                        boxShadow: '0 8px 20px rgba(0,0,0,0.04)'
                                    }}>
                                        {(member as any).photo ? (
                                            <img src={(member as any).photo} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"/></svg>
                                        )}
                                    </div>
                                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.15rem' }}>{member.name}</h4>
                                    <p style={{ color: '#A31D1D', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.75rem', textTransform: 'uppercase' }}>{member.role}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.5' }}>{member.desc}</p>
                                </div>
                            ))}
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
        </div>
    );
};

export default AboutUs;

