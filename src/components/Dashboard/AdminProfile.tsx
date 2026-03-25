import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Pencil, ShieldCheck, Mail, User } from 'lucide-react';
import './Settings.css';

const AdminProfile: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const [userEmail, setUserEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        fetchProfile();
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUserEmail(session.user.email || '');
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                const user = session.user;
                setUserEmail(user.email || '');
                
                const googleName = user.user_metadata?.full_name || '';
                const googleAvatar = user.user_metadata?.avatar_url || '';
                
                const { data } = await supabase
                    .from('profiles')
                    .select('full_name, avatar_url')
                    .eq('id', user.id)
                    .maybeSingle();
                
                if (data) {
                    setFullName(data.full_name || googleName);
                    setAvatarUrl(data.avatar_url || googleAvatar);
                } else {
                    setFullName(googleName);
                    setAvatarUrl(googleAvatar);
                }
            }
        } catch (err: any) {
            console.error('Error fetching admin profile:', err);
        } finally {
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

            const { error: updateError } = await supabase
                .from('profiles')
                .upsert({ 
                    id: session.user.id,
                    full_name: fullName, 
                    updated_at: new Date().toISOString() 
                });

            if (updateError) throw updateError;
            setSuccess('Admin profile updated successfully!');
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
        
        const fileName = `admin-${session.user.id}-${Math.random()}.${fileExt}`;
        
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
                });

            if (updateError) throw updateError;
            
            setAvatarUrl(publicUrl);
            setSuccess('Profile image uploaded!');
        } catch (err: any) {
            setError(err.message || 'Error uploading image.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading Admin Profile...</div>;

    return (
        <div className="settings-container" style={{ maxWidth: '1000px' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <h2 className="settings-title" style={{ margin: 0 }}>BOCRA Administrative Profile</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem' }}>Manage your internal authority identity and contact details.</p>
                </div>

            {error && (
                <div style={{ background: '#FDF2F2', border: '1px solid #FFE4E4', color: '#A80000', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
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
                    gridTemplateColumns: '1.2fr 1fr', 
                    gap: '4rem'
                }}>
                    
                    {/* Left Column: Avatar & Identity Card */}
                    <div style={{ borderRight: '1px solid #eee', paddingRight: '4rem' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div className="big-avatar" style={{ margin: '0 auto 1.5rem', width: '160px', height: '160px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', borderRadius: '50%', overflow: 'hidden', background: 'none', border: '4px solid #A80000' }}>
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%', borderRadius: '50%' }} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', fontWeight: '800', color: '#A80000', background: 'none' }}>
                                        {fullName ? fullName.charAt(0).toUpperCase() : 'A'}
                                    </div>
                                )}
                            </div>
                            
                            <h3 style={{ fontSize: '1.5rem', color: '#1a1a1a', marginBottom: '1.5rem' }}>{fullName || 'BOCRA Official'}</h3>
                            
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

                            <div style={{ background: '#f8f9fa', padding: '1.8rem', borderRadius: '0', textAlign: 'left', border: '1px solid #eef0f2', width: '100%', minWidth: '320px' }}>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#444' }}><b>Status:</b> Verified Official</span>
                                </div>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#444' }}><b>Access:</b> Administrative</span>
                                </div>
                                <div>
                                    <span style={{ fontSize: '0.85rem', color: '#444', whiteSpace: 'nowrap' }}>{userEmail}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Information Form */}
                    <div>
                        <h3 style={{ fontSize: '1.4rem', color: '#333', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            Official Details
                        </h3>
                        
                        <form className="settings-form" onSubmit={handleUpdateProfile}>
                            <div className="form-group" style={{ marginBottom: '2rem' }}>
                                <label style={{ fontWeight: '600', color: '#444', marginBottom: '0.75rem', display: 'block' }}>Official Authority Email</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        value={userEmail} 
                                        disabled 
                                        style={{ background: '#f5f5f5', color: '#888', paddingLeft: '40px', border: '1px solid #ddd' }}
                                    />
                                    <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: '#999' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M5 17V3h18v14zm-4 4V6.5h2V19h16.5v2zm13-8.725l7-4.85V5l-7 4.85L7 5v2.425z"/></svg>
                                    </div>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '0.5rem' }}>This email is linked to your BOCRA identity and cannot be changed here.</p>
                            </div>

                            <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                                <label style={{ fontWeight: '600', color: '#444', marginBottom: '0.75rem', display: 'block' }}>Administrator Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your official name"
                                        style={{ paddingLeft: '40px' }}
                                    />
                                    <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', color: '#999' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><rect width="16" height="16" fill="none"/><path fill="currentColor" d="M11 7c0 1.66-1.34 3-3 3S5 8.66 5 7s1.34-3 3-3s3 1.34 3 3"/><path fill="currentColor" fill-rule="evenodd" d="M16 8c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M4 13.75C4.16 13.484 5.71 11 7.99 11c2.27 0 3.83 2.49 3.99 2.75A6.98 6.98 0 0 0 14.99 8c0-3.87-3.13-7-7-7s-7 3.13-7 7c0 2.38 1.19 4.49 3.01 5.75" clip-rule="evenodd"/></svg>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <button 
                                    type="submit" 
                                    className="edit-profile-btn"
                                    disabled={updating}
                                    style={{ padding: '12px 30px', fontWeight: 'bold', minWidth: '220px' }}
                                >
                                    {updating ? 'Saving Changes...' : 'Save Authority Details'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
