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
    { memberId: 'BOC-NFP-001', memberName: 'BTCL (Botswana Telecom)', paymentType: 'Annual Turnover Fee (0.8%)', amountDue: 'P2,450,000', dateDue: '31 Mar 2026', datePaid: '28 Mar 2026', status: 'Paid' },
    { memberId: 'BOC-SAP-002', memberName: 'Mascom Wireless', paymentType: 'Spectrum Usage (700MHz)', amountDue: 'P1,200,000', dateDue: '01 Jan 2026', datePaid: '-', status: 'Overdue' },
    { memberId: 'BOC-SAP-003', memberName: 'Orange Botswana', paymentType: 'Type Approval Lab Fee', amountDue: 'P15,000', dateDue: '15 Feb 2026', datePaid: '14 Feb 2026', status: 'Paid' },
    { memberId: 'BOC-NFP-004', memberName: 'Liquid Intelligent', paymentType: 'NFP License Renewal', amountDue: 'P250,000', dateDue: '01 Apr 2026', datePaid: '-', status: 'Pending' },
    { memberId: 'BOC-VOD-005', memberName: 'Paratus Botswana', paymentType: 'SAP (V-SAT) License', amountDue: 'P25,000', dateDue: '01 Feb 2026', datePaid: '-', status: 'Pending' },
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
            <div className="print-only">
                <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid #A80000' }}>
                    <img src="/assets/bocralogo.png" alt="BOCRA Logo" style={{ width: '150px', marginBottom: '1rem' }} />
                    <h1 style={{ color: '#222', margin: 0, fontSize: '1.8rem' }}>Botswana Communications Regulatory Authority</h1>
                    <p style={{ margin: '0.5rem 0', fontWeight: 600, fontSize: '1.1rem' }}>BOCRA Financial Revenue Report</p>
                </div>
            </div>
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
                    { label: 'Fees Collected', value: 'P12,450k', color: '#A80000' },
                    { label: 'Overdue Spectrum', value: 'P1,200k', color: '#dc2626' },
                    { label: 'Industry Invoiced', value: 'P15,840k', color: '#f97316' },
                    { label: 'Active Licenses', value: '142', color: '#A80000' },
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
                            <th>OPERATOR ID</th>
                            <th>OPERATOR NAME</th>
                            <th>REVENUE TYPE</th>
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
