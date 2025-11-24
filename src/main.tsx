import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./Context/LoginContext.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { RegisterProvider } from "./Context/RegisterContext.tsx";
import { ElectionProvider } from "./Context/ElectionContext.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ElectionProvider>
        <AuthProvider>
          <LoginProvider>
            <RegisterProvider>
              <App />
            </RegisterProvider>
          </LoginProvider>
        </AuthProvider>
      </ElectionProvider>
    </BrowserRouter>
  </StrictMode>
);


