import React, { useState } from 'react';
import './NotificationsPage.css';

// ─── Types ────────────────────────────────────────────────────────────────────

type NotifCategory = 'All' | 'Unread' | 'Read';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    date: string;
    read: boolean;
    type: 'license' | 'payment' | 'spectrum' | 'dispute' | 'system';
}

// ─── Icon Components ──────────────────────────────────────────────────────────

// ─── Notification Type Meta ──────────────────────────────────────────────────

const NOTIF_TYPE_META: Record<Notification['type'], { color: string; bg: string; label: string }> = {
    license:  { color: '#A80000', bg: '#fdf2f2', label: 'Licence'  },
    payment:  { color: '#15803d', bg: '#f0fdf4', label: 'Payment'  },
    spectrum: { color: '#1d4ed8', bg: '#eff6ff', label: 'Spectrum' },
    dispute:  { color: '#d97706', bg: '#fffbeb', label: 'Dispute'  },
    system:   { color: '#6b7280', bg: '#f9fafb', label: 'System'   },
};

// ─── Notifications Dataset ────────────────────────────────────────────────────

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: 'n1',
        title: 'Licence Application Approved',
        message: 'Your NFP License application has been approved by BOCRA. You may download your licence certificate from the Licence Manager.',
        time: '10 mins ago',
        date: '27 Mar 2026',
        read: false,
        type: 'license',
    },
    {
        id: 'n2',
        title: 'Spectrum Bidding Deadline Approaching',
        message: 'Action required: The 5G frequency auction bidding window closes in 48 hours. Ensure your deposit of BWP 50,000 is confirmed before the deadline.',
        time: '2 hours ago',
        date: '27 Mar 2026',
        read: false,
        type: 'spectrum',
    },
    {
        id: 'n3',
        title: 'Payment Received',
        message: 'Your payment of BWP 2,500 for the Type Approval Fee (Ref: TA-2026-0342) has been received and confirmed.',
        time: '1 day ago',
        date: '26 Mar 2026',
        read: true,
        type: 'payment',
    },
    {
        id: 'n4',
        title: 'Consumer Dispute Response',
        message: 'BOCRA has received a response from the provider regarding Case #BOC-2024-081. Review the response and submit your comments within 7 business days.',
        time: '2 days ago',
        date: '25 Mar 2026',
        read: false,
        type: 'dispute',
    },
    {
        id: 'n5',
        title: 'ITU Compliance Update',
        message: 'New ITU Region 1 standards for terminal equipment certification have been published. Please review your current certifications for compliance.',
        time: '3 days ago',
        date: '24 Mar 2026',
        read: true,
        type: 'system',
    },
    {
        id: 'n6',
        title: 'Licence Renewal Reminder',
        message: 'Your Radio Frequency Licence (Ref: RF-BW-2021-0089) is due for renewal in 30 days. Submit your renewal application to avoid service interruption.',
        time: '4 days ago',
        date: '23 Mar 2026',
        read: true,
        type: 'license',
    },
    {
        id: 'n7',
        title: 'Additional Information Requested',
        message: 'BOCRA requires additional documentation for your ISP Licence application (Ref: ISP-2026-0017). Please upload the updated network architecture diagram.',
        time: '5 days ago',
        date: '22 Mar 2026',
        read: true,
        type: 'license',
    },
    {
        id: 'n8',
        title: 'System Maintenance Notice',
        message: 'The BOCRA Client Portal will undergo scheduled maintenance on 30 March 2026 from 00:00 to 04:00 CAT. Services may be temporarily unavailable during this period.',
        time: '6 days ago',
        date: '21 Mar 2026',
        read: true,
        type: 'system',
    },
    {
        id: 'n9',
        title: 'Spectrum Auction Results Published',
        message: 'Results for the 900 MHz frequency band auction have been published. View the full allocation report in the Spectrum Portal.',
        time: '1 week ago',
        date: '20 Mar 2026',
        read: true,
        type: 'spectrum',
    },
    {
        id: 'n10',
        title: 'Annual Fee Invoice Generated',
        message: 'Your annual regulatory fee invoice (BWP 8,000) for the Radio Frequency Licence has been generated. Payment is due by 15 April 2026.',
        time: '1 week ago',
        date: '19 Mar 2026',
        read: true,
        type: 'payment',
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

const NotificationsPage: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
    const [filter, setFilter] = useState<NotifCategory>('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    const filtered = notifications.filter(n => {
        if (filter === 'Unread') return !n.read;
        if (filter === 'Read')   return n.read;
        return true;
    });

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const handleOpen = (n: Notification) => {
        setSelectedId(selectedId === n.id ? null : n.id);
        if (!n.read) markRead(n.id);
    };

    const deleteNotif = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const selectedNotif = notifications.find(n => n.id === selectedId);

    return (
        <div className="np-root">
            {/* Page Header */}
            <div className="np-header">
                <div className="np-header-left">
                    <h2 className="np-title">Notifications</h2>
                    {unreadCount > 0 && (
                        <span className="np-unread-badge">{unreadCount} unread</span>
                    )}
                </div>
                <div className="np-header-actions">
                    <button className="np-mark-all-btn" onClick={markAllRead} disabled={unreadCount === 0}>
                        Mark all as read
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="np-filter-tabs">
                {(['All', 'Unread', 'Read'] as NotifCategory[]).map(tab => (
                    <button
                        key={tab}
                        className={`np-filter-tab ${filter === tab ? 'active' : ''}`}
                        onClick={() => setFilter(tab)}
                    >
                        {tab}
                        {tab === 'Unread' && unreadCount > 0 && (
                            <span className="np-tab-count">{unreadCount}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content Layout */}
            <div className={`np-layout ${selectedNotif ? 'split' : ''}`}>
                {/* List Panel */}
                <div className="np-list">
                    {filtered.length === 0 && (
                        <div className="np-empty">
                            <div className="np-empty-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                                    <path fill="#ccc" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"/>
                                </svg>
                            </div>
                            <p>No {filter !== 'All' ? filter.toLowerCase() + ' ' : ''}notifications.</p>
                        </div>
                    )}

                    {filtered.map(n => {
                        const isSelected = selectedId === n.id;
                        return (
                            <div
                                key={n.id}
                                className={`np-item ${!n.read ? 'unread' : ''} ${isSelected ? 'active' : ''}`}
                                onClick={() => handleOpen(n)}
                            >
                                
                                <div className="np-item-body">
                                    <div className="np-item-top">
                                        <span className="np-item-title">{n.title}</span>
                                        <span className="np-item-time">{n.time}</span>
                                    </div>
                                    <p className="np-item-preview">{n.message}</p>
                                </div>
                                <div className="np-item-actions">
                                    {!n.read && <span className="np-dot" />}
                                    <button
                                        className="np-delete-btn"
                                        title="Dismiss"
                                        onClick={(e) => deleteNotif(n.id, e)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detail Panel */}
                {selectedNotif && (() => {
                    const meta = NOTIF_TYPE_META[selectedNotif.type];
                    return (
                        <div className="np-detail">
                            <div className="np-detail-header">
                                <div>
                                    <h3 className="np-detail-title">{selectedNotif.title}</h3>
                                    <div className="np-detail-meta">
                                        <span className="np-type-badge" style={{ color: meta.color, background: meta.bg }}>
                                            {meta.label}
                                        </span>
                                        <span className="np-detail-date">{selectedNotif.date} · {selectedNotif.time}</span>
                                    </div>
                                </div>
                                <button
                                    className="np-close-detail"
                                    onClick={() => setSelectedId(null)}
                                    title="Close"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/>
                                    </svg>
                                </button>
                            </div>
                            <div className="np-detail-body">
                                <p>{selectedNotif.message}</p>
                            </div>
                            <div className="np-detail-footer">
                                {selectedNotif.type === 'license' && (
                                    <button className="np-action-btn">Go to Licence Manager</button>
                                )}
                                {selectedNotif.type === 'payment' && (
                                    <button className="np-action-btn">View Payment History</button>
                                )}
                                {selectedNotif.type === 'spectrum' && (
                                    <button className="np-action-btn">Open Spectrum Portal</button>
                                )}
                                {selectedNotif.type === 'dispute' && (
                                    <button className="np-action-btn">View Dispute Case</button>
                                )}
                                <button
                                    className="np-dismiss-btn"
                                    onClick={(e) => deleteNotif(selectedNotif.id, e)}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default NotificationsPage;
