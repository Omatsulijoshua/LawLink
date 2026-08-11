import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, UserCheck, Building2, ShieldCheck, 
  Briefcase, Calendar, CreditCard, ArrowDownToLine, Star, AlertTriangle, 
  Bot, Sliders, Bell, Crown, BarChart3, Settings, FileText, Menu, X, LogOut, ChevronLeft, ChevronRight, Scale, Layers
} from 'lucide-react';
import { AdminUser } from '../../types';

interface AdminLayoutProps {
  currentUser: AdminUser;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, role: 'ALL' },
  { id: 'users', label: 'User Directory', icon: Users, role: 'PLATFORM_ADMIN' },
  { id: 'lawyers', label: 'Lawyer Roster', icon: UserCheck, role: 'PLATFORM_ADMIN' },
  { id: 'law-firms', label: 'Law Firms Desk', icon: Building2, role: 'PLATFORM_ADMIN' },
  { id: 'verification', label: 'Lawyer Verification', icon: ShieldCheck, role: 'VERIFICATION_ADMIN', badge: '127' },
  { id: 'practice-areas', label: 'Practice Areas', icon: Layers, role: 'PLATFORM_ADMIN' },
  { id: 'cases', label: 'Legal Case Files', icon: Briefcase, role: 'PLATFORM_ADMIN' },
  { id: 'appointments', label: 'Appointments Desk', icon: Calendar, role: 'PLATFORM_ADMIN' },
  { id: 'payments', label: 'Payments & Escrow', icon: CreditCard, role: 'FINANCE_ADMIN' },
  { id: 'withdrawals', label: 'Withdrawal Desk', icon: ArrowDownToLine, role: 'FINANCE_ADMIN', badge: '4' },
  { id: 'reviews', label: 'Review Moderation', icon: Star, role: 'MODERATOR' },
  { id: 'disputes', label: 'Dispute Center', icon: AlertTriangle, role: 'SUPPORT_ADMIN', badge: '8' },
  { id: 'ai', label: 'AI Legal Engine', icon: Bot, role: 'PLATFORM_ADMIN' },
  { id: 'matching', label: 'Matching Weights', icon: Sliders, role: 'PLATFORM_ADMIN' },
  { id: 'emergency', label: 'Emergency Network', icon: AlertTriangle, role: 'SUPPORT_ADMIN' },
  { id: 'notifications', label: 'Broadcast Alerts', icon: Bell, role: 'PLATFORM_ADMIN' },
  { id: 'subscriptions', label: 'Subscriptions Desk', icon: Crown, role: 'FINANCE_ADMIN' },
  { id: 'analytics', label: 'Analytics Suite', icon: BarChart3, role: 'ANALYST' },
  { id: 'audit-logs', label: 'System Audit Logs', icon: FileText, role: 'SUPER_ADMIN' },
  { id: 'settings', label: 'Platform Settings', icon: Settings, role: 'SUPER_ADMIN' },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  activeTab,
  onTabChange,
  onLogout,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 flex flex-col font-sans">
      {/* Top Bar Header */}
      <header className="h-16 bg-[#111827] border-b border-gray-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white p-2"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold shadow-md border border-blue-400/30">
              <Scale size={20} />
            </div>
            <div>
              <h1 className="font-serif font-bold text-base text-white leading-tight">LAWLINK ADMIN</h1>
              <p className="text-[11px] text-amber-500 font-semibold tracking-wider uppercase hidden sm:block">
                Legal Marketplace Super Console
              </p>
            </div>
          </div>
        </div>

        {/* Admin User Profile & Actions */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white">{currentUser.name}</p>
            <span className="text-[10px] bg-blue-950 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono uppercase">
              {currentUser.role}
            </span>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 text-xs px-3 py-1.5 rounded-lg transition-colors font-medium"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        {/* Mobile Backdrop Overlay */}
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-20 md:hidden"
          />
        )}

        {/* Navigation Sidebar */}
        <aside
          className={`bg-[#111827] border-r border-gray-800 transition-all duration-300 flex flex-col z-30 ${
            collapsed ? 'w-16' : 'w-64'
          } ${
            mobileOpen ? 'translate-x-0 fixed inset-y-0 left-0 w-64 shadow-2xl top-16' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-3 border-b border-gray-800 hidden md:flex justify-end">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800 transition-colors"
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 font-semibold'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/60'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} className={isActive ? 'text-white' : 'text-gray-400'} />
                  {!collapsed && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 bg-[#0b0f19] p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
