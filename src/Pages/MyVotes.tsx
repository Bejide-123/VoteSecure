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
  FileText,
  Shield,
  Hash,
  Vote,
  Award
} from "lucide-react";
// import VoterLayout from "./VoterLayout";

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
    },
  ];

  const filteredVotes = voteRecords.filter((vote) => {
    const matchesSearch =
      vote.electionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vote.receiptCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || vote.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalVotes: voteRecords.length,
    verifiedVotes: voteRecords.filter((v) => v.status === "verified").length,
    totalPositions: voteRecords.reduce((sum, v) => sum + v.positions, 0),
  };

  const handleVerifyReceipt = () => {
    const found = voteRecords.find(
      (v) => v.receiptCode.toLowerCase() === verifyCode.toLowerCase()
    );
    if (found) {
      setVerifyResult({
        found: true,
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
VOTE RECEIPT
═══════════════════════════════

Election: ${vote.electionTitle}
Receipt Code: ${vote.receiptCode}
Status: ${vote.status.toUpperCase()}
Voted At: ${new Date(vote.votedAt).toLocaleString()}
Organization: ${vote.organization}

Your vote has been successfully recorded and verified.
This receipt confirms your participation in the election.

═══════════════════════════════
VoteSecure - Secure Digital Voting
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
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400";
      case "counted":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              My Votes
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              View your voting history and verify your vote receipts
            </p>
          </div>
          <button
            onClick={() => setVerifyMode(!verifyMode)}
            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            <Shield className="w-5 h-5" />
            Verify Receipt
          </button>
        </div>

        {verifyMode && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  Verify Vote Receipt
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter your receipt code to verify your vote was counted
                </p>
              </div>
              <button
                onClick={() => {
                  setVerifyMode(false);
                  setVerifyResult(null);
                  setVerifyCode("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="VS-2024-XXXXXXXX"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                onClick={handleVerifyReceipt}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Verify
              </button>
            </div>
            {verifyResult && (
              <div
                className={`mt-4 p-4 rounded-xl ${
                  verifyResult.found
                    ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    verifyResult.found
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {verifyResult.message}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Total Votes Cast
              </p>
              <Vote className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.totalVotes}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Across {stats.totalVotes} elections
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Verified Votes
              </p>
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.verifiedVotes}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              100% verification rate
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Positions Voted
              </p>
              <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {stats.totalPositions}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Total positions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search elections or receipt codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="counted">Counted</option>
            </select>
          </div>
        </div>

        {filteredVotes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            <Vote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No votes found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVotes.map((vote) => (
              <div
                key={vote.id}
                className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-green-600">
                        <Vote className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {vote.electionTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                            {vote.electionType}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
                              vote.status
                            )}`}
                          >
                            {vote.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(vote.votedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeAgo(vote.votedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Hash className="w-4 h-4" />
                        <span className="font-mono">{vote.receiptCode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Award className="w-4 h-4" />
                        <span>{vote.positions} positions voted</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => setSelectedVote(vote)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View Receipt
                      </button>
                      <button
                        onClick={() => downloadReceipt(vote)}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedVote && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-2xl w-full my-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-green-600">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      Vote Receipt
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Official voting confirmation
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVote(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-4 rounded-full bg-green-100 dark:bg-green-900/30">
                      <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h4 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Vote Successfully Recorded
                  </h4>
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Your vote has been verified and counted in the election
                  </p>
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Receipt Code
                    </p>
                    <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
                      {selectedVote.receiptCode}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Election
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white text-right">
                      {selectedVote.electionTitle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Organization
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedVote.organization}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Voted At
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {new Date(selectedVote.votedAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Positions
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {selectedVote.positions} positions
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(
                        selectedVote.status
                      )}`}
                    >
                      {selectedVote.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                        Vote Privacy Protected
                      </h5>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Your vote choices remain anonymous. This receipt only confirms
                        your participation, not who you voted for.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => downloadReceipt(selectedVote)}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all"
                >
                  <Download className="w-5 h-5" />
                  Download Receipt
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