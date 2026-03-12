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
    const [history] = useState<PaymentHistory[]>([
        { id: "#INV-98210", date: "March 01, 2024", description: "Monthly Premium - March", amount: "P120.00", status: "Paid" },
        { id: "#INV-97542", date: "February 01, 2024", description: "Monthly Premium - February", amount: "P120.00", status: "Paid" },
        { id: "#INV-96831", date: "January 01, 2024", description: "Monthly Premium - January", amount: "P120.00", status: "Paid" },
        { id: "#INV-94210", date: "September 01, 2023", description: "Annual Admin Fee", amount: "P15.00", status: "Paid" },
    ]);

    return (
        <div className="member-payments-container">
            <div className="payments-header">
                <div>
                    <h2 className="page-title">Payments & Billing</h2>
                    <p className="page-subtitle">Manage your policy premiums and view billing history</p>
                </div>
                {!showPaymentForm && (
                    <button className="pay-now-btn" onClick={() => setShowPaymentForm(true)}>
                        <MakePaymentIcon size={20} /> Make a Payment
                    </button>
                )}
            </div>

            {showPaymentForm ? (
                <div className="payment-form-card animate-fadeIn">
                    <div className="form-header">
                        <h3>Policy Payment</h3>
                        <p>Transfer your policy payment using the banking details below.</p>
                    </div>

                    <div className="bank-details-grid">
                        <div className="bank-card">
                            <div className="bank-logo-label">FNB</div>
                            <div className="bank-info-item">
                                <span className="label">Account Name:</span>
                                <span className="value">The Follower of Jesus Christ Church Funeral Policy</span>
                            </div>
                            <div className="bank-info-item">
                                <span className="label">Account Number:</span>
                                <span className="value">6224 5589 102 (DEMO)</span>
                            </div>
                            <div className="bank-info-item">
                                <span className="label">Branch Code:</span>
                                <span className="value">280167</span>
                            </div>
                            <div className="bank-info-item">
                                <span className="label">Reference:</span>
                                <span className="value">TFJ-2024-08812</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-disclaimer">
                        <p><strong>Please Note:</strong> These banking details are for demonstration purposes only and shall soon be revised. Do not make actual payments to these accounts.</p>
                    </div>

                    <div style={{ marginTop: '2rem' }}>
                        <div className="form-group">
                            <label>Amount to Pay (P)</label>
                            <input type="text" className="query-input" placeholder="e.g. 120.00" defaultValue="120.00" />
                        </div>
                        <div className="form-group" style={{ marginTop: '1rem' }}>
                            <label>Upload Proof of Payment (Optional)</label>
                            <input type="file" className="query-input" />
                        </div>
                        <div className="form-actions" style={{ marginTop: '2rem' }}>
                            <button className="submit-query-btn" onClick={() => setShowPaymentForm(false)}>
                                Confirm Payment Submission
                            </button>
                            <button className="cancel-query-btn" onClick={() => setShowPaymentForm(false)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {/* Quick Stats Grid */}
                    <div className="payments-stats-grid">
                        <div className="pay-stat-card">
                            <div className="stat-content">
                                <span className="stat-label">Next Payment Due</span>
                                <h4 className="stat-value">April 01, 2024</h4>
                            </div>
                        </div>
                        <div className="pay-stat-card">
                            <div className="stat-content">
                                <span className="stat-label">Monthly Premium</span>
                                <h4 className="stat-value">P120.00</h4>
                            </div>
                        </div>
                        <div className="pay-stat-card">
                            <div className="stat-content">
                                <span className="stat-label">Account Status</span>
                                <h4 className="stat-value" style={{ color: '#222' }}>Up to Date</h4>
                            </div>
                        </div>
                    </div>

                    <div className="history-section">
                        <div className="section-header">
                            <h3>Payment History</h3>
                            <button className="statement-btn">
                                <ReceiptIcon size={16} /> Download Statement
                            </button>
                        </div>
                        
                        <div className="history-table-wrapper">
                            <table className="history-table">
                                <thead>
                                    <tr>
                                        <th>REFERENCE</th>
                                        <th>DATE</th>
                                        <th>DESCRIPTION</th>
                                        <th>AMOUNT</th>
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
                                                    <ReceiptIcon size={14} /> Receipt
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Payment Methods / Info */}
                    <div className="billing-info-notice">
                        <div className="notice-header">
                            <div className="info-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                </svg>
                            </div>
                            <h4>Auto-Payment Information</h4>
                        </div>
                        <p>Your premiums are currently set to be collected via Debit Order on the 1st of every month. Please ensure sufficient funds are available to maintain your cover.</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default MemberPayments;
