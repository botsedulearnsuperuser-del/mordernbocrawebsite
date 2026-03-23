import React from 'react';
import { FileText, Calendar, Clock, Download, Search, AlertCircle } from 'lucide-react';

const Tenders: React.FC = () => {
    const tenders = [
        { 
            id: 'BOCRA/T01/2024', 
            title: 'Provision of Infrastructure for Rural Connectivity', 
            status: 'Open', 
            closingDate: 'April 15, 2024', 
            type: 'Public Tender',
            category: 'Infrastructure'
        },
        { 
            id: 'BOCRA/T02/2024', 
            title: 'Development of National Cybersecurity Awareness Campaign', 
            status: 'Open', 
            closingDate: 'April 22, 2024', 
            type: 'RFP',
            category: 'Consultancy'
        },
        { 
            id: 'BOCRA/T03/2023', 
            title: 'Supply and Installation of Radio Monitoring Equipment', 
            status: 'Closed', 
            closingDate: 'February 10, 2024', 
            type: 'Public Tender',
            category: 'Technical'
        }
    ];

    return (
        <div style={{ padding: '2rem' }}>
            {/* Header / Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #eee', borderRadius: 0 }}>
                    <div style={{ color: '#A80000', marginBottom: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                            <rect width="512" height="512" fill="none"/>
                            <path fill="currentColor" d="M240 216V32H92a12 12 0 0 0-12 12v424a12 12 0 0 0 12 12h328a12 12 0 0 0 12-12V224H248a8 8 0 0 1-8-8"/>
                            <path fill="currentColor" d="M272 41.69V188a4 4 0 0 0 4 4h146.31a2 2 0 0 0 1.42-3.41L275.41 40.27a2 2 0 0 0-3.41 1.42"/>
                        </svg>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>8</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Active Tenders</p>
                </div>
                <div className="card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #eee', borderRadius: 0 }}>
                    <div style={{ color: '#A80000', marginBottom: '0.5rem' }}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect width="24" height="24" fill="none"/>
                            <path fill="currentColor" d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10s10-4.58 10-10S17.42 2 12 2m5 11h-6V7h2v4h4z"/>
                        </svg>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>3</h3>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Closing Soon</p>
                </div>
                <div className="card" style={{ padding: '1.5rem', background: '#fdf2f2', border: '1px solid #ffe4e4', borderRadius: 0 }}>
                    <div style={{ color: '#A80000', marginBottom: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect width="24" height="24" fill="none"/>
                            <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-11v6h2v-6zm0-4v2h2V7z"/>
                        </svg>
                    </div>
                    <h3 style={{ margin: 0, fontSize: '0.9rem', color: '#A80000', fontWeight: 'bold' }}>Tendering Guidelines</h3>
                    <p style={{ margin: '4px 0 0', color: '#666', fontSize: '0.8rem' }}>Ensure all submissions are made before 10:00 AM on closing day.</p>
                </div>
            </div>


            {/* Procurement Tools */}
            <div className="card" style={{ padding: '1.5rem', background: 'white', border: '1px solid #eee', marginBottom: '2rem', borderRadius: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Active Procurement Opportunities</h2>
                    <div className="search-bar" style={{ maxWidth: '300px' }}>
                        <Search size={18} color="#999" />
                        <input type="text" placeholder="Filter Tenders..." style={{ border: 'none', background: 'transparent', outline: 'none' }} />
                    </div>
                </div>
            </div>

            {/* Tenders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tenders.map((tender) => (
                    <div key={tender.id} className="card" style={{ 
                        padding: '1.5rem', 
                        background: 'white', 
                        border: '1px solid #eee', 
                        borderRadius: 0,
                        borderLeft: `5px solid ${tender.status === 'Open' ? '#22c55e' : '#94a3b8'}`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#A80000' }}>{tender.id}</span>
                                    <span style={{ 
                                        padding: '2px 8px', 
                                        background: tender.status === 'Open' ? '#f0fdf4' : '#f1f5f9', 
                                        color: tender.status === 'Open' ? '#166534' : '#475569',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {tender.status.toUpperCase()}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: '#999' }}>| {tender.category}</span>
                                </div>
                                <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem' }}>{tender.title}</h3>
                                <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', color: '#666' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 1024 1024">
                                            <rect width="1024" height="1024" fill="none"/>
                                            <path fill="currentColor" d="m960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985m0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32m0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32m-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32m0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32"/>
                                        </svg>
                                        Closing: {tender.closingDate}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                                            <rect width="16" height="16" fill="none"/>
                                            <path fill="currentColor" d="M8.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1zM12 5H8.5a.5.5 0 0 1-.5-.5V1H2v12h10zm-7.5 6a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1zm0-3a.5.5 0 0 1 0-1h5a.5.5 0 1 1 0 1zm1 8a.5.5 0 1 1 0-1H14V6.5a.5.5 0 1 1 1 0V15a1 1 0 0 1-1 1z"/>
                                        </svg>
                                        {tender.type}
                                    </div>
                                </div>

                            </div>
                            <button style={{ 
                                background: '#f8fafc', 
                                border: '1px solid #e2e8f0', 
                                color: '#1e293b', 
                                padding: '10px 15px', 
                                fontWeight: 'bold', 
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                borderRadius: 0
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                                    <rect width="24" height="24" fill="none"/><path fill="currentColor" d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z"/>
                                </svg> 
                                Tender Doc
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>
                    Showing 3 of 12 procurement records. <a href="#" style={{ color: '#A80000', fontWeight: 'bold', textDecoration: 'none' }}>View Archive</a>
                </p>
            </div>
        </div>
    );
};

export default Tenders;
