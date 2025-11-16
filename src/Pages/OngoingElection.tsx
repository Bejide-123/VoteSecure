import React, { useState } from "react";
import {
  Vote,
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Pause,
  StopCircle,
  BarChart3,
  Settings,
  Search,
  Filter,
  ChevronRight,
  Activity,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

// ===== TYPE DEFINITIONS =====
interface OngoingElection {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalVoters: number;
  votedCount: number;
  positions: number;
  fraudAlerts: number;
  status: "active" | "paused";
  liveVotingRate: number; // votes per hour
}

const OngoingElections: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused">(
    "all"
  );

  // ===== MOCK DATA (will come from Supabase later) =====
  const elections: OngoingElection[] = [
    {
      id: "1",
      title: "Student Union Elections 2024",
      description: "Vote for President, VP, Secretary and other positions",
      startDate: "2024-11-10T08:00:00",
      endDate: "2024-11-15T18:00:00",
      totalVoters: 2847,
      votedCount: 1834,
      positions: 8,
      fraudAlerts: 3,
      status: "active",
      liveVotingRate: 145,
    },
    {
      id: "2",
      title: "Faculty Representative Elections",
      description: "Choose your department representatives",
      startDate: "2024-11-12T09:00:00",
      endDate: "2024-11-12T20:00:00",
      totalVoters: 856,
      votedCount: 723,
      positions: 4,
      fraudAlerts: 0,
      status: "active",
      liveVotingRate: 87,
    },
    {
      id: "3",
      title: "Sports Council Elections",
      description: "Vote for sports committee members",
      startDate: "2024-11-11T10:00:00",
      endDate: "2024-11-14T17:00:00",
      totalVoters: 1250,
      votedCount: 234,
      positions: 5,
      fraudAlerts: 1,
      status: "paused",
      liveVotingRate: 0,
    },
  ];

  // ===== FILTER ELECTIONS =====
  const filteredElections = elections.filter((election) => {
    const matchesSearch =
      election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      election.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || election.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // ===== CALCULATE PERCENTAGE =====
  const getVotedPercentage = (voted: number, total: number): number => {
    return Math.round((voted / total) * 100);
  };

  // ===== TIME REMAINING =====
  const getTimeRemaining = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ===== PAGE HEADER ===== */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Ongoing Elections
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage active elections in real-time
            </p>
          </div>

          {/* Stats Summary */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {elections.filter((e) => e.status === "active").length}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paused</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {elections.filter((e) => e.status === "paused").length}
              </p>
            </div>
          </div>
        </div>

        {/* ===== SEARCH & FILTER BAR ===== */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search elections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        {/* ===== ELECTIONS LIST ===== */}
        {filteredElections.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Vote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No elections found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredElections.map((election) => {
              const votedPercentage = getVotedPercentage(
                election.votedCount,
                election.totalVoters
              );

              return (
                <div
                  key={election.id}
                  className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Status Banner */}
                  <div
                    className={`px-6 py-3 ${
                      election.status === "active"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-orange-500 to-red-500"
                    }`}
                  >
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            election.status === "active"
                              ? "bg-white animate-pulse"
                              : "bg-white/50"
                          }`}
                        />
                        <span className="font-bold text-sm">
                          {election.status === "active" ? "LIVE NOW" : "PAUSED"}
                        </span>
                        {election.status === "active" && (
                          <span className="text-xs opacity-75">
                            • {election.liveVotingRate} votes/hr
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {getTimeRemaining(election.endDate)}
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Left: Election Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {election.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {election.description}
                          </p>
                        </div>

                        {/* Voting Progress */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Voter Turnout
                            </span>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {election.votedCount.toLocaleString()} /{" "}
                              {election.totalVoters.toLocaleString()} (
                              {votedPercentage}%)
                            </span>
                          </div>
                          <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all duration-500"
                              style={{ width: `${votedPercentage}%` }}
                            />
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Vote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Positions
                              </p>
                            </div>
                            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                              {election.positions}
                            </p>
                          </div>

                          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Voters
                              </p>
                            </div>
                            <p className="text-xl font-bold text-green-600 dark:text-green-400">
                              {election.totalVoters.toLocaleString()}
                            </p>
                          </div>

                          <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Rate
                              </p>
                            </div>
                            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                              {election.liveVotingRate}/hr
                            </p>
                          </div>

                          <div
                            className={`rounded-lg p-3 text-center ${
                              election.fraudAlerts > 0
                                ? "bg-red-50 dark:bg-red-950/30"
                                : "bg-gray-50 dark:bg-gray-900"
                            }`}
                          >
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <AlertTriangle
                                className={`w-4 h-4 ${
                                  election.fraudAlerts > 0
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-gray-400"
                                }`}
                              />
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Alerts
                              </p>
                            </div>
                            <p
                              className={`text-xl font-bold ${
                                election.fraudAlerts > 0
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {election.fraudAlerts}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="space-y-3">
                        <button
                          onClick={() =>
                            navigate(`/admin/elections/${election.id}/monitor`)
                          }
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                        >
                          <Eye className="w-5 h-5" />
                          Live Monitor
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/admin/elections/${election.id}/results`)
                          }
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                        >
                          <BarChart3 className="w-5 h-5" />
                          View Results
                        </button>

                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all">
                          {election.status === "active" ? (
                            <>
                              <Pause className="w-5 h-5" />
                              Pause Election
                            </>
                          ) : (
                            <>
                              <TrendingUp className="w-5 h-5" />
                              Resume Election
                            </>
                          )}
                        </button>

                        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all">
                          <StopCircle className="w-5 h-5" />
                          End Early
                        </button>

                        <button
                          onClick={() =>
                            navigate(`/admin/elections/${election.id}/settings`)
                          }
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-gray-400 dark:hover:border-gray-600 transition-all"
                        >
                          <Settings className="w-5 h-5" />
                          Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OngoingElections;
