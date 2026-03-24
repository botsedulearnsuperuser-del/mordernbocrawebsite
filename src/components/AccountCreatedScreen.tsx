import React from 'react';
import './SignInScreen.css';

const logo = '/assets/bocralogo.png';

interface AccountCreatedScreenProps {
    onContinueToLogin: () => void;
}

const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ onContinueToLogin }) => {
    return (
        <div className="signin-container">
            <div className="signin-split-layout">
                {/* Left Side: Welcome & Information */}
                <div className="signin-welcome-section">
                    <div className="signin-logo-container">
                        <img src={logo} alt="BOCRA Logo" className="signin-logo" />
                    </div>
                    <h1 className="welcome-title">Registration Complete</h1>
                    <p className="welcome-text">
                        Welcome to the Botswana Communications Regulatory Authority securely integrated portal.
                    </p>

                    <div className="welcome-safety-notice">
                        <strong>Important Security Step:</strong> Before accessing your account, you must verify your identity. We have dispatched a verification link to your registered email address.
                    </div>
                </div>

                {/* Right Side: Success Messaging */}
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 2rem' }}>
                    
                    <div style={{ 
                        width: '70px', 
                        height: '70px', 
                        background: '#fdf2f2', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        marginBottom: '1.5rem',
                        color: '#A80000'
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="m15.489 21.27l-3.558-3.558l.708-.708l2.85 2.85l5.688-5.688l.708.707zM4.615 19q-.67 0-1.143-.472Q3 18.056 3 17.385V6.615q0-.67.472-1.143Q3.944 5 4.616 5h14.769q.67 0 1.143.472q.472.472.472 1.144v4.926l-5.506 5.487l-2.855-2.856l-3.533 3.533L10.4 19zM12 12.116l8-5.231L19.692 6L12 11L4.308 6L4 6.885z"/></svg>
                    </div>

                    <h1 className="signin-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Account Successfully Created!</h1>
                    
                    <p style={{ color: '#444', lineHeight: '1.7', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '400px' }}>
                        Your BOCRA profile has been provisioned. To activate your secure session, please check your inbox and click the verification link we just sent you.
                    </p>

                    <button 
                        onClick={onContinueToLogin} 
                        className="login-button" 
                        style={{ width: '100%', maxWidth: '300px' }}
                    >
                        Proceed to Login Portal
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default AccountCreatedScreen;
