import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './CardGrid.css';

type QueryStatus = 'Pending Review' | 'Resolved' | 'Escalated';

interface QueryRecord {
    initials: string;
    name: string;
    reference: string;
    issue: string;
    status: QueryStatus;
}

const statusColors: Record<QueryStatus, string> = {
    'Pending Review': '#A80000',
    'Resolved': '#16a34a',
    'Escalated': '#f97316',
};

const initialQueries: QueryRecord[] = [
    { initials: 'KN', name: 'Kefilwe Nkosi', reference: '#QRY-2024-001', issue: 'Waiting period clarification', status: 'Pending Review' },
    { initials: 'TM', name: 'Tebogo Motswedi', reference: '#QRY-2024-002', issue: 'Claim checklist query', status: 'Resolved' },
    { initials: 'OT', name: 'Oarabile Tau', reference: '#QRY-2024-003', issue: 'Membership transfer request', status: 'Pending Review' },
    { initials: 'GP', name: 'Gosiame Phikwe', reference: '#QRY-2024-004', issue: 'KYC document resubmission', status: 'Escalated' },
    { initials: 'DN', name: 'Dineo Ntuane', reference: '#QRY-2024-005', issue: 'Annual admin fee dispute', status: 'Pending Review' },
    { initials: 'TS', name: 'Thato Segokgo', reference: '#QRY-2024-006', issue: 'Child dependent age query', status: 'Resolved' },
    { initials: 'MR', name: 'Mpho Rammidi', reference: '#QRY-2024-007', issue: 'Policy cancellation request', status: 'Pending Review' },
    { initials: 'BS', name: 'Boitumelo Seboni', reference: '#QRY-2024-008', issue: 'Rejoining fee confirmation', status: 'Escalated' },
];

const FaultsMaintenance: React.FC = () => {
    const [queries, setQueries] = useState<QueryRecord[]>(initialQueries);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const updateStatus = (reference: string, newStatus: QueryStatus) => {
        setQueries(prev =>
            prev.map(q => q.reference === reference ? { ...q, status: newStatus } : q)
        );
    };

    const filtered = queries.filter(q => {
        const matchSearch =
            q.name.toLowerCase().includes(search.toLowerCase()) ||
            q.reference.toLowerCase().includes(search.toLowerCase()) ||
            q.issue.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || q.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="grid-page-container">
            <div className="page-header">
                <h2 className="page-title">Queries & Support</h2>

                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search queries here"
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {['All', 'Pending Review', 'Resolved', 'Escalated'].map(f => (
                        <button
                            key={f}
                            className={f === 'Escalated' ? 'action-btn-red' : 'filter-btn'}
                            onClick={() => setFilter(f)}
                            style={{
                                background: filter === f
                                    ? (f === 'Resolved' ? '#f0fdf4' : f === 'Escalated' ? '#f97316' : '#fcebeb')
                                    : 'white',
                                color: f === 'Resolved' ? '#16a34a' : f === 'Escalated' ? 'white' : '#A80000',
                                borderColor: f === 'Resolved' ? '#16a34a' : undefined,
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card-grid">
                {filtered.map((query, i) => (
                    <div className="info-card" key={i}>
                        <div className="avatar-circle" style={{ background: statusColors[query.status] }}>
                            {query.initials}
                        </div>
                        <h3 className="card-name">{query.name}</h3>
                        <p className="card-detail ref-num">{query.reference}</p>
                        <p className="card-sub-detail">{query.issue}</p>

                        {query.status === 'Pending Review' ? (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.5rem',
                                width: '100%',
                                marginTop: '0.5rem'
                            }}>
                                <button
                                    className="card-action-btn"
                                    style={{ background: '#16a34a', fontSize: '0.8rem', padding: '0.5rem 0.4rem' }}
                                    onClick={() => updateStatus(query.reference, 'Resolved')}
                                >
                                    ✓ Resolved
                                </button>
                                <button
                                    className="card-action-btn"
                                    style={{ background: '#f97316', fontSize: '0.8rem', padding: '0.5rem 0.4rem' }}
                                    onClick={() => updateStatus(query.reference, 'Escalated')}
                                >
                                    ↑ Escalate
                                </button>
                                <button
                                    className="card-action-btn"
                                    style={{ background: '#A80000', fontSize: '0.8rem', padding: '0.5rem 0.4rem', gridColumn: '1 / -1' }}
                                >
                                    Pending Review
                                </button>
                            </div>
                        ) : (
                            <button
                                className="card-action-btn"
                                style={{ background: statusColors[query.status] }}
                            >
                                {query.status}
                            </button>
                        )}
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p style={{ color: '#999', fontSize: '0.9rem', gridColumn: '1/-1' }}>No queries match your search.</p>
                )}
            </div>
        </div>
    );
};

export default FaultsMaintenance;
