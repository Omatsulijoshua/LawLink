export type AdminRole = 
  | 'SUPER_ADMIN' 
  | 'PLATFORM_ADMIN' 
  | 'VERIFICATION_ADMIN' 
  | 'FINANCE_ADMIN' 
  | 'SUPPORT_ADMIN' 
  | 'MODERATOR' 
  | 'ANALYST';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
}

export type VerificationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' | 'SUSPENDED';

export interface LawyerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  barNumber: string;
  lawFirm: string;
  practiceArea: string;
  state: string;
  experienceYears: number;
  consultationFee: number;
  status: VerificationStatus;
  submittedAt: string;
  documents: {
    name: string;
    type: string;
    url: string;
  }[];
}

export interface PlatformMetrics {
  totalUsers: number;
  verifiedLawyers: number;
  pendingVerifications: number;
  activeCases: number;
  totalConsultations: number;
  totalRevenue: number;
  pendingWithdrawals: number;
  openDisputes: number;
}
