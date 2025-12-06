import React, { useState } from "react";
import {
  UserCheck,
  X,
  CheckCircle2,
  Eye,
  Search,
  Filter,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Hash,
  Clock,
  Ban,
  Image,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

// ===== TYPE DEFINITIONS =====
interface Voter {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  memberId: string;
  organization: string;
  department: string;
  position?: string;
  userType: "voter" | "admin";
  selfieUrl: string;
  registeredAt: string;
}

interface ApprovalModal {
  isOpen: boolean;
  voter: Voter | null;
  action: "approve" | "reject" | null;
}

const ApproveVoters: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterUserType, setFilterUserType] = useState<
    "all" | "voter" | "admin"
  >("all");
  const [selectedVoters, setSelectedVoters] = useState<string[]>([]);
  const [approvalModal, setApprovalModal] = useState<ApprovalModal>({
    isOpen: false,
    voter: null,
    action: null,
  });
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState<Voter | null>(null);

  // ===== MOCK DATA =====
  const voters: Voter[] = [
    {
      id: "1",
      fullName: "Adebayo Johnson",
      email: "adebayo.johnson@student.edu",
      phone: "+234 803 123 4567",
      memberId: "2021/CS/056",
      organization: "University of Lagos",
      department: "Computer Science",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo",
      registeredAt: "2024-11-15T10:30:00",
    },
    {
      id: "2",
      fullName: "Fatima Abdullahi",
      email: "fatima.abdullahi@student.edu",
      phone: "+234 805 234 5678",
      memberId: "2020/ENG/089",
      organization: "University of Lagos",
      department: "Engineering",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      registeredAt: "2024-11-15T11:15:00",
    },
    {
      id: "3",
      fullName: "Chukwuemeka Obi",
      email: "chukwuemeka.obi@student.edu",
      phone: "+234 807 345 6789",
      memberId: "2022/MED/112",
      organization: "University of Lagos",
      department: "Medicine",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chukwuemeka",
      registeredAt: "2024-11-15T12:00:00",
    },
    {
      id: "4",
      fullName: "Ngozi Okeke",
      email: "ngozi.okeke@staff.edu",
      phone: "+234 809 456 7890",
      memberId: "STAFF-2019-045",
      organization: "University of Lagos",
      department: "Administration",
      position: "Electoral Officer",
      userType: "admin",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi",
      registeredAt: "2024-11-15T13:30:00",
    },
    {
      id: "5",
      fullName: "Ibrahim Musa",
      email: "ibrahim.musa@student.edu",
      phone: "+234 806 567 8901",
      memberId: "2021/LAW/078",
      organization: "University of Lagos",
      department: "Law",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim",
      registeredAt: "2024-11-15T14:00:00",
    },
    {
      id: "6",
      fullName: "Blessing Eze",
      email: "blessing.eze@student.edu",
      phone: "+234 808 678 9012",
      memberId: "2020/BIO/134",
      organization: "University of Lagos",
      department: "Biology",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing",
      registeredAt: "2024-11-15T14:45:00",
    },
    {
      id: "7",
      fullName: "Mohammed Bello",
      email: "mohammed.bello@student.edu",
      phone: "+234 802 789 0123",
      memberId: "2022/ENG/201",
      organization: "University of Lagos",
      department: "Engineering",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
      registeredAt: "2024-11-15T15:20:00",
    },
    {
      id: "8",
      fullName: "Chinwe Nwankwo",
      email: "chinwe.nwankwo@student.edu",
      phone: "+234 804 890 1234",
      memberId: "2021/BUS/145",
      organization: "University of Lagos",
      department: "Business Administration",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinwe",
      registeredAt: "2024-11-15T16:00:00",
    },
    {
      id: "9",
      fullName: "Yusuf Aliyu",
      email: "yusuf.aliyu@student.edu",
      phone: "+234 807 901 2345",
      memberId: "2020/CS/198",
      organization: "University of Lagos",
      department: "Computer Science",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yusuf",
      registeredAt: "2024-11-15T16:30:00",
    },
    {
      id: "10",
      fullName: "Amaka Okafor",
      email: "amaka.okafor@student.edu",
      phone: "+234 809 012 3456",
      memberId: "2021/MED/089",
      organization: "University of Lagos",
      department: "Medicine",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amaka",
      registeredAt: "2024-11-15T17:00:00",
    },
    {
      id: "11",
      fullName: "Tunde Adeyemi",
      email: "tunde.adeyemi@student.edu",
      phone: "+234 806 123 4567",
      memberId: "2022/LAW/056",
      organization: "University of Lagos",
      department: "Law",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde",
      registeredAt: "2024-11-15T17:45:00",
    },
    {
      id: "12",
      fullName: "Kemi Oluwaseun",
      email: "kemi.oluwaseun@staff.edu",
      phone: "+234 805 234 5678",
      memberId: "STAFF-2020-112",
      organization: "University of Lagos",
      department: "Student Affairs",
      position: "Assistant Director",
      userType: "voter",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kemi",
      registeredAt: "2024-11-15T18:00:00",
    },
  ];

  const departments = Array.from(new Set(voters.map((v) => v.department)));

  const filteredVoters = voters.filter((voter) => {
    const matchesSearch =
      voter.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || voter.department === filterDepartment;
    const matchesUserType =
      filterUserType === "all" || voter.userType === filterUserType;
    return matchesSearch && matchesDepartment && matchesUserType;
  });

  const handleSelectVoter = (voterId: string) => {
    setSelectedVoters((prev) =>
      prev.includes(voterId)
        ? prev.filter((id) => id !== voterId)
        : [...prev, voterId]
    );
  };

  const handleSelectAll = () => {
    setSelectedVoters(
      selectedVoters.length === filteredVoters.length
        ? []
        : filteredVoters.map((v) => v.id)
    );
  };

  const openApprovalModal = (voter: Voter, action: "approve" | "reject") => {
    setApprovalModal({ isOpen: true, voter, action });
    setFeedback("");
  };

  const handleApproval = async () => {
    if (!approvalModal.voter) return;
    setIsProcessing(true);
    try {
      console.log(`${approvalModal.action} voter:`, approvalModal.voter.id);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Voter ${approvalModal.action}d successfully!`);
      setApprovalModal({ isOpen: false, voter: null, action: null });
      setFeedback("");
    } catch (error) {
      alert("Failed to process");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkAction = async (action: "approve" | "reject") => {
    if (selectedVoters.length === 0)
      return alert("Please select at least one voter");
    if (!confirm(`${action} ${selectedVoters.length} voter(s)?`)) return;
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`${selectedVoters.length} voter(s) ${action}d!`);
      setSelectedVoters([]);
    } catch (error) {
      alert("Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const getTimeAgo = (date: string): string => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffMins < 60) return `${diffMins} mins ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Approve Voter Registrations
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Review and approve or reject voter registration requests
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pending
                </p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {voters.length}
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selected
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedVoters.length}
                </p>
              </div>
            </div>
          </div>

          {selectedVoters.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {selectedVoters.length} voter(s) selected
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
                    onClick={() => setSelectedVoters([])}
                    className="px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search voters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
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
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterUserType}
                onChange={(e) => setFilterUserType(e.target.value as any)}
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="voter">Voters</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>

          {filteredVoters.length > 0 && (
            <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <input
                type="checkbox"
                checked={selectedVoters.length === filteredVoters.length}
                onChange={handleSelectAll}
                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Select All ({filteredVoters.length})
              </span>
            </div>
          )}

          {filteredVoters.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <UserCheck className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No voters found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVoters.map((voter) => (
                <div
                  key={voter.id}
                  className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedVoters.includes(voter.id)}
                      onChange={() => handleSelectVoter(voter.id)}
                      className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <img
                      src={voter.selfieUrl}
                      alt={voter.fullName}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {voter.fullName}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {voter.memberId} • {voter.department}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                voter.userType === "admin"
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                                  : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                              }`}
                            >
                              {voter.userType === "admin" ? "Admin" : "Voter"}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                              {voter.organization}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          {getTimeAgo(voter.registeredAt)}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{voter.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>{voter.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <button
                          onClick={() => setViewDetailsModal(voter)}
                          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => openApprovalModal(voter, "approve")}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => openApprovalModal(voter, "reject")}
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

          {approvalModal.isOpen && approvalModal.voter && (
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
                    Voter?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {approvalModal.voter.fullName} •{" "}
                    {approvalModal.voter.memberId}
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Feedback {approvalModal.action === "reject" && "(Required)"}
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={
                      approvalModal.action === "approve"
                        ? "Optional: Add a welcome message..."
                        : "Required: Provide a reason..."
                    }
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      setApprovalModal({
                        isOpen: false,
                        voter: null,
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

          {viewDetailsModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={viewDetailsModal.selfieUrl}
                      alt={viewDetailsModal.fullName}
                      className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {viewDetailsModal.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {viewDetailsModal.userType === "admin"
                          ? "Admin User"
                          : "Voter"}
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
                <div className="space-y-4 mb-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
                          Organization
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {viewDetailsModal.organization}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Building className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Department
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {viewDetailsModal.department}
                        </p>
                      </div>
                    </div>
                    {viewDetailsModal.position && (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Position
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {viewDetailsModal.position}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Registered
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(
                            viewDetailsModal.registeredAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${
                      viewDetailsModal.userType === "admin"
                        ? "bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
                        : "bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800"
                    }`}
                  >
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                      User Type
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {viewDetailsModal.userType === "admin"
                        ? "This user has administrative privileges and can manage elections and voter registrations."
                        : "This user is registered as a voter and can participate in elections."}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Selfie Verification
                    </h4>
                    <img
                      src={viewDetailsModal.selfieUrl}
                      alt={`${viewDetailsModal.fullName}'s selfie`}
                      className="w-full max-w-xs mx-auto rounded-lg border-2 border-gray-300 dark:border-gray-700"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      openApprovalModal(viewDetailsModal, "reject");
                      setViewDetailsModal(null);
                    }}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      openApprovalModal(viewDetailsModal, "approve");
                      setViewDetailsModal(null);
                    }}
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApproveVoters;
