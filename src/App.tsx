import { useState } from 'react';
import SignInScreen from './components/SignInScreen';
import ClientSignInScreen from './components/ClientSignInScreen';
import Dashboard from './components/Dashboard/Dashboard';
import ConsumerDashboard from './components/Dashboard/ConsumerDashboard';

import LegaeLandingPage from './components/LandingPage/LegaeLandingPage';
import AboutUs from './components/AboutUs/AboutUs';
import CybersecurityPractices from './components/AboutUs/CybersecurityPractices';
import AIRegulationLaws from './components/AboutUs/AIRegulationLaws';
import ConsumerAffairs from './components/ConsumerAffairs/ConsumerAffairs';
import RegulatoryHub from './components/RegulatoryHub/RegulatoryHub';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [currentSignInView, setCurrentSignInView] = useState<'admin' | 'client' | 'landing' | 'about' | 'cybersecurity' | 'airegulation' | 'consumeraffairs' | 'regulatoryhub'>('landing');

  const handleLogin = () => {
    setUserRole('admin');
    setIsLoggedIn(true);
  };

  const handleClientLogin = () => {
    setUserRole('client');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentSignInView('landing');
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        userRole === 'admin' ? <Dashboard onLogout={handleLogout} /> : <ConsumerDashboard onLogout={handleLogout} />
      ) : (
        currentSignInView === 'landing' ? (
          <LegaeLandingPage onPortalLogin={() => setCurrentSignInView('admin')} onClientPortalLogin={() => setCurrentSignInView('client')} onAboutUs={() => setCurrentSignInView('about')} onNavigate={(view) => setCurrentSignInView(view as any)} />
        ) : currentSignInView === 'about' ? (
          <AboutUs onBackToLanding={() => setCurrentSignInView('landing')} onPortalLogin={() => setCurrentSignInView('admin')} onClientPortalLogin={() => setCurrentSignInView('client')} onNavigate={(view) => setCurrentSignInView(view as any)} />
        ) : currentSignInView === 'cybersecurity' ? (
          <CybersecurityPractices onBackToLanding={() => setCurrentSignInView('landing')} onPortalLogin={() => setCurrentSignInView('admin')} onClientPortalLogin={() => setCurrentSignInView('client')} onNavigate={(view) => setCurrentSignInView(view as any)} />
        ) : currentSignInView === 'airegulation' ? (
          <AIRegulationLaws onBackToLanding={() => setCurrentSignInView('landing')} onPortalLogin={() => setCurrentSignInView('admin')} onClientPortalLogin={() => setCurrentSignInView('client')} onNavigate={(view) => setCurrentSignInView(view as any)} />
        ) : currentSignInView === 'consumeraffairs' ? (
          <ConsumerAffairs onBackToLanding={() => setCurrentSignInView('landing')} onPortalLogin={() => setCurrentSignInView('admin')} onClientPortalLogin={() => setCurrentSignInView('client')} onNavigate={(view) => setCurrentSignInView(view as any)} />
        ) : currentSignInView === 'regulatoryhub' ? (
          <RegulatoryHub onBackToLanding={() => setCurrentSignInView('landing')} onPortalLogin={() => setCurrentSignInView('admin')} onClientPortalLogin={() => setCurrentSignInView('client')} onNavigate={(view) => setCurrentSignInView(view as any)} />
        ) : currentSignInView === 'admin' ? (
          <SignInScreen 
            onLogin={handleLogin} 
            onSwitchToClient={() => setCurrentSignInView('client')} 
          />
        ) : (
          <ClientSignInScreen 
            onLogin={handleClientLogin} 
            onBackToAdmin={() => setCurrentSignInView('admin')} 
          />
        )
      )}
    </div>
  );
}

export default App;
