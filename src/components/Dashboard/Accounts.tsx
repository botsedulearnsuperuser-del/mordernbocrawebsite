import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Accounts.css';

const licensees = [
    { entityId: 'BOC-NFP-001', name: 'BTCL (Botswana Telecom)', licenseType: 'NFP (Fixed)', contact: '+267 395 8000', issueDate: '2024-01-15', compliance: 'Approved', status: 'Active', category: 'Major' },
    { entityId: 'BOC-SAP-002', name: 'Mascom Wireless', licenseType: 'SAP (Mobile)', contact: '+267 390 3396', issueDate: '2024-02-03', compliance: 'Approved', status: 'Active', category: 'Major' },
    { entityId: 'BOC-SAP-003', name: 'Orange Botswana', licenseType: 'SAP (Mobile)', contact: '+267 317 0113', issueDate: '2024-02-10', compliance: 'Approved', status: 'Active', category: 'Major' },
    { entityId: 'BOC-NFP-004', name: 'Liquid Intelligent', licenseType: 'NFP (Fibre)', contact: '+267 391 1996', issueDate: '2024-03-01', compliance: 'Approved', status: 'Active', category: 'Regional' },
    { entityId: 'BOC-VOD-005', name: 'Paratus Botswana', licenseType: 'SAP (V-SAT)', contact: '+267 397 5030', issueDate: '2024-03-12', compliance: 'Pending', status: 'Active', category: 'Enterprise' },
    { entityId: 'BOC-NFP-006', name: 'BBI (Broadband)', licenseType: 'NFP (Carrier)', contact: '+267 395 1011', issueDate: '2024-04-05', compliance: 'Approved', status: 'Suspended', category: 'Major' },
];

const Accounts: React.FC = () => {
    const [showRegForm, setShowRegForm] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = licensees.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.entityId.toLowerCase().includes(search.toLowerCase()) ||
        m.licenseType.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="accounts-container">
            <div className="page-header">
                <h2 className="page-title">Member Management</h2>

                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search licensees here"
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <button className="filter-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048" style={{ marginRight: '8px' }}>
                            <path fill="currentColor" d="M1152 1536h896l-448 448zm0-128v-128H896v640H256v-805l-83 82l-90-90l941-942l941 942l-90 90l-83-82v293h-128V987l-640-640l-640 640v805h384v-640h512v256z" />
                        </svg>
                        Filter by Category
                    </button>

                    <button className="action-btn-red" onClick={() => setShowRegForm(!showRegForm)}>
                        {showRegForm ? 'View Registry' : '+ Issue New License'}
                    </button>
                </div>
            </div>

            {showRegForm && (
                <div className="reg-form-card">
                    <h3 className="reg-form-title">Issue New NFP/SAP License</h3>
                    <div className="reg-form-grid">
                        <div className="form-group">
                            <label>Entity Name</label>
                            <input type="text" className="form-input" placeholder="e.g. BTC" />
                        </div>
                        <div className="form-group">
                            <label>Registered Company No.</label>
                            <input type="text" className="form-input" placeholder="UIN / CIPA No." />
                        </div>
                        <div className="form-group">
                            <label>Technical Contact</label>
                            <input type="tel" className="form-input" placeholder="+267..." />
                        </div>
                        <div className="form-group">
                            <label>License Category</label>
                            <select className="form-input">
                                <option>Major (National)</option>
                                <option>Regional</option>
                                <option>Value Added Services</option>
                                <option>Private Network</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>License Type</label>
                            <select className="form-input">
                                <option>NFP (Network Facilities Provider)</option>
                                <option>SAP (Service & Applications Provider)</option>
                                <option>Content Provider</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Effective Date</label>
                            <input type="date" className="form-input" max={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="form-group">
                            <label>Technical Docs Upload</label>
                            <input type="file" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Issuance Fee Tier</label>
                            <select className="form-input">
                                <option>Major Tier – P500k</option>
                                <option>Mid Tier – P250k</option>
                                <option>Small/VAS – P25k</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button className="action-btn-red">Approve & Generate BOCRA License</button>
                        <button className="filter-btn" onClick={() => setShowRegForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {!showRegForm && (
                <div className="accounts-table-container">
                    <table className="accounts-table">
                        <thead>
                            <tr>
                                <th>LICENSEE ID</th>
                                <th>ENTITY NAME</th>
                                <th>LICENSE TYPE</th>
                                <th>CONTACT OFFICE</th>
                                <th>ISSUE DATE</th>
                                <th>OPERATOR CATEGORY</th>
                                <th>COMPLIANCE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((m, index) => (
                                <tr key={index}>
                                    <td className="location-text">{m.entityId}</td>
                                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                                    <td>{m.licenseType}</td>
                                    <td>{m.contact}</td>
                                    <td>{m.issueDate}</td>
                                    <td>
                                        <span className="type-badge" style={{ background: m.category === 'Major' ? '#A80000' : '#555' }}>
                                            {m.category}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="type-badge" style={{
                                            background: m.compliance === 'Approved' ? '#16a34a' : '#f97316'
                                        }}>
                                            {m.compliance}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="type-badge" style={{
                                            background: m.status === 'Active' ? '#16a34a' : '#dc2626'
                                        }}>
                                            {m.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Accounts;
