import React from 'react';
import {
  Users,
  Vote,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // ===== MOCK DATA (will come from Firebase later) =====
  const stats = [
    {
      id: 1,
      label: 'Total Voters',
      value: '2,847',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      changeColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 2,
      label: 'Active Elections',
      value: '3',
      change: '+1',
      changeType: 'increase' as const,
      icon: <Vote className="w-6 h-6" />,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      iconColor: 'text-green-600 dark:text-green-400',
      changeColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 3,
      label: 'Votes Cast Today',
      value: '1,234',
      change: '+24.3%',
      changeType: 'increase' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      changeColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 4,
      label: 'Pending Approvals',
      value: '17',
      change: '-3',
      changeType: 'decrease' as const,
      icon: <Clock className="w-6 h-6" />,
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      changeColor: 'text-green-600 dark:text-green-400'
    }
  ];

  const recentElections = [
    {
      id: 1,
      title: 'Student Union Elections 2024',
      status: 'ongoing',
      voters: 2847,
      voted: 1234,
      percentage: 43,
      endDate: '2024-11-15',
      color: 'green'
    },
    {
      id: 2,
      title: 'Faculty Rep Elections',
      status: 'ongoing',
      voters: 856,
      voted: 623,
      percentage: 73,
      endDate: '2024-11-12',
      color: 'blue'
    },
    {
      id: 3,
      title: 'Sports Council Elections',
      status: 'scheduled',
      voters: 1250,
      voted: 0,
      percentage: 0,
      endDate: '2024-11-20',
      color: 'purple'
    }
  ];

  const pendingApprovals = [
    { id: 1, type: 'Voter', name: 'John Doe', memberId: '2020/12345', time: '5 mins ago' },
    { id: 2, type: 'Candidate', name: 'Jane Smith', memberId: '2019/67890', time: '12 mins ago' },
    { id: 3, type: 'Voter', name: 'Ahmed Bello', memberId: '2021/11111', time: '23 mins ago' },
    { id: 4, type: 'Candidate', name: 'Chioma Okafor', memberId: '2020/22222', time: '1 hour ago' },
  ];

  return (
    <div className="space-y-8">
      
      {/* ===== WELCOME SECTION ===== */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.fullName.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your elections today.
        </p>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="relative group"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            
            {/* Card */}
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              
              {/* Icon */}
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <div className={stat.iconColor}>
                  {stat.icon}
                </div>
              </div>

              {/* Value */}
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>

              {/* Label & Change */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.changeColor}`}>
                  {stat.changeType === 'increase' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== TWO COLUMN LAYOUT ===== */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* ===== RECENT ELECTIONS (Left - 2 columns) ===== */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Elections
              </h2>
              <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                View All
              </button>
            </div>

            {/* Elections List */}
            <div className="space-y-4">
              {recentElections.map((election) => (
                <div
                  key={election.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 group"
                >
                  
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {election.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {election.voters} voters
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Ends {election.endDate}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-bold
                      ${election.status === 'ongoing' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      }
                    `}>
                      {election.status === 'ongoing' ? '🔴 Live' : '📅 Scheduled'}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {election.voted} / {election.voters} voted
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {election.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          election.status === 'ongoing'
                            ? 'bg-gradient-to-r from-green-500 to-green-600'
                            : 'bg-gradient-to-r from-purple-500 to-purple-600'
                        }`}
                        style={{ width: `${election.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== PENDING APPROVALS (Right - 1 column) ===== */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Pending Approvals
              </h2>
              <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-bold">
                {pendingApprovals.length}
              </span>
            </div>

            {/* Approvals List */}
            <div className="space-y-3">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`
                          px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap
                          ${approval.type === 'Voter'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                          }
                        `}>
                          {approval.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {approval.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {approval.memberId}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap flex-shrink-0">
                      {approval.time}
                    </span>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-2 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      <span>Approve</span>
                    </button>
                    <button className="px-2 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <button className="w-full mt-4 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
              View All Approvals
            </button>
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200 text-left">
              <Vote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Create Election</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start a new voting process</p>
            </div>
          </button>

          <button className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200 text-left">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Add Voters</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload voter database</p>
            </div>
          </button>

          <button className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200 text-left">
              <BarChart3 className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">View Analytics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Check voting statistics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;