import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './Payments.css';

type PayStatus = 'Paid' | 'Overdue' | 'Pending' | 'Defaulted';

interface PaymentRecord {
    memberId: string;
    memberName: string;
    paymentType: string;
    amountDue: string;
    dateDue: string;
    datePaid: string;
    status: PayStatus;
}

const statusColors: Record<PayStatus, string> = {
    'Paid': '#16a34a',
    'Overdue': '#dc2626',
    'Pending': '#f97316',
    'Defaulted': '#6b7280',
};

const payments: PaymentRecord[] = [
    { memberId: 'BRA-2024-001', memberName: 'Kefilwe Modise', paymentType: 'Monthly Premium', amountDue: 'P120.00', dateDue: '01 Jan 2026', datePaid: '31 Dec 2025', status: 'Paid' },
    { memberId: 'BRA-2024-002', memberName: 'Tebogo Sithole', paymentType: 'Monthly Premium', amountDue: 'P120.00', dateDue: '01 Jan 2026', datePaid: '-', status: 'Overdue' },
    { memberId: 'BRA-2024-003', memberName: 'Mpho Kgosi', paymentType: 'Annual Admin Fee', amountDue: 'P15.00', dateDue: '01 Sep 2025', datePaid: '28 Aug 2025', status: 'Paid' },
    { memberId: 'BRA-2024-004', memberName: 'Oarabile Tau', paymentType: 'Joining Fee', amountDue: 'P30.00', dateDue: '01 Mar 2024', datePaid: '01 Mar 2024', status: 'Paid' },
    { memberId: 'BRA-2024-005', memberName: 'Gosiame Rammidi', paymentType: 'Monthly Premium', amountDue: 'P120.00', dateDue: '01 Feb 2026', datePaid: '-', status: 'Pending' },
    { memberId: 'BRA-2024-006', memberName: 'Dineo Phiri', paymentType: 'Rejoining Fee', amountDue: 'P100.00', dateDue: '15 Nov 2025', datePaid: '-', status: 'Defaulted' },
    { memberId: 'BRA-2024-007', memberName: 'Thato Sebonego', paymentType: 'Monthly Premium', amountDue: 'P120.00', dateDue: '01 Jan 2026', datePaid: '30 Dec 2025', status: 'Paid' },
    { memberId: 'BRA-2024-008', memberName: 'Boitumelo Gaone', paymentType: 'Annual Admin Fee', amountDue: 'P15.00', dateDue: '01 Sep 2025', datePaid: '-', status: 'Overdue' },
    { memberId: 'BRA-2024-009', memberName: 'Naledi Mogorosi', paymentType: 'Monthly Premium', amountDue: 'P120.00', dateDue: '01 Feb 2026', datePaid: '-', status: 'Pending' },
];

const Payments: React.FC = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filtered = payments.filter(p => {
        const matchSearch =
            p.memberName.toLowerCase().includes(search.toLowerCase()) ||
            p.memberId.toLowerCase().includes(search.toLowerCase()) ||
            p.paymentType.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'All' || p.status === filter;
        return matchSearch && matchFilter;
    });

    return (
        <div className="payments-container">
            <div className="page-header">
                <h2 className="page-title">Financials & Reports</h2>

                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input
                            type="text"
                            placeholder="Search payments here"
                            className="search-input"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <button className="filter-btn" onClick={() => setFilter('All')}
                        style={{ background: filter === 'All' ? '#fcebeb' : 'white' }}>
                        All
                    </button>
                    <button className="filter-btn" onClick={() => setFilter('Paid')}
                        style={{ color: '#16a34a', borderColor: '#16a34a', background: filter === 'Paid' ? '#f0fdf4' : 'white' }}>
                        Paid
                    </button>
                    <button className="filter-btn" onClick={() => setFilter('Pending')}
                        style={{ color: '#f97316', borderColor: '#f97316', background: filter === 'Pending' ? '#fff7ed' : 'white' }}>
                        Pending
                    </button>
                    <button className="action-btn-red" onClick={() => setFilter('Overdue')}>
                        Overdue
                    </button>

                    <button className="filter-btn" style={{ color: '#6b7280', borderColor: '#6b7280', marginLeft: 'auto' }}
                        onClick={() => window.print()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                            <rect width="24" height="24" fill="none"/>
                            <path fill="currentColor" d="M21 3H3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-9 13a3 3 0 0 1-3-3H4V5h16v8h-5a3 3 0 0 1-3 3m4-5h-3v3h-2v-3H8l4-4.5z"/>
                        </svg>
                        Export Excel/PDF
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {[
                    { label: 'Total Collected', value: 'P87,630', color: '#A80000' },
                    { label: 'Pending Payments', value: 'P2,160', color: '#f97316' },
                    { label: 'Overdue Accounts', value: 'P1,320', color: '#dc2626' },
                    { label: 'Claims Paid Out', value: 'P225,000', color: '#A80000' },
                ].map((card, i) => (
                    <div key={i} style={{ background: '#fcebeb', borderRadius: '10px', padding: '1.2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{card.label}</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: card.color }}>{card.value}</div>
                    </div>
                ))}
            </div>

            {/* Payments Table */}
            <div className="payments-table-container" style={{ overflowX: 'auto' }}>
                <table className="payments-table">
                    <thead>
                        <tr>
                            <th>MEMBER ID</th>
                            <th>MEMBER NAME</th>
                            <th>PAYMENT TYPE</th>
                            <th>AMOUNT DUE</th>
                            <th>DATE DUE</th>
                            <th>DATE PAID</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p, index) => (
                            <tr key={index}>
                                <td className="account-type-text">{p.memberId}</td>
                                <td style={{ fontWeight: 600 }}>{p.memberName}</td>
                                <td className="amount-text">{p.paymentType}</td>
                                <td className="amount-text">{p.amountDue}</td>
                                <td className="date-text">{p.dateDue}</td>
                                <td className="date-text">{p.datePaid}</td>
                                <td>
                                    <button
                                        className="status-btn"
                                        style={{ background: statusColors[p.status] }}
                                    >
                                        {p.status}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} style={{ textAlign: 'center', color: '#999' }}>No records match your search.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payments;
