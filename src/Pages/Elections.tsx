import React, { useState, useMemo } from 'react';
import {
  Vote,
  Clock,
  Calendar,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Search,
  Filter,
  Award,
  Sparkles,
  Users,
  Target,
  ChevronRight,
  Loader,
  Shield,
  Trophy,
  Activity,
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useElections } from '../Context/ElectionContext';
// import type { Election } from '../Context/ElectionContext';

type ElectionStatus = 'all' | 'active' | 'upcoming' | 'completed';

const AllElectionsPage: React.FC = () => {
  const { elections, loading } = useElections();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ElectionStatus>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const processedElections = useMemo(() => {
    return elections.map(e => {
      const now = new Date();
      const startDate = new Date(e.voting_start_date);
      const endDate = new Date(e.voting_end_date);
      const appStartDate = new Date(e.application_start_date);
      const appEndDate = new Date(e.application_end_date);
      
      let status: 'active' | 'upcoming' | 'completed' = 'upcoming';
      if (now >= startDate && now <= endDate) {
        status = 'active';
      } else if (now > endDate) {
        status = 'completed';
      }

      // Calculate time left/ago
      const timeDiff = status === 'active' 
        ? endDate.getTime() - now.getTime()
        : status === 'upcoming'
        ? startDate.getTime() - now.getTime()
        : now.getTime() - endDate.getTime();
      
      const days = Math.floor(Math.abs(timeDiff) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((Math.abs(timeDiff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const timeLeft = status === 'active' 
        ? days > 0 ? `${days} days left` : `${hours} hours left`
        : status === 'upcoming'
        ? days > 0 ? `Starts in ${days} days` : `Starts in ${hours} hours`
        : days > 0 ? `Ended ${days} days ago` : `Ended ${hours} hours ago`;

      // Check if applications are open
      const applicationsOpen = now >= appStartDate && now <= appEndDate;

      return {
        ...e,
        status,
        timeLeft,
        applicationsOpen,
        daysUntilStart: status === 'upcoming' ? days : null,
        daysUntilEnd: status === 'active' ? days : null,
        daysSinceEnd: status === 'completed' ? days : null,
        voted: false, // This should come from user's voting history
        positions: e.positions?.length || 0,
        deadline: e.voting_end_date,
        voters: e.voters || 0,
        gradient: status === 'active' ? 'from-blue-500 to-emerald-500' : 
                 status === 'upcoming' ? 'from-purple-500 to-pink-500' : 
                 'from-slate-500 to-gray-500',
        color: status === 'active' ? 'blue' : 
               status === 'upcoming' ? 'purple' : 'gray'
      };
    });
  }, [elections]);

  // Filter elections
  const filteredElections = processedElections.filter(election => {
    const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         election.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || election.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = [
    {
      label: 'Total Elections',
      value: processedElections.length,
      icon: <Vote className="w-5 h-5" />,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Now',
      value: processedElections.filter(e => e.status === 'active').length,
      icon: <Activity className="w-5 h-5" />,
      color: 'emerald',
      gradient: 'from-emerald-500 to-green-500'
    },
    {
      label: 'Coming Soon',
      value: processedElections.filter(e => e.status === 'upcoming').length,
      icon: <Clock className="w-5 h-5" />,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Completed',
      value: processedElections.filter(e => e.status === 'completed').length,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: 'slate',
      gradient: 'from-slate-500 to-gray-500'
    },
    {
      label: 'Your Votes',
      value: processedElections.filter(e => e.voted).length,
      icon: <Award className="w-5 h-5" />,
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur-xl opacity-60 animate-pulse" />
            <Loader className="relative w-12 h-12 animate-spin text-blue-600 mx-auto" />
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading elections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ===== HERO SECTION ===== */}
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
                    All Elections
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-2xl">
                  Browse, search, and participate in all available elections. 
                  Make your voice heard and shape the future of our community.
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.fullName.split(' ')[0] || 'Guest'}, you have {stats[1].value} active election{stats[1].value !== 1 ? 's' : ''} to vote
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stats[4].value} election{stats[4].value !== 1 ? 's' : ''} voted
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/voter/elections')}
                className="group relative shrink-0"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-all duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                  <Vote className="w-5 h-5" />
                  <span className="text-lg">Explore Elections</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ===== STATS GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />
              
              <div className="relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 hover:shadow-xl hover:border-transparent transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20`}>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                      <div className="text-white">{stat.icon}</div>
                    </div>
                  </div>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20`}>
                    <span className="text-xs font-bold">
                      {index === 0 && '📊'}
                      {index === 1 && '🔥'}
                      {index === 2 && '⏰'}
                      {index === 3 && '✅'}
                      {index === 4 && '⭐'}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                      style={{ 
                        width: `${Math.min(100, (stat.value / stats[0].value) * 100)}%`,
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
        <div className="sticky top-4 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-lg">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search elections by title, description, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {(['all', 'active', 'upcoming', 'completed'] as ElectionStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`
                    px-4 py-2.5 rounded-xl font-semibold text-sm whitespace-nowrap transition-all flex items-center gap-2
                    ${filterStatus === status
                      ? status === 'all' ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                      : status === 'active' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                      : status === 'upcoming' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gradient-to-r from-slate-600 to-gray-600 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }
                  `}
                >
                  {status === 'all' && <Target className="w-4 h-4" />}
                  {status === 'active' && <Activity className="w-4 h-4" />}
                  {status === 'upcoming' && <Clock className="w-4 h-4" />}
                  {status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  <span className={`
                    px-1.5 py-0.5 rounded-full text-xs
                    ${filterStatus === status 
                      ? 'bg-white/20 text-white' 
                      : status === 'all' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : status === 'active' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : status === 'upcoming' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }
                  `}>
                    {status === 'all' ? processedElections.length :
                     status === 'active' ? processedElections.filter(e => e.status === 'active').length :
                     status === 'upcoming' ? processedElections.filter(e => e.status === 'upcoming').length :
                     processedElections.filter(e => e.status === 'completed').length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ELECTIONS DISPLAY ===== */}
        {filteredElections.length === 0 ? (
          <div className="text-center py-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Elections Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              {searchQuery 
                ? `No elections match "${searchQuery}". Try a different search term.`
                : `No ${filterStatus !== 'all' ? filterStatus : ''} elections available at the moment.`}
            </p>
            <button
              onClick={() => { setSearchQuery(''); setFilterStatus('all'); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-100 to-emerald-100 dark:from-blue-900/30 dark:to-emerald-900/30 text-blue-700 dark:text-blue-400 hover:shadow-lg transition-all"
            >
              <ArrowRight className="w-5 h-5" />
              View All Elections
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ===== GRID VIEW ===== */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElections.map((election) => (
              <div key={election.id} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${election.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
                
                <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
                  
                  {/* Status Header */}
                  <div className={`p-4 bg-gradient-to-r ${election.gradient}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg bg-white/20 backdrop-blur-sm`}>
                          {election.status === 'active' && <Activity className="w-4 h-4 text-white" />}
                          {election.status === 'upcoming' && <Clock className="w-4 h-4 text-white" />}
                          {election.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <span className="text-sm font-bold text-white/90">
                          {election.status === 'active' ? 'VOTING NOW' : 
                           election.status === 'upcoming' ? 'COMING SOON' : 'COMPLETED'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        <span>{election.timeLeft}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white line-clamp-2 mb-2">
                      {election.title}
                    </h3>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {election.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                          {election.positions}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Positions</p>
                      </div>
                      <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                          {election.status === 'upcoming' ? 'TBA' : (election.voters / 1000).toFixed(1) + 'K'}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Voters</p>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">Timeline</span>
                      </div>
                      <div className="relative">
                        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${election.gradient} rounded-full`}
                            style={{ 
                              width: election.status === 'completed' ? '100%' : 
                                     election.status === 'active' ? '50%' : '10%'
                            }}
                          />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>Start: {new Date(election.voting_start_date).toLocaleDateString()}</span>
                          <span>End: {new Date(election.voting_end_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Applications Status */}
                    {election.applicationsOpen && (
                      <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                            Applications are open until {new Date(election.application_end_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto">
                      {election.status === 'active' && (
                        <button 
                          onClick={() => navigate(`/voter/elections/${election.id}`)}
                          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3.5 px-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                        >
                          <Vote className="w-5 h-5" />
                          <span>Cast Your Vote</span>
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}

                      {election.status === 'upcoming' && (
                        election.applicationsOpen ? (
                          <button
                            onClick={() => navigate('/voter/applications')}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 px-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                          >
                            <Award className="w-5 h-5" />
                            <span>Apply as Candidate</span>
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                        ) : (
                          <button 
                            disabled
                            className="w-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-400 py-3.5 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-3"
                          >
                            <Clock className="w-5 h-5" />
                            <span>Applications Open Soon</span>
                          </button>
                        )
                      )}

                      {election.status === 'completed' && (
                        <button 
                          onClick={() => navigate(`/voter/results/${election.id}`)}
                          className="w-full border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 py-3.5 rounded-xl font-bold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center justify-center gap-3 group/btn"
                        >
                          <BarChart3 className="w-5 h-5" />
                          <span>View Results</span>
                          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ===== LIST VIEW ===== */
          <div className="space-y-4">
            {filteredElections.map((election) => (
              <div key={election.id} className="group relative">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${election.gradient} rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500`} />
                
                <div className="relative p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Left side - Election Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${election.gradient}`}>
                          {election.status === 'active' && <Activity className="w-5 h-5 text-white" />}
                          {election.status === 'upcoming' && <Clock className="w-5 h-5 text-white" />}
                          {election.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${election.gradient} text-white`}>
                            {election.status.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {election.timeLeft}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {election.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {election.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {election.positions} Position{election.positions !== 1 ? 's' : ''}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-emerald-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {election.voters?.toLocaleString() || 'TBA'} Voters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-purple-500" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Ends {new Date(election.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Action */}
                    <div className="lg:w-48">
                      {election.status === 'active' && (
                        <button 
                          onClick={() => navigate(`/voter/elections/${election.id}`)}
                          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                          <Vote className="w-5 h-5" />
                          Vote Now
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}

                      {election.status === 'upcoming' && election.applicationsOpen && (
                        <button
                          onClick={() => navigate('/voter/applications')}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                          <Award className="w-5 h-5" />
                          Apply Now
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/voter/dashboard')}
            className="flex-1 group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 to-gray-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 text-left flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-800">
                <Shield className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Back to Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return to your main dashboard</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
            </div>
          </button>

          <button 
            onClick={() => navigate('/voter/applications')}
            className="flex-1 group relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 text-left flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                <Trophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Apply for Positions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Become a candidate in upcoming elections</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-2 transition-all" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllElectionsPage;