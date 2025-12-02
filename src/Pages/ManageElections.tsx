import React, { useState, useEffect } from "react";
import {
  Activity,
  Users,
  AlertTriangle,
  Clock,
  Vote,
  Shield,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RefreshCw,
  Download,
  Crown,
  BookUser,
  Landmark,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useElections } from "../Context/ElectionContext";
// import { supabase } from "../lib/supabase";
import AdminLayout from "./AdminLayout";
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
} from "recharts";

interface VoteActivity {
  id: string;
  timestamp: string;
  voter_name: string;
  position: string;
  status: "success" | "failed" | "flagged";
  ip_address?: string;
}

interface PositionStats {
  position: string;
  totalVotes: number;
  candidates: {
    name: string;
    votes: number;
    percentage: number;
    photoUrl: string;
  }[];
}

interface FraudAlert {
  id: string;
  type: "duplicate_vote" | "suspicious_pattern" | "rapid_voting" | "location_anomaly";
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: string;
  resolved: boolean;
}

const PositionIcon = ({ position, className }: { position: string; className: string }) => {
  // Add a check to ensure position is a string
  if (typeof position !== 'string') {
    // Return a default icon or null if position is not a string
    return <Vote className={className} />;
  }

  switch (position.toLowerCase()) {
    case "president":
      return <Crown className={className} />;
    case "vice president":
      return <Shield className={className} />;
    case "secretary":
      return <BookUser className={className} />;
    case "treasurer":
      return <Landmark className={className} />;
    default:
      return <Vote className={className} />;
  }
};

const MonitorElection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getElectionById } = useElections();
  const [election, setElection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [realtimeVotes, setRealtimeVotes] = useState<VoteActivity[]>([]);
  const [positionStats, setPositionStats] = useState<PositionStats[]>([]);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [turnoutData, setTurnoutData] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "success" | "flagged">("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [stats, setStats] = useState({
    totalVotes: 0,
    totalVoters: 0,
    turnoutPercentage: 0,
    votingRate: 0,
    activeAlerts: 0,
  });

  useEffect(() => {
    if (id) {
      const foundElection = getElectionById(id);
      if (foundElection) {
        setElection(foundElection);
        loadMockDataForElection(foundElection);
      }
      setLoading(false);
      // In a real app, you would also setup realtime subscriptions here
    } else {
      setLoading(false);
    }
  }, [id, getElectionById]);

  const loadMockDataForElection = (currentElection: any) => {
    // Define default positions to use if the election has none
    const defaultPositions = [
      { name: "President", description: "" },
      { name: "Vice President", description: "" },
      { name: "Secretary", description: "" },
      { name: "Treasurer", description: "" },
    ];

    const positionsToMock =
      currentElection?.positions && currentElection.positions.length > 0
        ? currentElection.positions
        : defaultPositions;

    // Mock data generation based on the election positions
    const mockVotes: VoteActivity[] = [
      { id: "1", timestamp: new Date(Date.now() - 2000).toISOString(), voter_name: "Student #2341", position: "President", status: "success" },
      { id: "2", timestamp: new Date(Date.now() - 5000).toISOString(), voter_name: "Student #1456", position: "Vice President", status: "success" },
      { id: "3", timestamp: new Date(Date.now() - 8000).toISOString(), voter_name: "Student #0987", position: "Secretary", status: "flagged", ip_address: "192.168.1.1" },
      { id: "4", timestamp: new Date(Date.now() - 12000).toISOString(), voter_name: "Student #3421", position: "President", status: "success" },
      { id: "5", timestamp: new Date(Date.now() - 15000).toISOString(), voter_name: "Student #5678", position: "Treasurer", status: "success" },
    ];
    setRealtimeVotes(mockVotes);

    const mockPositions: PositionStats[] = positionsToMock.map((pos: any) => {
      const candidates = [
        { name: "John Smith", photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pos.name}John`, votes: Math.floor(Math.random() * 1000) + 200, percentage: 0 },
        { name: "Sarah Johnson", photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pos.name}Sarah`, votes: Math.floor(Math.random() * 1000) + 150, percentage: 0 },
        { name: "Mike Davis", photoUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${pos.name}Mike`, votes: Math.floor(Math.random() * 500) + 50, percentage: 0 },
      ];
      const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
      candidates.forEach(c => c.percentage = parseFloat(((c.votes / totalVotes) * 100).toFixed(1)));

      return {
        position: pos.name,
        totalVotes,
        candidates,
      };
    });
    setPositionStats(mockPositions);

    const mockAlerts: FraudAlert[] = [
      { id: "1", type: "suspicious_pattern", severity: "medium", message: "Multiple votes from same IP address detected", timestamp: new Date(Date.now() - 300000).toISOString(), resolved: false },
      { id: "2", type: "rapid_voting", severity: "low", message: "Unusually fast voting pattern from Student #0987", timestamp: new Date(Date.now() - 600000).toISOString(), resolved: true },
    ];
    setFraudAlerts(mockAlerts);

    const mockTurnout = [
      { time: "8:00", votes: 145, cumulative: 145 },
      { time: "9:00", votes: 234, cumulative: 379 },
      { time: "10:00", votes: 312, cumulative: 691 },
      { time: "11:00", votes: 289, cumulative: 980 },
      { time: "12:00", votes: 198, cumulative: 1178 },
      { time: "13:00", votes: 223, cumulative: 1401 },
      { time: "14:00", votes: 267, cumulative: 1668 },
      { time: "15:00", votes: 166, cumulative: 1834 },
    ];
    setTurnoutData(mockTurnout);

    const totalVotes = mockPositions.reduce((acc, p) => acc + p.totalVotes, 0);
    const totalVoters = 2500;
    setStats({
      totalVotes: totalVotes,
      totalVoters: totalVoters,
      turnoutPercentage: parseFloat(((totalVotes / totalVoters) * 100).toFixed(1)),
      votingRate: 145,
      activeAlerts: mockAlerts.filter(a => !a.resolved).length,
    });
  };

  const getTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const filteredVotes = realtimeVotes.filter((vote) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "success") return vote.status === "success";
    if (selectedFilter === "flagged") return vote.status === "flagged";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <AdminLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button 
              onClick={() => navigate("/admin/elections/ongoing")}
              className="p-3 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-gray-200">
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {election?.title}
                </h1>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-white">LIVE</span>
                </div>
              </div>
              <p className="text-gray-600 mt-1 font-medium text-sm sm:text-base">Real-time election monitoring dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex-1 sm:flex-initial ${
                autoRefresh
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${autoRefresh ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Auto Refresh</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 sm:px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:shadow-lg transition-all shadow-md flex-1 sm:flex-initial">
              <Download className="w-5 h-5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-blue-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex-shrink-0">
                <Vote className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Total Votes</p>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                  {stats.totalVotes.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-green-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg flex-shrink-0">
                <Users className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Turnout</p>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent truncate">
                  {stats.turnoutPercentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-purple-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg flex-shrink-0">
                <Activity className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Voting Rate</p>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
                  {stats.votingRate}/hr
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg flex-shrink-0">
                <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Time Left</p>
                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent truncate">
                  5h 23m
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all border border-red-100">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`p-3 sm:p-4 rounded-2xl shadow-lg flex-shrink-0 ${
                stats.activeAlerts > 0
                  ? "bg-gradient-to-br from-red-500 to-red-600"
                  : "bg-gradient-to-br from-gray-300 to-gray-400"
              }`}>
                <AlertTriangle className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Alerts</p>
                <p className={`text-2xl sm:text-3xl font-bold truncate ${
                  stats.activeAlerts > 0
                    ? "bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent"
                    : "text-gray-400"
                }`}>
                  {stats.activeAlerts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Voter Turnout Over Time</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={turnoutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Total Votes"
                  dot={{ fill: "#3B82F6", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <Vote className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Votes by Position</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={positionStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="position" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.75rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="totalVotes" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Real-time Activity & Alerts */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Live Vote Activity</h3>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-1 sm:flex-initial ${
                    selectedFilter === "all"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedFilter("success")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-1 sm:flex-initial ${
                    selectedFilter === "success"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Success
                </button>
                <button
                  onClick={() => setSelectedFilter("flagged")}
                  className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex-1 sm:flex-initial ${
                    selectedFilter === "flagged"
                      ? "bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Flagged
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {filteredVotes.map((vote) => (
                <div
                  key={vote.id}
                  className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl transition-all ${
                    vote.status === "flagged"
                      ? "bg-red-50 border-2 border-red-200 shadow-sm"
                      : "bg-gray-50 border border-gray-200 hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {vote.status === "success" ? (
                      <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      </div>
                    ) : (
                      <div className="p-2 bg-red-100 rounded-full flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-gray-900 text-base sm:text-lg truncate">{vote.voter_name}</p>
                      <p className="text-sm text-gray-600 font-medium">Voted for {vote.position}</p>
                      {vote.ip_address && (
                        <p className="text-xs text-red-600 font-semibold mt-1">IP: {vote.ip_address}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold bg-gray-200 px-3 py-1 rounded-full self-end sm:self-auto flex-shrink-0">
                    {getTimeAgo(vote.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Security Alerts</h3>
              </div>
            </div>

            <div className="space-y-3">
              {fraudAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border-2 shadow-sm ${
                    alert.severity === "high"
                      ? "bg-red-50 border-red-300"
                      : alert.severity === "medium"
                      ? "bg-orange-50 border-orange-300"
                      : "bg-yellow-50 border-yellow-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
                        alert.severity === "high"
                          ? "bg-red-200 text-red-800"
                          : alert.severity === "medium"
                          ? "bg-orange-200 text-orange-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {alert.severity}
                    </span>
                    {alert.resolved ? (
                      <div className="p-1 bg-green-100 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="p-1 bg-red-100 rounded-full">
                        <XCircle className="w-5 h-5 text-red-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-600 font-semibold">{getTimeAgo(alert.timestamp)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Position Details */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Vote className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Position Breakdown</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {positionStats.map((position, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <PositionIcon position={position.position} className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-xl">{position.position}</h4>
                  </div>
                  <span className="text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full shadow-md">
                    {position.totalVotes.toLocaleString()} votes
                  </span>
                </div>
                <div className="space-y-4">
                  {position.candidates.map((candidate, cIdx) => (
                    <div key={cIdx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={candidate.photoUrl}
                            alt={candidate.name}
                            className="w-12 h-12 rounded-full border-4 border-blue-100 shadow-md"
                          />
                          <span className="text-base font-bold text-gray-900">{candidate.name}</span>
                        </div>
                        <span className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {candidate.votes.toLocaleString()} ({candidate.percentage}%)
                        </span>
                      </div>
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-md transition-all duration-500"
                          style={{ width: `${candidate.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
};

export default MonitorElection;