import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, AlertCircle, ArrowRight, Scale } from 'lucide-react';
import { useToast } from '../../components/ui/Toast';
import { apiClient } from '../../services/api';
import { AdminUser } from '../../types';

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser, token: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await apiClient.post('/api/admin/login', { email, password });
      if (response.data?.success) {
        const mockAdminUser: AdminUser = {
          id: 'admin-001',
          name: 'Super Admin',
          email: email,
          role: 'SUPER_ADMIN'
        };
        const token = 'lawlink_admin_jwt_' + Date.now();
        localStorage.setItem('lawlink_admin_token', token);
        localStorage.setItem('lawlink_admin_user', JSON.stringify(mockAdminUser));
        showToast('Authenticated as LawLink Super Admin', 'success');
        onLoginSuccess(mockAdminUser, token);
      } else {
        setErrorMsg(response.data?.error || 'Invalid credentials or unauthorized admin role.');
      }
    } catch (err: any) {
      const serverErr = err.response?.data?.error || 'Authentication failed. Access denied for non-admin accounts.';
      setErrorMsg(serverErr);
      showToast(serverErr, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        {/* Top Gold Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-blue-600 to-amber-500"></div>

        {/* Brand Badge */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl mb-3 border border-blue-400/30">
            <Scale size={30} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-wide">LAWLINK</h1>
          <p className="text-xs text-amber-500 font-semibold tracking-wider uppercase mt-1">
            Super Admin Control Console
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Authorized Legal Marketplace Administrators Only
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-red-300">Access Denied (403 Forbidden)</strong>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="lawlinkllp01@gmail.com"
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Admin Security Credentials
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0b0f19] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
          >
            {isSubmitting ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to Admin Console</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>256-Bit Encrypted TLS • Immutable Audit Logging Active</span>
          </p>
        </div>
      </div>
    </div>
  );
};
