import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface LoginContextType {
  formData: LoginFormData;
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FormErrors;
  isLoading: boolean;
  successMessage: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

interface LoginProviderProps {
  children: ReactNode;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // ===== VALIDATION =====
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== FORM HANDLERS =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // ===== FIREBASE LOGIN WILL GO HERE =====
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate checking credentials
      if (
        formData.email === "demo@votesecure.com" &&
        formData.password === "demo123"
      ) {
        setSuccessMessage("Login successful! Redirecting...");

        // In real app, redirect to dashboard:
        // navigate('/dashboard');

        setTimeout(() => {
          alert("You would be redirected to dashboard now!");
        }, 1000);

        
        setFormData({ email: "", password: "", rememberMe: false })
      } else {
        setErrors({
          general:
            "Invalid email or password. Try: demo@votesecure.com / demo123",
        });
      }
    } catch (error) {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    errors,
    isLoading,
    successMessage,
    handleChange,
    handleSubmit,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};
