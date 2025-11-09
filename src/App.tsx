import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import RegistrationPage from "./Pages/Register";
import { RegisterProvider } from "./Context/RegisterContext";
import { ProtectedRoute } from "./Context/AuthContext";
import AdminPage from "./Pages/AdminPage";

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
      </Routes>
    </RegisterProvider>
  );
};

export default App;
