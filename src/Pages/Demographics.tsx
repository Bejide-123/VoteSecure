import React, { useState } from "react";
import {
  Users,
  Download,
  Filter,
  BarChart3,
  TrendingUp,
  Building,
  GraduationCap,
  User,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "./AdminLayout";

const Demographics: React.FC = () => {
  const [selectedElection, setSelectedElection] = useState("sug-2024");
  const [viewType, setViewType] = useState<"department" | "level" | "gender">(
    "department"
  );

  const elections = [
    { id: "sug-2024", name: "SUG Elections 2024" },
    { id: "cs-rep-2024", name: "CS Department Rep 2024" },
    { id: "sports-2024", name: "Sports Council 2024" },
  ];

  const departmentData = [
    { name: "Computer Science", voters: 450, voted: 405, percentage: 90 },
    { name: "Engineering", voters: 420, voted: 353, percentage: 84 },
    { name: "Medicine", voters: 380, voted: 304, percentage: 80 },
    { name: "Law", voters: 350, voted: 280, percentage: 80 },
    { name: "Business Admin", voters: 400, voted: 248, percentage: 62 },
    { name: "Biology", voters: 300, voted: 219, percentage: 73 },
  ];

  const levelData = [
    { level: "100 Level", voters: 520, voted: 416, percentage: 80 },
    { level: "200 Level", voters: 480, voted: 403, percentage: 84 },
    { level: "300 Level", voters: 450, voted: 387, percentage: 86 },
    { level: "400 Level", voters: 420, voted: 361, percentage: 86 },
    { level: "500 Level", voters: 230, voted: 195, percentage: 85 },
  ];

  const genderData = [
    { name: "Male", value: 1180, percentage: 62.1, color: "#3b82f6" },
    { name: "Female", value: 720, percentage: 37.9, color: "#10b981" },
  ];

  const ageGroupData = [
    { ageGroup: "16-18", voters: 380, voted: 285 },
    { ageGroup: "19-21", voters: 820, voted: 697 },
    { ageGroup: "22-24", voters: 650, voted: 552 },
    { ageGroup: "25+", voters: 250, voted: 216 },
  ];

  const stats = {
    totalVoters: 2100,
    totalVoted: 1900,
    maleVoters: 1180,
    femaleVoters: 720,
    departments: 6,
    avgAge: 21.5,
  };

  const getCurrentData = () => {
    switch (viewType) {
      case "department":
        return departmentData;
      case "level":
        return levelData;
      default:
        return departmentData;
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Demographics Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Analyze voter demographics and participation patterns
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedElection}
                onChange={(e) => setSelectedElection(e.target.value)}
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                {elections.map((election) => (
                  <option key={election.id} value={election.id}>
                    {election.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <BarChart3 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={viewType}
                onChange={(e) => setViewType(e.target.value as any)}
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="department">By Department</option>
                <option value="level">By Level</option>
                <option value="gender">By Gender</option>
              </select>
            </div>
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
                {stats.totalVoters.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Male Voters
                </p>
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {stats.maleVoters.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((stats.maleVoters / stats.totalVoters) * 100).toFixed(1)}% of
                total
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Female Voters
                </p>
                <User className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.femaleVoters.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {((stats.femaleVoters / stats.totalVoters) * 100).toFixed(1)}%
                of total
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Departments
                </p>
                <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.departments}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {viewType === "department"
                    ? "Department Distribution"
                    : viewType === "level"
                    ? "Level Distribution"
                    : "Gender Distribution"}
                </h3>
                <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={getCurrentData()}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis
                    dataKey={viewType === "level" ? "level" : "name"}
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                  />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "0.5rem",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="voters" fill="#10b981" name="Registered" />
                  <Bar dataKey="voted" fill="#3b82f6" name="Voted" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Gender Distribution
                </h3>
                <PieChart className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) =>
                      `${name}: ${percentage.toFixed(1)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {genderData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.value.toLocaleString()} (
                      {item.percentage.toFixed(1)}
                      %)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Age Group Distribution
              </h3>
              <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageGroupData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                />
                <XAxis dataKey="ageGroup" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "0.5rem",
                    color: "#fff",
                  }}
                />
                <Legend />
                <Bar dataKey="voters" fill="#10b981" name="Registered" />
                <Bar dataKey="voted" fill="#3b82f6" name="Voted" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Detailed Demographics Breakdown
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      {viewType === "level" ? "Level" : "Department"}
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Registered
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Voted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Not Voted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Turnout
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {getCurrentData().map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {viewType === "level" ? item.level : item.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {item.voters.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {item.voted.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-red-600 dark:text-red-400">
                          {(item.voters - item.voted).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {item.percentage}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Most Active Level
              </h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                300 Level
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                86% turnout rate
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
              <Building className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Top Department
              </h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                CS
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                90% participation
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Average Age
              </h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.avgAge} years
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Across all voters
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Demographics;
