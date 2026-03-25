import React, {
    useState
} from 'react';
import './ClientsDashboard.css';
const logo = '/assets/bocralogo.png';

import { Search } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';
import MyPolicy from './MyPolicy';
import ClaimsStatus from './ClaimsStatus';
import SupportQueries from './SupportQueries';
import MemberPayments from './MemberPayments';
import Settings from './Settings';
import ConsumerCases from './ConsumerCases';
import { useEffect } from 'react';
import ClientProfile from './ClientProfile';
import Skeleton from '../Skeleton';
import { supabase } from '../../lib/supabase';

// --- Custom Icon Components from SVGs provided by user ---

const NotificationIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" className={className} style={{ color: '#666' }}>
        <path fill="currentColor" d="M28.707 19.293L26 16.586V13a10.014 10.014 0 0 0-9-9.95V1h-2v2.05A10.014 10.014 0 0 0 6 13v3.586l-2.707 2.707A1 1 0 0 0 3 20v3a1 1 0 0 0 1 1h7v1a5 5 0 0 0 10 0v-1h7a1 1 0 0 0 1-1v-3a1 1 0 0 0-.293-.707M19 25a3 3 0 0 1-6 0v-1h6Z" />
    </svg>
);

const ProfileIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
        <rect width="24" height="24" fill="none"/><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6m0 14c-2.03 0-4.43-.82-6.14-2.88a9.947 9.947 0 0 1 12.28 0C16.43 19.18 14.03 20 12 20"/>
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
        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.393 4C4 4.617 4 5.413 4 7.004v9.994c0 1.591 0 2.387.393 3.002q.105.165.235.312c.483.546 1.249.765 2.78 1.202c1.533.438 2.3.657 2.856.329a1.5 1.5 0 0 0 .267-.202C11 21.196 11 20.4 11 18.803V5.197c0-1.596 0-2.393-.469-2.837a1.5 1.5 0 0 0-.267-.202c-.555-.328-1.323-.11-2.857.329c-1.53.437-2.296.656-2.78 1.202a2.5 2.5 0 0 0-.234.312M11 4h2.017c1.902 0 2.853 0 3.443.586c.33.326.476.764.54 1.414m-6 14h2.017c1.902 0 2.853 0 3.443-.586c.33-.326.476-.764.54-1.414m4-6h-7m5.5-2.5S22 11.34 22 12s-2.5 2.5-2.5 2.5" />
    </svg>
);

const LogoutPortalIcon = ({ size = 36, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" className={className}>
        <path fill="currentColor" d="M30.86 20.94a4.7 4.7 0 0 1 1.86.64h.05a15.1 15.1 0 0 0-.61-8.37a1 1 0 1 0-1.87.69a13.2 13.2 0 0 1 .57 7.04m-4.53 7.64a13 13 0 0 1-6.07 2.82a1 1 0 1 0 .17 2h.18a15.16 15.16 0 0 0 7.21-3.4v-.07a4.7 4.7 0 0 1-1.49-1.35m-10.71 2.76a13.3 13.3 0 0 1-4.29-1.61a15 15 0 0 1-1.63-1.11A4.7 4.7 0 0 1 8.24 30a16 16 0 0 0 2.07 1.48a15.4 15.4 0 0 0 4.94 1.86h.19a1 1 0 0 0 .18-2M4.56 21.15q.3 0 .6-.09A13 13 0 0 1 5.7 14a1 1 0 0 0-1.88-.69a15 15 0 0 0-.56 8.43a4.8 4.8 0 0 1 1.3-.59" /><path fill="currentColor" d="M31.9 23a3.2 3.2 0 0 0-2.43-.42a3.3 3.3 0 0 0-1.4.77l-3.87-2.24a6.87 6.87 0 0 0-2.77-8.43l-.11-.07a6.7 6.7 0 0 0-2.42-.81V8a3.23 3.23 0 0 0 1.88-1.5A3.3 3.3 0 0 0 19.65 2a3.15 3.15 0 0 0-2.42-.32a3.24 3.24 0 0 0-2 1.51a3.3 3.3 0 0 0 1.13 4.46a3 3 0 0 0 .74.35v3.8a6.63 6.63 0 0 0-4.86 3.28a6.85 6.85 0 0 0-.42 6l-4 2.29a4 4 0 0 0-.45-.37A3.2 3.2 0 0 0 3 24.21a3.3 3.3 0 0 0 1.1 4.46a3.2 3.2 0 0 0 1.65.46a3 3 0 0 0 .78-.1a3.25 3.25 0 0 0 2.34-3.94v-.17l3.88-2.24a7 7 0 0 0 1.89 1.71a6.49 6.49 0 0 0 8.73-1.7l3.83 2.21a3.29 3.29 0 0 0 1.45 3.64A3.18 3.18 0 0 0 33 27.41A3.3 3.3 0 0 0 31.9 23M8.05 10a13 13 0 0 1 5.35-3.77a5 5 0 0 1-.17-2.07a15.15 15.15 0 0 0-6.7 4.51A1 1 0 0 0 8.05 10" /><path fill="currentColor" d="M24.67 7.23A13.1 13.1 0 0 1 27.93 10a1 1 0 1 0 1.52-1.3a15 15 0 0 0-3.76-3.2a16 16 0 0 0-2.94-1.33a4.8 4.8 0 0 1-.15 2.06a14 14 0 0 1 2.07 1" /><path fill="none" d="M0 0h36v36H0z" /></svg>
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
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [profile, setProfile] = useState<{ full_name: string; avatar_url: string | null } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('full_name, avatar_url')
                        .eq('id', user.id)
                        .maybeSingle();

                    const googleName = user.user_metadata?.full_name || '';
                    const googleAvatar = user.user_metadata?.avatar_url || '';

                    if (data) {
                        setProfile({
                            full_name: data.full_name || googleName || user.email?.split('@')[0] || 'Client',
                            avatar_url: data.avatar_url || googleAvatar
                        });
                    } else {
                        setProfile({
                            full_name: googleName || user.email?.split('@')[0] || 'Client',
                            avatar_url: googleAvatar || null
                        });
                    }
                }
            } catch (err) {
                console.error('Error fetching client profile:', err);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [activeMenu]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const menuItems = [
        { name: 'Dashboard Overview', icon: <DashboardIcon size={16} /> },
        { name: 'My Profile', icon: <ProfileIcon size={16} /> },
        { name: 'License Manager', icon: <AccountsIcon size={16} /> },
        { name: 'Spectrum Portal', icon: <ApplicationsIcon size={16} /> },
        { name: 'Technical Vault', icon: <ActiveQueriesIcon size={16} /> },
        { name: 'Compliance Labels', icon: <PaymentsIcon size={16} /> },
        { name: 'Consumer Cases', icon: <SettingsIcon size={16} /> },
        { name: 'Logout Portal', icon: <LogoutIcon size={16} /> },
    ];

    const topMenuItems = menuItems.filter(item => item.name !== 'Logout Portal');
    const logoutItem = menuItems.find(item => item.name === 'Logout Portal');

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
            case 'License Manager':
                return <MyPolicy />;
            case 'Spectrum Portal':
                return <ClaimsStatus />;
            case 'Technical Vault':
                return <SupportQueries />;
            case 'Compliance Labels':
                return <MemberPayments />;
            case 'Consumer Cases':
                return <ConsumerCases />;
            case 'My Profile':
                return <ClientProfile />;
            case 'Dashboard Overview':
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
                                            <h3>Active Industry Licenses</h3>
                                            <div className="stat-value" style={{ fontSize: '1.5rem' }}>NFP & SAP Active</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><ApprovedCustomersIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Spectrum Bidding Status</h3>
                                            <div className="stat-value">5G Frequency Open</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><ActiveQueriesIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Technical Vault Items</h3>
                                            <div className="stat-value">ITU Region 1</div>
                                        </div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon"><ApprovedCheckIcon size={48} /></div>
                                        <div className="stat-info">
                                            <h3>Dispute Case Resolution</h3>
                                            <div className="stat-value">Evidence Pending</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Charts Row: Applications History + Overall Applications */}
                                <div className="charts-row">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Type Approval Timeline</h3>
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
                                                Approval Log
                                            </button>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Tracking the 5–14 day target for technical product clearance.</p>
                                        <div className="chart-container" style={{ height: '150px' }}>
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
                                        <h3 className="card-title">Consumer Case Pipeline</h3>
                                        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '1rem 0' }}>Dispute Tracker</h1>
                                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1rem' }}>Visual tracker: Submitted → Provider Notified → Mediation → Decision.</p>
                                        <div className="overall-bar">
                                            <div className="bar-segment" style={{ width: '25%', background: '#22c55e' }}></div>
                                            <div className="bar-segment" style={{ width: '25%', background: '#f97316' }}></div>
                                            <div className="bar-segment" style={{ width: '25%', background: '#3b82f6' }}></div>
                                            <div className="bar-segment" style={{ width: '25%', background: '#a855f7' }}></div>
                                        </div>
                                        <div className="legend">
                                            <div className="legend-item">
                                                <div className="dot" style={{ background: '#22c55e' }}></div>
                                                <div>
                                                    <div style={{ fontWeight: 'bold' }}>Mediation</div>
                                                    <div style={{ color: '#666', fontSize: '0.7rem' }}>Stage 3 active</div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="payment-btn"
                                            style={{ marginTop: '1rem', background: '#A80000' }}
                                            onClick={() => setActiveMenu('Consumer Cases')}
                                        >
                                            Upload Case Evidence
                                        </button>
                                    </div>
                                </div>

                                <div className="card" style={{ height: '300px' }}>
                                    <h3 className="card-title">Technical Compliance Vault</h3>
                                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                        <p>• <b>Unified Manager:</b> Draft NFP & SAP licenses with digital document auto-save.</p>
                                        <p>• <b>Certification Vault:</b> Directly submit ITU Region 1 certificates for type approval.</p>
                                        <p>• <b>Label Generator:</b> Instant BOCRA Compliance Labels for approved equipment.</p>
                                        <p>• <b>Support Network:</b> Mandatory local repair center registration and verification.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel */}
                            <div className="right-panel">
                                {/* Wrapper Card for Amounts */}
                                <div className="card" style={{ padding: '1.5rem' }}>
                                    <div className="red-card" style={{ padding: '1.5rem' }}>
                                        <h3>Spectrum Bidder Access</h3>
                                        <p>Required Frequency Auction Deposit</p>
                                        <div className="amount" style={{ fontSize: '1.8rem' }}>BWP50,000.00</div>
                                    </div>

                                    <div className="red-card" style={{ padding: '1.5rem' }}>
                                        <h3>Type Approval Fee</h3>
                                        <p>Technical Equipment Certification</p>
                                        <div className="amount">BWP2,500.00</div>
                                    </div>

                                    <button
                                        className="payment-btn"
                                        onClick={() => setActiveMenu('Spectrum Portal')}
                                    >
                                        Enter Bidder Portal
                                    </button>
                                </div>

                                {/* Account Reminders */}
                                <div className="card" style={{ height: '300px' }}>
                                    <h3 className="card-title">Industry & Service Updates</h3>
                                    <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        <p><b>- 5G Auctions:</b> New frequency bands for Region 1 auctions are now live.</p>
                                        <p><b>- ITU Compliance:</b> Standard updates for terminal equipment certification vault.</p>
                                        <p><b>- Dispute Cases:</b> Provider response received for Case #BOC-2024-081.</p>
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
                    <p className="sidebar-org-name">Botswana Communications Regulatory Authority</p>
                </div>

                <div className="menu-label">MENU</div>

                <nav className="nav-menu">
                    {topMenuItems.map((item) => (
                        <div
                            key={item.name}
                            className={`nav-item ${activeMenu === item.name ? 'active' : ''}`}
                            onClick={() => {
                                setActiveMenu(item.name);
                                if (window.innerWidth <= 1024) setIsSidebarOpen(false);
                            }}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.name}
                        </div>
                    ))}
                </nav>

                <div className="sidebar-help-card" style={{ margin: '1rem', padding: '1rem', background: 'linear-gradient(135deg, #004D40 0%, #00695C 100%)', borderRadius: '12px', textAlign: 'center', color: 'white' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: '600' }}>Client Support</h4>
                    <p style={{ fontSize: '0.75rem', opacity: '0.8', marginBottom: '1rem', lineHeight: '1.3' }}>Need assistance with Regulatory Services? Contact our team.</p>
                    <button style={{ width: '100%', background: 'white', color: '#004D40', border: 'none', padding: '0.6rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.8rem' }}>Contact Support</button>
                </div>

                {logoutItem && (
                    <div className="sidebar-footer">
                        <div
                            className="nav-item logout-item"
                            onClick={() => onLogout?.()}
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
                    {!['License Manager', 'Spectrum Portal', 'Technical Vault', 'Consumer Cases', 'Compliance Labels'].includes(activeMenu) ? (
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
                        <div className="notification-wrapper">
                            <button className="notification-btn" onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
                                <NotificationIcon size={20} />
                                <span className="notification-badge">3</span>
                            </button>

                            {isNotificationsOpen && (
                                <div className="notifications-popup">
                                    <div className="notifications-header">
                                        <h4>Notifications</h4>
                                        <span className="mark-read">Mark all as read</span>
                                    </div>
                                    <div className="notifications-list">
                                        <div className="notification-item unread">
                                             <div className="notification-content">
                                                <p className="notification-text">Your NFP License application has been approved.</p>
                                                <span className="notification-time">10 mins ago</span>
                                            </div>
                                        </div>
                                        <div className="notification-item unread">
                                             <div className="notification-content">
                                                <p className="notification-text">Action Required: Spectrum bidding deadline approaching.</p>
                                                <span className="notification-time">2 hours ago</span>
                                            </div>
                                        </div>
                                        <div className="notification-item">
                                             <div className="notification-content">
                                                <p className="notification-text">Payment received for Type Approval Fee.</p>
                                                <span className="notification-time">1 day ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="notifications-footer">
                                        View All Notifications
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="user-profile" onClick={() => setActiveMenu('Settings')} style={{ cursor: 'pointer' }}>
                            <div className="avatar">
                                {profile?.avatar_url ? (
                                    <img src={profile.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    (profile?.full_name?.[0] || 'C').toUpperCase()
                                )}
                            </div>
                            <div className="user-info">
                                <span className="user-name">{profile?.full_name || 'Client User'}</span>
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
