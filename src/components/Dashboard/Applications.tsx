import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './CardGrid.css';
import './Applications.css';

type LicenseStatus = 'Pending' | 'Approved' | 'Rejected' | 'Blocked';

interface LicenseProps {
    initials: string;
    name: string;
    category: string;
    appRef: string;
    appType: string;
    status: LicenseStatus;
    entityId: string;
    contact: string;
    submitDate: string;
    uin: string;
    technicalLead: string;
    fee: string;
}

const statusColors: Record<LicenseStatus, string> = {
    'Pending': '#A80000',
    'Approved': '#16a34a',
    'Rejected': '#dc2626',
    'Blocked': '#6b7280',
};

const applications: LicenseProps[] = [
    { initials: 'BT', name: 'BTCL (National)', category: 'Major', appRef: '#APP-2024-001', appType: '5G Spectrum Bid', status: 'Pending', entityId: 'BOC-NFP-001', contact: '+267 395 8000', submitDate: '2024-01-15', uin: 'BW-980112345', technicalLead: 'Eng. Modise', fee: 'P50,000.00' },
    { initials: 'MW', name: 'Mascom Wireless', category: 'Major', appRef: '#APP-2024-002', appType: 'NFP Expansion', status: 'Approved', entityId: 'BOC-SAP-002', contact: '+267 390 3396', submitDate: '2024-02-03', uin: 'BW-950203456', technicalLead: 'Ms. Sithole', fee: 'P25,000.00' },
    { initials: 'OB', name: 'Orange Botswana', category: 'Major', appRef: '#APP-2024-003', appType: 'Content License', status: 'Blocked', entityId: 'BOC-SAP-003', contact: '+267 317 0113', submitDate: '2024-02-10', uin: 'BW-870310567', technicalLead: 'Mr. Kgosi', fee: 'P10,000.00' },
    { initials: 'LI', name: 'Liquid Intelligent', category: 'Regional', appRef: '#APP-2024-004', appType: 'SAP Renewal', status: 'Pending', entityId: 'BOC-NFP-004', contact: '+267 391 1996', submitDate: '2024-03-01', uin: 'BW-920401678', technicalLead: 'G. Rampa', fee: 'P25,000.00' },
];

const LicenseModal: React.FC<{ license: LicenseProps; onClose: () => void }> = ({ license, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">Application Details</h2>
                <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="modal-avatar-row">
                <div className="avatar-circle" style={{ background: statusColors[license.status], width: 60, height: 60, fontSize: '1.2rem' }}>
                    {license.initials}
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{license.name}</div>
                    <div style={{ color: '#888', fontSize: '0.85rem' }}>{license.entityId}</div>
                </div>
                <span className="modal-status-badge" style={{ background: statusColors[license.status] }}>
                    {license.status}
                </span>
            </div>

            <div className="modal-info-grid">
                {[
                    { label: 'Application Ref', value: license.appRef },
                    { label: 'License Type', value: license.appType },
                    { label: 'Entity Category', value: license.category },
                    { label: 'Technical Contact', value: license.contact },
                    { label: 'UIN / Company No.', value: license.uin },
                    { label: 'Submission Date', value: license.submitDate },
                    { label: 'Technical Lead', value: license.technicalLead },
                    { label: 'Processing Fee', value: license.fee },
                ].map(({ label, value }) => (
                    <div className="modal-info-item" key={label}>
                        <div className="modal-info-label">{label}</div>
                        <div className="modal-info-value">{value}</div>
                    </div>
                ))}
            </div>

            <div className="modal-checklist">
                <div className="modal-checklist-title">Compliance Checklist</div>
                {[
                    'CIPA registration documents verified',
                    'Technical infrastructure proposal approved',
                    'Financial capability audit cleared',
                    'ITU Region 1 standard compliance',
                    'Local repair center registered',
                ].map((item, i) => (
                    <div key={i} className="modal-checklist-item">
                        <span className="checklist-tick">✓</span> {item}
                    </div>
                ))}
            </div>

            {license.status === 'Pending' && (
                <div className="modal-actions">
                    <button className="card-action-btn" style={{ background: '#16a34a', flex: 1 }}>✓ Issue License</button>
                    <button className="card-action-btn" style={{ background: '#dc2626', flex: 1 }}>✗ Reject App</button>
                </div>
            )}
        </div>
    </div>
);

const Applications: React.FC = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'All' | LicenseStatus>('All');
    const [selectedLicense, setSelectedLicense] = useState<LicenseProps | null>(null);

    const counts = {
        All: applications.length,
        Pending: applications.filter(c => c.status === 'Pending').length,
        Approved: applications.filter(c => c.status === 'Approved').length,
        Blocked: applications.filter(c => c.status === 'Blocked').length,
        Rejected: applications.filter(c => c.status === 'Rejected').length,
    };

    const filtered = applications.filter(c => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.appRef.toLowerCase().includes(search.toLowerCase()) ||
            c.category.toLowerCase().includes(search.toLowerCase()) ||
            c.appType.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || c.status === filter;
        return matchSearch && matchFilter;
    });

    const filterBtns: { key: 'All' | LicenseStatus; color: string; bg: string }[] = [
        { key: 'All',      color: '#A80000', bg: '#fcebeb' },
        { key: 'Pending',  color: '#A80000', bg: '#fcebeb' },
        { key: 'Approved', color: '#16a34a', bg: '#f0fdf4' },
        { key: 'Blocked',  color: '#6b7280', bg: '#f3f4f6' },
        { key: 'Rejected', color: '#dc2626', bg: '#fef2f2' },
    ];

    return (
        <div className="grid-page-container">
            <div className="print-only">
                <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #A80000' }}>
                    <img src="/assets/bocralogo.png" alt="BOCRA Logo" style={{ width: '150px', marginBottom: '1rem' }} />
                    <h1 style={{ color: '#222', margin: 0, fontSize: '1.8rem' }}>Botswana Communications Regulatory Authority</h1>
                    <p style={{ margin: '0.5rem 0', fontWeight: 600, fontSize: '1.1rem' }}>BOCRA Application Registry Log</p>
                </div>
            </div>
            <div className="page-header" style={{ marginBottom: '0.75rem' }}>
                <h2 className="page-title">License Processing</h2>
                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search applications here"
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="no-print" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'nowrap', overflowX: 'auto' }}>
                {filterBtns.map(({ key, color, bg }) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className="claims-filter-btn"
                        style={{
                            color: filter === key ? 'white' : color,
                            background: filter === key ? color : 'white',
                            borderColor: color,
                        }}
                    >
                        {key}
                        <span className="claims-count-badge" style={{
                            background: filter === key ? 'rgba(255,255,255,0.3)' : bg,
                            color: filter === key ? 'white' : color,
                        }}>
                            {counts[key]}
                        </span>
                    </button>
                ))}
                <button
                    className="claims-filter-btn"
                    style={{ color: '#6b7280', borderColor: '#6b7280', marginLeft: 'auto' }}
                    onClick={() => window.print()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <rect width="24" height="24" fill="none"/>
                        <path fill="currentColor" d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-9 13a3 3 0 0 1-3-3H4V5h16v8h-5a3 3 0 0 1-3 3m4-5h-3v3h-2v-3H8l4-4.5z"/>
                    </svg>
                    Export Log
                </button>
            </div>

            <div className="claims-list">
                {filtered.map((license, i) => (
                    <div className="claim-row-card" key={i}>
                        <div className="claim-avatar" style={{ background: statusColors[license.status] }}>
                            {license.initials}
                        </div>

                        <div className="claim-info">
                            <div className="claim-name">{license.name}</div>
                            <div className="claim-branch">{license.category} Category</div>
                        </div>

                        <div className="claim-ref-block">
                            <div className="claim-ref">{license.appRef}</div>
                            <div className="claim-type">{license.appType}</div>
                        </div>

                        <button
                            className="claim-view-btn"
                            onClick={() => setSelectedLicense(license)}
                        >
                            Review
                        </button>

                        <button
                            className="claim-status-btn"
                            style={{ background: statusColors[license.status] }}
                        >
                            {license.status}
                        </button>
                    </div>
                ))}
            </div>

            {selectedLicense && (
                <LicenseModal license={selectedLicense} onClose={() => setSelectedLicense(null)} />
            )}
        </div>
    );
};

export default Applications;
