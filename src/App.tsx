import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import SignInScreen from './components/SignInScreen';
import ClientSignInScreen from './components/ClientSignInScreen';
import ConsumerSignInScreen from './components/ConsumerSignInScreen';
import ConsumerSignUpScreen from './components/ConsumerSignUpScreen';
import AccountCreatedScreen from './components/AccountCreatedScreen';
import AccountVerifiedScreen from './components/AccountVerifiedScreen';
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

// --- Error Boundary for Deployment Diagnostics ---
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Caught global runtime error:", event.error);
      setHasError(true);
      setError(event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '40px', background: '#fff', color: '#A80000', textAlign: 'center', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Application Crash Detected</h1>
        <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>We've encountered a runtime error. This might be due to missing configuration or a browser incompatibility.</p>
        <pre style={{ background: '#f8f8f8', padding: '1.5rem', borderRadius: '8px', overflow: 'auto', maxWidth: '90%', marginBottom: '2rem', fontSize: '0.85rem' }}>
          {error?.stack || error?.message || 'Unknown error details'}
        </pre>
        <button onClick={() => window.location.reload()} style={{ background: '#A80000', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Attempt Recovery (Reload)
        </button>
      </div>
    );
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null means loading
  const [userRole, setUserRole] = useState<'admin' | 'client' | 'consumer' | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    console.log('App mounting: Checking initial authentication session...');
    
    // Safety timeout to prevent infinite hang on "Initialising..."
    const safetyTimeout = setTimeout(() => {
      if (isLoggedIn === null) {
        console.warn('Auth initialization timed out after 5s. Falling back to public view.');
        setIsLoggedIn(false);
      }
    }, 5000);

    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        clearTimeout(safetyTimeout);
        console.log('Session result:', session ? 'User logged in' : 'No active session');
        
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
      } catch (err: any) {
        clearTimeout(safetyTimeout);
        console.error('Critical Error during Auth initialization:', err);
        setIsLoggedIn(false);
      }
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth event triggered:', _event);
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
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fdfdfd' }}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#A80000', marginBottom: '10px' }}>BOCRA PORTAL</h2>
          <p style={{ color: '#666' }}>Initialising secure connection...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LegaeLandingPage onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onAboutUs={() => navigate('/about')} onNavigate={(view) => navigate(`/${view}`)} />} />
          <Route path="/about" element={<AboutUs onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
          <Route path="/cybersecurity" element={<CybersecurityPractices onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
          <Route path="/airegulation" element={<AIRegulationLaws onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
          <Route path="/consumeraffairs" element={<ConsumerAffairs onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
          <Route path="/regulatoryhub" element={<RegulatoryHub onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />
          <Route path="/resources" element={<Resources onBackToLanding={() => navigate('/')} onPortalLogin={() => navigate('/admin-signin')} onClientPortalLogin={() => navigate('/client-signin')} onConsumerPortalLogin={() => navigate('/consumer-signin')} onNavigate={(view) => navigate(`/${view}`)} />} />

          {/* Auth Routes */}
          <Route path="/admin-signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <SignInScreen onLogin={() => { setIsLoggedIn(true); navigate('/dashboard'); }} onSwitchToClient={() => navigate('/client-signin')} onSwitchToConsumer={() => navigate('/consumer-signin')} />} />
          <Route path="/client-signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ClientSignInScreen onLogin={() => { setIsLoggedIn(true); navigate('/dashboard'); }} onBackToAdmin={() => navigate('/admin-signin')} />} />
          <Route path="/consumer-signin" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ConsumerSignInScreen onLogin={() => { setIsLoggedIn(true); navigate('/dashboard'); }} onBackToAdmin={() => navigate('/admin-signin')} onSwitchToSignUp={() => navigate('/consumer-signup')} />} />
          <Route path="/consumer-signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <ConsumerSignUpScreen onSignUp={() => navigate('/account-created')} onBackToSignIn={() => navigate('/consumer-signin')} />} />
          <Route path="/account-created" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AccountCreatedScreen onContinueToLogin={() => navigate('/consumer-signin')} />} />
          <Route path="/account-verified" element={isLoggedIn ? <Navigate to="/dashboard" /> : <AccountVerifiedScreen onContinueToLogin={() => navigate('/consumer-signin')} />} />

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
    </ErrorBoundary>
  );
}

export default App;


