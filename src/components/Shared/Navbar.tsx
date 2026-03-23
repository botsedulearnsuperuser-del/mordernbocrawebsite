import React, { useState } from 'react';

export interface NavbarProps {
    onNavigate?: (page: string) => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    activePage?: 'landing' | 'about' | 'cybersecurity' | 'airegulation' | 'consumeraffairs' | 'regulatoryhub';
    onAboutUs?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onPortalLogin, onClientPortalLogin, onAboutUs, activePage = 'landing' }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                    <ul className="nav-links">
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

                        <li className="nav-item">
                            <span className="nav-link-trigger">Resources</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Information Bank</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Market Statistics</strong>
                                            <span>Broadband penetration and mobile money transaction data.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Consultations</strong>
                                            <span>Open papers for public comment on new regulations.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>News & Media</strong>
                                            <span>Official press releases, bulletins, and educational videos.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Annual Reports</strong>
                                            <span>Authority performance, financial, and strategic reviews.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => handleNavigation('landing')}>
                                            <strong>Statistics</strong>
                                            <span>User growth and communications market penetration.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                            <span className="nav-link-trigger">Portals</span>
                            <div className="mega-menu">
                                <div className="mega-menu-content">
                                    <div className="mega-menu-header">Self-Service Portals</div>
                                    <div className="mega-menu-grid">
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onClientPortalLogin) onClientPortalLogin(); }}>
                                            <strong>Clients Portal</strong>
                                            <span>Secure access for licensed operators and business partners.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onPortalLogin) onPortalLogin(); }}>
                                            <strong>Consumer Portal</strong>
                                            <span>Self-service area for citizen queries and device tracking.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onPortalLogin) onPortalLogin(); }}>
                                            <strong>Consumer Case Tracker</strong>
                                            <span>Follow-up on your formal dispute and complaint status.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onPortalLogin) onPortalLogin(); }}>
                                            <strong>.BW Registrar Portal</strong>
                                            <span>Domain management for accredited registrars.</span>
                                        </div>
                                        <div className="mega-menu-item" onClick={() => { setIsMobileMenuOpen(false); if(onPortalLogin) onPortalLogin(); }}>
                                            <strong>Type Approval Lab</strong>
                                            <span>Online application for technical equipment certification.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li style={{ marginLeft: '1.5rem' }}>
                            <button className="get-started-btn" style={{ padding: '0.7rem 1.8rem', whiteSpace: 'nowrap' }} onClick={() => { setIsMobileMenuOpen(false); if(onPortalLogin) onPortalLogin(); }}>Consumer Portal</button>
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
