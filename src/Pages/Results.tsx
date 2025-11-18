import React, { useState } from "react";
import {
  Download,
  Filter,
  Crown,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Eye,
  X
} from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminLayout from "./AdminLayout";

interface Candidate {
  id: string;
  name: string;
  position: string;
  votes: number;
  percentage: number;
  department: string;
  imageUrl: string;
  status: "winner" | "runner-up" | "candidate";
}

interface Position {
  id: string;
  title: string;
  totalVotes: number;
  candidates: Candidate[];
}

const ResultsAnalysis: React.FC = () => {
  const [selectedElection, setSelectedElection] = useState("sug-2024");
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

  const elections = [
    { id: "sug-2024", name: "SUG Elections 2024" },
    { id: "cs-rep-2024", name: "CS Department Rep 2024" },
    { id: "sports-2024", name: "Sports Council 2024" },
  ];

  const positions: Position[] = [
    {
      id: "president",
      title: "President",
      totalVotes: 1850,
      candidates: [
        {
          id: "1",
          name: "Adebayo Johnson",
          position: "President",
          votes: 920,
          percentage: 49.7,
          department: "Computer Science",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo",
          status: "winner",
        },
        {
          id: "2",
          name: "Fatima Abdullahi",
          position: "President",
          votes: 650,
          percentage: 35.1,
          department: "Engineering",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
          status: "runner-up",
        },
        {
          id: "3",
          name: "Chukwuemeka Obi",
          position: "President",
          votes: 280,
          percentage: 15.2,
          department: "Medicine",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chukwuemeka",
          status: "candidate",
        },
      ],
    },
    {
      id: "vice-president",
      title: "Vice President",
      totalVotes: 1820,
      candidates: [
        {
          id: "4",
          name: "Ngozi Okeke",
          position: "Vice President",
          votes: 1050,
          percentage: 57.7,
          department: "Law",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi",
          status: "winner",
        },
        {
          id: "5",
          name: "Ibrahim Musa",
          position: "Vice President",
          votes: 770,
          percentage: 42.3,
          department: "Business Admin",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibrahim",
          status: "runner-up",
        },
      ],
    },
    {
      id: "secretary",
      title: "Secretary General",
      totalVotes: 1790,
      candidates: [
        {
          id: "6",
          name: "Blessing Eze",
          position: "Secretary General",
          votes: 890,
          percentage: 49.7,
          department: "Biology",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing",
          status: "winner",
        },
        {
          id: "7",
          name: "Mohammed Bello",
          position: "Secretary General",
          votes: 580,
          percentage: 32.4,
          department: "Engineering",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
          status: "runner-up",
        },
        {
          id: "8",
          name: "Chinwe Nwankwo",
          position: "Secretary General",
          votes: 320,
          percentage: 17.9,
          department: "Business Admin",
          imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinwe",
          status: "candidate",
        },
      ],
    },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

  const stats = {
    totalVotes: 5460,
    totalPositions: 5,
    totalCandidates: 15,
    avgVotesPerPosition: 1092,
  };

  const departmentVoteDistribution = [
    { department: "Computer Science", votes: 650 },
    { department: "Engineering", votes: 580 },
    { department: "Medicine", votes: 420 },
    { department: "Law", votes: 380 },
    { department: "Business Admin", votes: 350 },
    { department: "Biology", votes: 280 },
  ];

  return (
      <AdminLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Results Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed breakdown of election results and voting patterns
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all">
            <Download className="w-5 h-5" />
            Export Results
          </button>
        </div>

        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedElection}
            onChange={(e) => setSelectedElection(e.target.value)}
            className="w-full md:w-auto pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
          >
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Total Votes
              </p>
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalVotes.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Positions
              </p>
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.totalPositions}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Candidates
              </p>
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.totalCandidates}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Avg Votes
              </p>
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {stats.avgVotesPerPosition}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {positions.map((position) => (
            <div
              key={position.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {position.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {position.totalVotes.toLocaleString()} total votes
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPosition(position)}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {position.candidates.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        candidate.status === "winner"
                          ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 border-green-500"
                          : candidate.status === "runner-up"
                          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800"
                          : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={candidate.imageUrl}
                          alt={candidate.name}
                          className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800"
                        />
                        {candidate.status === "winner" && (
                          <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                            <Crown className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                          {candidate.name}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {candidate.department}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                candidate.status === "winner"
                                  ? "bg-gradient-to-r from-green-500 to-green-600"
                                  : "bg-gradient-to-r from-blue-500 to-blue-600"
                              }`}
                              style={{ width: `${candidate.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {candidate.percentage}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {candidate.votes.toLocaleString()} votes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={position.candidates}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) =>
                          `${name.split(" ")[0]}: ${percentage.toFixed(1)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="votes"
                      >
                        {position.candidates.map((entry, index) => (
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
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Vote Distribution by Department
            </h3>
            <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentVoteDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
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
              <Bar dataKey="votes" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {selectedPosition && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-4xl w-full my-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedPosition.title} - Detailed Results
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedPosition.totalVotes.toLocaleString()} total votes cast
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedPosition.candidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <img
                        src={candidate.imageUrl}
                        alt={candidate.name}
                        className="w-20 h-20 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            {candidate.name}
                          </h4>
                          {candidate.status === "winner" && (
                            <Crown className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {candidate.department}
                        </p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Total Votes
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {candidate.votes.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Percentage
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {candidate.percentage}%
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Status
                        </p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400 capitalize">
                          {candidate.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default ResultsAnalysis;