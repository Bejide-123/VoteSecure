import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

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
  const navigate = useNavigate();
  const { login } = useAuth();
  
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
      // ===== STEP 1: SIGN IN WITH SUPABASE AUTH =====
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Login failed');

      // ===== STEP 2: GET USER PROFILE FROM DATABASE =====
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('User profile not found');

      // ===== STEP 3: CREATE USER DATA OBJECT FOR AUTH CONTEXT =====
      const userData = {
        uid: profile.id,
        email: profile.email,
        userType: profile.user_type as 'voter' | 'admin',
        fullName: profile.full_name,
        memberId: profile.member_id,
        organization: profile.organization,
        department: profile.department || undefined,
        position: profile.position || undefined,
        selfieUrl: profile.selfie_url || undefined,
        createdAt: new Date(profile.created_at)
      };

      // ===== STEP 4: SAVE TO AUTH CONTEXT & LOCAL STORAGE =====
      login(userData);

      // ===== SUCCESS! =====
      setSuccessMessage('Login successful! Redirecting...');

      // Clear password (security)
      setFormData(prev => ({ ...prev, password: '' }));

      // ===== STEP 5: REDIRECT BASED ON USER TYPE =====
      setTimeout(() => {
        if (userData.userType === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/voter/dashboard');
        }
      }, 1000);

    } catch (error: any) {
      console.error('Login error:', error);
      
      // ===== HANDLE SPECIFIC ERRORS =====
      if (error.message === 'Invalid login credentials') {
        setErrors({
          general: 'Invalid email or password. Please try again.',
        });
      } else if (error.message.includes('Email not confirmed')) {
        setErrors({
          general: 'Please verify your email before logging in.',
        });
      } else if (error.message === 'User profile not found') {
        setErrors({
          general: 'Account setup incomplete. Please contact support.',
        });
      } else {
        setErrors({
          general: error.message || 'Something went wrong. Please try again.',
        });
      }
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