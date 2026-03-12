import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Accounts.css';

const members = [
    { memberId: 'BRA-2024-001', name: 'Kefilwe Modise', branch: 'Gaborone', phone: '+26771234567', joinDate: '2024-01-15', kyc: 'Approved', status: 'Active', type: 'Principal' },
    { memberId: 'BRA-2024-002', name: 'Tebogo Sithole', branch: 'Francistown', phone: '+26772345678', joinDate: '2024-02-03', kyc: 'Pending', status: 'Active', type: 'Additional' },
    { memberId: 'BRA-2024-003', name: 'Mpho Kgosi', branch: 'Palapye', phone: '+26773456789', joinDate: '2024-02-10', kyc: 'Approved', status: 'Defaulted', type: 'Principal' },
    { memberId: 'BRA-2024-004', name: 'Oarabile Tau', branch: 'Maun', phone: '+26774567890', joinDate: '2024-03-01', kyc: 'Approved', status: 'Active', type: 'Principal' },
    { memberId: 'BRA-2024-005', name: 'Gosiame Rammidi', branch: 'Serowe', phone: '+26775678901', joinDate: '2024-03-12', kyc: 'Pending', status: 'Active', type: 'Additional' },
    { memberId: 'BRA-2024-006', name: 'Dineo Phiri', branch: 'Gaborone', phone: '+26776789012', joinDate: '2024-04-05', kyc: 'Approved', status: 'Defaulted', type: 'Principal' },
    { memberId: 'BRA-2024-007', name: 'Thato Sebonego', branch: 'Francistown', phone: '+26777890123', joinDate: '2024-04-20', kyc: 'Approved', status: 'Active', type: 'Principal' },
    { memberId: 'BRA-2024-008', name: 'Boitumelo Gaone', branch: 'Palapye', phone: '+26778901234', joinDate: '2024-05-08', kyc: 'Pending', status: 'Active', type: 'Additional' },
    { memberId: 'BRA-2024-009', name: 'Naledi Mogorosi', branch: 'Serowe', phone: '+26779012345', joinDate: '2024-05-22', kyc: 'Approved', status: 'Active', type: 'Principal' },
    { memberId: 'BRA-2024-010', name: 'Lebogang Seleka', branch: 'Maun', phone: '+26770123456', joinDate: '2024-06-01', kyc: 'Pending', status: 'Defaulted', type: 'Principal' },
];

const Accounts: React.FC = () => {
    const [showRegForm, setShowRegForm] = useState(false);
    const [search, setSearch] = useState('');

    const filtered = members.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.memberId.toLowerCase().includes(search.toLowerCase()) ||
        m.branch.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="accounts-container">
            {/* Page Header */}
            <div className="page-header">
                <h2 className="page-title">Member Management</h2>

                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search members here"
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <button className="filter-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048" style={{ marginRight: '8px' }}>
                            <path fill="currentColor" d="M1152 1536h896l-448 448zm0-128v-128H896v640H256v-805l-83 82l-90-90l941-942l941 942l-90 90l-83-82v293h-128V987l-640-640l-640 640v805h384v-640h512v256z" />
                        </svg>
                        Filter by Branch
                    </button>

                    <button className="action-btn-red" onClick={() => setShowRegForm(!showRegForm)}>
                        {showRegForm ? 'View Members' : '+ Register New Member'}
                    </button>
                </div>
            </div>

            {/* Register New Member Form */}
            {showRegForm && (
                <div className="reg-form-card">
                    <h3 className="reg-form-title">Register New Member</h3>
                    <div className="reg-form-grid">
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-input" placeholder="e.g. Kefilwe Modise" />
                        </div>
                        <div className="form-group">
                            <label>Omang / ID Number</label>
                            <input type="text" className="form-input" placeholder="National ID" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" className="form-input" placeholder="+267..." />
                        </div>
                        <div className="form-group">
                            <label>Branch</label>
                            <select className="form-input">
                                <option>Gaborone</option>
                                <option>Francistown</option>
                                <option>Palapye</option>
                                <option>Serowe</option>
                                <option>Maun</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Member Type</label>
                            <select className="form-input">
                                <option>Principal</option>
                                <option>Additional</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Registration Date</label>
                            <input type="date" className="form-input" max={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="form-group">
                            <label>KYC Document Upload</label>
                            <input type="file" className="form-input" />
                        </div>
                        <div className="form-group">
                            <label>Joining Fee Type</label>
                            <select className="form-input">
                                <option>New – P30.00</option>
                                <option>Rejoin – P45.00</option>
                                <option>Rejoin (Defaulter) – P100.00</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button className="action-btn-red">Submit & Generate Membership ID</button>
                        <button className="filter-btn" onClick={() => setShowRegForm(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Members Table */}
            {!showRegForm && (
                <div className="accounts-table-container">
                    <table className="accounts-table">
                        <thead>
                            <tr>
                                <th>MEMBERSHIP ID</th>
                                <th>FULL NAME</th>
                                <th>BRANCH</th>
                                <th>PHONE NUMBER</th>
                                <th>JOIN DATE</th>
                                <th>MEMBER TYPE</th>
                                <th>KYC STATUS</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((m, index) => (
                                <tr key={index}>
                                    <td className="location-text">{m.memberId}</td>
                                    <td style={{ fontWeight: 600 }}>{m.name}</td>
                                    <td>{m.branch}</td>
                                    <td>{m.phone}</td>
                                    <td>{m.joinDate}</td>
                                    <td>
                                        <span className="type-badge" style={{ background: m.type === 'Principal' ? '#A80000' : '#555' }}>
                                            {m.type}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="type-badge" style={{
                                            background: m.kyc === 'Approved' ? '#16a34a' : '#f97316'
                                        }}>
                                            {m.kyc}
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
