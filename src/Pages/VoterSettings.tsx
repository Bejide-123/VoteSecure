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
  // ChevronRight,
  // User,
  // Smartphone,
  Key,
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

  // Mobile-optimized toggle switch component
  const ToggleSwitch = ({ enabled, setEnabled, color = "blue" }: { 
    enabled: boolean; 
    setEnabled: (val: boolean) => void;
    color?: string;
  }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-12 h-6 sm:w-14 sm:h-7 rounded-full transition-colors ${
        enabled 
          ? color === "green" ? "bg-green-600" 
            : color === "purple" ? "bg-purple-600"
            : color === "orange" ? "bg-orange-600"
            : color === "blue" ? "bg-blue-600"
            : "bg-gray-600"
          : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-5 h-5 sm:w-5 sm:h-5 bg-white rounded-full transition-transform ${
          enabled ? "translate-x-6 sm:translate-x-7" : ""
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-4 md:p-6 pb-24">
      <div className="max-w-4xl mx-auto space-y-5 sm:space-y-8">
        {/* Header Section */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20" />
          <div className="relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Settings
                  </h1>
                </div>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Manage your account preferences and security settings
                </p>
              </div>
              
              <button
                onClick={handleSaveSettings}
                className="group relative w-full sm:w-auto mt-2 sm:mt-0"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg sm:rounded-xl blur opacity-70 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:scale-105 transition-all duration-300 w-full">
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Save Changes</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* General Settings */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  General Settings
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    {darkMode ? (
                      <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    ) : (
                      <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
                    )}
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Dark Mode
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Toggle dark mode appearance
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={darkMode} setEnabled={setDarkMode} color="blue" />
                </div>

                {/* Language Selector */}
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Language
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Select your preferred language
                      </p>
                    </div>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="yo">Yoruba</option>
                    <option value="ig">Igbo</option>
                    <option value="ha">Hausa</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Security
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={twoFactorAuth} setEnabled={setTwoFactorAuth} color="blue" />
                </div>

                {/* Change Password */}
                <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                    Change Password
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="Enter current password"
                        />
                        <button
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="Enter new password"
                        />
                        <button
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 pr-10 text-sm sm:text-base rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                          placeholder="Confirm new password"
                        />
                        <button
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      className="w-full px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transition-all text-sm sm:text-base"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Notifications */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Notifications
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Email Notifications
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Receive updates via email
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={emailNotifications} setEnabled={setEmailNotifications} color="green" />
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        SMS Notifications
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Receive updates via SMS
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={smsNotifications} setEnabled={setSmsNotifications} color="purple" />
                </div>

                {/* Election Reminders */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 dark:text-orange-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Election Reminders
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Get notified about upcoming elections
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={electionReminders} setEnabled={setElectionReminders} color="orange" />
                </div>

                {/* Result Notifications */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Result Notifications
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Get notified when results are published
                      </p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={resultNotifications} setEnabled={setResultNotifications} color="green" />
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <div className="flex items-start gap-2 sm:gap-3 mb-4">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-red-400 mt-0.5" />
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-red-900 dark:text-red-400 mb-1.5 sm:mb-2">
                    Danger Zone
                  </h2>
                  <p className="text-xs sm:text-sm text-red-700 dark:text-red-400 mb-3 sm:mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all text-sm sm:text-base w-full"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterSettings;