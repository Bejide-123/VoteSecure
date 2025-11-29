import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";

// ===== TYPE DEFINITIONS =====
interface Position {
  name: string;
  description: string;
  max_candidates: number;
  min_candidates: number;
}

interface Election {
  id: string; // ADDED
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
  voters: number; // Array of voter IDs
  status: "active" | "completed" | "archived";
  created_at?: string; // optional
}

interface ElectionContextType {
  elections: Election[];
  loading: boolean;
  fetchElections: () => Promise<void>;
  getElectionById: (id: string) => Election | undefined;
//   createElection: (data: Partial<Election>) => Promise<Election | null>;
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

  // Fetch elections
  const fetchElections = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("elections")
        .select("*")
        .order("created_at", { ascending: false });
        console.log(data);

      if (error) throw error;

      setElections(data || []);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get Election by ID
  const getElectionById = (id: string) => {
    return elections.find((e) => e.id === id);
  };

  // Create Election
//   const createElection = async (
//     electionData: Partial<Election>
//   ): Promise<Election | null> => {
//     try {
//       const { data, error } = await supabase
//         .from("elections")
//         .insert(electionData)
//         .select()
//         .single();

//       if (error) throw error;

//       setElections((prev) => [data, ...prev]);
//       return data;
//     } catch (error) {
//       console.error("Error creating election:", error);
//       return null;
//     }
//   };

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
    getElectionById,
//     createElection,
    updateElection,
    deleteElection,
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
