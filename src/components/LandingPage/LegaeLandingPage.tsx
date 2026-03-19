import React, { useState } from 'react';
import './LegaeLandingPage.css';
import Dither from '../Dither/Dither';

interface LegaeLandingPageProps {
    onPortalLogin?: () => void;
}

const LegaeLandingPage: React.FC<LegaeLandingPageProps> = ({ onPortalLogin }) => {
    const logoImg = '/assets/bocralogo.png';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            {/* Navigation */}
            <nav className="navbar">
                <div className="logo">
                    <img 
                        src={brandLogo} 
                        alt="BOCRA Logo" 
                        style={{ 
                            height: '3rem', 
                            width: 'auto', 
                            objectFit: 'contain'
                        }} 
                    />
                </div>
                
                <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                    </button>
                    <ul className="nav-links">


                        <li className="nav-item">
                            <a href="#protection" className="nav-link-trigger">Consumer Protection</a>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Consumer Services</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item">
                                            <strong>File a Complaint</strong>
                                            <span>Digital form for billing, service, or network issues.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Verify My Device</strong>
                                            <span>Check if a phone/router is legally BOCRA-approved.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>License Checker</strong>
                                            <span>Public database to verify if a provider is licensed.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Network Status</strong>
                                            <span>Live maps showing 4G/5G coverage across Botswana.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Dispute Resolution</strong>
                                            <span>Mediation process between consumers and providers.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link-trigger">Regulatory Hub</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Governance & Rules</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item">
                                            <strong>Legislation</strong>
                                            <span>CRA Act 2012, Evidence Act, and Cybersecurity Act 2025.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Licensing</strong>
                                            <span>NFP (Facilities) and SAP (Services) requirements.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Type Approval</strong>
                                            <span>Technical requirements for importing communication devices.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>CSIRT</strong>
                                            <span>National Computer Security Incident Response Team advisories.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Technical Standards</strong>
                                            <span>Compliance with global ITU Region 1 standards.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link-trigger">Resources</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Information Bank</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item">
                                            <strong>Market Statistics</strong>
                                            <span>Broadband penetration and mobile money transaction data.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Consultations</strong>
                                            <span>Open papers for public comment on new regulations.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>News & Media</strong>
                                            <span>Official press releases, bulletins, and educational videos.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Annual Reports</strong>
                                            <span>Authority performance, financial, and strategic reviews.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Statistics</strong>
                                            <span>User growth and communications market penetration.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link-trigger">About BOCRA</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">The Authority</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item">
                                            <strong>Mission & Vision</strong>
                                            <span>BOCRA's strategic goals and core regulatory values.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>The Board</strong>
                                            <span>Authority governance and strategic oversight members.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Management Team</strong>
                                            <span>Executive leadership and operations management.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Careers</strong>
                                            <span>Opportunities to join the regulatory authority.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Tenders</strong>
                                            <span>Procurement and corporate partnership opportunities.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link-trigger">Portals</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Self-Service Portals</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item">
                                            <strong>Licensee Dashboard</strong>
                                            <span>Single Sign-On (SSO) for current service providers.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Consumer Case Tracker</strong>
                                            <span>Follow-up on your formal dispute and complaint status.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>.BW Registrar Portal</strong>
                                            <span>Domain management for accredited registrars.</span>
                                        </div>
                                        <div className="mega-menu-item">
                                            <strong>Type Approval Lab</strong>
                                            <span>Online application for technical equipment certification.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li style={{ marginLeft: '1.5rem' }}>
                            <button className="get-started-btn" style={{ padding: '0.7rem 1.8rem', whiteSpace: 'nowrap' }} onClick={() => { setIsMobileMenuOpen(false); onPortalLogin?.(); }}>Consumer Portal</button>
                        </li>
                    </ul>
                </div>

                <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"/></svg>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Hero Section */}
            <header className="hero" id="strategy">
                <div className="hero-dither-bg">
                    <Dither
                        waveColor={[0.5, 0.5, 0.5]}
                        disableAnimation={false}
                        enableMouseInteraction
                        mouseRadius={0.3}
                        colorNum={4}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.05}
                    />
                </div>
                <div className="hero-overlay"></div>
                <div className="hero-container">
                    <div className="hero-content-wrapper">
                        <h1>Regulating for a Digitally Enabled Economy</h1>
                        <p className="hero-subtitle">
                            <strong>Mission:</strong> To regulate and promote an inclusive and impactful communications sector through innovation, fair competition, and effective consumer protection.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button className="try-free-btn" onClick={onPortalLogin}>Report an Issue (Consumer Portal)</button>
                        </div>
                    </div>

                    <div className="hero-image-container">
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '650px', gap: '1.5rem', alignItems: 'flex-end' }}>
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
                            </div>

                            {/* Whistleblower Card */}
                            <div className="hero-login-card" style={{ maxWidth: '480px', border: '3px solid #168a42', padding: '2rem' }}>
                                <h2>Anonymous Whistleblower Report</h2>
                                <form className="hero-login-form" onSubmit={(e) => { e.preventDefault(); alert('Your anonymous report has been submitted to BOCRA.'); }} style={{ gap: '0.75rem' }}>
                                    <textarea 
                                        placeholder="Provide details about the issue or regulatory violation..." 
                                        required 
                                        style={{ 
                                            width: '100%', 
                                            padding: '0.8rem 1rem', 
                                            border: '1px solid #ddd', 
                                            borderRadius: '8px', 
                                            minHeight: '90px',
                                            fontSize: '0.95rem',
                                            resize: 'none',
                                            background: '#fff',
                                            color: '#222',
                                            fontFamily: 'inherit',
                                            transition: 'all 0.3s ease'
                                        }}
                                    />
                                    <div style={{ 
                                        display: 'flex', 
                                        gap: '10px', 
                                        fontSize: '0.8rem', 
                                        textAlign: 'left',
                                        marginTop: '4px'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <strong style={{ color: '#168a42' }}>✓ DO:</strong>
                                            <ul style={{ margin: '1px 0', paddingLeft: '11px', color: '#666', listStyleType: 'disc' }}>
                                                <li>Be specific/factual</li>
                                                <li>Mention provider</li>
                                            </ul>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <strong style={{ color: '#A80000' }}>✗ DON'T:</strong>
                                            <ul style={{ margin: '1px 0', paddingLeft: '11px', color: '#666', listStyleType: 'disc' }}>
                                                <li>Include IDs</li>
                                                <li>Share passwords</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <button type="submit" className="hero-login-btn" style={{ 
                                        padding: '0.85rem', 
                                        fontSize: '1rem', 
                                        fontWeight: '700', 
                                        letterSpacing: '0.5px',
                                        marginTop: '0.5rem',
                                        backgroundColor: '#A31D1D',
                                        width: '100%',
                                        borderRadius: '8px',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}>Submit Anonymous Report</button>
                                </form>
                                <div className="hero-login-footer" style={{ marginTop: '1.2rem', fontSize: '0.85rem', color: '#666' }}>
                                    Formal complaint? <button onClick={onPortalLogin} style={{ 
                                        color: '#A31D1D', 
                                        fontWeight: '700', 
                                        background: 'none', 
                                        border: 'none', 
                                        cursor: 'pointer', 
                                        textDecoration: 'underline',
                                        padding: 0
                                    }}>Sign In to Client Portal</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Pillars Section */}
            <section style={{ padding: '2rem 10%', background: '#fff' }}>
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
                <div className="section-header">
                    <h2>Consumer Rights & Protection</h2>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><defs><mask id="SVGjA1oAU1K"><g fill="none"><path fill="#fff" stroke="#fff" strokeWidth="4" d="M24 38c7.732 0 14-6.268 14-14s-6.268-14-14-14s-14 6.268-14 14s6.268 14 14 14Z"/><path stroke="#000" strokeLinecap="round" strokeWidth="4" d="M11 29c1.509.624 4 1 5.259-.468c1.258-1.469.136-3.78 1.53-4.564c1.528-.86 2.631 2.064 5.502 1.548S28 21 28 19s-1.715-2-1.838-3.946C26 12.5 28 11 28 11m0 26c-1.086-.909-2-1.5-2-3s1-1 2-2s.5-3 1.5-3.5s4.108.556 6.5 2.5"/><circle cx="24" cy="4" r="2" fill="#fff"/><circle cx="24" cy="44" r="2" fill="#fff"/><circle cx="44" cy="24" r="2" fill="#fff"/><circle cx="38" cy="10" r="2" fill="#fff"/><circle cx="10" cy="38" r="2" fill="#fff"/><circle cx="4" cy="24" r="2" fill="#fff"/><circle cx="10" cy="10" r="2" fill="#fff"/><circle cx="38" cy="38" r="2" fill="#fff"/><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M10 24c0 3.815 1.526 7.273 4 9.798M24 38c7.732 0 14-6.268 14-14M24 10c3.815 0 7.273 1.526 9.798 4"/></g></mask></defs><path fill="#A31D1D" d="M0 0h48v48H0z" mask="url(#SVGjA1oAU1K)"/></svg>
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
                <button className="try-free-btn" style={{ background: '#A31D1D', marginBottom: '2rem' }} onClick={onPortalLogin}>Login to Portal</button>
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
                            <li><a href="#">Type Approval</a></li>
                            <li><a href="#">CSIRT Monitor</a></li>
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
        </div>
    );
};

export default LegaeLandingPage;
