import React from 'react';
import { AlertCircle } from 'lucide-react';
import './MyPolicy.css';

const DownloadIcon = ({ size = 20 }: { size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none" />
        <path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" />
    </svg>
);

const MyPolicy: React.FC = () => {
    const licenseData = {
        licenseNumber: "BOC-NFP-2024-08812",
        licenseType: "NFP (Network Facilities Provider)",
        status: "Active (Compliance Review)",
        entitlements: "National Spectrum Access",
        annualFee: "P250,000.00 / year",
        effectiveDate: "March 15, 2024",
        nextAudit: "April 01, 2026",
    };

    const licenseeDetails = {
        name: "BTCL (Botswana Telecom)",
        uin: "BW-98011234567",
        phone: "+267 395 8000",
        email: "regulatory@btcl.co.bw",
        hq: "Gaborone HQ"
    };

    const registeredProducts = [
        { name: "Cisco Catalyst 9300", category: "Routing", cert: "ITU-R1-00123", status: "Approved" },
        { name: "Nokia AirScale 5G", category: "Radio", cert: "ITU-R1-44561", status: "Approved" },
        { name: "Huawei Mate 60 Pro", category: "Terminal", cert: "ITU-R1-99821", status: "Pending" },
        { name: "Samsung Galaxy S24", category: "Terminal", cert: "ITU-R1-77213", status: "Approved" },
    ];

    const [showCreateForm, setShowCreateForm] = React.useState(false);
    const [formProducts, setFormProducts] = React.useState([{ id: Date.now() }]);

    const addProduct = () => {
        setFormProducts([...formProducts, { id: Date.now() }]);
    };

    return (
        <div className="my-policy-container">
            <div className="no-print">
            <div className="policy-header-row">
                <div>
                    <h2 className="page-title">{licenseData.licenseType}</h2>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="policy-btn-outline" style={{ width: 'auto' }} onClick={() => setShowCreateForm(!showCreateForm)}>
                        {showCreateForm ? 'Back to License' : 'Apply for NFP/SAP'}
                    </button>
                    {!showCreateForm && (
                        <button className="policy-btn-outline" style={{ width: 'auto' }} onClick={() => window.print()}>
                            <DownloadIcon size={18} /> Download BOCRA Certificate
                        </button>
                    )}
                </div>
            </div>

            {showCreateForm ? (
                <div className="policy-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h3 className="policy-card-title">Apply for New Service License</h3>
                    <div className="reg-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Entity Name</label>
                            <input type="text" className="signin-input" style={{ width: '100%' }} placeholder="e.g. BTC" />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Company UIN / CIPA No.</label>
                            <input type="text" className="signin-input" style={{ width: '100%' }} placeholder="National Reg No." />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Technical Contact</label>
                            <input type="tel" className="signin-input" style={{ width: '100%' }} placeholder="+267..." />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>License Category</label>
                            <select className="signin-input" style={{ width: '100%' }}>
                                <option>Network Facilities Provider (NFP)</option>
                                <option>Services & Application Provider (SAP)</option>
                                <option>Content Provider</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Spectrum Band Requirement</label>
                            <select className="signin-input" style={{ width: '100%' }}>
                                <option>700 MHz (5G)</option>
                                <option>900 MHz (2G/3G)</option>
                                <option>1800 MHz (4G)</option>
                                <option>V-SAT Band</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Proposed Launch Date</label>
                            <input type="date" className="signin-input" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                            <label className="detail-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Business Proposal Upload</label>
                            <input type="file" className="signin-input" style={{ width: '100%', paddingTop: '8px' }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', borderTop: '2px dashed #eee', paddingTop: '2rem' }}>
                        <h4 className="detail-label" style={{ marginBottom: '1rem', color: '#A80000' }}>Equipment to be Type Approved</h4>
                        
                        {formProducts.map((dep) => (
                            <div key={dep.id} className="reg-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div className="form-group">
                                    <label className="detail-label" style={{ fontSize: '0.65rem' }}>Model Name</label>
                                    <input type="text" className="signin-input" style={{ width: '100%', padding: '0.5rem 0.8rem' }} placeholder="e.g. Samsung S24" />
                                </div>
                                <div className="form-group">
                                    <label className="detail-label" style={{ fontSize: '0.65rem' }}>Category</label>
                                    <select className="signin-input" style={{ width: '100%', padding: '0.5rem 0.8rem' }}>
                                        <option>Terminal (Phone/Tablet)</option>
                                        <option>Radio Infrastructure</option>
                                        <option>Satellite Equipment</option>
                                        <option>Wired Terminal</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="detail-label" style={{ fontSize: '0.65rem' }}>Approval Status</label>
                                    <select className="signin-input" style={{ width: '100%', padding: '0.5rem 0.8rem', background: '#f9f9f9' }} disabled>
                                        <option>Awaiting Testing</option>
                                    </select>
                                </div>
                            </div>
                        ))}

                        <button 
                            className="policy-btn-outline" 
                            style={{ padding: '0.5rem', fontSize: '0.75rem', width: 'auto', marginBottom: '2rem' }}
                            onClick={addProduct}
                        >
                            + Add Another Item
                        </button>
                    </div>
                    <div className="form-actions" style={{ display: 'flex', gap: '1rem' }}>
                        <button className="action-btn-red" style={{ flex: 1, padding: '1rem' }}>Submit Formal Application</button>
                        <button className="policy-btn-outline" style={{ flex: 1 }} onClick={() => setShowCreateForm(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="policy-grid">
                <div className="left-column">
                    <div className="policy-card">
                        <h3 className="policy-card-title">License Summary</h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">License Number</span>
                                <span className="detail-value">{licenseData.licenseNumber}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Compliance Status</span>
                                <span className="detail-value" style={{ color: '#A80000' }}>{licenseData.status}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Issuance Date</span>
                                <span className="detail-value">{licenseData.effectiveDate}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Key Entitlements</span>
                                <span className="detail-value">{licenseData.entitlements}</span>
                            </div>
                        </div>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Registered Entity Details</h3>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="detail-label">Operator Name</span>
                                <span className="detail-value">{licenseeDetails.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Business UIN</span>
                                <span className="detail-value">{licenseeDetails.uin}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Corporate Contact</span>
                                <span className="detail-value">{licenseeDetails.phone}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Postal/HQ</span>
                                <span className="detail-value">{licenseeDetails.hq}</span>
                            </div>
                        </div>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Type Approved Products</h3>
                        <table className="dependents-table">
                            <thead>
                                <tr>
                                    <th>MODEL</th>
                                    <th>CATEGORY</th>
                                    <th>RESULT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registeredProducts.map((dep, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{dep.name}</td>
                                        <td>{dep.category}</td>
                                        <td>
                                            <span style={{ 
                                                color: dep.status === 'Approved' ? '#16a34a' : '#f97316',
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
                    <div className="policy-card">
                        <h3 className="policy-card-title">Fee & Revenue Obligations</h3>
                        <div className="detail-item" style={{ marginBottom: '1rem' }}>
                            <span className="detail-label">Annual Operating Fee</span>
                            <span className="detail-value" style={{ fontSize: '1.2rem', color: '#A80000' }}>{licenseData.annualFee}</span>
                        </div>
                        <div className="detail-item" style={{ marginBottom: '1.5rem' }}>
                            <span className="detail-label">Next Compliance Audit</span>
                            <span className="detail-value">{licenseData.nextAudit}</span>
                        </div>
                        <button className="action-btn-red" style={{ width: '100%', justifyContent: 'center' }}>
                            View Billing History
                        </button>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Regulatory Provisions</h3>
                        <div className="benefits-box">
                            <div className="benefit-pill">Regional Connectivity Rights</div>
                            <div className="benefit-pill">ITU Standard Alignment</div>
                            <div className="benefit-pill">Spectrum Lease Eligibility</div>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                                * Non-compliance with QoS (Quality of Service) standards may result in penalties.
                            </p>
                        </div>
                    </div>

                    <div className="policy-card" style={{ background: '#f9f9f9', textAlign: 'center' }}>
                        <AlertCircle size={32} color="#888" style={{ margin: '0 auto 1rem' }} />
                        <h4 style={{ marginBottom: '0.5rem' }}>Need Technical Support?</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                            Access the BOCRA Technical Portal for frequency coordination or tower registration.
                        </p>
                        <button className="policy-btn-outline">
                            Contact Technical Desk
                        </button>
                    </div>
                </div>
            </div>
            )}
            </div>

            <div className="print-only">
                <div className="print-page">
                    <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #A80000' }}>
                        <img src="/assets/bocralogo.png" alt="BOCRA Logo" style={{ width: '150px', marginBottom: '1rem' }} />
                        <h1 style={{ color: '#222', margin: 0, fontSize: '1.8rem' }}>Botswana Communications Regulatory Authority</h1>
                        <p style={{ margin: '0.5rem 0', fontWeight: 600, fontSize: '1.1rem' }}>Official Operating License - Type {licenseData.licenseType}</p>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">License Summary</h3>
                        <div className="details-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="detail-item">
                                <span className="detail-label">License Number</span>
                                <span className="detail-value">{licenseData.licenseNumber}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span className="detail-value">{licenseData.status}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Effective Date</span>
                                <span className="detail-value">{licenseData.effectiveDate}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Annual Entitlement</span>
                                <span className="detail-value">{licenseData.entitlements}</span>
                            </div>
                        </div>
                    </div>

                    <div className="policy-card">
                        <h3 className="policy-card-title">Licensed Entity Details</h3>
                        <div className="details-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                            <div className="detail-item">
                                <span className="detail-label">Entity Name</span>
                                <span className="detail-value">{licenseeDetails.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Business UIN</span>
                                <span className="detail-value">{licenseeDetails.uin}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Primary Contact</span>
                                <span className="detail-value">{licenseeDetails.phone}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Headquarters</span>
                                <span className="detail-value">{licenseeDetails.hq}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ breakBefore: 'page', marginTop: '3rem', padding: '2rem', border: '1px solid #eee', background: '#fafafa', fontSize: '0.8rem', color: '#666' }}>
                        <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Regulatory Compliance Note:</p>
                        <p>This certificate serves as official proof of licensing by BOCRA. The licensee is required to adhere to the Communications Regulatory Authority Act. Falsification of this document is a punishable offense under the laws of Botswana.</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                            <div>
                                <div style={{ borderBottom: '1px solid #333', width: '200px', marginBottom: '0.25rem' }}></div>
                                <p>Director General Signature</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ borderBottom: '1px solid #333', width: '150px', marginBottom: '0.25rem' }}></div>
                                <p>Date of Issuance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPolicy;
