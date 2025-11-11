import React from "react";
import VoterDashboard from "../Components/VoterDashboard";
import VoterLayout from "./VoterLayout";

const VoterPage: React.FC = () => {
  return (
    <VoterLayout>
      <VoterDashboard />
    </VoterLayout>
  );
};

export default VoterPage;