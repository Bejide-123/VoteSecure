import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./Context/LoginContext.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { RegisterProvider } from "./Context/RegisterContext.tsx";
import { ElectionProvider } from "./Context/ElectionContext.tsx";
import { ApplicationProvider } from "./Context/ApplicationContext.tsx";
import ScrollToTop from "./Components/ScrollToTop.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <ElectionProvider>
        <AuthProvider>
          <ApplicationProvider>
            <LoginProvider>
              <RegisterProvider>
                <App />
              </RegisterProvider>
            </LoginProvider>
          </ApplicationProvider>
        </AuthProvider>
      </ElectionProvider>
    </BrowserRouter>
  </StrictMode>
);
