import { useState, useEffect } from 'react';
import { LogIn, LogOut, ShieldCheck, UserCheck, Briefcase, User } from 'lucide-react';
import { auth, googleProvider, isConfigured } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { fetchWithTimeout, getApiUrl } from '../utils/api';

export function AuthManager({ onUserChange, currentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register_client' | 'register_lawyer'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [barNumber, setBarNumber] = useState('');
  const [practiceArea, setPracticeArea] = useState('Corporate Law');

  // Monitor Authentication Session
  useEffect(() => {
    if (isConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          const userObj = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'LawLink User',
            email: firebaseUser.email || '',
            role: 'CLIENT',
            verificationStatus: 'VERIFIED',
            avatar: firebaseUser.displayName 
              ? firebaseUser.displayName.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2)
              : 'LL',
            provider: 'google'
          };
          onUserChange(userObj);
        } else {
          onUserChange(null);
        }
      });
      return () => unsubscribe();
    } else {
      const savedUser = localStorage.getItem('lawlink_user');
      if (savedUser) {
        try {
          onUserChange(JSON.parse(savedUser));
        } catch {
          localStorage.removeItem('lawlink_user');
        }
      }
    }
  }, [onUserChange]);

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setErrorMessage('');
    
    if (isConfigured && auth) {
      try {
        await signInWithPopup(auth, googleProvider);
        setShowModal(false);
      } catch (err) {
        console.error('❌ Firebase Google Sign-In failed:', err.message);
        setErrorMessage(`Google Sign-In failed: ${err.message}`);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setTimeout(() => {
        const mockUser = {
          id: 'google-user-101',
          name: 'Barrister Nnamdi Bello',
          email: 'nnamdi.bello@nigerianbar.org',
          role: 'LAWYER',
          practiceArea: 'Constitutional & Human Rights Law',
          verificationStatus: 'VERIFIED',
          avatar: 'NB',
          provider: 'google'
        };
        localStorage.setItem('lawlink_user', JSON.stringify(mockUser));
        onUserChange(mockUser);
        setIsSubmitting(false);
        setShowModal(false);
      }, 1000);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const API_URL = getApiUrl();
    const isRegister = activeTab !== 'login';
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    const payload = isRegister ? {
      name,
      email,
      phone,
      password,
      role: activeTab === 'register_lawyer' ? 'LAWYER' : 'CLIENT',
      barNumber: activeTab === 'register_lawyer' ? barNumber : undefined,
      practiceArea: activeTab === 'register_lawyer' ? practiceArea : undefined
    } : { email, password };

    try {
      if (API_URL) {
        const res = await fetchWithTimeout(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }, 8000);

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed.');
        }

        localStorage.setItem('lawlink_user', JSON.stringify(data.user));
        onUserChange(data.user);
        setShowModal(false);
      } else {
        // Development local fallback
        const role = activeTab === 'register_lawyer' ? 'LAWYER' : (email.includes('lawyer') ? 'LAWYER' : 'CLIENT');
        const userObj = {
          id: `usr_${Date.now()}`,
          name: isRegister ? name : (email.split('@')[0] || 'LawLink User'),
          email,
          role,
          practiceArea: role === 'LAWYER' ? (practiceArea || 'Litigation') : undefined,
          verificationStatus: role === 'LAWYER' ? 'PENDING' : 'VERIFIED',
          avatar: (name || email).slice(0, 2).toUpperCase()
        };
        localStorage.setItem('lawlink_user', JSON.stringify(userObj));
        onUserChange(userObj);
        setShowModal(false);
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    if (isConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error('❌ Sign-Out failed:', err.message);
      }
    }
    localStorage.removeItem('lawlink_user');
    onUserChange(null);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'LAWYER':
        return <span style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: '600', marginLeft: '6px' }}>⚖️ Lawyer</span>;
      case 'SUPER_ADMIN':
      case 'LAW_FIRM_ADMIN':
        return <span style={{ backgroundColor: 'rgba(217, 119, 6, 0.2)', color: '#fbbf24', border: '1px solid rgba(217, 119, 6, 0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: '600', marginLeft: '6px' }}>🛡️ Admin</span>;
      default:
        return <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.68rem', fontWeight: '600', marginLeft: '6px' }}>👤 Client</span>;
    }
  };

  return (
    <div className="user-profile">
      {currentUser ? (
        <>
          <div className="user-details">
            <div className="user-name" style={{ display: 'flex', alignItems: 'center' }}>
              <span>{currentUser.name}</span>
              {getRoleBadge(currentUser.role)}
            </div>
            <div className="user-email">{currentUser.email}</div>
          </div>
          <button 
            className="avatar user" 
            type="button"
            title={`${currentUser.name} (${currentUser.role || 'CLIENT'})`}
            aria-label={`Signed in as ${currentUser.name}`}
            style={{ border: 'none', cursor: 'default' }}
          >
            {currentUser.avatar || 'U'}
          </button>
          <button
            type="button"
            className="btn-secondary sign-out-btn"
            onClick={handleSignOut}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </>
      ) : (
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <LogIn size={16} />
          <span>Sign In</span>
        </button>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="auth-modal" style={{ maxWidth: '440px', padding: '28px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px', color: 'var(--gold-primary)' }}>
              <ShieldCheck size={44} />
            </div>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', textAlign: 'center', marginBottom: '4px' }}>
              LawLink Portal
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '20px' }}>
              The right lawyer. Right when you need one.
            </p>

            {/* Modal Navigation Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '8px', marginBottom: '20px' }}>
              <button 
                type="button" 
                onClick={() => { setActiveTab('login'); setErrorMessage(''); }}
                style={{ background: activeTab === 'login' ? 'var(--blue-primary)' : 'none', border: 'none', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Sign In
              </button>
              <button 
                type="button" 
                onClick={() => { setActiveTab('register_client'); setErrorMessage(''); }}
                style={{ background: activeTab === 'register_client' ? 'var(--blue-primary)' : 'none', border: 'none', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Client Signup
              </button>
              <button 
                type="button" 
                onClick={() => { setActiveTab('register_lawyer'); setErrorMessage(''); }}
                style={{ background: activeTab === 'register_lawyer' ? 'var(--blue-primary)' : 'none', border: 'none', color: '#fff', padding: '8px 4px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
              >
                Lawyer Signup
              </button>
            </div>

            {errorMessage && (
              <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#f87171', padding: '10px 14px', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '16px' }}>
                ⚠️ {errorMessage}
              </div>
            )}

            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeTab !== 'login' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Full Name</label>
                  <input 
                    type="text" 
                    className="chat-input"
                    placeholder="e.g. Barrister Emeka Okafor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  className="chat-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.85rem' }}
                />
              </div>

              {activeTab !== 'login' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    className="chat-input"
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.85rem' }}
                  />
                </div>
              )}

              {activeTab === 'register_lawyer' && (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Supreme Court / Call to Bar Enrollment No.</label>
                    <input 
                      type="text" 
                      className="chat-input"
                      placeholder="e.g. SCN/123456"
                      value={barNumber}
                      onChange={(e) => setBarNumber(e.target.value)}
                      required 
                      style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Primary Practice Area</label>
                    <select 
                      className="chat-input"
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value)}
                      style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.85rem', color: 'var(--text-primary)', backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <option value="Property & Land Law">Property & Land Law</option>
                      <option value="Criminal Defense">Criminal Defense</option>
                      <option value="Family & Matrimonial Law">Family & Matrimonial Law</option>
                      <option value="Corporate & Business Law">Corporate & Business Law</option>
                      <option value="Constitutional Rights">Constitutional Rights</option>
                      <option value="Civil Litigation">Civil Litigation</option>
                    </select>
                  </div>
                </>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Password</label>
                <input 
                  type="password" 
                  className="chat-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ borderRadius: '6px', height: '38px', padding: '0 12px', fontSize: '0.85rem' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-secondary" 
                disabled={isSubmitting}
                style={{ backgroundColor: 'var(--blue-primary)', borderColor: 'var(--blue-accent)', color: '#fff', height: '40px', fontWeight: '600', marginTop: '6px' }}
              >
                {isSubmitting ? 'Processing...' : (activeTab === 'login' ? 'Sign In' : (activeTab === 'register_lawyer' ? 'Submit Lawyer Application' : 'Create Client Account'))}
              </button>
            </form>

            <div style={{ textAlign: 'center', margin: '14px 0 10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>OR</div>

            <button 
              className="google-signin-btn" 
              onClick={handleGoogleSignIn} 
              disabled={isSubmitting}
              type="button"
            >
              <svg className="google-logo" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button 
              className="btn-secondary" 
              style={{ width: '100%', marginTop: '12px' }}
              onClick={() => setShowModal(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
