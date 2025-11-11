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
      </Routes>
    </RegisterProvider>
  );
};

export default App;
