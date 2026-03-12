import React from 'react';
import { Users, CreditCard, FileText, Download, AlertCircle } from 'lucide-react';
import './MyPolicy.css';

const DownloadIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none" />
        <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" />
    </svg>
);

const MyPolicy: React.FC = () => {
    const policyData = {
        policyNumber: "TFJ-2024-08812",
        planType: "Family Premium Plan",
        status: "Active (Waiting Period)",
        sumAssured: "P15,000.00",
        premium: "P120.00 / month",
        effectiveDate: "March 15, 2024",
        nextPayment: "April 01, 2026",
    };

    const principalMember = {
        name: "Kefilwe Modise",
        id: "98011234567",
        phone: "+267 71234567",
        email: "k.modise@demo.com",
        branch: "Gaborone Branch"
    };

    const dependents = [
        { name: "Boitumelo Modise", relationship: "Spouse", id: "95101234567", status: "Covered" },
        { name: "Naledi Modise", relationship: "Child", id: "BC-2020-1123", status: "Covered" },
        { name: "Thabo Modise", relationship: "Child", id: "BC-2022-4456", status: "Covered" },
        { name: "Mmoloki Modise", relationship: "Parent", id: "60051234567", status: "Waiting Period" },
    ];

    const [showCreateForm, setShowCreateForm] = React.useState(false);
    const [formDependents, setFormDependents] = React.useState([{ id: Date.now() }]);

    const addDependent = () => {
        setFormDependents([...formDependents, { id: Date.now() }]);
    };

    return (
        <div className="my-policy-container">
            <div className="no-print">
            <div className="policy-header-row">
                <div>
                    <h2 className="page-title">{policyData.planType}</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="policy-btn-outline" style={{ width: 'auto' }} onClick={() => setShowCreateForm(!showCreateForm)}>
                        {showCreateForm ? 'Back to Policy' : 'Create Policy'}
                    </button>
                    {!showCreateForm && (
                        <button className="policy-btn-outline" style={{ width: 'auto' }} onClick={() => window.print()}>
                            <DownloadIcon size={18} /> Download Policy PDF
                        </button>
                    )}
                </div>
            </div>

            {showCreateForm ? (
                <div className="policy-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h3 className="policy-card-title">Apply for a New Policy</h3>
                    <div className="reg-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                            <input type="text" className="signin-input" style={{ width: '100%' }} placeholder="e.g. Kefilwe Modise" />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Omang / ID Number</label>
                            <input type="text" className="signin-input" style={{ width: '100%' }} placeholder="National ID" />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                            <input type="tel" className="signin-input" style={{ width: '100%' }} placeholder="+267..." />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Selected Branch</label>
                            <select className="signin-input" style={{ width: '100%' }}>
                                <option>Gaborone</option>
                                <option>Francistown</option>
                                <option>Palapye</option>
                                <option>Serowe</option>
                                <option>Maun</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Policy Plan Type</label>
                            <select className="signin-input" style={{ width: '100%' }}>
                                <option>Single Premium Plan</option>
                                <option>Family Premium Plan</option>
                                <option>Extended Family Plan</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Sum Assured (Cover Amount)</label>
                            <select className="signin-input" style={{ width: '100%' }}>
                                <option>P10,000.00</option>
                                <option>P15,000.00</option>
                                <option>P20,000.00</option>
                                <option>P25,000.00</option>
                                <option>P30,000.00</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Proof of Identity / Omang</label>
                            <input type="file" className="signin-input" style={{ width: '100%', paddingTop: '8px' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', borderTop: '2px dashed #eee', paddingTop: '2rem' }}>
                        <h4 className="detail-label" style={{ marginBottom: '1rem', color: '#A80000' }}>Dependents & Beneficiaries</h4>
                        
                        {formDependents.map((dep, index) => (
                            <div key={dep.id} className="reg-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div className="form-group">
                                    <label className="detail-label" style={{ fontSize: '0.65rem' }}>Full Name</label>
                                    <input type="text" className="signin-input" style={{ width: '100%', padding: '0.5rem 0.8rem' }} placeholder="Relationship Name" />
                                </div>
                                <div className="form-group">
                                    <label className="detail-label" style={{ fontSize: '0.65rem' }}>Relationship</label>
                                    <select className="signin-input" style={{ width: '100%', padding: '0.5rem 0.8rem' }}>
                                        <option>Spouse</option>
                                        <option>Child</option>
                                        <option>Parent</option>
                                        <option>Sibling</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="detail-label" style={{ fontSize: '0.65rem' }}>Status</label>
                                    <select className="signin-input" style={{ width: '100%', padding: '0.5rem 0.8rem', background: '#f9f9f9' }} disabled>
                                        <option>Waiting Period</option>
                                    </select>
                                </div>
                            </div>
                        ))}

                        <button 
                            className="policy-btn-outline" 
                            style={{ padding: '0.5rem', fontSize: '0.75rem', width: 'auto', marginBottom: '2rem' }}
                            onClick={addDependent}
                        >
                            + Add Another Dependent
                        </button>
                    </div>
                    <div className="form-actions" style={{ display: 'flex', gap: '1rem' }}>
                        <button className="action-btn-red" style={{ flex: 1, padding: '1rem' }}>Submit Policy Application</button>
                        <button className="policy-btn-outline" style={{ flex: 1 }} onClick={() => setShowCreateForm(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="policy-grid">
                <div className="left-column">
                    {/* Policy Summary */}
                    <div className="policy-card">
                        <h3 className="policy-card-title">
                            Policy Summary
                        </h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Policy Number</span>
                                <span className="detail-value">{policyData.policyNumber}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span className="detail-value" style={{ color: '#A80000' }}>{policyData.status}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Effective Date</span>
                                <span className="detail-value">{policyData.effectiveDate}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Sum Assured</span>
                                <span className="detail-value">{policyData.sumAssured}</span>
                            </div>
                        </div>
                    </div>

                    {/* Member Details */}
                    <div className="policy-card">
                        <h3 className="policy-card-title">
                            Principal Member Details
                        </h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Full Name</span>
                                <span className="detail-value">{principalMember.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">National ID</span>
                                <span className="detail-value">{principalMember.id}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Phone</span>
                                <span className="detail-value">{principalMember.phone}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Branch</span>
                                <span className="detail-value">{principalMember.branch}</span>
                            </div>
                        </div>
                    </div>

                    {/* Dependents Table */}
                    <div className="policy-card">
                        <h3 className="policy-card-title">
                            Dependents & Beneficiaries
                        </h3>
                        <table className="dependents-table">
                            <thead>
                                <tr>
                                    <th>FULL NAME</th>
                                    <th>RELATIONSHIP</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dependents.map((dep, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{dep.name}</td>
                                        <td>{dep.relationship}</td>
                                        <td>
                                            <span style={{ 
                                                color: dep.status === 'Covered' ? '#16a34a' : '#f97316',
                                                fontWeight: 700,
                                                fontSize: '0.8rem'
                                            }}>
                                                {dep.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="right-column">
                    {/* Payment Info */}
                    <div className="policy-card">
                        <h3 className="policy-card-title">
                            Billing Overview
                        </h3>
                        <div className="detail-item" style={{ marginBottom: '1rem' }}>
                            <span className="detail-label">Monthly Premium</span>
                            <span className="detail-value" style={{ fontSize: '1.2rem', color: '#A80000' }}>{policyData.premium}</span>
                        </div>
                        <div className="detail-item" style={{ marginBottom: '1.5rem' }}>
                            <span className="detail-label">Next Payment Due</span>
                            <span className="detail-value">{policyData.nextPayment}</span>
                        </div>
                        <button className="action-btn-red" style={{ width: '100%', justifyContent: 'center' }}>
                            View Payment History
                        </button>
                    </div>

                    {/* Benefits Card */}
                    <div className="policy-card">
                        <h3 className="policy-card-title">Included Benefits</h3>
                        <div className="benefits-box">
                            <div className="benefit-pill">Standard Funeral Cover</div>
                            <div className="benefit-pill">Grave Site Assistance</div>
                            <div className="benefit-pill">Transport Inclusion</div>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                * Waiting period rules apply for natural death cases within the first 6 months.
                            </p>
                        </div>
                    </div>

                    {/* Support Card */}
                    <div className="policy-card" style={{ background: '#f9f9f9', textAlign: 'center' }}>
                        <AlertCircle size={32} color="#888" style={{ margin: '0 auto 1rem' }} />
                        <h4 style={{ marginBottom: '0.5rem' }}>Need to update cover?</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                            Contact your local branch or the main admin office to add new dependents or change your plan.
                        </p>
                        <button className="policy-btn-outline">
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
            )}
            </div>

            {/* Print Section */}
            <div className="print-only">
                <div className="print-page">
                    <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem' }}>
                        <h1 style={{ color: '#222', margin: 0, fontSize: '1.8rem' }}>The Follower of Jesus Christ Church Funeral Policy</h1>
                        <p style={{ margin: '0.5rem 0', fontWeight: 600, fontSize: '1.1rem' }}>Official Policy Document - {policyData.planType}</p>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Policy Summary</h3>
                        <div className="details-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="detail-item">
                                <span className="detail-label">Policy Number</span>
                                <span className="detail-value">{policyData.policyNumber}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span className="detail-value">{policyData.status}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Effective Date</span>
                                <span className="detail-value">{policyData.effectiveDate}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Sum Assured</span>
                                <span className="detail-value">{policyData.sumAssured}</span>
                            </div>
                        </div>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Principal Member Details</h3>
                        <div className="details-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="detail-item">
                                <span className="detail-label">Full Name</span>
                                <span className="detail-value">{principalMember.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">National ID</span>
                                <span className="detail-value">{principalMember.id}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Phone</span>
                                <span className="detail-value">{principalMember.phone}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Branch</span>
                                <span className="detail-value">{principalMember.branch}</span>
                            </div>
                        </div>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Dependents & Beneficiaries</h3>
                        <table className="dependents-table">
                            <thead>
                                <tr>
                                    <th>FULL NAME</th>
                                    <th>RELATIONSHIP</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dependents.map((dep, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{dep.name}</td>
                                        <td>{dep.relationship}</td>
                                        <td>{dep.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ breakBefore: 'page', marginTop: '3rem', padding: '2rem', border: '1px solid #eee', background: '#fafafa', fontSize: '0.8rem', color: '#666' }}>
                        <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Confidentiality Note:</p>
                        <p>This document contains personal and sensitive information. Unauthorized storage or distribution is strictly prohibited. For any queries regarding this policy, please visit your nearest church branch or contact the admin office.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                            <div>
                                <div style={{ borderBottom: '1px solid #333', width: '200px', marginBottom: '0.25rem' }}></div>
                                <p>Authorized Signature</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ borderBottom: '1px solid #333', width: '150px', marginBottom: '0.25rem' }}></div>
                                <p>Date of Issue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPolicy;
