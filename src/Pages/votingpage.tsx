import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Award,
  FileText,
  X,
  Calendar,
  Building,
  Users,
  Shield,
  AlertCircle,
  Info,
  Clock,
  Vote,
  BookOpen
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useElections } from '../Context/ElectionContext';
import { supabase } from '../lib/supabase';

// ===== TYPES =====
interface Candidate {
  id: string;
  candidate_name: string;
  position_title: string;
  profile_image_url: string | null;
  candidate_department?: string;
  candidate_level?: string;
  candidate_email?: string;
  candidate_phone?: string;
  candidate_cgpa?: number | null;
  candidate_qualifications?: string;
  manifesto?: string;
  campaign_promises?: string;
  is_active?: boolean;

  // Derived / UI fields
  photoUrl?: string;
  name?: string;
  department?: string;
  level?: string;
}

interface Position {
  id: string;
  name: string;
  description: string;
  candidates: Candidate[];
}

interface VoteSelections {
  [positionId: string]: string; // positionId -> candidateId
}

const VotingPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: electionId } = useParams<{ id: string }>();
  const location = useLocation();
  const { fetchElectionById, getElectionById } = useElections();
  
  // ===== STATE =====
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [selections, setSelections] = useState<VoteSelections>({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showElectionInfo, setShowElectionInfo] = useState(true);
  const [election, setElection] = useState<any>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  // ===== FETCH ELECTION DATA & CANDIDATES =====
  useEffect(() => {
    const loadElectionAndCandidates = async () => {
      const electionFromState = (location.state as any)?.election;
      const idToUse = electionId || electionFromState?.id;

      if (!idToUse) {
        setError('No election ID provided');
        setLoadingCandidates(false);
        return;
      }

      try {
        setLoadingCandidates(true);
        setError(null);

        let electionData = electionFromState ? electionFromState : await fetchElectionById(idToUse);

        if (!electionData) {
          setError('Election not found');
          setLoadingCandidates(false);
          return;
        }

        if (!Array.isArray(electionData.positions)) {
          try {
            const cached = getElectionById(idToUse);
            if (cached && Array.isArray(cached.positions)) {
              electionData = cached as any;
            } else if (typeof electionData.positions === 'string') {
              try {
                electionData.positions = JSON.parse(electionData.positions);
              } catch (parseErr) {
                const fetched = await fetchElectionById(idToUse);
                if (fetched) electionData = fetched as any;
              }
            } else {
              const fetched = await fetchElectionById(idToUse);
              if (fetched) electionData = fetched as any;
            }
          } catch (err) {
            console.error('Error resolving full election for positions:', err);
          }
        }

        // Compute UI status
        try {
          const now = new Date();
          const startDate = new Date(electionData.voting_start_date);
          const endDate = new Date(electionData.voting_end_date);
          let ui_status: 'active' | 'upcoming' | 'completed' = 'upcoming';
          if (now >= startDate && now <= endDate) {
            ui_status = 'active';
          } else if (now > endDate) {
            ui_status = 'completed';
          }
          electionData = { ...electionData, ui_status } as any;
        } catch (err) {
          // ignore date parse issues
        }

        setElection(electionData as any);

        // Fetch candidates
        const { data: candidatesData, error: candidatesError } = await supabase
          .from('candidates')
          .select('*')
          .eq('election_id', idToUse)
          .eq('is_active', true);

        if (candidatesError) {
          console.error('Candidates fetch error:', candidatesError);
          setError('Failed to load candidates');
          setLoadingCandidates(false);
          return;
        }

        const electionPositions = Array.isArray(electionData.positions) ? electionData.positions : [];
        
        const positionsWithCandidates: Position[] = electionPositions.map((pos: any, index: number) => {
          const positionCandidates = (candidatesData || []).filter(
            (candidate: Candidate) => candidate.position_title === pos.title
          ).map((candidate: Candidate) => ({
            ...candidate,
            id: candidate.id,
            name: candidate.candidate_name,
            photoUrl: candidate.profile_image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.candidate_name)}&size=200&background=4F46E5&color=fff`,
            department: candidate.candidate_department,
            level: candidate.candidate_level,
            manifesto: candidate.manifesto || `${candidate.candidate_name} is running for ${pos.title}.`
          }));

          return {
            id: pos.id || `position-${index + 1}`,
            name: pos.title,
            description: pos.description || `Position for ${pos.title}`,
            candidates: positionCandidates
          };
        });

        setPositions(positionsWithCandidates);

      } catch (err) {
        console.error('Error loading election:', err);
        setError('Failed to load election data');
      } finally {
        setLoadingCandidates(false);
      }
    };

    loadElectionAndCandidates();
  }, [electionId, fetchElectionById, location.state]);

  // ===== COMPUTED POSITIONS & HANDLERS =====
  const currentPosition: Position = positions[currentPositionIndex] || { id: '', name: '', description: '', candidates: [] };
  const isFirstPosition = currentPositionIndex === 0;
  const isLastPosition = currentPositionIndex === positions.length - 1;
  const selectedCandidate = selections[currentPosition.id];

  // Handlers
  const handleSelectCandidate = (candidateId: string) => {
    setSelections(prev => ({ ...prev, [currentPosition.id]: candidateId }));
  };

  const handleSkipPosition = () => {
    setSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[currentPosition.id];
      return newSelections;
    });

    if (!isLastPosition) setCurrentPositionIndex(prev => prev + 1);
  };

  const handleNext = () => {
    if (!isLastPosition) {
      setCurrentPositionIndex(prev => prev + 1);
    } else {
      setShowReviewModal(true);
    }
  };

  const handlePrevious = () => {
    if (!isFirstPosition) setCurrentPositionIndex(prev => prev - 1);
  };

  const handleSubmitVotes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('You must be logged in to vote');
        return;
      }

      const electionIdToUse = electionId || (election && election.id);
      if (!electionIdToUse) {
        alert('No election ID found for submission');
        return;
      }

      const votes = Object.entries(selections).map(([positionId, candidateId]) => ({
        election_id: electionIdToUse,
        position_id: positionId,
        candidate_id: candidateId,
        voter_id: user.id,
        created_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('votes').insert(votes);
      if (error) {
        console.error('Error submitting votes:', error);
        alert('Error submitting votes. Please try again.');
        return;
      }

      navigate('/voter/vote-success', {
        state: {
          selections,
          election,
          positions: positions.map(pos => {
            const candidateId = selections[pos.id];
            const candidate = pos.candidates.find(c => c.id === candidateId);
            return { name: pos.name, candidateId, candidate };
          }).filter(item => item.candidateId)
        }
      });

    } catch (err) {
      console.error('Error in handleSubmitVotes:', err);
      alert('Error submitting votes. Please try again.');
    }
  };

  const handleStartVoting = () => {
    setShowElectionInfo(false);
  };

  // ===== LOADING / ERROR STATES =====
  if (loadingCandidates) {
    return (
      <div className="max-w-6xl mx-auto py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading election details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 mb-6">
          <h1 className="text-2xl font-bold text-red-700 dark:text-red-400 mb-4">Error Loading Election</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => navigate(-1)} className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors">Back to Elections</button>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  // ===== ELECTION INFO PAGE (Before voting) =====
  if (showElectionInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Gradient Background */}
          <div className="relative overflow-hidden rounded-2xl mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-500 to-green-500 opacity-10" />
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span className="font-medium">Back</span>
                    </button>
                    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 text-white text-sm font-bold">
                      {(election as any)?.ui_status === 'active' ? 'LIVE VOTING' : 'ELECTION'}
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                    {election?.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 max-w-3xl">
                    {election?.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30">
                      <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {election?.organization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30">
                      <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {positions.reduce((acc, pos) => acc + pos.candidates.length, 0)} Total Candidates
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/30">
                      <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {positions.length} Positions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Voting Status Card */}
                <div className="bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl p-6 text-white w-full lg:w-auto">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/20">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90">Voting Period</p>
                      <p className="font-bold">
                        {new Date(election?.voting_start_date).toLocaleDateString()} - {new Date(election?.voting_end_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-1000"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <p className="text-sm opacity-90">Approximately 3 days remaining</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Election Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Election Information */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  Election Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Voting Dates</p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {new Date(election?.voting_start_date).toLocaleDateString()} to {new Date(election?.voting_end_date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Application Period: {new Date(election?.application_start_date).toLocaleDateString()} - {new Date(election?.application_end_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Security Features</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {election?.require_face_verification && (
                            <span className="px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                              Face Verification
                            </span>
                          )}
                          {election?.show_live_results && (
                            <span className="px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-medium">
                              Live Results
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Election Type</p>
                        <p className="font-semibold text-gray-900 dark:text-white capitalize">
                          {election?.election_type} Election
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          (election as any)?.ui_status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {(election as any)?.ui_status?.toUpperCase() || election?.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Positions List */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    Positions Available
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium">
                    {positions.length} Positions
                  </span>
                </div>
                
                {positions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Award className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Positions Available</h3>
                    <p className="text-gray-500 dark:text-gray-400">This election doesn't have any positions set up yet.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {positions.map((position, index) => (
                      <div
                        key={position.id}
                        className="group border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-gray-900 dark:text-white">
                                {position.name}
                              </h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                position.candidates.length > 0 
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}>
                                {position.candidates.length} {position.candidates.length === 1 ? 'Candidate' : 'Candidates'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {position.description}
                            </p>
                            {position.candidates.length === 0 && (
                              <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                No candidates yet
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Voting Instructions & Start Button */}
            <div className="space-y-6">
              {/* Voting Instructions */}
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">How to Vote</h3>
                  <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="ml-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    {showInstructions ? 'Hide' : 'Show'}
                  </button>
                </div>
                
                {showInstructions && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Review Positions</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Each position requires a separate vote. You can skip positions if you don't want to vote for them.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Select Candidates</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Click on your preferred candidate for each position. Review their manifesto before deciding.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Review & Submit</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Finalize your choices before submission. Votes cannot be changed once submitted.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Important Notes */}
                <div className="mt-6 pt-6 border-t border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Important Notes</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• You can only vote once per position</li>
                        <li>• Votes are anonymous and secure</li>
                        <li>• Voting session will expire after 30 minutes</li>
                        <li>• Make sure you have stable internet connection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Voting Button Section */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 flex items-center justify-center">
                    <Vote className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Ready to Vote?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Cast your vote for each position to help shape the future.
                  </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{positions.reduce((acc, pos) => acc + pos.candidates.length, 0)} candidates waiting</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (positions.length / 10) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Start Button */}
                <button
                  onClick={handleStartVoting}
                  disabled={positions.length === 0 || positions.every(p => p.candidates.length === 0)}
                  className="group relative w-full py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl opacity-100 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
                  <div className="relative flex items-center justify-center gap-3">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    <span className="text-white text-lg font-bold">Begin Voting Process</span>
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Button Status Messages */}
                <div className="mt-4 space-y-2">
                  {positions.length === 0 ? (
                    <p className="text-center text-red-600 dark:text-red-400 text-sm flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Cannot start voting - no positions available
                    </p>
                  ) : positions.every(p => p.candidates.length === 0) ? (
                    <p className="text-center text-amber-600 dark:text-amber-400 text-sm flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      No candidates available for any position
                    </p>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
                      Estimated time: {Math.ceil(positions.length * 2)} minutes
                    </p>
                  )}

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Secure voting powered by blockchain verification
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Contact election support at{" "}
              <a href="mailto:support@elections.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                support@elections.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  // Check if current position has candidates
  if (currentPosition.candidates.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-8 mb-6">
          <h1 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mb-4">
            No Candidates for {currentPosition.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no candidates running for this position. You can skip this position and continue voting.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleSkipPosition}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Skip Position
            </button>
            <button
              onClick={() => setShowElectionInfo(true)}
              className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
            >
              Back to Election Info
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== VOTING PAGE =====
  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <button
          onClick={() => setShowElectionInfo(true)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Election Info</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {election.title} - Voting in Progress
        </h1>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Position {positions.length ? currentPositionIndex + 1 : 0} of {positions.length}</span>
              <span>{positions.length ? Math.round(((currentPositionIndex + 1) / positions.length) * 100) : 0}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${positions.length ? ((currentPositionIndex + 1) / positions.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== POSITION HEADER ===== */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-white font-bold text-lg">
            {currentPositionIndex + 1}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentPosition.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentPosition.description}
            </p>
          </div>
        </div>
        
        {selectedCandidate && (
          <div className="mt-4 flex items-center gap-2 text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg w-fit">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Selection made</span>
          </div>
        )}
      </div>

      {/* ===== CANDIDATES GRID ===== */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {currentPosition.candidates.map((candidate: Candidate) => {
          const isSelected = selectedCandidate === candidate.id;
          
          return (
            <div
              key={candidate.id}
              className={`
                group relative cursor-pointer
                ${isSelected ? 'ring-4 ring-green-500' : ''}
              `}
              onClick={() => handleSelectCandidate(candidate.id)}
            >
              {/* Glow effect */}
              <div className={`
                absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-300
                ${isSelected ? 'opacity-40' : ''}
              `} />
              
              {/* Card */}
              <div className={`
                relative bg-white dark:bg-gray-900 border rounded-2xl overflow-hidden transition-all duration-300
                ${isSelected 
                  ? 'border-green-500 shadow-2xl' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }
              `}>
                
                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-green-500 text-white p-2 rounded-full shadow-lg">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  </div>
                )}

                {/* Photo */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
                  <img
                    src={candidate.photoUrl}
                    alt={candidate.candidate_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.candidate_name)}&size=200&background=4F46E5&color=fff`;
                    }}
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-green-500/20" />
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {candidate.candidate_name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
                      <User className="w-3 h-3" />
                      {candidate.candidate_department}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm">
                      <Award className="w-3 h-3" />
                      {candidate.candidate_level}
                    </span>
                    {candidate.candidate_cgpa && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">
                        CGPA: {candidate.candidate_cgpa}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FileText className="w-4 h-4" />
                      Manifesto
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {candidate.manifesto || `${candidate.candidate_name} is running for ${currentPosition.name}.`}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCandidate(candidate.id);
                    }}
                    className={`
                      w-full py-3 rounded-xl font-bold transition-all duration-200 flex items-center justify-center gap-2
                      ${isSelected
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gradient-to-r from-blue-600 to-green-600 text-white hover:shadow-xl'
                      }
                    `}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Selected
                      </>
                    ) : (
                      <>
                        Vote for {candidate.candidate_name.split(' ')[0]}
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== NAVIGATION BUTTONS ===== */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={isFirstPosition}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Skip Button */}
          <button
            onClick={handleSkipPosition}
            className="px-6 py-3 rounded-xl text-gray-600 dark:text-gray-400 font-semibold hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Skip Position
          </button>

          {/* Next/Review Button */}
          <button
            onClick={handleNext}
            disabled={!selectedCandidate}
            className="group relative px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
            <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white flex items-center gap-2">
              {isLastPosition ? 'Review Ballot' : 'Next Position'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* ===== REVIEW MODAL ===== */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
            
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Review Your Ballot
                </h2>
                <button
                  onClick={() => setShowReviewModal(false)}
                  aria-label="Close review modal"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Review your selections before final submission. Once submitted, votes cannot be changed.
              </p>
            </div>

            {/* Selections */}
            <div className="p-6 space-y-4">
              {positions.map((position) => {
                const candidateId = selections[position.id];
                const candidate = position.candidates.find(c => c.id === candidateId);
                
                return (
                  <div
                    key={position.id}
                    className="border border-gray-200 dark:border-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {position.name}
                      </h3>
                      <button
                        onClick={() => {
                          setShowReviewModal(false);
                          setCurrentPositionIndex(positions.indexOf(position));
                        }}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    
                    {candidate ? (
                      <div className="flex items-center gap-3">
                        <img
                          src={candidate.photoUrl}
                          alt={candidate.candidate_name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.candidate_name)}&size=200&background=4F46E5&color=fff`;
                          }}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {candidate.candidate_name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {candidate.candidate_department} • {candidate.candidate_level}
                          </p>
                        </div>
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 ml-auto" />
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                        No selection made
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:border-gray-400 transition-colors"
                >
                  Back to Voting
                </button>
                <button
                  onClick={handleSubmitVotes}
                  className="group relative flex-1"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Confirm & Submit
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingPage;