import React, { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import './SupportQueries.css';

const PhoneIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none" />
        <path fill="currentColor" d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z" />
    </svg>
);

const EmailIcon = ({ size = 24 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none" />
        <path fill="currentColor" d="M22 4H2v16h20zm-2 4l-8 5l-8-5V6l8 5l8-5z" />
    </svg>
);

const SendMessageIcon = ({ size = 18 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16">
        <rect width="16" height="16" fill="none" />
        <defs>
            <path id="paperPlanePath" d="M12.97 2.67a.5.5 0 0 0-.64-.64l-11 4a.5.5 0 0 0-.016.934l4.433 1.773l2.9-3.09l.707.707l-2.98 3.176l1.662 4.156a.5.5 0 0 0 .934-.015z" />
        </defs>
        <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
            <use href="#paperPlanePath" />
            <use href="#paperPlanePath" />
        </g>
    </svg>
);

interface QueryRecord {
    id: string;
    subject: string;
    description: string;
    dateSubmitted: string;
    status: 'Pending Review' | 'Resolved' | 'Escalated';
    lastResponse?: string;
}

const SupportQueries: React.FC = () => {
    const [showNewQueryForm, setShowNewQueryForm] = useState(false);
    const [queries] = useState<QueryRecord[]>([
        {
            id: "#TCA-2024-001",
            subject: "ITU Region 1 Compliance Check",
            description: "Submitting technical documentation for the Nokia AirScale 5G Base Station for ITU Region 1 spectral efficiency verification.",
            dateSubmitted: "March 08, 2024",
            status: "Pending Review"
        },
        {
            id: "#TCA-2024-002",
            subject: "Terminal Type Approval",
            description: "Samsung Galaxy S24 Ultra - Declaration of Conformity and SAR testing results attached.",
            dateSubmitted: "February 20, 2024",
            status: "Resolved",
            lastResponse: "Certification Issued: BOC-TA-2024-S24U. Your digital certificate is now available in the vault."
        }
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Resolved': return '#16a34a';
            case 'Pending Review': return '#f59e0b';
            case 'Escalated': return '#A80000';
            default: return '#666';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Resolved': return null;
            case 'Pending Review': return null;
            case 'Escalated': return <AlertTriangle size={16} />;
            default: return null;
        }
    };

    return (
        <div className="support-queries-container">
            <div className="support-header">
                <div>
                    <h2 className="page-title">Technical Certification Vault</h2>
                    <p className="page-subtitle">Submit ITU Region 1 certificates and Declarations of Conformity</p>
                </div>
                {!showNewQueryForm && (
                    <button className="new-query-btn" onClick={() => setShowNewQueryForm(true)}>
                        <Plus size={20} /> New Approval Request
                    </button>
                )}
            </div>

            {showNewQueryForm ? (
                <div className="query-form-card">
                    <div className="form-header">
                        <h3>Submit New Equipment Approval</h3>
                        <p>Our technical lab will review your compliance docs within 5–14 days.</p>
                    </div>
                    <div className="query-form-content">
                        <div className="form-group">
                            <label>Approval Type</label>
                            <select className="query-input">
                                <option>Type Approval request</option>
                                <option>Declaration of Conformity</option>
                                <option>ITU Compliance Waiver</option>
                                <option>SAR Testing Results</option>
                                <option>Local Repair Center Verification</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Technical Specifications (Brief)</label>
                            <textarea 
                                className="query-input" 
                                rows={5} 
                                placeholder="Include frequency range, output power, and ITU standards met..."
                            ></textarea>
                        </div>
                        <div className="form-actions">
                            <button className="submit-query-btn">
                                <SendMessageIcon size={18} /> Submit Documents
                            </button>
                            <button className="cancel-query-btn" onClick={() => setShowNewQueryForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="queries-grid">
                    {queries.map((query) => (
                        <div className="query-card" key={query.id}>
                            <div className="query-card-header">
                                <div className="query-id">{query.id}</div>
                                <div 
                                    className="status-badge" 
                                    style={{ 
                                        background: `${getStatusColor(query.status)}15`, 
                                        color: getStatusColor(query.status) 
                                    }}
                                >
                                    {getStatusIcon(query.status)} {query.status}
                                </div>
                            </div>

                            <div className="query-card-body">
                                <h4 className="query-subject">{query.subject}</h4>
                                <p className="query-desc">{query.description}</p>
                                <div className="query-meta">
                                    <span className="query-date">Submitted: {query.dateSubmitted}</span>
                                </div>
                                {query.lastResponse && (
                                    <div className="query-response">
                                        <strong>Latest Lab Response:</strong>
                                        <p>{query.lastResponse}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Contact Support Section */}
            <div className="contact-methods-grid">
                <div className="contact-card">
                    <div style={{ color: '#A80000' }}>
                        <PhoneIcon size={24} />
                    </div>
                    <div>
                        <h5>Technical Lab</h5>
                        <p>+267 368 5500</p>
                    </div>
                </div>
                <div className="contact-card">
                    <div style={{ color: '#A80000' }}>
                        <EmailIcon size={24} />
                    </div>
                    <div>
                        <h5>Email Lab</h5>
                        <p>typeapproval@bocra.org.bw</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportQueries;
