import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegistrationPage from "./Pages/Register";
import { RegisterProvider } from "./Context/RegisterContext";
import { ProtectedRoute } from "./Context/AuthContext";
import AdminPage from "./Pages/AdminPage";
import VoterPage from "./Pages/VoterPage";
import VoterLayout from "./Pages/VoterLayout";
import ElectionDetails from "./Pages/Electiondetails";
import VotingPage from "./Pages/votingpage";
import VoteSuccessPage from "./Pages/VoteSuccessPage";
import AllElectionsPage from "./Pages/Elections";
import CreateElection from "./Pages/CreateElections";
import OngoingElections from "./Pages/OngoingElection";
import ScheduledElections from "./Pages/ScheduledElection";
import PastElections from "./Pages/PastElections";
import ApproveCandidates from "./Pages/ApproveCandidates";
import AllCandidates from "./Pages/AllCandidates";
import ManagePositions from "./Pages/ManagePositions";
import AllVoters from "./Pages/AllVoters";
import ApproveVoters from "./Pages/ApproveVoters";
import MyVotes from "./Pages/MyVotes";
import VoterTurnout from "./Pages/VotersTurnout";
import ResultsAnalysis from "./Pages/Results";
import Demographics from "./Pages/Demographics";
import AdminSettings from "./Pages/AdminSettings";
import VoterSettings from "./Pages/VoterSettings";
import VoterProfile from "./Pages/VoterProfile";
import ApplyForCandidacy from "./Pages/ApplicationForCandidacy";
import MonitorElection from "./Pages/ManageElections";
import EditElection from "./Pages/EditElections";
import VoterResultsList from "./Pages/ElectionListResults";
import VoterResultsDetail from "./Pages/ResultsDetails";

const App = () => {
  return (
    <RegisterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections/create"
          element={
            <ProtectedRoute requireAdmin={true}>
              <CreateElection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections/ongoing"
          element={
            <ProtectedRoute requireAdmin={true}>
              <OngoingElections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections/scheduled"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ScheduledElections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections/past"
          element={
            <ProtectedRoute requireAdmin={true}>
              <PastElections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/voters/approve"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ApproveVoters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/voters/all"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AllVoters />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/candidates/approve"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ApproveCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/candidates/all"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AllCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/candidates/positions"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ManagePositions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics/turnout"
          element={
            <ProtectedRoute requireAdmin={true}>
              <VoterTurnout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics/results"
          element={
            <ProtectedRoute requireAdmin={true}>
              <ResultsAnalysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics/demographics"
          element={
            <ProtectedRoute requireAdmin={true}>
              <Demographics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections/:id/monitor"
          element={
            <ProtectedRoute requireAdmin={true}>
              <MonitorElection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/elections/edit/:id"
          element={
            <ProtectedRoute requireAdmin={true}>
              <EditElection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/dashboard"
          element={
            <ProtectedRoute>
              <VoterPage />
            </ProtectedRoute>
          }
        />
        // Voter routes
        <Route
          path="/voter/elections/:id"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <ElectionDetails />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/elections/:id/vote"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <VotingPage />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/vote-success"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <VoteSuccessPage />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/elections"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <AllElectionsPage />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/my-votes"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <MyVotes />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/results"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <VoterResultsList/>
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/results/:electionId"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <VoterResultsDetail />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/profile"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <VoterProfile />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/applications"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <ApplyForCandidacy />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/settings"
          element={
            <ProtectedRoute>
              <VoterLayout>
                <VoterSettings />
              </VoterLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </RegisterProvider>
  );
};

export default App;
