import { useState, useEffect } from 'react';
import SignInScreen from './components/SignInScreen';
import ClientSignInScreen from './components/ClientSignInScreen';
import Dashboard from './components/Dashboard/Dashboard';
import ClientsDashboard from './components/Dashboard/ClientsDashboard';
import './App.css';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client' | null>(null);
  const [currentSignInView, setCurrentSignInView] = useState<'admin' | 'client'>('admin');

  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    const savedRole = localStorage.getItem('userRole') as 'admin' | 'client' | null;
    
    if (savedLogin === 'true' && savedRole) {
      setIsLoggedIn(true);
      setUserRole(savedRole);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'admin');
    setUserRole('admin');
    setIsLoggedIn(true);
  };

  const handleClientLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', 'client');
    setUserRole('client');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        userRole === 'admin' ? <Dashboard onLogout={handleLogout} /> : <ClientsDashboard onLogout={handleLogout} />
      ) : (
        currentSignInView === 'admin' ? (
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
