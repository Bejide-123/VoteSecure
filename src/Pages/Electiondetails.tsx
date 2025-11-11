import React from 'react';
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ElectionDetails: React.FC = () => {
  const navigate = useNavigate();

  // ===== MOCK ELECTION DATA =====
  // In real app, this comes from Firebase via route params
  const election = {
    id: '1',
    title: 'Student Union Elections 2024',
    description: 'Annual elections for Student Union Government positions. Your voice matters - choose leaders who will represent you!',
    startDate: '2024-11-10',
    endDate: '2024-11-15',
    totalVoters: 2847,
    voted: 1234,
    hasVoted: false,
    positions: [
      { id: '1', name: 'President', candidates: 4 },
      { id: '2', name: 'Vice President', candidates: 3 },
      { id: '3', name: 'Secretary General', candidates: 5 },
      { id: '4', name: 'Financial Secretary', candidates: 3 },
      { id: '5', name: 'Director of Sports', candidates: 4 },
      { id: '6', name: 'Director of Socials', candidates: 3 },
      { id: '7', name: 'Public Relations Officer', candidates: 4 },
      { id: '8', name: 'Welfare Officer', candidates: 3 }
    ]
  };

  // Calculate time remaining
  const timeLeft = '3 days, 14 hours';
  const percentage = Math.round((election.voted / election.totalVoters) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* ===== BACK BUTTON ===== */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowRight className="w-5 h-5 rotate-180" />
        <span>Back to Dashboard</span>
      </button>

      {/* ===== HEADER CARD ===== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-2xl" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-green-400 rounded-full blur-3xl opacity-10" />
        
        <div className="relative p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-bold text-sm mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Live Election
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {election.title}
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
            {election.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Positions</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{election.positions.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Voters</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{election.totalVoters.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Time Left</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{timeLeft}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Turnout</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{percentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== VOTING STATUS ===== */}
      {election.hasVoted ? (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                ✅ You've already voted in this election
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Thank you for participating! Your vote has been recorded securely. You can view the results once voting closes.
              </p>
              <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
                View Your Receipt
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Ready to vote?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You'll vote for {election.positions.length} positions. Take your time to review each candidate before making your selection. Once submitted, votes cannot be changed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ===== POSITIONS LIST ===== */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Positions & Candidates
        </h2>

        <div className="grid gap-4">
          {election.positions.map((position, index) => (
            <div
              key={position.id}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                      {position.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {position.candidates} candidates running
                    </p>
                  </div>
                </div>
                
                <Trophy className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== IMPORTANT INFORMATION ===== */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">
              Important Information
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• You can only vote once in this election</li>
              <li>• Your vote is completely anonymous and secure</li>
              <li>• You can skip positions if you don't want to vote for any candidate</li>
              <li>• Review your selections carefully before final submission</li>
              <li>• You'll receive a receipt code to verify your vote was counted</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== START VOTING BUTTON ===== */}
      {!election.hasVoted && (
        <div className="flex justify-center pb-8">
          <button
            onClick={() => navigate(`/voter/elections/${election.id}/vote`)}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition" />
            <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 hover:shadow-2xl transition-all">
              Start Voting
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default ElectionDetails;