import React, { useState } from 'react';
import '../LandingPage/LegaeLandingPage.css';
import Navbar from '../Shared/Navbar';

export interface RegulatoryHubProps {
    onBackToLanding?: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const RegulatoryHub: React.FC<RegulatoryHubProps> = ({ onPortalLogin, onClientPortalLogin, onConsumerPortalLogin, onNavigate }) => {
    const heroBgImage = '/assets/nasa-Q1p7bh3SHj8-unsplash.jpg';



    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };


    const searchSuggestions = [
        { title: 'CRA Act 2012', type: 'Legislation', desc: 'The base framework for communication regulation' },
        { title: 'Apply for License', type: 'Portal', desc: 'Submit applications for NFP or SAP licenses' },
        { title: 'Spectrum Map', type: 'Tool', desc: 'View Botswana frequency allocation mapping' },
        { title: 'CSIRT Threat Monitor', type: 'Intelligence', desc: 'Live monitoring of national cyber incidents' },
    ];

    const filteredSuggestions = searchQuery 
        ? searchSuggestions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.type.toLowerCase().includes(searchQuery.toLowerCase()))
        : searchSuggestions.slice(0, 3);

    const faqData = [
        {
            question: "What is the NFP license?",
            answer: "A Network Facilities Provider (NFP) license authorizes the construction and operation of communication infrastructure like towers, cables, and satellites."
        },
        {
            question: "How is Spectrum allocated?",
            answer: "BOCRA allocates radio frequency spectrum through auctions, first-come-first-serve, or reservation based on its usage efficiency and social benefit."
        },
        {
            question: "Is cybersecurity a regulatory mandate?",
            answer: "Yes, under the CRA Act and recent cybersecurity directives, BOCRA manages the national CSIRT to protect national digital infrastructure."
        }
    ];

    return (
        <div className="legae-landing">
            <Navbar 
                onNavigate={onNavigate} 
                onPortalLogin={onPortalLogin} 
                onClientPortalLogin={onClientPortalLogin} 
                onConsumerPortalLogin={onConsumerPortalLogin}
                activePage="regulatoryhub" 
            />

            {/* Hero Section */}
            <header className="hero">
                <div className="hero-slider-bg" style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    backgroundImage: `url("${heroBgImage}")`, backgroundSize: 'cover', backgroundPosition: 'center',
                }} />

                <div className="hero-overlay" style={{ background: 'rgba(5, 10, 20, 0.75)' }}></div>
                <div className="hero-container" style={{ alignItems: 'flex-start' }}>
                    <div className="hero-content-wrapper">
                        <h1>BOCRA Regulatory Hub</h1>
                        <p className="hero-subtitle">
                            Empowering the communications sector through robust legislative oversight and world class standards.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button className="try-free-btn" onClick={onClientPortalLogin}>Licensee Portal</button>
                            <button className="watch-demo-btn">Download Regulations</button>
                        </div>

                    </div>

                    <div className="hero-image-container">
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '650px', gap: '1.5rem', alignItems: 'flex-end' }}>
                            <div className="hero-search-wrapper" style={{ width: '100%', position: 'relative' }}>
                                <div className="hero-search-bar" style={{ 
                                    display: 'flex', alignItems: 'center', background: 'rgba(255, 255, 255, 0.98)', 
                                    backdropFilter: 'blur(10px)', padding: '1rem 1.75rem', borderRadius: '50px', 
                                    border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', width: '100%'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ color: '#A80000', marginRight: '15px' }}>
                                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.5-1.5l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                                    </svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search legislation, licensing, or spectrum..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '1.05rem', outline: 'none', color: '#222', fontWeight: '500' }}
                                    />
                                </div>
                                <div className="search-dropdown" style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', 
                                    background: 'rgba(255, 255, 255, 0.98)', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 50
                                }}>
                                    {filteredSuggestions.length > 0 ? (
                                        <ul style={{ listStyle: 'none', padding: '0.5rem', margin: 0 }}>
                                            {filteredSuggestions.map((suggestion, idx) => (
                                                <li key={idx} 
                                                    style={{ padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                                                    onMouseOver={(e) => e.currentTarget.style.background = '#FDF2F2'}
                                                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                                                    onClick={() => scrollToSection(suggestion.title.toLowerCase().replace(/\s+/g, '-'))}
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
                                        <div style={{ padding: '1.5rem', textAlign: 'center', color: '#888', fontSize: '0.95rem' }}>No results found</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Quick Access Highlights */}
            <section style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '2.5rem 10%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {searchSuggestions.slice(0, 3).map((item, i) => (
                        <div 
                            key={i} 
                            onClick={() => scrollToSection(item.title.toLowerCase().replace(/\s+/g, '-'))}
                            style={{ 
                                padding: '1.5rem', 
                                borderLeft: '4px solid #A31D1D', 
                                background: '#fcfcfc',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#FDF2F2'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#fcfcfc'}
                        >
                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#A31D1D', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.type}</span>
                            <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem', color: '#1a1a1a' }}>{item.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#666', margin: 0 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Core Functions - Feature Grid UI */}
            <section className="features">
                <div className="section-header">
                    <div>
                        <h2>Regulatory Pillars</h2>
                    </div>
                    <div>
                        <p>The core legislative and operational pillars that define BOCRA's regulatory mandate.</p>
                    </div>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-container" style={{ margin: '0 auto 1.5rem' }}>
                            <div className="feature-icon-box" style={{ width: '60px', height: '60px', background: '#FDF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 8h2v2h-2zm0 4h2v2h-2zm0-8h2v2h-2zm0 12h2v2h-2zm0-4h2v2h-2z" /></svg>
                            </div>
                        </div>
                        <h3 id="cra-act-2012">Legislation</h3>
                        <p>CRA Act 2012, Evidence Act, and Cybersecurity directives – everything you need to know about the laws we enforce.</p>
                        <button className="modal-card-button" style={{ marginTop: '1.5rem', background: '#3F4E60', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>View Library</button>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-container" style={{ margin: '0 auto 1.5rem' }}>
                            <div className="feature-icon-box" style={{ width: '60px', height: '60px', background: '#FDF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2"/></svg>
                            </div>
                        </div>
                        <h3 id="apply-for-license">Licensing Hub</h3>
                        <p>Apply for and manage Facilities (NFP) and Services (SAP) licenses. Compliance monitoring and reporting tools for operators.</p>
                        <button className="modal-card-button" onClick={onClientPortalLogin} style={{ marginTop: '1.5rem', background: '#A31D1D', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>License Portal</button>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-container" style={{ margin: '0 auto 1.5rem' }}>
                            <div className="feature-icon-box" style={{ width: '60px', height: '60px', background: '#FDF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M12 22s8-4 8-10V5l-8-3l-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                        </div>
                        <h3>Security & CSIRT</h3>
                        <p>Botswana Computer Incident Response Team (BW-CSIRT) leads national defense against cyber threats and unauthorized traffic.</p>
                        <button className="modal-card-button" style={{ marginTop: '1.5rem', background: '#3F4E60', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>Go to CSIRT</button>
                    </div>
                </div>
            </section>

            {/* Licensing Process - Steps UI */}
            <section className="how-it-works" style={{ background: '#f8fafc' }}>
                <div className="section-header">
                    <h2>License Application Process</h2>
                    <p>How to become a licensed communication service provider in Botswana.</p>
                </div>
                <div className="steps-list">
                    <div className="steps-content">
                        <div className="step-item">
                            <div className="step-number">01</div>
                            <h3>Technical Proposal</h3>
                            <p>Submit a comprehensive plan outlining your infrastructure or service delivery model.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">02</div>
                            <h3>Feasibility Review</h3>
                            <p>BOCRA experts evaluate the social and economic impact on existing market structures.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">03</div>
                            <h3>Gazetting</h3>
                            <p>Applications for major facilities licenses are published for 21 days for stakeholder input.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">04</div>
                            <h3>Final Issuance</h3>
                            <p>Upon approval, the signed license and spectrum certificates are formally issued.</p>
                        </div>
                    </div>
                    <div className="steps-image">
                        <img 
                            src="/assets/justice-hubane-OjmO-dNF0lQ-unsplash (1).jpg" 
                            alt="Legislation" 
                            style={{ width: '100%', maxWidth: '500px', height: '350px', borderRadius: '24px', objectFit: 'cover', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
                        />
                    </div>
                </div>
            </section>

            {/* Spectrum & Technical - Scenarios UI */}
            <section className="scenarios">
                <div className="scenarios-content">
                    <h2>Technical Stewardship</h2>
                    <p>Optimizing national resources for the future of 5G and satellite communications.</p>
                    <div className="scenario-list">
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/></svg>
                                </span>
                                Frequency Management
                            </span>
                            <p id="spectrum-map" style={{ marginLeft: '54px', fontSize: '0.9rem', color: '#666' }}>Managing the allocation of Botswana's radio frequency spectrum.</p>
                        </div>
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-10 10c0 5.52 4.48 10 10 10s10-4.48 10-10a10 10 0 0 0-10-10m1 14.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0"/></svg>
                                </span>
                                Type Approval Standards
                            </span>
                            <p style={{ marginLeft: '54px', fontSize: '0.9rem', color: '#666' }}>Aligning national equipment standards with ITU global guidelines.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq">
                <div className="faq-title">
                    <h2>Regulatory FAQ</h2>
                </div>
                <div className="faq-list">
                    {faqData.map((faq, index) => (
                        <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`} onClick={() => setActiveFaq(activeFaq === index ? null : index)}>

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

            <footer className="footer">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="footer-logo-large" style={{ textAlign: 'left', marginBottom: '1.5rem', display: 'block' }}>BOCRA</div>
                        <p style={{ color: '#666', maxWidth: '300px' }}>Botswana Communications Regulatory Authority. Promoting an inclusive and impactful communications sector.</p>
                    </div>
                </div>
                <div className="footer-bottom" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #FFE4E4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#666' }}>
                    <p>&copy; {new Date().getFullYear()} BOCRA. All rights reserved.</p>
                    <p>Regulating for the Future</p>
                </div>
            </footer>
        </div>
    );
};

export default RegulatoryHub;
