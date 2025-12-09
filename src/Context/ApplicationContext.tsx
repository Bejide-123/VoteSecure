// Context/ApplicationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface Application {
  id: string;
  election_id: string;
  user_id: string;
  position_title: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_member_id?: string;
  applicant_department?: string;
  applicant_level: string;
  applicant_cgpa: number;
  qualifications: string;
  manifesto: string;
  campaign_promises?: string;
  profile_image_url: string;
  status: "pending" | "approved" | "rejected";
  rejection_reason?: string;
  applied_at: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

interface ApplicationContextType {
  applications: Application[];
  myApplications: Application[];
  pendingApplications: Application[];
  approvedApplications: Application[];
  rejectedApplications: Application[];
  loading: boolean;
  fetchApplications: () => Promise<void>;
  fetchMyApplications: () => Promise<void>;
  fetchApplicationsByElection: (electionId: string) => Promise<Application[]>;
  approveApplication: (applicationId: string) => Promise<void>;
  rejectApplication: (applicationId: string, reason: string) => Promise<void>;
  submitApplication: (applicationData: Partial<Application>) => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [myApplications, setMyApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all applications (for admin)
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user's applications
  const fetchMyApplications = async () => {
    if (!user?.uid) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.uid)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      setMyApplications(data || []);
    } catch (error) {
      console.error('Error fetching my applications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications for a specific election
  const fetchApplicationsByElection = async (electionId: string): Promise<Application[]> => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('election_id', electionId)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching applications by election:', error);
      return [];
    }
  };

  // Approve application
  const approveApplication = async (applicationId: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationId);

      if (error) throw error;

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId
            ? { ...app, status: 'approved', reviewed_at: new Date().toISOString() }
            : app
        )
      );

      setMyApplications(prev =>
        prev.map(app =>
          app.id === applicationId
            ? { ...app, status: 'approved', reviewed_at: new Date().toISOString() }
            : app
        )
      );
    } catch (error) {
      console.error('Error approving application:', error);
      throw error;
    }
  };

  // Reject application
  const rejectApplication = async (applicationId: string, reason: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({
          status: 'rejected',
          rejection_reason: reason,
          reviewed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationId);

      if (error) throw error;

      // Update local state
      setApplications(prev =>
        prev.map(app =>
          app.id === applicationId
            ? {
                ...app,
                status: 'rejected',
                rejection_reason: reason,
                reviewed_at: new Date().toISOString(),
              }
            : app
        )
      );

      setMyApplications(prev =>
        prev.map(app =>
          app.id === applicationId
            ? {
                ...app,
                status: 'rejected',
                rejection_reason: reason,
                reviewed_at: new Date().toISOString(),
              }
            : app
        )
      );
    } catch (error) {
      console.error('Error rejecting application:', error);
      throw error;
    }
  };

  // Submit new application
  const submitApplication = async (applicationData: Partial<Application>) => {
    if (!user?.uid) throw new Error('User not authenticated');

    try {
      const { error } = await supabase.from('applications').insert([
        {
          ...applicationData,
          user_id: user.uid,
          status: 'pending',
          applied_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      // Refresh applications
      await fetchMyApplications();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  // Auto-fetch on mount
  useEffect(() => {
    if (user?.uid) {
      fetchMyApplications();
    }
  }, [user?.uid]);

  // Computed values
  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        myApplications,
        pendingApplications,
        approvedApplications,
        rejectedApplications,
        loading,
        fetchApplications,
        fetchMyApplications,
        fetchApplicationsByElection,
        approveApplication,
        rejectApplication,
        submitApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within ApplicationProvider');
  }
  return context;
};