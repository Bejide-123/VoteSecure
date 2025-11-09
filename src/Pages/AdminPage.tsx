import React from 'react';
import AdminLayout from "./AdminLayout";
import AdminDashboard from "../Components/AdminDashboard";

const AdminPage: React.FC = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default AdminPage;