import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Award,
  FileText,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// ===== TYPES =====
interface Candidate {
  id: string;
  name: string;
  photoUrl: string;
  department: string;
  level: string;
  manifesto: string;
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
  
  // ===== STATE =====
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [selections, setSelections] = useState<VoteSelections>({});
  const [showReviewModal, setShowReviewModal] = useState(false);

  // ===== MOCK DATA =====
  const election = {
    id: '1',
    title: 'Student Union Elections 2024'
  };

  const positions: Position[] = [
    {
      id: '1',
      name: 'President',
      description: 'Lead the student union and represent all students',
      candidates: [
        {
          id: 'c1',
          name: 'John Doe',
          photoUrl: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=4F46E5&color=fff',
          department: 'Computer Science',
          level: '400 Level',
          manifesto: 'I promise to improve student welfare, enhance campus facilities, and ensure transparent leadership. Together, we can make our university better for everyone.'
        },
        {
          id: 'c2',
          name: 'Jane Smith',
          photoUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&size=200&background=10B981&color=fff',
          department: 'Engineering',
          level: '400 Level',
          manifesto: 'My vision is to create more opportunities for students, modernize our systems, and give everyone a voice in decision-making.'
        },
        {
          id: 'c3',
          name: 'Ahmed Bello',
          photoUrl: 'https://ui-avatars.com/api/?name=Ahmed+Bello&size=200&background=F59E0B&color=fff',
          department: 'Medicine',
          level: '500 Level',
          manifesto: 'Experience matters. I will leverage my time here to implement practical solutions and work with the administration for real change.'
        },
        {
          id: 'c4',
          name: 'Chioma Okafor',
          photoUrl: 'https://ui-avatars.com/api/?name=Chioma+Okafor&size=200&background=EC4899&color=fff',
          department: 'Law',
          level: '400 Level',
          manifesto: 'Innovation and inclusivity are key. I will fight for every student\'s rights and create programs that benefit everyone equally.'
        }
      ]
    },
    {
      id: '2',
      name: 'Vice President',
      description: 'Support the president and lead key initiatives',
      candidates: [
        {
          id: 'c5',
          name: 'David Okon',
          photoUrl: 'https://ui-avatars.com/api/?name=David+Okon&size=200&background=8B5CF6&color=fff',
          department: 'Business Admin',
          level: '300 Level',
          manifesto: 'Supporting leadership with dedication and ensuring every student voice is heard in our union.'
        },
        {
          id: 'c6',
          name: 'Fatima Yusuf',
          photoUrl: 'https://ui-avatars.com/api/?name=Fatima+Yusuf&size=200&background=06B6D4&color=fff',
          department: 'Economics',
          level: '400 Level',
          manifesto: 'Bringing fresh ideas and energy to the union. Let\'s work together for positive change.'
        },
        {
          id: 'c7',
          name: 'Michael Adeyemi',
          photoUrl: 'https://ui-avatars.com/api/?name=Michael+Adeyemi&size=200&background=EF4444&color=fff',
          department: 'Political Science',
          level: '300 Level',
          manifesto: 'Experience in student leadership makes me the right choice to support and drive our agenda forward.'
        }
      ]
    },
    {
      id: '3',
      name: 'Secretary General',
      description: 'Coordinate union activities and keep records',
      candidates: [
        {
          id: 'c8',
          name: 'Amina Bello',
          photoUrl: 'https://ui-avatars.com/api/?name=Amina+Bello&size=200&background=06B6D4&color=fff',
          department: 'Mass Communication',
          level: '400 Level',
          manifesto: 'I will ensure efficient coordination, clear communication, and timely documentation of union activities.'
        },
        {
          id: 'c9',
          name: 'Samuel Peters',
          photoUrl: 'https://ui-avatars.com/api/?name=Samuel+Peters&size=200&background=8B5CF6&color=fff',
          department: 'Political Science',
          level: '400 Level',
          manifesto: 'Strong organizational skills and a commitment to transparency will guide my tenure as Secretary General.'
        },
        {
          id: 'c10',
          name: 'Grace Ojo',
          photoUrl: 'https://ui-avatars.com/api/?name=Grace+Ojo&size=200&background=F59E0B&color=fff',
          department: 'Public Administration',
          level: '300 Level',
          manifesto: 'I will prioritize accessibility, keep accurate records, and foster inclusive participation.'
        },
        {
          id: 'c11',
          name: 'Emeka Nwosu',
          photoUrl: 'https://ui-avatars.com/api/?name=Emeka+Nwosu&size=200&background=EF4444&color=fff',
          department: 'Law',
          level: '400 Level',
          manifesto: 'With a background in student governance, I will streamline our processes and improve communication.'
        },
        {
          id: 'c12',
          name: 'Rita Udoh',
          photoUrl: 'https://ui-avatars.com/api/?name=Rita+Udoh&size=200&background=10B981&color=fff',
          department: 'Sociology',
          level: '300 Level',
          manifesto: 'I believe in participatory leadership and will work to ensure every voice is recorded and heard.'
        }
      ]
    },
    {
      id: '4',
      name: 'Financial Secretary',
      description: 'Manage union finances and budgeting',
      candidates: [
        {
          id: 'c13',
          name: 'Tunde Martins',
          photoUrl: 'https://ui-avatars.com/api/?name=Tunde+Martins&size=200&background=4F46E5&color=fff',
          department: 'Accounting',
          level: '400 Level',
          manifesto: 'I will ensure transparent financial reporting and prudent budgeting of union funds.'
        },
        {
          id: 'c14',
          name: 'Linda Nwachukwu',
          photoUrl: 'https://ui-avatars.com/api/?name=Linda+Nwachukwu&size=200&background=EC4899&color=fff',
          department: 'Economics',
          level: '400 Level',
          manifesto: 'Accountability and clear financial controls will be my top priorities.'
        },
        {
          id: 'c15',
          name: 'Bashir Musa',
          photoUrl: 'https://ui-avatars.com/api/?name=Bashir+Musa&size=200&background=F59E0B&color=fff',
          department: 'Finance',
          level: '300 Level',
          manifesto: 'I bring budgeting experience and a commitment to transparent financial stewardship.'
        }
      ]
    },
    {
      id: '5',
      name: 'Director of Sports',
      description: 'Oversee sports programs and events',
      candidates: [
        {
          id: 'c16',
          name: 'Chidi Okeke',
          photoUrl: 'https://ui-avatars.com/api/?name=Chidi+Okeke&size=200&background=8B5CF6&color=fff',
          department: 'Physical Education',
          level: '300 Level',
          manifesto: 'I will promote inclusive sports programs and improve facilities for all students.'
        },
        {
          id: 'c17',
          name: 'Maryam Ibrahim',
          photoUrl: 'https://ui-avatars.com/api/?name=Maryam+Ibrahim&size=200&background=06B6D4&color=fff',
          department: 'Sports Science',
          level: '400 Level',
          manifesto: 'My goal is to increase participation and organize regular competitive events.'
        },
        {
          id: 'c18',
          name: 'Peter Eze',
          photoUrl: 'https://ui-avatars.com/api/?name=Peter+Eze&size=200&background=EF4444&color=fff',
          department: 'Business Admin',
          level: '300 Level',
          manifesto: 'I will build partnerships and secure funding to upgrade our sports facilities.'
        },
        {
          id: 'c19',
          name: 'Ngozi Chukwu',
          photoUrl: 'https://ui-avatars.com/api/?name=Ngozi+Chukwu&size=200&background=10B981&color=fff',
          department: 'Medicine',
          level: '400 Level',
          manifesto: 'Promoting health through sports and accessible programs will be my focus.'
        }
      ]
    },
    {
      id: '6',
      name: 'Director of Socials',
      description: 'Plan social events and student engagement activities',
      candidates: [
        {
          id: 'c20',
          name: 'Adaora Nwafor',
          photoUrl: 'https://ui-avatars.com/api/?name=Adaora+Nwafor&size=200&background=4F46E5&color=fff',
          department: 'Theater Arts',
          level: '300 Level',
          manifesto: 'I will create memorable events that bring students together and celebrate our diversity.'
        },
        {
          id: 'c21',
          name: 'Ibrahim Saleh',
          photoUrl: 'https://ui-avatars.com/api/?name=Ibrahim+Saleh&size=200&background=8B5CF6&color=fff',
          department: 'Marketing',
          level: '400 Level',
          manifesto: 'Engagement and fun—my plan includes regular socials and collaboration with clubs.'
        },
        {
          id: 'c22',
          name: 'Zainab Abdullahi',
          photoUrl: 'https://ui-avatars.com/api/?name=Zainab+Abdullahi&size=200&background=EC4899&color=fff',
          department: 'Mass Communication',
          level: '300 Level',
          manifesto: 'I will organize inclusive socials and ensure transparent planning with student input.'
        }
      ]
    },
    {
      id: '7',
      name: 'Public Relations Officer',
      description: 'Manage communication and public image of the union',
      candidates: [
        {
          id: 'c23',
          name: 'Kemi Afolayan',
          photoUrl: 'https://ui-avatars.com/api/?name=Kemi+Afolayan&size=200&background=10B981&color=fff',
          department: 'Mass Communication',
          level: '400 Level',
          manifesto: 'I will ensure clear communication and proactive outreach to the student body.'
        },
        {
          id: 'c24',
          name: 'Olalekan Shittu',
          photoUrl: 'https://ui-avatars.com/api/?name=Olalekan+Shittu&size=200&background=F59E0B&color=fff',
          department: 'Journalism',
          level: '300 Level',
          manifesto: 'My plan focuses on visibility, strong media relations, and timely updates.'
        },
        {
          id: 'c25',
          name: 'Nora Mensah',
          photoUrl: 'https://ui-avatars.com/api/?name=Nora+Mensah&size=200&background=8B5CF6&color=fff',
          department: 'Public Relations',
          level: '400 Level',
          manifesto: 'I will modernize our communications and make information easy to access for everyone.'
        },
        {
          id: 'c26',
          name: 'Favour Okonkwo',
          photoUrl: 'https://ui-avatars.com/api/?name=Favour+Okonkwo&size=200&background=EF4444&color=fff',
          department: 'Communication',
          level: '300 Level',
          manifesto: 'Transparent, responsive, and student-focused communication will be my priority.'
        }
      ]
    },
    {
      id: '8',
      name: 'Welfare Officer',
      description: 'Look after student welfare and support services',
      candidates: [
        {
          id: 'c27',
          name: 'Helen Karim',
          photoUrl: 'https://ui-avatars.com/api/?name=Helen+Karim&size=200&background=10B981&color=fff',
          department: 'Social Work',
          level: '300 Level',
          manifesto: 'I will advocate for student wellbeing and improve access to support services.'
        },
        {
          id: 'c28',
          name: 'Daniel Osei',
          photoUrl: 'https://ui-avatars.com/api/?name=Daniel+Osei&size=200&background=4F46E5&color=fff',
          department: 'Psychology',
          level: '400 Level',
          manifesto: 'Creating support networks and improving welfare policies will be my focus.'
        },
        {
          id: 'c29',
          name: 'Sophie Boateng',
          photoUrl: 'https://ui-avatars.com/api/?name=Sophie+Boateng&size=200&background=8B5CF6&color=fff',
          department: 'Sociology',
          level: '300 Level',
          manifesto: 'I will work to make campus life safer and more supportive for all students.'
        }
      ]
    }
  ];

  const currentPosition = positions[currentPositionIndex];
  const isFirstPosition = currentPositionIndex === 0;
  const isLastPosition = currentPositionIndex === positions.length - 1;
  const selectedCandidate = selections[currentPosition.id];

  // ===== HANDLERS =====
  const handleSelectCandidate = (candidateId: string) => {
    setSelections(prev => ({
      ...prev,
      [currentPosition.id]: candidateId
    }));
  };

  const handleSkipPosition = () => {
    // Remove selection for this position
    setSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[currentPosition.id];
      return newSelections;
    });
    
    // Move to next position
    if (!isLastPosition) {
      setCurrentPositionIndex(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!isLastPosition) {
      setCurrentPositionIndex(prev => prev + 1);
    } else {
      setShowReviewModal(true);
    }
  };

  const handlePrevious = () => {
    if (!isFirstPosition) {
      setCurrentPositionIndex(prev => prev - 1);
    }
  };

  const handleSubmitVotes = () => {
    // Navigate to success page
    navigate('/voter/vote-success', { state: { selections, election } });
  };

  return (
    <div className="max-w-6xl mx-auto pb-20">
      
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Exit Voting</span>
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {election.title}
        </h1>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Position {currentPositionIndex + 1} of {positions.length}</span>
              <span>{Math.round(((currentPositionIndex + 1) / positions.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentPositionIndex + 1) / positions.length) * 100}%` }}
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
        {currentPosition.candidates.map((candidate) => {
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
                    alt={candidate.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-green-500/20" />
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {candidate.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm">
                      <User className="w-3 h-3" />
                      {candidate.department}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-sm">
                      <Award className="w-3 h-3" />
                      {candidate.level}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      <FileText className="w-4 h-4" />
                      Manifesto
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {candidate.manifesto}
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
                        Vote for {candidate.name.split(' ')[0]}
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
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 lg:ml-72">
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
                          alt={candidate.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {candidate.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {candidate.department}
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