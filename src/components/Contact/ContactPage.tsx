import React, { useState } from 'react';
import '../LandingPage/LegaeLandingPage.css';
import Navbar from '../Shared/Navbar';

interface ContactPageProps {
    onBackToLanding: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({
    onBackToLanding,
    onPortalLogin,
    onClientPortalLogin,
    onConsumerPortalLogin,
    onNavigate,
}) => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const contactItems = [
        {
            label: 'General Enquiries',
            value: 'info@bocra.org.bw',
            sub: 'For general questions and regulatory information.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .64L8.23 3H5v2L2.97 6.29C2.39 6.64 2 7.27 2 8v10a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V8c0-.73-.39-1.36-.97-1.71L19 5V3h-3.23M7 5h10v4.88L12 13L7 9.88M8 6v1.5h8V6M5 7.38v1.25L4 8m15-.62L20 8l-1 .63M8 8.5V10h8V8.5Z"/></svg>
            ),
        },
        {
            label: 'Support Desk',
            value: 'support@bocra.org.bw',
            sub: 'Technical support and consumer complaint escalation.',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><path fill="currentColor" fillRule="evenodd" d="M13 19.5a8 8 0 0 1 4.023-6.943Q17.002 11.238 17 9.5c0-2.551.044-4.405.09-5.645c.043-1.2.854-2.187 2.05-2.285c.51-.041 1.128-.07 1.86-.07s1.35.029 1.86.07c1.196.098 2.007 1.085 2.05 2.285c.046 1.24.09 3.094.09 5.645q-.001 1.738-.023 3.057A8 8 0 1 1 13 19.5m14.995-8.49Q28 10.3 28 9.5c0-2.585-.044-4.476-.091-5.755a5.6 5.6 0 0 0-.183-1.224c7.348 2.504 12.663 9.335 12.829 17.423l3.88 5.41c.693.967.62 2.38-.505 3.069c-.853.52-2.099 1.127-3.771 1.57l-.576 6.83a3.5 3.5 0 0 1-3.917 3.18l-2.52-.312v2.917c0 1.507-.981 2.87-2.519 3.155c-1.851.345-4.884.737-9.098.737s-7.246-.392-9.098-.737c-1.537-.286-2.52-1.648-2.52-3.155V35.25C5.407 31.808 2.5 26.407 2.5 20.333c0-7.824 4.82-14.53 11.677-17.375q-.07.39-.086.787C14.044 5.024 14 6.915 14 9.5q0 .8.005 1.51A10.98 10.98 0 0 0 10 19.5c0 5.866 4.592 10.66 10.377 10.983C23.645 33.517 28.4 35.5 33 35.5a1.5 1.5 0 0 0 0-3c-2.922 0-5.969-.983-8.462-2.581C28.878 28.446 32 24.337 32 19.5a10.98 10.98 0 0 0-4.005-8.49" clipRule="evenodd"/></svg>
            ),
        },
        {
            label: 'Phone',
            value: '+267 395 7755',
            sub: 'Mon – Fri, 07:30 – 17:00 CAT',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20"><path fill="currentColor" d="M17.256 12.253c-.096-.667-.611-1.187-1.274-1.342c-2.577-.604-3.223-2.088-3.332-3.734C12.193 7.092 11.38 7 10 7s-2.193.092-2.65.177c-.109 1.646-.755 3.13-3.332 3.734c-.663.156-1.178.675-1.274 1.342l-.497 3.442C2.072 16.907 2.962 18 4.2 18h11.6c1.237 0 2.128-1.093 1.953-2.305zM10 15.492c-1.395 0-2.526-1.12-2.526-2.5s1.131-2.5 2.526-2.5s2.526 1.12 2.526 2.5s-1.132 2.5-2.526 2.5M19.95 6c-.024-1.5-3.842-3.999-9.95-4C3.891 2.001.073 4.5.05 6s.021 3.452 2.535 3.127c2.941-.381 2.76-1.408 2.76-2.876C5.345 5.227 7.737 4.98 10 4.98s4.654.247 4.655 1.271c0 1.468-.181 2.495 2.76 2.876C19.928 9.452 19.973 7.5 19.95 6"/></svg>
            ),
        },
        {
            label: 'Headquarters',
            value: 'Plot 50671, Seg. 2',
            sub: 'Fairgrounds Office Park, Gaborone',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 100 100"><path fill="currentColor" d="M50.001 0C33.65 0 20.25 13.36 20.25 29.666c0 6.318 2.018 12.19 5.433 17.016L46.37 82.445c2.897 3.785 4.823 3.066 7.232-.2l22.818-38.83c.46-.834.822-1.722 1.137-2.629a29.3 29.3 0 0 0 2.192-11.12C79.75 13.36 66.354 0 50.001 0m0 13.9c8.806 0 15.808 6.986 15.808 15.766S58.807 45.43 50.001 45.43c-8.805 0-15.81-6.982-15.81-15.763S41.196 13.901 50 13.901"/><path fill="currentColor" d="m68.913 48.908l-.048.126l.042-.115zM34.006 69.057C19.88 71.053 10 75.828 10 82.857C10 92.325 26.508 100 50 100s40-7.675 40-17.143c0-7.029-9.879-11.804-24.004-13.8l-1.957 3.332C74.685 73.866 82 76.97 82 80.572c0 5.05-14.327 9.143-32 9.143s-32-4.093-32-9.143c-.001-3.59 7.266-6.691 17.945-8.174z" color="currentColor"/></svg>
            ),
        },
    ];

    return (
        <div className="legae-landing">
            <Navbar
                onNavigate={onNavigate}
                onPortalLogin={onPortalLogin}
                onClientPortalLogin={onClientPortalLogin}
                onConsumerPortalLogin={onConsumerPortalLogin}
                activePage="contact"
            />

            {/* Hero */}
            <header className="hero" id="contact-hero" style={{ minHeight: '42vh' }}>
                <div className="hero-slider-bg" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    backgroundImage: `url("/assets/justice-hubane-tyCcpbkgaR4-unsplash (2).jpg")`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div className="hero-overlay" />
                <div className="hero-container" style={{ alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <div className="hero-content-wrapper">
                        <h1>Contact Us</h1>
                        <p className="hero-subtitle">
                            <strong>We're here to help.</strong> Reach out to BOCRA for regulatory enquiries, licensing, consumer complaints, or technical guidance.
                        </p>
                    </div>
                </div>
            </header>

            {/* Contact Cards */}
            <section style={{ padding: '5rem 10%', background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Reach Out</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#111', marginTop: '0.5rem', marginBottom: '0.5rem' }}>Get in Touch With Us</h2>
                    <p style={{ color: '#666', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
                        Choose the best channel for your enquiry. Our team is available during business hours.
                    </p>
                </div>

                <div style={{ 
                    background: '#fafafa', 
                    border: '1px solid #f0f0f0', 
                    borderRadius: '24px', 
                    padding: '3rem', 
                    maxWidth: '1200px', 
                    margin: '0 auto', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)', 
                    gap: '2.5rem', 
                    alignItems: 'start' 
                }}>
                    {contactItems.map((item, i) => (
                        <div
                            key={i}
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', textAlign: 'center' }}
                        >
                            <div style={{ color: '#A31D1D', marginBottom: '0.5rem' }}>
                                {item.icon}
                            </div>
                            <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#333', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                            <div style={{ fontWeight: '700', color: '#111', fontSize: '1.05rem' }}>{item.value}</div>
                            <div style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.4' }}>{item.sub}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Map + Form Side by Side */}
            <section style={{ padding: '5rem 10%', background: '#f9f9f9' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '4rem', 
                    alignItems: 'stretch',
                    background: 'white',
                    borderRadius: '24px',
                    padding: '3.5rem',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
                    border: '1px solid #e8e8e8',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>

                    {/* Google Map */}
                    <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ background: '#1a1a1a', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="white" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5"/></svg>
                                <span style={{ color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>BOCRA HQ — Fairgrounds, Gaborone</span>
                            </div>
                            <a
                                href="https://maps.google.com/?q=BOCRA+Gaborone+Botswana"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', fontWeight: '600', textDecoration: 'none', background: 'rgba(255,255,255,0.15)', padding: '0.3rem 0.8rem', borderRadius: '20px', whiteSpace: 'nowrap' }}
                                onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                                onMouseOut={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                            >
                                Open Maps ↗
                            </a>
                        </div>
                        <iframe
                            title="BOCRA Headquarters"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3629.5512!2d25.9106!3d-24.6640!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfd0aa71f73ea5%3A0x99ecb7b8e3c6d5f0!2sBOCRA%20-%20Botswana%20Communications%20Regulatory%20Authority!5e0!3m2!1sen!2sbw!4v1711500000000!5m2!1sen!2sbw"
                            width="100%"
                            style={{ border: 'none', flex: 1, minHeight: '380px', display: 'block' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* Contact Form */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111', marginBottom: '0.4rem' }}>Send a Message</h3>
                        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                            Fill in the form below and our team will respond within 2 business days.
                        </p>

                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#fdf2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#A31D1D' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg>
                                </div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111', marginBottom: '0.5rem' }}>Message Received</h4>
                                <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: '1.6' }}>
                                    Thank you, <strong>{form.name}</strong>. We'll get back to you at <strong>{form.email}</strong> within 2 business days.
                                </p>
                                <button
                                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                                    style={{ marginTop: '1.5rem', background: '#A31D1D', color: 'white', border: 'none', borderRadius: '10px', padding: '0.65rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#555', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="e.g. Thabo Mokoena"
                                            className="signin-input"
                                            style={{ margin: 0, borderRadius: '10px', fontSize: '0.88rem', padding: '0.7rem 1rem' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#555', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="your@email.bw"
                                            className="signin-input"
                                            style={{ margin: 0, borderRadius: '10px', fontSize: '0.88rem', padding: '0.7rem 1rem' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#555', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject *</label>
                                    <select
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        required
                                        className="signin-input"
                                        style={{ margin: 0, borderRadius: '10px', fontSize: '0.88rem', padding: '0.7rem 1rem', background: 'white', cursor: 'pointer' }}
                                    >
                                        <option value="">Select a subject...</option>
                                        <option>Licensing Enquiry</option>
                                        <option>Consumer Complaint</option>
                                        <option>Type Approval</option>
                                        <option>Spectrum Management</option>
                                        <option>Technical Support</option>
                                        <option>General Enquiry</option>
                                        <option>Media / Press</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#555', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Message *</label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Describe your enquiry in detail..."
                                        className="signin-input"
                                        style={{ margin: 0, borderRadius: '10px', fontSize: '0.88rem', padding: '0.7rem 1rem', resize: 'vertical', fontFamily: 'inherit' }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="login-button"
                                    style={{ marginTop: '0.5rem', background: '#A31D1D', borderRadius: '10px', fontSize: '0.92rem' }}
                                >
                                    Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-grid">
                    <div className="footer-info">
                        <div className="footer-logo-large" style={{ textAlign: 'left', marginBottom: '1.5rem', display: 'block' }}>BOCRA</div>
                        <p style={{ color: '#666', maxWidth: '300px', marginBottom: '1.5rem' }}>
                            Botswana Communications Regulatory Authority. Promoting an inclusive and impactful communications sector.
                        </p>
                        <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Official Portal for Communications Regulation in Botswana.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#" onClick={e => { e.preventDefault(); onBackToLanding(); }}>Sectors</a></li>
                            <li><a href="#" onClick={e => { e.preventDefault(); onBackToLanding(); }}>Strategy</a></li>
                            <li><a href="#" onClick={e => { e.preventDefault(); onBackToLanding(); }}>Consumer Protection</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#" onClick={e => e.preventDefault()}>Type Approval</a></li>
                            <li><a href="#" onClick={e => e.preventDefault()}>CSIRT Monitor</a></li>
                            <li><a href="#" onClick={e => { e.preventDefault(); setShowPrivacy(true); }}>Terms &amp; Privacy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #FFE4E4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#666' }}>
                    <p>&copy; {new Date().getFullYear()} BOCRA. All rights reserved.</p>
                    <p>Regulating for the Future</p>
                </div>
            </footer>

            {showPrivacy && (
                <div className="popup-overlay privacy-modal-overlay" onClick={() => setShowPrivacy(false)}>
                    <div className="waitlist-popup privacy-popup" onClick={e => e.stopPropagation()}>
                        <button className="close-popup" onClick={() => setShowPrivacy(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                        </button>
                        <div className="privacy-content-wrapper" style={{ padding: '6rem 4rem 4rem' }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#1a1a1a' }}>BOCRA Terms of Service</h2>
                            <div className="privacy-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', color: '#666', lineHeight: '1.7', fontSize: '0.95rem' }}>
                                <div><h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>1. Regulatory Scope</h3><p>BOCRA regulates Telecommunications, Postal, and Broadcasting services in Botswana.</p></div>
                                <div><h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>2. Domain Registry</h3><p>As the ccTLD registry for .bw, BOCRA maintains the national domain space.</p></div>
                                <div><h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>3. Consumer Protection</h3><p>We ensure service providers adhere to quality standards and billing accuracy.</p></div>
                                <div><h3 style={{ color: '#1a1a1a', marginBottom: '1rem' }}>4. Data &amp; Use</h3><p>Data collected is used strictly for regulatory purposes and service improvements.</p></div>
                            </div>
                            <p style={{ marginTop: '3rem', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>Last updated: {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactPage;
