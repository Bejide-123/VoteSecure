import React, { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Edit,
  Trash2,
  Play,
  Users,
  Vote,
  Search,
  Plus,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { useElections } from "../Context/ElectionContext";

const ScheduledElections: React.FC = () => {
  const navigate = useNavigate();
  const { elections, loading, deleteElection } = useElections();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedElection, setSelectedElection] = useState<string | null>(null);

  // ===== FILTER ELECTIONS =====
  const scheduledElections = useMemo(() => {
    return elections.filter(
      (election) =>
        election.status === "active" &&
        new Date(election.voting_start_date) > new Date()
    );
  }, [elections]);

  const filteredElections = useMemo(() => {
    return scheduledElections.filter(
      (election) =>
        election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        election.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [scheduledElections, searchQuery]);

  // ===== COUNTDOWN TIMER =====
  const getCountdown = (startDate: string): string => {
    const now = new Date();
    const start = new Date(startDate);
    const diff = start.getTime() - now.getTime();

    if (diff <= 0) {
      return "Starting soon";
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 30) return `Starts in ${Math.floor(days / 30)} months`;
    if (days > 0) return `Starts in ${days}d ${hours}h`;
    if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
    return `Starts in ${minutes}m`;
  };

  // ===== HANDLE DELETE =====
  const handleDelete = (id: string) => {
    setSelectedElection(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedElection) {
      await deleteElection(selectedElection);
      setShowDeleteModal(false);
      setSelectedElection(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ===== PAGE HEADER ===== */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Scheduled Elections
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Elections that are scheduled to start in the future
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/elections/create")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Election
          </button>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Scheduled
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scheduledElections.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expected Voters
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scheduledElections
                    .reduce((sum, e) => sum + (e.voters || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Vote className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Positions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scheduledElections.reduce(
                    (sum, e) => sum + (e.positions?.length || 0),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== SEARCH BAR ===== */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search scheduled elections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* ===== ELECTIONS LIST ===== */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : filteredElections.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No scheduled elections
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first election to get started
            </p>
            <button
              onClick={() => navigate("/admin/elections/create")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Election
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredElections.map((election) => (
              <div
                key={election.id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Countdown Banner */}
                <div className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span className="font-bold">
                        {getCountdown(election.voting_start_date)}
                      </span>
                    </div>
                    <div className="text-sm opacity-90">
                      Registration:{" "}
                      {new Date(
                        election.registration_start_date
                      ).toLocaleDateString()}
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

                      {/* Timeline */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-24 text-gray-600 dark:text-gray-400 font-semibold">
                            Registration:
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-gray-900 dark:text-white">
                              {new Date(
                                election.registration_start_date
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                election.registration_end_date
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-24 text-gray-600 dark:text-gray-400 font-semibold">
                            Voting:
                          </div>
                          <div className="flex items-center gap-2">
                            <Vote className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-gray-900 dark:text-white">
                              {new Date(
                                election.voting_start_date
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                election.voting_end_date
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Positions
                          </p>
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {election.positions?.length || 0}
                          </p>
                        </div>

                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Eligible Voters
                          </p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {(election.voters || 0).toLocaleString()}
                          </p>
                        </div>

                        <div
                          className={`rounded-lg p-3 text-center bg-purple-50 dark:bg-purple-950/30`}
                        >
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            Candidates
                          </p>
                          <p
                            className={`text-2xl font-bold text-purple-600 dark:text-purple-400`}
                          >
                            0
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/elections/edit/${election.id}`)
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
                      >
                        <Edit className="w-5 h-5" />
                        Edit Election
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-green-500 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all">
                        <Play className="w-5 h-5" />
                        Start Early
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/admin/candidates/all`)
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                      >
                        <Users className="w-5 h-5" />
                        Manage Candidates
                      </button>

                      <button
                        onClick={() => handleDelete(election.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-red-500 dark:hover:border-red-500 hover:text-red-600 dark:hover:text-red-400 transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== DELETE CONFIRMATION MODAL ===== */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
              <div className="text-center mb-6">
                <div className="inline-flex p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                  <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Delete Election?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This action cannot be undone. All election data will be
                  permanently deleted.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ScheduledElections;
