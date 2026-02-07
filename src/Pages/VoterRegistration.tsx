import React, { useState, useEffect } from "react";
import {
  Vote,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  Target,
  ArrowRight,
  ChevronRight,
  Loader,
  UserCheck,
  Award,
  Sparkles,
  Building,
  X,
  User,
  Mail,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useElections } from "../Context/ElectionContext";

interface Election {
  id: string;
  title: string;
  description: string;
  election_type: string;
  organization: string;
  registration_start_date: string;
  registration_end_date: string;
  voting_start_date: string;
  voting_end_date: string;
  positions: Position[];
  voters: number;
  status: string;
}

interface Position {
  title: string;
  description: string;
}

interface Registration {
  id: string;
  election_id: string;
  election_title: string;
  registered_at: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
}

const VotesRegistrationPage: React.FC = () => {
  const { user } = useAuth();
  const { elections, loading: electionsLoading } = useElections();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElection, setSelectedElection] = useState<Election | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);
  const [activeTab, setActiveTab] = useState<string>('open');
  const [registrationStep, setRegistrationStep] = useState<'confirm' | 'review'>('confirm');
  const [isRegistering, setIsRegistering] = useState(false);

  // Mock registrations data
  useEffect(() => {
    // Simulate fetching user registrations
    if (user?.uid) {
      setMyRegistrations([
        {
          id: "1",
          election_id: "1",
          election_title: "2024 Student Union Elections",
          registered_at: "2024-03-15T10:30:00Z",
          status: "approved",
        },
        {
          id: "2",
          election_id: "2",
          election_title: "Faculty Representative Council",
          registered_at: "2024-03-10T14:20:00Z",
          status: "pending",
        },
      ]);
    }
  }, [user]);

  // Filter elections
  const now = new Date();
  const openRegistrations = elections.filter((election) => {
    const regStart = new Date(election.registration_start_date);
    const regEnd = new Date(election.registration_end_date);
    const matchesSearch = election.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return now >= regStart && now <= regEnd && matchesSearch;
  });

  const upcomingRegistrations = elections
    .filter((election) => {
      const regStart = new Date(election.registration_start_date);
      const matchesSearch = election.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return now < regStart && matchesSearch;
    })
    .sort(
      (a, b) =>
        new Date(a.registration_start_date).getTime() -
        new Date(b.registration_start_date).getTime()
    );

  const handleOpenDetails = (election: Election) => {
    setSelectedElection(election);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedElection(null);
  };

  const handleStartRegistration = (election: Election) => {
    setSelectedElection(election);
    setRegistrationStep('confirm');
    setIsRegistrationModalOpen(true);
  };

  const handleCloseRegistration = () => {
    setIsRegistrationModalOpen(false);
    setSelectedElection(null);
    setIsRegistering(false);
  };

  const handleConfirmRegistration = () => {
    setIsRegistering(true);
    // Simulate API call
    setTimeout(() => {
      // Add to registrations
      if (selectedElection) {
        const newRegistration: Registration = {
          id: Date.now().toString(),
          election_id: selectedElection.id,
          election_title: selectedElection.title,
          registered_at: new Date().toISOString(),
          status: "pending",
        };
        setMyRegistrations([newRegistration, ...myRegistrations]);
      }
      setIsRegistering(false);
      setRegistrationStep('review');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-gradient-to-r from-emerald-500 to-green-500 text-white";
      case "rejected":
        return "bg-gradient-to-r from-rose-500 to-red-500 text-white";
      default:
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "rejected":
        return <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const checkIfRegistered = (electionId: string) => {
    return myRegistrations.some(reg => reg.election_id === electionId);
  };

  const getRegistrationStatus = (electionId: string) => {
    const registration = myRegistrations.find(reg => reg.election_id === electionId);
    return registration?.status;
  };

  if (electionsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading elections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-3 sm:p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-emerald-500/10" />
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-3xl opacity-10 dark:opacity-20" />
          
          <div className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                    <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                    Voting Registration
                  </h1>
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 max-w-2xl">
                  Register to vote in upcoming elections and exercise your democratic right to choose your leaders.
                </p>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                    <Vote className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {openRegistrations.length} Registration Open
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {upcomingRegistrations.length} Coming Soon
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30">
                    <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                      {myRegistrations.filter(r => r.status === 'approved').length} Registered
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 mt-4 md:mt-0">
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">My Registrations</p>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{myRegistrations.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Registrations Section */}
        {myRegistrations.length > 0 && (
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5" />
            <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                      <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    My Voter Registrations
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Track your voter registration status for upcoming elections
                  </p>
                </div>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-emerald-400 font-bold text-sm">
                  {myRegistrations.length} Total
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {myRegistrations.map((reg) => {
                  const registeredDate = new Date(reg.registered_at);
                  const isRecent = (Date.now() - registeredDate.getTime()) < 24 * 60 * 60 * 1000;
                  
                  return (
                    <div key={reg.id} className="group relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                      
                      <div className="relative p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(reg.status)} flex items-center gap-1`}>
                                {getStatusIcon(reg.status)}
                                <span className="hidden sm:inline">{reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}</span>
                                <span className="sm:hidden">{reg.status.charAt(0).toUpperCase()}</span>
                              </span>
                              {isRecent && (
                                <span className="px-1.5 py-1 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold">
                                  New
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 line-clamp-2">
                              {reg.election_title}
                            </h3>
                          </div>
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center flex-shrink-0">
                            <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Registered {registeredDate.toLocaleDateString()}</span>
                          </div>
                          {reg.status === "rejected" && reg.rejection_reason && (
                            <div className="p-2 sm:p-3 rounded-lg bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20">
                              <p className="text-xs font-medium text-rose-700 dark:text-rose-400 line-clamp-2">
                                Reason: {reg.rejection_reason}
                              </p>
                            </div>
                          )}
                          {reg.status === "pending" && (
                            <div className="flex items-center gap-1.5 sm:gap-2 text-sm">
                              <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse w-3/4" />
                              </div>
                              <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                Under Review
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="sticky top-3 sm:top-4 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search elections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
            
            {/* Tabs */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('open')}
                className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex-1 ${
                  activeTab === 'open'
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Vote className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Open Now</span>
                <span className="sm:hidden">Open</span>
                {openRegistrations.length > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'open' 
                      ? 'bg-white/20 text-white' 
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  }`}>
                    {openRegistrations.length}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all flex-1 ${
                  activeTab === 'upcoming'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Coming Soon</span>
                <span className="sm:hidden">Upcoming</span>
                {upcomingRegistrations.length > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    activeTab === 'upcoming'
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  }`}>
                    {upcomingRegistrations.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Elections Grid */}
        <div>
          {(activeTab === 'open' && openRegistrations.length === 0) ||
           (activeTab === 'upcoming' && upcomingRegistrations.length === 0) ? (
            <div className="text-center py-12 sm:py-16 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                <Vote className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400 dark:text-slate-500" />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                No {activeTab === 'open' ? 'Open' : 'Upcoming'} Registrations
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 sm:mb-8 px-4">
                {activeTab === 'open'
                  ? 'There are currently no open voter registrations. Check back later or view upcoming elections.'
                  : 'No voter registrations are scheduled to open soon. Stay tuned for announcements!'}
              </p>
              <button
                onClick={() => setActiveTab(activeTab === 'open' ? 'upcoming' : 'open')}
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700 text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all text-sm sm:text-base"
              >
                View {activeTab === 'open' ? 'Upcoming' : 'Open'} Registrations
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(activeTab === 'open' ? openRegistrations : upcomingRegistrations).map((election) => {
                const regEndDate = new Date(election.registration_end_date);
                const regStartDate = new Date(election.registration_start_date);
                const daysLeft = Math.ceil((regEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                const daysUntilStart = Math.ceil((regStartDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

                const isRegistered = checkIfRegistered(election.id);
                const registrationStatus = getRegistrationStatus(election.id);
                
                return (
                  <div key={election.id} className="group relative">
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                      activeTab === 'open' ? 'from-green-600 to-emerald-600' : 'from-amber-600 to-orange-600'
                    } rounded-xl sm:rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500`} />
                    
                    <div className="relative h-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                      {/* Header */}
                      <div className={`p-4 sm:p-6 ${activeTab === 'open' ? 'pb-3 sm:pb-4' : ''} bg-gradient-to-r ${
                        activeTab === 'open' ? 'from-green-500 to-emerald-500' : 'from-amber-500 to-orange-500'
                      }`}>
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className={`p-1.5 sm:p-2 rounded-lg bg-white/20 backdrop-blur-sm`}>
                              <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-white/90">
                              {activeTab === 'open' ? 'REGISTRATION OPEN' : 'COMING SOON'}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-white/90 text-xs sm:text-sm font-medium">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>
                              {activeTab === 'open' 
                                ? `${daysLeft}d left` 
                                : `Starts in ${daysUntilStart}d`}
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1.5 sm:mb-2 line-clamp-2">
                          {election.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
                          {election.description}
                        </p>
                      </div>

                      {/* Content */}
                      <div className="p-4 sm:p-6">
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                          <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-0.5 sm:mb-1">
                              {election.positions?.length || 0}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Positions</p>
                          </div>
                          <div className="text-center p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                            <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-0.5 sm:mb-1">
                              {election.voters ? (election.voters / 1000).toFixed(1) + "K" : "TBA"}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Eligible Voters</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        {isRegistered && (
                          <div className="mb-4 sm:mb-6">
                            <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full ${getStatusColor(registrationStatus || 'pending')} font-bold text-xs sm:text-sm`}>
                              {getStatusIcon(registrationStatus || 'pending')}
                              <span>
                                {registrationStatus === 'approved' ? 'Registered ✓' :
                                 registrationStatus === 'rejected' ? 'Registration Rejected' :
                                 'Registration Pending'}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Timeline */}
                        <div className="border-t border-slate-200 dark:border-slate-800 pt-3 sm:pt-4">
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Registration: {new Date(election.registration_start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(election.registration_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between gap-2 text-xs sm:text-sm">
                              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Voting: {new Date(election.voting_start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(election.voting_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="p-4 sm:p-6 pt-0">
                        {activeTab === 'open' ? (
                          isRegistered ? (
                            <div className="flex gap-2 sm:gap-3">
                              <button
                                onClick={() => handleOpenDetails(election)}
                                className="flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                              >
                                View Details
                              </button>
                              {registrationStatus === 'approved' && (
                                <button
                                  disabled
                                  className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-400 text-sm sm:text-base"
                                >
                                  Ready to Vote
                                </button>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleStartRegistration(election)}
                              className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                            >
                              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>Register to Vote</span>
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" />
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => handleOpenDetails(election)}
                            disabled={true}
                            className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-sm sm:text-base bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-400 cursor-not-allowed"
                          >
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Opening Soon</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Election Details Modal */}
      {isDetailsModalOpen && selectedElection && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-0 sm:p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-none sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 w-full min-h-screen sm:min-h-0 sm:max-w-3xl sm:max-h-[95vh] overflow-y-auto hide-scrollbar shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8 sticky top-0 bg-white dark:bg-slate-900 pt-2 pb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                    <Vote className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {selectedElection.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      Election Details
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseDetails}
                className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg sm:rounded-xl transition-colors ml-2"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {/* Election Info Card */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
                <div className="relative p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-2xl">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    Election Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    {[
                      { icon: Building, label: "Organization", value: selectedElection.organization },
                      { icon: Target, label: "Type", value: selectedElection.election_type },
                      { icon: Users, label: "Eligible Voters", value: selectedElection.voters ? selectedElection.voters.toLocaleString() : "TBA" },
                      { icon: Award, label: "Positions", value: selectedElection.positions?.length || 0 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                          <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                          <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Timeline Card */}
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-2xl">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    Election Timeline
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { 
                        title: "Voter Registration", 
                        start: selectedElection.registration_start_date, 
                        end: selectedElection.registration_end_date,
                        color: "from-green-500 to-emerald-500",
                        icon: UserCheck
                      },
                      { 
                        title: "Voting Period", 
                        start: selectedElection.voting_start_date, 
                        end: selectedElection.voting_end_date,
                        color: "from-purple-500 to-blue-500",
                        icon: Vote
                      },
                    ].map((phase, index) => (
                      <div key={index} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${phase.color}`}>
                            <phase.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <h5 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">{phase.title}</h5>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Starts</p>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {new Date(phase.start).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ends</p>
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {new Date(phase.end).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Positions Card */}
              {selectedElection.positions && selectedElection.positions.length > 0 && (
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-lg sm:rounded-2xl">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      Available Positions
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {selectedElection.positions.map((position, index) => (
                        <div key={index} className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                                {position.title}
                              </h5>
                              {position.description && (
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                  {position.description}
                                </p>
                              )}
                            </div>
                            <div className="ml-2 sm:ml-4">
                              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {checkIfRegistered(selectedElection.id) ? (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={handleCloseDetails}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    Close
                  </button>
                  {getRegistrationStatus(selectedElection.id) === 'approved' && (
                    <button
                      className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                    >
                      View Candidates
                    </button>
                  )}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={handleCloseDetails}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStartRegistration(selectedElection)}
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                  >
                    <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span>Register to Vote</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegistrationModalOpen && selectedElection && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-0 sm:p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-none sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 w-full min-h-screen sm:min-h-0 sm:max-w-2xl sm:max-h-[95vh] overflow-y-auto hide-scrollbar shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6 md:mb-8 sticky top-0 bg-white dark:bg-slate-900 pt-2 pb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {registrationStep === 'confirm' ? 'Confirm Registration' : 'Registration Submitted'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
                      {selectedElection.title}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCloseRegistration}
                className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg sm:rounded-xl transition-colors ml-2"
                disabled={isRegistering}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {registrationStep === 'confirm' ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Voter Info Card */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-2xl">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      Your Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      {[
                        { icon: User, label: "Name", value: user?.fullName },
                        { icon: Mail, label: "Email", value: user?.email },
                        { icon: GraduationCap, label: "Department", value: user?.department },
                        { icon: Building, label: "Organization", value: user?.organization },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                          <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                            <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{item.value || "N/A"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Election Info Card */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-2xl">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                        <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      Election Details
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Title</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{selectedElection.title}</p>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Voting Period</p>
                        <p className="font-medium text-gray-900 dark:text-white text-sm">
                          {new Date(selectedElection.voting_start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(selectedElection.voting_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Note */}
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-400">
                    <span className="font-bold">Note:</span> By registering, you confirm that you meet all eligibility criteria for this election. 
                    Your registration will be reviewed by the electoral officer.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={handleCloseRegistration}
                    disabled={isRegistering}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRegistration}
                    disabled={isRegistering}
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isRegistering ? (
                      <>
                        <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span>Confirm Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Success Card */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg sm:rounded-2xl text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3">
                      Registration Submitted!
                    </h4>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
                      Your voter registration for <span className="font-bold text-gray-900 dark:text-white">{selectedElection.title}</span> has been submitted successfully.
                    </p>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="relative overflow-hidden rounded-lg sm:rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg sm:rounded-2xl">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      What Happens Next?
                    </h4>
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          title: "Review Process",
                          description: "Your registration will be reviewed by the electoral officer within 24-48 hours.",
                          color: "from-amber-500 to-orange-500"
                        },
                        {
                          title: "Notification",
                          description: "You will receive an email notification once your registration is approved or rejected.",
                          color: "from-blue-500 to-cyan-500"
                        },
                        {
                          title: "Voting Access",
                          description: "Once approved, you'll be able to vote during the election period.",
                          color: "from-purple-500 to-pink-500"
                        }
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-white/50 dark:bg-slate-800/50">
                          <div className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-r ${step.color} flex-shrink-0`}>
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                              {step.title}
                            </h5>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={handleCloseRegistration}
                    className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 rounded-lg sm:rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm sm:text-base"
                  >
                    View My Registrations
                  </button>
                  <button
                    onClick={handleCloseRegistration}
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg sm:rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all text-sm sm:text-base"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VotesRegistrationPage;