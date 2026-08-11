import React, { useState, useEffect } from 'react';
import { AdminLoginPage } from './features/auth/AdminLoginPage';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardOverviewPage } from './features/dashboard/DashboardOverviewPage';
import { UserManagementPage } from './features/users/UserManagementPage';
import { VerificationCenterPage } from './features/verification/VerificationCenterPage';
import { LawFirmsPage } from './features/firms/LawFirmsPage';
import { PracticeAreasPage } from './features/practice/PracticeAreasPage';
import { CaseManagementPage } from './features/cases/CaseManagementPage';
import { AppointmentsDeskPage } from './features/appointments/AppointmentsDeskPage';
import { PaymentsDeskPage } from './features/payments/PaymentsDeskPage';
import { ModerationDeskPage } from './features/moderation/ModerationDeskPage';
import { AiConfigPage } from './features/ai/AiConfigPage';
import { SystemAuditLogsPage, PlatformSettingsPage } from './features/system/SystemAdminPages';
import { AdminUser } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('lawlink_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  const handleLoginSuccess = (user: AdminUser) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('lawlink_admin_token');
    localStorage.removeItem('lawlink_admin_user');
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AdminLoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminLayout currentUser={currentUser} activeTab={activeTab} onTabChange={setActiveTab} onLogout={handleLogout}>
      {activeTab === 'dashboard' && <DashboardOverviewPage onNavigate={setActiveTab} />}
      {activeTab === 'users' && <UserManagementPage />}
      {activeTab === 'lawyers' && <UserManagementPage />}
      {activeTab === 'law-firms' && <LawFirmsPage />}
      {activeTab === 'verification' && <VerificationCenterPage />}
      {activeTab === 'practice-areas' && <PracticeAreasPage />}
      {activeTab === 'cases' && <CaseManagementPage />}
      {activeTab === 'appointments' && <AppointmentsDeskPage />}
      {activeTab === 'payments' && <PaymentsDeskPage isWithdrawalsOnly={false} />}
      {activeTab === 'withdrawals' && <PaymentsDeskPage isWithdrawalsOnly={true} />}
      {activeTab === 'reviews' && <ModerationDeskPage mode="reviews" />}
      {activeTab === 'disputes' && <ModerationDeskPage mode="disputes" />}
      {activeTab === 'ai' && <AiConfigPage isMatchingOnly={false} />}
      {activeTab === 'matching' && <AiConfigPage isMatchingOnly={true} />}
      {activeTab === 'emergency' && <ModerationDeskPage mode="disputes" />}
      {activeTab === 'notifications' && <PlatformSettingsPage />}
      {activeTab === 'subscriptions' && <LawFirmsPage />}
      {activeTab === 'analytics' && <DashboardOverviewPage onNavigate={setActiveTab} />}
      {activeTab === 'audit-logs' && <SystemAuditLogsPage />}
      {activeTab === 'settings' && <PlatformSettingsPage />}
    </AdminLayout>
  );
}
