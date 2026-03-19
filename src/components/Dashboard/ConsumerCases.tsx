import React, { useState } from 'react';
import { Search, Plus, AlertTriangle, UploadCloud, Send, X } from 'lucide-react';
import './CardGrid.css';

type CaseStatus = 'Submitted' | 'Provider Notified' | 'Mediation' | 'Resolved';

interface ConsumerCase {
    id: string;
    provider: string;
    issue: string;
    status: CaseStatus;
    dateSubmitted: string;
    lastUpdate: string;
}

const statusColors: Record<CaseStatus, string> = {
    'Submitted': '#f59e0b',
    'Provider Notified': '#f97316',
    'Mediation': '#3b82f6',
    'Resolved': '#16a34a',
};

const initialCases: ConsumerCase[] = [
    { id: '#CAS-2024-081', provider: 'Mascom Wireless', issue: 'Unexplained roaming charges on latest invoice.', status: 'Provider Notified', dateSubmitted: 'Mar 12, 2024', lastUpdate: 'Mar 15, 2024' },
    { id: '#CAS-2024-042', provider: 'Orange Botswana', issue: 'Fiber connection speeds inconsistent with contract.', status: 'Mediation', dateSubmitted: 'Feb 18, 2024', lastUpdate: 'Mar 10, 2024' },
    { id: '#CAS-2023-119', provider: 'BTCL', issue: 'Line connection delayed by 3 months.', status: 'Resolved', dateSubmitted: 'Dec 05, 2023', lastUpdate: 'Jan 22, 2024' }
];

const ConsumerCases: React.FC = () => {
    const [cases, setCases] = useState<ConsumerCase[]>(initialCases);
    const [showNewCaseForm, setShowNewCaseForm] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filtered = cases.filter(c => {
        const matchSearch =
            c.provider.toLowerCase().includes(search.toLowerCase()) ||
            c.id.toLowerCase().includes(search.toLowerCase()) ||
            c.issue.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || c.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="grid-page-container">
            {!showNewCaseForm ? (
                <>
                    <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h2 className="page-title">Consumer Disputes & Cases</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.25rem' }}>Track and manage your regulatory complaints against service providers.</p>
                        </div>
                        <button 
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#A80000', color: 'white', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(168,0,0,0.2)' }}
                            onClick={() => setShowNewCaseForm(true)}
                        >
                            <Plus size={20} /> File New Dispute
                        </button>
                    </div>

                    <div className="header-actions" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #ddd', borderRadius: '6px', padding: '0.5rem 1rem', flex: '1', minWidth: '250px' }}>
                            <Search size={18} color="#999" />
                            <input
                                type="text"
                                placeholder="Search by provider, issue or ID..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ border: 'none', outline: 'none', marginLeft: '0.5rem', width: '100%', fontSize: '0.9rem' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {['All', 'Submitted', 'Provider Notified', 'Mediation', 'Resolved'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        border: filter === f ? `1px solid ${f === 'All' ? '#A80000' : statusColors[f as CaseStatus]}` : '1px solid #eee',
                                        background: filter === f
                                            ? (f === 'Resolved' ? '#f0fdf4' : f === 'Mediation' ? '#eef2ff' : f === 'Provider Notified' ? '#fff7ed' : f === 'Submitted' ? '#fffbeb' : '#fcebeb')
                                            : 'white',
                                        color: filter === f ? (f === 'All' ? '#A80000' : statusColors[f as CaseStatus]) : '#666',
                                    }}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span><strong>Dispute Process:</strong> BOCRA requires consumers to first attempt resolution directly with the service provider. Proof of this attempt is mandatory for mediation.</span>
                    </div>

                    <div className="card-grid">
                        {filtered.map((c, i) => (
                            <div className="info-card" key={i} style={{ background: 'white', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                <div className="avatar-circle" style={{ background: statusColors[c.status], fontSize: '1.2rem' }}>
                                    {c.provider.charAt(0)}
                                </div>
                                <h3 className="card-name" style={{ fontSize: '1.1rem' }}>{c.provider}</h3>
                                <p className="card-detail ref-num" style={{ color: '#A80000', fontWeight: 600 }}>{c.id}</p>
                                <p className="card-sub-detail" style={{ fontSize: '0.85rem', minHeight: '40px' }}>{c.issue}</p>

                                <div style={{ marginTop: '0.5rem', width: '100%' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#888', display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <span>Submitted: {c.dateSubmitted}</span>
                                        <span>Update: {c.lastUpdate}</span>
                                    </div>
                                    <button
                                        style={{ 
                                            background: `${statusColors[c.status]}15`, 
                                            color: statusColors[c.status], 
                                            width: '100%', 
                                            border: 'none', 
                                            padding: '0.5rem', 
                                            borderRadius: '6px', 
                                            fontWeight: 700,
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {c.status}
                                    </button>
                                    
                                    {c.status !== 'Resolved' && (
                                        <button style={{ marginTop: '0.75rem', width: '100%', padding: '0.6rem', background: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '6px', color: '#666', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                            <UploadCloud size={16} color="#A80000" /> Upload Evidence
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '12px', border: '1px dashed #ddd' }}>
                                <p style={{ color: '#999', fontSize: '1rem' }}>No consumer cases found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div style={{ background: 'white', padding: '2.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' }}>
                        <div>
                            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: '#333' }}>File a Consumer Dispute</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Submit an official complaint for BOCRA to review and mediate.</p>
                        </div>
                        <button onClick={() => setShowNewCaseForm(false)} style={{ background: '#f5f5f5', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}>
                            <X size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Service Provider</label>
                            <select style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', background: 'white', outline: 'none' }} defaultValue="">
                                <option value="" disabled>Select the provider you are disputing</option>
                                <option value="mascom">Mascom Wireless</option>
                                <option value="orange">Orange Botswana</option>
                                <option value="btcl">BTCL</option>
                                <option value="other">Other/Unlisted</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Nature of Dispute</label>
                            <input type="text" placeholder="E.g., Overbilling, Unresolved Connection Fault, etc." style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', outline: 'none' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Detailed Description</label>
                            <textarea rows={5} placeholder="Provide all necessary details about the timeline of events and your attempts to resolve this directly with the provider..." style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}></textarea>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#333' }}>Evidence / Previous Correspondence</label>
                            <div style={{ border: '2px dashed #ddd', padding: '2.5rem 1rem', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fafafa', cursor: 'pointer', transition: 'border-color 0.2s' }} 
                                 onMouseOver={(e) => e.currentTarget.style.borderColor = '#A80000'}
                                 onMouseOut={(e) => e.currentTarget.style.borderColor = '#ddd'}
                            >
                                <UploadCloud size={32} color="#A80000" style={{ marginBottom: '0.75rem' }} />
                                <span style={{ color: '#333', fontWeight: 600, marginBottom: '0.25rem' }}>Click to upload files</span>
                                <span style={{ color: '#888', fontSize: '0.8rem' }}>Please attach PDFs or Images of emails, invoices, etc.</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f0f0f0' }}>
                        <button onClick={() => setShowNewCaseForm(false)} style={{ padding: '0.75rem 1.5rem', background: 'white', border: '1px solid #ddd', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', color: '#333' }}>
                            Cancel
                        </button>
                        <button 
                            onClick={() => {
                                alert('Dispute successfully submitted to BOCRA Mediation Pipeline.');
                                setShowNewCaseForm(false);
                            }}
                            style={{ padding: '0.75rem 1.5rem', background: '#A80000', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Send size={16} /> Submit Dispute
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsumerCases;
