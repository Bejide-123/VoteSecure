import React, { useState, useEffect } from "react";
import {
  UserCheck,
  X,
  CheckCircle2,
  Eye,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  Calendar,
  Hash,
  Clock,
  Ban,
  Image,
  GraduationCap,
  Award,
  FileText,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { supabase } from "../lib/supabase";

// ===== TYPE DEFINITIONS =====
interface VoterApplication {
  id: string;
  user_id: string;
  voter_name: string;
  voter_email: string;
  voter_phone: string;
  voter_department: string;
  voter_level: string;
  student_id: string;
  organization: string;
  selfie_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  registered_at: string;
  reviewed_at?: string;
  updated_at: string;
}

interface VoterApplicationWithUser extends VoterApplication {
  user?: {
    full_name?: string;
    email?: string;
    department?: string;
    member_id?: string;
    organization?: string;
    selfie_url?: string;
  };
}

interface ApprovalModal {
  isOpen: boolean;
  application: VoterApplicationWithUser | null;
  action: "approve" | "reject" | null;
}

const ApproveVoters: React.FC = () => {
  const [applications, setApplications] = useState<VoterApplicationWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  const [approvalModal, setApprovalModal] = useState<ApprovalModal>({
    isOpen: false,
    application: null,
    action: null,
  });
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState<VoterApplicationWithUser | null>(null);

  // Fetch applications from database
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      
      // Fetch voter registrations
      const { data: applicationsData, error } = await supabase
        .from("voter_registrations")
        .select("*")
        .order("registered_at", { ascending: false });

      if (error) throw error;

      // Fetch user details for each application
      const applicationsWithUsers = await Promise.all(
        (applicationsData || []).map(async (app: VoterApplication) => {
          const { data: userData } = await supabase
            .from("users")
            .select("full_name, email, department, member_id, organization, selfie_url")
            .eq("id", app.user_id)
            .single();

          return {
            ...app,
            user: userData || undefined,
          };
        })
      );

      setApplications(applicationsWithUsers);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Get unique departments for filter
  const departments = Array.from(new Set(applications.map(a => a.voter_department || a.user?.department).filter(Boolean))) as string[];

  // Filter applications
  const filteredApplications = applications.filter((app) => {
    const searchString = searchQuery.toLowerCase();
    const matchesSearch =
      app.voter_name?.toLowerCase().includes(searchString) ||
      app.voter_email?.toLowerCase().includes(searchString) ||
      app.student_id?.toLowerCase().includes(searchString) ||
      app.user?.full_name?.toLowerCase().includes(searchString) ||
      app.user?.email?.toLowerCase().includes(searchString) ||
      app.user?.member_id?.toLowerCase().includes(searchString);

    const matchesDepartment =
      filterDepartment === "all" || 
      app.voter_department === filterDepartment || 
      app.user?.department === filterDepartment;

    const matchesStatus =
      filterStatus === "all" || 
      app.status === filterStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle selection
  const handleSelectApplication = (appId: string) => {
    setSelectedApplications((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    );
  };

  const handleSelectAll = () => {
    setSelectedApplications(
      selectedApplications.length === filteredApplications.length
        ? []
        : filteredApplications.map((a) => a.id)
    );
  };

  // Open approval modal
  const openApprovalModal = (application: VoterApplicationWithUser, action: "approve" | "reject") => {
    setApprovalModal({ isOpen: true, application, action });
    setFeedback("");
  };

  // Handle single approval/rejection
  const handleApproval = async () => {
    if (!approvalModal.application || !approvalModal.action) return;

    const application = approvalModal.application;
    const action = approvalModal.action;

    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("voter_registrations")
        .update({
          status: action === "approve" ? "approved" : "rejected",
          reviewed_at: new Date().toISOString(),
          ...(action === "reject" && feedback.trim() ? { rejection_reason: feedback } : {})
        })
        .eq("id", application.id);

      if (error) throw error;

      // If approving, also update user status if needed
      if (action === "approve") {
        await supabase
          .from("users")
          .update({ status: "active" })
          .eq("id", application.user_id);
      }

      alert(`Application ${action === "approve" ? "approved" : "rejected"} successfully!`);

      // Refresh applications
      fetchApplications();
      setApprovalModal({ isOpen: false, application: null, action: null });
      setFeedback("");
      setSelectedApplications(prev => prev.filter(id => id !== application.id));
    } catch (error: any) {
      console.error("Error processing application:", error);
      alert("Failed to process application");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action: "approve" | "reject") => {
    if (selectedApplications.length === 0) {
      alert("Please select at least one application");
      return;
    }

    if (!confirm(`${action === "approve" ? "Approve" : "Reject"} ${selectedApplications.length} application(s)?`)) return;
    
    setIsProcessing(true);
    try {
      const { error } = await supabase
        .from("voter_registrations")
        .update({
          status: action === "approve" ? "approved" : "rejected",
          reviewed_at: new Date().toISOString(),
        })
        .in("id", selectedApplications);

      if (error) throw error;

      // If approving, update user statuses
      if (action === "approve") {
        const appsToApprove = applications.filter(app => selectedApplications.includes(app.id));
        const userIds = appsToApprove.map(app => app.user_id);
        
        await supabase
          .from("users")
          .update({ status: "active" })
          .in("id", userIds);
      }

      alert(`${selectedApplications.length} application(s) ${action === "approve" ? "approved" : "rejected"}!`);
      
      // Refresh and clear selections
      fetchApplications();
      setSelectedApplications([]);
    } catch (error: any) {
      console.error("Error processing bulk action:", error);
      alert("Failed to process applications");
    } finally {
      setIsProcessing(false);
    }
  };

  // Format time ago
  const getTimeAgo = (date: string): string => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Count applications by status
  const pendingCount = applications.filter(app => app.status === "pending").length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading applications...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Approve Voter Registrations
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Review and approve or reject voter registration requests
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">{pendingCount}</p>
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Approved</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{approvedCount}</p>
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Rejected</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">{rejectedCount}</p>
              </div>
            </div>
          </div>

          {/* Selected Applications Banner */}
          {selectedApplications.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {selectedApplications.length} application(s) selected
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handleBulkAction("approve")}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all disabled:opacity-50 text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction("reject")}
                    disabled={isProcessing}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 text-sm"
                  >
                    <Ban className="w-4 h-4" />
                    Reject Selected
                  </button>
                  <button
                    onClick={() => setSelectedApplications([])}
                    className="px-3 sm:px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <Award className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-9 sm:pl-12 pr-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Select All */}
          {filteredApplications.length > 0 && (
            <div className="flex items-center gap-3 px-3 sm:px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <input
                type="checkbox"
                checked={selectedApplications.length === filteredApplications.length}
                onChange={handleSelectAll}
                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Select All ({filteredApplications.length})
              </span>
            </div>
          )}

          {/* Applications List */}
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 sm:py-16 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800">
              <UserCheck className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                No applications found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredApplications.map((app) => {
                const displayName = app.voter_name || app.user?.full_name || "Unknown";
                const displayEmail = app.voter_email || app.user?.email || "No email";
                const displayPhone = app.voter_phone || "No phone";
                const displayDept = app.voter_department || app.user?.department || "Unknown";
                const displayId = app.student_id || app.user?.member_id || "No ID";
                const displayOrg = app.organization || app.user?.organization || "Unknown";
                const selfieUrl = app.selfie_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName}`;

                return (
                  <div
                    key={app.id}
                    className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <input
                        type="checkbox"
                        checked={selectedApplications.includes(app.id)}
                        onChange={() => handleSelectApplication(app.id)}
                        className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                      />
                      <img
                        src={selfieUrl}
                        alt={displayName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)} flex items-center gap-1`}>
                                {getStatusIcon(app.status)}
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                              </span>
                              <span className="px-2 sm:px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                                {displayOrg}
                              </span>
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 truncate">
                              {displayName}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {displayId} • {displayDept}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {getTimeAgo(app.registered_at)}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">{displayEmail}</span>
                          </div>
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="truncate">{displayPhone}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                          <button
                            onClick={() => setViewDetailsModal(app)}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-xs sm:text-sm"
                          >
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                            View Details
                          </button>
                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() => openApprovalModal(app, "approve")}
                                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-xs sm:text-sm"
                              >
                                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                Approve
                              </button>
                              <button
                                onClick={() => openApprovalModal(app, "reject")}
                                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all text-xs sm:text-sm"
                              >
                                <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Approval Modal */}
          {approvalModal.isOpen && approvalModal.application && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="text-center mb-4 sm:mb-6">
                  <div
                    className={`inline-flex p-2 sm:p-3 rounded-full mb-3 sm:mb-4 ${
                      approvalModal.action === "approve"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    {approvalModal.action === "approve" ? (
                      <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 dark:text-green-400" />
                    ) : (
                      <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {approvalModal.action === "approve" ? "Approve" : "Reject"} Application?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    {approvalModal.application.voter_name || approvalModal.application.user?.full_name}
                  </p>
                </div>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Feedback {approvalModal.action === "reject" && "(Required)"}
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={
                      approvalModal.action === "approve"
                        ? "Optional: Add a welcome message..."
                        : "Required: Provide a reason for rejection..."
                    }
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm sm:text-base"
                  />
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() => setApprovalModal({ isOpen: false, application: null, action: null })}
                    disabled={isProcessing}
                    className="flex-1 px-3 sm:px-4 py-2.5 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApproval}
                    disabled={
                      isProcessing ||
                      (approvalModal.action === "reject" && !feedback.trim())
                    }
                    className={`flex-1 px-3 sm:px-4 py-2.5 rounded-lg sm:rounded-xl font-semibold transition-all disabled:opacity-50 text-sm sm:text-base ${
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

          {/* View Details Modal */}
          {viewDetailsModal && (
            <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-0 sm:p-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-none sm:rounded-2xl p-4 sm:p-6 max-w-2xl w-full min-h-screen sm:min-h-0 sm:max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={viewDetailsModal.selfie_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${viewDetailsModal.voter_name}`}
                      alt={viewDetailsModal.voter_name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                    <div>
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {viewDetailsModal.voter_name || viewDetailsModal.user?.full_name}
                      </h3>
                      <p className={`text-xs sm:text-sm font-bold ${getStatusColor(viewDetailsModal.status)} inline-flex items-center gap-1 px-2 py-1 rounded-full`}>
                        {getStatusIcon(viewDetailsModal.status)}
                        {viewDetailsModal.status.charAt(0).toUpperCase() + viewDetailsModal.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewDetailsModal(null)}
                    className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Student ID</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {viewDetailsModal.student_id || viewDetailsModal.user?.member_id || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                          {viewDetailsModal.voter_email || viewDetailsModal.user?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Phone</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {viewDetailsModal.voter_phone || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Organization</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {viewDetailsModal.organization || viewDetailsModal.user?.organization || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Department</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {viewDetailsModal.voter_department || viewDetailsModal.user?.department || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Level</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {viewDetailsModal.voter_level || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Registered</p>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {new Date(viewDetailsModal.registered_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {viewDetailsModal.reviewed_at && (
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Reviewed</p>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                            {new Date(viewDetailsModal.reviewed_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                      Selfie Verification
                    </h4>
                    <img
                      src={viewDetailsModal.selfie_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${viewDetailsModal.voter_name}`}
                      alt={`${viewDetailsModal.voter_name}'s selfie`}
                      className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-300 dark:border-gray-700"
                    />
                  </div>
                </div>
                {viewDetailsModal.status === "pending" && (
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => {
                        openApprovalModal(viewDetailsModal, "reject");
                        setViewDetailsModal(null);
                      }}
                      className="flex-1 px-3 sm:px-4 py-2.5 bg-red-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        openApprovalModal(viewDetailsModal, "approve");
                        setViewDetailsModal(null);
                      }}
                      className="flex-1 px-3 sm:px-4 py-2.5 bg-green-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApproveVoters;