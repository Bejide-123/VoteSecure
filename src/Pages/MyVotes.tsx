import React, { useState } from "react";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Download,
  Eye,
  X,
  Search,
  Filter,
  Shield,
  Hash,
  Vote,
  Award,
  Sparkles,
  Users,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Verified,
  Lock,
  Receipt,
  Trophy,
  Activity,
  Zap,
} from "lucide-react";

interface VoteRecord {
  id: string;
  electionId: string;
  electionTitle: string;
  electionType: string;
  votedAt: string;
  receiptCode: string;
  status: "verified" | "pending" | "counted";
  positions: number;
  electionDate: string;
  organization: string;
  turnout?: number;
  candidates?: number;
}

const MyVotes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedVote, setSelectedVote] = useState<VoteRecord | null>(null);
  const [verifyMode, setVerifyMode] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [verifyResult, setVerifyResult] = useState<{
    found: boolean;
    message: string;
    vote?: VoteRecord;
  } | null>(null);

  const voteRecords: VoteRecord[] = [
    {
      id: "1",
      electionId: "sug-2024",
      electionTitle: "Student Union Government Elections 2024",
      electionType: "General Election",
      votedAt: "2024-11-10T14:30:00",
      receiptCode: "VS-2024-A3F8G9H2",
      status: "verified",
      positions: 5,
      electionDate: "2024-11-10",
      organization: "University of Lagos",
      turnout: 75,
      candidates: 8
    },
    {
      id: "2",
      electionId: "cs-rep-2024",
      electionTitle: "Computer Science Department Representative",
      electionType: "Departmental Election",
      votedAt: "2024-10-25T11:15:00",
      receiptCode: "VS-2024-B7K2M5N8",
      status: "verified",
      positions: 3,
      electionDate: "2024-10-25",
      organization: "University of Lagos",
      turnout: 82,
      candidates: 5
    },
    {
      id: "3",
      electionId: "sports-2024",
      electionTitle: "Sports Council Elections",
      electionType: "Council Election",
      votedAt: "2024-09-15T16:45:00",
      receiptCode: "VS-2024-C9P4Q1R6",
      status: "verified",
      positions: 4,
      electionDate: "2024-09-15",
      organization: "University of Lagos",
      turnout: 68,
      candidates: 6
    },
    {
      id: "4",
      electionId: "library-2024",
      electionTitle: "Library Committee Elections",
      electionType: "Committee Election",
      votedAt: "2024-08-20T09:20:00",
      receiptCode: "VS-2024-D2R4T6Y8",
      status: "verified",
      positions: 2,
      electionDate: "2024-08-20",
      organization: "University of Lagos",
      turnout: 65,
      candidates: 3
    },
    {
      id: "5",
      electionId: "cultural-2024",
      electionTitle: "Cultural Week Coordinator",
      electionType: "Special Election",
      votedAt: "2024-07-05T13:45:00",
      receiptCode: "VS-2024-E1U3O5I9",
      status: "verified",
      positions: 1,
      electionDate: "2024-07-05",
      organization: "University of Lagos",
      turnout: 71,
      candidates: 4
    },
    {
      id: "6",
      electionId: "hostel-2024",
      electionTitle: "Hostel Representative Elections",
      electionType: "Hall Election",
      votedAt: "2024-06-12T15:30:00",
      receiptCode: "VS-2024-F0P8L2K4",
      status: "verified",
      positions: 6,
      electionDate: "2024-06-12",
      organization: "University of Lagos",
      turnout: 88,
      candidates: 10
    },
  ];

  const filteredVotes = voteRecords.filter((vote) => {
    const matchesSearch =
      vote.electionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vote.receiptCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vote.electionType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || vote.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: "Total Votes Cast",
      value: voteRecords.length,
      icon: <Vote className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      subtext: "Across all elections"
    },
    {
      label: "Verified Votes",
      value: voteRecords.filter((v) => v.status === "verified").length,
      icon: <Verified className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      subtext: "100% verification rate"
    },
    {
      label: "Positions Voted",
      value: voteRecords.reduce((sum, v) => sum + v.positions, 0),
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      subtext: "Total positions"
    },
    {
      label: "Average Turnout",
      value: `${Math.round(voteRecords.reduce((sum, v) => sum + (v.turnout || 0), 0) / voteRecords.length)}%`,
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />,
      color: "amber",
      gradient: "from-amber-500 to-orange-500",
      subtext: "Across elections"
    }
  ];

  const handleVerifyReceipt = () => {
    const found = voteRecords.find(
      (v) => v.receiptCode.toLowerCase() === verifyCode.toLowerCase()
    );
    if (found) {
      setVerifyResult({
        found: true,
        vote: found,
        message: `✅ Vote verified! Your vote in "${found.electionTitle}" was successfully recorded and counted.`,
      });
    } else {
      setVerifyResult({
        found: false,
        message: "❌ Receipt code not found. Please check the code and try again.",
      });
    }
  };

  const downloadReceipt = (vote: VoteRecord) => {
    const receiptText = `
╔══════════════════════════════════╗
║         VOTE SECURE              ║
║       OFFICIAL RECEIPT           ║
╚══════════════════════════════════╝

📅 Election Date: ${new Date(vote.votedAt).toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
🕒 Voting Time: ${new Date(vote.votedAt).toLocaleTimeString()}

🏛️  Election: ${vote.electionTitle}
📋 Type: ${vote.electionType}
🏢 Organization: ${vote.organization}

🎯 Positions Voted: ${vote.positions}
📈 Voter Turnout: ${vote.turnout}%
👥 Total Candidates: ${vote.candidates}

🔐 Receipt Code: ${vote.receiptCode}
✅ Status: ${vote.status.toUpperCase()}
📝 Verified: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
YOUR VOTE HAS BEEN SUCCESSFULLY
RECORDED AND COUNTED.

🔒 Privacy Note: Your individual voting choices
    remain confidential and anonymous.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated: ${new Date().toLocaleString()}
System: VoteSecure v2.0
    `;

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Vote_Receipt_${vote.receiptCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
      case "pending":
        return "bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800";
      case "counted":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
      default:
        return "bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-900/30 dark:to-gray-900/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800";
    }
  };

  const getTimeAgo = (date: string): string => {
    const diffMs = new Date().getTime() - new Date(date).getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <Verified className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "pending":
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      case "counted":
        return <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />;
      default:
        return <Shield className="w-3 h-3 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* ===== HERO SECTION ===== */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-emerald-500/10 dark:to-purple-500/10" />
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-5 dark:opacity-10" />
          
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    My Voting History
                  </h1>
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
                  Track all your votes, verify receipts, and maintain a complete record of your democratic participation. 
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {voteRecords.length} elections
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                    <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      Last: {getTimeAgo(voteRecords[0].votedAt)}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setVerifyMode(!verifyMode)}
                className="group relative shrink-0 mt-4 lg:mt-0 w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl sm:rounded-2xl blur opacity-70 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold flex items-center justify-center sm:justify-start gap-2 sm:gap-3 hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg w-full">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base md:text-lg">Verify Receipt</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 sm:group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ===== VERIFY MODAL ===== */}
        {verifyMode && (
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10" />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex-1 pr-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500">
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    Verify Vote Receipt
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Enter your receipt code to verify your vote was counted and recorded securely
                  </p>
                </div>
                <button
                  onClick={() => {
                    setVerifyMode(false);
                    setVerifyResult(null);
                    setVerifyCode("");
                  }}
                  className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg sm:rounded-xl transition-colors shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter receipt code..."
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono"
                  />
                </div>

                <button
                  onClick={handleVerifyReceipt}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group/btn"
                >
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Verify Receipt</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 sm:group-hover/btn:translate-x-2 transition-transform" />
                </button>

                {verifyResult && (
                  <div className={`p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all duration-500 ${verifyResult.found ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20' : 'border-rose-500 bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20'}`}>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-lg ${verifyResult.found ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                        {verifyResult.found ? <Verified className="w-4 h-4 sm:w-6 sm:h-6 text-white" /> : <X className="w-4 h-4 sm:w-6 sm:h-6 text-white" />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-base sm:text-lg mb-1 ${verifyResult.found ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                          {verifyResult.found ? 'Vote Verified!' : 'Receipt Not Found'}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2 sm:mb-3">
                          {verifyResult.message}
                        </p>
                        {verifyResult.found && verifyResult.vote && (
                          <div className="p-2 sm:p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                              {verifyResult.vote.electionTitle}
                            </p>
                            <div className="flex items-center gap-1 sm:gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span className="truncate">Voted {new Date(verifyResult.vote.votedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-1">
                        How Verification Works
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Your receipt code confirms your vote was recorded in the secure voting ledger without revealing your choices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
              
              <div className="relative h-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 sm:p-4 md:p-6 hover:shadow-md sm:hover:shadow-xl hover:border-transparent transition-all duration-300">
                <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                  <div className={`p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20`}>
                    <div className={`p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                      <div className="text-white">{stat.icon}</div>
                    </div>
                  </div>
                  <div className={`h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20`}>
                    <span className="text-xs">
                      {index === 0 && '📊'}
                      {index === 1 && '✅'}
                      {index === 2 && '🎯'}
                      {index === 3 && '📈'}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mb-0.5 truncate">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                  {stat.subtext}
                </p>

                <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                      style={{ 
                        width: `${Math.min(100, index === 0 ? 100 : index === 1 ? 100 : index === 2 ? 85 : 72)}%`,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ===== FILTERS & SEARCH ===== */}
        <div className="sticky top-2 sm:top-4 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-lg">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search votes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" />
              <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                {['all', 'verified', 'pending', 'counted'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`
                      px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl font-medium sm:font-semibold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-1 sm:gap-2 shrink-0
                      ${filterStatus === status
                        ? status === 'all' ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow'
                        : status === 'verified' ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow'
                        : status === 'pending' ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    {status === 'all' && <Receipt className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {status === 'verified' && <Verified className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {status === 'pending' && <Clock className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {status === 'counted' && <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />}
                    <span className="hidden xs:inline">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    <span className="text-xs sm:text-sm">
                      {status === 'all' ? voteRecords.length :
                       status === 'verified' ? voteRecords.filter(v => v.status === 'verified').length :
                       status === 'pending' ? voteRecords.filter(v => v.status === 'pending').length :
                       voteRecords.filter(v => v.status === 'counted').length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== VOTE RECORDS ===== */}
        {filteredVotes.length === 0 ? (
          <div className="text-center py-8 sm:py-12 md:py-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              No Votes Found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4 sm:mb-6 md:mb-8 px-4">
              {searchQuery 
                ? `No voting records match "${searchQuery}". Try a different search term.`
                : `No ${filterStatus !== 'all' ? filterStatus : ''} voting records available.`}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg sm:rounded-xl font-semibold bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 text-blue-700 dark:text-blue-400 hover:shadow transition-all text-sm sm:text-base"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              View All Votes
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredVotes.map((vote) => (
              <div key={vote.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-10 sm:group-hover:opacity-20 transition duration-500" />
                
                <div className="relative p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md sm:hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4 md:gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
                        <div className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 shrink-0">
                          <Vote className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                            <span className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${getStatusColor(vote.status)}`}>
                              {getStatusIcon(vote.status)}
                              <span className="hidden xs:inline">{vote.status.charAt(0).toUpperCase() + vote.status.slice(1)}</span>
                              <span className="xs:hidden">{vote.status.charAt(0).toUpperCase()}</span>
                            </span>
                            <span className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 truncate max-w-[100px] sm:max-w-none">
                              {vote.electionType}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                              {getTimeAgo(vote.votedAt)}
                            </span>
                          </div>
                          
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5 sm:mb-2 line-clamp-2">
                            {vote.electionTitle}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4">
                            <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Date</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                  {new Date(vote.votedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                              <Award className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Positions</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {vote.positions}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600 dark:text-purple-400" />
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Turnout</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {vote.turnout}%
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                              <Hash className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
                              <div className="min-w-0">
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Receipt</p>
                                <p className="text-xs sm:text-sm font-mono font-medium text-gray-900 dark:text-white truncate">
                                  {vote.receiptCode.slice(0, 8)}...
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex gap-2 lg:w-auto lg:flex-col lg:gap-2">
                      <button
                        onClick={() => setSelectedVote(vote)}
                        className="flex-1 lg:flex-none group/btn flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">View</span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 transition-transform hidden sm:inline" />
                      </button>
                      <button
                        onClick={() => downloadReceipt(vote)}
                        className="flex-1 lg:flex-none group/btn flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate">Save</span>
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/btn:opacity-100 transition-all hidden sm:inline" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== SELECTED VOTE MODAL ===== */}
        {selectedVote && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-3 md:p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar shadow-2xl mx-2 sm:mx-4">
              {/* Header */}
              <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8">
                <div className="flex items-center gap-2 sm:gap-3 pr-4">
                  <div className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                    <Receipt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 truncate">
                      Vote Receipt Details
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      Official confirmation of your vote
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVote(null)}
                  className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg sm:rounded-xl transition-colors shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                {/* Verification Badge */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10" />
                  <div className="relative p-3 sm:p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg sm:rounded-xl md:rounded-2xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-2 sm:p-3 md:p-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 mb-2 sm:mb-3 md:mb-4">
                        <Verified className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                      </div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-1.5 sm:mb-2">
                        Vote Successfully Verified
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 sm:mb-4">
                        Your vote has been recorded, verified, and counted in the official results.
                      </p>
                      <div className="bg-white/50 dark:bg-slate-800/50 p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl w-full max-w-md">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Receipt Code</p>
                        <p className="text-lg sm:text-xl md:text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-wider break-all">
                          {selectedVote.receiptCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Election Details */}
                <div className="grid md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Vote className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Election</h5>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base mb-1">
                      {selectedVote.electionTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {selectedVote.electionType}
                    </p>
                  </div>

                  <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h5 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Organization</h5>
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base mb-1">
                      {selectedVote.organization}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 text-xs sm:text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Turnout: {selectedVote.turnout}%
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        Candidates: {selectedVote.candidates}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vote Details Grid */}
                <div className="grid md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Voting Date</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {new Date(selectedVote.votedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Voting Time</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {new Date(selectedVote.votedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Positions Voted</span>
                      <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                        {selectedVote.positions} position{selectedVote.positions !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 rounded-lg sm:rounded-xl">
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Status</span>
                      <span className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold ${getStatusColor(selectedVote.status)}`}>
                        {selectedVote.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Privacy Note */}
                <div className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mb-1">
                        Privacy & Security
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        This receipt confirms your participation in the election. Your individual voting choices remain anonymous and are not recorded in this receipt.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => downloadReceipt(selectedVote)}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group/btn text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download Official Receipt
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 sm:group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVotes;