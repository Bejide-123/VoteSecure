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
} from "lucide-react";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  memberId: string;
  organization: string;
  department: string;
  level: string;
  dateOfBirth: string;
  registeredAt: string;
  profileImage: string;
}

const VoterProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "Adebayo Johnson",
    email: "adebayo.johnson@student.edu",
    phone: "+234 803 123 4567",
    memberId: "2021/CS/056",
    organization: "University of Lagos",
    department: "Computer Science",
    level: "300 Level",
    dateOfBirth: "2003-05-15",
    registeredAt: "2024-01-15T10:30:00",
    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo",
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const stats = {
    totalVotes: 8,
    electionsParticipated: 8,
    verificationRate: 100,
    memberSince: "Jan 2024",
  };

  const recentActivity = [
    {
      id: "1",
      type: "vote",
      title: "Voted in SUG Elections 2024",
      date: "2024-11-10T14:30:00",
    },
    {
      id: "2",
      type: "vote",
      title: "Voted in CS Department Rep",
      date: "2024-10-25T11:15:00",
    },
    {
      id: "3",
      type: "registration",
      title: "Account Verified",
      date: "2024-01-15T10:30:00",
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

  const getTimeAgo = (date: string): string => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your personal information and voting history
            </p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
            >
              <Edit className="w-5 h-5" />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <img
                    src={isEditing ? editedProfile.profileImage : profile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-700"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-full cursor-pointer hover:scale-110 transition-all">
                      <Camera className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">
                  {profile.fullName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {profile.memberId}
                </p>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-xs font-bold text-green-700 dark:text-green-400">
                    Verified Voter
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Voting Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Vote className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Total Votes
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {stats.totalVotes}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Elections
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {stats.electionsParticipated}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Verification
                    </span>
                  </div>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {stats.verificationRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Member Since
                    </span>
                  </div>
                  <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                    {stats.memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.fullName}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, fullName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-gray-900 dark:text-white">{profile.fullName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-gray-900 dark:text-white">{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-gray-900 dark:text-white">{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Member ID
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Hash className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    <span className="text-gray-900 dark:text-white font-mono">
                      {profile.memberId}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Organization
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-gray-900 dark:text-white">{profile.organization}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Department
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-gray-900 dark:text-white">{profile.department}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Level
                  </label>
                  {isEditing ? (
                    <select
                      value={editedProfile.level}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, level: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="100 Level">100 Level</option>
                      <option value="200 Level">200 Level</option>
                      <option value="300 Level">300 Level</option>
                      <option value="400 Level">400 Level</option>
                      <option value="500 Level">500 Level</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-gray-900 dark:text-white">{profile.level}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editedProfile.dateOfBirth}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, dateOfBirth: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <Calendar className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                      <span className="text-gray-900 dark:text-white">
                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-750 transition-all"
                  >
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                      {activity.type === "vote" ? (
                        <Vote className="w-5 h-5 text-white" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getTimeAgo(activity.date)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterProfile;