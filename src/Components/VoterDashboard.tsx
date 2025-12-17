import React, { useRef } from 'react';
import {
  Vote,
  Clock,
  CheckCircle2,
  Calendar,
  TrendingUp,
  Award,
  ArrowRight,
  BarChart3,
  PanelsTopLeft,
  ChartColumnBig,
  User,
  Zap,
  Sparkles,
  Activity,
  Shield,
  Target,
  Bell,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useElections } from '../Context/ElectionContext';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '../utils/useOnClickOutside';

const VoterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { elections } = useElections();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(menuRef, () => setMenuOpen(false));

  // ===== CALCULATE REAL STATS =====
  const now = new Date();
  const activeElectionsList = elections.filter(e => {
    const start = new Date(e.voting_start_date);
    const end = new Date(e.voting_end_date);
    return start <= now && now <= end;
  });

  const upcomingElections = elections.filter(e => {
    const start = new Date(e.voting_start_date);
    return now < start;
  });

  // const completedElections = elections.filter(e => {
  //   const end = new Date(e.voting_end_date);
  //   return now > end;
  // });

  const stats = [
    {
      id: 1,
      label: 'Active Elections',
      value: activeElectionsList.length.toString(),
      subtext: 'Ready for your vote',
      icon: <Vote className="w-5 h-5" />,
      color: 'blue',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconColor: 'text-white',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      label: 'Total Elections',
      value: elections.length.toString(),
      subtext: 'All time',
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'green',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/20',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
      iconColor: 'text-white',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      id: 3,
      label: 'Upcoming',
      value: upcomingElections.length.toString(),
      subtext: 'Coming soon',
      icon: <Clock className="w-5 h-5" />,
      color: 'purple',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      iconColor: 'text-white',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      id: 4,
      label: 'Positions',
      value: elections.reduce((sum, e) => sum + (e.positions?.length || 0), 0).toString(),
      subtext: 'Available to vote',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'orange',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20',
      iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
      iconColor: 'text-white',
      gradient: 'from-amber-500 to-orange-500',
    },
  ];

  // Prepare active elections for display
  const activeElections = activeElectionsList.slice(0, 3).map((election) => {
    const endDate = new Date(election.voting_end_date);
    const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    return {
      id: election.id,
      title: election.title,
      description: election.description || 'No description available',
      positions: election.positions?.length || 0,
      deadline: new Date(election.voting_end_date).toLocaleDateString(),
      timeLeft: hoursLeft < 24 ? `${hoursLeft} hours left` : `${daysLeft} days left`,
      voted: false, // This should come from user's voting history
      voters: election.voters || 0,
      gradient: 'from-blue-500 to-cyan-500',
    };
  });

  const recentVotes = [
    {
      id: 1,
      title: 'Library Committee Elections',
      date: '2024-10-28',
      status: 'Completed',
      result: 'Your candidates won!',
      icon: <Shield className="w-5 h-5" />,
      color: 'emerald',
    },
    {
      id: 2,
      title: 'Cultural Week Coordinator',
      date: '2024-10-15',
      status: 'Completed',
      result: 'Results announced',
      icon: <Target className="w-5 h-5" />,
      color: 'blue',
    },
  ];

  return (
    <div className="space-y-8 pb-24">
      
      {/* ===== WELCOME SECTION ===== */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-emerald-500/5 to-purple-500/5 dark:from-blue-500/10 dark:via-emerald-500/10 dark:to-purple-500/10" />
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-5 dark:opacity-10" />
        
        <div className="relative p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {user?.fullName.split(' ')[0]}!
                  </span>
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl">
                Your voice matters! {activeElectionsList.length > 0 
                  ? `You have ${activeElectionsList.length} active election${activeElectionsList.length !== 1 ? 's' : ''} waiting for your vote.`
                  : 'Stay tuned for upcoming elections.'}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Award className="w-4 h-4" />
                  <span>
                    Voter since {new Date(user?.createdAt || new Date()).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800">
                  <Activity className="w-4 h-4" />
                  <span>Voting streak: 3 elections</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate("/voter/elections")} 
              className="group relative shrink-0"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                <Vote className="w-5 h-5" />
                <span className="text-lg">Cast Your Vote</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group relative"
          >
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
            
            <div className="relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl hover:border-transparent transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                    <div className={stat.iconColor}>
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${stat.bgColor}`}>
                  <span className="text-xs font-bold">
                    {stat.id === 1 && '🔥'}
                    {stat.id === 2 && '📊'}
                    {stat.id === 3 && '⏰'}
                    {stat.id === 4 && '🎯'}
                  </span>
                </div>
              </div>

              <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>

              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {stat.subtext}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                    style={{ 
                      width: `${Math.min(100, parseInt(stat.value) * 10)}%`,
                      animation: 'pulse 2s ease-in-out infinite'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ACTIVE ELECTIONS ===== */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <Vote className="w-5 h-5 text-white" />
              </div>
              Active Elections
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Click on any election to cast your vote
            </p>
          </div>
          <button 
            onClick={() => navigate("/voter/elections")}
            className="group flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            View All Elections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {activeElections.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeElections.map((election) => (
              <div
                key={election.id}
                className="group relative"
              >
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${election.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                
                <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  
                  {/* Status Banner */}
                  <div className={`px-6 py-3 bg-gradient-to-r ${election.voted ? 'from-emerald-500 to-green-500' : 'from-orange-500 to-amber-500'}`}>
                    <div className="flex items-center justify-between text-white font-medium">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${election.voted ? 'bg-white' : 'bg-white animate-pulse'}`} />
                        <span className="text-sm">
                          {election.voted ? 'Voted ✓' : 'Voting Open'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{election.timeLeft}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {election.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 flex-1">
                      {election.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{election.positions}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Positions</p>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                          {(election.voters / 1000).toFixed(1)}K
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Voters</p>
                      </div>
                    </div>

                    {/* Deadline */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                      <Calendar className="w-4 h-4" />
                      <span>Ends {election.deadline}</span>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      {!election.voted ? (
                        <button
                          onClick={() => navigate(`/voter/elections/${election.id}`)}
                          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Vote className="w-5 h-5" />
                          <span className="truncate">Cast Your Vote</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => navigate(`/voter/results/${election.id}`)}
                          className="w-full border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <BarChart3 className="w-5 h-5" />
                          View Results
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No Active Elections
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              There are currently no active elections. Check back soon for upcoming voting opportunities!
            </p>
          </div>
        )}
      </div>

      {/* ===== QUICK ACCESS & RECENT ACTIVITY ===== */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* ===== QUICK ACTIONS ===== */}
        <div className="lg:col-span-1">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500">
                <Zap className="w-4 h-4 text-white" />
              </div>
              Quick Actions
            </h2>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate("/voter/elections")}
                className="group w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                  <Vote className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">Vote Now</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cast your vote in active elections</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => navigate("/voter/applications")}
                className="group w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30">
                  <PanelsTopLeft className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">My Applications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Track your candidate applications</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => navigate("/voter/results")}
                className="group w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30">
                  <ChartColumnBig className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">View Results</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">See election outcomes</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => navigate("/voter/profile")}
                className="group w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300 flex items-center gap-4"
              >
                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30">
                  <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900 dark:text-white">My Profile</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Update your preferences</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* ===== RECENT ACTIVITY ===== */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  Recent Voting Activity
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  Your voting history and election participation
                </p>
              </div>
              <button 
                onClick={() => navigate("/voter/my-votes")}
                className="group flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="space-y-4">
              {recentVotes.map((vote) => (
                <div
                  key={vote.id}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-300" />
                  
                  <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          vote.color === 'emerald' ? 'from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30' :
                          'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30'
                        }`}>
                          <div className={`${
                            vote.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' :
                            'text-blue-600 dark:text-blue-400'
                          }`}>
                            {vote.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                            {vote.title}
                          </h4>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              <span>{vote.date}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400`}>
                              {vote.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {vote.result}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-blue-500 hover:border-blue-400 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upcoming Election Alert */}
              {upcomingElections.length > 0 && (
                <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        Election Alert
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {upcomingElections.length} upcoming election{upcomingElections.length !== 1 ? 's' : ''} will start soon. Stay tuned!
                      </p>
                    </div>
                    <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                      Set Reminder
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <div className="fixed bottom-8 right-8 z-50">
        <div ref={menuRef} className="relative">
          {/* Menu Items */}
          <div 
            className={`absolute bottom-24 right-0 flex flex-col gap-3 transition-all duration-500 ease-out ${
              menuOpen 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <button
              onClick={() => { setMenuOpen(false); navigate("/voter/elections"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-blue-500 text-blue-600 dark:text-blue-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Vote className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">Vote Now</span>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); navigate("/voter/applications"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-purple-500 text-purple-600 dark:text-purple-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <PanelsTopLeft className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">Applications</span>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); navigate("/voter/results"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                  <ChartColumnBig className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">View Results</span>
              </div>
            </button>

            <button
              onClick={() => { setMenuOpen(false); navigate("/voter/profile"); }}
              className="group/item relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition duration-300" />
              <div className="relative flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-amber-500 text-amber-600 dark:text-amber-400 pl-5 pr-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm whitespace-nowrap">My Profile</span>
              </div>
            </button>
          </div>

          {/* Main FAB Button */}
          <div className="group relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 animate-pulse group-hover:animate-none transition duration-500" />
            <button 
              onClick={() => setMenuOpen((s) => !s)} 
              className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 active:scale-95 transition-all duration-300"
            >
              <Zap className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterDashboard;