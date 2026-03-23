import React, {
    useState,
    useEffect
} from 'react';
import './ClientsDashboard.css'; // Reusing base styles for layout consistency
const logo = '/assets/bocralogo.png';

import { Search, ShieldAlert, FileText, CheckCircle, HelpCircle, LogOut, LayoutDashboard, Search as SearchIcon, Briefcase } from 'lucide-react';

import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import Skeleton from '../Skeleton';

// Reuse some components/styles from the project
import ConsumerCases from './ConsumerCases'; 
import SupportQueries from './SupportQueries';
import CybersecurityAlerts from './CybersecurityAlerts';
import DeviceVerification from './DeviceVerification';
import ConsumerRights from './ConsumerRights';
import Tenders from './Tenders';
import Settings from './Settings';

const DashboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"/><path fill="currentColor" d="M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z"/>
    </svg>
);
const ComplaintsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
        <rect width="512" height="512" fill="none"/><path fill="currentColor" d="M307.94 248L216 154.52V242a6 6 0 0 0 6 6Z"/><path fill="currentColor" d="M184 268V144H60a12 12 0 0 0-12 12v328a12 12 0 0 0 12 12h248a12 12 0 0 0 12-12V280H196a12 12 0 0 1-12-12m182-148h85.94L360 26.52V114a6 6 0 0 0 6 6"/><path fill="currentColor" d="M340 152a12 12 0 0 1-12-12V16H172a12 12 0 0 0-12 12v84h42.12A40.8 40.8 0 0 1 231 124.14l109.16 111a41.1 41.1 0 0 1 11.83 29V400H452a12 12 0 0 0 12-12V152Z"/>
    </svg>
);

const DeviceIcon = () => <SearchIcon size={18} />;
const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"/>
        <path fill="currentColor" d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v5h-2v6.6l-2.55-2.55q.275-.475.413-.987T16 12q0-1.65-1.175-2.825T12 8T9.175 9.175T8 12t1.175 2.825T12 16q.525 0 1.038-.137T14 15.45l3.2 3.2q-1.15 1.25-2.325 2.088T12 22m1.413-8.587Q14 12.825 14 12t-.587-1.412T12 10t-1.412.588T10 12t.588 1.413T12 14t1.413-.587m6.874 8.3Q20 21.425 20 21t.288-.712T21 20t.713.288T22 21t-.288.713T21 22t-.712-.288M20 18v-6h2v6z"/>
    </svg>
);
const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"/>
        <path fill="currentColor" d="M21.43 9.86a7.5 7.5 0 0 1-.72-1.45c0-5.27-4.87-8.41-9.57-8.41a9.93 9.93 0 0 0-10 10.06c0 3.6 1.35 6.28 4 8v5.44a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-3c1.74 0 2.8-.21 3.58-1s1-3.34 1-4.53h1a1.3 1.3 0 0 0 1-.52a1.27 1.27 0 0 0 .19-.75a7.64 7.64 0 0 0-1.48-3.84M11.5 17.5A1.5 1.5 0 1 1 13 16a1.5 1.5 0 0 1-1.5 1.5m1.6-6.08a1 1 0 0 0-.6.92a1 1 0 0 1-2 0a3 3 0 0 1 1.8-2.75a2 2 0 1 0-2.8-1.84a1 1 0 0 1-2 0a4 4 0 1 1 5.6 3.67"/>
    </svg>
);
const TendersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"/><path fill="currentColor" d="M11 6h3l3.29-3.3a1 1 0 0 1 1.42 0l2.58 2.59a1 1 0 0 1 0 1.41L19 9h-8v2a1 1 0 0 1-1 1a1 1 0 0 1-1-1V8a2 2 0 0 1 2-2m-6 5v4l-2.29 2.29a1 1 0 0 0 0 1.41l2.58 2.59a1 1 0 0 0 1.42 0L11 17h4a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-1h-7v1a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9Z"/>
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"/><path fill="currentColor" d="M5 5h7V3H3v18h9v-2H5z"/><path fill="currentColor" d="m21 12l-4-4v3H9v2h8v3z"/>
    </svg>
);

const ConsumerDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
    const [activeMenu, setActiveMenu] = useState('Dashboard Overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeMenu]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const menuItems = [
        { name: 'Dashboard Overview', icon: <DashboardIcon /> },
        { name: 'My Complaints', icon: <ComplaintsIcon /> },
        { name: 'Device Verification', icon: <DeviceIcon /> },
        { name: 'Cybersecurity Alerts', icon: <AlertIcon /> },
        { name: 'Tenders', icon: <TendersIcon /> },
        { name: 'Consumer Rights', icon: <HelpIcon /> },
        { name: 'Logout', icon: <LogoutIcon /> },
    ];

    const topMenuItems = menuItems.filter(item => item.name !== 'Logout');
    const logoutItem = menuItems.find(item => item.name === 'Logout');

    const chartData = [
        { name: 'Resolved', value: 12, color: '#22c55e' },
        { name: 'Pending', value: 5, color: '#f59e0b' },
        { name: 'Mediation', value: 3, color: '#3b82f6' },
    ];

    const renderDashboardOverview = () => (
        <div className="dashboard-container">
            <div className="content-grid">
                {/* Left Panel */}
                <div className="left-panel">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon" style={{ color: '#A80000' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                                    <rect width="24" height="24" fill="none"/><g fill="currentColor"><path fillRule="evenodd" d="M8 2a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8.362a2 2 0 0 0-.464-1.28l-2.283-2.74l-1.552-1.693A2 2 0 0 0 15.227 2zm10.698 6l-1.951-2.342l-1.247-1.36V7a1 1 0 0 0 1 1zm-2.284 2.979l-4.33 4.465l-2.498-2.629l1.45-1.377l1.062 1.118l2.88-2.97z" clipRule="evenodd"/><path d="M5 5.5H3v12c0 1.401.662 2.535 1.525 3.299C5.37 21.546 6.475 22 7.5 22h10v-2h-10c-.474 0-1.12-.23-1.65-.7c-.512-.453-.85-1.069-.85-1.8z"/></g>
                                </svg>
                            </div>
                            <div className="stat-info">
                                <h3>Active Complaints</h3>
                                <div className="stat-value">5 Cases Open</div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon" style={{ color: '#A80000' }}>

                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                                    <rect width="24" height="24" fill="none"/><path fill="currentColor" d="m21.41 11.58l-9-9C12.04 2.21 11.53 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .53.21 1.04.59 1.41l.41.4c.9-.54 1.94-.81 3-.81c3.31 0 6 2.69 6 6c0 1.06-.28 2.09-.82 3l.4.4c.37.38.89.6 1.42.6s1.04-.21 1.41-.59l7-7c.38-.37.59-.88.59-1.41s-.21-1.04-.59-1.42M5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7m3.13 7.27l-3.87 3.9l-1.35-1.37L2 18.22L4.75 21l5.28-5.32z"/>
                                </svg>
                            </div>
                            <div className="stat-info">
                                <h3>Approved Devices</h3>
                                <div className="stat-value">1,240 Registered</div>
                            </div>
                        </div>

                    </div>

                    <div className="charts-row">
                        <div className="card">
                            <h3 className="card-title">Complaint Status</h3>
                            <div className="chart-container" style={{ height: '200px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie 
                                            data={chartData} 
                                            cx="50%" cy="50%" 
                                            innerRadius={60} 
                                            outerRadius={80} 
                                            paddingAngle={5} 
                                            dataKey="value"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '1rem', fontSize: '0.85rem' }}>
                                {chartData.map(d => (
                                    <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color }}></div>
                                        <span>{d.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="card-title">Device Lookup</h3>
                            <div className="search-bar" style={{ marginTop: '1.5rem', width: '100%', maxWidth: 'none' }}>
                                <Search size={18} color="#999" />
                                <input type="text" placeholder="Enter IMEI or Model No." style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none' }} />
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
                                Verify if your mobile device is type-approved for use in Botswana.
                            </p>
                            <button className="payment-btn" style={{ marginTop: '1.5rem', background: '#A80000' }} onClick={() => setActiveMenu('Device Verification')}>
                                Verify Device Now
                            </button>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="card-title">Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f9f9f9', borderLeft: '4px solid #f59e0b' }}>
                                <div>
                                    <h4 style={{ margin: 0 }}>Case Update: BOC-2024-001</h4>
                                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#666' }}>Provider has responded to your complaint regarding overbilling.</p>
                                </div>
                                <span style={{ fontSize: '0.75rem', color: '#999' }}>2h ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    <div className="card" style={{ background: '#A80000', color: 'white' }}>
                        <h3 style={{ margin: 0 }}>Cyber Security Tip</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginTop: '1rem' }}>
                            Never share your OTP or PIN with anyone claiming to be from your service provider.
                        </p>
                        <button style={{ background: 'white', color: '#A80000', border: 'none', padding: '0.5rem 1rem', marginTop: '1rem', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => setActiveMenu('Cybersecurity Alerts')}>
                            Learn More
                        </button>
                    </div>

                    <div className="card">
                        <h3 className="card-title">Useful Resources</h3>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li className="nav-item" style={{ background: '#fdf2f2', border: '1px solid #ffe4e4' }}>
                                <HelpIcon /> Consumer Rights FAQ
                            </li>
                            <li className="nav-item" style={{ background: '#fdf2f2', border: '1px solid #ffe4e4' }}>
                                <FileText /> Tariff Comparison Guide
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) return <div style={{ padding: '2rem' }}><Skeleton height="100%" /></div>;
        switch (activeMenu) {
            case 'My Complaints': return <ConsumerCases />;
            case 'Cybersecurity Alerts': return <CybersecurityAlerts />;
            case 'Device Verification': return <DeviceVerification />;
            case 'Tenders': return <Tenders />;
            case 'Consumer Rights': return <ConsumerRights />;
            case 'Dashboard Overview':
            default:
                return renderDashboardOverview();
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ borderRadius: 0 }}>
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <p className="sidebar-org-name">BOCRA Consumer Portal</p>
                </div>

                <div className="menu-label">CONSUMER TOOLS</div>

                <nav className="nav-menu">
                    {topMenuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`nav-item ${activeMenu === item.name ? 'active' : ''}`}
                            onClick={() => {
                                setActiveMenu(item.name);
                                if (window.innerWidth <= 1024) setIsSidebarOpen(false);
                            }}
                            style={{ borderRadius: 0 }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.name}
                        </div>
                    ))}
                </nav>

                {logoutItem && (
                    <div className="sidebar-footer">
                        <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'center' }}>
                            <img 
                                src="/assets/undraw_log-out_2vod.svg" 
                                alt="Logout Illustration" 
                                style={{ width: '80%', height: 'auto', opacity: 0.8 }} 
                            />
                        </div>
                        <div
                            className="nav-item logout-item"
                            onClick={() => onLogout?.()}
                            style={{ borderRadius: 0 }}
                        >
                            <span className="nav-icon">{logoutItem.icon}</span>
                            {logoutItem.name}
                        </div>
                    </div>
                )}

                <button className="sidebar-close-btn" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" />
                    </svg>
                </button>
            </aside>

            <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                <header className="header" style={{ borderRadius: 0 }}>
                    <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor"><path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6z" /><path fillRule="evenodd" d="M11 3H5a2 2 0 0 0-2-2v14a2 2 0 0 0 2 2h6zm-2.293 7.707a1 1 0 0 0-1.414-1.414l-2 2a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414-1.414L7.414 12z" clipRule="evenodd" /></g>
                        </svg>
                    </button>
                    <h1 className="header-title">{activeMenu}</h1>
                    <div className="search-bar">
                        <Search size={18} color="#999" />
                        <input type="text" placeholder="Search Here" className="search-input" />
                    </div>


                    <div className="header-right">
                         <div className="notification-wrapper">
                             <button className="notification-btn" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                                    <rect width="512" height="512" fill="none"/>
                                    <path fill="currentColor" fillRule="evenodd" d="M469.333 149.333V384h-64.04l.04 85.333L250.516 384H149.333V149.333zM362.667 64v42.667h-256v170.666H64V64z"/>
                                </svg>
                                <span className="notification-badge">2</span>
                            </button>


                        </div>

                        <div className="user-profile">
                            <div className="avatar">C</div>
                            <div className="user-info">
                                <span className="user-name">BOCRA Consumer</span>
                                <span className="user-role">Resident</span>
                            </div>
                        </div>

                    </div>
                </header>

                <div className="content-scroll-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default ConsumerDashboard;
