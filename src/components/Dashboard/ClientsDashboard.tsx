import React, {
    useState
} from 'react';
import './ClientsDashboard.css';
const logo = '/assets/christianlogo.png';

import { Search } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import MyPolicy from './MyPolicy';
import ClaimsStatus from './ClaimsStatus';
import SupportQueries from './SupportQueries';
import MemberPayments from './MemberPayments';
import Settings from './Settings';
import { useEffect } from 'react';
import Skeleton from '../Skeleton';

// --- Custom Icon Components from SVGs provided by user ---

const NotificationIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" className={className} style={{ color: '#666' }}>
        <path fill="currentColor" d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v1a5 5 0 0 0 10 0v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707M19 25a3 3 0 0 1-6 0v-1h6Z" />
    </svg>
);

const DashboardIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 16 16" className={className}>
        <path fill="currentColor" d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5V6H3v5.5A1.5 1.5 0 0 0 4.5 13H6v1H4.5A2.5 2.5 0 0 1 2 11.5zM12.75 7A1.75 1.75 0 0 0 11 8.75V11H8.75A1.75 1.75 0 0 0 7 12.75v1.5c0 .966.784 1.75 1.75 1.75H14a2 2 0 0 0 2-2V8.75A1.75 1.75 0 0 0 14.25 7zM11 12v3H8.75a.75.75 0 0 1-.75-.75v-1.5a.75.75 0 0 1 .75-.75zm1 3v-3h3v2a1 1 0 0 1-1 1zm0-4V8.75a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75V11z" />
    </svg>
);

const AccountsIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12s0 5.657-1.172 6.828S17.771 20 14 20h-4c-3.771 0-5.657 0-6.828-1.172S2 15.771 2 12" /><path d="M9 12.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 0a4 4 0 0 1 4 4m-4-4a4 4 0 0 0-4 4M15 9h4m-4 3h4" />
        </g>
    </svg>
);

const ApplicationsIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="m11 20.1l8.2-8.2c.5-.5 1.1-.8 1.8-.8s1.3.3 1.8.8l.2.2V4c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8zM3 4h18v3H3zm18 9.1c-.1 0-.3.1-.4.2l-1 1l2.1 2.1l1-1c.2-.2.2-.6 0-.8l-1.3-1.3c-.1-.1-.2-.2-.4-.2m-1.9 1.8l-6.1 6V23h2.1l6.1-6.1z" />
    </svg>
);

const ActiveQueriesIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" className={className}>
        <rect width="48" height="48" fill="none" />
        <g fill="none" stroke="currentColor" strokeWidth="4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M42 24V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v30a3 3 0 0 0 3 3h15" />
            <circle cx="32" cy="32" r="6" fill="currentColor" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m37 36l5 4M14 16h20m-20 8h8" />
        </g>
    </svg>
);

const PaymentsIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <path d="M13.5 15H6c-1.886 0-2.828 0-3.414-.586S2 12.886 2 11V7c0-1.886 0-2.828.586-3.414S4.114 3 6 3h12c1.886 0 2.828 0 3.414.586S22 5.114 22 7v5c0 .932 0 1.398-.152 1.765a2 2 0 0 1-1.083 1.083C20.398 15 19.932 15 19 15" /><path d="M14 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0m-1 8a3 3 0 0 1 3-3v-2a3 3 0 0 1 3-3v5.5c0 2.335 0 3.502-.472 4.386a4 4 0 0 1-1.642 1.642C16.002 21 14.835 21 12.5 21H12c-1.864 0-2.796 0-3.53-.305a4 4 0 0 1-2.166-2.164C6 17.796 6 16.864 6 15" />
        </g>
    </svg>
);

const SettingsIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" className={className}>
        <path fill="currentColor" d="M7.25 6A3.25 3.25 0 0 0 4 9.25v9.5A3.25 3.25 0 0 0 7.25 22h7.25c0-.687.077-1.357.223-2H7.25C6.56 20 6 19.44 6 18.75v-9.5C6 8.56 6.56 8 7.25 8h17.5c.69 0 1.25.56 1.25 1.25v4.102a9 9 0 0 1 2 .852V9.25A3.25 3.25 0 0 0 24.75 6zM3 24h11.723c.16.701.4 1.372.712 2H3a1 1 0 1 1 0-2m15.843-5.963a1.52 1.52 0 0 1-1.117 1.927l-1.536.35a7.5 7.5 0 0 0-.04 3.19l1.698.423a1.52 1.52 0 0 1 1.096 1.893l-.496 1.723a7.5 7.5 0 0 0 2.75 1.597l1.26-1.3a1.53 1.53 0 0 1 2.193 0l1.236 1.272a7.5 7.5 0 0 0-2.737-1.635l-.467-1.513a1.52 1.52 0 0 1 1.117-1.928l1.536-.35a7.5 7.5 0 0 0 .04-3.19l-1.698-.423a1.52 1.52 0 0 1-1.096-1.892l.496-1.724a7.5 7.5 0 0 0-2.75-1.597l-1.26 1.3a1.53 1.53 0 0 1-2.193 0l-1.236-1.272a7.5 7.5 0 0 0-2.737 1.635zM25.5 22a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
    </svg>
);

const LogoutIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M3 21V3h9v2H5v14h7v2zm13-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"/>
    </svg>
);

// --- Stats Widgets Icons ---

const TotalAccountsIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" d="M12 5a3.5 3.5 0 0 0-3.5 3.5A3.5 3.5 0 0 0 12 12a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 12 5m0 2a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 10a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 7M5.5 8A2.5 2.5 0 0 0 3 10.5c0 .94.53 1.75 1.29 2.18c.36.2.77.32 1.21.32s.85-.12 1.21-.32c.37-.21.68-.51.91-.87A5.42 5.42 0 0 1 6.5 8.5v-.28c-.3-.14-.64-.22-1-.22m13 0c-.36 0-.7.08-1 .22v.28c0 1.2-.39 2.36-1.12 3.31c.12.19.25.34.4.49a2.48 2.48 0 0 0 1.72.7c.44 0 .85-.12 1.21-.32c.76-.43 1.29-1.24 1.29-2.18A2.5 2.5 0 0 0 18.5 8M12 14c-2.34 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.66-3.5-7-3.5m-7.29.55C2.78 14.78 0 15.76 0 17.5V19h3v-1.93c0-1.01.69-1.85 1.71-2.52m14.58 0c1.02.67 1.71 1.51 1.71 2.52V19h3v-1.5c0-1.74-2.78-2.72-4.71-2.95M12 16c1.53 0 3.24.5 4.23 1H7.77c.99-.5 2.7-1 4.23-1" />
    </svg>
);

const ApprovedCustomersIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 48 48" className={className}>
        <path fill="currentColor" fillRule="evenodd" d="M19.411.532a19 19 0 0 1 1.651-.075c.583 0 1.145.031 1.652.075a3.4 3.4 0 0 1 2.289 1.156c8.725 1.609 15.907 8.94 16.27 17.903l4.108 5.23a4.94 4.94 0 0 1 1.056 3.053c0 1.945-1.15 3.77-3.037 4.51c-.732.288-1.634.626-2.542.92l-.917 6.131a4.44 4.44 0 0 1-5.02 3.744l-2.15-.308v2.59a2 2 0 0 1-4 0v-4.897a2 2 0 0 1 2.283-1.98l4.435.636a.44.44 0 0 0 .496-.376l1.105-7.388a2 2 0 0 1 1.463-1.637c1.068-.284 2.347-.75 3.384-1.158c.278-.109.5-.4.5-.787a.94.94 0 0 0-.2-.583l-4.523-5.755a2 2 0 0 1-.428-1.235c0-6.554-4.847-12.359-11.334-14.279c.016.925.027 2.011.027 3.268c0 .933-.006 2.448-.015 3.442a8.837 8.837 0 0 1-1.71 15.59c2.481 2.156 5.631 3.469 8.559 3.469a2 2 0 1 1 0 4c-4.989 0-10.029-2.685-13.287-6.595a2 2 0 0 1-.292-.47a8.837 8.837 0 0 1-3.072-15.994a411 411 0 0 1-.016-3.442q.002-1.749.024-3.067C9.922 8.377 5.437 14.303 5.437 21.27c0 6.043 3.357 11.736 8.197 14.427a2 2 0 0 1 1.028 1.748v8.015a2 2 0 0 1-4 0v-6.884C5.075 34.963 1.437 28.277 1.437 21.27c0-9.5 6.658-17.44 15.561-19.433A3.4 3.4 0 0 1 19.411.532" clipRule="evenodd" />
    </svg>
);

const ApprovedCheckIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" className={className}>
        <path fill="currentColor" fillRule="evenodd" d="M10.586 2.1a2 2 0 0 1 2.7-.116l.128.117L15.314 4H18a2 2 0 0 1 1.994 1.85L20 6v2.686l1.9 1.9a2 2 0 0 1 .116 2.701l-.117.127l-1.9 1.9V18a2 2 0 0 1-1.85 1.995L18 20h-2.685l-1.9 1.9a2 2 0 0 1-2.701.116l-.127-.116l-1.9-1.9H6a2 2 0 0 1-1.995-1.85L4 18v-2.686l-1.9-1.9a2 2 0 0 1-.116-2.701l.116-.127l1.9-1.9V6a2 2 0 0 1 1.85-1.994L6 4h2.686z" className="duoicon-secondary-layer" opacity="0.3" /><path fill="currentColor" fillRule="evenodd" d="m15.079 8.983l-4.244 4.244l-1.768-1.768a1 1 0 1 0-1.414 1.415l2.404 2.404a1.1 1.1 0 0 0 1.556 0l4.88-4.881a1 1 0 0 0-1.414-1.414" className="duoicon-primary-layer" />
    </svg>
);


const data = [
    { name: 'Jan', value: 22, color: '#A80000' },
    { name: 'Feb', value: 29, color: '#D1D1D1' },
    { name: 'Mar', value: 22, color: '#D1D1D1' },
    { name: 'Apr', value: 26, color: '#D1D1D1' },
    { name: 'May', value: 29, color: '#D1D1D1' },
    { name: 'Jun', value: 33, color: '#D1D1D1' },
    { name: 'July', value: 37, color: '#D1D1D1' },
    { name: 'Aug', value: 37, color: '#D1D1D1' },
    { name: 'Sep', value: 55, color: '#A1A1A1' },
];

const ClientsDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeMenu]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const menuItems = [
        { name: 'Dashboard', icon: <DashboardIcon size={20} /> },
        { name: 'My Policy', icon: <AccountsIcon size={20} /> },
        { name: 'Claims Status', icon: <ApplicationsIcon size={20} /> },
        { name: 'Support/Queries', icon: <ActiveQueriesIcon size={20} /> },
        { name: 'Payments', icon: <PaymentsIcon size={20} /> },
        { name: 'Settings', icon: <SettingsIcon size={20} /> },
        { name: 'Logout', icon: <LogoutIcon size={20} /> },
    ];

    const DashboardSkeleton = () => (
        <div style={{ padding: '2rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <Skeleton width="180px" height="28px" />
                <Skeleton variant="circle" width="40px" height="40px" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                {[1, 2].map(i => (
                    <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee' }}>
                        <Skeleton variant="circle" width="36px" height="36px" />
                        <div style={{ marginTop: '1rem' }}>
                            <Skeleton width="100px" height="12px" />
                            <Skeleton width="140px" height="20px" />
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                <Skeleton height="400px" />
            </div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) return <DashboardSkeleton />;
        switch (activeMenu) {
            case 'My Policy':
                return <MyPolicy />;
            case 'Claims Status':
                return <ClaimsStatus />;
            case 'Support/Queries':
                return <SupportQueries />;
            case 'Payments':
                return <MemberPayments />;
            case 'Settings':
                return <Settings />;
            case 'Dashboard':
            default:
                return (
                    <div className="dashboard-container">
                        <div className="content-grid">
                            {/* Left Main Panel */}
                            <div className="left-panel">
                                {/* Stats Grid (2x2) */}
                                <div className="stats-grid">
                                    <div className="stat-card">
                                        <div className="stat-icon"><TotalAccountsIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Membership Status</h3>
                                            <div className="stat-value" style={{ fontSize: '1.5rem' }}>Active (Waiting)</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><ApprovedCustomersIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Total Contributions</h3>
                                            <div className="stat-value">P1,350.00</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><ActiveQueriesIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Active Queries</h3>
                                            <div className="stat-value">01</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><ApprovedCheckIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Benefit Amount</h3>
                                            <div className="stat-value">P15,000.00</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Charts Row: Applications History + Overall Applications */}
                                 <div className="charts-row">
                                     <div className="card">
                                         <div className="card-header">
                                             <h3 className="card-title">My Contribution History</h3>
                                             <button style={{
                                                 padding: '4px 12px',
                                                 border: '1px solid #ccc',
                                                 borderRadius: '6px',
                                                 background: 'white',
                                                 cursor: 'pointer',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 gap: '8px',
                                                 fontSize: '0.8rem',
                                                 fontWeight: '500'
                                             }}>
                                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048">
                                                     <path fill="currentColor" d="M1152 1536h896l-448 448zm0-128v-128H896v640H256v-805l-83 82l-90-90l941-942l941 942l-90 90l-83-82v293h-128V987l-640-640l-640 640v805h384v-640h512v256z" />
                                                 </svg>
                                                 Statement
                                             </button>
                                         </div>
                                         <div className="chart-container">
                                             <ResponsiveContainer width="100%" height="100%">
                                                 <BarChart data={data}>
                                                     <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={10} />
                                                     <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={20}>
                                                         {data.map((entry, index) => (
                                                             <Cell key={`cell-${index}`} fill={entry.color} />
                                                         ))}
                                                     </Bar>
                                                 </BarChart>
                                             </ResponsiveContainer>
                                         </div>
                                     </div>

                                     <div className="card">
                                         <h3 className="card-title">Current Policy Status</h3>
                                         <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '1rem 0' }}>92%</h1>
                                         <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Waiting period progression to full claim eligibility.</p>
                                         <div className="overall-bar">
                                             <div className="bar-segment" style={{ width: '92%', background: '#22c55e' }}></div>
                                             <div className="bar-segment" style={{ width: '8%', background: '#D1D1D1' }}></div>
                                         </div>
                                         <div className="legend">
                                             <div className="legend-item">
                                                 <div className="dot" style={{ background: '#22c55e' }}></div>
                                                 <div>
                                                     <div style={{ fontWeight: 'bold' }}>Active</div>
                                                     <div style={{ color: '#666', fontSize: '0.7rem' }}>Paid up to date</div>
                                                 </div>
                                             </div>
                                         </div>
                                         <button
                                             className="payment-btn"
                                             style={{ marginTop: '2rem', background: '#A80000' }}
                                             onClick={() => setActiveMenu('Claims Status')}
                                         >
                                             Check Claim Eligibility
                                         </button>
                                     </div>
                                </div>

                                {/* My Coverage Details */}
                                <div className="card" style={{ height: '300px' }}>
                                    <h3 className="card-title">My Coverage Details</h3>
                                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <p>• <b>Principal Member:</b> Covered (3 months waiting period cleared).</p>
                                        <p>• <b>Additional Members:</b> 4/5 slots used (Nuclear family only).</p>
                                        <p>• <b>Child Dependents:</b> 2 members (Ages 12, 18).</p>
                                        <p>• <b>Policy Limit:</b> P15,000.00 standard funeral benefit.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="right-panel">
                                {/* Wrapper Card for Amounts */}
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <div className="red-card" style={{ padding: '1.5rem' }}>
                                        <h3>Make a Payment</h3>
                                        <p>Monthly Premium Due</p>
                                        <div className="amount" style={{ fontSize: '1.8rem' }}>P120.00</div>
                                    </div>

                                    <div className="red-card" style={{ padding: '1.5rem' }}>
                                        <h3>Next Admin Fee</h3>
                                        <p>Annual Due September 2026</p>
                                        <div className="amount">P15.00</div>
                                    </div>

                                    <button
                                        className="payment-btn"
                                        onClick={() => setActiveMenu('Payments')}
                                    >
                                        Proceed to Pay Now
                                    </button>
                                </div>

                                {/* Account Reminders */}
                                <div className="card" style={{ height: '300px' }}>
                                    <h3 className="card-title">Personalized Notifications</h3>
                                    <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <p><b>- Policy Reminder:</b> Your annual admin fee is due in 6 months.</p>
                                        <p><b>- Status Update:</b> Your additional member "Neo" has 2 months left in waiting period.</p>
                                        <p><b>- Child Dependent:</b> "Mosa" will reach age 21 in 3 years.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                );
        }
    };

    return (
        <div className="dashboard-layout">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                    <p className="sidebar-org-name">The Follower of Jesus Christ Church Funeral Policy</p>
                </div>

                <div className="menu-label">MENU</div>

                <nav className="nav-menu">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`nav-item ${activeMenu === item.name ? 'active' : ''}`}
                            onClick={() => {
                                if (item.name === 'Logout') {
                                    onLogout?.();
                                } else {
                                    setActiveMenu(item.name);
                                    if (window.innerWidth <= 1024) setIsSidebarOpen(false);
                                }
                            }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.name}
                        </div>
                    ))}
                </nav>

                <button className="sidebar-close-btn" onClick={toggleSidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" />
                    </svg>
                </button>
            </aside>

            <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
                {/* Header */}
                <header className="header">
                    <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g fill="currentColor">
                                <path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6z" />
                                <path fillRule="evenodd" d="M11 3H5a2 2 0 0 0-2-2v14a2 2 0 0 0 2 2h6zm-2.293 7.707a1 1 0 0 0-1.414-1.414l-2 2a1 1 0 0 0 0 1.414l2 2a1 1 0 0 0 1.414-1.414L7.414 12z" clipRule="evenodd" />
                            </g>
                        </svg>
                    </button>
                    {!['My Policy', 'Claims Status', 'Support/Queries', 'Settings', 'Payments'].includes(activeMenu) ? (
                        <>
                            <h1 className="header-title">
                                {activeMenu}
                            </h1>

                            <div className="search-bar">
                                <Search size={18} color="#999" />
                                <input type="text" placeholder="Search Here" className="search-input" />
                            </div>
                        </>
                    ) : (
                        <div></div> // Spacer to keep header-right on the right side
                    )}

                    <div className="header-right">
                        <button className="notification-btn">
                            <NotificationIcon size={20} />
                        </button>
                        <div className="user-profile">
                            <div className="avatar">C</div>
                            <div className="user-info">
                                <span className="user-name">Client User</span>
                                <span className="user-role">Client</span>
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

export default ClientsDashboard;
