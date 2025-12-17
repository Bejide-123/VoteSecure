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
  X,
  ChevronRight,
  Target,
  Trophy,
  Sparkles,
  Zap,
  Activity,
  Search,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
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
  gender?: "male" | "female";
  year?: number;
}

interface Position {
  id: string;
  title: string;
  totalVotes: number;
  candidates: Candidate[];
  previousWinner?: string;
  turnout: number;
}

const ResultsAnalysis: React.FC = () => {
  const [selectedElection, setSelectedElection] = useState("sug-2024");
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const elections = [
    { id: "sug-2024", name: "SUG Elections 2024", date: "Nov 15, 2024", status: "completed" },
    { id: "cs-rep-2024", name: "CS Department Rep 2024", date: "Oct 28, 2024", status: "completed" },
    { id: "sports-2024", name: "Sports Council 2024", date: "Dec 5, 2024", status: "completed" },
  ];

  const positions: Position[] = [
    {
      id: "president",
      title: "President",
      totalVotes: 1850,
      turnout: 78,
      previousWinner: "Tunde Lawal",
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
          gender: "male",
          year: 2023,
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
          gender: "female",
          year: 2024,
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
          gender: "male",
          year: 2023,
        },
      ],
    },
    {
      id: "vice-president",
      title: "Vice President",
      totalVotes: 1820,
      turnout: 76,
      previousWinner: "Grace Okoro",
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
          gender: "female",
          year: 2024,
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
          gender: "male",
          year: 2023,
        },
      ],
    },
    {
      id: "secretary",
      title: "Secretary General",
      totalVotes: 1790,
      turnout: 75,
      previousWinner: "David Nwankwo",
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
          gender: "female",
          year: 2024,
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
          gender: "male",
          year: 2023,
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
          gender: "female",
          year: 2024,
        },
      ],
    },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
  const GRADIENT_COLORS = [
    "from-emerald-500 to-green-500",
    "from-blue-500 to-cyan-500",
    "from-amber-500 to-orange-500",
    "from-rose-500 to-pink-500",
    "from-violet-500 to-purple-500",
    "from-cyan-500 to-blue-500",
  ];

  const stats = {
    totalVotes: 5460,
    totalPositions: 5,
    totalCandidates: 15,
    avgVotesPerPosition: 1092,
    voterTurnout: 75,
    completionRate: 100,
  };

  const departmentVoteDistribution = [
    { department: "Computer Science", votes: 650, change: 12 },
    { department: "Engineering", votes: 580, change: 8 },
    { department: "Medicine", votes: 420, change: -5 },
    { department: "Law", votes: 380, change: 15 },
    { department: "Business Admin", votes: 350, change: 3 },
    { department: "Biology", votes: 280, change: -2 },
  ];

  const genderDistribution = [
    { gender: "Male", votes: 2850, color: "#3b82f6" },
    { gender: "Female", votes: 2610, color: "#ec4899" },
  ];

  const voteTrend = [
    { hour: "8AM", votes: 120 },
    { hour: "10AM", votes: 450 },
    { hour: "12PM", votes: 850 },
    { hour: "2PM", votes: 680 },
    { hour: "4PM", votes: 320 },
    { hour: "6PM", votes: 180 },
  ];

  const filteredPositions = positions.filter(position =>
    position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.candidates.some(candidate =>
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-4 md:p-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          {/* Header Section */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20" />
            <div className="relative p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                      Results Analysis
                    </h1>
                  </div>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
                    Detailed breakdown of election results, voting patterns, and performance analytics
                  </p>
                </div>
                
                <button className="group relative w-full lg:w-auto">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition-all duration-300" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 sm:gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg w-full">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Export Results</span>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions or candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <select
                value={selectedElection}
                onChange={(e) => setSelectedElection(e.target.value)}
                className="w-full sm:w-auto pl-10 sm:pl-12 pr-8 sm:pr-10 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer min-w-[200px]"
              >
                {elections.map((election) => (
                  <option key={election.id} value={election.id}>
                    {election.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Total Votes
                  </p>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalVotes.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-1 sm:mt-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                    +12.5% from last election
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Voter Turnout
                  </p>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.voterTurnout}%
                </p>
                <div className="flex items-center gap-1 mt-1 sm:mt-2">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    +8% engagement
                  </span>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Positions
                  </p>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.totalPositions}
                </p>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">
                  All positions filled
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Completion Rate
                  </p>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.completionRate}%
                </p>
                <div className="flex items-center gap-1 mt-1 sm:mt-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    Successfully completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Positions Grid */}
          <div className="space-y-4 sm:space-y-6">
            {filteredPositions.map((position, idx) => (
              <div key={position.id} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${GRADIENT_COLORS[idx % GRADIENT_COLORS.length]} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300`} />
                
                <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                          {position.title}
                        </h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            {position.turnout}% Turnout
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {position.totalVotes.toLocaleString()} total votes
                        </p>
                        {position.previousWinner && (
                          <div className="flex items-center gap-1">
                            <Crown className="w-3 h-3 text-amber-500" />
                            <span className="text-xs text-amber-600 dark:text-amber-400">
                              Prev: {position.previousWinner}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPosition(position)}
                      className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all w-full sm:w-auto"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm sm:text-base">View Details</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-3 sm:space-y-4">
                      {position.candidates.map((candidate) => (
                        <div
                          key={candidate.id}
                          className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all hover:scale-[1.02] hover:shadow-sm ${
                            candidate.status === "winner"
                              ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-900/30 border-emerald-500"
                              : candidate.status === "runner-up"
                              ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-900/30 border-blue-400 dark:border-blue-800"
                              : "bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-900/50 border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          <div className="relative flex-shrink-0">
                            <img
                              src={candidate.imageUrl}
                              alt={candidate.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white dark:border-slate-800 shadow-md"
                            />
                            {candidate.status === "winner" && (
                              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full p-1 shadow-lg">
                                <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                            )}
                            {candidate.status === "runner-up" && (
                              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full p-1 shadow-lg">
                                <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 mb-1 sm:mb-2">
                              <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                                {candidate.name}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {candidate.department}
                                </span>
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      candidate.status === "winner"
                                        ? "bg-gradient-to-r from-emerald-500 to-green-500"
                                        : "bg-gradient-to-r from-blue-500 to-cyan-500"
                                    }`}
                                    style={{ width: `${candidate.percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white min-w-[50px] text-right">
                                  {candidate.percentage}%
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {candidate.votes.toLocaleString()} votes
                                </p>
                                {candidate.year && (
                                  <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Class of {candidate.year}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width="100%" height={200} className="sm:h-64">
                        <PieChart>
                          <Pie
                            data={position.candidates as any}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) =>
                              `${(name || "").split(" ")[0]}: ${((percent || 0) * 100).toFixed(1)}%`
                            }
                            outerRadius={60}
                            innerRadius={25}
                            fill="#8884d8"
                            dataKey="votes"
                          >
                            {position.candidates.map((_, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1f2937",
                              border: "1px solid #374151",
                              borderRadius: "0.5rem",
                              color: "#fff",
                              fontSize: "12px",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Vote Distribution Chart */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                    Vote Distribution by Department
                  </h3>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-semibold text-green-600">Overall ↑</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={departmentVoteDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                    <XAxis
                      dataKey="department"
                      stroke="#6b7280"
                      angle={-45}
                      textAnchor="end"
                      height={50}
                      fontSize={12}
                    />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "0.5rem",
                        color: "#fff",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                      {departmentVoteDistribution.map(( index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index.change % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gender Distribution & Timeline */}
            <div className="space-y-4 sm:space-y-6">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
                <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600 dark:text-pink-400" />
                    Gender Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={120}>
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={50}
                        paddingAngle={5}
                        dataKey="votes"
                      >
                        {genderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "0.5rem",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 sm:gap-6 mt-4">
                    {genderDistribution.map((entry, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {entry.gender}: {((entry.votes / stats.totalVotes) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
                <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    Voting Timeline
                  </h3>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={voteTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                      <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "0.5rem",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="votes"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position Detail Modal */}
        {selectedPosition && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedPosition.title} Results
                    </h3>
                    <div className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full">
                      {selectedPosition.turnout}% Turnout
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                    {selectedPosition.totalVotes.toLocaleString()} total votes cast
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPosition(null)}
                  className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {selectedPosition.candidates.map((candidate, index) => (
                  <div
                    key={candidate.id}
                    className={`group p-4 sm:p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      candidate.status === "winner"
                        ? "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-900/30 border-emerald-500"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-400">
                        #{index + 1}
                      </div>
                      <img
                        src={candidate.imageUrl}
                        alt={candidate.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-slate-200 dark:border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                            {candidate.name}
                          </h4>
                          {candidate.status === "winner" && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold rounded-full w-fit">
                              <Crown className="w-3 h-3" />
                              Winner
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {candidate.department}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/50 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Total Votes
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                          {candidate.votes.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Percentage
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                          {candidate.percentage}%
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Lead
                        </p>
                        <p className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
                          {index === 0 ? "1st" : index === 1 ? "2nd" : "3rd"}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Gender
                        </p>
                        <p className="text-lg sm:text-xl font-bold capitalize">
                          {candidate.gender}
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
    </AdminLayout>
  );
};

export default ResultsAnalysis;