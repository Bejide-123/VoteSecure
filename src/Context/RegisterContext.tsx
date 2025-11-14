import { useState, createContext, useContext, useRef } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; // Import Supabase client

interface RegistrationFormData {
  userType: 'voter' | 'admin';
  fullName: string;
  email: string;
  memberId: string;
  organization: string;
  department: string;
  position: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  userType?: string;
  fullName?: string;
  email?: string;
  memberId?: string;
  organization?: string;
  department?: string;
  position?: string;
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>({
    userType: 'voter',
    fullName: '',
    email: '',
    memberId: '',
    organization: '',
    department: '',
    position: '',
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
  const [selfieFile, setSelfieFile] = useState<File | null>(null); // Store actual file
      
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

      if (!formData.memberId.trim()) {
        newErrors.memberId = 'Member/Staff ID is required';
      }
    }

    if (step === 2) {
      if (!formData.organization.trim()) {
        newErrors.organization = 'Organization name is required';
      }

      if (formData.userType === 'admin' && !formData.position.trim()) {
        newErrors.position = 'Position/Role is required for admins';
      }
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
      
      // Store the actual file for upload
      setSelfieFile(file);
      
      // Create preview
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
    setErrors({});
    
    try {
      console.log('🔵 Starting registration...');
      console.log('📋 Form data:', {
        email: formData.email,
        userType: formData.userType,
        fullName: formData.fullName,
        memberId: formData.memberId,
        organization: formData.organization,
        department: formData.department,
        position: formData.position
      });
      
      // ===== STEP 1: CREATE AUTH USER =====
      console.log('🔵 Step 1: Creating auth user...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_type: formData.userType,
            full_name: formData.fullName,
          }
        }
      });

      console.log('✅ Auth data:', authData);
      console.log('❌ Auth error:', authError);

      if (authError) throw authError;
      if (!authData.user) throw new Error('Failed to create user account');

      const userId = authData.user.id;
      console.log('🆔 User ID:', userId);

      // ===== STEP 2: UPLOAD SELFIE TO STORAGE =====
      console.log('🔵 Step 2: Uploading selfie...');
      let selfieUrl = null;
      
      if (selfieFile) {
        const fileExt = selfieFile.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `selfies/${fileName}`;

        console.log('📁 Uploading to:', filePath);

        const { error: uploadError } = await supabase.storage
          .from('user-photos')
          .upload(filePath, selfieFile);

        console.log('❌ Upload error:', uploadError);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          // Don't fail registration if image upload fails
        } else {
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('user-photos')
            .getPublicUrl(filePath);
          
          selfieUrl = urlData.publicUrl;
          console.log('🖼️ Selfie URL:', selfieUrl);
        }
      }

      // ===== STEP 3: CREATE USER PROFILE IN DATABASE =====
      console.log('🔵 Step 3: Creating user profile...');
      
      const profileData = {
        id: userId,
        email: formData.email,
        user_type: formData.userType,
        full_name: formData.fullName,
        member_id: formData.memberId,
        organization: formData.organization,
        department: formData.department || null,
        position: formData.position || null,
        selfie_url: selfieUrl
      };
      
      console.log('📝 Profile data to insert:', profileData);

      const { data: insertedData, error: profileError } = await supabase
        .from('users')
        .insert(profileData)
        .select();

      console.log('✅ Inserted data:', insertedData);
      console.log('❌ Profile error:', profileError);

      if (profileError) throw profileError;

      // ===== SUCCESS! =====
      console.log('🎉 Registration successful!');
      setSuccessMessage('✅ Registration successful! Redirecting to login...');
      
      // Clear form
      setFormData({
        userType: 'voter',
        fullName: '',
        email: '',
        memberId: '',
        organization: '',
        department: '',
        position: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });
      setSelfieImage(null);
      setSelfieFile(null);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error: any) {
      console.error('💥 Registration error:', error);
      console.error('💥 Error message:', error.message);
      console.error('💥 Error details:', error.details);
      console.error('💥 Error hint:', error.hint);
      console.error('💥 Error code:', error.code);
      
      // Handle specific error types
      if (error.message.includes('already registered') || error.code === '23505') {
        setErrors({ email: 'This email is already registered' });
      } else if (error.message.includes('weak password')) {
        setErrors({ password: 'Password is too weak' });
      } else if (error.code === '42501') {
        setErrors({ general: 'Permission denied. Please contact support.' });
      } else {
        setErrors({ general: error.message || 'Registration failed. Please try again.' });
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