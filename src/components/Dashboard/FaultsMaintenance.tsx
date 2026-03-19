import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './CardGrid.css';

type QueryStatus = 'Provider Notified' | 'Resolved' | 'Mediation' | 'Escalated';

interface QueryRecord {
    initials: string;
    name: string;
    reference: string;
    issue: string;
    status: QueryStatus;
}

const statusColors: Record<QueryStatus, string> = {
    'Provider Notified': '#A80000',
    'Resolved': '#16a34a',
    'Mediation': '#3b82f6',
    'Escalated': '#f97316',
};

const initialQueries: QueryRecord[] = [
    { initials: 'KN', name: 'Kefilwe Nkosi', reference: '#CAS-2024-001', issue: 'Overbilling dispute (Mascom)', status: 'Provider Notified' },
    { initials: 'TM', name: 'Tebogo Motswedi', reference: '#CAS-2024-002', issue: 'Speed test discrepancy (Orange)', status: 'Resolved' },
    { initials: 'OT', name: 'Oarabile Tau', reference: '#CAS-2024-003', issue: 'Poor coverage in Maun (BTCL)', status: 'Mediation' },
    { initials: 'GP', name: 'Gosiame Phikwe', reference: '#CAS-2024-004', issue: 'Unfair contract termination', status: 'Escalated' },
    { initials: 'DN', name: 'Dineo Ntuane', reference: '#CAS-2024-005', issue: 'Roaming charge dispute', status: 'Mediation' },
];

const FaultsMaintenance: React.FC = () => {
    const [queries] = useState<QueryRecord[]>(initialQueries);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');


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
                <h2 className="page-title">Consumer Cases & Disputes</h2>

                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search dispute cases..."
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    {['All', 'Provider Notified', 'Mediation', 'Resolved', 'Escalated'].map(f => (
                        <button
                            key={f}
                            className={f === 'Escalated' ? 'action-btn-red' : 'filter-btn'}
                            onClick={() => setFilter(f)}
                            style={{
                                background: filter === f
                                    ? (f === 'Resolved' ? '#f0fdf4' : f === 'Mediation' ? '#eef2ff' : f === 'Escalated' ? '#f97316' : '#fcebeb')
                                    : 'white',
                                color: f === 'Resolved' ? '#16a34a' : f === 'Mediation' ? '#3b82f6' : f === 'Escalated' ? 'white' : '#A80000',
                                borderColor: f === 'Resolved' ? '#16a34a' : f === 'Mediation' ? '#3b82f6' : undefined,
                            }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resolution Tracker Info */}
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#64748b' }}>
                <strong>Resolution Tracker:</strong> Submitted → Provider Notified → BOCRA Mediation → Final Decision
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

                        <div style={{ marginTop: '0.5rem' }}>
                            <button
                                className="card-action-btn"
                                style={{ background: statusColors[query.status], width: '100%' }}
                            >
                                {query.status}
                            </button>
                            <p style={{ fontSize: '0.7rem', color: '#999', marginTop: '0.5rem', textAlign: 'center' }}>
                                Drag & Drop Evidence Files
                            </p>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <p style={{ color: '#999', fontSize: '0.9rem', gridColumn: '1/-1' }}>No dispute cases match your search.</p>
                )}
            </div>
        </div>
    );
};

export default FaultsMaintenance;
