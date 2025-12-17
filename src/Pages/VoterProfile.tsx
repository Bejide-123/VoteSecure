import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Hash,
  Calendar,
  Edit,
  Camera,
  CheckCircle2,
  Award,
  Vote,
  TrendingUp,
  Shield,
  Save,
  X,
  Sparkles,
  Activity,
  ChevronRight,
  Zap,
  Lock,
  FileText,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  memberId: string;
  organization: string;
  department: string;
  level: string;
  dateOfBirth: string;
  registeredAt?: string;
  profileImage: string;
}

const VoterProfile: React.FC = () => {
  const { user } = useAuth(); 
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: user?.fullName || "Adebayo Johnson",
    email: user?.email || "adebayo.johnson@student.edu",
    phone: "+234 803 123 4567",
    memberId: user?.memberId || "2021/CS/056",
    organization: user?.organization || "University of Lagos",
    department: user?.department || "Computer Science",
    level: "300 Level",
    dateOfBirth: "2003-05-15",
    // registeredAt: user?.createdAt || new Date().toISOString(),
    profileImage: user?.selfieUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const stats = [
    {
      label: "Total Votes",
      value: 8,
      icon: <Vote className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      label: "Elections",
      value: 8,
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "emerald",
      gradient: "from-emerald-500 to-green-500"
    },
    {
      label: "Verification",
      value: "100%",
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      label: "Member Since",
      value: new Date(user?.createdAt || new Date()).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "amber",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  const recentActivity = [
    {
      id: "1",
      type: "vote",
      title: "Voted in SUG Elections 2024",
      date: "2024-11-10T14:30:00",
      icon: <Vote className="w-4 h-4" />
    },
    {
      id: "2",
      type: "vote",
      title: "Voted in CS Department Rep",
      date: "2024-10-25T11:15:00",
      icon: <FileText className="w-4 h-4" />
    },
    {
      id: "3",
      type: "registration",
      title: "Account Verified",
      date: user?.createdAt || "2024-01-15T10:30:00",
      icon: <CheckCircle2 className="w-4 h-4" />
    },
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile({ ...editedProfile, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // const getTimeAgo = (date: string): string => {
  //   const diffMs = new Date().getTime() - new Date(date).getTime();
  //   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  //   if (diffDays === 0) return "Today";
  //   if (diffDays === 1) return "Yesterday";
  //   if (diffDays < 7) return `${diffDays} days ago`;
  //   if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  //   return `${Math.floor(diffDays / 30)} months ago`;
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* ===== HERO HEADER ===== */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-emerald-500/10 dark:to-purple-500/10" />
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900" />
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-5 dark:opacity-10" />
          
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    My Profile
                  </h1>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
                  Manage your personal information, voting history, and account settings
                </p>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="group relative w-full sm:w-auto"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl sm:rounded-2xl blur opacity-70 group-hover:opacity-100 transition-all duration-300" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center sm:justify-start gap-2 sm:gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg w-full">
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base md:text-lg">Edit Profile</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleCancel}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="truncate">Save</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* ===== LEFT SIDEBAR ===== */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-3 sm:mb-4">
                    <img
                      src={user?.selfieUrl || profile.profileImage}
                      alt="Profile"
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-slate-800 shadow-lg"
                    />
                    {isEditing && (
                      <label className="absolute bottom-1 right-1 p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full cursor-pointer hover:scale-110 transition-all shadow-lg">
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white text-center mb-1 truncate w-full">
                    {user?.fullName}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 text-center truncate w-full">
                    {profile.memberId}
                  </p>
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      Verified Voter
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  Voting Statistics
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="group relative">
                      <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-300`} />
                      
                      <div className="relative flex items-center justify-between p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl hover:shadow-sm transition-all duration-200">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 dark:from-${stat.color}-900/30 dark:to-${stat.color}-800/30`}>
                            <div className={`text-${stat.color}-600 dark:text-${stat.color}-400`}>
                              {stat.icon}
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                            {stat.label}
                          </span>
                        </div>
                        <span className={`text-base sm:text-lg font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                          {stat.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== RIGHT CONTENT ===== */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Personal Information Card */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.fullName}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, fullName: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white truncate">
                          {user?.fullName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, email: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white truncate">
                          {user?.email}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, phone: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white truncate">
                          {profile.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Member ID */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Member ID
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                      <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm sm:text-base font-mono text-gray-900 dark:text-white truncate">
                        {user?.memberId}
                      </span>
                    </div>
                  </div>

                  {/* Organization */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Organization
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                      <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm sm:text-base text-gray-900 dark:text-white truncate">
                        {user?.organization}
                      </span>
                    </div>
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Department
                    </label>
                    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm sm:text-base text-gray-900 dark:text-white truncate">
                        {user?.department}
                      </span>
                    </div>
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Level
                    </label>
                    {isEditing ? (
                      <select
                        value={editedProfile.level}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, level: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="100 Level">100 Level</option>
                        <option value="200 Level">200 Level</option>
                        <option value="300 Level">300 Level</option>
                        <option value="400 Level">400 Level</option>
                        <option value="500 Level">500 Level</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white">
                          {profile.level}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedProfile.dateOfBirth}
                        onChange={(e) =>
                          setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
                        <span className="text-sm sm:text-base text-gray-900 dark:text-white">
                          {new Date(profile.dateOfBirth).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-1">
                        Privacy & Security
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Your personal information is securely encrypted and only used for voting verification purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  Recent Activity
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="group relative"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg blur opacity-0 group-hover:opacity-10 transition duration-300" />
                      
                      <div className="relative flex items-start gap-3 p-3 sm:p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg sm:rounded-xl hover:shadow-sm transition-all duration-200">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg">
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 truncate">
                            {activity.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {/* {getTimeAgo(activity.date)} */}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all hidden sm:block" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterProfile;