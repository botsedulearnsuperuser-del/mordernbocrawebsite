import React, { useState } from 'react';
import './MemberPayments.css';

interface PaymentHistory {
    id: string;
    date: string;
    description: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Failed';
    receipt?: string;
}

const ReceiptIcon = ({ size = 16 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none" />
        <path fill="currentColor" d="M5 20h14v-2H5zM19 9h-4V3H9v6H5l7 7z" />
    </svg>
);

const MakePaymentIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none" />
        <path fill="currentColor" d="M2 4h20v2H2zm0 14h20v2H2zM2 6h2v12H2zm18 0h2v12h-2zM4 8h16v4H4zm2 6h6v2H6z" />
    </svg>
);

const MemberPayments: React.FC = () => {
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [history] = useState<any[]>([
        { id: "#LAB-98210", date: "March 01, 2024", description: "Standard Compliance Sticker (Batch 50)", amount: "Approved", status: "Paid" },
        { id: "#LAB-97542", date: "February 01, 2024", description: "BOCRA QR Code License (Digital)", amount: "Approved", status: "Paid" },
        { id: "#LAB-96831", date: "January 01, 2024", description: "Type Approval Embossment Design", amount: "Approved", status: "Paid" },
        { id: "#LAB-94210", date: "September 01, 2023", description: "Renewal Hologram (Pack 100)", amount: "Approved", status: "Paid" },
    ]);

    return (
        <div className="member-payments-container">
            <div className="print-only">
                <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #A80000' }}>
                    <img src="/assets/bocralogo.png" alt="BOCRA Logo" style={{ width: '150px', marginBottom: '1rem' }} />
                    <h1 style={{ color: '#222', margin: 0, fontSize: '1.8rem' }}>Botswana Communications Regulatory Authority</h1>
                    <p style={{ margin: '0.5rem 0', fontWeight: 600, fontSize: '1.1rem' }}>BOCRA Official Compliance Label</p>
                </div>
            </div>
            <div className="payments-header">
                <div>
                    <h2 className="page-title">Compliance Label Generator</h2>
                    <p className="page-subtitle">Generate official BOCRA labels for approved equipment packaging</p>
                </div>
                {!showPaymentForm && (
                    <button className="pay-now-btn" onClick={() => setShowPaymentForm(true)}>
                        <MakePaymentIcon size={20} /> Generate New Label
                    </button>
                )}
            </div>

            {showPaymentForm ? (
                <div className="payment-form-card animate-fadeIn">
                    <div className="form-header">
                        <h3>Label Specifications</h3>
                        <p>Select the approved equipment to generate a compliance label.</p>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <div className="form-group">
                            <label>Select Approved Model</label>
                            <select className="query-input">
                                <option>Samsung Galaxy S24 Ultra (BOC-TA-2024-S24U)</option>
                                <option>Cisco Catalyst 9300 (BOC-TA-2023-CS93)</option>
                                <option>Nokia AirScale 5G (BOC-TA-2024-NAS5)</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label>Label Format</label>
                            <select className="query-input">
                                <option>Standard Physical Sticker (40x20mm)</option>
                                <option>Digital QR Code (Vector)</option>
                                <option>E-Label for OS Display</option>
                                <option>Product Embossment Map</option>
                            </select>
                        </div>
                        <div className="form-actions" style={{ marginTop: '2rem' }}>
                            <button className="submit-query-btn" onClick={() => setShowPaymentForm(false)}>
                                <ReceiptIcon size={18} /> Generate & Download
                            </button>
                            <button className="cancel-query-btn" onClick={() => setShowPaymentForm(false)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="payments-stats-grid">
                        <div className="pay-stat-card">
                            <div className="stat-content">
                                <span className="stat-label">Labels Generated (MTD)</span>
                                <h4 className="stat-value">1,450</h4>
                            </div>
                        </div>
                        <div className="pay-stat-card">
                            <div className="stat-content">
                                <span className="stat-label">Active Approvals</span>
                                <h4 className="stat-value">24</h4>
                            </div>
                        </div>
                        <div className="pay-stat-card">
                            <div className="stat-content">
                                <span className="stat-label">Certification Status</span>
                                <h4 className="stat-value" style={{ color: '#A80000' }}>Compliant</h4>
                            </div>
                        </div>
                    </div>

                    <div className="history-section">
                        <div className="section-header">
                            <h3>Label History</h3>
                            <button className="statement-btn">
                                <ReceiptIcon size={16} /> Asset Inventory
                            </button>
                        </div>
                        
                        <div className="history-table-wrapper">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>LABEL ID</th>
                                        <th>GEN DATE</th>
                                        <th>DESCRIPTION</th>
                                        <th>RESULT</th>
                                        <th>STATUS</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item) => (
                                        <tr key={item.id}>
                                            <td className="ref-cell">{item.id}</td>
                                            <td>{item.date}</td>
                                            <td>{item.description}</td>
                                            <td className="amount-cell">{item.amount}</td>
                                            <td>
                                                <span className={`status-tag ${item.status.toLowerCase()}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="receipt-btn">
                                                    <ReceiptIcon size={14} /> Download
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="billing-info-notice">
                        <div className="notice-header">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                </svg>
                            </div>
                            <h4>Labeling Standards</h4>
                        </div>
                        <p>All communication equipment sold in Botswana MUST display the official BOCRA compliance label. Failure to label products according to the "Type Approval Guidelines 2024" attracts administrative fines. QR codes must lead to the official BOCRA certificate verification path.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MemberPayments;
