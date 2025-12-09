import React, { useState, useEffect } from "react";
import {
  UserCheck,
  X,
  CheckCircle2,
  //   AlertCircle,
  Eye,
  Filter,
  Search,
  FileText,
  Award,
  User,
  Mail,
  Phone,
  Calendar,
  Building,
  GraduationCap,
  //   ChevronRight,
  Clock,
  Ban,
  Loader,
} from "lucide-react";
import { useApplications } from "../Context/ApplicationContext";
import AdminLayout from "./AdminLayout";

// ===== TYPE DEFINITIONS =====
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
  gpa?: string;
}

interface ApprovalModal {
  isOpen: boolean;
  candidate: Candidate | null;
  action: "approve" | "reject" | null;
}

const ApproveCandidates: React.FC = () => {
  const {
    pendingApplications,
    loading,
    approveApplication,
    rejectApplication,
    fetchApplications,
  } = useApplications();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterElection, setFilterElection] = useState<string>("all");
  const [filterPosition, setFilterPosition] = useState<string>("all");
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [approvalModal, setApprovalModal] = useState<ApprovalModal>({
    isOpen: false,
    candidate: null,
    action: null,
  });
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState<Candidate | null>(
    null
  );

  useEffect(() => {
    fetchApplications();
  }, []);

  // ===== MOCK DATA =====
  const candidates: Candidate[] = pendingApplications.map((app) => ({
    id: app.id,
    fullName: app.applicant_name,
    email: app.applicant_email,
    phone: app.applicant_phone,
    memberId: app.applicant_member_id || "N/A",
    department: app.applicant_department || "N/A",
    level: app.applicant_level,
    electionTitle: app.election_id, // This should be dynamic
    positionAppliedFor: app.position_title,
    manifesto: app.manifesto,
    qualifications: app.qualifications,
    photoUrl: app.profile_image_url,
    appliedAt: app.applied_at,
    gpa: app.applicant_cgpa.toString(),
  }));

  // Get unique elections and positions
  const elections = Array.from(
    new Set(pendingApplications.map((c) => c.election_id))
  );
  const positions = Array.from(
    new Set(pendingApplications.map((c) => c.position_title))
  );

  // ===== FILTER CANDIDATES =====
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.positionAppliedFor
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesElection =
      filterElection === "all" || candidate.electionTitle === filterElection;

    const matchesPosition =
      filterPosition === "all" ||
      candidate.positionAppliedFor === filterPosition;

    return matchesSearch && matchesElection && matchesPosition;
  });

  // ===== HANDLE CHECKBOX =====
  const handleSelectCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates.length === filteredCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates.map((c) => c.id));
    }
  };

  // ===== OPEN APPROVAL MODAL =====
  const openApprovalModal = (
    candidate: Candidate,
    action: "approve" | "reject"
  ) => {
    setApprovalModal({ isOpen: true, candidate, action });
    setFeedback("");
  };

  // ===== HANDLE APPROVAL =====
  const handleApproval = async () => {
    if (!approvalModal.candidate) return;

    setIsProcessing(true);
    try {
      if (approvalModal.action === "approve") {
        await approveApplication(approvalModal.candidate.id);
      } else {
        await rejectApplication(approvalModal.candidate.id, feedback);
      }

      alert(
        `Candidate ${
          approvalModal.action === "approve" ? "approved" : "rejected"
        } successfully!`
      );

      // Close modal
      setApprovalModal({ isOpen: false, candidate: null, action: null });
      setFeedback("");
    } catch (error) {
      console.error("Error processing approval:", error);
      alert("Failed to process. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ===== BULK ACTIONS =====
  const handleBulkAction = async (action: "approve" | "reject") => {
    if (selectedCandidates.length === 0) {
      alert("Please select at least one candidate");
      return;
    }

    const confirmMessage = `Are you sure you want to ${action} ${selectedCandidates.length} candidate(s)?`;
    if (!confirm(confirmMessage)) return;

    setIsProcessing(true);
    try {
      await Promise.all(
        selectedCandidates.map((id) => {
          if (action === "approve") {
            return approveApplication(id);
          } else {
            return rejectApplication(id, "Bulk rejection");
          }
        })
      );
      alert(
        `${selectedCandidates.length} candidate(s) ${action}d successfully!`
      );
      setSelectedCandidates([]);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to process. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ===== TIME AGO =====
  const getTimeAgo = (date: string): string => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-96">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* ===== PAGE HEADER ===== */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Approve Candidates
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Review and approve or reject candidate applications
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pending
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {pendingApplications.length}
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {selectedCandidates.length}
              </p>
            </div>
          </div>
        </div>

        {/* ===== BULK ACTIONS BAR ===== */}
        {selectedCandidates.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {selectedCandidates.length} candidate(s) selected
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleBulkAction("approve")}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve All
                </button>
                <button
                  onClick={() => handleBulkAction("reject")}
                  disabled={isProcessing}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  <Ban className="w-4 h-4" />
                  Reject All
                </button>
                <button
                  onClick={() => setSelectedCandidates([])}
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== FILTERS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative md:col-span-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Election Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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

        {/* ===== SELECT ALL CHECKBOX ===== */}
        {filteredCandidates.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <input
              type="checkbox"
              checked={selectedCandidates.length === filteredCandidates.length}
              onChange={handleSelectAll}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Select All ({filteredCandidates.length})
            </span>
          </div>
        )}

        {/* ===== CANDIDATES LIST ===== */}
        {filteredCandidates.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <UserCheck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No candidates found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleSelectCandidate(candidate.id)}
                    className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Photo */}
                  <img
                    src={candidate.photoUrl}
                    alt={candidate.fullName}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {candidate.fullName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {candidate.memberId} • {candidate.department} •{" "}
                          {candidate.level} Level
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                            {candidate.positionAppliedFor}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold">
                            {candidate.electionTitle}
                          </span>
                          {candidate.gpa && (
                            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                              GPA: {candidate.gpa}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {getTimeAgo(candidate.appliedAt)}
                      </div>
                    </div>

                    {/* Manifesto Preview */}
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        <span className="font-semibold">Manifesto:</span>{" "}
                        {candidate.manifesto}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => setViewDetailsModal(candidate)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>

                      <button
                        onClick={() => openApprovalModal(candidate, "approve")}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Approve
                      </button>

                      <button
                        onClick={() => openApprovalModal(candidate, "reject")}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-sm"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== APPROVAL/REJECTION MODAL ===== */}
        {approvalModal.isOpen && approvalModal.candidate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
              <div className="text-center mb-6">
                <div
                  className={`inline-flex p-3 rounded-full mb-4 ${
                    approvalModal.action === "approve"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {approvalModal.action === "approve" ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  ) : (
                    <X className="w-8 h-8 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {approvalModal.action === "approve" ? "Approve" : "Reject"}{" "}
                  Candidate?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {approvalModal.candidate.fullName} •{" "}
                  {approvalModal.candidate.positionAppliedFor}
                </p>
              </div>

              {/* Feedback */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Feedback {approvalModal.action === "reject" && "(Required)"}
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={
                    approvalModal.action === "approve"
                      ? "Optional: Add a congratulatory message..."
                      : "Required: Provide a reason for rejection..."
                  }
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setApprovalModal({
                      isOpen: false,
                      candidate: null,
                      action: null,
                    })
                  }
                  disabled={isProcessing}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApproval}
                  disabled={
                    isProcessing ||
                    (approvalModal.action === "reject" && !feedback.trim())
                  }
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all disabled:opacity-50 ${
                    approvalModal.action === "approve"
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : approvalModal.action === "approve"
                    ? "Confirm Approval"
                    : "Confirm Rejection"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== VIEW DETAILS MODAL ===== */}
        {viewDetailsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={viewDetailsModal.photoUrl}
                    alt={viewDetailsModal.fullName}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {viewDetailsModal.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {viewDetailsModal.positionAppliedFor}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewDetailsModal(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="space-y-4 mb-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Member ID
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {viewDetailsModal.memberId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Email
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {viewDetailsModal.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Phone
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {viewDetailsModal.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Building className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Department
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {viewDetailsModal.department}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Level
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {viewDetailsModal.level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        GPA
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {viewDetailsModal.gpa || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Election Info */}
                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Election Details
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span className="font-semibold">Election:</span>{" "}
                    {viewDetailsModal.electionTitle}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">Position:</span>{" "}
                    {viewDetailsModal.positionAppliedFor}
                  </p>
                </div>

                {/* Manifesto */}
                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      Manifesto
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {viewDetailsModal.manifesto}
                  </p>
                </div>

                {/* Qualifications */}
                <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      Qualifications
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {viewDetailsModal.qualifications}
                  </p>
                </div>

                {/* Applied At */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Applied on{" "}
                    {new Date(viewDetailsModal.appliedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => {
                    setViewDetailsModal(null);
                    openApprovalModal(viewDetailsModal, "approve");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Approve Candidate
                </button>

                <button
                  onClick={() => {
                    setViewDetailsModal(null);
                    openApprovalModal(viewDetailsModal, "reject");
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
                >
                  <X className="w-5 h-5" />
                  Reject Candidate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ApproveCandidates;
