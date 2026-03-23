import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import './SupportQueries.css'; // Reusing base dashboard sub-page styles

const CybersecurityAlerts: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'high' | 'tips' | 'forum'>('all');

    const alerts = [
        { id: 'ALT-001', title: 'National Bank Phishing Campaign', level: 'High', date: '2024-03-22', desc: 'Large scale SMS phishing targeting bank customers with fake reward links.' },
        { id: 'ALT-002', title: 'AI Deepfake Call Warning', level: 'Severe', date: '2024-03-15', desc: 'Reports of AI-generated voices of family members requesting urgent money transfers.' },
        { id: 'ALT-003', title: 'Public Wi-Fi Vulnerability', level: 'Moderate', date: '2024-03-10', desc: 'Known vulnerability in common public Wi-Fi hotspots in Gaborone mall areas.' },
    ];

    const blogs = [
        { 
            id: 1, 
            author: 'BOCRA CSIRT', 
            title: 'Securing Your Home Network: A 2024 Guide', 
            date: 'March 20, 2024',
            image: '/assets/nasaupcoming.jpg',
            content: 'As more Motswana work from home, the security of residential Wi-Fi networks has become a national priority. Our experts outline three critical steps...',
            comments: [
                { user: 'Thabo M.', text: 'Very helpful guide! I just changed my default router password.' },
                { user: 'Sarah K.', text: 'Can you provide more info on VPN services available in BW?' }
            ]
        },
        { 
            id: 2, 
            author: 'Legal Affairs', 
            title: 'Reporting Online Fraud: Your Rights', 
            date: 'March 18, 2024',
            content: 'Under the Communications Act, victims of digital fraud have specific pathways for restitution. Here is how you can effectively report incidents to us.',
            comments: []
        }
    ];

    const filteredAlerts = activeTab === 'all' ? alerts : alerts.filter(a => a.level === 'Severe' || a.level === 'High');

    return (
        <div className="support-queries-container" style={{ padding: '2rem' }}>
            <div className="section-header" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                    className="create-request-btn" 
                    style={{ 
                        background: '#A80000', 
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '4px 4px 10px rgba(168, 0, 0, 0.2)',
                        borderRadius: 0
                    }}
                >
                    <ShieldAlert size={18} />
                    Report A Cyber Threat
                </button>
            </div>

            {/* Threat Level Banner */}
            <div style={{ background: '#FDF2F2', border: '1px solid #FFE4E4', padding: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 1024 1024" style={{ color: '#A80000' }}>
                    <rect width="1024" height="1024" fill="none"/>
                    <path fill="currentColor" d="M512 244c176.18 0 319 142.82 319 319v233a32 32 0 0 1-32 32H225a32 32 0 0 1-32-32V563c0-176.18 142.82-319 319-319M484 68h56a8 8 0 0 1 8 8v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8V76a8 8 0 0 1 8-8M177.25 191.66a8 8 0 0 1 11.32 0l67.88 67.88a8 8 0 0 1 0 11.31l-39.6 39.6a8 8 0 0 1-11.31 0l-67.88-67.88a8 8 0 0 1 0-11.31l39.6-39.6zm669.6 0l39.6 39.6a8 8 0 0 1 0 11.3l-67.88 67.9a8 8 0 0 1-11.32 0l-39.6-39.6a8 8 0 0 1 0-11.32l67.89-67.88a8 8 0 0 1 11.31 0M192 892h640a32 32 0 0 1 32 32v24a8 8 0 0 1-8 8H168a8 8 0 0 1-8-8v-24a32 32 0 0 1 32-32m148-317v253h64V575z"/>
                </svg>

                <div>
                    <h3 style={{ margin: 0, color: '#A80000' }}>Current National Threat Level: HIGH</h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#666' }}>BOCRA CSIRT recommends heightened vigilance across all digital platforms.</p>
                </div>
            </div>

            <div className="queries-tabs" style={{ marginBottom: '2rem', display: 'flex', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
                <button 
                    className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('all')}
                    style={{ padding: '1rem 1.5rem', border: 'none', borderBottom: activeTab === 'all' ? '4px solid #A80000' : 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                    All Alerts
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'high' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('high')}
                    style={{ padding: '1rem 1.5rem', border: 'none', borderBottom: activeTab === 'high' ? '4px solid #A80000' : 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                    Major Threats
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('tips')}
                    style={{ padding: '1rem 1.5rem', border: 'none', borderBottom: activeTab === 'tips' ? '4px solid #A80000' : 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                    Prevention Tips
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'forum' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('forum')}
                    style={{ padding: '1rem 1.5rem', border: 'none', borderBottom: activeTab === 'forum' ? '4px solid #A80000' : 'none', background: 'transparent', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}
                >
                    Cyber Forum
                </button>
            </div>

            {(activeTab === 'all' || activeTab === 'high') && (
                <div className="queries-list">
                    {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
                        <div key={alert.id} className="query-card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #eee', marginBottom: '1rem', borderRadius: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ fontWeight: 800, color: '#A80000' }}>#{alert.id}</span>
                                <span style={{ 
                                    padding: '4px 12px', 
                                    background: alert.level === 'Severe' ? '#000' : '#FDF2F2', 
                                    color: alert.level === 'Severe' ? '#fff' : '#A80000', 
                                    fontSize: '0.75rem', 
                                    fontWeight: 700 
                                }}>
                                    {alert.level} RISK
                                </span>
                            </div>
                            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{alert.title}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>{alert.desc}</p>
                            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999' }}>Published on: {alert.date}</div>
                        </div>
                    )) : <p>No threads found for this level.</p>}
                </div>
            )}

            {activeTab === 'tips' && (
                <div className="tips-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{ padding: '2rem', background: '#f9f9f9', border: '1px solid #eee' }}>
                        <h4 style={{ color: '#A80000' }}>1. Two-Factor Authentication (2FA)</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>Always enable 2FA on your banking and social media accounts to add an extra layer of protection.</p>
                    </div>
                    <div style={{ padding: '2rem', background: '#f9f9f9', border: '1px solid #eee' }}>
                        <h4 style={{ color: '#A80000' }}>2. Report suspicious links</h4>
                        <p style={{ fontSize: '0.9rem', color: '#666' }}>If you receive a suspicious SMS or email, do not click on the link. Report it to BOCRA immediately via this portal.</p>
                    </div>
                </div>
            )}

            {activeTab === 'forum' && (
                <div className="cyber-forum">
                    {blogs.map(blog => (
                        <div key={blog.id} className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #eee', marginBottom: '2rem' }}>
                            <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                                <span style={{ color: '#A80000', fontWeight: 'bold', fontSize: '0.85rem' }}>{blog.author} • {blog.date}</span>
                                <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>{blog.title}</h3>
                                <p style={{ color: '#666', lineHeight: 1.6 }}>{blog.content}</p>
                            </div>
                            
                            <div className="comments-section">
                                <h4 style={{ fontSize: '0.9rem', margin: '0 0 1rem' }}>COMMENTS ({blog.comments.length})</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {blog.comments.map((comment, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '15px' }}>
                                            <div style={{ width: '32px', height: '32px', background: '#A80000', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                                {comment.user.charAt(0)}
                                            </div>
                                            <div style={{ background: '#f9f9f9', padding: '12px 20px', flex: 1 }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{comment.user}</div>
                                                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#555' }}>{comment.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Add a comment..." 
                                        style={{ flex: 1, padding: '10px 15px', border: '1px solid #ddd', borderRadius: 0 }}
                                    />
                                    <button style={{ background: '#A80000', color: 'white', border: 'none', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}>POST</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CybersecurityAlerts;

