import React, { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Globe,
  Shield,
  Trash2,
  Mail,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";


const VoterSettings: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [electionReminders, setElectionReminders] = useState(true);
  const [resultNotifications, setResultNotifications] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated. You will receive a confirmation email.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your account preferences and security settings
            </p>
          </div>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              General Settings
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Sun className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Toggle dark mode appearance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Language
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select your preferred language
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="yo">Yoruba</option>
                <option value="ig">Igbo</option>
                <option value="ha">Hausa</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive updates via email
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  emailNotifications ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    emailNotifications ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    SMS Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive updates via SMS
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  smsNotifications ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    smsNotifications ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Election Reminders
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified about upcoming elections
                  </p>
                </div>
              </div>
              <button
                onClick={() => setElectionReminders(!electionReminders)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  electionReminders ? "bg-orange-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    electionReminders ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Result Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get notified when results are published
                  </p>
                </div>
              </div>
              <button
                onClick={() => setResultNotifications(!resultNotifications)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  resultNotifications ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    resultNotifications ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Security
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add an extra layer of security
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  twoFactorAuth ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    twoFactorAuth ? "translate-x-7" : ""
                  }`}
                />
              </button>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter current password"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter new password"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Confirm new password"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleChangePassword}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-2xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h2 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">
                Danger Zone
              </h2>
              <p className="text-sm text-red-700 dark:text-red-400 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterSettings;