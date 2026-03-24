import React, { useState } from 'react';
import '../LandingPage/LegaeLandingPage.css';
import Navbar from '../Shared/Navbar';

export interface ResourcesProps {
    onBackToLanding?: () => void;
    onPortalLogin?: () => void;
    onClientPortalLogin?: () => void;
    onConsumerPortalLogin?: () => void;
    onNavigate?: (page: string) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onBackToLanding, onPortalLogin, onClientPortalLogin, onConsumerPortalLogin, onNavigate }) => {
    const heroBgImage = '/assets/matt-artz-DAWOv3XpPWY-unsplash.jpg';
    const [activeCategory, setActiveCategory] = useState<'all' | 'reports' | 'stats' | 'media' | 'consultations' | 'technical' | 'blog'>('all');
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [dateFilter, setDateFilter] = useState<string>('all');
    const [showFullArticle, setShowFullArticle] = useState(false);
    const [showPhotoGallery, setShowPhotoGallery] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<string>('/assets/11025564-hd_4096_2160_25fps.mp4');
    const [selectedGalleryImg, setSelectedGalleryImg] = useState<string>('/assets/image (19).png');
    const [selectedBlogIndex, setSelectedBlogIndex] = useState(0);

    const galleryVideos = [
        { src: '/assets/11025564-hd_4096_2160_25fps.mp4',      label: 'Cyber Awareness Kick-off' },
        { src: '/assets/11921987_2160_3840_30fps.mp4',          label: 'School Outreach Highlights' },
        { src: '/assets/12816214_1920_1080_30fps.mp4',          label: 'Computer Donation Drive' },
        { src: '/assets/13506092_1920_1080_30fps.mp4',          label: 'Connectivity Roll-out' },
        { src: '/assets/15402275_1920_1080_30fps.mp4',          label: 'Digital Literacy Training' },
        { src: '/assets/17599620-uhd_3840_2160_30fps.mp4',      label: 'BOCRA Tech Summit' },
        { src: '/assets/19808379-hd_1920_1080_30fps (1).mp4',   label: 'Minister Address' },
        { src: '/assets/19808379-hd_1920_1080_30fps.mp4',       label: 'Ceremony – Day 1' },
        { src: '/assets/uhd_30fps (1).mp4',                     label: 'Infrastructure Overview' },
        { src: '/assets/uhd_30fps.mp4',                         label: 'Rural School Visit' },
        { src: '/assets/3129540-uhd_3840_2160_30fps (1).mp4',   label: 'Wi-Fi Installation' },
        { src: '/assets/3129540-uhd_3840_2160_30fps.mp4',       label: 'Network Setup B-Roll' },
        { src: '/assets/3129671-uhd_2560_1440_30fps.mp4',       label: 'Student Testimonials' },
        { src: '/assets/3129671-uhd_3840_2160_30fps (1).mp4',   label: 'Award Ceremony' },
        { src: '/assets/3129671-uhd_3840_2160_30fps.mp4',       label: 'Closing Remarks' },
        { src: '/assets/3141208-uhd_3840_2160_25fps.mp4',       label: 'Press Conference' },
        { src: '/assets/4359114-uhd_2160_3840_25fps.mp4',       label: 'Campaign Recap' },
        { src: '/assets/8720752-uhd_4096_2160_25fps.mp4',       label: 'Full Documentary' },
    ];

    const resources = [
        {
            category: 'reports',
            title: 'Annual Reports',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1.17 10L12 12l-.59-.59L12 10l3.17 2zM13 9V3.5L18.5 9z"/></svg>
            ),
            desc: 'Authority performance, financial, and strategic reviews published annually.',
            items: [
                { label: 'Annual Report 2023/24', tag: 'PDF', url: '#' },
                { label: 'Annual Report 2022/23', tag: 'PDF', url: '#' },
                { label: 'Annual Report 2021/22', tag: 'PDF', url: '#' },
                { label: 'Strategic Plan 2024–2029', tag: 'PDF', url: '#' },
            ],
        },
        {
            category: 'stats',
            title: 'Market Statistics',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5"/></svg>
            ),
            desc: 'Broadband penetration, telecoms market data, and mobile money transaction statistics.',
            items: [
                { label: 'Telecoms Market Report Q3 2024', tag: 'XLS', url: '#' },
                { label: 'Broadband Penetration Data 2024', tag: 'PDF', url: '#' },
                { label: 'Mobile Money Statistics 2024', tag: 'PDF', url: '#' },
                { label: 'Internet Usage Trends Botswana', tag: 'PDF', url: '#' },
            ],
        },
        {
            category: 'media',
            title: 'News & Media',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2m0 5h-2V5h2zM4 19h16v2H4z"/></svg>
            ),
            desc: 'Official press releases, bulletins, and educational videos from BOCRA.',
            items: [
                { label: 'Press Release: 5G Spectrum Auction', tag: 'HTML', url: '#' },
                { label: 'BOCRA Bulletin – March 2025', tag: 'PDF', url: '#' },
                { label: 'Cyber Awareness Campaign Video', tag: 'MP4', url: '#' },
                { label: 'BOCRA Radio Segment Archive', tag: 'MP3', url: '#' },
            ],
        },
        {
            category: 'consultations',
            title: 'Public Consultations',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2"/></svg>
            ),
            desc: 'Open papers inviting stakeholder and public comment on proposed regulations.',
            items: [
                { label: '5G Spectrum Policy – Open for Comment', tag: 'OPEN', url: '#' },
                { label: 'Draft Consumer QoS Framework 2025', tag: 'OPEN', url: '#' },
                { label: 'Tariff Regulation Review (Closed)', tag: 'CLOSED', url: '#' },
                { label: 'Digital Signature Amendment (Closed)', tag: 'CLOSED', url: '#' },
            ],
        },
        {
            category: 'technical',
            title: 'Type Approval & CSIRT',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zM10 17l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z"/></svg>
            ),
            desc: 'Equipment certification guidelines and national cybersecurity threat advisories.',
            items: [
                { label: 'Type Approval Application Form', tag: 'PDF', url: '#' },
                { label: 'Approved Devices List 2025', tag: 'XLS', url: '#' },
                { label: 'CSIRT Threat Advisory – March 2025', tag: 'PDF', url: '#' },
                { label: 'Cybersecurity Standards Framework', tag: 'PDF', url: '#' },
            ],
        },
        {
            category: 'technical',
            title: 'Statistics Dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M5 9.2h3V19H5zm5.6-4.2h2.8v14h-2.8zm5.6 8h2.8v6h-2.8z"/></svg>
            ),
            desc: 'User growth, penetration rates, and communications market performance data.',
            items: [
                { label: 'Subscriber Statistics 2024', tag: 'PDF', url: '#' },
                { label: 'Revenue & Investment Report 2023', tag: 'PDF', url: '#' },
                { label: 'ISP Market Share Data Q4 2024', tag: 'XLS', url: '#' },
                { label: 'Spectrum Utilization Report', tag: 'PDF', url: '#' },
            ],
        },
        {
            category: 'blog',
            title: 'Insights & Blog',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#A31D1D" d="M3 13h2v-2H3v2m0 4h2v-2H3v2m0-8h2V7H3v2m4 4h14v-2H7v2m0 4h14v-2H7v2M7 7v2h14V7H7z"/></svg>
            ),
            desc: 'Expert opinions, tech trends, and in-depth regulatory analysis from BOCRA.',
            items: [
                { 
                    label: 'The Future of AI in Botswana', 
                    tag: 'READ', 
                    url: '#',
                    desc: 'Exploring how artificial intelligence can fuel economic diversification and innovation in Botswana\'s tech landscape.',
                    img: '/assets/matt-artz-DAWOv3XpPWY-unsplash.jpg'
                },
                { 
                    label: 'Navigating Spectrum Allocation 2025', 
                    tag: 'READ', 
                    url: '#',
                    desc: 'A comprehensive study on the upcoming high-frequency bands and their impact on mobile network operators.',
                    img: '/assets/hao-wang-pVq6YhmDPtk-unsplash.jpg'
                },
                { 
                    label: 'Bridging the Rural Digital Divide', 
                    tag: 'VIDEO', 
                    url: '#',
                    desc: 'Case studies from our latest infrastructure projects in remote regions, bringing connectivity to every corner.',
                    img: '/assets/image (31).png'
                },
                { 
                    label: 'Cybersecurity Policies for SMEs', 
                    tag: 'READ', 
                    url: '#',
                    desc: 'Practical guidelines and resilience frameworks for small businesses in an increasingly digital marketplace.',
                    img: '/assets/image (26).png'
                },
            ],
        },
    ];

    const tagColor: Record<string, { bg: string; color: string }> = {
        PDF:    { bg: '#FDF2F2', color: '#A31D1D' },
        XLS:    { bg: '#F0FDF4', color: '#15803D' },
        MP4:    { bg: '#F0FDF4', color: '#15803D' },
        MP3:    { bg: '#F0FDF4', color: '#15803D' },
        HTML:   { bg: '#FFF7ED', color: '#C2410C' },
        OPEN:   { bg: '#F0FDF4', color: '#15803D' },
        CLOSED: { bg: '#F9FAFB', color: '#9CA3AF' },
    };

    const filtered = activeCategory === 'all' ? resources : resources.filter(r => r.category === activeCategory);

    return (
        <div className="legae-landing">
            <Navbar
                onNavigate={onNavigate}
                onPortalLogin={onPortalLogin}
                onClientPortalLogin={onClientPortalLogin}
                onConsumerPortalLogin={onConsumerPortalLogin}
                activePage="resources" 
            />

            <header className="hero" id="resources-hero" style={{ paddingTop: '6rem', paddingBottom: '3rem', minHeight: 'unset' }}>
                <div className="hero-slider-bg" style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                    backgroundImage: `url("${heroBgImage}")`, backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                <div className="hero-overlay" style={{ background: 'rgba(10, 10, 20, 0.78)' }}></div>
                <div className="hero-container" style={{ alignItems: 'flex-start' }}>
                    <div className="hero-content-wrapper">
                        <h1>Resources & Publications</h1>
                        <p className="hero-subtitle">
                            Access BOCRA's full library of annual reports, market statistics, public consultations, technical guidelines, and media publications.
                        </p>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <button className="try-free-btn" onClick={onConsumerPortalLogin}>Consumer Portal</button>
                            <button className="watch-demo-btn" onClick={onClientPortalLogin}>Licensee Portal</button>
                        </div>
                    </div>

                    <div className="hero-image-container" />
                </div>
            </header>

            {/* Category Filter Bar */}
            <section style={{ background: '#fff', borderBottom: '1px solid #f0f0f0', padding: '1.25rem 10%' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#666', marginRight: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter:</span>
                    {[
                        { key: 'all', label: 'All Resources' },
                        { key: 'reports', label: 'Annual Reports' },
                        { key: 'stats', label: 'Statistics' },
                        { key: 'media', label: 'News & Media' },
                        { key: 'consultations', label: 'Consultations' },
                        { key: 'technical', label: 'Technical & CSIRT' },
                        { key: 'blog', label: 'Blog' },
                    ].map(cat => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key as any)}
                            style={{
                                padding: '0.5rem 1.2rem',
                                borderRadius: '0',
                                border: activeCategory === cat.key ? '2px solid #A31D1D' : '2px solid #eee',
                                background: activeCategory === cat.key ? '#A31D1D' : '#fff',
                                color: activeCategory === cat.key ? '#fff' : '#333',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                        >{cat.label}</button>
                    ))}
                </div>
            </section>

            {/* Resources Grid */}
            <section className="features" style={{ background: '#f9f9f9' }}>
                <div className="section-header" style={{ alignItems: 'center' }}>
                    <div><h2>Resource Library</h2></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <p style={{ margin: 0 }}>All publications are official BOCRA documents. Click any item to download or view.</p>
                        <select
                            value={dateFilter}
                            onChange={e => setDateFilter(e.target.value)}
                            style={{
                                fontSize: '0.78rem',
                                fontWeight: '600',
                                color: '#444',
                                border: '1px solid #ddd',
                                background: '#fff',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '0',
                                cursor: 'pointer',
                                outline: 'none',
                                flexShrink: 0,
                            }}
                        >
                            <option value="all">All Years</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021 &amp; Earlier</option>
                        </select>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem',
                }}>
                    {filtered.map((resource, i) => {
                        if (resource.category === 'media' || resource.category === 'blog') {
                            const isBlog = resource.category === 'blog';
                            return (
                                <div key={i} style={{ gridColumn: '1 / -1', background: '#fff', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
                                    <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
                                        {/* Left Side: Category Links */}
                                        <div style={{ flex: '1', minWidth: '320px', display: 'flex', flexDirection: 'column' }}>
                                            <h3 style={{ margin: '0 0 1rem', fontSize: '1.25rem', fontWeight: '850', color: '#1a1a1a' }}>{resource.title}</h3>
                                            <p style={{ color: '#666', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.8rem' }}>{resource.desc}</p>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
                                                {resource.items.map((item, j) => {
                                                    const tc = tagColor[item.tag] ?? { bg: '#f3f4f6', color: '#1a1a1a' };
                                                    const isActive = isBlog ? selectedBlogIndex === j : false;
                                                    return (
                                                        <li key={j}>
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    if (isBlog) setSelectedBlogIndex(j);
                                                                }} 
                                                                style={{ 
                                                                    width: '100%',
                                                                    textAlign: 'left',
                                                                    display: 'flex', 
                                                                    alignItems: 'center', 
                                                                    justifyContent: 'space-between', 
                                                                    padding: '0.85rem 1.1rem', 
                                                                    paddingLeft: isActive ? '1rem' : '1.1rem',
                                                                    background: isActive ? '#fdfdfd' : '#f9f9f9', 
                                                                    border: '1px solid #f0f0f0',
                                                                    borderLeft: isActive ? '4px solid #A31D1D' : '1px solid #f0f0f0', 
                                                                    borderRadius: '0', 
                                                                    textDecoration: 'none', 
                                                                    color: '#1a1a1a', 
                                                                    fontSize: '0.9rem', 
                                                                    fontWeight: '700', 
                                                                    transition: 'all 0.2s ease', 
                                                                    gap: '0.6rem',
                                                                    cursor: 'pointer',
                                                                }}
                                                            >
                                                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                                    {item.label}
                                                                </span>
                                                                {!isBlog && (
                                                                    <span style={{ fontSize: '0.68rem', fontWeight: '800', padding: '3px 10px', borderRadius: '50px', background: tc.bg, color: tc.color, flexShrink: 0, letterSpacing: '0.02em', border: '1px solid rgba(0,0,0,0.03)' }}>
                                                                        {item.tag}
                                                                    </span>
                                                                )}
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>

                                            {isBlog && (
                                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
                                                    <button 
                                                        onClick={() => setSelectedBlogIndex(prev => (prev > 0 ? prev - 1 : resource.items.length - 1))}
                                                        style={{ flex: 1, padding: '0.6rem', background: '#fff', border: '1px solid #ddd', fontSize: '0.8rem', fontWeight: '700', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m15 19l-7-7l7-7"/></svg>
                                                        Back
                                                    </button>
                                                    <button 
                                                        onClick={() => setSelectedBlogIndex(prev => (prev < resource.items.length - 1 ? prev + 1 : 0))}
                                                        style={{ flex: 1, padding: '0.6rem', background: '#fff', border: '1px solid #ddd', fontSize: '0.8rem', fontWeight: '700', color: '#1a1a1a', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                    >
                                                        Next
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m9 5l7 7l-7 7"/></svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side: Media Feature */}
                                        <div style={{ flex: '1.8', minWidth: '400px' }}>
                                            {isBlog ? (
                                                <div style={{ width: '100%', height: '420px', position: 'relative', overflow: 'hidden', animation: 'fadeIn 0.6s ease' }}>
                                                    <img 
                                                        key={`blog-img-${selectedBlogIndex}`}
                                                        src={resource.items[selectedBlogIndex]?.img ?? '/assets/hao-wang-pVq6YhmDPtk-unsplash.jpg'} 
                                                        alt="Blog Feature" 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                    />
                                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
                                                    <div style={{ position: 'absolute', bottom: '2rem', left: '2.5rem', right: '2.5rem' }}>
                                                        <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: '850', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                                                            {resource.items[selectedBlogIndex]?.label}
                                                        </h4>
                                                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.92rem', marginBottom: '1.2rem' }}>
                                                            {resource.items[selectedBlogIndex]?.desc}
                                                        </p>
                                                        <button style={{ background: '#fff', color: '#1a1a1a', border: 'none', padding: '0.55rem 1.4rem', fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                            Read Full Story
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div style={{ width: '100%', background: '#000', borderRadius: '0', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)', position: 'relative' }}>
                                                        <video key={selectedVideo} src={selectedVideo} controls autoPlay muted style={{ width: '100%', maxHeight: '420px', display: 'block', objectFit: 'contain', background: '#000' }} />
                                                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '0.4rem 0.8rem', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.7rem', fontWeight: '600' }}>
                                                            {galleryVideos.find(v => v.src === selectedVideo)?.label ?? 'Now Playing'}
                                                        </div>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                                                        {galleryVideos.map((vid, idx) => (
                                                            <button key={idx} onClick={() => setSelectedVideo(vid.src)} style={{ flexShrink: 0, width: '100px', background: selectedVideo === vid.src ? '#A31D1D' : '#f0f0f0', border: 'none', borderRadius: '0', cursor: 'pointer', padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}>
                                                                <div style={{ width: '100%', height: '56px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ color: selectedVideo === vid.src ? '#fff' : '#A31D1D' }}><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
                                                                </div>
                                                                <span style={{ fontSize: '0.6rem', fontWeight: '700', color: selectedVideo === vid.src ? '#fff' : '#666', padding: '0.25rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>{vid.label}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div style={{ marginTop: '1rem' }}>
                                                        <button 
                                                            onClick={() => setShowPhotoGallery(true)}
                                                            style={{ background: 'none', border: 'none', color: '#A31D1D', fontWeight: '800', fontSize: '0.86rem', cursor: 'pointer', textDecoration: 'underline', padding: '0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2M8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                                                            View Photo Gallery
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Article at bottom of section */}
                                    <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '2px solid #f0f0f0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                                            <span style={{ fontSize: '0.68rem', fontWeight: '800', background: '#A31D1D', color: '#fff', padding: '4px 12px', borderRadius: '0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{isBlog ? 'Featured Essay' : 'Press Release'}</span>
                                            <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: '500', letterSpacing: '0.02em' }}>{isBlog ? 'Published March 2025' : '23 March 2025 • Gaborone'}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.6rem', fontWeight: '850', color: '#111', margin: '0 0 1.25rem', lineHeight: '1.3', letterSpacing: '-0.025em', fontFamily: '"Inter", sans-serif' }}>
                                            {isBlog ? "Refining Cybersecurity Frameworks for the Modern Digital Economy" : "BOCRA Launches Nationwide Cybersecurity Awareness Campaign"}
                                        </h3>
                                        <p style={{ color: '#444', fontSize: '1.02rem', lineHeight: '1.85', marginBottom: '1.25rem', fontWeight: '450' }}>
                                            {isBlog ? "In this comprehensive insight, we explore the evolving threat landscape in southern Africa and how Botswana's communications regulator is leading the charge in national infrastructure defense through policy and strategic innovation." : "The Botswana Communications Regulatory Authority (BOCRA) has officially launched a landmark nationwide cybersecurity awareness campaign targeting government schools across Botswana. The initiative aims to reach over 180,000 students."}
                                            {!showFullArticle && (
                                                <button 
                                                    onClick={() => setShowFullArticle(true)}
                                                    style={{ border: 'none', background: 'transparent', color: '#888', fontWeight: '700', cursor: 'pointer', padding: '0 0.5rem', fontSize: '0.86rem', textDecoration: 'underline', verticalAlign: 'baseline' }}
                                                >
                                                    View All
                                                </button>
                                            )}
                                        </p>

                                        {showFullArticle && (
                                            <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
                                                <p style={{ color: '#444', fontSize: '1rem', lineHeight: '1.85', marginBottom: '1.25rem', fontWeight: '450' }}>
                                                    {isBlog ? "The foundation of a digital economy rests upon the security of its data pipelines. By harmonizing regional standards and investing in local capacity, we ensure that Botswana remains a safe destination for international investment." : "As part of the campaign, the Authority donated over 2,500 computers and provided high-speed Wi-Fi connectivity to ensure remote communities stay connected."}
                                                </p>
                                                <button onClick={() => setShowFullArticle(false)} style={{ border: 'none', background: 'transparent', color: '#888', fontWeight: '700', cursor: 'pointer', padding: '0', fontSize: '0.86rem', textDecoration: 'underline' }}>Show Less</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <div key={i} className="feature-card" style={{ display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                                <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem' }}>{resource.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{resource.desc}</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                                    {resource.items.map((item, j) => {
                                        const tc = tagColor[item.tag] ?? { bg: '#f3f4f6', color: '#374151' };
                                        return (
                                            <li key={j}>
                                                <a
                                                    href={item.url}
                                                    onClick={e => e.preventDefault()}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        padding: '0.75rem 1rem',
                                                        background: '#fff',
                                                        border: '1px solid #f0f0f0',
                                                        borderRadius: '0',
                                                        textDecoration: 'none',
                                                        color: '#1a1a1a',
                                                        fontSize: '0.88rem',
                                                        fontWeight: '600',
                                                        transition: 'all 0.2s ease',
                                                        gap: '0.5rem',
                                                    }}
                                                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.borderColor = '#A31D1D'; (e.currentTarget as HTMLElement).style.background = '#FDF2F2'; }}
                                                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.borderColor = '#f0f0f0'; (e.currentTarget as HTMLElement).style.background = '#fff'; }}
                                                >
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" style={{ color: '#A31D1D', flexShrink: 0 }}>
                                                            <path fill="currentColor" d="M15 7h-3V1H8v6H5l5 5zm4.338 6.532c-.21-.224-1.611-1.723-2.011-2.114A1.5 1.5 0 0 0 16.285 11h-1.757l3.064 2.994h-3.544a.27.27 0 0 0-.24.133L12.992 16H7.008l-.816-1.873a.28.28 0 0 0-.24-.133H2.408L5.471 11H3.715c-.397 0-.776.159-1.042.418c-.4.392-1.801 1.891-2.011 2.114c-.489.521-.758.936-.63 1.449l.561 3.074c.128.514.691.936 1.252.936h16.312c.561 0 1.124-.422 1.252-.936l.561-3.074c.126-.513-.142-.928-.632-1.449"/>
                                                        </svg>
                                                        {item.label}
                                                    </span>
                                                    <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: tc.bg, color: tc.color, flexShrink: 0 }}>
                                                        {item.tag}
                                                    </span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Quick Links Strip - How It Works style */}
            <section
                className="how-it-works"
                style={{
                    backgroundImage: 'url("/assets/pexels-divinetechygirl-1181354.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Dark overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(10, 10, 20, 0.72)',
                    zIndex: 0,
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="section-header">
                        <h2 style={{ color: '#fff' }}>Quick Access</h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)' }}>Jump directly to frequently used services and information.</p>
                    </div>
                    <div style={{ 
                        background: '#fff', 
                        marginTop: '3rem', 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                    }}>
                        {[
                            { number: '01', title: 'Type Approval', desc: 'Check if your device is certified for use in Botswana networks.', cta: 'Check Device', onClick: onConsumerPortalLogin },
                            { number: '02', title: 'CSIRT Monitor', desc: 'Live national cybersecurity threat level and advisory bulletins.', cta: 'View Threats', onClick: onConsumerPortalLogin },
                            { number: '03', title: 'Terms & Privacy', desc: 'Read the BOCRA portal terms of service and data policy.', cta: 'Read Policy', onClick: () => setShowPrivacy(true) },
                            { number: '04', title: 'Consumer Portal', desc: 'File complaints, track cases, and access consumer tools.', cta: 'Go to Portal', onClick: onConsumerPortalLogin },
                        ].map((item, i) => (
                            <div key={i} style={{
                                flex: '1',
                                minWidth: '250px',
                                padding: '2.5rem',
                                borderRight: i === 3 ? 'none' : '1px solid #eee',
                                borderBottom: '1px solid #eee',
                            }}>
                                <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#f0f0f0', lineHeight: '1', marginBottom: '1rem' }}>{item.number}</div>
                                <h3 style={{ color: '#1a1a1a', fontSize: '1.15rem', fontWeight: '850', margin: '0 0 0.75rem' }}>{item.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.5rem', minHeight: '3.2rem' }}>{item.desc}</p>
                                <button
                                    onClick={item.onClick}
                                    style={{ 
                                        background: 'transparent', 
                                        color: '#A31D1D', 
                                        border: 'none', 
                                        padding: '0', 
                                        fontWeight: '800', 
                                        fontSize: '0.86rem', 
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {item.cta}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                                </button>
                            </div>
                        ))}
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
                    </div>
                    <div className="footer-links">
                        <h4>Platform</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onBackToLanding?.(); }}>Sectors</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onBackToLanding?.(); }}>Strategy</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); onBackToLanding?.(); }}>Consumer Protection</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('technical'); window.scrollTo({ top: 600, behavior: 'smooth' }); }}>Type Approval</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveCategory('technical'); window.scrollTo({ top: 600, behavior: 'smooth' }); }}>CSIRT Monitor</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacy(true); }}>Terms & Privacy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom" style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #FFE4E4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#666' }}>
                    <p>&copy; {new Date().getFullYear()} BOCRA. All rights reserved.</p>
                    <p>Regulating for the Future</p>
                </div>
            </footer>

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

            {/* Photo Gallery Modal */}
            {showPhotoGallery && (
                <div className="popup-overlay privacy-modal-overlay" onClick={() => setShowPhotoGallery(false)}>
                    <div className="waitlist-popup privacy-popup" style={{ maxWidth: '1000px', width: '90%', background: '#fff', padding: '0', borderRadius: '0', border: 'none', boxShadow: '0 25px 60px rgba(0,0,0,0.2)' }} onClick={(e) => e.stopPropagation()}>
                        <button className="close-popup" style={{ background: '#A31D1D', color: '#fff', top: '0', right: '0', zIndex: 10, width: '40px', height: '40px' }} onClick={() => setShowPhotoGallery(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"><path d="M5 5l14 14M5 19l14 -14"/></g></svg>
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>
                            {/* Main Image View */}
                            <div style={{ flex: '1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', overflow: 'hidden' }}>
                                <img 
                                    key={selectedGalleryImg} 
                                    src={selectedGalleryImg} 
                                    alt="Gallery View" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', animation: 'fadeIn 0.5s ease' }} 
                                />
                                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: '#fff', padding: '0', color: '#1a1a1a', border: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
                                    <div style={{ background: '#A31D1D', padding: '0.35rem 1.25rem', color: '#fff', fontSize: '0.58rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.12em' }}>BOCRA Media Gallery</div>
                                    <div style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem', fontWeight: '800', color: '#111' }}>
                                        {[
                                            { src: '/assets/image (19).png', label: 'Cyber Awareness Kick-off' },
                                            { src: '/assets/image (21).png', label: 'Cyber Awareness Kick-off' },
                                            { src: '/assets/image (22).png', label: 'School Outreach Highlights' },
                                            { src: '/assets/image (26).png', label: 'Computer Donation Drive' },
                                            { src: '/assets/image (31).png', label: 'Connectivity Roll-out' },
                                            { src: '/assets/image (42).png', label: 'Digital Literacy Training' },
                                            { src: '/assets/image (43).png', label: 'BOCRA Tech Summit' }
                                        ].find(i => i.src === selectedGalleryImg)?.label ?? 'Gallery Image'}
                                    </div>
                                </div>
                            </div>

                            {/* Shifting Thumbnails Strip */}
                            <div style={{ background: '#fff', padding: '1.25rem', display: 'flex', gap: '0.75rem', overflowX: 'auto', borderTop: '1px solid #eee', alignItems: 'center' }}>
                                {[
                                    { src: '/assets/image (19).png', label: 'Cyber Awareness Kick-off' },
                                    { src: '/assets/image (21).png', label: 'Cyber Awareness Kick-off' },
                                    { src: '/assets/image (22).png', label: 'School Outreach Highlights' },
                                    { src: '/assets/image (26).png', label: 'Computer Donation Drive' },
                                    { src: '/assets/image (31).png', label: 'Connectivity Roll-out' },
                                    { src: '/assets/image (42).png', label: 'Digital Literacy Training' },
                                    { src: '/assets/image (43).png', label: 'BOCRA Tech Summit' }
                                ].map((img, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setSelectedGalleryImg(img.src)}
                                        style={{ 
                                            flexShrink: 0, 
                                            width: '110px', 
                                            height: '74px', 
                                            border: selectedGalleryImg === img.src ? '3px solid #A31D1D' : '3px solid transparent', 
                                            padding: '0', 
                                            background: '#fff', 
                                            cursor: 'pointer', 
                                            opacity: selectedGalleryImg === img.src ? 1 : 0.65,
                                            transition: 'all 0.3s ease',
                                            boxShadow: selectedGalleryImg === img.src ? '0 4px 10px rgba(163, 29, 29, 0.2)' : 'none'
                                        }}
                                    >
                                        <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Resources;
