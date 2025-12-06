// import React, { useState, useEffect } from "react";
// import {
//   Trophy,
//   Medal,
//   TrendingUp,
//   Users,
//   Vote,
//   CheckCircle2,
//   Crown,
//   Shield,
//   BookUser,
//   Landmark,
//   ChevronDown,
//   ChevronUp,
//   Download,
//   Share2,
// //   BarChart3,
// } from "lucide-react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../lib/supabase";
// import { useAuth } from "../Context/AuthContext";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// interface Candidate {
//   id: string;
//   name: string;
//   photoUrl: string;
//   votes: number;
//   percentage: number;
//   isWinner: boolean;
// }

// interface Position {
//   id: string;
//   title: string;
//   description: string;
//   totalVotes: number;
//   candidates: Candidate[];
// }

// interface ElectionResults {
//   id: string;
//   title: string;
//   organization: string;
//   totalVoters: number;
//   totalVotesCast: number;
//   turnoutPercentage: number;
//   status: "ongoing" | "completed";
//   votingEndDate: string;
//   positions: Position[];
// }

// const PositionIcon = ({ position, className }: { position: string; className: string }) => {
//   switch (position.toLowerCase()) {
//     case "president":
//       return <Crown className={className} />;
//     case "vice president":
//       return <Shield className={className} />;
//     case "secretary":
//       return <BookUser className={className} />;
//     case "treasurer":
//       return <Landmark className={className} />;
//     default:
//       return <Vote className={className} />;
//   }
// };

// const VoterResults: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();

//   const [results, setResults] = useState<ElectionResults | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [expandedPosition, setExpandedPosition] = useState<string | null>(null);
//   const [viewMode, setViewMode] = useState<"cards" | "charts">("cards");

//   useEffect(() => {
//     loadResults();
//   }, []);

//   const loadResults = async () => {
//     setLoading(true);
//     try {
//       // const { data, error } = await supabase
//       //   .from("elections")
//       //   .select("*")
//       //   .eq("id", id)
//       //   .single();

//       // if (error) throw error;

//       const mockResults: ElectionResults = {
//         id: "1",
//         title: "Student Union Elections 2024",
//         organization: "University of Lagos",
//         totalVoters: 2500,
//         totalVotesCast: 1834,
//         turnoutPercentage: 73.4,
//         status: "completed",
//         votingEndDate: "2024-03-03T23:59:00",
//         positions: [
//             {
//               id: "1",
//               title: "President",
//               description: "Student Union President",
//               totalVotes: 1834,
//               candidates: [
//                 {
//                   id: "1",
//                   name: "John Smith",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
//                   votes: 892,
//                   percentage: 48.6,
//                   isWinner: true,
//                 },
//                 {
//                   id: "2",
//                   name: "Sarah Johnson",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//                   votes: 654,
//                   percentage: 35.7,
//                   isWinner: false,
//                 },
//                 {
//                   id: "3",
//                   name: "Mike Davis",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
//                   votes: 288,
//                   percentage: 15.7,
//                   isWinner: false,
//                 },
//               ],
//             },
//             {
//               id: "2",
//               title: "Vice President",
//               description: "Student Union Vice President",
//               totalVotes: 1756,
//               candidates: [
//                 {
//                   id: "4",
//                   name: "Emily Brown",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
//                   votes: 1023,
//                   percentage: 58.2,
//                   isWinner: true,
//                 },
//                 {
//                   id: "5",
//                   name: "Chris Wilson",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chris",
//                   votes: 733,
//                   percentage: 41.8,
//                   isWinner: false,
//                 },
//               ],
//             },
//             {
//               id: "3",
//               title: "Secretary",
//               description: "General Secretary",
//               totalVotes: 1689,
//               candidates: [
//                 {
//                   id: "6",
//                   name: "Alex Turner",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
//                   votes: 845,
//                   percentage: 50.0,
//                   isWinner: true,
//                 },
//                 {
//                   id: "7",
//                   name: "Jordan Lee",
//                   photoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
//                   votes: 844,
//                   percentage: 50.0,
//                   isWinner: false,
//                 },
//               ],
//             },
//           ],
//         };

//       setResults(mockResults);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error loading results:", error);
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!results) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
//         <div className="text-center">
//           <Vote className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h2>
//           <p className="text-gray-600">This election doesn't exist or results aren't available yet.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <div className="text-center">
//           <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-full shadow-lg mb-4">
//             <CheckCircle2 className="w-5 h-5" />
//             <span className="font-bold">Election Completed</span>
//           </div>
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
//             {results.title}
//           </h1>
//           <p className="text-lg text-gray-600">{results.organization}</p>
//           <p className="text-sm text-gray-500 mt-2">
//             Voting ended on {new Date(results.votingEndDate).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-blue-100">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex-shrink-0">
//                 <Users className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Total Voters</p>
//                 <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
//                   {results.totalVoters.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-100">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg flex-shrink-0">
//                 <Vote className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Votes Cast</p>
//                 <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent truncate">
//                   {results.totalVotesCast.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-purple-100">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg flex-shrink-0">
//                 <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Turnout</p>
//                 <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
//                   {results.turnoutPercentage}%
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-orange-100">
//             <div className="flex items-center gap-3 sm:gap-4">
//               <div className="p-3 sm:p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg flex-shrink-0">
//                 <Trophy className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
//               </div>
//               <div className="min-w-0">
//                 <p className="text-xs sm:text-sm text-gray-600 font-semibold mb-1">Positions</p>
//                 <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent truncate">
//                   {results.positions.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <h2 className="text-2xl font-bold text-gray-900">Election Results</h2>
//           <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-gray-200 shadow-md w-full sm:w-auto">
//             <button
//               onClick={() => setViewMode("cards")}
//               className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-1 sm:flex-initial ${
//                 viewMode === "cards"
//                   ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Cards
//             </button>
//             <button
//               onClick={() => setViewMode("charts")}
//               className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex-1 sm:flex-initial ${
//                 viewMode === "charts"
//                   ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               Charts
//             </button>
//           </div>
//         </div>

//         {viewMode === "cards" ? (
//           <div className="space-y-6">
//             {results.positions.map((position) => (
//               <div key={position.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                 <button
//                   onClick={() => setExpandedPosition(expandedPosition === position.id ? null : position.id)}
//                   className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4">
//                     <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
//                       <PositionIcon position={position.title} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//                     </div>
//                     <div className="text-left">
//                       <h3 className="text-lg sm:text-xl font-bold text-gray-900">{position.title}</h3>
//                       <p className="text-xs sm:text-sm text-gray-600">{position.totalVotes.toLocaleString()} total votes</p>
//                     </div>
//                   </div>
//                   {expandedPosition === position.id ? (
//                     <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
//                   ) : (
//                     <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
//                   )}
//                 </button>

//                 {expandedPosition === position.id && (
//                   <div className="p-4 sm:p-6 pt-0 border-t border-gray-100">
//                     <div className="space-y-4">
//                       {position.candidates.map((candidate, index) => (
//                         <div
//                           key={candidate.id}
//                           className={`relative overflow-hidden rounded-xl border-2 transition-all ${
//                             candidate.isWinner
//                               ? "border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg"
//                               : "border-gray-200 bg-white hover:shadow-md"
//                           }`}
//                         >
//                           {candidate.isWinner && (
//                             <div className="absolute top-0 right-0">
//                               <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 sm:px-4 py-1 rounded-bl-xl font-bold text-xs sm:text-sm flex items-center gap-1 shadow-lg">
//                                 <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
//                                 WINNER
//                               </div>
//                             </div>
//                           )}

//                           <div className="p-4 sm:p-5">
//                             <div className="flex items-center gap-3 sm:gap-4 mb-4">
//                               {index === 0 && candidate.isWinner && (
//                                 <div className="relative flex-shrink-0">
//                                   <img
//                                     src={candidate.photoUrl}
//                                     alt={candidate.name}
//                                     className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-yellow-400 shadow-xl"
//                                   />
//                                   <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1.5 sm:p-2 shadow-lg">
//                                     <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//                                   </div>
//                                 </div>
//                               )}
//                               {index === 1 && !candidate.isWinner && (
//                                 <div className="relative flex-shrink-0">
//                                   <img
//                                     src={candidate.photoUrl}
//                                     alt={candidate.name}
//                                     className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-gray-300 shadow-lg"
//                                   />
//                                   <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1.5 sm:p-2 shadow-lg">
//                                     <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                                   </div>
//                                 </div>
//                               )}
//                               {(index > 1 || (index === 1 && candidate.isWinner)) && (
//                                 <img
//                                   src={candidate.photoUrl}
//                                   alt={candidate.name}
//                                   className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-gray-200 shadow-md flex-shrink-0"
//                                 />
//                               )}
//                               <div className="flex-1 min-w-0">
//                                 <h4 className="text-base sm:text-lg font-bold text-gray-900 truncate">{candidate.name}</h4>
//                                 <div className="flex items-center gap-2 sm:gap-3 mt-1">
//                                   <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                                     {candidate.votes.toLocaleString()}
//                                   </span>
//                                   <span className="text-xs sm:text-sm text-gray-600 font-semibold">
//                                     ({candidate.percentage}%)
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="relative h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
//                               <div
//                                 className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${
//                                   candidate.isWinner
//                                     ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
//                                     : "bg-gradient-to-r from-blue-500 to-purple-600"
//                                 }`}
//                                 style={{ width: `${candidate.percentage}%` }}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-2 gap-6">
//             {results.positions.map((position) => {
//               const chartData = position.candidates.map((candidate) => ({
//                 name: candidate.name,
//                 votes: candidate.votes,
//                 percentage: candidate.percentage,
//               }));

//               return (
//                 <div key={position.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
//                   <div className="flex items-center gap-3 mb-6">
//                     <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
//                       <PositionIcon position={position.title} className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <h3 className="text-base sm:text-lg font-bold text-gray-900">{position.title}</h3>
//                       <p className="text-xs sm:text-sm text-gray-600">{position.totalVotes.toLocaleString()} votes</p>
//                     </div>
//                   </div>

//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={chartData}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                       <XAxis dataKey="name" stroke="#6B7280" />
//                       <YAxis stroke="#6B7280" />
//                       <Tooltip
//                         contentStyle={{
//                           backgroundColor: "#FFFFFF",
//                           border: "1px solid #E5E7EB",
//                           borderRadius: "0.75rem",
//                           boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                         }}
//                       />
//                       <Bar dataKey="votes" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
//                       <defs>
//                         <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#3B82F6" />
//                           <stop offset="100%" stopColor="#8B5CF6" />
//                         </linearGradient>
//                       </defs>
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all">
//             <Download className="w-5 h-5" />
//             Download Results
//           </button>
//           <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-blue-500 hover:text-blue-600 transition-all">
//             <Share2 className="w-5 h-5" />
//             Share Results
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoterResults;