import React, { useState } from "react";
import {
  Vote,
  Clock,
  TrendingUp,
  Pause,
  StopCircle,
  BarChart3,
  Settings,
  Search,
  Filter,
  ChevronRight,
  Eye,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useElections } from "../Context/ElectionContext";
import type Position  from "../Context/ElectionContext";
// import { useElections } from "../Context/ElectionContext";

interface Election {
  id: string; // ADDED
  title: string;
  description: string;
  election_type: "general" | "departmental" | "faculty" | "club";
  organization: string;
  application_start_date: string;
  application_end_date: string;
  registration_start_date: string;
  registration_end_date: string;
  voting_start_date: string;
  voting_end_date: string;
  allow_voice_voting: boolean;
  require_face_verification: boolean;
  send_email_notifications: boolean;
  send_sms_notifications: boolean;
  show_live_results: boolean;
  positions: Position[];
  voters: number; // Array of voter IDs
  status: "draft" | "scheduled" | "active" | "paused" | "completed" | "ended_early";
  created_at?: string; // optional
}


const OngoingElections: React.FC = () => {
  const { elections: supabaseElections, loading, updateElectionStatus } = useElections();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "paused">("all");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const handlePauseResume = async (election: Election) => {
    const newStatus = election.status === "active" ? "paused" : "active";
    setUpdatingStatus(election.id);
    try {
      await updateElectionStatus(election.id, newStatus);
    } catch (error) {
      console.error("Failed to update election status:", error);
      // You might want to show an error message to the user here
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleEndEarly = async (electionId: string) => {
    if (window.confirm("Are you sure you want to end this election early? This action cannot be undone.")) {
      setUpdatingStatus(electionId);
      try {
        await updateElectionStatus(electionId, "completed");
      } catch (error) {
        console.error("Failed to end election:", error);
        // You might want to show an error message to the user here
      } finally {
        setUpdatingStatus(null);
      }
    }
  };

  const ongoingElections = supabaseElections.filter(
    (election) => election.status === "active" || election.status === "paused"
  );

  const filteredElections = ongoingElections.filter((election) => {
    const matchesSearch =
      election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      election.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || election.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getVotedPercentage = (voted: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((voted / total) * 100);
  };

  const getTimeRemaining = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  if (loading && supabaseElections.length === 0) {
    return (
      <AdminLayout>
        <div className="text-center py-16">
          <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading ongoing elections...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Ongoing Elections
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage active elections in real-time
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {ongoingElections.filter((e) => e.status === "active").length}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">Paused</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {ongoingElections.filter((e) => e.status === "paused").length}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
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

        {filteredElections.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Vote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No ongoing elections found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "There are no elections currently running or paused."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredElections.map((election) => {
              const votedPercentage = getVotedPercentage(0, 100); // Placeholder
              const isUpdating = updatingStatus === election.id;

              return (
                <div
                  key={election.id}
                  className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
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
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {getTimeRemaining(election.voting_end_date)}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {election.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {election.description}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                              Voter Turnout
                            </span>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {/* Placeholder values */}
                              0 / 0 ({votedPercentage}%)
                            </span>
                          </div>
                          <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full transition-all duration-500"
                              style={{ width: `${votedPercentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {/* Placeholder stats */}
                        </div>
                      </div>

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
                        <button
                          onClick={() => handlePauseResume(election)}
                          disabled={isUpdating}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : election.status === "active" ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <TrendingUp className="w-5 h-5" />
                          )}
                          {isUpdating
                            ? "Updating..."
                            : election.status === "active"
                            ? "Pause Election"
                            : "Resume Election"}
                        </button>
                        <button
                          onClick={() => handleEndEarly(election.id)}
                          disabled={isUpdating}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isUpdating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <StopCircle className="w-5 h-5" />
                          )}
                          {isUpdating ? "Ending..." : "End Early"}
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