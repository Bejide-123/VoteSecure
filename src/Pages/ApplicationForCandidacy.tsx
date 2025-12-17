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
  Calendar,
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Briefcase,
  GraduationCap,
  Filter,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useElections } from "../Context/ElectionContext";
import { supabase } from "../lib/supabase";

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
  profile_image_url?: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  applied_at: string;
  applicant_phone: string;
  applicant_level: string;
  applicant_cgpa: string;
  applicant_qualifications: string;
}

const ApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const { elections, loading: electionsLoading } = useElections();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'open' | 'upcoming'>('open');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [formData, setFormData] = useState({
    manifesto: "",
    campaign_promises: "",
    profile_image_url: "",
    phone: "",
    level: "",
    cgpa: "",
    qualifications: "",
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

      const applicationsWithTitles: Application[] = data?.map((app: Application) => {
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

  // Filter elections
  const now = new Date();
  const openElections = elections.filter((election) => {
    const appStart = new Date(election.application_start_date);
    const appEnd = new Date(election.application_end_date);
    const matchesSearch = election.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return now >= appStart && now <= appEnd && matchesSearch;
  });

  const upcomingElections = elections
    .filter((election) => {
      const appStart = new Date(election.application_start_date);
      const matchesSearch = election.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return now < appStart && matchesSearch;
    })
    .sort(
      (a, b) =>
        new Date(a.application_start_date).getTime() -
        new Date(b.application_start_date).getTime()
    );

  const handleOpenModal = (election: any, position: Position) => {
    setSelectedElection(election);
    setSelectedPosition(position);
    setFormData({
      manifesto: "",
      campaign_promises: "",
      profile_image_url: "",
      phone: "",
      level: "",
      cgpa: "",
      qualifications: "",
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedElection(null);
    setSelectedPosition(null);
    setFormData({
      manifesto: "",
      campaign_promises: "",
      profile_image_url: "",
      phone: "",
      level: "",
      cgpa: "",
      qualifications: "",
    });
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
    if (
      !formData.manifesto.trim() ||
      !formData.qualifications.trim() ||
      !formData.phone.trim() ||
      !formData.level ||
      !formData.cgpa
    ) {
      alert("Please fill all required fields.");
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
          applicant_phone: formData.phone,
          applicant_department: user?.department || "",
          applicant_level: formData.level,
          applicant_cgpa: formData.cgpa,
          applicant_qualifications: formData.qualifications,
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
        return "bg-gradient-to-r from-emerald-500 to-green-500 text-white";
      case "rejected":
        return "bg-gradient-to-r from-rose-500 to-red-500 text-white";
      default:
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "rejected":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  if (electionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading elections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Hero Header - Mobile Optimized */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-emerald-500/10" />
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full blur-3xl opacity-10 dark:opacity-20" />
          
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    Election Applications
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
                  Apply for leadership positions and make a difference in your community.
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                    <Vote className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {openElections.length} Open
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {upcomingElections.length} Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 mt-4 md:mt-0">
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">My Applications</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{myApplications.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Applications Section */}
        {myApplications.length > 0 && (
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5" />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    My Applications
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Track the status of your submitted applications
                  </p>
                </div>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  {myApplications.length} Total
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {myApplications.map((app) => {
                  const appliedDate = new Date(app.applied_at);
                  const isRecent = (Date.now() - appliedDate.getTime()) < 24 * 60 * 60 * 1000;
                  
                  return (
                    <div key={app.id} className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                      
                      <div className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(app.status)} flex items-center gap-1`}>
                                {getStatusIcon(app.status)}
                                <span className="hidden sm:inline">{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                                <span className="sm:hidden">{app.status.charAt(0).toUpperCase()}</span>
                              </span>
                              {isRecent && (
                                <span className="px-1.5 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                                  New
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 truncate">
                              {app.position_title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-1 truncate">
                              {app.election_title}
                            </p>
                          </div>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Applied {appliedDate.toLocaleDateString()}</span>
                          </div>
                          {app.status === "rejected" && app.rejection_reason && (
                            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20">
                              <p className="text-xs font-medium text-rose-700 dark:text-rose-400 line-clamp-2">
                                Reason: {app.rejection_reason}
                              </p>
                            </div>
                          )}
                          {app.status === "pending" && (
                            <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
                              <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse w-3/4" />
                              </div>
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                Reviewing
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter - Mobile Optimized */}
        <div className="sticky top-3 sm:top-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search elections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            
            {/* Tabs - Mobile with Filter Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('open')}
                className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex-1 ${
                  activeTab === 'open'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Vote className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Open Now</span>
                <span className="sm:hidden">Open</span>
                {openElections.length > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'open' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  }`}>
                    {openElections.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex-1 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Coming Soon</span>
                <span className="sm:hidden">Upcoming</span>
                {upcomingElections.length > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'upcoming'
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  }`}>
                    {upcomingElections.length}
                  </span>
                )}
              </button>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 sm:hidden"
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Dropdown */}
            {showMobileFilter && (
              <div className="sm:hidden p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 rounded-lg bg-white dark:bg-slate-900 text-sm font-medium">
                    Sort by Date
                  </button>
                  <button className="p-2 rounded-lg bg-white dark:bg-slate-900 text-sm font-medium">
                    Filter by Position
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Elections Grid */}
        <div>
          {(activeTab === 'open' && openElections.length === 0) ||
           (activeTab === 'upcoming' && upcomingElections.length === 0) ? (
            <div className="text-center py-12 sm:py-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <Vote className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No {activeTab === 'open' ? 'Open' : 'Upcoming'} Elections
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 px-4">
                {activeTab === 'open'
                  ? 'There are currently no elections accepting applications. Check back later or view upcoming elections.'
                  : 'No elections are scheduled to open soon. Stay tuned for announcements!'}
              </p>
              <button
                onClick={() => setActiveTab(activeTab === 'open' ? 'upcoming' : 'open')}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all text-sm sm:text-base"
              >
                View {activeTab === 'open' ? 'Upcoming' : 'Open'} Elections
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(activeTab === 'open' ? openElections : upcomingElections).map((election) => {
                const appEndDate = new Date(election.application_end_date);
                const appStartDate = new Date(election.application_start_date);
                const daysLeft = Math.ceil((appEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                const daysUntilStart = Math.ceil((appStartDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={election.id} className="group relative">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                      activeTab === 'open' ? 'from-purple-600 to-blue-600' : 'from-amber-600 to-orange-600'
                    } rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
                    
                    <div className="relative h-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                      {/* Header */}
                      <div className={`p-4 sm:p-6 ${activeTab === 'open' ? 'pb-3 sm:pb-4' : ''} bg-gradient-to-r ${
                        activeTab === 'open' ? 'from-purple-500 to-blue-500' : 'from-amber-500 to-orange-500'
                      }`}>
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`p-1.5 sm:p-2 rounded-lg bg-white/20 backdrop-blur-sm`}>
                              <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-white/90">
                              {activeTab === 'open' ? 'APPLICATIONS OPEN' : 'COMING SOON'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-white/90 text-xs sm:text-sm font-medium">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>
                              {activeTab === 'open' 
                                ? `${daysLeft}d left` 
                                : `Starts in ${daysUntilStart}d`}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 line-clamp-2">
                          {election.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                          {election.description}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1">
                              {election.positions?.length || 0}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Positions</p>
                          </div>
                          <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-0.5 sm:mb-1">
                              {election.voters ? (election.voters / 1000).toFixed(1) + "K" : "TBA"}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Eligible Voters</p>
                          </div>
                        </div>

                        {/* Positions */}
                        <div className="mb-4 sm:mb-6">
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                            Available Positions
                          </h4>
                          {(!election.positions || election.positions.length === 0) ? (
                            <p className="text-xs sm:text-sm text-gray-500 italic">No positions available</p>
                          ) : (
                            <div className="space-y-2">
                              {election.positions.slice(0, 3).map((position: Position, index: number) => {
                                const applied = myApplications.some(app => 
                                  app.election_id === election.id && 
                                  app.position_title === position.title
                                );

                                return (
                                  <button
                                    key={`${election.id}-${position.title}-${index}`}
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      if (!applied && activeTab === 'open') {
                                        handleOpenModal(election, position);
                                      }
                                    }}
                                    disabled={applied || activeTab !== 'open'}
                                    className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg transition-all group text-left ${
                                      applied || activeTab !== 'open'
                                        ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800'
                                        : 'bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 hover:shadow-md hover:scale-[1.02] cursor-pointer border border-transparent hover:border-purple-300 dark:hover:border-purple-700'
                                    }`}
                                  >
                                    <div className="min-w-0 flex-1">
                                      <p className={`font-semibold text-gray-900 dark:text-white text-xs sm:text-sm ${
                                        !applied && activeTab === 'open' ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' : ''
                                      } truncate`}>
                                        {position.title}
                                      </p>
                                      {position.description && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-1">
                                          {position.description}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:gap-2 ml-2">
                                      {applied ? (
                                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                                          Applied
                                        </span>
                                      ) : (
                                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                              {election.positions.length > 3 && (
                                <div className="text-center pt-1.5 sm:pt-2">
                                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                    +{election.positions.length - 3} more
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Timeline */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-3 sm:pt-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Starts: {new Date(election.application_start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>Ends: {new Date(election.application_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-4 sm:p-6 pt-0">
                        <button
                          onClick={() => activeTab === 'open' && election.positions?.length > 0 ? null : undefined}
                          disabled={activeTab !== 'open' || !election.positions || election.positions.length === 0}
                          className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base ${
                            activeTab === 'open'
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:scale-105'
                              : 'bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 cursor-not-allowed'
                          }`}
                        >
                          {activeTab === 'open' ? (
                            <>
                              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Apply Now</span>
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" />
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Opening Soon</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Application Modal - Mobile Optimized */}
      {isModalOpen && selectedElection && selectedPosition && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-0 sm:p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-none sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 w-full min-h-screen sm:min-h-0 sm:max-w-3xl sm:max-h-[95vh] overflow-y-auto hide-scrollbar shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8 sticky top-0 bg-white dark:bg-slate-900 pt-2 pb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      Apply for <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{selectedPosition.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {selectedElection.title}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg sm:rounded-xl transition-colors ml-2"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Applicant Info Card */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-2xl">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    Your Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {[
                      { icon: User, label: "Name", value: user?.fullName },
                      { icon: Mail, label: "Email", value: user?.email },
                      { icon: FileText, label: "Student ID", value: user?.memberId },
                      { icon: GraduationCap, label: "Department", value: user?.department },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.value || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Sections */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {/* Phone Number */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 801 234 5678"
                      className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    Current Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none text-sm sm:text-base"
                  >
                    <option value="">Select Level</option>
                    {[100, 200, 300, 400, 500, 600].map(level => (
                      <option key={level} value={level}>{level} Level</option>
                    ))}
                  </select>
                </div>

                {/* CGPA */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                    CGPA *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="5.0"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    placeholder="e.g., 4.50"
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                </div>

                {/* Profile Photo Upload */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                    Profile Photo
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="relative">
                      {formData.profile_image_url ? (
                        <img
                          src={formData.profile_image_url}
                          alt="Profile"
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center border-4 border-dashed border-slate-300 dark:border-slate-700">
                          <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 dark:text-slate-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full sm:w-auto">
                      <label className="group flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg sm:rounded-xl cursor-pointer hover:shadow-lg transition-all w-full">
                        <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-purple-700 dark:text-purple-300 text-sm sm:text-base">
                          {uploadingImage ? "Uploading..." : formData.profile_image_url ? "Change Photo" : "Upload Photo"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 sm:mt-3">
                        Upload a clear, professional photo (JPG or PNG, max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    Qualifications & Experience *
                  </label>
                  <textarea
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    rows={3}
                    placeholder="List your relevant qualifications, leadership experience, achievements..."
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  />
                </div>

                {/* Manifesto */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    Manifesto *
                  </label>
                  <textarea
                    value={formData.manifesto}
                    onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
                    rows={4}
                    placeholder="Share your vision, goals, and reasons why students should vote for you..."
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  />
                </div>

                {/* Campaign Promises */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                    Campaign Promises (Optional)
                  </label>
                  <textarea
                    value={formData.campaign_promises}
                    onChange={(e) => setFormData({ ...formData, campaign_promises: e.target.value })}
                    rows={3}
                    placeholder="List specific promises, initiatives, or projects..."
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                  />
                </div>
              </div>

              {/* Important Note */}
              <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-400">
                  <span className="font-bold">Note:</span> Your application will be reviewed by the electoral officer. 
                  You will be notified via email once a decision has been made.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.manifesto.trim() || !formData.qualifications.trim() || !formData.phone.trim() || !formData.level || !formData.cgpa}
                  className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;