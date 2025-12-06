import React, { useState } from "react";
import {
  Award,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Users,
  Shield,
  Copy,
  X,
  CheckCircle2,
  AlertCircle,
  Crown,
  Briefcase,
  FileText,
  DollarSign,
  BookOpen,
  Trophy,
} from "lucide-react";
import AdminLayout from "./AdminLayout";

// ===== TYPE DEFINITIONS =====
interface Position {
  id: string;
  title: string;
  description: string;
  electionTitle: string;
  maxCandidates: number;
  currentCandidates: number;
  requirements: string;
  responsibilities: string;
  isTemplate: boolean;
  icon: string;
  createdAt: string;
}

interface PositionModal {
  isOpen: boolean;
  mode: "create" | "edit";
  position: Position | null;
}

const ManagePositions: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterElection, setFilterElection] = useState<string>("all");
  const [positionModal, setPositionModal] = useState<PositionModal>({
    isOpen: false,
    mode: "create",
    position: null,
  });
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; positionId: string | null }>({
    isOpen: false,
    positionId: null,
  });

  // Form state for create/edit
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    electionTitle: "",
    maxCandidates: 0,
    requirements: "",
    responsibilities: "",
    isTemplate: false,
    icon: "Crown",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // ===== MOCK DATA =====
  const positions: Position[] = [
    {
      id: "1",
      title: "President",
      description: "Lead the student union and represent all students",
      electionTitle: "Student Union Elections 2024",
      maxCandidates: 5,
      currentCandidates: 3,
      requirements: "Must be a 300+ level student with minimum 2.5 GPA",
      responsibilities: "Oversee all union activities, chair meetings, represent students to administration",
      isTemplate: false,
      icon: "Crown",
      createdAt: "2024-11-01T10:00:00",
    },
    {
      id: "2",
      title: "Vice President",
      description: "Assist the President and deputize when necessary",
      electionTitle: "Student Union Elections 2024",
      maxCandidates: 5,
      currentCandidates: 2,
      requirements: "Must be a 200+ level student with minimum 2.3 GPA",
      responsibilities: "Support President, coordinate student activities, manage committees",
      isTemplate: false,
      icon: "Shield",
      createdAt: "2024-11-01T10:15:00",
    },
    {
      id: "3",
      title: "Secretary General",
      description: "Handle all documentation and correspondence",
      electionTitle: "Student Union Elections 2024",
      maxCandidates: 3,
      currentCandidates: 1,
      requirements: "Strong organizational skills, minimum 2.5 GPA",
      responsibilities: "Record minutes, manage documents, handle correspondence",
      isTemplate: false,
      icon: "FileText",
      createdAt: "2024-11-01T10:30:00",
    },
    {
      id: "4",
      title: "Treasurer",
      description: "Manage union finances and budgets",
      electionTitle: "Student Union Elections 2024",
      maxCandidates: 3,
      currentCandidates: 2,
      requirements: "Accounting/Finance background preferred, minimum 2.5 GPA",
      responsibilities: "Budget management, financial reporting, fund allocation",
      isTemplate: false,
      icon: "DollarSign",
      createdAt: "2024-11-01T10:45:00",
    },
    {
      id: "5",
      title: "Sports Director",
      description: "Oversee all sports and athletic activities",
      electionTitle: "Sports Council Elections",
      maxCandidates: 4,
      currentCandidates: 1,
      requirements: "Active participation in sports, minimum 2.0 GPA",
      responsibilities: "Organize sports events, manage facilities, coordinate teams",
      isTemplate: false,
      icon: "Trophy",
      createdAt: "2024-11-05T14:20:00",
    },
    {
      id: "6",
      title: "Academic Officer",
      description: "Address academic concerns and organize study programs",
      electionTitle: "Student Union Elections 2024",
      maxCandidates: 3,
      currentCandidates: 0,
      requirements: "Excellent academic standing, minimum 3.0 GPA",
      responsibilities: "Academic advocacy, study sessions, exam coordination",
      isTemplate: false,
      icon: "BookOpen",
      createdAt: "2024-11-01T11:00:00",
    },
    {
      id: "7",
      title: "Class Representative",
      description: "TEMPLATE - Represent class interests",
      electionTitle: "Template Positions",
      maxCandidates: 2,
      currentCandidates: 0,
      requirements: "Member of the class, good standing",
      responsibilities: "Voice class concerns, coordinate with department",
      isTemplate: true,
      icon: "Users",
      createdAt: "2024-10-15T09:00:00",
    },
  ];

  // Get unique elections
  const elections = Array.from(
    new Set(positions.filter((p) => !p.isTemplate).map((p) => p.electionTitle))
  );

  // ===== FILTER POSITIONS =====
  const filteredPositions = positions.filter((position) => {
    const matchesSearch =
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesElection =
      filterElection === "all" ||
      filterElection === "templates"
        ? position.isTemplate
        : position.electionTitle === filterElection;

    return matchesSearch && matchesElection;
  });

  // ===== ICON MAPPING =====
  const iconMap: { [key: string]: React.ReactNode } = {
    Crown: <Crown className="w-6 h-6" />,
    Shield: <Shield className="w-6 h-6" />,
    Trophy: <Trophy className="w-6 h-6" />,
    FileText: <FileText className="w-6 h-6" />,
    DollarSign: <DollarSign className="w-6 h-6" />,
    BookOpen: <BookOpen className="w-6 h-6" />,
    Users: <Users className="w-6 h-6" />,
    Briefcase: <Briefcase className="w-6 h-6" />,
  };

  // ===== OPEN CREATE MODAL =====
  const openCreateModal = () => {
    setFormData({
      title: "",
      description: "",
      electionTitle: elections[0] || "",
      maxCandidates: 5,
      requirements: "",
      responsibilities: "",
      isTemplate: false,
      icon: "Crown",
    });
    setFormErrors({});
    setPositionModal({ isOpen: true, mode: "create", position: null });
  };

  // ===== OPEN EDIT MODAL =====
  const openEditModal = (position: Position) => {
    setFormData({
      title: position.title,
      description: position.description,
      electionTitle: position.electionTitle,
      maxCandidates: position.maxCandidates,
      requirements: position.requirements,
      responsibilities: position.responsibilities,
      isTemplate: position.isTemplate,
      icon: position.icon,
    });
    setFormErrors({});
    setPositionModal({ isOpen: true, mode: "edit", position });
  };

  // ===== VALIDATE FORM =====
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.title.trim()) errors.title = "Position title is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.isTemplate && !formData.electionTitle) errors.electionTitle = "Election is required";
    if (formData.maxCandidates < 1) errors.maxCandidates = "Must allow at least 1 candidate";
    if (!formData.requirements.trim()) errors.requirements = "Requirements are required";
    if (!formData.responsibilities.trim()) errors.responsibilities = "Responsibilities are required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      console.log(
        `${positionModal.mode === "create" ? "Creating" : "Updating"} position:`,
        formData
      );
      // TODO: Save to Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(`Position ${positionModal.mode === "create" ? "created" : "updated"} successfully!`);
      setPositionModal({ isOpen: false, mode: "create", position: null });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save position");
    }
  };

  // ===== HANDLE DELETE =====
  const handleDelete = async (positionId: string) => {
    try {
      console.log("Deleting position:", positionId);
      // TODO: Delete from Supabase
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Position deleted successfully!");
      setDeleteModal({ isOpen: false, positionId: null });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to delete position");
    }
  };

  // ===== DUPLICATE POSITION =====
  const handleDuplicate = (position: Position) => {
    setFormData({
      title: `${position.title} (Copy)`,
      description: position.description,
      electionTitle: position.electionTitle,
      maxCandidates: position.maxCandidates,
      requirements: position.requirements,
      responsibilities: position.responsibilities,
      isTemplate: false,
      icon: position.icon,
    });
    setFormErrors({});
    setPositionModal({ isOpen: true, mode: "create", position: null });
  };

  return (
      <AdminLayout>
    <div className="space-y-8">
      {/* ===== PAGE HEADER ===== */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Positions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage election positions for candidates
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Position
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Positions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {positions.filter((p) => !p.isTemplate).length}
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Candidates</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {positions.reduce((sum, p) => sum + p.currentCandidates, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
              <Copy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Templates</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {positions.filter((p) => p.isTemplate).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FILTERS ===== */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search positions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Election Filter */}
        <div className="relative sm:w-64">
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
            <option value="templates">Templates Only</option>
          </select>
        </div>
      </div>

      {/* ===== POSITIONS GRID ===== */}
      {filteredPositions.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No positions found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first position to get started
          </p>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-bold hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Position
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPositions.map((position) => (
            <div
              key={position.id}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl text-white">
                    {iconMap[position.icon] || iconMap.Crown}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {position.title}
                    </h3>
                    {position.isTemplate && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold mt-1">
                        Template
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {position.description}
              </p>

              {/* Election */}
              {!position.isTemplate && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Election
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {position.electionTitle}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Candidates
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    {position.currentCandidates}/{position.maxCandidates}
                  </p>
                </div>

                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Max Limit
                  </p>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {position.maxCandidates}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              {position.currentCandidates > 0 && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-green-600 transition-all"
                      style={{
                        width: `${(position.currentCandidates / position.maxCandidates) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => openEditModal(position)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={() => handleDuplicate(position)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 rounded-lg text-sm font-semibold hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>

                <button
                  onClick={() => setDeleteModal({ isOpen: true, positionId: position.id })}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-950/50 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== CREATE/EDIT MODAL ===== */}
      {positionModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {positionModal.mode === "create" ? "Create New Position" : "Edit Position"}
              </h3>
              <button
                onClick={() => setPositionModal({ isOpen: false, mode: "create", position: null })}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Position Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., President, Vice President"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.title
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                />
                {formErrors.title && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this position"
                  rows={2}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.description
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.description}
                  </p>
                )}
              </div>

              {/* Grid: Icon + Max Candidates + Election */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Icon */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="Crown">👑 Crown</option>
                    <option value="Shield">🛡️ Shield</option>
                    <option value="Trophy">🏆 Trophy</option>
                    <option value="FileText">📄 Document</option>
                    <option value="DollarSign">💰 Money</option>
                    <option value="BookOpen">📖 Book</option>
                    <option value="Users">👥 Users</option>
                    <option value="Briefcase">💼 Briefcase</option>
                  </select>
                </div>

                {/* Max Candidates */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Max Candidates *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxCandidates}
                    onChange={(e) =>
                      setFormData({ ...formData, maxCandidates: parseInt(e.target.value) || 0 })
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.maxCandidates
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                  />
                </div>

                {/* Election */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Election {!formData.isTemplate && "*"}
                  </label>
                  <select
                    value={formData.electionTitle}
                    onChange={(e) => setFormData({ ...formData, electionTitle: e.target.value })}
                    disabled={formData.isTemplate}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      formErrors.electionTitle
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50`}
                  >
                    <option value="">Select election</option>
                    {elections.map((election) => (
                      <option key={election} value={election}>
                        {election}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Requirements *
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="e.g., Minimum 300 level, 2.5 GPA"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.requirements
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                />
                {formErrors.requirements && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.requirements}
                  </p>
                )}
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Responsibilities *
                </label>
                <textarea
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Describe what this position will be responsible for"
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formErrors.responsibilities
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                />
                {formErrors.responsibilities && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {formErrors.responsibilities}
                  </p>
                )}
              </div>

              {/* Template Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl">
                <input
                  type="checkbox"
                  checked={formData.isTemplate}
                  onChange={(e) => setFormData({ ...formData, isTemplate: e.target.checked })}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Save as Template
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Reuse this position across multiple elections
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-200 dark:border-gray-800 mt-6">
              <button
                onClick={() => setPositionModal({ isOpen: false, mode: "create", position: null })}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
              >
                <CheckCircle2 className="w-5 h-5" />
                {positionModal.mode === "create" ? "Create Position" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION MODAL ===== */}
      {deleteModal.isOpen && deleteModal.positionId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Delete Position?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                This will permanently delete this position. Candidates who applied for this
                position will NOT be deleted.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, positionId: null })}
                className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.positionId!)}
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

export default ManagePositions;