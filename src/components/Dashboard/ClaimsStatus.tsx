import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import './ClaimsStatus.css';

const SubmitClaimIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 26 26">
        <rect width="26" height="26" fill="none" />
        <path fill="currentColor" d="M1 0C.449 0 0 .449 0 1v14c0 1.094.906 2 2 2h9.531a1 1 0 1 0 0-2H2V5h22v10h-3.5a1 1 0 1 0 0 2H24c1.094 0 2-.906 2-2V1c0-.551-.449-1-1-1zm3.219 7A1.004 1.004 0 0 0 4.5 9h8a1 1 0 1 0 0-2h-8a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m13 0a1.004 1.004 0 0 0 .281 2h4a1 1 0 1 0 0-2h-4a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m-13 3a1.004 1.004 0 0 0 .281 2h8a1 1 0 1 0 0-2h-8a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m16.625.5a.5.5 0 0 0-.188.156l-.562.563c-1.054.137-2.905 1.312-3.375 1.781l-5.313 5.313l2.344 2.343l5.313-5.312c.393-.394 1.653-2.398 1.75-3.469l.53-.531a.5.5 0 0 0-.437-.844zm-10.375 8.719l-3.844 3.843c-.48.48-.707 1.794-.063 2.438s1.819.493 2.407-.094l3.844-3.843zm4.469.968a.8.8 0 0 0-.47.25l-4.03 4a.8.8 0 1 0 1.124 1.125l4.032-4a.8.8 0 0 0-.656-1.375" />
    </svg>
);

interface ClaimRecord {
    id: string;
    type: string;
    beneficiary: string;
    dateSubmitted: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Required Action';
    amount: string;
}

const ClaimsStatus: React.FC = () => {
    const [claims] = useState<ClaimRecord[]>([
        {
            id: "#CLM-2024-00812",
            type: "Additional Member Death",
            beneficiary: "Mmoloki Modise (Parent)",
            dateSubmitted: "March 10, 2024",
            status: "Pending",
            amount: "P15,000.00"
        },
        {
            id: "#CLM-2023-00456",
            type: "Child Dependent Death",
            beneficiary: "Lebo Modise (Child)",
            dateSubmitted: "August 15, 2023",
            status: "Approved",
            amount: "P5,000.00"
        }
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return '#16a34a';
            case 'Pending': return '#f59e0b';
            case 'Rejected': return '#dc2626';
            case 'Required Action': return '#A80000';
            default: return '#666';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Approved': return null;
            case 'Pending': return null;
            case 'Rejected': return <AlertCircle size={16} />;
            case 'Required Action': return <FileText size={16} />;
            default: return null;
        }
    };

    return (
        <div className="claims-status-container">
            <div className="claims-header">
                <div>
                    <h2 className="page-title">Claims History & Status</h2>
                    <p className="page-subtitle">Track and manage your funeral policy claims</p>
                </div>
                <button className="new-claim-btn" style={{ gap: '0.5rem' }}>
                    <SubmitClaimIcon size={22} /> Submit New Claim
                </button>
            </div>

            <div className="claims-grid">
                {claims.map((claim) => (
                    <div className="claim-status-card" key={claim.id}>
                        <div className="claim-card-header">
                            <div className="claim-id">{claim.id}</div>
                            <div 
                                className="status-badge" 
                                style={{ 
                                    background: `${getStatusColor(claim.status)}15`, 
                                    color: getStatusColor(claim.status) 
                                }}
                            >
                                {getStatusIcon(claim.status)} {claim.status}
                            </div>
                        </div>

                        <div className="claim-card-body">
                            <div className="claim-info-row">
                                <span className="info-label">Claim Type:</span>
                                <span className="info-value">{claim.type}</span>
                            </div>
                            <div className="claim-info-row">
                                <span className="info-label">Beneficiary:</span>
                                <span className="info-value">{claim.beneficiary}</span>
                            </div>
                            <div className="claim-info-row">
                                <span className="info-label">Date Submitted:</span>
                                <span className="info-value">{claim.dateSubmitted}</span>
                            </div>
                            <div className="claim-info-row">
                                <span className="info-label">Benefit Amount:</span>
                                <span className="info-value" style={{ fontWeight: 800, color: '#222' }}>{claim.amount}</span>
                            </div>
                        </div>

                        <div className="claim-card-footer">
                            <button 
                                className={`claim-action-btn ${claim.status === 'Approved' ? 'claimed' : 'primary'}`} 
                                style={{ width: '100%' }}
                                disabled={claim.status === 'Approved'}
                            >
                                {claim.status === 'Approved' ? 'Claimed' : 'Edit Claim'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Information Card */}
            <div className="claim-info-notice" style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <AlertCircle size={22} color="#888" />
                    <h4 style={{ margin: 0 }}>Important Claim Processing Information</h4>
                </div>
                <div style={{ marginLeft: '1.95rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                        Claims are usually processed within 24-48 hours after all required documents are submitted. Ensure you have the original Death Certificate and ID copies of the principal member.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClaimsStatus;
