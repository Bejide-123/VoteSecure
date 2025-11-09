import React from 'react';
import type { ReactNode } from 'react';
import AdminSidebar from "../Components/AdminSIdebar";

// ===== PROPS TYPE =====
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      
      {/* ===== SIDEBAR ===== */}
      <AdminSidebar />

      {/* ===== MAIN CONTENT AREA ===== */}
      <main className="lg:ml-72 transition-all duration-300">
        
        {/* ===== CONTENT CONTAINER ===== */}
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;