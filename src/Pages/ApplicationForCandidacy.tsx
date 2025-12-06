import React, { useState, useEffect } from "react";
import {
  Vote,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Upload,
  Send,
  CheckCircle2,
  XCircle,
  Search,
  Award,
  X,
  Loader,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useElections } from "../Context/ElectionContext";
import { supabase } from "../lib/supabase";
// import { useNavigate } from "react-router-dom";

interface Position {
  title: string;
  description: string;
}

interface Application {
  id: string;
  election_id: string;
  election_title: string;
  position_title: string;
  manifesto: string;
  campaign_promises: string;
  profile_image_url: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  applied_at: string;
}

const ApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const { elections, loading: electionsLoading } = useElections();
  // const navigate = useNavigate();
  // console.log("Elections from context:", elections);
  // console.log("Elections loading:", electionsLoading);
  // console.log("User:", user);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    manifesto: "",
    campaign_promises: "",
    profile_image_url: "",
  });

  // Fetch user's applications
  useEffect(() => {
    if (user?.uid) fetchMyApplications();
  }, [user]);

  const fetchMyApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", user?.uid)
        .order("applied_at", { ascending: false });

      if (error) throw error;

      const applicationsWithTitles = data?.map((app: any) => {
        const election = elections.find((e) => e.id === app.election_id);
        return {
          ...app,
          election_title: election?.title || "Unknown Election",
        };
      });

      setMyApplications(applicationsWithTitles || []);
    } catch (error: any) {
      console.error("Error fetching applications:", error);
    }
  };

  // Filter elections open for applications
  const now = new Date();

const openElections = elections.filter((election) => {
  const appStart = new Date(election.application_start_date);
  const appEnd = new Date(election.application_end_date);
  const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase());
  return now >= appStart && now <= appEnd && matchesSearch;
});

const upcomingElections = elections
    .filter((election) => {
      const appStart = new Date(election.application_start_date);
      const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase());
      return now < appStart && matchesSearch;
    })
    .sort((a, b) => new Date(a.application_start_date).getTime() - new Date(b.application_start_date).getTime());

  const combinedElections = [
    ...openElections.map(election => ({ election, status: 'open' })),
    ...upcomingElections.map(election => ({ election, status: 'upcoming' }))
  ];


  const handleOpenModal = (election: any, position: Position) => {
    setSelectedElection(election);
    setSelectedPosition(position);
    setFormData({ manifesto: "", campaign_promises: "", profile_image_url: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedElection(null);
    setSelectedPosition(null);
    setFormData({ manifesto: "", campaign_promises: "", profile_image_url: "" });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.uid}-${Date.now()}.${fileExt}`;
      const filePath = `candidate-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("candidate-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("candidate-images")
        .getPublicUrl(filePath);

      setFormData({ ...formData, profile_image_url: urlData.publicUrl });
    } catch (error: any) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.manifesto.trim()) {
      alert("Please write your manifesto");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("applications").insert([
        {
          election_id: selectedElection.id,
          position_title: selectedPosition?.title,
          user_id: user?.uid,
          applicant_name: user?.fullName,
          applicant_email: user?.email,
          applicant_phone: "",
          applicant_department: user?.department || "",
          applicant_level: "",
          manifesto: formData.manifesto,
          campaign_promises: formData.campaign_promises,
          profile_image_url: formData.profile_image_url || user?.selfieUrl || "",
          status: "pending",
        },
      ]);

      if (error) throw error;

      alert("Application submitted successfully! Await approval from the electoral officer.");
      handleCloseModal();
      fetchMyApplications();
    } catch (error: any) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "rejected":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      default:
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5" />;
      case "rejected":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  if (electionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Elections & Applications
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Apply for available positions in upcoming elections
          </p>
        </div>

        {/* My Applications */}
        {myApplications.length > 0 && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              My Applications ({myApplications.length})
            </h2>
            <div className="space-y-3">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {app.position_title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {app.election_title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Applied {new Date(app.applied_at).toLocaleDateString()}
                    </p>
                    {app.status === "rejected" && app.rejection_reason && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                        Reason: {app.rejection_reason}
                      </p>
                    )}
                  </div>
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {getStatusIcon(app.status)}
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search elections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Elections Grid */}
        {combinedElections.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Vote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Elections Available for Application
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back later for upcoming elections.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
  {combinedElections.map(({ election, status }, index) => {
    const appEndDate = new Date(election.application_end_date);
    const daysLeft = Math.ceil(
      (appEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
      <div
        key={election.id || index}
        className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Gradient Border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300 pointer-events-none" />

        {/* Status Banner */}
        <div className={`
          px-4 py-2
          ${status === 'open' ? 'bg-gradient-to-r from-orange-500 to-red-500' : ''}
          ${status === 'upcoming' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
          ${status === 'completed' ? 'bg-gray-500' : ''}
        `}>
          <div className="flex items-center justify-between text-white text-sm font-semibold">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-white ${status === 'open' ? 'animate-pulse' : ''}`} />
              <span>
                {status === 'open' && 'Open Now'}
                {status === 'upcoming' && 'Coming Soon'}
                {status === 'completed' && 'Ended'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="text-xs">{status === 'open' ? `${daysLeft} days left` : ''} </span>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {election.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {election.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{election.positions?.length}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Positions</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {status === 'upcoming' ? 'TBA' : (election.voters / 1000).toFixed(1) + 'K'}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Voters</p>
            </div>
          </div>

          {/* Positions */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Available Positions:</h4>
            {!election.positions || election.positions.length === 0 ? (
              <p className="text-sm text-gray-500">No positions available</p>
            ) : (
            <div className="grid grid-cols-1 gap-3">

{election.positions.map((position: Position, index: number) => {
  const applied = myApplications.some(
    (app) =>
      app.election_id === election.id &&
      app.position_title === position.title  // ✅ Correct property
  );

  return (
    <button
      key={`${election.id}-${position.title}-${index}`}  // ✅ Changed from position.name
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!applied && status === 'open') {
          handleOpenModal(election, position);
        }
      }}
      disabled={applied || status !== 'open'}  // ✅ Disable if applied OR not open
      className={`
        w-full flex items-center justify-between p-4 border rounded-xl transition-all group
        ${applied || status !== 'open' ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 hover:shadow-lg cursor-pointer'}
      `}
    >
      <div className="text-left">
        <p className={`font-bold text-gray-900 dark:text-white ${status === 'open' && !applied ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' : ''}`}>
          {position.title}
        </p>
        {position.description && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {position.description}
          </p>
        )}
      </div>
      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
    </button>
  );
})}
            </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-4">
            {status === 'open' && (
              <div className="text-center py-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                 <Award className="w-5 h-5 inline-block mr-2" /> Apply Now
                </p>
              </div>
            )}
            {status === 'upcoming' && (
              <button
                disabled
                className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 cursor-not-allowed"
              >
                <Clock className="w-5 h-5" />
                Applications Coming Soon
              </button>
            )}
          </div>
        </div>
      </div>
    );
  })}
</div>)}


        {/* Application Modal */}
        {isModalOpen && selectedElection && selectedPosition && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto hide-scrollbar">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Apply for {selectedPosition.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedElection.title}
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Applicant Info */}
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Your Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {user?.fullName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {user?.department}
                      </span>
                    </div>
                    <div className="flex.
                    
                     items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400"></span>
                    </div>
                  </div>
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Profile Photo (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.profile_image_url && (
                      <img
                        src={formData.profile_image_url}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                    )}
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
                      <Upload className="w-5 h-5" />
                      {uploadingImage ? "Uploading..." : "Upload Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>

                {/* Manifesto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Manifesto *
                  </label>
                  <textarea
                    value={formData.manifesto}
                    onChange={(e) =>
                      setFormData({ ...formData, manifesto: e.target.value })
                    }
                    rows={6}
                    placeholder="Why should students vote for you? What are your goals and vision..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                {/* Campaign Promises */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Campaign Promises (Optional)
                  </label>
                  <textarea
                    value={formData.campaign_promises}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        campaign_promises: e.target.value,
                      })
                    }
                    rows={4}
                    placeholder="What specific promises or commitments are you making..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.manifesto.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsPage;