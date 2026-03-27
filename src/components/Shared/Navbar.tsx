import React, { useState } from 'react';

export interface NavbarProps {
    onNavigate?: (page: string) => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    activePage?: 'landing' | 'about' | 'cybersecurity' | 'airegulation' | 'consumeraffairs' | 'regulatoryhub' | 'resources' | 'contact';
    onAboutUs?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onPortalLogin, onClientPortalLogin, onConsumerPortalLogin, onAboutUs, activePage = 'landing' }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResOpen, setIsResOpen] = useState<boolean>(false);
    const [resActiveL2, setResActiveL2] = useState<string | null>(null);
    const brandLogo = '/assets/bocralogo.png';

    const handleNavigation = (view: string) => {
        setIsMobileMenuOpen(false);
        if (onNavigate) {
            onNavigate(view);
        } else if (view === 'about' && onAboutUs) {
            onAboutUs();
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo" onClick={() => handleNavigation('landing')} style={{ cursor: 'pointer' }}>
                    <img 
                        src={brandLogo} 
                        alt="BOCRA Logo" 
                        style={{ height: '3rem', width: 'auto', objectFit: 'contain' }} 
                    />
                </div>
                
                <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <button className="close-menu-btn" onClick={() => setIsMobileMenuOpen(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                    </button>
                    <ul className="nav-links" style={{ marginLeft: '3.5rem' }}>
                        <li className="nav-item">
                            <span 
                                className={`nav-link-trigger no-caret ${activePage === 'landing' ? 'active-link' : ''}`}
                                onClick={() => handleNavigation('landing')}
                                style={{ 
                                    cursor: 'pointer',
                                    ...(activePage === 'landing' ? { fontWeight: '700', color: '#A31D1D' } : {})
                                }}
                            >
                                Home
                            </span>
                        </li>
                        <li className="nav-item">
                            <span 
                                className={`nav-link-trigger no-caret ${activePage === 'consumeraffairs' ? 'active-link' : ''}`}
                                onClick={() => handleNavigation('consumeraffairs')}
                                style={{ 
                                    cursor: 'pointer',
                                    ...(activePage === 'consumeraffairs' ? { fontWeight: '700', color: '#A31D1D' } : {})
                                }}
                            >
                                Consumer Affairs
                            </span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Consumer Services</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>File a Complaint</strong>
                                            <span>Digital form for billing, service, or network issues.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Verify My Device</strong>
                                            <span>Check if a phone/router is legally BOCRA-approved.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>License Checker</strong>
                                            <span>Public database to verify if a provider is licensed.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Network Status</strong>
                                            <span>Live maps showing 4G/5G coverage across Botswana.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Dispute Resolution</strong>
                                            <span>Mediation process between consumers and providers.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="nav-item">
                            <span 
                                className={`nav-link-trigger no-caret ${activePage === 'regulatoryhub' ? 'active-link' : ''}`}
                                onClick={() => handleNavigation('regulatoryhub')}
                                style={{ 
                                    cursor: 'pointer',
                                    ...(activePage === 'regulatoryhub' ? { fontWeight: '700', color: '#A31D1D' } : {})
                                }}
                            >
                                Regulatory Hub
                            </span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Governance & Rules</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Legislation</strong>
                                            <span>CRA Act 2012, Evidence Act, and Cybersecurity Act 2025.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Licensing</strong>
                                            <span>NFP (Facilities) and SAP (Services) requirements.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Type Approval</strong>
                                            <span>Technical requirements for importing communication devices.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>CSIRT</strong>
                                            <span>National Computer Security Incident Response Team advisories.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Technical Standards</strong>
                                            <span>Compliance with global ITU Region 1 standards.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        {/* ── Resources — 3-level dropdown (pure React state) ── */}
                        <li
                            className="nav-item"
                            style={{ position: 'relative' }}
                            onMouseEnter={() => setIsResOpen(true)}
                            onMouseLeave={() => { setIsResOpen(false); setResActiveL2(null); }}
                        >
                            <span
                                className={`nav-link-trigger ${activePage === 'resources' ? 'active-link' : ''}`}
                                onClick={() => handleNavigation('resources')}
                                style={{ cursor: 'pointer', ...(activePage === 'resources' ? { fontWeight: '700', color: '#A31D1D' } : {}) }}
                            >
                                Resources
                            </span>

                            {/* L2 Panel */}
                            {isResOpen && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 8px)',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        zIndex: 9999,
                                        width: '260px',
                                        background: 'rgba(255,255,255,0.99)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '16px',
                                        boxShadow: '0 20px 50px rgba(0,0,0,0.14)',
                                        border: '1px solid rgba(0,0,0,0.07)',
                                        padding: '0.85rem',
                                        cursor: 'default',
                                    }}
                                >
                                    <div style={{
                                        color: '#A31D1D', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                                        padding: '0.3rem 0.5rem 0.55rem', borderBottom: '1px solid rgba(163,29,29,0.12)', marginBottom: '4px'
                                    }}>All Resources</div>
                                    {[
                                        {
                                            key: 'annual',
                                            label: 'Annual Reports',
                                            desc: 'Yearly performance and regulatory stats',
                                            subs: [
                                                { label: '2023 Annual Report', desc: 'Full financial & activity review' },
                                                { label: '2022 Annual Report', desc: 'Previous year overview' },
                                                { label: 'Archive Reports', desc: 'Reports from 2015 onwards' },
                                            ],
                                        },
                                        {
                                            key: 'stats',
                                            label: 'Statistics',
                                            desc: 'Sector data, subscriptions & coverage',
                                            subs: [
                                                { label: 'Mobile Subscriptions', desc: 'National telecom subscriber data' },
                                                { label: 'Internet Penetration', desc: 'Broadband & mobile internet stats' },
                                                { label: 'Spectrum Allocations', desc: 'Frequency band usage data' },
                                            ],
                                        },
                                        {
                                            key: 'news',
                                            label: 'News & Media',
                                            desc: 'Press releases and media centre',
                                            subs: [
                                                { label: 'Press Releases', desc: 'Official BOCRA announcements' },
                                                { label: 'Media Gallery', desc: 'Photos and event coverage' },
                                                { label: 'Speeches', desc: 'CEO and board statements' },
                                            ],
                                        },
                                        {
                                            key: 'consult',
                                            label: 'Consultations',
                                            desc: 'Public & industry consultation papers',
                                            subs: [
                                                { label: 'Open Consultations', desc: 'Active calls for submissions' },
                                                { label: 'Closed Consultations', desc: 'Past consultation outcomes' },
                                                { label: 'Position Papers', desc: 'BOCRA regulatory positions' },
                                            ],
                                        },
                                        {
                                            key: 'csirt',
                                            label: 'Technical & CSIRT',
                                            desc: 'Cybersecurity advisories and standards',
                                            subs: [
                                                { label: 'CSIRT Alerts', desc: 'National cyber threat advisories' },
                                                { label: 'Technical Standards', desc: 'ITU & regional compliance docs' },
                                                { label: 'Type Approval Guides', desc: 'Equipment certification guides' },
                                            ],
                                        },
                                        {
                                            key: 'blog',
                                            label: 'Blog',
                                            desc: 'Regulatory insights and thought leadership',
                                            subs: [
                                                { label: 'Regulatory Insights', desc: 'Expert commentary and analysis' },
                                                { label: 'Digital Economy', desc: 'Botswana digital transformation' },
                                                { label: 'Consumer Tips', desc: 'Guidance for everyday users' },
                                            ],
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.key}
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                padding: '0.6rem 0.75rem',
                                                borderRadius: '10px',
                                                cursor: 'pointer',
                                                background: resActiveL2 === item.key ? '#FDF2F2' : 'transparent',
                                                transition: 'background 0.15s',
                                            }}
                                            onMouseEnter={() => setResActiveL2(item.key)}
                                            onClick={() => handleNavigation('resources')}
                                        >
                                            <div style={{ fontSize: '0.83rem', fontWeight: 700, color: '#1A1A1A', paddingRight: '1.2rem' }}>{item.label}</div>
                                            <div style={{ fontSize: '0.71rem', color: '#6B7280', margin: '2px 0 0', lineHeight: 1.35 }}>{item.desc}</div>
                                            <span style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: '#A31D1D', fontWeight: 700, fontSize: '1rem', opacity: resActiveL2 === item.key ? 1 : 0.3 }}>›</span>

                                            {/* L3 Panel */}
                                            {resActiveL2 === item.key && (
                                                <div
                                                    style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 'calc(100% + 5px)',
                                                        width: '240px',
                                                        zIndex: 10000,
                                                        background: 'rgba(255,255,255,0.99)',
                                                        backdropFilter: 'blur(20px)',
                                                        borderRadius: '16px',
                                                        boxShadow: '0 20px 50px rgba(0,0,0,0.14)',
                                                        border: '1px solid rgba(0,0,0,0.07)',
                                                        padding: '0.85rem',
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <div style={{
                                                        color: '#A31D1D', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px',
                                                        padding: '0.3rem 0.5rem 0.55rem', borderBottom: '1px solid rgba(163,29,29,0.12)', marginBottom: '4px'
                                                    }}>{item.label}</div>
                                                    {item.subs.map((sub, si) => (
                                                        <div
                                                            key={si}
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                padding: '0.55rem 0.7rem',
                                                                borderRadius: '10px',
                                                                cursor: 'pointer',
                                                            }}
                                                            onMouseEnter={(e) => (e.currentTarget.style.background = '#FDF2F2')}
                                                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                                            onClick={(e) => { e.stopPropagation(); handleNavigation('resources'); }}
                                                        >
                                                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1A1A1A' }}>{sub.label}</div>
                                                            <div style={{ fontSize: '0.7rem', color: '#6B7280', margin: '2px 0 0', lineHeight: 1.35 }}>{sub.desc}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>



                        <li className="nav-item">
                            <span
                                onClick={() => handleNavigation('about')}
                                className={`nav-link-trigger no-caret ${activePage === 'about' ? 'active-link' : ''}`}
                                style={{
                                    cursor: 'pointer',
                                    ...(activePage === 'about' ? { fontWeight: '700', color: '#A31D1D' } : {})
                                }}
                            >
                                About BOCRA
                            </span>
                        </li>

                        <li className="nav-item">
                            <span
                                className={`nav-link-trigger no-caret ${activePage === 'contact' ? 'active-link' : ''}`}
                                onClick={() => handleNavigation('contact')}
                                style={{
                                    cursor: 'pointer',
                                    ...(activePage === 'contact' ? { fontWeight: '700', color: '#A31D1D' } : {})
                                }}
                            >
                                Contact
                            </span>
                        </li>

                        <li className="nav-item">
                            <span className="nav-link-trigger">Portals</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Self Service Portals</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onClientPortalLogin) onClientPortalLogin(); }}>
                                            <strong>Clients Portal</strong>
                                            <span>Secure access for licensed operators and business partners.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onConsumerPortalLogin) onConsumerPortalLogin(); }}>
                                            <strong>Consumer Portal</strong>
                                            <span>Self service area for citizen queries and device tracking.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onConsumerPortalLogin) onConsumerPortalLogin(); }}>
                                            <strong>Consumer Case Tracker</strong>
                                            <span>Follow-up on your formal dispute and complaint status.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onPortalLogin) onPortalLogin(); }}>
                                            <strong>Admin Portal</strong>
                                            <span>Internal gateway for BOCRA administrative management.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onConsumerPortalLogin) onConsumerPortalLogin(); }}>
                                            <strong>Type Approval Lab</strong>
                                            <span>Online application for technical equipment certification.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li style={{ marginLeft: '1.5rem' }}>
                            <button className="get-started-btn" style={{ padding: '0.7rem 1.8rem', whiteSpace: 'nowrap' }} onClick={() => { setIsMobileMenuOpen(false); if(onConsumerPortalLogin) onConsumerPortalLogin(); }}>Consumer Portal</button>
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
        </>
    );
};

export default Navbar;
