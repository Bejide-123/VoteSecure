import React, { useState } from "react";
import {
  TrendingUp,
  Users,
  Clock,
  //   Calendar,
  Download,
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminLayout from "./AdminLayout";

interface TurnoutData {
  hour: string;
  votes: number;
}

interface DepartmentTurnout {
  department: string;
  voted: number;
  registered: number;
  percentage: number;
}

const VoterTurnout: React.FC = () => {
  const [selectedElection, setSelectedElection] = useState("sug-2024");
  const [timeRange, setTimeRange] = useState<"hour" | "day" | "week">("hour");

  const elections = [
    { id: "sug-2024", name: "SUG Elections 2024" },
    { id: "cs-rep-2024", name: "CS Department Rep 2024" },
    { id: "sports-2024", name: "Sports Council 2024" },
  ];

  const hourlyData: TurnoutData[] = [
    { hour: "8:00", votes: 45 },
    { hour: "9:00", votes: 120 },
    { hour: "10:00", votes: 280 },
    { hour: "11:00", votes: 350 },
    { hour: "12:00", votes: 420 },
    { hour: "13:00", votes: 380 },
    { hour: "14:00", votes: 520 },
    { hour: "15:00", votes: 680 },
    { hour: "16:00", votes: 750 },
    { hour: "17:00", votes: 620 },
    { hour: "18:00", votes: 480 },
  ];

  const departmentData: DepartmentTurnout[] = [
    {
      department: "Computer Science",
      voted: 450,
      registered: 500,
      percentage: 90,
    },
    { department: "Engineering", voted: 380, registered: 450, percentage: 84 },
    { department: "Medicine", voted: 320, registered: 400, percentage: 80 },
    { department: "Law", voted: 280, registered: 350, percentage: 80 },
    {
      department: "Business Admin",
      voted: 250,
      registered: 400,
      percentage: 62,
    },
    { department: "Biology", voted: 220, registered: 300, percentage: 73 },
  ];

  const peakTimeData = [
    { name: "Morning (8-12)", value: 1215 },
    { name: "Afternoon (12-16)", value: 2100 },
    { name: "Evening (16-20)", value: 1580 },
  ];

  const stats = {
    totalVoters: 2500,
    voted: 1900,
    notVoted: 600,
    turnoutRate: 76,
    peakHour: "16:00",
    averagePerHour: 173,
  };

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Voter Turnout Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track voting participation and turnout rates
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
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
              >
                <option value="hour">Hourly</option>
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
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
                  Votes Cast
                </p>
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.voted.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Not Voted
                </p>
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.notVoted.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  Turnout Rate
                </p>
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.turnoutRate}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Voting Activity Over Time
                </h3>
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hourlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.1}
                  />
                  <XAxis dataKey="hour" stroke="#6b7280" />
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
                  <Line
                    type="monotone"
                    dataKey="votes"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Peak Voting Times
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={peakTimeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {peakTimeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Turnout by Department
              </h3>
              <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={departmentData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="department"
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
                <Bar dataKey="voted" fill="#10b981" name="Voted" />
                <Bar dataKey="registered" fill="#3b82f6" name="Registered" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Department Performance Details
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Registered
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Voted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Remaining
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-gray-300 uppercase">
                      Turnout
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {departmentData.map((dept, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {dept.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {dept.registered}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {dept.voted}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-red-600 dark:text-red-400">
                          {dept.registered - dept.voted}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full"
                              style={{ width: `${dept.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {dept.percentage}%
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
              <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Peak Hour
              </h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.peakHour}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Highest voting activity
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-6">
              <Activity className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Avg Per Hour
              </h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.averagePerHour}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                votes per hour
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
              <AlertCircle className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Low Turnout Depts
              </h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Below 70% turnout
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VoterTurnout;
