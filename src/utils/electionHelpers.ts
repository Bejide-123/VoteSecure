// utils/electionHelpers.ts

export type ElectionCategory = "scheduled" | "ongoing" | "past";

export interface Election {
  id: string;
  title: string;
  description: string;
  election_type: "general" | "departmental" | "faculty" | "club";
  organization: string;
  registration_start_date: string;
  registration_end_date: string;
  voting_start_date: string;
  voting_end_date: string;
  allow_voice_voting: boolean;
  require_face_verification: boolean;
  send_email_notifications: boolean;
  send_sms_notifications: boolean;
  show_live_results: boolean;
  status: "scheduled" | "active" | "paused" | "completed" | "archived"; // FIXED
  created_at?: string;
}

/**
 * Determines which category an election belongs to
 */
export const categorizeElection = (election: Election): ElectionCategory => {
  const now = new Date();
  const start = new Date(election.voting_start_date);
  const end = new Date(election.voting_end_date);

  if (now > end || election.status === "completed") {
    return "past";
  }

  if (
    now >= start &&
    now <= end &&
    (election.status === "active" || election.status === "paused")
  ) {
    return "ongoing";
  }

  return "scheduled";
};

/**
 * Filter elections by category
 */
export const filterElectionsByCategory = (
  elections: Election[],
  category: ElectionCategory
): Election[] => {
  return elections.filter((e) => categorizeElection(e) === category);
};

export const getOngoingElections = (elections: Election[]) =>
  filterElectionsByCategory(elections, "ongoing");

export const getScheduledElections = (elections: Election[]) =>
  filterElectionsByCategory(elections, "scheduled");

export const getPastElections = (elections: Election[]) =>
  filterElectionsByCategory(elections, "past");

export const isElectionOngoing = (election: Election) =>
  categorizeElection(election) === "ongoing";

export const isElectionScheduled = (election: Election) =>
  categorizeElection(election) === "scheduled";

export const isElectionPast = (election: Election) =>
  categorizeElection(election) === "past";

/**
 * Sort elections by category
 */
export const sortElectionsByDate = (
  elections: Election[],
  category: ElectionCategory
): Election[] => {
  return [...elections].sort((a, b) => {
    if (category === "past") {
      return (
        new Date(b.voting_end_date).getTime() -
        new Date(a.voting_end_date).getTime()
      );
    }

    return (
      new Date(a.voting_start_date).getTime() -
      new Date(b.voting_start_date).getTime()
    );
  });
};

/**
 * Get election statistics
 */
export const getElectionStats = (elections: Election[]) => {
  const ongoing = getOngoingElections(elections);
  const scheduled = getScheduledElections(elections);
  const past = getPastElections(elections);

  return {
    ongoing: {
      count: ongoing.length,
      active: ongoing.filter((e) => e.status === "active").length,
      paused: ongoing.filter((e) => e.status === "paused").length,
    },
    scheduled: {
      count: scheduled.length,
    },
    past: {
      count: past.length,
    },
    total: elections.length,
  };
};

/**
 * Suggest correct status based on time
 */
export const getSuggestedStatus = (election: Election): Election["status"] => {
  const now = new Date();
  const start = new Date(election.voting_start_date);
  const end = new Date(election.voting_end_date);

  if (now > end) return "completed";
  if (now >= start && now <= end)
    return election.status === "paused" ? "paused" : "active";

  return "scheduled";
};

/**
 * Time display helpers
 */
export const getElectionTimeInfo = (election: Election) => {
  const now = new Date();
  const start = new Date(election.voting_start_date);
  const end = new Date(election.voting_end_date);
  const category = categorizeElection(election);

  if (category === "past") {
    const days = Math.floor(
      (now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24)
    );
    return {
      category: "past" as const,
      message: days === 0 ? "Completed today" : `Completed ${days} day(s) ago`,
      isUrgent: false,
    };
  }

  if (category === "ongoing") {
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    let message =
      days > 0
        ? `${days}d ${hours}h remaining`
        : hours > 0
        ? `${hours}h remaining`
        : `${Math.floor(diff / (1000 * 60))}m remaining`;

    return {
      category: "ongoing" as const,
      message,
      isUrgent: days === 0 && hours < 2,
    };
  }

  // Scheduled
  const diff = start.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  let message =
    days > 30
      ? `Starts in ${Math.floor(days / 30)} month(s)`
      : days > 0
      ? `Starts in ${days} day(s)`
      : hours > 0
      ? `Starts in ${hours} hour(s)`
      : `Starts in ${Math.floor(diff / (1000 * 60))} minute(s)`;

  return {
    category: "scheduled" as const,
    message,
    isUrgent: days === 0,
  };
};
