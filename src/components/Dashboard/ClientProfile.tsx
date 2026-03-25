import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Pencil } from 'lucide-react';
import './Settings.css';

const ClientProfile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showSecurityModal, setShowSecurityModal] = useState(false);
    const [showPreferencesModal, setShowPreferencesModal] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        fetchProfile();
        
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUserEmail(session.user.email || '');
            } else {
                setUserEmail('');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        let finished = false;
        
        // Safety timeout for profile fetch
        const profileTimeout = setTimeout(() => {
            if (!finished) {
                console.warn('Profile fetch timed out after 5s');
                setLoading(false);
            }
        }, 5000);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const user = session.user;
                const email = user.email || '';
                setUserEmail(email);
                
                // 1. Initial fallbacks from Google metadata if available
                const googleName = user.user_metadata?.full_name || '';
                const googleAvatar = user.user_metadata?.avatar_url || '';
                
                // Fetch internal profile info
                const { data, error: fetchError } = await supabase
                    .from('profiles')
                    .select('full_name, avatar_url')
                    .eq('id', user.id)
                    .single();
                
                if (data) {
                    setFullName(data.full_name || googleName);
                    setAvatarUrl(data.avatar_url || googleAvatar);
                } else {
                    setFullName(googleName);
                    setAvatarUrl(googleAvatar);
                    
                    if (fetchError && fetchError.code === 'PGRST116' && (googleName || googleAvatar)) {
                        await supabase.from('profiles').upsert({
                            id: user.id,
                            full_name: googleName,
                            avatar_url: googleAvatar,
                            updated_at: new Date().toISOString()
                        });
                    }
                }
            }
        } catch (err: any) {
            console.error('Error fetching profile:', err);
        } finally {
            finished = true;
            clearTimeout(profileTimeout);
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setSuccess(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) throw new Error('No user session');

            // Use upsert to create or update
            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ 
                    id: session.user.id,
                    full_name: fullName, 
                    updated_at: new Date().toISOString() 
                }, { onConflict: 'id' });

            if (updateError) throw updateError;
            setSuccess('Profile updated successfully!');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;
        
        const fileName = `client-${session.user.id}-${Math.random()}.${fileExt}`;
        
        setUpdating(true);
        setError(null);
        
        try {
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file);
                
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ 
                    id: session.user.id,
                    avatar_url: publicUrl,
                    updated_at: new Date().toISOString()
                }, { onConflict: 'id' });

            if (updateError) throw updateError;
            
            setAvatarUrl(publicUrl);
            setSuccess('Profile image uploaded!');
        } catch (err: any) {
            setError(err.message || 'Error uploading image.');
        } finally {
            setUpdating(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            setUpdating(false);
            return;
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user?.email) throw new Error('No valid session email');

            const { error: verifyError } = await supabase.auth.signInWithPassword({
                email: session.user.email,
                password: currentPassword
            });

            if (verifyError) {
                throw new Error('Current password is incorrect');
            }

            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (updateError) throw updateError;

            setSuccess('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowSecurityModal(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUpdating(false);
        }
    };

    const handlePasswordReset = async () => {
        try {
            if (!userEmail) return;
            const { error } = await supabase.auth.resetPasswordForEmail(userEmail, {
                redirectTo: `${window.location.origin}/dashboard`,
            });
            if (error) throw error;
            setSuccess('A password reset link has been sent to your email.');
        } catch (err: any) {
            setError('Failed to send reset link: ' + err.message);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading profile...</div>;

    const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null;
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: 'white', width: '90%', maxWidth: '500px', padding: '2.5rem', borderRadius: '0', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    <button onClick={onClose} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>&times;</button>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333' }}>{title}</h3>
                    {children}
                </div>
            </div>
        );
    };

    return (
        <div className="settings-container" style={{ maxWidth: '1000px' }}>
            <h2 className="settings-title">BOCRA Client Profile</h2>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3rem' }}>Manage your organization's administrative identity and preferences.</p>

            {error && (
                <div style={{ background: '#FDF2F2', border: '1px solid #FFE4E4', color: '#A80000', padding: '1rem', borderRadius: '0', marginBottom: '1.5rem' }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div style={{ color: '#000', padding: '0.5rem 0', marginBottom: '1.5rem', fontWeight: '500' }}>
                    {success}
                </div>
            )}

            <div className="glass-card" style={{ padding: '3rem' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'minmax(320px, 1.2fr) 1fr', 
                    gap: '4rem'
                }}>
                    
                    {/* Column 1: Identity Card */}
                    <div style={{ borderRight: '1px solid #eee', paddingRight: '4rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="big-avatar" style={{ margin: '0 auto 1.5rem', width: '160px', height: '160px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '50%', overflow: 'hidden', border: '4px solid #A80000', background: 'none' }}>
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem', fontWeight: '800', color: '#A80000' }}>
                                        {fullName ? fullName.charAt(0).toUpperCase() : 'C'}
                                    </div>
                                )}
                            </div>
                            
                            <h3 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1.5rem' }}>{fullName || 'BOCRA Client'}</h3>
                            
                            <label className="edit-profile-btn" style={{ cursor: 'pointer', marginBottom: '1.5rem', background: '#333' }}>
                                <Pencil size={16} fill="white" />
                                {updating ? 'Uploading...' : 'Update Image'}
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    style={{ display: 'none' }} 
                                    onChange={handleAvatarUpload}
                                    disabled={updating}
                                />
                            </label>

                            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '0', textAlign: 'left', border: '1px solid #eef0f2', width: '100%' }}>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#444' }}><b>Status:</b> Verified Entity</span>
                                </div>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#444' }}><b>User Type:</b> Client Representative</span>
                                </div>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#444' }}><b>Member Since:</b> March 2024</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.85rem', color: '#444', wordBreak: 'break-all', whiteSpace: 'nowrap' }}>{userEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Personal Info & Controls */}
                    <div>
                        <h3 style={{ fontSize: '1.4rem', color: '#333', marginBottom: '2rem' }}>Administrative Information</h3>
                        <form className="settings-form" onSubmit={handleUpdateProfile}>
                            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ fontWeight: '600', color: '#444', marginBottom: '0.75rem', display: 'block' }}>Official Email Address</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={userEmail} 
                                    disabled 
                                    style={{ background: '#f5f5f5', color: '#888', border: '1px solid #ddd' }}
                                />
                            </div>

                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label style={{ fontWeight: '600', color: '#444', marginBottom: '0.75rem', display: 'block' }}>Representative Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button 
                                    type="submit" 
                                    className="edit-profile-btn"
                                    disabled={updating}
                                    style={{ background: '#A80000', borderRadius: '0' }}
                                >
                                    {updating ? 'Saving...' : 'Update Details'}
                                </button>
                                <button 
                                    type="button" 
                                    className="edit-profile-btn"
                                    style={{ background: '#333', borderRadius: '0' }}
                                    onClick={() => setShowSecurityModal(true)}
                                >
                                    Security & Access
                                </button>
                            </div>
                        </form>

                        <div style={{ marginTop: '2.5rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                            <button 
                                type="button"
                                onClick={() => setShowPreferencesModal(true)}
                                style={{ background: 'none', border: 'none', color: '#A80000', fontWeight: '600', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.95rem' }}
                            >
                                Organization Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Modal */}
            <Modal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} title="Security & Access">
                <form className="settings-form" onSubmit={handleChangePassword}>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            onClick={handlePasswordReset}
                            style={{ background: 'none', border: 'none', color: '#A80000', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', textAlign: 'left', marginTop: '0.3rem', width: 'fit-content' }}
                        >
                            Forgot password?
                        </button>
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input 
                            type="password" 
                            className="form-input" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                        <button 
                            type="submit" 
                            className="edit-profile-btn"
                            disabled={updating}
                            style={{ flex: 2, background: '#A80000', borderRadius: '0' }}
                        >
                            {updating ? 'Updating...' : 'Save Password'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Preferences Modal */}
            <Modal isOpen={showPreferencesModal} onClose={() => setShowPreferencesModal(false)} title="Organization Preferences">
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                        <span style={{ fontSize: '0.9rem', color: '#444' }}>Email alerts for spectrum auctions</span>
                    </label>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                        <span style={{ fontSize: '0.9rem', color: '#444' }}>Notification of type-approval updates</span>
                    </label>
                </div>
            </Modal>
        </div>
    );
};

export default ClientProfile;
