import React from 'react';
import { 
  Users, UserCheck, ShieldCheck, Briefcase, Calendar, DollarSign, 
  ArrowDownToLine, AlertTriangle, ArrowUpRight, TrendingUp, CheckCircle2, ChevronRight, Scale
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface DashboardOverviewPageProps {
  onNavigate: (tab: string) => void;
}

const REVENUE_DATA = [
  { month: 'Jan', revenue: 12400000, gmv: 62000000 },
  { month: 'Feb', revenue: 14800000, gmv: 74000000 },
  { month: 'Mar', revenue: 16200000, gmv: 81000000 },
  { month: 'Apr', revenue: 18500000, gmv: 92500000 },
  { month: 'May', revenue: 21000000, gmv: 105000000 },
  { month: 'Jun', revenue: 25400000, gmv: 127000000 },
];

const PRACTICE_AREA_DATA = [
  { name: 'Property & Land', value: 34 },
  { name: 'Corporate & CAC', value: 28 },
  { name: 'Criminal Defense', value: 18 },
  { name: 'Family & Divorce', value: 12 },
  { name: 'Employment Law', value: 8 },
];

const COLORS = ['#2563eb', '#d97706', '#059669', '#3b82f6', '#f59e0b'];

export const DashboardOverviewPage: React.FC<DashboardOverviewPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#111827] via-gray-900 to-[#111827] p-6 rounded-2xl border border-gray-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-1">
            <Scale size={16} />
            <span>Platform Overview & Executive Control</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white">LawLink Legal Marketplace Desk</h2>
          <p className="text-xs text-gray-400 mt-1">Real-time GMV metrics, lawyer verification status, and consultation volume.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('verification')}
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-900/20 transition-all"
          >
            <ShieldCheck size={16} />
            <span>Review 127 Applications</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Total Clients & Users</span>
            <Users size={20} className="text-blue-500" />
          </div>
          <div className="text-2xl font-serif font-bold text-white">42,830</div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1 mt-2">
            <TrendingUp size={12} /> +12.4% this month
          </span>
        </div>

        <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Verified Lawyers</span>
            <UserCheck size={20} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-serif font-bold text-white">2,430</div>
          <span className="text-[11px] text-amber-400 font-medium flex items-center gap-1 mt-2">
            <ShieldCheck size={12} /> 127 applications pending
          </span>
        </div>

        <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Active Legal Cases</span>
            <Briefcase size={20} className="text-amber-500" />
          </div>
          <div className="text-2xl font-serif font-bold text-white">8,231</div>
          <span className="text-[11px] text-gray-400 font-medium block mt-2">
            15,492 consultations booked
          </span>
        </div>

        <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between text-gray-400 mb-3">
            <span className="text-xs font-medium uppercase tracking-wider">Platform Gross GMV</span>
            <DollarSign size={20} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-emerald-400">₦85,400,000</div>
          <span className="text-[11px] text-gray-400 font-medium block mt-2">
            ₦3,240,000 pending payout
          </span>
        </div>
      </div>

      {/* Analytics Charts & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Chart */}
        <div className="lg:col-span-2 bg-[#111827] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-serif font-semibold text-white text-base">Gross Merchandise Value & Net Fee Revenue</h3>
              <p className="text-xs text-gray-400">Monthly consultation fee volume in Nigerian Naira (NGN)</p>
            </div>
            <span className="text-xs bg-blue-950 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded font-mono">
              2026 Financial Year
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA}>
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(val) => `₦${val / 1000000}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0b0f19', borderColor: '#374151', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: any) => [`₦${Number(value).toLocaleString()} NGN`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={0.2} fill="#2563eb" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-semibold text-white text-base mb-1">Action Priority Queue</h3>
            <p className="text-xs text-gray-400 mb-4">Urgent tasks requiring administrative authorization</p>

            <div className="space-y-3">
              <button
                onClick={() => onNavigate('verification')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-800/60 hover:bg-gray-800 border border-gray-700/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck size={18} className="text-amber-500" />
                  <div>
                    <p className="text-xs font-semibold text-white">Lawyer Verification Desk</p>
                    <span className="text-[11px] text-gray-400">127 applications pending review</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>

              <button
                onClick={() => onNavigate('disputes')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-800/60 hover:bg-gray-800 border border-gray-700/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle size={18} className="text-red-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">Open Client Disputes</p>
                    <span className="text-[11px] text-gray-400">8 active arbitration tickets</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>

              <button
                onClick={() => onNavigate('withdrawals')}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-800/60 hover:bg-gray-800 border border-gray-700/60 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <ArrowDownToLine size={18} className="text-emerald-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">Lawyer Payout Withdrawals</p>
                    <span className="text-[11px] text-gray-400">₦3,240,000 NGN pending approval</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <span className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
              <CheckCircle2 size={13} className="text-emerald-400" /> System Status: All Services Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
