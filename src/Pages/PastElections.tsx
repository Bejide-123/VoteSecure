import React, { useState } from "react";
import {
  Trophy,
  Users,
  TrendingUp,
  Download,
  Eye,
  CheckCircle2,
  Search,
  Filter,
  Calendar,
  BarChart3,
  FileText,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

// ===== TYPE DEFINITIONS =====
interface PastElection {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  totalVoters: number;
  votedCount: number;
  positions: number;
  winnersCount: number;
  turnoutPercentage: number;
  fraudIncidents: number;
  completedAt: string;
}

const PastElections: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState<string>("all");

  // ===== MOCK DATA =====
  const elections: PastElection[] = [
    {
      id: "1",
      title: "Student Union Elections 2024",
      description: "Annual student union leadership elections",
      startDate: "2024-10-10T08:00:00",
      endDate: "2024-10-15T18:00:00",
      totalVoters: 2847,
      votedCount: 2341,
      positions: 8,
      winnersCount: 8,
      turnoutPercentage: 82,
      fraudIncidents: 0,
      completedAt: "2024-10-15T18:05:32",
    },
    {
      id: "2",
      title: "Sports Council Elections Q3",
      description: "Quarterly sports committee member selection",
      startDate: "2024-09-05T10:00:00",
      endDate: "2024-09-08T17:00:00",
      totalVoters: 1250,
      votedCount: 987,
      positions: 5,
      winnersCount: 5,
      turnoutPercentage: 79,
      fraudIncidents: 1,
      completedAt: "2024-09-08T17:02:15",
    },
    {
      id: "3",
      title: "Faculty Representative Elections",
      description: "Department representatives for academic year 2024-2025",
      startDate: "2024-08-15T09:00:00",
      endDate: "2024-08-18T20:00:00",
      totalVoters: 856,
      votedCount: 723,
      positions: 4,
      winnersCount: 4,
      turnoutPercentage: 84,
      fraudIncidents: 0,
      completedAt: "2024-08-18T20:01:45",
    },
    {
      id: "4",
      title: "Library Committee Elections",
      description: "Selection of library management committee members",
      startDate: "2024-07-10T08:00:00",
      endDate: "2024-07-12T16:00:00",
      totalVoters: 450,
      votedCount: 312,
      positions: 3,
      winnersCount: 3,
      turnoutPercentage: 69,
      fraudIncidents: 0,
      completedAt: "2024-07-12T16:03:20",
    },
    {
      id: "5",
      title: "Student Union Elections 2023",
      description: "Previous year's student union leadership elections",
      startDate: "2023-10-12T08:00:00",
      endDate: "2023-10-17T18:00:00",
      totalVoters: 2654,
      votedCount: 1876,
      positions: 8,
      winnersCount: 8,
      turnoutPercentage: 71,
      fraudIncidents: 2,
      completedAt: "2023-10-17T18:04:12",
    },
  ];

  // ===== GET AVAILABLE YEARS =====
  const availableYears = Array.from(
    new Set(elections.map((e) => new Date(e.endDate).getFullYear()))
  ).sort((a, b) => b - a);

  // ===== FILTER ELECTIONS =====
  const filteredElections = elections.filter((election) => {
    const matchesSearch =
      election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      election.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear =
      filterYear === "all" ||
      new Date(election.endDate).getFullYear().toString() === filterYear;
    return matchesSearch && matchesYear;
  });

  // ===== CALCULATE STATS =====
  const totalElections = filteredElections.length;
  const totalVotersCast = filteredElections.reduce(
    (sum, e) => sum + e.votedCount,
    0
  );
  const averageTurnout = Math.round(
    filteredElections.reduce((sum, e) => sum + e.turnoutPercentage, 0) /
      filteredElections.length
  );

  // ===== GET TIME AGO =====
  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  // ===== EXPORT REPORT =====
  const handleExport = (electionId: string, format: "pdf" | "excel") => {
    console.log(`Exporting election ${electionId} as ${format}`);
    // TODO: Implement export functionality
    alert(`Export as ${format.toUpperCase()} - Feature coming soon!`);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ===== PAGE HEADER ===== */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Past Elections
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View completed elections, results, and analytics
          </p>
        </div>

        {/* ===== STATS OVERVIEW ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Trophy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Completed Elections
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalElections}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Votes Cast
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {totalVotersCast.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Average Turnout
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {averageTurnout}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SEARCH & FILTER ===== */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search past elections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== ELECTIONS LIST ===== */}
        {filteredElections.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No past elections found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredElections.map((election) => (
              <div
                key={election.id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Completed Banner */}
                <div className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 dark:from-gray-700 dark:to-gray-900">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold text-sm">COMPLETED</span>
                      <span className="text-xs opacity-75">
                        • {getTimeAgo(election.completedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(election.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Election Info */}
                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {election.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {election.description}
                        </p>
                      </div>

                      {/* Turnout Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Final Turnout
                          </span>
                          <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            {election.votedCount.toLocaleString()} /{" "}
                            {election.totalVoters.toLocaleString()} (
                            {election.turnoutPercentage}%)
                          </span>
                        </div>
                        <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                              election.turnoutPercentage >= 80
                                ? "bg-gradient-to-r from-green-600 to-emerald-600"
                                : election.turnoutPercentage >= 60
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                                : "bg-gradient-to-r from-orange-600 to-red-600"
                            }`}
                            style={{ width: `${election.turnoutPercentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Positions
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {election.positions}
                          </p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Winners
                          </p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {election.winnersCount}
                          </p>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Turnout
                          </p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {election.turnoutPercentage}%
                          </p>
                        </div>

                        <div
                          className={`rounded-lg p-3 text-center ${
                            election.fraudIncidents > 0
                              ? "bg-red-50 dark:bg-red-950/30"
                              : "bg-gray-50 dark:bg-gray-900"
                          }`}
                        >
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Incidents
                          </p>
                          <p
                            className={`text-2xl font-bold ${
                              election.fraudIncidents > 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-gray-400"
                            }`}
                          >
                            {election.fraudIncidents}
                          </p>
                        </div>
                      </div>

                      {/* Success Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400 text-sm font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        All positions filled • No disputes
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/elections/${election.id}/results`)
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                      >
                        <Eye className="w-5 h-5" />
                        View Results
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/admin/elections/${election.id}/analytics`)
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                      >
                        <BarChart3 className="w-5 h-5" />
                        View Analytics
                      </button>

                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 text-center">
                          Export Report
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleExport(election.id, "pdf")}
                            className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                          >
                            <FileText className="w-4 h-4" />
                            PDF
                          </button>
                          <button
                            onClick={() => handleExport(election.id, "excel")}
                            className="flex items-center justify-center gap-1 px-3 py-2 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg text-sm font-semibold hover:bg-green-100 dark:hover:bg-green-950/50 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            Excel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default PastElections;
