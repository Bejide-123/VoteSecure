import React, { useState, useEffect } from "react";
import {
  Trophy,
  TrendingUp,
  Users,
  Vote,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Search,
  Filter,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
// import { useAuth } from "../Context/AuthContext";

interface Election {
  id: string;
  title: string;
  organization: string;
  voting_end_date: string;
  total_votes: number;
  total_voters: number;
  turnout_percentage: number;
  positions_count: number;
  status: "completed";
}

const VoterResultsList: React.FC = () => {
  const navigate = useNavigate();
  
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterYear, setFilterYear] = useState<string>("all");

  useEffect(() => {
    loadCompletedElections();
  }, []);

  const loadCompletedElections = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("elections")
        .select("*")
        .eq("status", "completed")
        .order("voting_end_date", { ascending: false });

      if (error) throw error;

      // Mock data for demonstration
      const mockElections: Election[] = [
        {
          id: "1",
          title: "Student Union Elections 2024",
          organization: "University of Lagos",
          voting_end_date: "2024-03-03T23:59:00",
          total_votes: 1834,
          total_voters: 2500,
          turnout_percentage: 73.4,
          positions_count: 4,
          status: "completed",
        },
        {
          id: "2",
          title: "Faculty of Science Elections 2024",
          organization: "University of Lagos - Faculty of Science",
          voting_end_date: "2024-02-15T23:59:00",
          total_votes: 892,
          total_voters: 1200,
          turnout_percentage: 74.3,
          positions_count: 3,
          status: "completed",
        },
        {
          id: "3",
          title: "Computer Science Departmental Elections 2023",
          organization: "University of Lagos - CS Department",
          voting_end_date: "2023-11-20T23:59:00",
          total_votes: 456,
          total_voters: 600,
          turnout_percentage: 76.0,
          positions_count: 5,
          status: "completed",
        },
        {
          id: "4",
          title: "Student Union Elections 2023",
          organization: "University of Lagos",
          voting_end_date: "2023-03-10T23:59:00",
          total_votes: 1623,
          total_voters: 2400,
          turnout_percentage: 67.6,
          positions_count: 4,
          status: "completed",
        },
      ];

      setElections(mockElections);
    } catch (error) {
      console.error("Error loading elections:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredElections = elections.filter((election) => {
    const matchesSearch = election.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         election.organization.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterYear === "all") return matchesSearch;
    
    const electionYear = new Date(election.voting_end_date).getFullYear().toString();
    return matchesSearch && electionYear === filterYear;
  });

  const availableYears = Array.from(
    new Set(elections.map((e) => new Date(e.voting_end_date).getFullYear().toString()))
  ).sort((a, b) => parseInt(b) - parseInt(a));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-4 py-2 rounded-full mb-4">
            <Trophy className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold text-blue-700">Election Results</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Past Elections
          </h1>
          <p className="text-lg text-gray-600">
            View results from completed elections
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search elections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full sm:w-48 pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Years</option>
              {availableYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Elections Grid */}
        {filteredElections.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Vote className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredElections.map((election) => (
              <div
                key={election.id}
                onClick={() => navigate(`/voter/results/${election.id}`)}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Header with Status */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold">Completed</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(election.voting_end_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {election.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{election.organization}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Vote className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-600">Total Votes</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">
                        {election.total_votes.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-gray-600">Turnout</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {election.turnout_percentage}%
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-xs text-gray-600">Voters</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">
                        {election.total_voters.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Trophy className="w-4 h-4 text-orange-600" />
                        <span className="text-xs text-gray-600">Positions</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-600">
                        {election.positions_count}
                      </p>
                    </div>
                  </div>

                  {/* View Results Button */}
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-xl group-hover:scale-105 transition-all">
                    View Detailed Results
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {filteredElections.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Summary Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {filteredElections.length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Elections</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {filteredElections.reduce((sum, e) => sum + e.total_votes, 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mt-1">Total Votes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {(filteredElections.reduce((sum, e) => sum + e.turnout_percentage, 0) / filteredElections.length).toFixed(1)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Avg Turnout</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  {filteredElections.reduce((sum, e) => sum + e.positions_count, 0)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Total Positions</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterResultsList;