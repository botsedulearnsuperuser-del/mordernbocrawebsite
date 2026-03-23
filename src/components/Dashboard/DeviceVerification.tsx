import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, Info, ShieldAlert } from 'lucide-react';

const DeviceVerification: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState<'approved' | 'not-approved' | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock search logic
        if (searchTerm.length >= 8) {
            setResult(searchTerm.includes('123') ? 'approved' : 'not-approved');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            {/* Search Section */}
            <div className="card" style={{ padding: '2.5rem', background: 'white', border: '1px solid #eee', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 1.5rem' }}>Verify Mobile Device Approval</h2>
                <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '700px' }}>
                    Every mobile device used in Botswana must be Type Approved by BOCRA to ensure it meets health, safety, and technical standards. Use your IMEI or Model Number to verify.
                </p>
                
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input 
                            type="text" 
                            placeholder="Enter IMEI Number or Model (e.g., iPhone 15 Pro)" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '15px 15px 15px 45px', 
                                border: '1px solid #ddd', 
                                borderRadius: 0,
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <button 
                        type="submit"
                        style={{ 
                            background: '#A80000', 
                            color: 'white', 
                            border: 'none', 
                            padding: '0 30px', 
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderRadius: 0
                        }}
                    >
                        VERIFY
                    </button>
                </form>

                {result && (
                    <div style={{ 
                        marginTop: '2rem', 
                        padding: '1.5rem', 
                        background: result === 'approved' ? '#f0fdf4' : '#fef2f2', 
                        border: `1px solid ${result === 'approved' ? '#bcf0da' : '#fecaca'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem'
                    }}>
                        {result === 'approved' ? <CheckCircle color="#16a34a" size={40} /> : <XCircle color="#dc2626" size={40} />}
                        <div>
                            <h3 style={{ margin: 0, color: result === 'approved' ? '#166534' : '#991b1b' }}>
                                {result === 'approved' ? 'DEVICE TYPE APPROVED' : 'UNAUTHORIZED DEVICE WARNING'}
                            </h3>
                            <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: '#666' }}>
                                {result === 'approved' 
                                    ? `The model matching ${searchTerm} is fully certified for use on Botswana communication networks.` 
                                    : `We could not find a certification for ${searchTerm}. Using this device may lead to network performance issues or safety risks.`}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ color: '#A80000' }}>
                            <rect width="24" height="24" fill="none"/>
                            <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-11v6h2v-6zm0-4v2h2V7z"/>
                        </svg>

                        <h3 style={{ margin: 0 }}>How to find your IMEI?</h3>
                    </div>
                    <ul style={{ paddingLeft: '1.2rem', color: '#666', lineHeight: '1.8' }}>
                        <li>Dial <b>*#06#</b> on your phone keypad.</li>
                        <li>Check the device's original packaging box.</li>
                        <li>Look in <b>Settings</b> &gt; <b>About Phone</b>.</li>
                    </ul>
                </div>

                <div className="card" style={{ padding: '2rem', background: 'white', border: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100" style={{ color: '#A80000' }}>
                            <rect width="100" height="100" fill="none"/>
                            <path fill="currentColor" d="m50.027 10.459l-.018-.032l-33.606 19.404l.076.132v22.893h.014c.286 19.111 14.859 34.755 33.519 36.718c18.66-1.962 33.234-17.606 33.519-36.718V29.953l.066-.114zm-.015 69.097V51.677H26.435V35.651L50.012 22.04v29.637h23.563v1.179h.017c-.278 13.593-10.439 24.798-23.58 26.7"/>
                        </svg>

                        <h3 style={{ margin: 0 }}>Encountered a fake device?</h3>
                    </div>
                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        Selling or using unapproved communication devices is a regulatory offense in Botswana.
                    </p>
                    <button style={{ 
                        background: 'transparent', 
                        border: '2px solid #A80000', 
                        color: '#A80000', 
                        padding: '10px 20px', 
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        borderRadius: 0
                    }}>
                        Report Unapproved Device
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceVerification;
