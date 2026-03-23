import React, { useState } from 'react';
import '../LandingPage/LegaeLandingPage.css';
import Navbar from '../Shared/Navbar';

export interface ConsumerAffairsProps {
    onBackToLanding?: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const ConsumerAffairs: React.FC<ConsumerAffairsProps> = ({ onPortalLogin, onClientPortalLogin, onBackToLanding, onNavigate }) => {
    const heroBgImage = '/assets/closeup-shot-of-smiling-friends-in-their-20s-relaxing-with-phones-on-a-bed-in-a-blue-vacation.png';



    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');


    const searchSuggestions = [
        { title: 'Consumer Rights', type: 'Guide', desc: 'Learn your rights when dealing with communications providers' },
        { title: 'File a Complaint', type: 'Service', desc: 'Step-by-step guide to escalating a dispute' },
        { title: 'Device Verification', type: 'Tool', desc: 'Check if your phone is type-approved for use in Botswana' },
        { title: 'Price Regulation', type: 'Regulation', desc: 'How BOCRA ensures fair pricing in the market' },
        { title: 'Network Quality', type: 'Metric', desc: 'Latest QoS reports from operators' },
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
            question: "Are child online safety measures in place?",
            answer: "Yes, BOCRA works with ISPs and education partners to promote safe internet usage for children through filtering and awareness campaigns."
        }
    ];

    return (
        <div className="legae-landing">
            <Navbar 
                onNavigate={onNavigate} 
                onPortalLogin={onPortalLogin} 
                onClientPortalLogin={onClientPortalLogin} 
                activePage="consumeraffairs" 
            />

            {/* Hero Section - Using standard UI */}
            <header className="hero">
                <div className="hero-slider-bg" style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    backgroundImage: `url("${heroBgImage}")`, backgroundSize: 'cover', backgroundPosition: 'center',
                }} />

                <div className="hero-overlay"></div>
                <div className="hero-container" style={{ alignItems: 'flex-start' }}>
                    <div className="hero-content-wrapper">
                        <h1>Consumer Affairs</h1>
                        <p className="hero-subtitle">
                            Protecting your rights and ensuring excellence in communications services across Botswana.
                        </p>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button className="try-free-btn" onClick={onPortalLogin}>File a Complaint</button>
                            <button className="watch-demo-btn" onClick={() => onNavigate?.('about')}>Consumer Charter</button>
                        </div>
                    </div>

                    <div className="hero-image-container">
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '650px', gap: '1.5rem', alignItems: 'flex-end' }}>
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
                                    width: '100%'
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style={{ color: '#A80000', marginRight: '15px' }}>
                                        <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16a6.47 6.47 0 0 0 4.5-1.5l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/>
                                    </svg>
                                    <input 
                                        type="text" 
                                        placeholder="Search consumer guides, redress, or verification..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '1.05rem', outline: 'none', color: '#222', fontWeight: '500' }}
                                    />
                                </div>
                                <div className="search-dropdown" style={{
                                    position: 'absolute', top: 'calc(100% + 10px)', left: 0, width: '100%', 
                                    background: 'rgba(255, 255, 255, 0.98)', borderRadius: '16px', 
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)', overflow: 'hidden', zIndex: 50
                                }}>
                                    {filteredSuggestions.length > 0 ? (
                                        <ul style={{ listStyle: 'none', padding: '0.5rem', margin: 0 }}>
                                            {filteredSuggestions.map((suggestion, idx) => (
                                                <li key={idx} style={{ 
                                                    padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'column'
                                                }}
                                                onMouseOver={(e) => e.currentTarget.style.background = '#FDF2F2'}
                                                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
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

            {/* Core Consumer Actions - Using Feature Grid UI */}
            <section className="features">
                <div className="section-header">
                    <div>
                        <h2>Primary Consumer Tools</h2>
                    </div>
                    <div>
                        <p>Essential services tailored to empower consumers in the Botswana digital marketplace.</p>
                    </div>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon-container" style={{ margin: '0 auto 1.5rem' }}>
                            <div className="feature-icon-box" style={{ width: '60px', height: '60px', background: '#FDF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-1 15.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            </div>
                        </div>
                        <h3>File a Complaint</h3>
                        <p>Formal mechanism for resolving billing, quality of service, and network disputes between consumers and service providers.</p>
                        <button className="modal-card-button" onClick={onPortalLogin} style={{ marginTop: '1.5rem', background: '#A31D1D', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>Access Portal</button>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-container" style={{ margin: '0 auto 1.5rem' }}>
                            <div className="feature-icon-box" style={{ width: '60px', height: '60px', background: '#FDF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                            </div>
                        </div>
                        <h3>Device Verification</h3>
                        <p>Ensure your communication equipment (phones, routers) is legally type-approved for safety and compatibility.</p>
                        <button className="modal-card-button" style={{ marginTop: '1.5rem', background: '#3F4E60', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>Verify Device</button>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon-container" style={{ margin: '0 auto 1.5rem' }}>
                            <div className="feature-icon-box" style={{ width: '60px', height: '60px', background: '#FDF2F2', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"/></svg>
                            </div>
                        </div>
                        <h3>License Checker</h3>
                        <p>Verify if your service provider is authorized by BOCRA to offer telecommunications or postal services.</p>
                        <button className="modal-card-button" style={{ marginTop: '1.5rem', background: '#3F4E60', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '50px', cursor: 'pointer', fontWeight: '700' }}>Check Database</button>
                    </div>
                </div>
            </section>

            {/* Redress Process - Using How It Works UI structure */}
            <section className="how-it-works" style={{ background: '#f8fafc' }}>
                <div className="section-header">
                    <h2>Escalation Protocol</h2>
                    <p>The standard procedure for resolving communication disputes in Botswana.</p>
                </div>

                <div className="steps-list">
                    <div className="steps-content">
                        <div className="step-item">
                            <div className="step-number">01</div>
                            <h3>Report to Provider</h3>
                            <p>Contact your service provider (BTC, Mascom, Orange, etc.) and obtain a reference number.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">02</div>
                            <h3>Await Resolution</h3>
                            <p>Give the provider 14 working days to resolve the matter technically or commercially.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">03</div>
                            <h3>Escalate to BOCRA</h3>
                            <p>If unresolved, submit your complaint to us with the reference number and evidence.</p>
                        </div>
                        <div className="step-item">
                            <div className="step-number">04</div>
                            <h3>BOCRA Adjudication</h3>
                            <p>We review the case and issue a final regulatory directive to both parties.</p>
                        </div>
                    </div>
                    <div className="steps-image">
                        <img 
                            src="/assets/undraw_two-factor-authentication_ofho (1).svg" 
                            alt="Protocol" 
                            style={{ width: '100%', maxWidth: '500px', height: 'auto' }} 
                        />
                    </div>
                </div>
            </section>

            {/* Rights & Monitoring - Using Scenarios UI structure */}
            <section className="scenarios">
                <div className="scenarios-content">
                    <h2>Monitoring & Equity</h2>
                    <p>How we ensure fair treatment and technical excellence for all citizens.</p>
                    <div className="scenario-list">
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.8 13q0-1.1.75-1.925T14.4 10q.95 0 1.625.663T16.75 12.3q-.125 1.55-1.125 2.6T13.2 16q-1.425.125-2.775-.525T8.3 13.525T7.1 10.3t.525-2.775t1.95-2.125t2.75-.75t2.75.75t2.125 1.95t.75 2.75t-.75 2.75t-1.95 2.125l.8 2.225q.075.25-.05.475T15.7 20q-.15 0-.288-.063T15.2 19.8l-.8-2.2z"/></svg>
                                </span>
                                Network Quality Monitoring
                            </span>
                            <p style={{ marginLeft: '54px', fontSize: '0.9rem', color: '#666' }}>Real-time nationwide testing of signal strength and data speeds.</p>
                        </div>
                        <div className="scenario-item">
                            <span style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ background: '#FDF2F2', padding: '10px', borderRadius: '8px', display: 'flex', color: '#A31D1D' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 14a4 4 0 1 1 4-4a4 4 0 0 1-4 4"/></svg>
                                </span>
                                Retail Price Regulation
                            </span>
                            <p style={{ marginLeft: '54px', fontSize: '0.9rem', color: '#666' }}>Reviewing tariffs to ensure communication services remain affordable.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq">
                <div className="faq-title">
                    <h2>Consumer FAQ</h2>
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
                            <li><a href="#">Type Approval</a></li>
                            <li><a href="#">CSIRT Monitor</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); }}>Terms & Privacy</a></li>

                        </ul>
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

export default ConsumerAffairs;
