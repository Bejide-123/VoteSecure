import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  Building,
  Hash,
  UserCheck,
  UserX,
  Eye,
  X,
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Trash2,
  Edit,
  Ban,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

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
  status: "active" | "suspended" | "pending";
  selfieUrl: string;
  registeredAt: string;
  hasVoted?: boolean;
}

const AllVoters: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterUserType, setFilterUserType] = useState<
    "all" | "voter" | "admin"
  >("all");
  const [viewDetailsModal, setViewDetailsModal] = useState<Voter | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

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
      status: "active",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo",
      registeredAt: "2024-11-15T10:30:00",
      hasVoted: true,
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
      status: "active",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      registeredAt: "2024-11-15T11:15:00",
      hasVoted: false,
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
      status: "suspended",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chukwuemeka",
      registeredAt: "2024-11-15T12:00:00",
      hasVoted: false,
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
      status: "active",
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
      status: "active",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim",
      registeredAt: "2024-11-15T14:00:00",
      hasVoted: true,
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
      status: "active",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing",
      registeredAt: "2024-11-15T14:45:00",
      hasVoted: true,
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
      status: "active",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
      registeredAt: "2024-11-15T15:20:00",
      hasVoted: false,
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
      status: "active",
      selfieUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinwe",
      registeredAt: "2024-11-15T16:00:00",
      hasVoted: false,
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
    const matchesStatus =
      filterStatus === "all" || voter.status === filterStatus;
    const matchesUserType =
      filterUserType === "all" || voter.userType === filterUserType;
    return (
      matchesSearch && matchesDepartment && matchesStatus && matchesUserType
    );
  });

  const stats = {
    total: voters.length,
    active: voters.filter((v) => v.status === "active").length,
    suspended: voters.filter((v) => v.status === "suspended").length,
    admins: voters.filter((v) => v.userType === "admin").length,
  };

  const handleExport = () => {
    alert("Exporting voters data...");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "suspended":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                All Voters
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and view all registered voters in the system
              </p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              <Download className="w-5 h-5" />
              Export Voters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Total Voters
                </p>
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Active
                </p>
                <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.active}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Suspended
                </p>
                <UserX className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.suspended}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Admins
                </p>
                <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.admins}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
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
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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

          {filteredVoters.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
              <Users className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No voters found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Voter
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Member ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Voted
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredVoters.map((voter) => (
                      <tr
                        key={voter.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img
                              src={voter.selfieUrl}
                              alt={voter.fullName}
                              className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {voter.fullName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {voter.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-mono text-gray-900 dark:text-white">
                            {voter.memberId}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {voter.department}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {voter.phone}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              voter.userType === "admin"
                                ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
                                : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            }`}
                          >
                            {voter.userType === "admin" ? "Admin" : "Voter"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
                              voter.status
                            )}`}
                          >
                            {voter.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {voter.hasVoted !== undefined &&
                            (voter.hasVoted ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-gray-400" />
                            ))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setViewDetailsModal(voter)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setActionMenuOpen(
                                    actionMenuOpen === voter.id
                                      ? null
                                      : voter.id
                                  )
                                }
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              </button>
                              {actionMenuOpen === voter.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-10">
                                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 rounded-t-xl">
                                    <Edit className="w-4 h-4" />
                                    Edit Voter
                                  </button>
                                  <button className="w-full px-4 py-2 text-left text-sm text-orange-700 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                                    <Ban className="w-4 h-4" />
                                    Suspend Voter
                                  </button>
                                  <button className="w-full px-4 py-2 text-left text-sm text-red-700 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 rounded-b-xl">
                                    <Trash2 className="w-4 h-4" />
                                    Delete Voter
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewDetailsModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full my-8">
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
                <div className="space-y-4">
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
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Registered
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(
                            viewDetailsModal.registeredAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`p-4 rounded-xl ${getStatusColor(
                      viewDetailsModal.status
                    )} border`}
                  >
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      {viewDetailsModal.status === "active" && (
                        <CheckCircle2 className="w-5 h-5" />
                      )}
                      {viewDetailsModal.status === "suspended" && (
                        <Ban className="w-5 h-5" />
                      )}
                      Status:{" "}
                      <span className="capitalize">
                        {viewDetailsModal.status}
                      </span>
                    </h4>
                    <p className="text-sm">
                      {viewDetailsModal.status === "active" &&
                        "This voter account is active and can participate in elections."}
                      {viewDetailsModal.status === "suspended" &&
                        "This voter account has been suspended and cannot participate in elections."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllVoters;
