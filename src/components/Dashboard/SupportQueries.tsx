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
            id: "#QRY-2024-00124",
            subject: "Waiting period clarification",
            description: "I would like to know if the waiting period for my spouse has been reduced since we upgraded our plan two months ago.",
            dateSubmitted: "March 08, 2024",
            status: "Pending Review"
        },
        {
            id: "#QRY-2024-00082",
            subject: "Membership card replacement",
            description: "I lost my physical membership card and would like to request a new one for my principal member account.",
            dateSubmitted: "February 20, 2024",
            status: "Resolved",
            lastResponse: "Your new card has been printed and is ready for collection at the Gaborone branch."
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
                    <h2 className="page-title">Support & Queries</h2>
                    <p className="page-subtitle">We're here to help with any policy concerns</p>
                </div>
                {!showNewQueryForm && (
                    <button className="new-query-btn" onClick={() => setShowNewQueryForm(true)}>
                        <Plus size={20} /> New Support Ticket
                    </button>
                )}
            </div>

            {showNewQueryForm ? (
                <div className="query-form-card">
                    <div className="form-header">
                        <h3>Submit a New Query</h3>
                        <p>Our team will review your ticket and respond within 24 hours.</p>
                    </div>
                    <div className="query-form-content">
                        <div className="form-group">
                            <label>Subject / Topic</label>
                            <select className="query-input">
                                <option>Policy Upgrade/Downgrade</option>
                                <option>Dependent Updates</option>
                                <option>Waiting Period Status</option>
                                <option>Payment Discrepancy</option>
                                <option>General Inquiry</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description of Issue</label>
                            <textarea 
                                className="query-input" 
                                rows={5} 
                                placeholder="Please provide as much detail as possible..."
                            ></textarea>
                        </div>
                        <div className="form-actions">
                            <button className="submit-query-btn">
                                <SendMessageIcon size={18} /> Send Message
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
                                        <strong>Latest Response:</strong>
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
                        <h5>Call Support</h5>
                        <p>+267 312 3456</p>
                    </div>
                </div>
                <div className="contact-card">
                    <div style={{ color: '#A80000' }}>
                        <EmailIcon size={24} />
                    </div>
                    <div>
                        <h5>Email Us</h5>
                        <p>support@tfjfuneral.co.bw</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportQueries;
