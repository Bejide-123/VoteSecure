import React, { useState, useEffect } from 'react';
import VoterSidebar from "../Components/VoterSidebar";
import type { ReactNode } from "react";

// ===== PROPS TYPE =====
interface VoterLayoutProps {
  children: ReactNode;
}

const VoterLayout: React.FC<VoterLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // listen for sidebar changes dispatched by VoterSidebar
    const handler = (e: any) => {
      if (e?.detail && typeof e.detail.open === 'boolean') {
        setIsSidebarOpen(e.detail.open);
      }
    };

    window.addEventListener('sidebar:change', handler as EventListener);
    return () => window.removeEventListener('sidebar:change', handler as EventListener);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      
      {/* ===== SIDEBAR ===== */}
      <VoterSidebar />

      {/* ===== MAIN CONTENT AREA ===== */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        
        {/* ===== CONTENT CONTAINER ===== */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default VoterLayout;