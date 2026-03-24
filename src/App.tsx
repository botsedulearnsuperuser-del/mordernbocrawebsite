import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import SignInScreen from './components/SignInScreen';
import ClientSignInScreen from './components/ClientSignInScreen';
import ConsumerSignInScreen from './components/ConsumerSignInScreen';
import ConsumerSignUpScreen from './components/ConsumerSignUpScreen';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsDashboard from './components/Dashboard/ClientsDashboard';
import ConsumerDashboard from './components/Dashboard/ConsumerDashboard';

import LegaeLandingPage from './components/LandingPage/LegaeLandingPage';
import AboutUs from './components/AboutUs/AboutUs';
import CybersecurityPractices from './components/AboutUs/CybersecurityPractices';
import AIRegulationLaws from './components/AboutUs/AIRegulationLaws';
import ConsumerAffairs from './components/ConsumerAffairs/ConsumerAffairs';
import RegulatoryHub from './components/RegulatoryHub/RegulatoryHub';
import Resources from './components/Resources/Resources';
import { supabase } from './lib/supabase';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null means loading
  const [userRole, setUserRole] = useState<'admin' | 'client' | 'consumer' | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Check initial session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setIsLoggedIn(true);
        setUserRole(profile?.role || 'consumer');
      } else {
        setIsLoggedIn(false);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setIsLoggedIn(true);
        setUserRole(profile?.role || 'consumer');
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);


  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserRole(null);
    navigate('/');
  };

  if (isLoggedIn === null) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LegaeLandingPage onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onAboutUs={() => navigate('/about')} onNavigate={(view) => navigate(`/${view}`)} />} />
        <Route path="/about" element={<AboutUs onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
        <Route path="/cybersecurity" element={<CybersecurityPractices onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
        <Route path="/airegulation" element={<AIRegulationLaws onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
        <Route path="/consumeraffairs" element={<ConsumerAffairs onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
        <Route path="/regulatoryhub" element={<RegulatoryHub onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
        <Route path="/resources" element={<Resources onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />

        {/* Auth Routes */}
        <Route path="/admin-signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignInScreen onLogin={() => {}} onSwitchToClient={() => navigate('/client-signin')} onSwitchToConsumer={() => navigate('/consumer-signin')} />} />
        <Route path="/client-signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ClientSignInScreen onLogin={() => {}} onBackToAdmin={() => navigate('/admin-signin')} />} />
        <Route path="/consumer-signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ConsumerSignInScreen onLogin={() => {}} onBackToAdmin={() => navigate('/admin-signin')} onSwitchToSignUp={() => navigate('/consumer-signup')} />} />
        <Route path="/consumer-signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ConsumerSignUpScreen onSignUp={() => navigate('/consumer-signin')} onBackToSignIn={() => navigate('/consumer-signin')} />} />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/dashboard" 
          element={
            !isLoggedIn ? <Navigate to="/" /> : 
            userRole === 'admin' ? <Dashboard onLogout={handleLogout} /> : 
            userRole === 'client' ? <ClientsDashboard onLogout={handleLogout} /> : 
            <ConsumerDashboard onLogout={handleLogout} />
          } 
        />

        {/* Catch-all/Default */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;


