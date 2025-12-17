import React, { useRef } from "react";
import {
  Users,
  Vote,
  TrendingUp,
  Clock,
  Eye,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  UserCheck,
  Trophy,
  Zap,
  Settings,
  Download,
  Activity,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../utils/useOnClickOutside";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setMenuOpen(false));

  // ===== MOCK DATA (will come from Firebase later) =====
  const stats = [
    {
      id: 1,
      label: "Total Voters",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: <Users className="w-5 h-5" />,
      color: "blue",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      iconColor: "text-white",
      changeColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      label: "Active Elections",
      value: "3",
      change: "+1",
      changeType: "increase" as const,
      icon: <Vote className="w-5 h-5" />,
      color: "green",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      iconColor: "text-white",
      changeColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      id: 3,
      label: "Votes Cast Today",
      value: "1,234",
      change: "+24.3%",
      changeType: "increase" as const,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "purple",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      iconColor: "text-white",
      changeColor: "text-emerald-600 dark:text-emerald-400",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      label: "Pending Approvals",
      value: "17",
      change: "-3",
      changeType: "decrease" as const,
      icon: <Clock className="w-5 h-5" />,
      color: "orange",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
      iconColor: "text-white",
      changeColor: "text-rose-600 dark:text-rose-400",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  const recentElections = [
    {
      id: 1,
      title: "Student Union Elections 2024",
      description: "Vote for President, VP, Secretary and other positions",
      positions: 8,
      deadline: "2024-11-15",
      timeLeft: "3 days left",
      voted: false,
      voters: 2847,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Faculty Representative Elections",
      description: "Choose your department representatives",
      positions: 4,
      deadline: "2024-11-12",
      timeLeft: "18 hours left",
      voted: false,
      voters: 856,
      color: "green",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      id: 3,
      title: "Sports Council Elections",
      description: "Vote for sports committee members",
      positions: 5,
      deadline: "2024-11-20",
      timeLeft: "8 days left",
      voted: true,
      voters: 1250,
      color: "purple",
      gradient: "from-purple-500 to-violet-500",
    },
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: "Voter",
      name: "John Doe",
      memberId: "2020/12345",
      time: "5 mins ago",
    },
    {
      id: 2,
      type: "Candidate",
      name: "Jane Smith",
      memberId: "2019/67890",
      time: "12 mins ago",
    },
    {
      id: 3,
      type: "Voter",
      name: "Ahmed Bello",
      memberId: "2021/11111",
      time: "23 mins ago",
    },
    {
      id: 4,
      type: "Candidate",
      name: "Chioma Okafor",
      memberId: "2020/22222",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* ===== WELCOME SECTION ===== */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-emerald-500/10 dark:to-purple-500/10" />
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-5 dark:opacity-10" />
        
        <div className="relative p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {user?.fullName.split(" ")[0]}!
                  </span>
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl">
                Manage elections, approvals, and analytics from your admin dashboard.
                Everything you need to oversee the voting process in one place.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Member since{" "}
                    {new Date(user?.createdAt || new Date()).toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric" }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Activity className="w-4 h-4" />
                  <span>Last login: Today, 09:42 AM</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate("/admin/elections/create")} 
              className="group relative shrink-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                <Vote className="w-5 h-5" />
                <span className="text-lg">Manage Elections</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="group relative">
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
            <div className="relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl hover:border-transparent transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <div className={stat.iconColor}>{stat.icon}</div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.changeColor}`}>
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                    style={{ 
                      width: stat.changeType === "increase" ? "75%" : "45%",
                      animation: stat.changeType === "increase" ? "pulse 2s ease-in-out infinite" : "none" 
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== TWO COLUMN LAYOUT ===== */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* ===== RECENT ELECTIONS ===== */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500">
                    <Vote className="w-5 h-5 text-white" />
                  </div>
                  Recent Elections
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Active and upcoming voting processes
                </p>
              </div>
              <button 
                onClick={() => navigate("/admin/elections/ongoing")} 
                className="group flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                View All
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {recentElections.map((election) => (
                <div key={election.id} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${election.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                  <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Status Header */}
                    <div className={`px-6 py-3 ${election.voted ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-gradient-to-r from-orange-500 to-rose-500'}`}>
                      <div className="flex items-center justify-between text-white font-medium">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${election.voted ? 'bg-white' : 'bg-white animate-pulse'}`} />
                          <span className="text-sm">
                            {election.voted ? 'Completed • Results Available' : 'Active Now • Live Voting'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{election.timeLeft}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {election.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {election.description}
                          </p>
                        </div>
                        <div className="ml-4 shrink-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${election.gradient} text-white`}>
                            {election.positions} Positions
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {election.positions}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Positions</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {election.voters.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Total Voters</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                          <div className="flex items-center justify-center gap-1">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {election.deadline.split('-')[2]}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">End Date</p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() =>
                          navigate(`/admin/elections/${election.id}/monitor`)
                        }
                        className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 ${
                          election.voted
                            ? 'border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'
                            : 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02]'
                        }`}
                      >
                        {election.voted ? (
                          <>
                            <BarChart3 className="w-5 h-5" />
                            View Results & Analytics
                            <Download className="w-5 h-5" />
                          </>
                        ) : (
                          <>
                            <Eye className="w-5 h-5" />
                            Live Monitor Dashboard
                            <ChevronRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== PENDING APPROVALS ===== */}
        <div className="lg:col-span-1">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                    <UserCheck className="w-5 h-5 text-white" />
                  </div>
                  Pending Approvals
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Requires immediate attention
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-orange-100 dark:from-rose-900/30 dark:to-orange-900/30 text-rose-700 dark:text-rose-400 text-sm font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {pendingApprovals.length}
              </span>
            </div>

            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-bold
                            ${
                              approval.type === "Voter"
                                ? "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 text-blue-700 dark:text-blue-400"
                                : "bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 text-purple-700 dark:text-purple-400"
                            }
                          `}
                        >
                          {approval.type}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {approval.time}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                        {approval.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {approval.memberId}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
                      <CheckCircle2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Approve
                    </button>
                    <button className="flex-1 group/btn flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-200">
                      <AlertCircle className="w-4 h-4" />
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate("/admin/candidates/approve")} 
              className="w-full mt-6 px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/10 flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Manage All Approvals
            </button>
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5" />
        <div className="relative p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Common tasks to manage your voting system efficiently
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button 
              onClick={() => navigate("/admin/elections/create")} 
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
              <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-transparent hover:shadow-2xl transition-all duration-300">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 mb-4 w-fit">
                  <Vote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                  Create Election
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Set up a new voting process with custom rules and positions
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-semibold">
                  Start Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>

            <button className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
              <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-transparent hover:shadow-2xl transition-all duration-300">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 mb-4 w-fit">
                  <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                  Manage Voters
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Import, approve, and manage voter databases and registrations
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-semibold">
                  Manage Database
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>

            <button 
              onClick={() => navigate("/admin/analytics/turnout")} 
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
              <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-transparent hover:shadow-2xl transition-all duration-300">
                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-4 w-fit">
                  <BarChart3 className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                  View Analytics
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Track voting patterns, turnout rates, and election insights
                </p>
                <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-semibold">
                  View Reports
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <div className="fixed bottom-8 right-8 z-50">
        <div ref={menuRef} className="relative">
          {/* Menu Items */}
          <div 
            className={`absolute bottom-24 right-0 flex flex-col gap-3 transition-all duration-500 ease-out ${
              menuOpen 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <button
              onClick={() => { setMenuOpen(false); navigate("/admin/elections/create"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-blue-500 text-blue-600 dark:text-blue-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Vote className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">Create Election</span>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); navigate("/admin/voters/approve"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-purple-500 text-purple-600 dark:text-purple-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <UserCheck className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">Approve Voters</span>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); navigate("/admin/candidates/approve"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-amber-500 text-amber-600 dark:text-amber-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Trophy className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">Approve Candidates</span>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); navigate("/admin/analytics/turnout"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">View Analytics</span>
              </div>
            </button>
          </div>

          {/* Main FAB Button */}
          <div className="group relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 animate-pulse group-hover:animate-none transition duration-500" />
            <button 
              onClick={() => setMenuOpen((s) => !s)} 
              className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <Zap className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;