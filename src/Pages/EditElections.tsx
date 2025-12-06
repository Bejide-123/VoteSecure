import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Info,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Plus,
  Trash2,
  AlertCircle,
  Save,
  Sparkles,
  Loader2,
} from "lucide-react";
import AdminLayout from "./AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

// ===== TYPE DEFINITIONS =====
interface Position {
  id: string;
  title: string;
  description: string;
  maxCandidates?: number;
}

interface ElectionFormData {
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
  status: "active" | "completed" | "archived";
}

interface FormErrors {
  [key: string]: string;
}

const EditElection: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ElectionFormData>({
    title: "",
    description: "",
    election_type: "general",
    organization: "",
    application_start_date: "",
    application_end_date: "",
    registration_start_date: "",
    registration_end_date: "",
    voting_start_date: "",
    voting_end_date: "",
    allow_voice_voting: false,
    require_face_verification: true,
    send_email_notifications: true,
    send_sms_notifications: false,
    show_live_results: false,
    positions: [],
    status: "active",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const totalSteps = 5;

  useEffect(() => {
    if (id) {
      loadElectionData();
    }
  }, [id]);

  const loadElectionData = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("elections")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      if (data) {
        // Format dates for datetime-local input
        const formattedData = { ...data };
        const dateFields = [
          "application_start_date",
          "application_end_date",
          "registration_start_date",
          "registration_end_date",
          "voting_start_date",
          "voting_end_date",
        ];
        dateFields.forEach((field) => {
          if (formattedData[field]) {
            formattedData[field] = new Date(formattedData[field])
              .toISOString()
              .slice(0, 16);
          }
        });
        setFormData(formattedData);
      }
    } catch (error) {
      console.error("Error loading election:", error);
      alert("Failed to load election data");
      navigate("/admin/elections/ongoing");
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: <Info className="w-4 h-4" /> },
    { number: 2, title: "Timeline", icon: <Calendar className="w-4 h-4" /> },
    { number: 3, title: "Positions", icon: <Plus className="w-4 h-4" /> },
    { number: 4, title: "Settings", icon: <CheckCircle2 className="w-4 h-4" /> },
    { number: 5, title: "Review", icon: <Sparkles className="w-4 h-4" /> },
  ];

  // ===== VALIDATION =====
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Election title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (!formData.organization.trim()) newErrors.organization = "Organization is required";
    }

    if (step === 2) {
      if (!formData.application_start_date) newErrors.application_start_date = "Required";
      if (!formData.application_end_date) newErrors.application_end_date = "Required";
      if (!formData.registration_start_date) newErrors.registration_start_date = "Required";
      if (!formData.registration_end_date) newErrors.registration_end_date = "Required";
      if (!formData.voting_start_date) newErrors.voting_start_date = "Required";
      if (!formData.voting_end_date) newErrors.voting_end_date = "Required";

      if (formData.application_end_date < formData.application_start_date) {
        newErrors.application_end_date = "Must be after start date";
      }
      if (formData.registration_start_date < formData.application_end_date) {
        newErrors.registration_start_date = "Must be after application ends";
      }
      if (formData.registration_end_date < formData.registration_start_date) {
        newErrors.registration_end_date = "Must be after start date";
      }
      if (formData.voting_start_date < formData.registration_end_date) {
        newErrors.voting_start_date = "Must be after registration ends";
      }
      if (formData.voting_end_date < formData.voting_start_date) {
        newErrors.voting_end_date = "Must be after voting starts";
      }
    }

    if (step === 3) {
      if (formData.positions.length === 0) {
        newErrors.positions = "Add at least one position";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== HANDLERS =====
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddPosition = () => {
    const newPosition: Position = {
      id: Date.now().toString(),
      title: "",
      description: "",
      maxCandidates: undefined,
    };
    setFormData((prev) => ({
      ...prev,
      positions: [...prev.positions, newPosition],
    }));
  };

  const handleRemovePosition = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.filter((p) => p.id !== id),
    }));
  };

  const handlePositionChange = (id: string, field: keyof Position, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      positions: prev.positions.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const handleUpdate = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
        alert("Please fix all errors before saving.");
        return;
    };

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("elections")
        .update({
          title: formData.title,
          description: formData.description,
          election_type: formData.election_type,
          organization: formData.organization,
          application_start_date: formData.application_start_date,
          application_end_date: formData.application_end_date,
          registration_start_date: formData.registration_start_date,
          registration_end_date: formData.registration_end_date,
          voting_start_date: formData.voting_start_date,
          voting_end_date: formData.voting_end_date,
          allow_voice_voting: formData.allow_voice_voting,
          require_face_verification: formData.require_face_verification,
          send_email_notifications: formData.send_email_notifications,
          send_sms_notifications: formData.send_sms_notifications,
          show_live_results: formData.show_live_results,
          positions: formData.positions,
        })
        .eq("id", id);

      if (error) throw error;

      alert("Election updated successfully!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Error updating election:", error);
      alert("Failed to update election: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ===== RENDER FUNCTIONS =====
  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Election Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g., Student Union Elections 2024"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.title ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          placeholder="Describe what this election is about..."
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Organization *
        </label>
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          placeholder="e.g., University of Lagos"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.organization ? "border-red-500" : "border-gray-300 dark:border-gray-700"
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        {errors.organization && (
          <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.organization}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Election Type *
        </label>
        <select
          name="election_type"
          value={formData.election_type}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
        >
          <option value="general">General (Entire School)</option>
          <option value="departmental">Departmental</option>
          <option value="faculty">Faculty</option>
          <option value="club">Club/Society</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Candidate Application Period
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              type="datetime-local"
              name="application_start_date"
              value={formData.application_start_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.application_start_date ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.application_start_date && (
              <p className="mt-1 text-sm text-red-500">{errors.application_start_date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              End Date *
            </label>
            <input
              type="datetime-local"
              name="application_end_date"
              value={formData.application_end_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.application_end_date ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.application_end_date && (
              <p className="mt-1 text-sm text-red-500">{errors.application_end_date}</p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Voter Registration Period
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              type="datetime-local"
              name="registration_start_date"
              value={formData.registration_start_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.registration_start_date ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.registration_start_date && (
              <p className="mt-1 text-sm text-red-500">{errors.registration_start_date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              End Date *
            </label>
            <input
              type="datetime-local"
              name="registration_end_date"
              value={formData.registration_end_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.registration_end_date ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.registration_end_date && (
              <p className="mt-1 text-sm text-red-500">{errors.registration_end_date}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
          Voting Period
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Start Date *
            </label>
            <input
              type="datetime-local"
              name="voting_start_date"
              value={formData.voting_start_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.voting_start_date ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.voting_start_date && (
              <p className="mt-1 text-sm text-red-500">{errors.voting_start_date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              End Date *
            </label>
            <input
              type="datetime-local"
              name="voting_end_date"
              value={formData.voting_end_date}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 rounded-xl border ${
                errors.voting_end_date ? "border-red-500" : "border-gray-300 dark:border-gray-700"
              } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            {errors.voting_end_date && (
              <p className="mt-1 text-sm text-red-500">{errors.voting_end_date}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Election Positions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add the positions voters will elect (President, VP, etc.)
          </p>
        </div>
        <button
          onClick={handleAddPosition}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Position
        </button>
      </div>

      {errors.positions && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-2 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p>{errors.positions}</p>
        </div>
      )}

      <div className="space-y-4">
        {formData.positions.map((position, index) => (
          <div key={position.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-start justify-between mb-4">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Position #{index + 1}</span>
              <button onClick={() => handleRemovePosition(position.id)} className="text-red-500 hover:text-red-700 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Position Title</label>
                <input
                  type="text"
                  value={position.title}
                  onChange={(e) => handlePositionChange(position.id, "title", e.target.value)}
                  placeholder="e.g., President"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <input
                  type="text"
                  value={position.description}
                  onChange={(e) => handlePositionChange(position.id, "description", e.target.value)}
                  placeholder="Brief description of this position"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Max Candidates (Optional)</label>
                <input
                  type="number"
                  value={position.maxCandidates || ""}
                  onChange={(e) => handlePositionChange(position.id, "maxCandidates", parseInt(e.target.value) || 0)}
                  placeholder="Leave empty for unlimited"
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        ))}
        {formData.positions.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No positions added yet. Click "Add Position" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Election Settings</h3>
      <div className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Security Settings</h4>
          <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Require Face Verification</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Voters must verify their face before voting</p>
            </div>
            <input
              type="checkbox"
              name="require_face_verification"
              checked={formData.require_face_verification}
              onChange={handleInputChange}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Accessibility</h4>
          <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Enable Voice Voting</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Allow visually impaired voters to vote using voice commands</p>
            </div>
            <input
              type="checkbox"
              name="allow_voice_voting"
              checked={formData.allow_voice_voting}
              onChange={handleInputChange}
              className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
          </label>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Notifications</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-all">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Send election updates via email</p>
              </div>
              <input
                type="checkbox"
                name="send_email_notifications"
                checked={formData.send_email_notifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-all">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">SMS Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Send SMS reminders (additional cost)</p>
              </div>
              <input
                type="checkbox"
                name="send_sms_notifications"
                checked={formData.send_sms_notifications}
                onChange={handleInputChange}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
            </label>
          </div>
        </div>

        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-xl p-4">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3">Results Display</h4>
          <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:shadow-md transition-all">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Show Live Results</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Display real-time vote counts (visible to all)</p>
            </div>
            <input
              type="checkbox"
              name="show_live_results"
              checked={formData.show_live_results}
              onChange={handleInputChange}
              className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
            />
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex p-4 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review Your Election</h3>
        <p className="text-gray-600 dark:text-gray-400">Please review all details before saving changes</p>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Basic Information</h4>
        <dl className="space-y-3">
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400">Title</dt>
            <dd className="text-lg font-semibold text-gray-900 dark:text-white">{formData.title}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400">Description</dt>
            <dd className="text-gray-900 dark:text-white">{formData.description}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400">Organization</dt>
            <dd className="text-gray-900 dark:text-white">{formData.organization}</dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400">Type</dt>
            <dd className="text-gray-900 dark:text-white capitalize">{formData.election_type}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Timeline</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">Application Period</dt>
            <dd className="text-gray-900 dark:text-white">
              {new Date(formData.application_start_date).toLocaleString()} - {new Date(formData.application_end_date).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">Registration Period</dt>
            <dd className="text-gray-900 dark:text-white">
              {new Date(formData.registration_start_date).toLocaleString()} - {new Date(formData.registration_end_date).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-gray-600 dark:text-gray-400 mb-1">Voting Period</dt>
            <dd className="text-gray-900 dark:text-white">
              {new Date(formData.voting_start_date).toLocaleString()} - {new Date(formData.voting_end_date).toLocaleString()}
            </dd>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Positions ({formData.positions.length})</h4>
        <ul className="space-y-2">
          {formData.positions.map((position) => (
            <li key={position.id} className="flex items-center gap-2 text-gray-900 dark:text-white">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="font-semibold">{position.title}</span>
              {position.description && <span className="text-gray-600 dark:text-gray-400">- {position.description}</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Settings</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.require_face_verification ? "bg-green-500" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-900 dark:text-white">Face Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.allow_voice_voting ? "bg-green-500" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-900 dark:text-white">Voice Voting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.send_email_notifications ? "bg-green-500" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-900 dark:text-white">Email Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.send_sms_notifications ? "bg-green-500" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-900 dark:text-white">SMS Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${formData.show_live_results ? "bg-green-500" : "bg-gray-300"}`} />
            <span className="text-sm text-gray-900 dark:text-white">Live Results</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ===== MAIN RENDER =====
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Edit Election</h1>
          <p className="text-gray-600 dark:text-gray-400">Update the election details below</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      currentStep > step.number
                        ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
                        : currentStep === step.number
                        ? "bg-gradient-to-r from-blue-600 to-green-600 text-white ring-4 ring-blue-200 dark:ring-blue-900"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold mt-2 text-center ${
                      currentStep >= step.number ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                      currentStep > step.number ? "bg-gradient-to-r from-blue-600 to-green-600" : "bg-gray-200 dark:bg-gray-800"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              currentStep === 1
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : "bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-xl hover:scale-105 transition-all"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              disabled={isSaving}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
                isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-xl hover:scale-105"
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditElection;
