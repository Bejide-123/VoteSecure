import React, { useState } from 'react';
import {
  Vote,
  Clock,
  Calendar,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Search,
  Filter,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

type ElectionStatus = 'all' | 'active' | 'upcoming' | 'completed';

interface Election {
  id: string;
  title: string;
  description: string;
  positions: number;
  voters: number;
  deadline: string;
  timeLeft: string;
  status: 'active' | 'upcoming' | 'completed';
  voted: boolean;
}

const AllElectionsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<ElectionStatus>('all');

  // ===== MOCK DATA =====
  const allElections: Election[] = [
    // Active Elections
    {
      id: '1',
      title: 'Student Union Elections 2024',
      description: 'Vote for President, VP, Secretary and other positions',
      positions: 8,
      deadline: '2024-11-15',
      timeLeft: '3 days left',
      status: 'active',
      voted: false,
      voters: 2847
    },
    {
      id: '2',
      title: 'Faculty Representative Elections',
      description: 'Choose your department representatives',
      positions: 4,
      deadline: '2024-11-12',
      timeLeft: '18 hours left',
      status: 'active',
      voted: false,
      voters: 856
    },
    {
      id: '3',
      title: 'Sports Council Elections',
      description: 'Vote for sports committee members',
      positions: 5,
      deadline: '2024-11-20',
      timeLeft: '8 days left',
      status: 'active',
      voted: true,
      voters: 1250
    },
    
    // Upcoming Elections
    {
      id: '4',
      title: 'Cultural Week Coordinators 2025',
      description: 'Select coordinators for next year\'s cultural activities',
      positions: 3,
      deadline: '2024-12-01',
      timeLeft: 'Starts in 15 days',
      status: 'upcoming',
      voted: false,
      voters: 0
    },
    {
      id: '5',
      title: 'Academic Board Representatives',
      description: 'Vote for student representatives on academic board',
      positions: 6,
      deadline: '2024-11-25',
      timeLeft: 'Starts in 10 days',
      status: 'upcoming',
      voted: false,
      voters: 0
    },
    
    // Completed Elections
    {
      id: '6',
      title: 'Library Committee Elections',
      description: 'Elect student representatives for library improvements',
      positions: 4,
      deadline: '2024-10-28',
      timeLeft: 'Ended 14 days ago',
      status: 'completed',
      voted: true,
      voters: 1543
    },
    {
      id: '7',
      title: 'Departmental Representatives Q3',
      description: 'Third quarter departmental leadership elections',
      positions: 12,
      deadline: '2024-10-15',
      timeLeft: 'Ended 27 days ago',
      status: 'completed',
      voted: true,
      voters: 2103
    },
    {
      id: '8',
      title: 'Hostel Block Captains',
      description: 'Choose your hostel block leaders',
      positions: 8,
      deadline: '2024-09-30',
      timeLeft: 'Ended 42 days ago',
      status: 'completed',
      voted: false,
      voters: 987
    }
  ];

  // Filter elections
  const filteredElections = allElections.filter(election => {
    const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         election.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || election.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Stats
  const stats = {
    total: allElections.length,
    active: allElections.filter(e => e.status === 'active').length,
    upcoming: allElections.filter(e => e.status === 'upcoming').length,
    completed: allElections.filter(e => e.status === 'completed').length,
    participated: allElections.filter(e => e.voted).length
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* ===== WELCOME / HERO ===== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-2xl" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-400 to-green-400 rounded-full blur-3xl opacity-10" />

        <div className="relative p-8 rounded-2xl border border-blue-200 dark:border-blue-800 mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Elections</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Browse all active, upcoming, and past elections</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Award className="w-4 h-4" />
                <span>Welcome back{user ? `, ${user.fullName.split(' ')[0]}!` : '!'}</span>
              </div>
            </div>

            <button onClick={() => navigate('/voter/elections')} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
              <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-xl transition-all">
                <Vote className="w-5 h-5" />
                Vote Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* ===== STATS GRID ===== */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.upcoming}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.completed}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.participated}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Participated</p>
        </div>
      </div>

      {/* ===== FILTERS & SEARCH ===== */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search elections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <div className="flex gap-2 overflow-x-auto">
              {(['all', 'active', 'upcoming', 'completed'] as ElectionStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`
                    px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all
                    ${filterStatus === status
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== ELECTIONS GRID ===== */}
      {filteredElections.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElections.map((election) => (
            <div
              key={election.id}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              
              <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                
                {/* Status Banner */}
                <div className={`
                  px-4 py-2
                  ${election.status === 'active' && !election.voted ? 'bg-gradient-to-r from-orange-500 to-red-500' : ''}
                  ${election.status === 'active' && election.voted ? 'bg-green-500' : ''}
                  ${election.status === 'upcoming' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : ''}
                  ${election.status === 'completed' ? 'bg-gray-500' : ''}
                `}>
                  <div className="flex items-center justify-between text-white text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-white ${election.status === 'active' && !election.voted ? 'animate-pulse' : ''}`} />
                      <span>
                        {election.status === 'active' && !election.voted && 'Active Now'}
                        {election.status === 'active' && election.voted && 'Completed'}
                        {election.status === 'upcoming' && 'Coming Soon'}
                        {election.status === 'completed' && 'Ended'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{election.timeLeft}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {election.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {election.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{election.positions}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Positions</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {election.status === 'upcoming' ? 'TBA' : (election.voters / 1000).toFixed(1) + 'K'}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Voters</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {election.status === 'upcoming' ? `Starts ${election.deadline}` : `Ends ${election.deadline}`}
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    {election.status === 'active' && !election.voted && (
                      <button 
                        onClick={() => navigate(`/voter/elections/${election.id}`)}
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Vote className="w-5 h-5" />
                        <span className="truncate">Cast Your Vote</span>
                        <ArrowRight className="w-5 h-5 hidden sm:inline" />
                      </button>
                    )}

                    {election.status === 'active' && election.voted && (
                      <button 
                        onClick={() => navigate(`/voter/elections/${election.id}/results`)}
                        className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <BarChart3 className="w-5 h-5" />
                        View Results
                      </button>
                    )}

                    {election.status === 'upcoming' && (
                      <button 
                        disabled
                        className="w-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 py-3 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <Clock className="w-5 h-5" />
                        Opens Soon
                      </button>
                    )}

                    {election.status === 'completed' && election.voted && (
                      <button 
                        onClick={() => navigate(`/voter/elections/${election.id}/results`)}
                        className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:border-green-500 dark:hover:border-green-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        View Results
                      </button>
                    )}

                    {election.status === 'completed' && !election.voted && (
                      <button 
                        disabled
                        className="w-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 py-3 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <TrendingUp className="w-5 h-5" />
                        Didn't Participate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            No elections found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter
          </p>
        </div>
      )}
    </div>
  );
};

export default AllElectionsPage;