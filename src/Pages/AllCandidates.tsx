import React, { useState } from "react";
import {
  Trophy,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  UserCheck,
  UserX,
  Ban,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";
// import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";

// ===== TYPE DEFINITIONS =====
type CandidateStatus = "pending" | "approved" | "rejected" | "suspended";

interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  memberId: string;
  department: string;
  level: string;
  electionTitle: string;
  positionAppliedFor: string;
  manifesto: string;
  qualifications: string;
  photoUrl: string;
  appliedAt: string;
  status: CandidateStatus;
  gpa?: string;
  votesReceived?: number;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;
}

interface ViewDetailsModal {
  isOpen: boolean;
  candidate: Candidate | null;
}

const AllCandidates: React.FC = () => {
//   const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<CandidateStatus | "all">("all");
  const [filterElection, setFilterElection] = useState<string>("all");
  const [filterPosition, setFilterPosition] = useState<string>("all");
  const [viewDetailsModal, setViewDetailsModal] = useState<ViewDetailsModal>({
    isOpen: false,
    candidate: null,
  });
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  // ===== MOCK DATA =====
  const candidates: Candidate[] = [
    {
      id: "1",
      fullName: "Chioma Okafor",
      email: "chioma.okafor@student.edu",
      phone: "+234 803 456 7890",
      memberId: "2020/CS/001",
      department: "Computer Science",
      level: "400 Level",
      electionTitle: "Student Union Elections 2024",
      positionAppliedFor: "President",
      manifesto: "I promise to bring positive change to our campus by improving student welfare, enhancing campus facilities, and ensuring transparent leadership.",
      qualifications: "Former Class Representative (3 years), Sports Council Member, 3.8 GPA",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma",
      appliedAt: "2024-11-10T14:30:00",
      status: "approved",
      gpa: "3.8",
      votesReceived: 1234,
      approvedBy: "Admin User",
      approvedAt: "2024-11-11T09:00:00",
    },
    {
      id: "2",
      fullName: "Ahmed Bello",
      email: "ahmed.bello@student.edu",
      phone: "+234 805 123 4567",
      memberId: "2019/ENG/045",
      department: "Engineering",
      level: "500 Level",
      electionTitle: "Student Union Elections 2024",
      positionAppliedFor: "Vice President",
      manifesto: "As your VP, I will work tirelessly to bridge the gap between students and administration.",
      qualifications: "Engineering Society President, Dean's List (4 semesters)",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      appliedAt: "2024-11-10T15:45:00",
      status: "approved",
      gpa: "3.6",
      votesReceived: 987,
      approvedBy: "Admin User",
      approvedAt: "2024-11-11T10:30:00",
    },
    {
      id: "3",
      fullName: "Grace Adeyemi",
      email: "grace.adeyemi@student.edu",
      phone: "+234 807 890 1234",
      memberId: "2021/MED/089",
      department: "Medicine",
      level: "300 Level",
      electionTitle: "Student Union Elections 2024",
      positionAppliedFor: "Secretary General",
      manifesto: "Efficient documentation and communication will be my priority.",
      qualifications: "Medical Students Association Secretary, First Class Student",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
      appliedAt: "2024-11-11T09:15:00",
      status: "pending",
      gpa: "4.0",
    },
    {
      id: "4",
      fullName: "Ibrahim Yusuf",
      email: "ibrahim.yusuf@student.edu",
      phone: "+234 806 234 5678",
      memberId: "2020/LAW/023",
      department: "Law",
      level: "400 Level",
      electionTitle: "Faculty Representative Elections",
      positionAppliedFor: "Faculty Rep - Law",
      manifesto: "I will be the voice of law students in university decisions.",
      qualifications: "Moot Court Champion 2023, Law Society Vice President",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim",
      appliedAt: "2024-11-11T10:30:00",
      status: "rejected",
      gpa: "3.7",
      rejectionReason: "Insufficient leadership experience for this position.",
    },
    {
      id: "5",
      fullName: "Blessing Nwafor",
      email: "blessing.nwafor@student.edu",
      phone: "+234 809 876 5432",
      memberId: "2022/BIO/112",
      department: "Biology",
      level: "200 Level",
      electionTitle: "Sports Council Elections",
      positionAppliedFor: "Sports Director",
      manifesto: "Sports unite us all! I'll organize more inter-departmental competitions.",
      qualifications: "Track & Field Captain, Intramural Coordinator",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing",
      appliedAt: "2024-11-12T11:45:00",
      status: "pending",
      gpa: "3.4",
    },
    {
      id: "6",
      fullName: "Oluwaseun Adeleke",
      email: "oluwaseun.adeleke@student.edu",
      phone: "+234 802 345 6789",
      memberId: "2020/BUS/067",
      department: "Business Administration",
      level: "400 Level",
      electionTitle: "Student Union Elections 2024",
      positionAppliedFor: "Treasurer",
      manifesto: "Financial transparency and accountability will be my watchwords.",
      qualifications: "Accounting Club President, Financial Management Certificate",
      photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oluwaseun",
      appliedAt: "2024-11-09T16:20:00",
      status: "suspended",
      gpa: "3.5",
      rejectionReason: "Suspended due to violation of campaign rules.",
    },
  ];

  // Get unique values for filters
  const elections = Array.from(new Set(candidates.map((c) => c.electionTitle)));
  const positions = Array.from(new Set(candidates.map((c) => c.positionAppliedFor)));

  // ===== FILTER CANDIDATES =====
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.memberId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || candidate.status === filterStatus;

    const matchesElection =
      filterElection === "all" || candidate.electionTitle === filterElection;

    const matchesPosition =
      filterPosition === "all" || candidate.positionAppliedFor === filterPosition;

    return matchesSearch && matchesStatus && matchesElection && matchesPosition;
  });

  // ===== CALCULATE STATS =====
  const stats = {
    total: candidates.length,
    approved: candidates.filter((c) => c.status === "approved").length,
    pending: candidates.filter((c) => c.status === "pending").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
    suspended: candidates.filter((c) => c.status === "suspended").length,
  };

  // ===== STATUS BADGE =====
  const getStatusBadge = (status: CandidateStatus) => {
    const badges = {
      pending: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-700 dark:text-orange-400",
        icon: <Clock className="w-3 h-3" />,
        label: "Pending",
      },
      approved: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        icon: <CheckCircle2 className="w-3 h-3" />,
        label: "Approved",
      },
      rejected: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-700 dark:text-red-400",
        icon: <XCircle className="w-3 h-3" />,
        label: "Rejected",
      },
      suspended: {
        bg: "bg-gray-100 dark:bg-gray-900/30",
        text: "text-gray-700 dark:text-gray-400",
        icon: <Ban className="w-3 h-3" />,
        label: "Suspended",
      },
    };

    const badge = badges[status];
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${badge.bg} ${badge.text}`}
      >
        {badge.icon}
        {badge.label}
      </span>
    );
  };

  // ===== HANDLE EXPORT =====
  const handleExport = () => {
    console.log("Exporting candidates...");
    alert("Export feature coming soon!");
  };

  // ===== HANDLE ACTIONS =====
  const handleAction = (candidateId: string, action: string) => {
    console.log(`Action: ${action} for candidate: ${candidateId}`);
    alert(`${action} - Feature coming soon!`);
    setActionMenuOpen(null);
  };

  return (
      <AdminLayout>
    <div className="space-y-8">
      {/* ===== PAGE HEADER ===== */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Candidates
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all candidate applications and profiles
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
        >
          <Download className="w-5 h-5" />
          Export List
        </button>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.total}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {stats.approved}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {stats.pending}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Rejected</p>
          </div>
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.rejected}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Ban className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
          </div>
          <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {stats.suspended}
          </p>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Election Filter */}
        <div className="relative">
          <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterElection}
            onChange={(e) => setFilterElection(e.target.value)}
            className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Elections</option>
            {elections.map((election) => (
              <option key={election} value={election}>
                {election}
              </option>
            ))}
          </select>
        </div>

        {/* Position Filter */}
        <div className="relative">
          <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Positions</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ===== CANDIDATES TABLE ===== */}
      {filteredCandidates.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No candidates found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Election
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Votes
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredCandidates.map((candidate) => (
                  <tr
                    key={candidate.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Candidate Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.fullName}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {candidate.fullName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {candidate.memberId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {candidate.positionAppliedFor}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {candidate.department}
                      </p>
                    </td>

                    {/* Election */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                        {candidate.electionTitle}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(candidate.status)}
                    </td>

                    {/* Votes */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {candidate.votesReceived !== undefined ? (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {candidate.votesReceived.toLocaleString()}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* Applied Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(candidate.appliedAt).toLocaleDateString()}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() =>
                            setActionMenuOpen(
                              actionMenuOpen === candidate.id ? null : candidate.id
                            )
                          }
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>

                        {/* Action Menu Dropdown */}
                        {actionMenuOpen === candidate.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActionMenuOpen(null)}
                            />
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-20">
                              <button
                                onClick={() => {
                                  setViewDetailsModal({
                                    isOpen: true,
                                    candidate,
                                  });
                                  setActionMenuOpen(null);
                                }}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-xl"
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>

                              {candidate.status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleAction(candidate.id, "Approve")
                                    }
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-green-700 dark:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <UserCheck className="w-4 h-4" />
                                    Approve
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleAction(candidate.id, "Reject")
                                    }
                                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <UserX className="w-4 h-4" />
                                    Reject
                                  </button>
                                </>
                              )}

                              {candidate.status === "approved" && (
                                <button
                                  onClick={() =>
                                    handleAction(candidate.id, "Suspend")
                                  }
                                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-orange-700 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                  <Ban className="w-4 h-4" />
                                  Suspend
                                </button>
                              )}

                              <button
                                onClick={() => handleAction(candidate.id, "Edit")}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-700 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                Edit Profile
                              </button>

                              <button
                                onClick={() => handleAction(candidate.id, "Delete")}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors last:rounded-b-xl"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== VIEW DETAILS MODAL ===== */}
      {viewDetailsModal.isOpen && viewDetailsModal.candidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full my-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={viewDetailsModal.candidate.photoUrl}
                  alt={viewDetailsModal.candidate.fullName}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {viewDetailsModal.candidate.fullName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(viewDetailsModal.candidate.status)}
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {viewDetailsModal.candidate.positionAppliedFor}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setViewDetailsModal({ isOpen: false, candidate: null })}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {viewDetailsModal.candidate.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Phone</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {viewDetailsModal.candidate.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Member ID</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {viewDetailsModal.candidate.memberId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">GPA</p>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {viewDetailsModal.candidate.gpa || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Academic Information
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Department:</span>{" "}
                  {viewDetailsModal.candidate.department} • {viewDetailsModal.candidate.level}
                </p>
              </div>

              {/* Election Info */}
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Election Details
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span className="font-semibold">Election:</span>{" "}
                  {viewDetailsModal.candidate.electionTitle}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Position:</span>{" "}
                  {viewDetailsModal.candidate.positionAppliedFor}
                </p>
              </div>

              {/* Manifesto */}
              <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Manifesto
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {viewDetailsModal.candidate.manifesto}
                </p>
              </div>

              {/* Qualifications */}
              <div className="p-4 bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  Qualifications
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {viewDetailsModal.candidate.qualifications}
                </p>
              </div>

              {/* Performance Stats (if approved) */}
              {viewDetailsModal.candidate.status === "approved" &&
                viewDetailsModal.candidate.votesReceived !== undefined && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                      Campaign Performance
                    </h4>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {viewDetailsModal.candidate.votesReceived.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        votes received
                      </span>
                    </div>
                  </div>
                )}

              {/* Rejection Reason (if rejected) */}
              {viewDetailsModal.candidate.status === "rejected" &&
                viewDetailsModal.candidate.rejectionReason && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        Rejection Reason
                      </h4>
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-400">
                      {viewDetailsModal.candidate.rejectionReason}
                    </p>
                  </div>
                )}

              {/* Approval Info (if approved) */}
              {viewDetailsModal.candidate.status === "approved" &&
                viewDetailsModal.candidate.approvedBy && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span>
                      Approved by {viewDetailsModal.candidate.approvedBy} on{" "}
                      {viewDetailsModal.candidate.approvedAt &&
                        new Date(viewDetailsModal.candidate.approvedAt).toLocaleString()}
                    </span>
                  </div>
                )}

              {/* Applied Date */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>
                  Applied on{" "}
                  {new Date(viewDetailsModal.candidate.appliedAt).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-800 mt-6">
              {viewDetailsModal.candidate.status === "pending" && (
                <>
                  <button
                    onClick={() => handleAction(viewDetailsModal.candidate!.id, "Approve")}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(viewDetailsModal.candidate!.id, "Reject")}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject
                  </button>
                </>
              )}

              {viewDetailsModal.candidate.status === "approved" && (
                <button
                  onClick={() => handleAction(viewDetailsModal.candidate!.id, "Suspend")}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all"
                >
                  <Ban className="w-5 h-5" />
                  Suspend Candidate
                </button>
              )}

              <button
                onClick={() => handleAction(viewDetailsModal.candidate!.id, "Edit")}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default AllCandidates;