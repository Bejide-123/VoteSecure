import React from "react";
import {
  Users,
  Vote,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  BarChart3,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // ===== MOCK DATA (will come from Firebase later) =====
  const stats = [
    {
      id: 1,
      label: "Total Voters",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase" as const,
      icon: <Users className="w-6 h-6" />,
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      changeColor: "text-green-600 dark:text-green-400",
    },
    {
      id: 2,
      label: "Active Elections",
      value: "3",
      change: "+1",
      changeType: "increase" as const,
      icon: <Vote className="w-6 h-6" />,
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      iconColor: "text-green-600 dark:text-green-400",
      changeColor: "text-green-600 dark:text-green-400",
    },
    {
      id: 3,
      label: "Votes Cast Today",
      value: "1,234",
      change: "+24.3%",
      changeType: "increase" as const,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "purple",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      changeColor: "text-green-600 dark:text-green-400",
    },
    {
      id: 4,
      label: "Pending Approvals",
      value: "17",
      change: "-3",
      changeType: "decrease" as const,
      icon: <Clock className="w-6 h-6" />,
      color: "orange",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      iconColor: "text-orange-600 dark:text-orange-400",
      changeColor: "text-green-600 dark:text-green-400",
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
    <div className="space-y-8">
      {/* ===== WELCOME SECTION (styled like voter hero) ===== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-2xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-400 to-green-400 rounded-full blur-3xl opacity-10" />

        <div className="relative p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.fullName.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Manage elections, approvals and analytics from your admin
                console.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  Member since{" "}
                  {new Date(user?.createdAt || new Date()).toLocaleDateString(
                    "en-US",
                    { month: "long", year: "numeric" }
                  )}
                </span>
              </div>
            </div>

            <button className="group relative">
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
              <div className="relative bg-linear-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all">
                <Vote className="w-5 h-5" />
                Manage Elections
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />

            {/* Card */}
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}
              >
                <div className={stat.iconColor}>{stat.icon}</div>
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
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${stat.changeColor}`}
                >
                  {stat.changeType === "increase" ? (
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
                <div key={election.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />

                  <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    {/* Status Banner */}
                    <div
                      className={`px-4 py-2 ${
                        election.voted
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-orange-500 to-red-500"
                      }`}
                    >
                      <div className="flex items-center justify-between text-white text-sm font-semibold">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              election.voted
                                ? "bg-white"
                                : "bg-white animate-pulse"
                            }`}
                          />
                          <span>
                            {election.voted ? "Completed" : "Active Now"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{election.timeLeft}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {election.title}
                      </h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {election.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {election.positions}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Positions
                          </p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {(election.voters / 1000).toFixed(1)}K
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Voters
                          </p>
                        </div>
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                        <Calendar className="w-3 h-3" />
                        <span>Ends {election.deadline}</span>
                      </div>

                      {/* Action Button */}
                      <div className="mt-auto">
                        {!election.voted ? (
                          <button
                            onClick={() =>
                              navigate(`/voter/elections/${election.id}`)
                            }
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Vote className="w-5 h-5" />
                            <span className="truncate">Cast Your Vote</span>
                            <ArrowRight className="w-5 h-5 hidden sm:inline" />
                          </button>
                        ) : (
                          <button className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            View Results
                          </button>
                        )}
                      </div>
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
                        <span
                          className={`
                          px-2 py-0.5 rounded text-xs font-bold whitespace-nowrap
                          ${
                            approval.type === "Voter"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                          }
                        `}
                        >
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
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
                      {approval.time}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-2 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span>Approve</span>
                    </button>
                    <button className="px-2 py-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
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
      <div className="bg-linear-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="group relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200 text-left">
              <Vote className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                Create Election
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Start a new voting process
              </p>
            </div>
          </button>

          <button className="group relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200 text-left">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                Add Voters
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload voter database
              </p>
            </div>
          </button>

          <button className="group relative">
            <div className="absolute -inset-0.5 bg-linear-to-r from-orange-600 to-red-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-200 text-left">
              <BarChart3 className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                View Analytics
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check voting statistics
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
