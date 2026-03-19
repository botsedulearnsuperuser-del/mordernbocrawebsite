import { useState, useEffect } from 'react';
import SignInScreen from './components/SignInScreen';
import ClientSignInScreen from './components/ClientSignInScreen';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsDashboard from './components/Dashboard/ClientsDashboard';
import LegaeLandingPage from './components/LandingPage/LegaeLandingPage';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [currentSignInView, setCurrentSignInView] = useState<'admin' | 'client' | 'landing'>('landing');

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
        userRole === 'admin' ? <Dashboard onLogout={handleLogout} /> : <ClientsDashboard onLogout={handleLogout} />
      ) : (
        currentSignInView === 'landing' ? (
          <LegaeLandingPage onPortalLogin={() => setCurrentSignInView('admin')} />
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
