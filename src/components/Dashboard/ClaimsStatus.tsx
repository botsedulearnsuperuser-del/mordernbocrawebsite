import React, { useState } from 'react';
import { AlertCircle, X, ArrowRight, ArrowLeft, UploadCloud } from 'lucide-react';
import './ClaimsStatus.css';

const SubmitClaimIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 26 26">
        <rect width="26" height="26" fill="none" />
        <path fill="currentColor" d="M1 0C.449 0 0 .449 0 1v14c0 1.094.906 2 2 2h9.531a1 1 0 1 0 0-2H2V5h22v10h-3.5a1 1 0 1 0 0 2H24c1.094 0 2-.906 2-2V1c0-.551-.449-1-1-1zm3.219 7A1.004 1.004 0 0 0 4.5 9h8a1 1 0 1 0 0-2h-8a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m13 0a1.004 1.004 0 0 0 .281 2h4a1 1 0 1 0 0-2h-4a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m-13 3a1.004 1.004 0 0 0 .281 2h8a1 1 0 1 0 0-2h-8a1 1 0 0 0-.094 0a1 1 0 0 0-.093 0a1 1 0 0 0-.094 0m16.625.5a.5.5 0 0 0-.188.156l-.562.563c-1.054.137-2.905 1.312-3.375 1.781l-5.313 5.313l2.344 2.343l5.313-5.312c.393-.394 1.653-2.398 1.75-3.469l.53-.531a.5.5 0 0 0-.437-.844zm-10.375 8.719l-3.844 3.843c-.48.48-.707 1.794-.063 2.438s1.819.493 2.407-.094l3.844-3.843zm4.469.968a.8.8 0 0 0-.47.25l-4.03 4a.8.8 0 1 0 1.124 1.125l4.032-4a.8.8 0 0 0-.656-1.375" />
    </svg>
);

const ClaimsStatus: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAuction, setSelectedAuction] = useState<any>(null);
    const [bids, setBids] = useState<any[]>([
        {
            id: "#BID-2024-001",
            type: "5G Spectrum Auction (700MHz)",
            lead: "Mascom Wireless",
            dateSubmitted: "March 10, 2024",
            status: "Bidding Active",
            amount: "BWP12,000,000"
        },
        {
            id: "#BID-2023-002",
            type: "4G Frequency Expansion (1800MHz)",
            lead: "Orange Botswana",
            dateSubmitted: "August 15, 2023",
            status: "Winner Identified",
            amount: "BWP8,500,000"
        }
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Winner Identified': return '#16a34a';
            case 'Bidding Active': return '#3b82f6';
            case 'Rejected': return '#dc2626';
            case 'Deposit Required': return '#A80000';
            default: return '#666';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Winner Identified': return null;
            case 'Bidding Active': return null;
            case 'Rejected': return <AlertCircle size={16} />;
            case 'Deposit Required': return null;
            default: return null;
        }
    };

    return (
        <div className="claims-status-container">
            <div className="claims-header">
                <div>
                    <h2 className="page-title">Spectrum Bidding & Auctions</h2>
                    <p className="page-subtitle">Participate in national frequency allocation lotteries</p>
                </div>
                <button className="new-claim-btn" style={{ gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
                    <SubmitClaimIcon size={22} /> Participate in Auction
                </button>
            </div>

            <div className="claims-grid">
                {bids.map((bid) => (
                    <div className="claim-status-card" key={bid.id}>
                        <div className="claim-card-header">
                            <div className="claim-id">{bid.id}</div>
                            <div 
                                className="status-badge" 
                                style={{ 
                                    background: `${getStatusColor(bid.status)}15`, 
                                    color: getStatusColor(bid.status) 
                                }}
                            >
                                {getStatusIcon(bid.status)} {bid.status}
                            </div>
                        </div>

                        <div className="claim-card-body">
                            <div className="claim-info-row">
                                <span className="info-label">Auction Type:</span>
                                <span className="info-value">{bid.type}</span>
                            </div>
                            <div className="claim-info-row">
                                <span className="info-label">Technical Lead:</span>
                                <span className="info-value">{bid.lead}</span>
                            </div>
                            <div className="claim-info-row">
                                <span className="info-label">Last Bid Date:</span>
                                <span className="info-value">{bid.dateSubmitted}</span>
                            </div>
                            <div className="claim-info-row">
                                <span className="info-label">Current High Bid:</span>
                                <span className="info-value" style={{ fontWeight: 800, color: '#222' }}>{bid.amount}</span>
                            </div>
                        </div>

                        <div className="claim-card-footer">
                            <button 
                                className={`claim-action-btn ${bid.status === 'Winner Identified' ? 'claimed' : 'primary'}`} 
                                style={{ width: '100%' }}
                            >
                                {bid.status === 'Winner Identified' ? 'Auction Closed' : 'Place New Bid'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Information Card */}
            <div className="claim-info-notice" style={{ display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <AlertCircle size={22} color="#888" />
                    <h4 style={{ margin: 0 }}>Auction Rules & Deposits</h4>
                </div>
                <div style={{ marginLeft: '1.95rem' }}>
                    <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                        All participants must have a valid NFP License. A security deposit of BWP 50,000 is required for high-demand bands (5G/700MHz). Bidding follows the simultaneous multiple-round ascending price format.
                    </p>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={() => { setIsModalOpen(false); setSelectedAuction(null); }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {selectedAuction && (
                                    <button className="back-btn" onClick={() => setSelectedAuction(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#666' }}>
                                        <ArrowLeft size={20} />
                                    </button>
                                )}
                                <h3>{selectedAuction ? 'Application Form' : 'Ongoing Auctions'}</h3>
                            </div>
                            <button className="close-btn" onClick={() => { setIsModalOpen(false); setSelectedAuction(null); }}><X size={20} /></button>
                        </div>
                        <div className="modal-body">
                            {!selectedAuction ? (
                                <>
                                    <p className="modal-desc">Select an ongoing frequency allocation lot or auction to participate in. Ensure your NFP License tier matches the eligibility requirements.</p>
                                    
                                    <div className="auction-list">
                                {[
                                    { id: 'AUC-2024-005', type: '5G Spectrum Allocation (3.5GHz)', deadline: 'April 15, 2024', basePrice: 'BWP 25,000,000', highestBid: 'BWP 28,500,000', highestBidder: 'Mas*** Wireless', eligibility: 'NFP Tier 1' },
                                    { id: 'AUC-2024-006', type: 'Rural Broadband Band (700MHz)', deadline: 'May 02, 2024', basePrice: 'BWP 5,000,000', highestBid: 'BWP 5,200,000', highestBidder: 'Ana*** Bidder', eligibility: 'NFP Tier 1 & 2' }
                                ].map((auction, idx) => (
                                    <div key={idx} className="auction-item">
                                        <div className="auction-item-left">
                                            <div className="auction-id">{auction.id}</div>
                                            <div className="auction-type">{auction.type}</div>
                                            <div className="auction-details">
                                                <span><strong>Base Price:</strong> {auction.basePrice}</span>
                                                <span style={{ color: '#A80000' }}><strong>Current Highest Bid:</strong> {auction.highestBid} ({auction.highestBidder})</span>
                                                <span><strong>Deadline:</strong> {auction.deadline}</span>
                                                <span><strong>Eligibility:</strong> <span className="eligibility-tag">{auction.eligibility}</span></span>
                                            </div>
                                        </div>
                                        <div className="auction-item-right">
                                            <button className="apply-btn" onClick={() => setSelectedAuction(auction)}>
                                                Apply <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </>
                            ) : (
                                <div className="auction-form">
                                    <div className="form-auction-summary" style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '1px solid #eee' }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{selectedAuction.type}</h4>
                                        <div style={{ fontSize: '0.85rem', color: '#666', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                                            <span><strong>ID:</strong> {selectedAuction.id}</span>
                                            <span><strong>Base Price:</strong> {selectedAuction.basePrice}</span>
                                            <span style={{ color: '#A80000' }}><strong>Current Highest Bid:</strong> {selectedAuction.highestBid} ({selectedAuction.highestBidder})</span>
                                            <span><strong>Eligibility:</strong> {selectedAuction.eligibility}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                        <div className="form-group">
                                            <label>Applicant / Operating Company</label>
                                            <input type="text" placeholder="Enter full registered company name" defaultValue="BOCRA Licensed Client" />
                                        </div>

                                        <div className="form-group">
                                            <label>Current NFP License Tier</label>
                                            <select defaultValue="">
                                                <option value="" disabled>Select your license tier</option>
                                                <option value="tier1">NFP Tier 1</option>
                                                <option value="tier2">NFP Tier 2</option>
                                                <option value="sap">SAP License</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Initial Bid Amount (BWP)</label>
                                            <div style={{ position: 'relative' }}>
                                                <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#666', fontWeight: 600 }}>BWP</span>
                                                <input type="text" placeholder="0.00" defaultValue={selectedAuction.highestBid.replace('BWP ', '')} style={{ paddingLeft: '3.5rem', width: '100%', boxSizing: 'border-box' }} />
                                            </div>
                                            <span style={{ fontSize: '0.75rem', color: '#888' }}>Must be greater than the current highest bid setup for this lot.</span>
                                        </div>

                                        <div className="form-group">
                                            <label>Technical & Financial Proposal</label>
                                            <div className="file-upload-input" style={{ padding: '1rem' }}>
                                                <UploadCloud size={24} style={{ marginBottom: '0.5rem', color: '#A80000' }} />
                                                <div style={{ fontSize: '0.8rem' }}>Click to upload proposal</div>
                                                <div style={{ fontSize: '0.7rem', color: '#999' }}>PDF or ZIP up to 50MB</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-actions">
                                        <button className="btn-secondary" onClick={() => setSelectedAuction(null)}>Cancel</button>
                                        <button className="btn-primary" onClick={() => {
                                            const newBid = {
                                                id: `#BID-2024-00${bids.length + 3}`,
                                                type: selectedAuction.type,
                                                lead: "Client User",
                                                dateSubmitted: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                                                status: "Deposit Required",
                                                amount: selectedAuction.basePrice
                                            };
                                            setBids([newBid, ...bids]);
                                            setIsModalOpen(false);
                                            setSelectedAuction(null);
                                        }}>
                                            Submit Application
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClaimsStatus;
