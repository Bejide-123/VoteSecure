import React from 'react';
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
} from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useElections } from '../Context/ElectionContext';
import { useNavigate } from 'react-router-dom';

const VoterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { elections } = useElections();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // ===== CALCULATE REAL STATS =====
  const now = new Date();
  const activeCount = elections.filter(e => {
    const appEnd = new Date(e.application_end_date);
    return now <= appEnd;
  }).length;

  const upcomingCount = elections.filter(e => {
    const appStart = new Date(e.application_start_date);
    return now < appStart;
  }).length;

  const stats = [
    {
      id: 1,
      label: 'Active Elections',
      value: activeCount.toString(),
      subtext: 'Vote now!',
      icon: <Vote className="w-6 h-6" />,
      color: 'blue',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 2,
      label: 'Total Elections',
      value: elections.length.toString(),
      subtext: 'All time',
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: 'green',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 3,
      label: 'Upcoming Elections',
      value: upcomingCount.toString(),
      subtext: 'Coming soon',
      icon: <Clock className="w-6 h-6" />,
      color: 'purple',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 4,
      label: 'Total Positions',
      value: elections.reduce((sum, e) => sum + (e.positions?.length || 0), 0).toString(),
      subtext: 'Available',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'orange',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const activeElections = elections.slice(0, 3).map((election) => {
    const now = new Date();
    const appEnd = new Date(election.application_end_date);
    const daysLeft = Math.ceil((appEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const hours = Math.ceil((appEnd.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    return {
      id: election.id,
      title: election.title,
      description: election.description,
      positions: election.positions?.length || 0,
      deadline: new Date(election.application_end_date).toLocaleDateString(),
      timeLeft: hours < 24 ? `${hours} hours left` : `${daysLeft} days left`,
      voted: false,
      voters: election.voters || 0,
      color: 'blue'
    };
  });

  const recentVotes = [
    {
      id: 1,
      title: 'Library Committee Elections',
      date: '2024-10-28',
      status: 'Completed',
      result: 'Your candidates won!'
    },
    {
      id: 2,
      title: 'Cultural Week Coordinator',
      date: '2024-10-15',
      status: 'Completed',
      result: 'Results announced'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* ===== WELCOME SECTION ===== */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 rounded-2xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-green-400 rounded-full blur-3xl opacity-10" />
        
        <div className="relative p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome back, {user?.fullName.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You have <span className="font-bold text-blue-600 dark:text-blue-400">{activeCount} active election{activeCount !== 1 ? 's' : ''}</span> waiting for your vote
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Award className="w-4 h-4" />
                <span>Member since {new Date(user?.createdAt || new Date()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
            
            <button onClick={() => navigate("/voter/elections")} className="group relative">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />
            
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <div className={stat.iconColor}>
                  {stat.icon}
                </div>
              </div>

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {stat.subtext}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== ACTIVE ELECTIONS ===== */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Active Elections
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Click on any election to cast your vote
            </p>
          </div>
          <button onClick={() => navigate("/voter/elections")} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            View All Elections
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeElections.map((election) => (
            <div
              key={election.id}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
              
              <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                
                {/* Status Banner */}
                <div className={`px-4 py-2 ${election.voted ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}>
                  <div className="flex items-center justify-between text-white text-sm font-semibold">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${election.voted ? 'bg-white' : 'bg-white animate-pulse'}`} />
                      <span>{election.voted ? 'Completed' : 'Active Now'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{election.timeLeft}</span>
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
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{(election.voters / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Voters</p>
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                    <Calendar className="w-3 h-3" />
                    <span>Ends {election.deadline}</span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    {!election.voted ? (
                      <button
                        onClick={() => navigate(`/voter/elections/${election.id}`)}
                        className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Vote className="w-5 h-5" />
                        <span className="truncate">Cast Your Vote</span>
                        <ArrowRight className="w-5 h-5 hidden sm:inline" />
                      </button>
                    ) : (
                      <button onClick={() => navigate(`/voter/results/${election.id}`)} className="w-full border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2">
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
      </div>

      {/* ===== RECENT ACTIVITY ===== */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Activity
        </h2>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
          <div className="space-y-4">
            {recentVotes.map((vote) => (
              <div
                key={vote.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {vote.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {vote.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                    {vote.status}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {vote.result}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => navigate("/voter/my-votes")} className="w-full mt-4 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200">
            View All Activity
          </button>
        </div>
      </div>
    {/* ===== FLOATING ACTION BUTTON WITH MENU ===== */}
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative">
        {/* Quick Action Menu (appears on hover/click) */}
        <div className={`absolute bottom-20 right-0 flex flex-col gap-3 transition-all duration-300 ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'} group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto`}>
          {/* Active Elections */}
          <button
            onClick={() => { setMenuOpen(false); navigate("/voter/elections"); }}
            className="group/item relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition" />
            <div className="relative flex items-center gap-3 bg-white dark:bg-gray-900 border-2 border-blue-500 text-blue-600 dark:text-blue-400 pl-4 pr-16 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200">
              <Vote className="w-5 h-5" />
              <span className="font-bold text-sm whitespace-nowrap">Vote Now</span>
            </div>
          </button>

          {/* Apply for Position */}
          <button
            onClick={() => { setMenuOpen(false); navigate("/voter/applications"); }}
            className="group/item relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition" />
            <div className="relative flex items-center gap-3 bg-white dark:bg-gray-900 border-2 border-purple-500 text-purple-600 dark:text-purple-400 pl-4 pr-16 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200">
              <PanelsTopLeft className="w-5 h-5" />
              <span className="font-bold text-sm whitespace-nowrap">Apply</span>
            </div>
          </button>

          {/* View Results */}
          <button
            onClick={() => { setMenuOpen(false); navigate("/voter/results"); }}
            className="group/item relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-green-600 to-green-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition" />
            <div className="relative flex items-center gap-3 bg-white dark:bg-gray-900 border-2 border-green-500 text-green-600 dark:text-green-400 pl-4 pr-16 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200">
              <ChartColumnBig className="w-5 h-5" />
              <span className="font-bold text-sm whitespace-nowrap">View Results</span>
            </div>
          </button>

          {/* My Profile */}
          <button
            onClick={() => { setMenuOpen(false); navigate("/voter/profile"); }}
            className="group/item relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-600 to-orange-500 rounded-full blur-lg opacity-0 group-hover/item:opacity-60 transition" />
            <div className="relative flex items-center gap-3 bg-white dark:bg-gray-900 border-2 border-orange-500 text-orange-600 dark:text-orange-400 pl-4 pr-16 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-200">
              <User className="w-5 h-5" />
              <span className="font-bold text-sm whitespace-nowrap">My Profile</span>
            </div>
          </button>
        </div>

        {/* Main FAB Button */}
        <div className="group relative">
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-full blur-xl opacity-60 group-hover:opacity-100 animate-pulse group-hover:animate-none transition pointer-events-none" />
          <button onClick={() => setMenuOpen((s) => !s)} className="relative flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 hover:rotate-90 transition-all duration-300 pointer-events-auto">
            <Zap className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VoterDashboard;