import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";

// ===== TYPE DEFINITIONS =====
export default interface Position {
  title: string;
  description: string;
  max_candidates: number;
  min_candidates: number;
}

interface Election {
  id: string;
  title: string;
  description: string;
  election_type: "general" | "departmental" | "faculty" | "club";
  organization: string;
  application_start_date: string;
  application_end_date: string;
  registration_start_date: string;
  registration_end_date: string;
  voting_start_date: string;
  voting_end_date: string;
  allow_voice_voting: boolean;
  require_face_verification: boolean;
  send_email_notifications: boolean;
  send_sms_notifications: boolean;
  show_live_results: boolean;
  positions: Position[];
  voters: number;
  status: "draft" | "scheduled" | "active" | "paused" | "completed" | "ended_early";
  created_at?: string;
}

interface ElectionContextType {
  elections: Election[];
  loading: boolean;
  fetchElections: () => Promise<void>;
  fetchElectionById: (id: string) => Promise<Election | null>;
  getElectionById: (id: string) => Election | undefined;
  updateElectionStatus: (electionId: string, newStatus: Election['status']) => Promise<void>;
  updateElection: (id: string, updates: Partial<Election>) => Promise<boolean>;
  deleteElection: (id: string) => Promise<boolean>;
  refreshElections: () => Promise<void>;
}

// ===== CREATE CONTEXT =====
const ElectionContext = createContext<ElectionContextType | undefined>(
  undefined
);

export const ElectionProvider = ({ children }: { children: ReactNode }) => {
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all elections
  const fetchElections = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("elections")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Parse positions JSON string into array
      const electionsWithParsedPositions = (data || []).map((election: any) => {
        let positions: Position[] = [];
        try {
          if (election.positions && typeof election.positions === 'string') {
            positions = JSON.parse(election.positions);
          } else if (election.positions && Array.isArray(election.positions)) {
            positions = election.positions;
          }
        } catch (err) {
          console.error("Error parsing positions for election", election.id, err);
          positions = [];
        }
        
        // Count voters (you'll need to fetch this from votes table if you have one)
        const voters = 0; // Placeholder - update this if you have a votes table
        
        return { 
          ...election, 
          positions,
          voters 
        };
      });

      setElections(electionsWithParsedPositions);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single election by ID from database
  const fetchElectionById = async (id: string): Promise<Election | null> => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("elections")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      // Parse positions
      let positions: Position[] = [];
      try {
        if (data.positions && typeof data.positions === 'string') {
          positions = JSON.parse(data.positions);
        } else if (data.positions && Array.isArray(data.positions)) {
          positions = data.positions;
        }
      } catch (err) {
        console.error("Error parsing positions:", err);
        positions = [];
      }

      // Count voters (you can update this to fetch from votes table)
      const voters = 0; // Placeholder

      const election: Election = {
        id: data.id,
        title: data.title,
        description: data.description,
        election_type: data.election_type,
        organization: data.organization,
        application_start_date: data.application_start_date,
        application_end_date: data.application_end_date,
        registration_start_date: data.registration_start_date,
        registration_end_date: data.registration_end_date,
        voting_start_date: data.voting_start_date,
        voting_end_date: data.voting_end_date,
        allow_voice_voting: data.allow_voice_voting,
        require_face_verification: data.require_face_verification,
        send_email_notifications: data.send_email_notifications,
        send_sms_notifications: data.send_sms_notifications,
        show_live_results: data.show_live_results,
        positions: positions,
        voters: voters,
        status: data.status || 'draft',
        created_at: data.created_at
      };

      // Update local cache
      setElections(prev => {
        const exists = prev.find(e => e.id === id);
        if (exists) {
          return prev.map(e => e.id === id ? election : e);
        }
        return [...prev, election];
      });

      return election;
    } catch (error) {
      console.error("Error fetching election by ID:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get Election by ID from local state (cached)
  const getElectionById = (id: string) => {
    return elections.find((e) => e.id === id);
  };

  // Update Election
  const updateElection = async (
    id: string,
    updates: Partial<Election>
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("elections")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setElections((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
      );

      return true;
    } catch (error) {
      console.error("Error updating election:", error);
      return false;
    }
  };

  // Update Election Status
  const updateElectionStatus = async (electionId: string, newStatus: Election['status']) => {
    try {
      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      // If ending early, set the voting_end_date to now
      if (newStatus === 'ended_early') {
        updateData.voting_end_date = new Date().toISOString();
      }

      const { error } = await supabase
        .from('elections')
        .update(updateData)
        .eq('id', electionId);

      if (error) throw error;

      // Update local state immediately
      setElections(prev =>
        prev.map(election =>
          election.id === electionId
            ? { ...election, status: newStatus }
            : election
        )
      );

      return Promise.resolve();
    } catch (error) {
      console.error('Error updating election status:', error);
      throw error;
    }
  };

  // Delete election
  const deleteElection = async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase.from("elections").delete().eq("id", id);

      if (error) throw error;

      setElections((prev) => prev.filter((e) => e.id !== id));
      return true;
    } catch (error) {
      console.error("Error deleting election:", error);
      return false;
    }
  };

  const refreshElections = fetchElections;

  useEffect(() => {
    fetchElections();
  }, []);

  const value = {
    elections,
    loading,
    fetchElections,
    fetchElectionById, // Added
    getElectionById,
    updateElection,
    deleteElection,
    updateElectionStatus,
    refreshElections,
  };

  return (
    <ElectionContext.Provider value={value}>
      {children}
    </ElectionContext.Provider>
  );
};

// ===== CUSTOM HOOK =====
export const useElections = () => {
  const context = useContext(ElectionContext);
  if (!context) {
    throw new Error("useElections must be used within an ElectionProvider");
  }
  return context;
};