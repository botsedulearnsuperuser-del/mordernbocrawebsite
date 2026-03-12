import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './CardGrid.css';
import './Applications.css';

type ClaimStatus = 'Pending' | 'Approved' | 'Rejected' | 'Blocked';

interface ClaimProps {
    initials: string;
    name: string;
    branch: string;
    claimRef: string;
    claimType: string;
    status: ClaimStatus;
    memberId: string;
    phone: string;
    joinDate: string;
    idNumber: string;
    beneficiary: string;
    amount: string;
}

const statusColors: Record<ClaimStatus, string> = {
    'Pending': '#A80000',
    'Approved': '#16a34a',
    'Rejected': '#dc2626',
    'Blocked': '#6b7280',
};

const claims: ClaimProps[] = [
    { initials: 'KM', name: 'Kefilwe Modise', branch: 'Gaborone', claimRef: '#CLM-2024-001', claimType: 'Principal Member Death', status: 'Pending', memberId: 'BRA-2024-001', phone: '+26771234567', joinDate: '2024-01-15', idNumber: '980112345', beneficiary: 'Boitumelo Modise (Spouse)', amount: 'P15,000.00' },
    { initials: 'TS', name: 'Tebogo Sithole', branch: 'Francistown', claimRef: '#CLM-2024-002', claimType: 'Additional Member Death', status: 'Approved', memberId: 'BRA-2024-002', phone: '+26772345678', joinDate: '2024-02-03', idNumber: '950203456', beneficiary: 'Naledi Sithole (Child)', amount: 'P15,000.00' },
    { initials: 'OK', name: 'Oarabile Kgosi', branch: 'Palapye', claimRef: '#CLM-2024-003', claimType: 'Principal Member Death', status: 'Blocked', memberId: 'BRA-2024-003', phone: '+26773456789', joinDate: '2024-02-10', idNumber: '870310567', beneficiary: 'Mpho Kgosi (Sibling)', amount: 'P15,000.00' },
    { initials: 'GR', name: 'Gosiame Rampa', branch: 'Serowe', claimRef: '#CLM-2024-004', claimType: 'Child Dependent Death', status: 'Pending', memberId: 'BRA-2024-004', phone: '+26774567890', joinDate: '2024-03-01', idNumber: '920401678', beneficiary: 'Gosiame Rampa (Self – Principal)', amount: 'P15,000.00' },
    { initials: 'DN', name: 'Dineo Ntuane', branch: 'Maun', claimRef: '#CLM-2024-005', claimType: 'Additional Member Death', status: 'Rejected', memberId: 'BRA-2024-005', phone: '+26775678901', joinDate: '2024-03-12', idNumber: '001205789', beneficiary: 'Dineo Ntuane (Self – Principal)', amount: 'P15,000.00' },
    { initials: 'TP', name: 'Thato Phaladi', branch: 'Gaborone', claimRef: '#CLM-2024-006', claimType: 'Principal Member Death', status: 'Approved', memberId: 'BRA-2024-006', phone: '+26776789012', joinDate: '2024-04-05', idNumber: '880506890', beneficiary: 'Lesego Phaladi (Spouse)', amount: 'P15,000.00' },
    { initials: 'MB', name: 'Mpho Bogosi', branch: 'Francistown', claimRef: '#CLM-2024-007', claimType: 'Child Dependent Death', status: 'Pending', memberId: 'BRA-2024-007', phone: '+26777890123', joinDate: '2024-04-20', idNumber: '760720901', beneficiary: 'Mpho Bogosi (Self – Principal)', amount: 'P15,000.00' },
    { initials: 'LS', name: 'Lebogang Seleka', branch: 'Serowe', claimRef: '#CLM-2024-008', claimType: 'Additional Member Death', status: 'Blocked', memberId: 'BRA-2024-008', phone: '+26778901234', joinDate: '2024-05-08', idNumber: '910808012', beneficiary: 'Neo Seleka (Child)', amount: 'P15,000.00' },
];

// ── Claim Detail Modal ──────────────────────────────────────────────────────
const ClaimModal: React.FC<{ claim: ClaimProps; onClose: () => void }> = ({ claim, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
                <h2 className="modal-title">Claim Details</h2>
                <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            {/* Avatar + name */}
            <div className="modal-avatar-row">
                <div className="avatar-circle" style={{ background: statusColors[claim.status], width: 60, height: 60, fontSize: '1.2rem' }}>
                    {claim.initials}
                </div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{claim.name}</div>
                    <div style={{ color: '#888', fontSize: '0.85rem' }}>{claim.memberId}</div>
                </div>
                <span className="modal-status-badge" style={{ background: statusColors[claim.status] }}>
                    {claim.status}
                </span>
            </div>

            {/* Info grid */}
            <div className="modal-info-grid">
                {[
                    { label: 'Claim Reference', value: claim.claimRef },
                    { label: 'Claim Type', value: claim.claimType },
                    { label: 'Branch', value: claim.branch },
                    { label: 'Phone Number', value: claim.phone },
                    { label: 'ID / Omang Number', value: claim.idNumber },
                    { label: 'Join Date', value: claim.joinDate },
                    { label: 'Beneficiary', value: claim.beneficiary },
                    { label: 'Claim Amount', value: claim.amount },
                ].map(({ label, value }) => (
                    <div className="modal-info-item" key={label}>
                        <div className="modal-info-label">{label}</div>
                        <div className="modal-info-value">{value}</div>
                    </div>
                ))}
            </div>

            {/* Checklist */}
            <div className="modal-checklist">
                <div className="modal-checklist-title">Claim Checklist</div>
                {[
                    'Death certificate submitted',
                    'Membership active at time of death',
                    'Waiting period cleared',
                    'No prior claim made on this beneficiary',
                    'KYC documents verified',
                ].map((item, i) => (
                    <div key={i} className="modal-checklist-item">
                        <span className="checklist-tick">✓</span> {item}
                    </div>
                ))}
            </div>

            {/* Action buttons */}
            {claim.status === 'Pending' && (
                <div className="modal-actions">
                    <button className="card-action-btn" style={{ background: '#16a34a', flex: 1 }}>✓ Approve Claim</button>
                    <button className="card-action-btn" style={{ background: '#dc2626', flex: 1 }}>✗ Reject Claim</button>
                </div>
            )}
        </div>
    </div>
);

// ── Main Component ──────────────────────────────────────────────────────────
const Applications: React.FC = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'All' | ClaimStatus>('All');
    const [selectedClaim, setSelectedClaim] = useState<ClaimProps | null>(null);

    const counts = {
        All: claims.length,
        Pending: claims.filter(c => c.status === 'Pending').length,
        Approved: claims.filter(c => c.status === 'Approved').length,
        Blocked: claims.filter(c => c.status === 'Blocked').length,
        Rejected: claims.filter(c => c.status === 'Rejected').length,
    };

    const filtered = claims.filter(c => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.claimRef.toLowerCase().includes(search.toLowerCase()) ||
            c.branch.toLowerCase().includes(search.toLowerCase()) ||
            c.claimType.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || c.status === filter;
        return matchSearch && matchFilter;
    });

    const filterBtns: { key: 'All' | ClaimStatus; color: string; bg: string }[] = [
        { key: 'All',      color: '#A80000', bg: '#fcebeb' },
        { key: 'Pending',  color: '#A80000', bg: '#fcebeb' },
        { key: 'Approved', color: '#16a34a', bg: '#f0fdf4' },
        { key: 'Blocked',  color: '#6b7280', bg: '#f3f4f6' },
        { key: 'Rejected', color: '#dc2626', bg: '#fef2f2' },
    ];

    return (
        <div className="grid-page-container">
            {/* Header row 1: title + search */}
            <div className="page-header" style={{ marginBottom: '0.75rem' }}>
                <h2 className="page-title">Claims Processing</h2>
                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search claims here"
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Header row 2: filter buttons + export */}
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
                    Export Excel/PDF
                </button>
            </div>

            {/* Claims list */}
            <div className="claims-list">
                {filtered.map((claim, i) => (
                    <div className="claim-row-card" key={i}>
                        <div className="claim-avatar" style={{ background: statusColors[claim.status] }}>
                            {claim.initials}
                        </div>

                        <div className="claim-info">
                            <div className="claim-name">{claim.name}</div>
                            <div className="claim-branch">{claim.branch}</div>
                        </div>

                        <div className="claim-ref-block">
                            <div className="claim-ref">{claim.claimRef}</div>
                            <div className="claim-type">{claim.claimType}</div>
                        </div>

                        {/* View link — left of the status badge */}
                        <button
                            className="claim-view-btn"
                            onClick={() => setSelectedClaim(claim)}
                        >
                            View
                        </button>

                        <button
                            className="claim-status-btn"
                            style={{ background: statusColors[claim.status] }}
                        >
                            {claim.status}
                        </button>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <p style={{ color: '#999', fontSize: '0.9rem', padding: '1rem' }}>
                        No claims match your search.
                    </p>
                )}
            </div>

            {/* Modal */}
            {selectedClaim && (
                <ClaimModal claim={selectedClaim} onClose={() => setSelectedClaim(null)} />
            )}

            {/* Print-only section: renders every filtered claim page by page */}
            <div className="print-only">
                {filtered.map((claim, idx) => (
                    <div key={`print-${idx}`} className="print-page modal-card" style={{ maxWidth: '100%', border: 'none', boxShadow: 'none' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">Claim Details</h2>
                        </div>

                        {/* Avatar + name */}
                        <div className="modal-avatar-row">
                            <div className="avatar-circle" style={{ background: statusColors[claim.status], width: 60, height: 60, fontSize: '1.2rem' }}>
                                {claim.initials}
                            </div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{claim.name}</div>
                                <div style={{ color: '#888', fontSize: '0.85rem' }}>{claim.memberId}</div>
                            </div>
                            <span className="modal-status-badge" style={{ background: statusColors[claim.status], color: 'white', padding: '0.35rem 1rem' }}>
                                {claim.status}
                            </span>
                        </div>

                        {/* Info grid */}
                        <div className="modal-info-grid">
                            {[
                                { label: 'Claim Reference', value: claim.claimRef },
                                { label: 'Claim Type', value: claim.claimType },
                                { label: 'Branch', value: claim.branch },
                                { label: 'Phone Number', value: claim.phone },
                                { label: 'ID / Omang Number', value: claim.idNumber },
                                { label: 'Join Date', value: claim.joinDate },
                                { label: 'Beneficiary', value: claim.beneficiary },
                                { label: 'Claim Amount', value: claim.amount },
                            ].map(({ label, value }) => (
                                <div className="modal-info-item" key={label} style={{ background: '#fafafa', border: '1px solid #eee' }}>
                                    <div className="modal-info-label">{label}</div>
                                    <div className="modal-info-value">{value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Checklist */}
                        <div className="modal-checklist" style={{ background: '#fcebeb' }}>
                            <div className="modal-checklist-title">Claim Checklist</div>
                            {[
                                'Death certificate submitted',
                                'Membership active at time of death',
                                'Waiting period cleared',
                                'No prior claim made on this beneficiary',
                                'KYC documents verified',
                            ].map((item, i) => (
                                <div key={i} className="modal-checklist-item">
                                    <span className="checklist-tick" style={{ color: '#A80000' }}>✓</span> {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Final Warning Page */}
                {filtered.length > 0 && (
                    <div className="print-page modal-card" style={{ maxWidth: '100%', border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
                        <div style={{ padding: '4rem 2rem', border: '3px solid #A80000', borderRadius: '0', background: '#fef2f2', margin: 'auto 0' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 8 8" style={{ color: '#A80000', marginBottom: '1.5rem', display: 'inline-block' }}>
                                <rect width="8" height="8" fill="none"/>
                                <path fill="currentColor" d="M4 6V5H3v1m1-2V2H3v2M0 7V6l3-6h1l3 6v1"/>
                            </svg>
                            <h2 style={{ color: '#A80000', fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidentiality Warning</h2>
                            
                            <p style={{ fontSize: '1.05rem', color: '#222', lineHeight: '1.7', marginBottom: '1.2rem', fontWeight: 700 }}>
                                The information contained in this document is strictly confidential and intended solely for the use of authorized personnel of <span style={{ color: '#A80000' }}>The Follower of Jesus Christ Church Funeral Policy</span>.
                            </p>
                            
                            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                                In the event that you are not the rightful and intended recipient, or if a printed copy of this document is misplaced or found by you, you must not take, use, distribute, copy, or capture any of the information herein for yourself or others. Unauthorized possession, distribution or retention is strictly prohibited and constitutes an offense punishable by law.
                            </p>
                            
                            <p style={{ fontSize: '0.95rem', color: '#444', lineHeight: '1.7', marginBottom: '4rem' }}>
                                All authorized personnel handling this document are required to kindly take utmost care in securing its contents at all times. Physical copies must be stored securely, and digital representations must remain properly encrypted.
                            </p>
                            
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ borderBottom: '2px solid #222', width: '240px', marginBottom: '0.5rem' }}></div>
                                    <div style={{ fontWeight: 700, color: '#222', fontSize: '0.85rem', textTransform: 'uppercase' }}>Authorized Signature</div>
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ borderBottom: '2px solid #222', width: '200px', marginBottom: '0.5rem' }}></div>
                                    <div style={{ fontWeight: 700, color: '#222', fontSize: '0.85rem', textTransform: 'uppercase' }}>Date</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Applications;
