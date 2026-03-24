import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Pencil } from 'lucide-react';
import './Settings.css';

const ConsumerProfile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [userEmail, setUserEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        
        const fileName = `${session.user.id}-${Math.random()}.${fileExt}`;
        
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
            setShowPasswordForm(false);
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

    return (
        <div className="settings-container" style={{ maxWidth: '1200px' }}>
            <h2 className="settings-title">My Profile</h2>

            {error && (
                <div style={{ background: '#FDF2F2', border: '1px solid #FFE4E4', color: '#A80000', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    {error}
                </div>
            )}
            
            {success && (
                <div style={{ background: '#E6FFE6', border: '1px solid #B3FFB3', color: '#28A745', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    {success}
                </div>
            )}

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1.2fr', 
                    gridTemplateRows: 'auto auto',
                    gap: '2.5rem 4rem'
                }}>
                    
                    {/* Section 1: Identity & Photo */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRight: '1px solid #eee', paddingRight: '2rem' }}>
                        <div className="profile-header" style={{ marginBottom: '1.5rem' }}>
                            <div className="big-avatar" style={{ margin: '0 auto 1.5rem' }}>
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                                ) : (
                                    fullName ? fullName.charAt(0).toUpperCase() : 'C'
                                )}
                            </div>
                            <h3 style={{ fontSize: '1.4rem', color: '#333', marginBottom: '0.5rem' }}>{fullName || 'Consumer Resident'}</h3>
                            <p style={{ color: '#666', fontSize: '0.9rem' }}>{userEmail}</p>
                        </div>
                        
                        <label className="edit-profile-btn" style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                            <Pencil size={16} fill="white" />
                            {updating ? 'Uploading...' : 'Upload New Photo'}
                            <input 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={handleAvatarUpload}
                                disabled={updating}
                            />
                        </label>
                        <p style={{ fontSize: '0.75rem', color: '#888' }}>Allowed JPG, GIF or PNG. Max size of 2MB</p>
                    </div>

                    {/* Section 2: Personal Details */}
                    <div>
                        <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>Personal Information</h3>
                        <form className="settings-form" onSubmit={handleUpdateProfile}>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={userEmail} 
                                    disabled 
                                    style={{ background: '#f9f9f9', color: '#666' }}
                                />
                            </div>

                            <div className="form-group">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div style={{ marginTop: '1.5rem' }}>
                                <button 
                                    type="submit" 
                                    className="edit-profile-btn"
                                    disabled={updating}
                                    style={{ width: '100%' }}
                                >
                                    {updating ? 'Saving...' : 'Update Personal Info'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Section 3: Security */}
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>Security & Access</h3>
                        
                        {!showPasswordForm ? (
                            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                                <div style={{ marginBottom: '1.5rem', color: '#666', fontSize: '0.95rem' }}>
                                    Manage your password and account security settings. 
                                </div>
                                <button 
                                    type="button" 
                                    className="edit-profile-btn"
                                    onClick={() => setShowPasswordForm(true)}
                                    style={{ width: '100%', background: '#333' }}
                                >
                                    Change Password
                                </button>
                            </div>
                        ) : (
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
                                        Forgot current password?
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
                                        style={{ flex: 2, background: '#A80000' }}
                                    >
                                        {updating ? 'Updating...' : 'Save Password'}
                                    </button>
                                    <button 
                                        type="button" 
                                        className="edit-profile-btn"
                                        onClick={() => setShowPasswordForm(false)}
                                        style={{ flex: 1, background: '#eee', color: '#333' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    {/* Section 4: Preferences */}
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.75rem' }}>Account Preferences</h3>
                        
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontSize: '0.9rem', color: '#444' }}>Receive email notifications for case updates</span>
                            </label>
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px' }} />
                                <span style={{ fontSize: '0.9rem', color: '#444' }}>Monthly newsletter and regulatory alerts</span>
                            </label>
                        </div>

                        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#666', border: '1px solid #eef0f2' }}>
                            <strong>Account Status:</strong> Verified <br />
                            <strong>User Type:</strong> Consumer Resident <br />
                            <strong>Member Since:</strong> March 2024
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConsumerProfile;
