import { useState, createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface RegistrationFormData {
  userType: 'voter' | 'admin';  // ✅ NEW: User type selection
  fullName: string;
  email: string;
  memberId: string;  // ✅ CHANGED: from studentId to memberId (more generic)
  organization: string;  // ✅ CHANGED: from school to organization
  department: string;
  position: string;  // ✅ NEW: Position/role (required for admins)
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  userType?: string;  // ✅ NEW
  fullName?: string;
  email?: string;
  memberId?: string;  // ✅ CHANGED
  organization?: string;  // ✅ CHANGED
  department?: string;
  position?: string;  // ✅ NEW
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  selfie?: string;
  general?: string;
}

interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

interface RegisterContextType {
  formData: RegistrationFormData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationFormData>>;
  
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  
  errors: FormErrors;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
  
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  
  passwordStrength: PasswordStrength;
  evaluatePasswordStrength: (password: string) => PasswordStrength;

  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => Promise<void>;

  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  
  selfieImage: string | null;
  setSelfieImage: React.Dispatch<React.SetStateAction<string | null>>;
  
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  validateStep: (step: number) => boolean;
}

interface RegisterProviderProps {
  children: ReactNode;
}

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const { register } = useAuth();
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RegistrationFormData>({
    userType: 'voter',  // ✅ NEW: Default to voter
    fullName: '',
    email: '',
    memberId: '',  // ✅ CHANGED
    organization: '',  // ✅ CHANGED
    department: '',
    position: '',  // ✅ NEW
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
      
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score === 0) return { score: 0, label: 'Very Weak', color: 'bg-red-500' };
    if (score === 1) return { score: 1, label: 'Weak', color: 'bg-orange-500' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-yellow-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-blue-500' };
    if (score === 4) return { score: 4, label: 'Strong', color: 'bg-green-500' };
    return { score: 5, label: 'Very Strong', color: 'bg-green-600' };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      // ✅ NEW: Validate user type
      if (!formData.userType) {
        newErrors.userType = 'Please select account type';
      }

      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Name must be at least 3 characters';
      }

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      // ✅ CHANGED: memberId instead of studentId
      if (!formData.memberId.trim()) {
        newErrors.memberId = 'Member/Staff ID is required';
      }
    }

    if (step === 2) {
      // ✅ CHANGED: organization instead of school
      if (!formData.organization.trim()) {
        newErrors.organization = 'Organization name is required';
      }

      // ✅ NEW: Position required for admins
      if (formData.userType === 'admin' && !formData.position.trim()) {
        newErrors.position = 'Position/Role is required for admins';
      }

      // Department is optional now (not all organizations have departments)
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (passwordStrength.score < 3) {
        newErrors.password = 'Please use a stronger password';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms';
      }

      if (!selfieImage) {
        newErrors.selfie = 'Selfie is required for verification';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name;
    const value = (target instanceof HTMLInputElement && target.type === 'checkbox')
      ? (target as HTMLInputElement).checked
      : target.value;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, selfie: 'Please upload an image' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, selfie: 'Image must be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelfieImage(reader.result as string);
        setErrors(prev => ({ ...prev, selfie: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Call AuthContext.register (backend handling) - do not auto-login by default
  const res = await register(formData, selfieImage ?? undefined, false);

      if (res.ok) {
        console.log('Registration Data:', {
          ...formData,
          selfieImage: selfieImage ? 'Image uploaded' : 'No image'
        });
        setSuccessMessage('Registration successful! Check your email.');
        alert(`✅ ${formData.userType === 'admin' ? 'Admin' : 'Voter'} registration successful! Check your email.`);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setErrors({ general: res.message || 'Registration failed. Please try again.' });
      }
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    successMessage,
    setSuccessMessage,
    passwordStrength,
    evaluatePasswordStrength: calculatePasswordStrength,
    handleChange,
    handleSubmit,
    currentStep,
    setCurrentStep,
    selfieImage,
    setSelfieImage,
    handleFileUpload,
    fileInputRef,
    validateStep
  };

  return (
    <RegisterContext.Provider value={value}>{children}</RegisterContext.Provider>
  );
};

export const useRegister = (): RegisterContextType => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }
  return context;
};